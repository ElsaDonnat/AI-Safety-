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
import Mascot from '../components/Mascot';

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
            <div className="flex items-center gap-3 mb-6">
                <Mascot mood={completedCount > 0 ? 'happy' : 'neutral'} size={48} />
                <div>
                    <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                        Learn AI Safety
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                        {completedCount === 0
                            ? 'Start your journey into AI safety'
                            : `${completedCount}/${totalLessons} lessons completed`
                        }
                    </p>
                </div>
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
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                            style={{ backgroundColor: 'rgba(230, 168, 23, 0.12)' }}>
                            📅
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

            {/* Domain sub-tabs (horizontal pill bar) */}
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
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0"
                            style={{
                                backgroundColor: isActive ? domain.color : 'rgba(var(--color-ink-rgb), 0.05)',
                                color: isActive ? '#fff' : 'var(--color-ink-muted)',
                                border: isActive ? 'none' : '1px solid rgba(var(--color-ink-rgb), 0.08)',
                            }}
                        >
                            <span>{domain.icon}</span>
                            <span>{domain.title}</span>
                            {domain.comingSoon && (
                                <span className="ml-0.5 opacity-60">🔒</span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Coming Soon state for locked domains */}
            {currentDomain?.comingSoon && (
                <div className="text-center py-16">
                    <div className="text-4xl mb-3">{currentDomain.icon}</div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-ink)' }}>
                        {currentDomain.title}
                    </h3>
                    <p className="text-sm mb-1" style={{ color: 'var(--color-ink-muted)' }}>
                        {currentDomain.description}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-ink-faint)' }}>
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
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                                        style={{ backgroundColor: `${topic.color}15` }}>
                                        {topic.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-sm" style={{ color: 'var(--color-ink)' }}>
                                            {topic.title}
                                        </h3>
                                        <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                                            {topic.description}
                                        </p>
                                        {/* Progress bar */}
                                        <div className="mt-2 w-full h-1.5 rounded-full overflow-hidden"
                                            style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.06)' }}>
                                            <div className="h-full rounded-full transition-all duration-500"
                                                style={{ width: `${progressPct}%`, backgroundColor: topic.color }} />
                                        </div>
                                        <p className="text-[10px] mt-1" style={{ color: 'var(--color-ink-faint)' }}>
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
                                                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                                                            style={{
                                                                backgroundColor: `${diffColor}18`,
                                                                color: diffColor,
                                                            }}
                                                        >
                                                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: diffColor }} />
                                                            {chapter.title}
                                                        </span>
                                                        {chapter.comingSoon && (
                                                            <span className="text-[10px]" style={{ color: 'var(--color-ink-faint)' }}>
                                                                Coming soon
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
                                                                        className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isUnlocked ? 'cursor-pointer active:scale-[0.99]' : 'opacity-50'}`}
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
                                                                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
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
                                                                                <span className="text-xs font-bold">{idx + 1}</span>
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
