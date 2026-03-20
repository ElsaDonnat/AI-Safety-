import { useApp } from '../context/AppContext';
import { useState, useEffect, useRef } from 'react';
import AchievementsModal from './AchievementsModal';
import StreakFlame from './StreakFlame';
import { FLAME_COUNT_COLORS } from '../utils/streakColors';
import MatrixTextReveal from './MatrixTextReveal';
import { Zap, Trophy, Settings } from 'lucide-react';

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
                    <h1 className="topbar-logo" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '24px', letterSpacing: '-0.03em', color: 'var(--color-ink)', transform: 'scaleY(0.92)', display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                        <span>a</span>
                        <span style={{ display: 'inline-block', width: '0.18em', height: '0.18em', backgroundColor: 'var(--color-bronze)', borderRadius: '50%', flexShrink: 0 }} />
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
                            <Zap size={16} color="var(--color-warning)" fill="var(--color-warning)" strokeWidth={2} style={{ opacity: 0.7 }} />
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
                            <Trophy size={17} color="var(--color-ink-muted)" strokeWidth={2} />
                            {hasNewAchievements && <span className="achievement-dot" />}
                        </button>

                        {/* Settings gear */}
                        <button
                            onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
                            className="topbar-settings-btn"
                            aria-label="Settings"
                        >
                            <Settings size={18} color="var(--color-ink-muted)" strokeWidth={2} />
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
