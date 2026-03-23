/**
 * Animate a "+XP" badge from a source element to the TopBar XP icon.
 * Uses raw DOM + Web Animations API so it survives React unmounts.
 * Returns a promise that resolves when the animation finishes.
 */
export function flyXPToStar(sourceEl, amount) {
    return new Promise(resolve => {
        const target = document.getElementById('xp-star-target');
        if (!sourceEl || !target) { resolve(); return; }

        const sr = sourceEl.getBoundingClientRect();
        const tr = target.getBoundingClientRect();

        const startX = sr.left + sr.width / 2;
        const startY = sr.top + sr.height / 2;
        const dx = (tr.left + tr.width / 2) - startX;
        const dy = (tr.top + tr.height / 2) - startY;

        const flyer = document.createElement('div');
        flyer.innerHTML = `<span style="display:inline-flex;align-items:center;gap:3px;background:var(--color-bg);border:2px solid var(--color-sky);border-radius:20px;padding:4px 10px;font-size:14px;font-weight:700;color:var(--color-coral);box-shadow:0 4px 12px rgba(0,0,0,0.15);font-family:var(--font-display);">\u26A1 +${amount}</span>`;
        Object.assign(flyer.style, {
            position: 'fixed',
            left: `${startX}px`,
            top: `${startY}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: '9999',
            pointerEvents: 'none',
        });
        document.body.appendChild(flyer);

        const anim = flyer.animate([
            { transform: 'translate(-50%, -50%) scale(1.15)', opacity: 1, offset: 0 },
            { transform: `translate(calc(-50% + ${dx * 0.4}px), calc(-50% + ${dy * 0.65}px)) scale(0.85)`, opacity: 0.95, offset: 0.45 },
            { transform: `translate(calc(-50% + ${dx * 0.85}px), calc(-50% + ${dy * 0.9}px)) scale(0.55)`, opacity: 0.85, offset: 0.8 },
            { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.35)`, opacity: 0, offset: 1 },
        ], {
            duration: 650,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards',
        });

        anim.onfinish = () => {
            flyer.remove();
            // Pulse the star AND the number on arrival
            const star = target.querySelector('svg') || target;
            star.classList.remove('animate-number-pop');
            void star.offsetWidth;
            star.classList.add('animate-number-pop');

            const numberSpan = target.querySelector('span.font-semibold');
            if (numberSpan) {
                numberSpan.classList.remove('animate-number-pop');
                void numberSpan.offsetWidth;
                numberSpan.classList.add('animate-number-pop');
            }
            resolve();
        };
    });
}
