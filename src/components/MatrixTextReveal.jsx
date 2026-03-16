import { useState, useEffect, useRef, useCallback } from 'react';

// Only lowercase letters and digits — no capitals, no symbols
const RANDOM_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
const CYCLE_INTERVAL = 40;
const STAGGER_DELAY = 120;
const CYCLES_BEFORE_RESOLVE = 8;
const MAX_ANIMATION_TIME = 3000; // safety: force resolve after 3s no matter what

// Track whether the animation has played this session
let hasPlayedThisSession = false;

function getRandomChar() {
  return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
}

export default function MatrixTextReveal({ text = '', className, style, onComplete, dotElement, dotColor }) {
  // Capture once at mount so another instance completing can't kill this animation
  const [shouldAnimate] = useState(() => !hasPlayedThisSession);

  const [charStates, setCharStates] = useState(() => {
    if (shouldAnimate) {
      return Array.from(text).map(() => ({ display: '', resolved: false, cycleCount: 0, started: false }));
    }
    return Array.from(text).map((ch) => ({ display: ch, resolved: true, cycleCount: 0, started: true }));
  });
  const intervalRef = useRef(null);
  const completedRef = useRef(!shouldAnimate);
  const safetyTimerRef = useRef(null);

  // Force all chars to their final state
  const forceComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    hasPlayedThisSession = true;
    if (intervalRef.current?.id) clearInterval(intervalRef.current.id);
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    setCharStates(Array.from(text).map((ch) => ({ display: ch, resolved: true, cycleCount: 0, started: true })));
    onComplete?.();
  }, [text, onComplete]);

  const tick = useCallback(() => {
    setCharStates(prev => {
      const now = Date.now();
      const elapsed = now - (intervalRef.current?.startTime || now);

      // Track resolution during this tick so the dot can see if 'd' just resolved
      const resolvedThisTick = [];
      const next = prev.map((charState, i) => {
        if (charState.resolved) { resolvedThisTick[i] = true; return charState; }

        // If this is the dot (last char) and dotElement/dotColor is used, don't iterate —
        // resolve it instantly once the previous char has resolved
        const isLastDot = (dotElement || dotColor) && text.endsWith('.') && i === prev.length - 1;
        if (isLastDot) {
          const prevResolved = i === 0 || prev[i - 1].resolved || resolvedThisTick[i - 1];
          if (prevResolved) {
            resolvedThisTick[i] = true;
            return { display: text[i], resolved: true, cycleCount: 0, started: true };
          }
          return charState; // stay hidden until previous char resolves
        }

        const charStartTime = i * STAGGER_DELAY;
        if (elapsed < charStartTime) {
          return charState;
        }

        const newCycleCount = charState.cycleCount + 1;
        const targetCycles = CYCLES_BEFORE_RESOLVE + Math.floor(Math.random() * 4);

        if (newCycleCount >= targetCycles) {
          return { display: text[i], resolved: true, cycleCount: newCycleCount, started: true };
        }

        return { display: getRandomChar(), resolved: false, cycleCount: newCycleCount, started: true };
      });

      return next;
    });
  }, [text, dotElement, dotColor]);

  useEffect(() => {
    if (!shouldAnimate) return;
    const startTime = Date.now();
    const id = setInterval(tick, CYCLE_INTERVAL);
    intervalRef.current = { id, startTime };

    // Safety timer: force complete if animation hasn't finished in time
    safetyTimerRef.current = setTimeout(forceComplete, MAX_ANIMATION_TIME);

    return () => {
      clearInterval(id);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, [tick, shouldAnimate, forceComplete]);

  useEffect(() => {
    if (!completedRef.current && charStates.length > 0 && charStates.every(c => c.resolved)) {
      completedRef.current = true;
      hasPlayedThisSession = true;
      if (intervalRef.current?.id) clearInterval(intervalRef.current.id);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      onComplete?.();
    }
  }, [charStates, onComplete]);

  const useDotElement = (dotElement || dotColor) && text.endsWith('.');

  return (
    <span className={className} style={style}>
      {charStates.map((charState, i) => {
        const isLastChar = i === charStates.length - 1;
        if (useDotElement && isLastChar && charState.resolved) {
          if (dotElement) return <span key={i}>{dotElement}</span>;
          // Render a circle dot positioned at the baseline (bottom of text)
          return (
            <span key={i} style={{ display: 'inline-block', width: '0.16em', height: '0.16em', backgroundColor: dotColor, borderRadius: '50%', verticalAlign: '-0.04em', marginLeft: '0.02em' }} />
          );
        }
        if (!charState.started && !charState.resolved) {
          return (
            <span key={i} style={{ display: 'inline-block', minWidth: text[i] === ' ' ? '0.25em' : '0.5em', visibility: 'hidden' }}>
              {text[i]}
            </span>
          );
        }
        return (
          <span key={i} style={{ display: 'inline-block', minWidth: text[i] === ' ' ? '0.25em' : undefined }}>
            {charState.display}
          </span>
        );
      })}
    </span>
  );
}
