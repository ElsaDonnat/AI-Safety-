import { useApp } from '../context/AppContext';
import { DOMAINS, LESSONS } from '../data/lessons';
import MatrixTextReveal from '../components/MatrixTextReveal';
import { NAV_ICONS } from '../components/layout/NavIcons';
import { ChevronRight } from 'lucide-react';

const SECTIONS = [
    {
        id: 'learn',
        title: 'Learn',
        description: 'Structured lessons across AI foundations, safety, and governance',
        color: 'var(--color-burgundy)',
    },
    {
        id: 'library',
        title: 'Library',
        description: 'Browse and review every concept you\'ve encountered',
        color: 'var(--color-bronze)',
    },
    {
        id: 'practice',
        title: 'Practice',
        description: 'Spaced repetition to lock in what you\'ve learned',
        color: 'var(--color-ink-muted)',
    },
    {
        id: 'challenge',
        title: 'Challenge',
        description: 'Test your knowledge with timed quizzes',
        color: 'var(--color-warning)',
    },
];

export default function HomePage({ onTabChange }) {
    const { state } = useApp();
    const completedCount = Object.keys(state.completedLessons).length;
    const totalLessons = LESSONS.length;
    const learnedCards = state.seenCards?.length || 0;
    const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    const hasStarted = completedCount > 0;

    return (
        <div className="px-4 py-8 max-w-2xl mx-auto">
            {/* Hero — with warm accent bar */}
            <div className="mb-10 flex gap-4">
                {/* Warm brown accent line — starts aligned with top of logo */}
                <div className="flex-shrink-0 mt-2" style={{ width: '3px', alignSelf: 'stretch', background: 'linear-gradient(to bottom, var(--color-ink), var(--color-warm))', borderRadius: '1px' }} />
                <div>
                <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '56px',
                    letterSpacing: '-0.04em',
                    color: 'var(--color-ink)',
                    lineHeight: 1.1,
                    transform: 'scaleY(0.9)',
                    transformOrigin: 'bottom',
                }}>
                    <MatrixTextReveal
                        text="alignd."
                        dotColor="var(--color-bronze)"
                    />
                </h1>
                <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--color-ink-muted)',
                    marginTop: '8px',
                }}>
                    your ai safety companion
                </p>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--color-ink-secondary)', maxWidth: '380px' }}>
                    Build a deep understanding of AI safety through interactive lessons,
                    spaced repetition, and challenge quizzes.
                </p>
                </div>
            </div>

            {/* Progress summary (only if started) */}
            {hasStarted && (
                <div className="mb-6 px-4 py-4 rounded-[3px]" style={{
                    backgroundColor: 'var(--color-bronze)',
                }}>
                    <div className="flex items-center justify-between mb-3">
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px', color: 'var(--color-sidebar-bg)' }}>
                            Your Progress
                        </span>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 600, color: '#fff' }}>
                            {progressPct}%
                        </span>
                    </div>
                    <div style={{ height: '4px', borderRadius: '1px', backgroundColor: 'rgba(255, 255, 255, 0.25)' }}>
                        <div style={{ height: '100%', width: `${progressPct}%`, borderRadius: '1px', backgroundColor: 'var(--color-burgundy)', transition: 'width 0.5s ease-out' }} />
                    </div>
                    <div className="flex justify-between mt-3">
                        <div>
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: '#fff' }}>
                                {completedCount}
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-sidebar-bg)', textTransform: 'uppercase', letterSpacing: '0.04em', marginLeft: '4px' }}>
                                lessons
                            </span>
                        </div>
                        <div>
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: '#fff' }}>
                                {learnedCards}
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-sidebar-bg)', textTransform: 'uppercase', letterSpacing: '0.04em', marginLeft: '4px' }}>
                                concepts
                            </span>
                        </div>
                        <div>
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: '#fff' }}>
                                {state.currentStreak}
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-sidebar-bg)', textTransform: 'uppercase', letterSpacing: '0.04em', marginLeft: '4px' }}>
                                day streak
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Domain buttons — 3 in a row */}
            <div className="flex gap-2 mb-8">
                {DOMAINS.map(domain => (
                    <button
                        key={domain.id}
                        onClick={() => onTabChange('learn')}
                        className="flex-1 py-3 px-2 rounded-[3px] text-center transition-all active:scale-[0.98]"
                        style={{
                            backgroundColor: domain.color,
                            border: 'none',
                            cursor: domain.comingSoon ? 'default' : 'pointer',
                            opacity: domain.comingSoon ? 0.5 : 1,
                        }}
                    >
                        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', color: 'var(--color-sidebar-bg)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                            {domain.title}
                        </p>
                    </button>
                ))}
            </div>

            {/* Warm divider */}
            <div className="my-2" style={{ height: '1px', backgroundColor: 'var(--color-warm)' }} />

            {/* Section cards */}
            <div className="space-y-3">
                <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--color-ink-faint)',
                    marginBottom: '8px',
                }}>
                    Explore
                </p>
                {SECTIONS.map(section => (
                    <button
                        key={section.id}
                        onClick={() => onTabChange(section.id)}
                        className="w-full flex items-center gap-4 px-4 py-3.5 rounded-[3px] text-left transition-all active:scale-[0.995]"
                        style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid rgba(var(--color-ink-rgb), 0.10)',
                            boxShadow: '0 2px 6px rgba(44, 36, 32, 0.06)',
                            cursor: 'pointer',
                        }}
                    >
                        <div className="flex-shrink-0" style={{ color: section.color }}>
                            {NAV_ICONS[section.id]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 400, fontSize: '14px', color: 'var(--color-ink)' }}>
                                {section.title}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
                                {section.description}
                            </p>
                        </div>
                        <ChevronRight size={14} color="var(--color-ink-faint)" strokeWidth={2} />
                    </button>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-12 mb-8 text-center">
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '16px', color: 'var(--color-ink)', letterSpacing: '-0.02em', transform: 'scaleY(0.92)' }}>
                    alignd<span style={{ color: 'var(--color-bronze)' }}>.</span>
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-ink-faint)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    alignd — ai safety companion
                </p>
            </div>
        </div>
    );
}
