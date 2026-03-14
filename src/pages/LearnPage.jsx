import { useState, useEffect, useMemo, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
    DOMAINS, TOPICS, CHAPTERS, LESSONS,
    DIFFICULTY_COLORS,
    getTopicsByDomain, getChaptersByTopic, getLessonsByChapter,
} from '../data/lessons';
import { getTodaysDailyQuiz } from '../data/dailyQuiz';
import { Card, Button, MasteryDots } from '../components/shared';
import LessonFlow from '../components/learn/LessonFlow';
import DailyQuizFlow from '../components/DailyQuizFlow';

// Simple monoline SVG icons for domains and topics
const ICON_SVG = {
    foundations: (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
    ),
    governance: (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="3" x2="12" y2="21" /><polyline points="5 8 12 3 19 8" /><path d="M5 8v4c0 2 3 4 7 4s7-2 7-4V8" />
        </svg>
    ),
    'ai-safety': (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    'ai-basics': (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" /><line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" /><line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" /><path d="M9 15h6" />
        </svg>
    ),
    'ai-progress': (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
        </svg>
    ),
    'ai-concepts': (color) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
        </svg>
    ),
};

function TopicIcon({ iconId, color }) {
    const render = ICON_SVG[iconId];
    return render ? render(color || 'currentColor') : null;
}

// ─── "This Week" card session tracking ───
let _thisWeekShown = false;
let _thisWeekDismissed = false;
let _completionsSinceTrigger = 0;
let _lastTrackedSessionCount = -1;

function _getWeeklyShownToday() {
    const todayStr = new Date().toISOString().split('T')[0];
    try {
        const raw = localStorage.getItem('aisafety-weekly-shown-today');
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed.date === todayStr) return parsed;
        }
    } catch { /* ignore */ }
    return { date: todayStr, count: 0 };
}

function _incrementWeeklyShownToday() {
    const current = _getWeeklyShownToday();
    localStorage.setItem('aisafety-weekly-shown-today', JSON.stringify({
        date: current.date, count: current.count + 1,
    }));
}

