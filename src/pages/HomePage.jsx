import { useApp } from '../context/AppContext';
import { DOMAINS, LESSONS } from '../data/lessons';
const SECTION_ICONS = {
    learn: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    ),
    library: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
    ),
    practice: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
    ),
    challenge: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
    ),
};

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

    // Find next lesson to continue
    const hasStarted = completedCount > 0;

    return (
        <div className="px-4 py-8 max-w-2xl mx-auto">
            {/* Hero */}
            <div className="mb-10">
                <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '42px',
                    letterSpacing: '-0.04em',
                    color: 'var(--color-ink)',
                    lineHeight: 1.1,
                }}>
                    a<span style={{ color: 'var(--color-burgundy)', fontSize: '48px' }}>.</span>
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

            {/* Progress summary (only if started) */}
            {hasStarted && (
                <div className="mb-8 px-4 py-4 rounded-[3px]" style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid rgba(var(--color-ink-rgb), 0.06)',
                }}>
                    <div className="flex items-center justify-between mb-3">
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px', color: 'var(--color-ink)' }}>
                            Your Progress
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 500, color: 'var(--color-burgundy)' }}>
                            {progressPct}%
                        </span>
                    </div>
                    <div style={{ height: '4px', borderRadius: '1px', backgroundColor: 'rgba(var(--color-ink-rgb), 0.06)' }}>
                        <div style={{ height: '100%', width: `${progressPct}%`, borderRadius: '1px', backgroundColor: 'var(--color-bronze)', transition: 'width 0.5s ease-out' }} />
                    </div>
                    <div className="flex justify-between mt-3">
                        <div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 600, color: 'var(--color-ink)' }}>
                                {completedCount}
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-ink-faint)', textTransform: 'uppercase', letterSpacing: '0.04em', marginLeft: '4px' }}>
                                lessons
                            </span>
                        </div>
                        <div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 600, color: 'var(--color-ink)' }}>
                                {learnedCards}
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-ink-faint)', textTransform: 'uppercase', letterSpacing: '0.04em', marginLeft: '4px' }}>
                                concepts
                            </span>
                        </div>
                        <div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 600, color: 'var(--color-ink)' }}>
                                {state.currentStreak}
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-ink-faint)', textTransform: 'uppercase', letterSpacing: '0.04em', marginLeft: '4px' }}>
                                day streak
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* CTA */}
            <button
                onClick={() => onTabChange('learn')}
                className="w-full mb-8 py-3.5 rounded-[3px] text-sm font-semibold transition-all active:scale-[0.99]"
                style={{
                    fontFamily: 'var(--font-display)',
                    backgroundColor: 'var(--color-burgundy)',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    letterSpacing: '-0.01em',
                }}
            >
                {hasStarted ? 'Continue Learning' : 'Start Learning'}
            </button>

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
                            backgroundColor: 'var(--color-surface)',
                            border: '1px solid rgba(var(--color-ink-rgb), 0.06)',
                            cursor: 'pointer',
                        }}
                    >
                        <div className="flex-shrink-0" style={{ color: section.color }}>
                            {SECTION_ICONS[section.id]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px', color: 'var(--color-ink)', letterSpacing: '-0.01em' }}>
                                {section.title}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
                                {section.description}
                            </p>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-faint)" strokeWidth="2" strokeLinecap="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                ))}
            </div>

            {/* Domains preview */}
            <div className="mt-10">
                <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--color-ink-faint)',
                    marginBottom: '12px',
                }}>
                    Domains
                </p>
                <div className="space-y-2">
                    {DOMAINS.map(domain => (
                        <div
                            key={domain.id}
                            className="flex items-center gap-3 px-4 py-3 rounded-[3px]"
                            style={{
                                backgroundColor: `${domain.color}08`,
                                border: `1px solid ${domain.color}15`,
                            }}
                        >
                            <div className="w-2 h-2 rounded-[1px] flex-shrink-0" style={{ backgroundColor: domain.color }} />
                            <div className="flex-1">
                                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '13px', color: 'var(--color-ink)' }}>
                                    {domain.title}
                                </p>
                                <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                                    {domain.description}
                                </p>
                            </div>
                            {domain.comingSoon && (
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-ink-faint)' }}>
                                    Soon
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-12 mb-8 text-center">
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '16px', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
                    a<span style={{ color: 'var(--color-burgundy)', fontSize: '18px' }}>.</span>
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-ink-faint)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    aligned — ai safety companion
                </p>
            </div>
        </div>
    );
}
