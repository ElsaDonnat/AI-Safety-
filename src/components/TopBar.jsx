import { useApp } from '../context/AppContext';
import { useState, useEffect, useRef } from 'react';
import AchievementsModal from './AchievementsModal';
import StreakFlame from './StreakFlame';
import { FLAME_COUNT_COLORS } from '../utils/streakColors';
import MatrixTextReveal from './MatrixTextReveal';

function getStreakStatus(lastActiveDate, currentStreak) {
    if (!lastActiveDate || currentStreak === 0) return 'inactive';
    const today = new Date().toISOString().split('T')[0];
    if (lastActiveDate === today) return 'active';
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastActiveDate === yesterday.toISOString().split('T')[0]) return 'at-risk';
    return 'inactive';
}

export default function TopBar() {
    const { state, dispatch } = useApp();
    const [displayXP, setDisplayXP] = useState(state.totalXP);
    const [showAchievements, setShowAchievements] = useState(false);
    const prevXP = useRef(state.totalXP);
    const frozenRef = useRef(false);
    const frozenXP = useRef(null);
    const latestXPRef = useRef(state.totalXP);
    const freezeTimerRef = useRef(null);
    const displayXPRef = useRef(state.totalXP);
    const hasNewAchievements = (state.newAchievements || []).length > 0;

    const streakStatus = getStreakStatus(state.lastActiveDate, state.currentStreak);

    // Keep refs in sync for event handlers (must be in effects, not render)
    useEffect(() => { latestXPRef.current = state.totalXP; }, [state.totalXP]);
    useEffect(() => { displayXPRef.current = displayXP; }, [displayXP]);

    // Imperatively trigger glow + pop on the XP star
    function triggerXPAnimation() {
        const targetEl = document.getElementById('xp-star-target');
        if (!targetEl) return;
        targetEl.classList.remove('animate-xp-glow');
        const starSvg = targetEl.querySelector('svg');
        if (starSvg) starSvg.classList.remove('animate-number-pop');
        void targetEl.offsetWidth;
        targetEl.classList.add('animate-xp-glow');
        if (starSvg) starSvg.classList.add('animate-number-pop');
    }

    // Animate displayXP from start to end over 600ms
    function animateCounter(start, end) {
        const duration = 600;
        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayXP(Math.round(start + (end - start) * eased));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }

    // Freeze/unfreeze XP display for lesson fly animation sync
    useEffect(() => {
        const handleFreeze = () => {
            frozenRef.current = true;
            frozenXP.current = displayXPRef.current;
            clearTimeout(freezeTimerRef.current);
            freezeTimerRef.current = setTimeout(() => {
                if (frozenRef.current) window.dispatchEvent(new Event('unfreezeXP'));
            }, 30000);
        };
        const handleUnfreeze = () => {
            frozenRef.current = false;
            clearTimeout(freezeTimerRef.current);
            const start = frozenXP.current ?? displayXPRef.current;
            const end = latestXPRef.current;
            prevXP.current = end;
            if (start !== end) {
                animateCounter(start, end);
                triggerXPAnimation();
            }
        };
        window.addEventListener('freezeXP', handleFreeze);
        window.addEventListener('unfreezeXP', handleUnfreeze);
        return () => {
            window.removeEventListener('freezeXP', handleFreeze);
            window.removeEventListener('unfreezeXP', handleUnfreeze);
            clearTimeout(freezeTimerRef.current);
        };
    }, []);

    // Animate XP counter (skip if frozen)
    useEffect(() => {
        if (state.totalXP !== prevXP.current) {
            if (frozenRef.current) {
                prevXP.current = state.totalXP;
                return;
            }
            const start = prevXP.current;
            animateCounter(start, state.totalXP);
            triggerXPAnimation();
            prevXP.current = state.totalXP;
        }
    }, [state.totalXP]);

    return (
        <>
            <header className="topbar">
                <div className="topbar-inner">
                    {/* Logo — left */}
                    <h1 className="topbar-logo" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '20px', letterSpacing: '-0.03em', color: 'var(--color-ink)', transform: 'scaleY(0.92)' }}>
                        <MatrixTextReveal
                            text="alignd."
                            dotElement={<span style={{ display: 'inline-block', width: '0.18em', height: '0.18em', backgroundColor: 'var(--color-bronze)', borderRadius: '50%', marginBottom: '0.15em', verticalAlign: 'baseline' }} />}
                        />
                    </h1>

                    {/* Spacer — center */}
                    <div className="topbar-section-name" />

                    {/* Stats — right */}
                    <div className="topbar-stats">
                        {/* Streak */}
                        <button
                            className="streak-flame-btn"
                            onClick={() => window.dispatchEvent(new Event('openWeekTracker'))}
                            aria-label={`${state.currentStreak} day streak — click for details`}
                        >
                            <StreakFlame status={streakStatus} size={18} />
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 600, color: FLAME_COUNT_COLORS[streakStatus] }}>
                                {state.currentStreak}
                            </span>
                        </button>

                        {/* XP */}
                        <div id="xp-star-target" className="topbar-stat"
                            onClick={() => window.dispatchEvent(new Event('openWeekTracker'))}
                            style={{ cursor: 'pointer' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-burgundy)" strokeWidth="2" strokeLinecap="round">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="var(--color-burgundy)" stroke="var(--color-burgundy)" opacity="0.2" />
                            </svg>
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 600, color: 'var(--color-burgundy)' }}>
                                {displayXP}
                            </span>
                            <span className="hidden sm:inline" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-ink-faint)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>XP</span>
                        </div>

                        {/* Achievements trophy */}
                        <button
                            onClick={() => setShowAchievements(true)}
                            className="topbar-trophy-btn"
                            aria-label="Achievements"
                        >
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                <path d="M4 22h16" />
                                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
                                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
                                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                            </svg>
                            {hasNewAchievements && <span className="achievement-dot" />}
                        </button>

                        {/* Settings gear */}
                        <button
                            onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
                            className="topbar-settings-btn"
                            aria-label="Settings"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {showAchievements && (
                <AchievementsModal onClose={() => setShowAchievements(false)} />
            )}
        </>
    );
}
