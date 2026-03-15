import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getConceptById, CATEGORY_CONFIG } from '../data/concepts';
import { shareText } from '../services/share';
import StreakFlame from './StreakFlame';
import { FLAME_COUNT_COLORS } from '../utils/streakColors';

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function getStreakStatus(lastActiveDate, currentStreak) {
    if (!lastActiveDate || currentStreak === 0) return 'inactive';
    const today = new Date().toISOString().split('T')[0];
    if (lastActiveDate === today) return 'active';
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastActiveDate === yesterday.toISOString().split('T')[0]) return 'at-risk';
    return 'inactive';
}

export default function WeekTracker({ onClose }) {
    const { state } = useApp();

    const streakStatus = getStreakStatus(state.lastActiveDate, state.currentStreak);

    // Compute week start (Monday)
    const weekStart = useMemo(() => {
        const d = new Date();
        const day = d.getDay();
        const diff = day === 0 ? 6 : day - 1;
        d.setDate(d.getDate() - diff);
        return d.toISOString().split('T')[0];
    }, []);

    // Build per-day activity map for the week
    const { dayActivity, stats, strongest, weakest } = useMemo(() => {
        const sessions = (state.studySessions || []).filter(s => s.date >= weekStart);

        // Per-day map: { 'YYYY-MM-DD': { sessions, questions, seconds } }
        const dayMap = {};
        for (const s of sessions) {
            const d = s.date?.split('T')[0] || s.date;
            if (!dayMap[d]) dayMap[d] = { sessions: 0, questions: 0, seconds: 0 };
            dayMap[d].sessions++;
            dayMap[d].questions += s.questionsAnswered || 0;
            dayMap[d].seconds += s.duration || 0;
        }

        // Build 7-day array (Mon=0 ... Sun=6)
        const activity = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(weekStart);
            d.setDate(d.getDate() + i);
            const dateStr = d.toISOString().split('T')[0];
            const today = new Date().toISOString().split('T')[0];
            const isFuture = dateStr > today;
            const data = dayMap[dateStr];
            activity.push({
                label: DAY_LABELS[i],
                date: dateStr,
                isToday: dateStr === today,
                isFuture,
                sessions: data?.sessions || 0,
                questions: data?.questions || 0,
                seconds: data?.seconds || 0,
            });
        }

        const totalSessions = sessions.length;
        const totalQuestions = sessions.reduce((s, sess) => s + (sess.questionsAnswered || 0), 0);
        const totalSeconds = sessions.reduce((s, sess) => s + (sess.duration || 0), 0);
        const lessonSessions = sessions.filter(s => s.type === 'lesson').length;
        const practiceSessions = sessions.filter(s => s.type === 'practice').length;

        // Topic mastery
        const topicScores = {};
        const topicCounts = {};
        for (const id of (state.seenCards || [])) {
            const concept = getConceptById(id);
            if (!concept) continue;
            const topic = concept.topic;
            const mastery = state.cardMastery[id]?.overallMastery ?? 0;
            topicScores[topic] = (topicScores[topic] || 0) + mastery;
            topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        }
        const topicAvgs = Object.entries(topicScores)
            .filter(([id]) => topicCounts[id] >= 2)
            .map(([id, total]) => ({
                id,
                label: CATEGORY_CONFIG[id]?.label || id,
                avg: total / topicCounts[id],
                count: topicCounts[id],
            }))
            .sort((a, b) => b.avg - a.avg);

        return {
            dayActivity: activity,
            stats: { totalSessions, totalQuestions, totalSeconds, lessonSessions, practiceSessions },
            strongest: topicAvgs[0] || null,
            weakest: topicAvgs.length > 1 ? topicAvgs[topicAvgs.length - 1] : null,
        };
    }, [state.studySessions, state.seenCards, state.cardMastery, weekStart]);

    const activeDays = dayActivity.filter(d => d.sessions > 0).length;
    const cardsLearned = (state.seenCards || []).length;

    function formatTime(secs) {
        if (secs >= 3600) return `${Math.floor(secs / 3600)}h ${Math.floor((secs % 3600) / 60)}m`;
        if (secs >= 60) return `${Math.floor(secs / 60)}m`;
        return `${secs}s`;
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-5"
            style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.4)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}>
            <div className="w-full max-w-sm rounded-[4px] overflow-hidden animate-fade-in"
                style={{ backgroundColor: 'var(--color-parchment)', boxShadow: 'var(--shadow-elevated)' }}
                onClick={e => e.stopPropagation()}>

                {/* Header with streak */}
                <div className="px-5 pt-5 pb-3 text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <StreakFlame status={streakStatus} size={28} />
                        <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)', color: streakStatus === 'inactive' ? 'var(--color-ink-faint)' : 'var(--color-burgundy)' }}>
                            {state.currentStreak}
                        </span>
                    </div>
                    <p className="text-sm font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                        {state.currentStreak === 0 ? 'Start a streak!' :
                            `day${state.currentStreak === 1 ? '' : 's'} in a row`}
                    </p>
                </div>

                {/* Day-by-day row */}
                <div className="px-5 pb-3">
                    <div className="flex justify-between items-center">
                        {dayActivity.map((day, i) => {
                            const hasActivity = day.sessions > 0;
                            return (
                                <div key={i} className="flex flex-col items-center gap-1">
                                    <span className="text-[10px] font-medium" style={{
                                        color: day.isToday ? 'var(--color-burgundy)' : 'var(--color-ink-faint)',
                                        fontFamily: 'var(--font-mono)',
                                    }}>
                                        {day.label}
                                    </span>
                                    <div className="w-8 h-8 rounded-[3px] flex items-center justify-center" style={{
                                        backgroundColor: day.isFuture ? 'rgba(var(--color-ink-rgb), 0.02)' :
                                            hasActivity ? 'rgba(212, 114, 106, 0.08)' : 'var(--color-card)',
                                        border: day.isToday ? '2px solid var(--color-burgundy)' :
                                            hasActivity ? '2px solid rgba(212, 114, 106, 0.2)' : '1px solid rgba(var(--color-ink-rgb), 0.06)',
                                        boxShadow: hasActivity ? 'none' : 'var(--shadow-card)',
                                    }}>
                                        {hasActivity ? (
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-burgundy)" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        ) : day.isFuture ? null : (
                                            <div className="w-1.5 h-1.5 rounded-[3px]" style={{ backgroundColor: 'var(--color-ink-faint)', opacity: 0.3 }} />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <p className="text-[11px] text-center mt-2 uppercase tracking-wider" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>
                        {activeDays === 0 ? 'No activity this week yet' :
                            `${activeDays}/7 days active this week`}
                    </p>
                </div>

                {/* Stats grid */}
                <div className="px-5 pb-3">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-2.5 rounded-[3px]" style={{ backgroundColor: 'var(--color-card)', boxShadow: 'var(--shadow-card)' }}>
                            <div className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-burgundy)' }}>
                                {stats.totalSessions}
                            </div>
                            <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>
                                {stats.totalSessions === 1 ? 'session' : 'sessions'}
                            </div>
                        </div>
                        <div className="text-center p-2.5 rounded-[3px]" style={{ backgroundColor: 'var(--color-card)', boxShadow: 'var(--shadow-card)' }}>
                            <div className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-burgundy)' }}>
                                {stats.totalQuestions}
                            </div>
                            <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>questions</div>
                        </div>
                        <div className="text-center p-2.5 rounded-[3px]" style={{ backgroundColor: 'var(--color-card)', boxShadow: 'var(--shadow-card)' }}>
                            <div className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-burgundy)' }}>
                                {formatTime(stats.totalSeconds)}
                            </div>
                            <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>study time</div>
                        </div>
                    </div>
                </div>

                {/* Overall progress row */}
                <div className="px-5 pb-3">
                    <div className="flex gap-2">
                        <div className="flex-1 flex flex-col items-center justify-center gap-1 p-2.5 rounded-[3px]" style={{ backgroundColor: 'var(--color-card)', boxShadow: 'var(--shadow-card)' }}>
                            <div className="flex items-center gap-1.5">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="var(--color-warning)" stroke="var(--color-warning)" opacity="0.7" />
                                </svg>
                                <div className="text-sm font-bold" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-display)' }}>{state.totalXP} XP</div>
                            </div>
                            <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>total earned</div>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center gap-1 p-2.5 rounded-[3px]" style={{ backgroundColor: 'var(--color-card)', boxShadow: 'var(--shadow-card)' }}>
                            <div className="flex items-center gap-1.5">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-burgundy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                </svg>
                                <div className="text-sm font-bold" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-display)' }}>{cardsLearned}</div>
                            </div>
                            <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>concepts learned</div>
                        </div>
                    </div>
                </div>

                {/* Topic insights */}
                {(strongest || weakest) && (
                    <div className="px-5 pb-3">
                        <div className="flex gap-2">
                            {strongest && (
                                <div className="flex-1 flex flex-col items-center justify-center gap-0.5 p-2.5 rounded-[3px]" style={{ backgroundColor: 'var(--color-card)', boxShadow: 'var(--shadow-card)' }}>
                                    <div className="flex items-center gap-1">
                                        <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-success)', fontFamily: 'var(--font-mono)' }}>Strongest</div>
                                    </div>
                                    <div className="text-xs font-medium" style={{ color: 'var(--color-ink-secondary)', fontFamily: 'var(--font-display)' }}>{strongest.label}</div>
                                </div>
                            )}
                            {weakest && (
                                <div className="flex-1 flex flex-col items-center justify-center gap-0.5 p-2.5 rounded-[3px]" style={{ backgroundColor: 'var(--color-card)', boxShadow: 'var(--shadow-card)' }}>
                                    <div className="flex items-center gap-1">
                                        <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-mono)' }}>Focus on</div>
                                    </div>
                                    <div className="text-xs font-medium" style={{ color: 'var(--color-ink-secondary)', fontFamily: 'var(--font-display)' }}>{weakest.label}</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="px-5 pb-5">
                    {state.currentStreak >= 1 && (
                        <button
                            onClick={async () => {
                                const lines = [
                                    `· ${state.currentStreak}-day streak on AI Safety!`,
                                    `— This week: ${stats.totalSessions} sessions, ${stats.totalQuestions} questions`,
                                    `— ${cardsLearned} AI safety concepts learned`,
                                ];
                                await shareText({ title: 'AI Safety', text: lines.join('\n') });
                            }}
                            className="w-full flex items-center justify-center gap-2 mb-2 py-2.5 rounded-[3px] text-sm font-semibold transition-colors cursor-pointer"
                            style={{ color: '#F0EBE5', backgroundColor: 'var(--color-sidebar-bg)', fontFamily: 'var(--font-mono)' }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                <polyline points="16 6 12 2 8 6" />
                                <line x1="12" y1="2" x2="12" y2="15" />
                            </svg>
                            Share Progress
                        </button>
                    )}
                    <button
                        className="w-full py-2.5 rounded-[3px] text-sm font-semibold cursor-pointer"
                        style={{ color: 'var(--color-ink-secondary)', backgroundColor: 'var(--color-card)', boxShadow: 'var(--shadow-card)', fontFamily: 'var(--font-mono)' }}
                        onClick={onClose}
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
}