export default function LearnPage({ onSessionChange, registerBackHandler }) {
    const { state } = useApp();
    const [activeLesson, setActiveLesson] = useState(null);
    const [activeDailyQuiz, setActiveDailyQuiz] = useState(false);
    const [activeDomain, setActiveDomain] = useState('foundations');
    const [expandedTopic, setExpandedTopic] = useState(null);
    const [showThisWeek, setShowThisWeek] = useState(false);
    const mainRef = useRef(null);

    // Track study sessions for "This Week" card
    useEffect(() => {
        const currentCount = (state.studySessions || []).length;
        if (_lastTrackedSessionCount < 0) {
            _lastTrackedSessionCount = currentCount;
            return;
        }
        if (currentCount > _lastTrackedSessionCount) {
            _lastTrackedSessionCount = currentCount;
            _completionsSinceTrigger++;
            if (_completionsSinceTrigger >= 2 && !_thisWeekShown && !_thisWeekDismissed) {
                const todayData = _getWeeklyShownToday();
                if (todayData.count < 2) {
                    setShowThisWeek(true);
                    _thisWeekShown = true;
                    _incrementWeeklyShownToday();
                    _completionsSinceTrigger = 0;
                }
            }
        }
    }, [state.studySessions]);

    // Session management
    useEffect(() => {
        const inSession = !!(activeLesson || activeDailyQuiz);
        onSessionChange?.(inSession);
    }, [activeLesson, activeDailyQuiz, onSessionChange]);

    // Back handler
    useEffect(() => {
        if (!activeLesson && !activeDailyQuiz) return;
        return registerBackHandler?.(() => {
            setActiveLesson(null);
            setActiveDailyQuiz(false);
        });
    }, [activeLesson, activeDailyQuiz, registerBackHandler]);

    // Daily quiz
    const dailyQuiz = useMemo(() => {
        try { return getTodaysDailyQuiz(); } catch { return null; }
    }, []);
    const todayStr = new Date().toISOString().split('T')[0];
    const dailyQuizAttempted = state.dailyQuiz?.lastAttemptedDate === todayStr;
    const showDailyQuizCard = dailyQuiz && dailyQuiz.cardIds?.length > 0 && !dailyQuizAttempted;

    // Active lesson flow
    if (activeLesson) {
        return (
            <LessonFlow
                lesson={activeLesson}
                onComplete={() => setActiveLesson(null)}
                onExit={() => setActiveLesson(null)}
            />
        );
    }

    // Active daily quiz
    if (activeDailyQuiz) {
        return (
            <DailyQuizFlow
                onComplete={() => setActiveDailyQuiz(false)}
                onExit={() => setActiveDailyQuiz(false)}
            />
        );
    }

    const completedCount = Object.keys(state.completedLessons).length;
    const totalLessons = LESSONS.length;
    const currentDomain = DOMAINS.find(d => d.id === activeDomain);
    const domainTopics = getTopicsByDomain(activeDomain);

    return (
        <div className="px-4 py-6 max-w-2xl mx-auto" ref={mainRef}>
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-[22px] font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
                    Learn
                </h2>
                <p className="text-sm mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
                    {completedCount === 0
                        ? 'Start your journey into AI safety'
                        : <><span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{completedCount}/{totalLessons}</span> lessons completed</>
                    }
                </p>
            </div>

            {/* This Week card */}
            {showThisWeek && (
                <Card className="mb-4 animate-fade-in" style={{ position: 'relative' }}>
                    <button
                        onClick={() => { setShowThisWeek(false); _thisWeekDismissed = true; }}
                        className="absolute top-3 right-3 text-xs"
                        style={{ color: 'var(--color-ink-faint)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        ✕
                    </button>
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-ink)' }}>
                        Great progress!
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                        Keep learning to build your AI safety knowledge.
                    </p>
                    <Button
                        variant="secondary"
                        className="mt-3 text-xs"
                        onClick={() => window.dispatchEvent(new Event('openWeekTracker'))}
                    >
                        View Weekly Stats
                    </Button>
                </Card>
            )}

            {/* Daily Quiz card */}
            {showDailyQuizCard && (
                <Card className="mb-4" onClick={() => setActiveDailyQuiz(true)}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[3px] flex items-center justify-center"
                            style={{ backgroundColor: 'rgba(212, 160, 74, 0.12)' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-warning)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>
                                Daily Quiz
                            </p>
                            <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                                Test your knowledge today
                            </p>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-faint)"
                            strokeWidth="2" strokeLinecap="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </div>
                </Card>
            )}

            {/* Domain sub-tabs */}
            <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                {DOMAINS.map(domain => {
                    const isActive = activeDomain === domain.id;
                    return (
                        <button
                            key={domain.id}
                            onClick={() => {
                                setActiveDomain(domain.id);
                                setExpandedTopic(null);
                            }}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-[3px] text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0"
                            style={{
                                backgroundColor: isActive ? 'var(--color-bronze)' : 'var(--color-parchment)',
                                color: isActive ? '#fff' : 'var(--color-ink-muted)',
                                border: isActive ? '1px solid var(--color-bronze)' : '1px solid rgba(var(--color-ink-rgb), 0.10)',
                            }}
                        >
                            <TopicIcon iconId={domain.icon} color={isActive ? '#fff' : domain.color} />
                            <span>{domain.title}</span>
                            {domain.comingSoon && (
                                <span className="ml-0.5" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.04em', opacity: 0.7 }}>Soon</span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Coming Soon state for locked domains */}
            {currentDomain?.comingSoon && (
                <div className="text-center py-16">
                    <div className="mb-3"><TopicIcon iconId={currentDomain.icon} color={currentDomain.color} /></div>
                    <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                        {currentDomain.title}
                    </h3>
                    <p className="text-sm mb-1" style={{ color: 'var(--color-ink-muted)' }}>
                        {currentDomain.description}
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-ink-faint)' }}>
                        Coming soon
                    </p>
                </div>
            )}

            {/* Topic list for active domain */}
            {!currentDomain?.comingSoon && (
                <div className="space-y-4">
                    {domainTopics.map(topic => {
                        const chapters = getChaptersByTopic(topic.id);
                        const allTopicLessons = chapters.flatMap(ch => getLessonsByChapter(ch.id));
                        const completedTopicLessons = allTopicLessons.filter(l => state.completedLessons[l.id]);
                        const isExpanded = expandedTopic === topic.id;
                        const progressPct = allTopicLessons.length > 0
                            ? Math.round((completedTopicLessons.length / allTopicLessons.length) * 100)
                            : 0;

                        return (
                            <Card key={topic.id}>
                                {/* Topic header */}
                                <div
                                    className="flex items-center gap-3 cursor-pointer"
                                    onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                                >
                                    <div className="w-10 h-10 rounded-[3px] flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${topic.color}15` }}>
                                        <TopicIcon iconId={topic.icon} color={topic.color} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                                            {topic.title}
                                        </h3>
                                        <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                                            {topic.description}
                                        </p>
                                        {/* Progress bar */}
                                        <div className="mt-2 w-full overflow-hidden"
                                            style={{ height: '4px', borderRadius: '1px', backgroundColor: 'var(--color-surface-alt, rgba(var(--color-ink-rgb), 0.06))' }}>
                                            <div className="h-full transition-all duration-500"
                                                style={{ width: `${progressPct}%`, borderRadius: '1px', backgroundColor: 'var(--color-bronze)' }} />
                                        </div>
                                        <p className="mt-1" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-ink-faint)' }}>
                                            {completedTopicLessons.length}/{allTopicLessons.length} lessons
                                        </p>
                                    </div>
                                    <svg
                                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        stroke="var(--color-ink-faint)" strokeWidth="2" strokeLinecap="round"
                                        className="flex-shrink-0 transition-transform duration-200"
                                        style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                                    >
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </div>

                                {/* Expanded: chapters and lessons */}
                                {isExpanded && (
                                    <div className="mt-4 animate-fade-in">
                                        {chapters.map((chapter, chIdx) => {
                                            const chapterLessons = getLessonsByChapter(chapter.id);
                                            const diffColor = DIFFICULTY_COLORS[chapter.difficulty] || '#888';

                                            // Chapter unlock: first chapter always unlocked;
                                            // subsequent chapters unlock when all lessons in previous chapter are completed
                                            let chapterUnlocked = chIdx === 0;
                                            if (chIdx > 0) {
                                                const prevChapterLessons = getLessonsByChapter(chapters[chIdx - 1].id);
                                                chapterUnlocked = prevChapterLessons.length > 0 &&
                                                    prevChapterLessons.every(l => state.completedLessons[l.id]);
                                            }

                                            return (
                                                <div key={chapter.id} className={chIdx > 0 ? 'mt-4' : ''}>
                                                    {/* Chapter header badge */}
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span
                                                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[2px] uppercase tracking-wider"
                                                            style={{
                                                                fontFamily: 'var(--font-mono)',
                                                                fontSize: '11px',
                                                                fontWeight: 500,
                                                                letterSpacing: '0.02em',
                                                                backgroundColor: `${diffColor}18`,
                                                                color: diffColor,
                                                            }}
                                                        >
                                                            <span className="w-1.5 h-1.5 rounded-[1px]" style={{ backgroundColor: diffColor }} />
                                                            {chapter.title}
                                                        </span>
                                                        {chapter.comingSoon && (
                                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-ink-faint)' }}>
                                                                Soon
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Lessons in chapter */}
                                                    {!chapter.comingSoon && (
                                                        <div className="space-y-2">
                                                            {chapterLessons.map((lesson, idx) => {
                                                                const isCompleted = !!state.completedLessons[lesson.id];
                                                                // Within a chapter: sequential unlock
                                                                const isUnlocked = chapterUnlocked && (
                                                                    idx === 0 || !!state.completedLessons[chapterLessons[idx - 1]?.id]
                                                                );
                                                                // Find the next lesson across all chapters in this topic
                                                                const isNext = isUnlocked && !isCompleted &&
                                                                    !chapterLessons.slice(0, idx).some(l => !state.completedLessons[l.id]);

                                                                return (
                                                                    <div
                                                                        key={lesson.id}
                                                                        className={`flex items-center gap-3 px-3 py-3 rounded-[3px] transition-all ${isUnlocked ? 'cursor-pointer active:scale-[0.99]' : 'opacity-50'}`}
                                                                        style={{
                                                                            backgroundColor: isNext
                                                                                ? `${topic.color}10`
                                                                                : isCompleted
                                                                                    ? 'rgba(var(--color-ink-rgb), 0.02)'
                                                                                    : 'transparent',
                                                                            border: isNext ? `1.5px solid ${topic.color}30` : '1.5px solid transparent',
                                                                        }}
                                                                        onClick={() => {
                                                                            if (isUnlocked) setActiveLesson(lesson);
                                                                        }}
                                                                    >
                                                                        {/* Status indicator */}
                                                                        <div className="w-8 h-8 rounded-[3px] flex items-center justify-center flex-shrink-0"
                                                                            style={{
                                                                                backgroundColor: isCompleted
                                                                                    ? 'var(--color-success)'
                                                                                    : isNext
                                                                                        ? topic.color
                                                                                        : 'rgba(var(--color-ink-rgb), 0.08)',
                                                                                color: (isCompleted || isNext) ? '#fff' : 'var(--color-ink-faint)',
                                                                            }}
                                                                        >
                                                                            {isCompleted ? (
                                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                                                                    <polyline points="20 6 9 17 4 12" />
                                                                                </svg>
                                                                            ) : (
                                                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 500 }}>{idx + 1}</span>
                                                                            )}
                                                                        </div>

                                                                        {/* Lesson info */}
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>
                                                                                {lesson.title}
                                                                            </p>
                                                                            <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                                                                                {lesson.subtitle || `${lesson.cardIds.length} concept${lesson.cardIds.length !== 1 ? 's' : ''}`}
                                                                            </p>
                                                                        </div>

                                                                        {/* Mastery dots for completed */}
                                                                        {isCompleted && lesson.cardIds.length > 0 && (
                                                                            <MasteryDots mastery={state.cardMastery?.[lesson.cardIds[0]]} size="sm" />
                                                                        )}

                                                                        {/* Arrow for next */}
                                                                        {isNext && !isCompleted && (
                                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                                                stroke={topic.color} strokeWidth="2.5" strokeLinecap="round">
                                                                                <polyline points="9 18 15 12 9 6" />
                                                                            </svg>
                                                                        )}

                                                                        {/* Lock for locked */}
                                                                        {!isUnlocked && (
                                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                                                stroke="var(--color-ink-faint)" strokeWidth="2" strokeLinecap="round">
                                                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                                            </svg>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Empty state */}
            {!currentDomain?.comingSoon && domainTopics.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                        No topics available yet.
                    </p>
                </div>
            )}
        </div>
    );
}
