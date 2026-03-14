import { useState, useEffect, useRef, useCallback } from 'react';

const RANDOM_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
const CYCLE_INTERVAL = 40;
const STAGGER_DELAY = 80;
const CYCLES_BEFORE_RESOLVE = 12;

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
    return Array.from(text).map(() => ({ display: getRandomChar(), resolved: false, cycleCount: 0 }));
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
          return { ...charState, display: getRandomChar() };
        }

        const newCycleCount = charState.cycleCount + 1;
        const targetCycles = CYCLES_BEFORE_RESOLVE - 4 + Math.floor(Math.random() * 8);

        if (newCycleCount >= targetCycles) {
          return { display: text[i], resolved: true, cycleCount: newCycleCount };
        }

        return { display: getRandomChar(), resolved: false, cycleCount: newCycleCount };
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
        return (
          <span key={i} style={{ display: 'inline-block', minWidth: text[i] === ' ' ? '0.25em' : undefined }}>
            {charState.display}
          </span>
        );
      })}
    </span>
  );
}
