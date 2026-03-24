import { useState, useEffect, useMemo, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
    DOMAINS, TOPICS, CHAPTERS, LESSONS,
    DIFFICULTY_COLORS, DIFFICULTY_BG_COLORS,
    getTopicsByDomain, getChaptersByTopic, getLessonsByChapter,
} from '../data/lessons';
import { getTodaysDailyQuiz } from '../data/dailyQuiz';
import { getConceptById } from '../data/concepts';
import { Card, Button, MasteryDots, TabSelector } from '../components/shared';
import LessonFlow from '../components/learn/LessonFlow';
import DailyQuizFlow from '../components/DailyQuizFlow';
import { getCourseContent } from '../data/courses/index';
import { getCourseById } from '../data/courseConfig';
import { Lightbulb, Landmark, ShieldCheck, Bot, TrendingUp, Brain, Calendar, ChevronRight, Check, Lock, Cpu, ShieldAlert, Target, Shield, Scale, Globe } from 'lucide-react';
import { DEV_UNLOCK_ALL } from '../config/devFlags';

// Maps domain/topic icon IDs to Lucide components
const ICON_MAP = {
    foundations: Lightbulb,
    governance: Landmark,
    'ai-safety': ShieldCheck,
    'ai-basics': Bot,
    'ai-progress': TrendingUp,
    'ai-concepts': Brain,
    'advanced-ai': Cpu,
    'ai-security': ShieldAlert,
    alignment: Target,
    risk: ShieldAlert,
    safety: Shield,
    ethics: Scale,
    policy: Globe,
};

