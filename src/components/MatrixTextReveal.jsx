import { useState, useEffect, useRef, useCallback } from 'react';

// Only lowercase letters and digits — no capitals, no symbols
const RANDOM_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
const CYCLE_INTERVAL = 40;
const STAGGER_DELAY = 120; // longer stagger so each letter starts visibly after the previous
const CYCLES_BEFORE_RESOLVE = 8;

// Track whether the animation has played this session
let hasPlayedThisSession = false;

function getRandomChar() {
  return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
}

export default function MatrixTextReveal({ text = '', className, style, onComplete, dotElement }) {
  // Only animate once per session — after that, show static text
  const shouldAnimate = !hasPlayedThisSession;

  const [charStates, setCharStates] = useState(() => {
    if (!shouldAnimate) {
      return Array.from(text).map((ch) => ({ display: ch, resolved: true, cycleCount: 0 }));
    }
    // All chars start blank (not visible) — they appear one by one via stagger
    return Array.from(text).map(() => ({ display: '', resolved: false, cycleCount: 0, started: false }));
  });
  const intervalRef = useRef(null);
  const completedRef = useRef(!shouldAnimate);

  const tick = useCallback(() => {
    setCharStates(prev => {
      const now = Date.now();
      const elapsed = now - (intervalRef.current?.startTime || now);

      const next = prev.map((charState, i) => {
        if (charState.resolved) return charState;

        const charStartTime = i * STAGGER_DELAY;
        if (elapsed < charStartTime) {
          // Not started yet — keep invisible
          return charState;
        }

        // Mark as started once we begin cycling
        const newCycleCount = charState.cycleCount + 1;
        const targetCycles = CYCLES_BEFORE_RESOLVE + Math.floor(Math.random() * 4);

        if (newCycleCount >= targetCycles) {
          return { display: text[i], resolved: true, cycleCount: newCycleCount, started: true };
        }

        return { display: getRandomChar(), resolved: false, cycleCount: newCycleCount, started: true };
      });

      return next;
    });
  }, [text]);

  useEffect(() => {
    if (!shouldAnimate) return;
    const startTime = Date.now();
    const id = setInterval(tick, CYCLE_INTERVAL);
    intervalRef.current = { id, startTime };

    return () => clearInterval(id);
  }, [tick, shouldAnimate]);

  useEffect(() => {
    if (!completedRef.current && charStates.length > 0 && charStates.every(c => c.resolved)) {
      completedRef.current = true;
      hasPlayedThisSession = true;
      if (intervalRef.current?.id) {
        clearInterval(intervalRef.current.id);
      }
      onComplete?.();
    }
  }, [charStates, onComplete]);

  const useDotElement = dotElement && text.endsWith('.');

  return (
    <span className={className} style={style}>
      {charStates.map((charState, i) => {
        const isLastChar = i === charStates.length - 1;
        if (useDotElement && isLastChar && charState.resolved) {
          return <span key={i}>{dotElement}</span>;
        }
        // Don't render anything if not started yet
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