function TopicIcon({ iconId, color }) {
    const IconComponent = ICON_MAP[iconId];
    if (!IconComponent) return null;
    return <IconComponent size={20} color={color || 'currentColor'} strokeWidth={1.8} />;
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
    const [expandedModule, setExpandedModule] = useState(null);
    const mainRef = useRef(null);

    // Course mode
    const courseMode = state.courseMode;
    const courseContent = useMemo(
        () => courseMode ? getCourseContent(courseMode.courseId) : null,
        [courseMode]
    );
    const courseMeta = useMemo(
        () => courseMode ? getCourseById(courseMode.courseId) : null,
        [courseMode]
    );
    const [learnView, setLearnView] = useState(courseMode ? 'course' : 'general');

    // Sync learnView when course mode changes
    useEffect(() => {
        setLearnView(prev => {
            if (courseMode && prev !== 'course' && prev !== 'general') return 'course';
            if (!courseMode && prev === 'course') return 'general';
            return prev;
        });
    }, [courseMode]);

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

    // Filter domains: never show course-only domains in the general view
    // (course content is accessed via the ML4G/General toggle at the top)
    const visibleDomains = DOMAINS.filter(d => !d.courseOnly);

    const currentDomain = visibleDomains.find(d => d.id === activeDomain) || visibleDomains[0];
    const domainTopics = getTopicsByDomain(currentDomain?.id);

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
                        : <><span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 600 }}>{completedCount}/{totalLessons}</span> lessons completed</>
                    }
                </p>
            </div>

            {/* Course / General toggle (only when course mode is active) */}
            {courseMode && courseContent && (
                <div className="mb-4">
                    <TabSelector
                        tabs={[
                            { id: 'course', label: courseMeta?.name || 'Course' },
                            { id: 'general', label: 'General' },
                        ]}
                        activeTab={learnView}
                        onChange={(view) => {
                            setLearnView(view);
                            if (view === 'general') {
                                // Reset to first non-course domain when switching to general
                                const firstGeneral = DOMAINS.find(d => !d.courseOnly);
                                if (firstGeneral) setActiveDomain(firstGeneral.id);
                                setExpandedTopic(null);
                            }
                        }}
                    />
                </div>
            )}

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
                            <Calendar size={20} color="var(--color-warning)" strokeWidth={1.8} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>
                                Daily Quiz
                            </p>
                            <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                                Test your knowledge today
                            </p>
                        </div>
                        <ChevronRight size={16} color="var(--color-ink-faint)" strokeWidth={2} />
                    </div>
                </Card>
            )}

            {/* ═══ Course View ═══ */}
            {learnView === 'course' && courseContent && (
                <CourseView
                    courseContent={courseContent}
                    state={state}
                    expandedModule={expandedModule}
                    setExpandedModule={setExpandedModule}
                    setActiveLesson={setActiveLesson}
                />
            )}

            {/* ═══ General View ═══ */}
            {learnView === 'general' && (
                <>
                    {/* Domain sub-tabs */}
                    <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                        {visibleDomains.map(domain => {
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
                                        backgroundColor: isActive ? 'var(--color-sidebar-bg)' : 'var(--color-parchment)',
                                        color: isActive ? '#F0EBE5' : 'var(--color-ink-muted)',
                                        border: isActive ? '1px solid var(--color-sidebar-bg)' : '1px solid rgba(var(--color-ink-rgb), 0.10)',
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
                    {!DEV_UNLOCK_ALL && currentDomain?.comingSoon && (
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
                    {(DEV_UNLOCK_ALL || !currentDomain?.comingSoon) && (
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
                                                        style={{ width: `${progressPct}%`, borderRadius: '1px', backgroundColor: 'var(--color-coral)' }} />
                                                </div>
                                                <p className="mt-1" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-ink-faint)' }}>
                                                    {completedTopicLessons.length}/{allTopicLessons.length} lessons
                                                </p>
                                            </div>
                                            <ChevronRight size={16} color="var(--color-ink-faint)" strokeWidth={2}
                                                className="flex-shrink-0 transition-transform duration-200"
                                                style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                                            />
                                        </div>

                                        {/* Expanded: chapters and lessons */}
                                        {isExpanded && (
                                            <div className="mt-4 animate-fade-in">
                                                {chapters.map((chapter, chIdx) => {
                                                    const chapterLessons = getLessonsByChapter(chapter.id);
                                                    const diffColor = DIFFICULTY_COLORS[chapter.difficulty] || '#888';
                                                    const diffBg = DIFFICULTY_BG_COLORS[chapter.difficulty] || 'rgba(136,136,136,0.12)';

                                                    // Chapter unlock: all chapters unlocked for testing
                                                    // TODO: restore sequential gating when content is finalized
                                                    let _chapterUnlocked = true;

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
                                                                        backgroundColor: diffBg,
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
                                                            {(DEV_UNLOCK_ALL || !chapter.comingSoon) && (
                                                                <div className="space-y-2">
                                                                    {chapterLessons.map((lesson, idx) => {
                                                                        const isCompleted = !!state.completedLessons[lesson.id];
                                                                        const isUnlocked = true;
                                                                        const isNext = isUnlocked && !isCompleted &&
                                                                            !chapterLessons.slice(0, idx).some(l => !state.completedLessons[l.id]);

                                                                        return (
                                                                            <LessonRow
                                                                                key={lesson.id}
                                                                                lesson={lesson}
                                                                                idx={idx}
                                                                                isCompleted={isCompleted}
                                                                                isUnlocked={isUnlocked}
                                                                                isNext={isNext}
                                                                                accentColor={topic.color}
                                                                                state={state}
                                                                                onStart={() => setActiveLesson(lesson)}
                                                                            />
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
                </>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════
// LESSON ROW — reusable lesson item for both views
// ═══════════════════════════════════════════════════════
function LessonRow({ lesson, idx, isCompleted, isUnlocked, isNext, accentColor, state, onStart }) {
    return (
        <div
            className={`flex items-center gap-3 px-3 py-3 rounded-[3px] transition-all ${isUnlocked ? 'cursor-pointer active:scale-[0.99]' : 'opacity-50'}`}
            style={{
                backgroundColor: isNext
                    ? `${accentColor}10`
                    : isCompleted
                        ? 'rgba(var(--color-ink-rgb), 0.02)'
                        : 'transparent',
                border: isNext ? `1.5px solid ${accentColor}30` : '1.5px solid transparent',
            }}
            onClick={() => { if (isUnlocked) onStart(); }}
        >
            {/* Status indicator */}
            <div className="w-8 h-8 rounded-[3px] flex items-center justify-center flex-shrink-0"
                style={{
                    backgroundColor: isCompleted
                        ? 'var(--color-success)'
                        : isNext
                            ? accentColor
                            : 'rgba(var(--color-ink-rgb), 0.08)',
                    color: (isCompleted || isNext) ? '#fff' : 'var(--color-ink-faint)',
                }}
            >
                {isCompleted ? (
                    <Check size={14} strokeWidth={3} />
                ) : (
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 600 }}>{idx + 1}</span>
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
                <MasteryDots mastery={state.cardMastery?.[lesson.cardIds[0]]} size="sm" hasWhy={!!getConceptById(lesson.cardIds[0])?.whyItMatters} />
            )}

            {/* Arrow for next */}
            {isNext && !isCompleted && (
                <ChevronRight size={14} color={accentColor} strokeWidth={2.5} />
            )}

            {/* Lock for locked */}
            {!isUnlocked && (
                <Lock size={14} color="var(--color-ink-faint)" strokeWidth={2} />
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════
// COURSE VIEW — topic → chapter → lesson hierarchy
// (mirrors the General view's domain → topic → chapter → lesson structure)
// ═══════════════════════════════════════════════════════

// Rotating chapter accent colors — assigned by position within a topic
const CHAPTER_COLORS = [
    '#3B82F6', // Blue
    '#2BA89E', // Teal
    '#8B5CF6', // Purple
    '#D4A026', // Amber
    '#EC4899', // Pink
    '#EF4444', // Red
    '#6366B8', // Indigo
    '#10B981', // Emerald
];

// Lesson position accent colors — consistent across all chapters
const LESSON_POSITION_COLORS = [
    '#6366B8', // Indigo
    '#3B82F6', // Blue
    '#2BA89E', // Teal
    '#8B5CF6', // Purple
    '#D4A026', // Amber
    '#EC4899', // Pink
];

function CourseView({ courseContent, state, expandedModule, setExpandedModule, setActiveLesson }) {
    return (
        <div className="space-y-4">
            {courseContent.topics.map(topic => {
                const isExpanded = expandedModule === topic.id;
                const allLessons = topic.chapters.flatMap(ch => ch.lessons);
                const totalCards = allLessons.reduce((sum, l) => sum + l.cardIds.length, 0);
                const completedCards = allLessons.reduce((sum, l) =>
                    sum + l.cardIds.filter(id => (state.seenCards || []).includes(id)).length, 0
                );
                const progressPct = totalCards > 0 ? Math.round((completedCards / totalCards) * 100) : 0;
                const completedLessonsCount = allLessons.filter(l =>
                    l.cardIds.every(id => (state.seenCards || []).includes(id))
                ).length;

                return (
                    <Card key={topic.id}>
                        {/* Topic header */}
                        <div
                            className="flex items-center gap-3 cursor-pointer"
                            onClick={() => setExpandedModule(isExpanded ? null : topic.id)}
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
                                    {topic.subtitle}
                                </p>
                                {/* Progress bar */}
                                <div className="mt-2 w-full overflow-hidden"
                                    style={{ height: '4px', borderRadius: '1px', backgroundColor: 'var(--color-surface-alt, rgba(var(--color-ink-rgb), 0.06))' }}>
                                    <div className="h-full transition-all duration-500"
                                        style={{ width: `${progressPct}%`, borderRadius: '1px', backgroundColor: topic.color }} />
                                </div>
                                <p className="mt-1" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-ink-faint)' }}>
                                    {completedLessonsCount}/{allLessons.length} lessons
                                </p>
                            </div>
                            <ChevronRight size={16} color="var(--color-ink-faint)" strokeWidth={2}
                                className="flex-shrink-0 transition-transform duration-200"
                                style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                            />
                        </div>

                        {/* Expanded: chapters and lessons */}
                        {isExpanded && (
                            <div className="mt-4 animate-fade-in">
                                {topic.chapters.map((chapter, chIdx) => {
                                    const chapterColor = CHAPTER_COLORS[chIdx % CHAPTER_COLORS.length];
                                    const chapterBg = `${chapterColor}14`;

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
                                                        backgroundColor: chapterBg,
                                                        color: chapterColor,
                                                    }}
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-[1px]" style={{ backgroundColor: chapterColor }} />
                                                    {chapter.title}
                                                </span>
                                            </div>

                                            {/* Lessons in chapter */}
                                            <div className="space-y-2">
                                                {chapter.lessons.map((lesson, idx) => {
                                                    const isCompleted = lesson.cardIds.every(id => (state.seenCards || []).includes(id));
                                                    const isNext = !isCompleted &&
                                                        chapter.lessons.slice(0, idx).every(l =>
                                                            l.cardIds.every(id => (state.seenCards || []).includes(id))
                                                        );

                                                    const lessonColor = LESSON_POSITION_COLORS[idx % LESSON_POSITION_COLORS.length];

                                                    const lessonObj = {
                                                        id: lesson.id,
                                                        title: lesson.title,
                                                        subtitle: lesson.subtitle,
                                                        mood: lesson.mood,
                                                        cardIds: lesson.cardIds,
                                                        number: idx,
                                                        isFoundational: idx === 0 && chIdx === 0,
                                                        topic: getConceptById(lesson.cardIds[0])?.topic || 'ai-basics',
                                                    };

                                                    return (
                                                        <LessonRow
                                                            key={lesson.id}
                                                            lesson={lessonObj}
                                                            idx={idx}
                                                            isCompleted={isCompleted}
                                                            isUnlocked={true}
                                                            isNext={isNext}
                                                            accentColor={lessonColor}
                                                            state={state}
                                                            onStart={() => setActiveLesson(lessonObj)}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </Card>
                );
            })}
        </div>
    );
}
