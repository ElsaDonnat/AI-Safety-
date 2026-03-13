import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getConceptsByIds, getConceptById, ALL_CONCEPTS, CATEGORY_CONFIG } from '../../data/concepts';
import { generateWhatOptions, generateDescriptionOptions, calculateXP, SCORE_COLORS, shuffle } from '../../data/quiz';
import { calculateNextReview } from '../../data/spacedRepetition';
import { Card, Button, CategoryTag, CategoryIcon, Divider, StarButton, ConfirmModal, ExpandableText, AnimatedCounter, flyXPToStar } from '../shared';
import Mascot from '../Mascot';
import { TOPICS } from '../../data/lessons';
import * as feedback from '../../services/feedback';
import { shareText, buildLessonShareText } from '../../services/share';
import StreakFlame from '../StreakFlame';
import StreakCelebration from '../StreakCelebration';

// ─── PHASES ────────────────────────────────────────────
const PHASE = {
    INTRO: 'intro',
    TOPIC_INTRO: 'topic_intro',
    LEARN_CARD: 'learn_card',       // Study a concept card
    LEARN_QUIZ: 'learn_quiz',       // 2 MCQ questions after a card
    RECAP_TRANSITION: 'recap_transition',
    RECAP: 'recap',                 // Remaining MCQ questions
    FINAL_REVIEW: 'final_review',
    SUMMARY: 'summary',
};

const QUESTION_TYPES = ['what', 'why', 'how'];

// Topic info lookup from TOPICS array
const getTopicInfo = (topicId) => {
    return TOPICS.find(t => t.id === topicId) || null;
};

export default function LessonFlow({ lesson, onComplete }) {
    const { state, dispatch } = useApp();
    const recapPerCard = state.recapPerCard ?? 2;
    const events = useMemo(() => getConceptsByIds(lesson.cardIds || []).slice(0, 3), [lesson]);

    // Topic info for this lesson
    const topicInfo = useMemo(() => getTopicInfo(lesson.topic), [lesson.topic]);

    const [phase, setPhase] = useState(PHASE.INTRO);
    const [cardIndex, setCardIndex] = useState(0);         // 0–2, current card in learn phase
    const [learnQuizIndex, setLearnQuizIndex] = useState(0); // 0–1, quiz within current card
    const [recapIndex, setRecapIndex] = useState(0);         // 0–5, recap questions
    const [reviewIndex, setReviewIndex] = useState(0);
    const [quizResults, setQuizResults] = useState([]);
    const [selectedDot, setSelectedDot] = useState(null);    // for result dot modal
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const [checkpointData, setCheckpointData] = useState(null); // { label, greenCount }
    const xpDispatched = useRef(false);
    const pendingNextAction = useRef(null);
    const lastAnswerScore = useRef(null);
    const sessionStartTime = useRef(null);
    const [sessionDuration, setSessionDuration] = useState(0);
    const [shareToast, setShareToast] = useState(false);
    const [postLessonModal, setPostLessonModal] = useState(null); // null | 'support'
    const [streakCelebration, setStreakCelebration] = useState(null); // null | { previousStatus, newStreak }

    // For each card, randomly pick 3 of the 4 question types to use for MCQs (discarding 1)
    // Then assign 2 to the learn phase and 1 to the recap phase
    const selectedTypes = useMemo(() => {
        return events.map(() => {
            const shuffled = shuffle([...QUESTION_TYPES]);
            return shuffled.slice(0, 3); // pick 3 types to test
        });
    }, [events]);

    const learnTypes = useMemo(() => {
        return selectedTypes.map(types => types.slice(0, 2)); // first 2 go to learn
    }, [selectedTypes]);

    const remainingTypes = useMemo(() => {
        return selectedTypes.map(types => types[2]); // the 3rd goes to recap
    }, [selectedTypes]);

    // Pre-generate learn quiz questions
    const learnQuizQuestions = useMemo(() => {
        const qs = [];
        events.forEach((event, i) => {
            learnTypes[i].forEach(type => {
                qs.push({ event, type, cardIdx: i, phase: 'learn' });
            });
        });
        return qs;
    }, [events, learnTypes]);

    // Pre-generate recap questions (shuffled once on mount)
    // recapPerCard: 0 = no recap, 1 = one question per card, 2 = full (2 MCQs per card)
    const [recapQuestions] = useState(() => {
        if (recapPerCard === 0) return [];
        const qs = [];
        if (recapPerCard === 2) {
            // Full: 2 MCQs per card (remaining type + random extra)
            events.forEach((event, i) => {
                qs.push({ event, type: remainingTypes[i], cardIdx: i, phase: 'recap', });
            });
            events.forEach((event, i) => {
                const extraType = QUESTION_TYPES.find(t => t !== remainingTypes[i] && !learnTypes[i].includes(t)) || 'what';
                qs.push({ event, type: extraType, cardIdx: i, phase: 'recap', });
            });
        } else {
            // Light: 1 question per card
            events.forEach((event, i) => {
                qs.push({
                    event,
                    type: remainingTypes[i],
                    cardIdx: i,
                    phase: 'recap',
                });
            });
        }
        return shuffle(qs);
    });

    // Get current learn quiz questions for current card
    const currentCardLearnQs = useMemo(() => {
        return learnQuizQuestions.filter(q => q.cardIdx === cardIndex);
    }, [learnQuizQuestions, cardIndex]);

    // Related cards within lesson
    const getRelatedCards = useCallback((concept) => {
        return events.filter(e => e.id !== concept.id);
    }, [events]);

    // Hard results for final review
    const hardResults = useMemo(() => {
        return quizResults.filter(r => r.firstScore === 'red' || r.firstScore === 'yellow');
    }, [quizResults]);

    // Total counts
    const totalQuestions = events.length * (2 + recapPerCard);
    const answeredCount = quizResults.length;

    // Set session start time on mount
    useEffect(() => { sessionStartTime.current = Date.now(); }, []);

    // Play card reveal sound when a new learn card appears
    useEffect(() => {
        if (phase === PHASE.LEARN_CARD) feedback.cardReveal();
    }, [phase, cardIndex]);

    useEffect(() => {
        if (shareToast) {
            const t = setTimeout(() => setShareToast(false), 2000);
            return () => clearTimeout(t);
        }
    }, [shareToast]);

    // ─── Dispatch XP + record study session on summary ───
    useEffect(() => {
        if (phase === PHASE.SUMMARY && !xpDispatched.current) {
            xpDispatched.current = true;
            feedback.complete();
            // Detect streak earning before dispatching XP (which updates lastActiveDate)
            const today = new Date().toISOString().split('T')[0];
            const wasActiveToday = state.lastActiveDate === today;
            let prevStreakStatus = 'inactive';
            if (!wasActiveToday && state.lastActiveDate && state.currentStreak > 0) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                if (state.lastActiveDate === yesterday.toISOString().split('T')[0]) {
                    prevStreakStatus = 'at-risk';
                }
            }
            const xp = calculateXP(quizResults);
            window.dispatchEvent(new Event('freezeXP'));
            dispatch({ type: 'COMPLETE_LESSON', lessonId: lesson.id });
            dispatch({ type: 'MARK_CARDS_SEEN', cardIds: events.map(e => e.id) });
            dispatch({ type: 'ADD_XP', amount: xp });
            const duration = sessionStartTime.current ? Math.round((Date.now() - sessionStartTime.current) / 1000) : 0;
            setSessionDuration(duration); // eslint-disable-line react-hooks/set-state-in-effect
            dispatch({ type: 'RECORD_STUDY_SESSION', duration, sessionType: 'lesson', questionsAnswered: quizResults.length });
            // Show streak celebration if this is the first activity today
            if (!wasActiveToday) {
                const newStreak = prevStreakStatus === 'at-risk' ? state.currentStreak + 1 : 1;
                setTimeout(() => setStreakCelebration({ previousStatus: prevStreakStatus, newStreak }), 600);
            }
            // Show post-lesson modals for specific lessons
            if (lesson.number === 2) {
                setTimeout(() => setPostLessonModal('support'), 1200);
            }
        }
    }, [phase, quizResults, lesson.id, lesson.number, dispatch]);

    const handleExit = useCallback(() => {
        setShowExitConfirm(true);
    }, []);

    // Helper: record answer
    const recordAnswer = useCallback((cardId, questionType, score) => {
        lastAnswerScore.current = score;
        const concept = getConceptById(cardId);
        setQuizResults(prev => [...prev, {
            cardId,
            questionType,
            firstScore: score,
            retryScore: null,
            difficulty: concept?.difficulty || 1,
        }]);
        dispatch({
            type: 'UPDATE_CARD_MASTERY',
            cardId,
            questionType,
            score,
        });
        // Update spaced repetition schedule
        const schedule = state.srSchedule?.[cardId] || { interval: 0, ease: 2.5, reviewCount: 0 };
        const next = calculateNextReview(schedule, score);
        dispatch({ type: 'UPDATE_SR_SCHEDULE', cardId, ...next });
    }, [dispatch, state.srSchedule]);

    // Helper: wrap onNext to show checkpoint at card boundaries
    const handleNext = useCallback((originalNext, questionEvent, isCardBoundary = false) => {
        if (isCardBoundary) {
            const greenSoFar = quizResults.filter(r => r.firstScore === 'green').length;
            pendingNextAction.current = originalNext;
            setCheckpointData({ label: isCardBoundary, greenCount: greenSoFar });
        } else {
            originalNext();
        }
    }, [quizResults]);

    const dismissCheckpoint = useCallback(() => {
        setCheckpointData(null);
        if (pendingNextAction.current) {
            pendingNextAction.current();
            pendingNextAction.current = null;
        }
    }, []);

    // ════════════════════════════════════════════════════
    // CHECKPOINT INTERSTITIAL (card boundaries)
    // ════════════════════════════════════════════════════
    if (checkpointData) {
        return <CheckpointScreen data={checkpointData} onDismiss={dismissCheckpoint}
            quizResults={quizResults} totalQuestions={totalQuestions}
            eventsCount={events.length} recapPerCard={recapPerCard} />;
    }

    // ════════════════════════════════════════════════════
    // INTRO
    // ════════════════════════════════════════════════════
    if (phase === PHASE.INTRO) {
        const timesCompleted = state.completedLessons[lesson.id] || 0;
        const startLesson = () => {
            if (lesson.isFoundational && topicInfo) {
                setPhase(PHASE.TOPIC_INTRO);
            } else {
                setPhase(PHASE.LEARN_CARD);
            }
            setCardIndex(0);
        };

        return (
            <div className="lesson-flow-container animate-fade-in" style={{ position: 'relative' }}>
                <div className="flex-shrink-0 pt-3" style={{ position: 'relative', zIndex: 1 }}>
                    <button onClick={onComplete} className="flex items-center gap-1 text-sm"
                        style={{ color: 'var(--color-ink-muted)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                    </button>
                </div>
                <div className="flex-1 min-h-0 flex flex-col justify-center" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="text-center py-2">
                        <span className="text-xs font-semibold uppercase tracking-widest block mb-1" style={{ color: 'var(--color-ink-faint)' }}>
                            Lesson {lesson.number}
                        </span>
                        <h1 className="lesson-intro-title font-bold mb-1" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                            {lesson.title}
                        </h1>
                        <p className="text-sm mb-2" style={{ color: 'var(--color-ink-muted)' }}>
                            {lesson.subtitle}
                        </p>
                        <p className="text-sm italic mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink-secondary)' }}>
                            "{lesson.mood}"
                        </p>
                        <p className="text-xs mb-2" style={{ color: 'var(--color-ink-muted)' }}>
                            {events.length} {events.length === 1 ? 'concept' : 'concepts'} · {totalQuestions} questions · ~{Math.max(1, Math.round(totalQuestions / 2))} min
                        </p>
                        {/* Concept preview */}
                        {events.length > 0 && (
                            <div className="flex flex-col gap-1.5 mt-1 mb-2 text-left">
                                {events.map((event, i) => {
                                    const catConfig = CATEGORY_CONFIG[event.category];
                                    return (
                                        <div key={event.id}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl animate-fade-in-up"
                                            style={{ backgroundColor: catConfig?.bg || 'var(--color-parchment-dark)', border: `1.5px solid ${catConfig?.color || 'var(--color-ink-faint)'}25`, animationDelay: `${i * 0.1}s` }}>
                                            <CategoryIcon category={event.category} size={18} />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-ink)' }}>{event.title}</p>
                                                <p className="text-xs" style={{ color: catConfig?.color || 'var(--color-ink-muted)' }}>{event.summary}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {timesCompleted > 0 && (
                            <p className="text-xs font-medium mt-1" style={{ color: 'var(--color-success)' }}>
                                ✓ Completed {timesCompleted} {timesCompleted === 1 ? 'time' : 'times'}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex-shrink-0 pt-3 pb-2" style={{ position: 'relative', zIndex: 1 }}>
                    <Button className="w-full" onClick={startLesson}>
                        {timesCompleted > 0 ? 'Learn Again' : 'Begin Learning'}
                    </Button>
                </div>
            </div>
        );
    }

    // ════════════════════════════════════════════════════
    // TOPIC INTRO
    // ════════════════════════════════════════════════════
    if (phase === PHASE.TOPIC_INTRO) {
        if (!topicInfo) { setPhase(PHASE.LEARN_CARD); return null; }
        return (
            <div className="lesson-flow-container animate-fade-in">
                <div className="flex-shrink-0 pt-4">
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={onComplete} className="text-sm flex items-center gap-1" style={{ color: 'var(--color-ink-muted)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                            Exit
                        </button>
                        <span className="text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-full"
                            style={{ backgroundColor: `${topicInfo.color}15`, color: topicInfo.color }}>
                            Topic Overview
                        </span>
                    </div>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto">
                    <div className="animate-slide-in-right">
                        <Card style={{ borderLeft: `4px solid ${topicInfo.color}` }}>
                            <div className="text-center mb-2 sm:mb-4">
                                <span className="text-4xl">{topicInfo.icon}</span>
                            </div>
                            <h2 className="text-xl font-bold text-center mb-1" style={{ fontFamily: 'var(--font-serif)' }}>{topicInfo.title}</h2>
                            <p className="text-sm text-center mb-2 sm:mb-4" style={{ color: topicInfo.color }}>{topicInfo.description}</p>
                            <Divider />
                            <p className="text-sm leading-relaxed mt-4" style={{ color: 'var(--color-ink-secondary)' }}>
                                This topic covers key concepts in {topicInfo.title.toLowerCase()}. You will learn the foundational ideas and how they connect to the broader field of AI safety.
                            </p>
                        </Card>
                    </div>
                </div>
                <div className="flex-shrink-0 pt-4 pb-2">
                    <Button className="w-full" onClick={() => setPhase(PHASE.LEARN_CARD)}>Begin Learning</Button>
                </div>
            </div>
        );
    }

    // ════════════════════════════════════════════════════
    // LEARN CARD — show study card
    // ════════════════════════════════════════════════════
    if (phase === PHASE.LEARN_CARD) {
        const event = events[cardIndex];
        if (!event) {
            setPhase(PHASE.RECAP_TRANSITION);
            return null;
        }

        const relatedCards = getRelatedCards(event);

        return (
            <>
            <ExitConfirmModal show={showExitConfirm} onConfirm={onComplete} onCancel={() => setShowExitConfirm(false)} />
            <div className="lesson-flow-container animate-fade-in">
                <div className="flex-shrink-0 pt-4">
                    <div className="flex items-center justify-center mb-3 relative">
                        <button onClick={handleExit} className="text-sm flex items-center gap-1 absolute left-0" style={{ color: 'var(--color-ink-muted)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                            Exit
                        </button>
                        <span className="text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-full"
                            style={{ backgroundColor: 'var(--color-burgundy-soft)', color: 'var(--color-burgundy)' }}>
                            📖 Study · {cardIndex + 1}/{events.length}
                        </span>
                    </div>

                    <ProgressTimeline
                        quizResults={quizResults}
                        totalQuestions={totalQuestions}
                        eventsCount={events.length}
                        recapPerCard={recapPerCard}
                        currentQuestionIndex={cardIndex * 2}
                        variant="header"
                    />
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto mt-4" key={event.id}>
                    <div className="animate-slide-in-right">
                        <Card>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CategoryTag category={event.category} />
                                </div>
                                <div className="relative">
                                    <StarButton
                                        isStarred={(state.starredCards || []).includes(event.id)}
                                        onClick={() => dispatch({ type: 'TOGGLE_STAR', cardId: event.id })}
                                    />
                                    {lesson.id === 'lesson-1' && cardIndex === 0 && !state.hasSeenFavoriteTip && (
                                        <div className="absolute right-0 top-full mt-1 w-56 z-50 animate-fade-in">
                                            <div className="rounded-xl p-3 text-xs leading-relaxed"
                                                style={{
                                                    backgroundColor: 'var(--color-card)',
                                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                                    border: '1px solid rgba(139, 65, 87, 0.15)',
                                                    color: 'var(--color-ink-secondary)',
                                                }}>
                                                <div className="absolute -top-1.5 right-4 w-3 h-3 rotate-45"
                                                    style={{ backgroundColor: 'var(--color-card)', borderTop: '1px solid rgba(139, 65, 87, 0.15)', borderLeft: '1px solid rgba(139, 65, 87, 0.15)' }} />
                                                <p><strong style={{ color: 'var(--color-ink)' }}>Tap the star</strong> to save cards to your favorites. You can practice them anytime in the <strong style={{ color: 'var(--color-burgundy)' }}>Practice</strong> tab.</p>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); dispatch({ type: 'DISMISS_FAVORITE_TIP' }); }}
                                                    className="mt-2 text-xs font-semibold"
                                                    style={{ color: 'var(--color-burgundy)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                                    Got it
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <h2 className="text-xl font-bold mt-3 mb-2 leading-snug" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                                {event.title}
                            </h2>
                            <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-ink-muted)' }}>
                                {event.summary}
                            </p>
                            {(() => {
                                // No era-specific info in AI Safety
                                return null;
                            })()}
                            <ExpandableText lines={3} className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-ink-secondary)' }}>
                                {event.description}
                            </ExpandableText>

                            {/* Tags */}
                            {event.tags && event.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {event.tags.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium"
                                            style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.05)', color: 'var(--color-ink-muted)' }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {relatedCards.length > 0 && (
                                <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(var(--color-ink-rgb), 0.06)' }}>
                                    <p className="text-[11px] uppercase tracking-wider font-semibold mb-2" style={{ color: 'var(--color-ink-faint)' }}>
                                        Also in this lesson
                                    </p>
                                    {relatedCards.map(rc => (
                                        <div key={rc.id} className="flex items-center gap-2 text-xs py-1" style={{ color: 'var(--color-ink-muted)' }}>
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CATEGORY_CONFIG[rc.category]?.color || '#999' }} />
                                            <span className="font-medium">{rc.title}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    </div>
                </div>

                <div className="flex-shrink-0 flex gap-3 pt-4 pb-2">
                    {cardIndex > 0 && (
                        <Button variant="secondary" onClick={() => {
                            setCardIndex(i => i - 1);
                            setLearnQuizIndex(0);
                        }}>← Back</Button>
                    )}
                    <Button className="flex-1" onClick={() => {
                        setLearnQuizIndex(0);
                        setPhase(PHASE.LEARN_QUIZ);
                    }}>
                        Quiz Me →
                    </Button>
                </div>
            </div>
            </>
        );
    }

    // ════════════════════════════════════════════════════
    // LEARN QUIZ — 2 MCQ questions per card
    // ════════════════════════════════════════════════════
    if (phase === PHASE.LEARN_QUIZ) {
        const q = currentCardLearnQs[learnQuizIndex];
        if (!q) {
            const next = cardIndex + 1;
            if (next < events.length) {
                setCardIndex(next);
                setLearnQuizIndex(0);
                setPhase(PHASE.LEARN_CARD);
            } else if (recapPerCard > 0) {
                setPhase(PHASE.RECAP_TRANSITION);
            } else {
                // No recap — skip straight to summary
                setPhase(PHASE.SUMMARY);
            }
            return null;
        }

        const isLastOfCard = learnQuizIndex === currentCardLearnQs.length - 1;

        return (
            <>
            <ExitConfirmModal show={showExitConfirm} onConfirm={onComplete} onCancel={() => setShowExitConfirm(false)} />
            <div className="lesson-flow-container">
                <div className="flex-shrink-0 pt-4">
                    <div className="flex items-center justify-center mb-2 relative">
                        <button onClick={handleExit} className="text-sm flex items-center gap-1 absolute left-0"
                            style={{ color: 'var(--color-ink-muted)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                            Exit
                        </button>
                        <span className="text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-full"
                            style={{ backgroundColor: 'var(--color-burgundy-soft)', color: 'var(--color-burgundy)' }}>
                            📝 Learn Quiz · {answeredCount + 1}/{totalQuestions}
                        </span>
                    </div>
                    <ProgressTimeline
                        quizResults={quizResults}
                        totalQuestions={totalQuestions}
                        eventsCount={events.length}
                        recapPerCard={recapPerCard}
                        currentQuestionIndex={answeredCount}
                        variant="header"
                    />
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto mt-4" key={`learn-q-${cardIndex}-${learnQuizIndex}`}>
                    <QuizQuestion
                        question={q}
                        lessonCardIds={lesson.cardIds}
                        descriptionDifficulty={1}
                        onAnswer={(score) => recordAnswer(q.event.id, q.type, score)}
                        onNext={() => handleNext(
                            () => setLearnQuizIndex(i => i + 1),
                            q.event,
                            isLastOfCard ? `Card ${cardIndex + 1} of ${events.length} complete` : false
                        )}
                        onBack={learnQuizIndex > 0 ? () => setLearnQuizIndex(i => i - 1) : null}
                    />
                </div>
            </div>
            </>
        );
    }

    // ════════════════════════════════════════════════════
    // RECAP TRANSITION — animation between learn and recap
    // ════════════════════════════════════════════════════
    if (phase === PHASE.RECAP_TRANSITION) {
        return (
            <div className="lesson-flow-container animate-fade-in">
                <div className="flex-1 min-h-0 overflow-y-auto">
                    <div className="text-center py-6">
                        <div className="animate-recap-pulse">
                            <Mascot mood="thinking" size={72} />
                        </div>
                        <h2 className="text-2xl font-bold mt-6 mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                            Time to Recap
                        </h2>
                        <p className="text-sm mb-1" style={{ color: 'var(--color-ink-muted)' }}>
                            Now let's see how well you remember everything
                        </p>
                        <p className="text-xs mb-6" style={{ color: 'var(--color-ink-faint)' }}>
                            {recapQuestions.length} {recapQuestions.length === 1 ? 'question' : 'questions'}
                        </p>
                        <div className="flex flex-col gap-1.5 mt-1 mb-4 text-left mx-auto" style={{ maxWidth: 320 }}>
                            {events.map((e, i) => {
                                const catConfig = CATEGORY_CONFIG[e.category];
                                return (
                                    <div key={e.id}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl animate-fade-in-up"
                                        style={{ backgroundColor: catConfig?.bg || 'var(--color-parchment-dark)', border: `1.5px solid ${catConfig?.color || 'var(--color-ink-faint)'}25`, animationDelay: `${i * 0.1}s` }}>
                                        <CategoryIcon category={e.category} size={18} />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-ink)' }}>{e.title}</p>
                                            <p className="text-xs" style={{ color: catConfig?.color || 'var(--color-ink-muted)' }}>{e.summary}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex-shrink-0 pt-4 pb-2">
                    <Button className="w-full" onClick={() => {
                        setRecapIndex(0);
                        setPhase(PHASE.RECAP);
                    }}>
                        Start Recap →
                    </Button>
                </div>
            </div>
        );
    }

    // ════════════════════════════════════════════════════
    // RECAP — remaining MCQ questions (shuffled)
    // ════════════════════════════════════════════════════
    if (phase === PHASE.RECAP) {
        const q = recapQuestions[recapIndex];
        if (!q) {
            if (hardResults.length > 0) {
                setReviewIndex(0);
                setPhase(PHASE.FINAL_REVIEW);
            } else {
                setPhase(PHASE.SUMMARY);
            }
            return null;
        }

        // Show recap checkpoint every 3 questions (when recapPerCard=2, i.e. 6 total recap Qs)
        const recapGroupSize = recapPerCard === 2 ? 3 : recapQuestions.length;
        const isRecapBoundary = recapGroupSize > 0
            && (recapIndex + 1) % recapGroupSize === 0
            && recapIndex < recapQuestions.length - 1;
        const recapBoundaryLabel = isRecapBoundary
            ? `Recap ${recapIndex + 1}/${recapQuestions.length}`
            : false;

        return (
            <>
            <ExitConfirmModal show={showExitConfirm} onConfirm={onComplete} onCancel={() => setShowExitConfirm(false)} />
            <div className="lesson-flow-container">
                <div className="flex-shrink-0 pt-4">
                    <div className="flex items-center justify-center mb-2 relative">
                        <button onClick={handleExit} className="text-sm flex items-center gap-1 absolute left-0"
                            style={{ color: 'var(--color-ink-muted)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                            Exit
                        </button>
                        <span className="text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-full"
                            style={{ backgroundColor: 'rgba(139, 65, 87, 0.15)', color: 'var(--color-burgundy)' }}>
                            🔁 Recap · {answeredCount + 1}/{totalQuestions}
                        </span>
                    </div>
                    <ProgressTimeline
                        quizResults={quizResults}
                        totalQuestions={totalQuestions}
                        eventsCount={events.length}
                        recapPerCard={recapPerCard}
                        currentQuestionIndex={answeredCount}
                        variant="header"
                    />
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto mt-4" key={`recap-${recapIndex}`}>
                    <QuizQuestion
                        question={q}
                        lessonCardIds={lesson.cardIds}
                        descriptionDifficulty={2}
                        onAnswer={(score) => recordAnswer(q.event.id, q.type, score)}
                        onNext={() => handleNext(() => setRecapIndex(i => i + 1), q.event, recapBoundaryLabel)}
                        onBack={recapIndex > 0 ? () => setRecapIndex(i => i - 1) : null}
                        onSkip={() => setRecapIndex(i => i + 1)}
                    />
                </div>
            </div>
            </>
        );
    }

    // ════════════════════════════════════════════════════
    // FINAL REVIEW
    // ════════════════════════════════════════════════════
    if (phase === PHASE.FINAL_REVIEW) {
        const hardEvents = [...new Set(hardResults.map(r => r.cardId))]
            .map(id => events.find(e => e.id === id))
            .filter(Boolean);

        if (reviewIndex < hardEvents.length) {
            const event = hardEvents[reviewIndex];
            const eventResults = hardResults.filter(r => r.cardId === event.id);
            const worstScore = eventResults.some(r => r.firstScore === 'red') ? 'red' : 'yellow';
            const borderColor = worstScore === 'red' ? 'var(--color-error)' : 'var(--color-warning)';

            return (
                <div className="lesson-flow-container animate-fade-in">
                    <div className="flex-shrink-0 text-center mb-4 pt-4">
                        <Mascot mood={worstScore === 'red' ? 'surprised' : 'thinking'} size={50} />
                        <p className="text-sm font-semibold mt-2" style={{ color: borderColor }}>
                            {worstScore === 'red' ? "Let's review this one" : "Almost had it"}
                        </p>
                        <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                            Review {reviewIndex + 1} of {hardEvents.length}
                        </span>
                    </div>
                    <div className="flex-1 min-h-0 overflow-y-auto">
                        <Card className="animate-slide-in-right" style={{ borderLeft: `3px solid ${borderColor}` }}>
                            <CategoryTag category={event.category} />
                            <h2 className="text-xl font-bold mt-3 mb-2" style={{ fontFamily: 'var(--font-serif)' }}>{event.title}</h2>
                            <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-ink-muted)' }}>{event.summary}</p>
                            <ExpandableText lines={3} className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-ink-secondary)' }}>
                                {event.description}
                            </ExpandableText>
                        </Card>
                    </div>
                    <div className="flex-shrink-0 flex gap-3 pt-4 pb-2">
                        {reviewIndex > 0 && (
                            <Button variant="secondary" onClick={() => setReviewIndex(i => i - 1)}>← Back</Button>
                        )}
                        <Button className="flex-1" onClick={() => setReviewIndex(i => i + 1)}>
                            {reviewIndex < hardEvents.length - 1 ? 'Next Review →' : 'See Results →'}
                        </Button>
                    </div>
                </div>
            );
        }

        setPhase(PHASE.SUMMARY);
        return null;
    }

    // ════════════════════════════════════════════════════
    // SUMMARY — XP + Streak
    // ════════════════════════════════════════════════════
    if (phase === PHASE.SUMMARY) {
        const xp = calculateXP(quizResults);
        const greenCount = quizResults.filter(r => r.firstScore === 'green').length;
        const yellowCount = quizResults.filter(r => r.firstScore === 'yellow').length;
        const redCount = quizResults.filter(r => r.firstScore === 'red').length;
        const allPassed = redCount === 0 || quizResults.every(r =>
            r.firstScore !== 'red' || (r.retryScore && r.retryScore !== 'red')
        );
        const streak = state.currentStreak;
        const sessionMin = Math.floor(sessionDuration / 60);
        const sessionSec = sessionDuration % 60;
        const sessionTimeStr = sessionMin > 0 ? `${sessionMin}m ${sessionSec}s` : `${sessionSec}s`;

        return (
            <div className="lesson-flow-container animate-fade-in">
                <div className="flex-1 min-h-0 overflow-y-auto">
                    <div className="text-center pt-8 pb-4 relative">
                        <Mascot mood={allPassed ? 'celebrating' : 'thinking'} size={64} />
                        <h2 className="text-2xl font-bold mt-2 mb-0.5" style={{ fontFamily: 'var(--font-serif)' }}>
                            {allPassed ? 'Lesson Complete!' : 'Keep Practicing'}
                        </h2>
                        <p className="text-sm mb-3" style={{ color: 'var(--color-ink-muted)' }}>{lesson.title}</p>

                        <Card className={allPassed ? 'animate-celebration' : ''} style={{
                            borderTop: allPassed ? '3px solid var(--color-success)' : '3px solid var(--color-warning)',
                        }}>
                            <div className="text-sm font-semibold mb-2" style={{ color: 'var(--color-ink-secondary)' }}>
                                {events.length} {events.length === 1 ? 'concept' : 'concepts'} · {quizResults.length} questions · {sessionTimeStr}
                            </div>

                            <div className="flex items-center gap-1 mb-3 justify-center flex-wrap">
                                {quizResults.map((r, i) => (
                                    <button key={i}
                                        className="w-3 h-3 rounded-full result-dot-btn animate-dot-stagger"
                                        title={`${events.find(e => e.id === r.cardId)?.title || 'Concept'} — ${r.questionType}`}
                                        onClick={() => setSelectedDot(r)}
                                        style={{
                                            animationDelay: `${i * 40}ms`,
                                            backgroundColor: r.firstScore === 'green' ? 'var(--color-success)' :
                                                r.firstScore === 'yellow' ? 'var(--color-warning)' : 'var(--color-error)'
                                        }} />
                                ))}
                            </div>

                            <div className="grid grid-cols-3 gap-3 text-center mb-3">
                                <div className="animate-scale-in" style={{ animationDelay: '200ms' }}>
                                    <div className="text-lg font-bold" style={{ color: 'var(--color-success)' }}>{greenCount}</div>
                                    <div className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>Exact</div>
                                </div>
                                <div className="animate-scale-in" style={{ animationDelay: '300ms' }}>
                                    <div className="text-lg font-bold" style={{ color: 'var(--color-warning)' }}>{yellowCount}</div>
                                    <div className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>Close</div>
                                </div>
                                <div className="animate-scale-in" style={{ animationDelay: '400ms' }}>
                                    <div className="text-lg font-bold" style={{ color: 'var(--color-error)' }}>{redCount}</div>
                                    <div className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>Missed</div>
                                </div>
                            </div>

                            <Divider />

                            <div className="flex items-center justify-center gap-6 mt-3">
                                <div id="xp-earned-display" className="flex items-center gap-2 animate-xp-pop" style={{ animationDelay: '500ms' }}>
                                    <svg className="animate-xp-glow" style={{ animationDelay: '700ms' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-bronze)" strokeWidth="2">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="var(--color-bronze-light)" />
                                    </svg>
                                    <div className="text-left">
                                        <AnimatedCounter value={xp} prefix="+" duration={600} delay={1050} className="text-xl font-bold leading-none" style={{ color: 'var(--color-burgundy)' }} />
                                        <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-ink-faint)' }}>XP earned</div>
                                    </div>
                                </div>
                                <div className="w-px h-10" style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.08)' }} />
                                <div className="flex items-center gap-2 animate-scale-in" style={{ animationDelay: '600ms' }}>
                                    <span className={streak > 1 ? 'animate-streak-bounce' : undefined} style={{ animationDelay: '900ms', animationFillMode: 'backwards' }}>
                                        <StreakFlame status="active" size={28} />
                                    </span>
                                    <div className="text-left">
                                        <AnimatedCounter value={streak} duration={400} delay={800} className="text-xl font-bold leading-none" style={{ color: 'var(--color-burgundy)' }} />
                                        <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-ink-faint)' }}>Day streak</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="flex-shrink-0 pt-4 pb-2 space-y-2">
                    <Button className="w-full" onClick={async () => {
                        const el = document.getElementById('xp-earned-display');
                        if (el) await flyXPToStar(el, xp);
                        window.dispatchEvent(new Event('unfreezeXP'));
                        onComplete();
                    }}>Continue</Button>
                    <button
                        onClick={async () => {
                            const text = buildLessonShareText({
                                lessonTitle: lesson.title, greenCount,
                                totalQuestions: quizResults.length, xp, streak,
                            });
                            const result = await shareText({ title: 'AI Safety', text });
                            if (result === 'copied') setShareToast(true);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                        style={{ color: 'var(--color-burgundy)', backgroundColor: 'rgba(139, 65, 87, 0.08)' }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                            <polyline points="16 6 12 2 8 6" />
                            <line x1="12" y1="2" x2="12" y2="15" />
                        </svg>
                        Share Result
                    </button>
                    {shareToast && (
                        <p className="text-xs text-center animate-fade-in" style={{ color: 'var(--color-success)' }}>
                            Copied to clipboard!
                        </p>
                    )}
                </div>

                {/* Result Dot Modal */}
                {selectedDot && (() => {
                    const evt = events.find(e => e.id === selectedDot.cardId);
                    if (!evt) return null;
                    const qType = selectedDot.questionType;
                    const dotColor = selectedDot.firstScore === 'green' ? 'var(--color-success)'
                        : selectedDot.firstScore === 'yellow' ? 'var(--color-warning)' : 'var(--color-error)';
                    const isTarget = selectedDot.firstScore !== 'green';
                    const hlBg = isTarget ? 'var(--color-warning-light)' : 'rgba(5, 150, 105, 0.12)';
                    const hlColor = isTarget ? 'var(--color-warning)' : 'var(--color-success)';
                    return (
                        <div className="dot-modal-backdrop" onClick={() => setSelectedDot(null)}>
                            <div className="dot-modal-content" onClick={e => e.stopPropagation()}>
                                <Card style={{ borderLeft: `3px solid ${dotColor}` }}>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-full"
                                            style={{ backgroundColor: hlBg, color: dotColor }}>
                                            {qType === 'why' ? '💡 Why It Matters'
                                                : qType === 'how' ? '🔧 How It Works'
                                                    : '❓ What Is It'}
                                        </span>
                                        <button onClick={() => setSelectedDot(null)}
                                            className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                                            style={{ color: 'var(--color-ink-muted)', backgroundColor: 'rgba(var(--color-ink-rgb), 0.05)' }}>✕</button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <CategoryTag category={evt.category} />
                                        <StarButton
                                            isStarred={(state.starredCards || []).includes(evt.id)}
                                            onClick={() => dispatch({ type: 'TOGGLE_STAR', cardId: evt.id })}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <h2 className={`text-xl font-bold leading-snug ${qType === 'what' ? 'dot-highlight' : ''}`}
                                            style={{ fontFamily: 'var(--font-serif)', ...(qType === 'what' ? { backgroundColor: hlBg, color: hlColor } : { color: 'var(--color-ink)' }) }}>
                                            {evt.title}
                                        </h2>
                                    </div>
                                    <p className={`text-sm leading-relaxed mb-3 ${qType === 'why' || qType === 'how' ? 'dot-highlight' : ''}`}
                                        style={{ ...(qType === 'why' || qType === 'how' ? { backgroundColor: hlBg, color: hlColor } : { color: 'var(--color-ink-secondary)' }) }}>
                                        {evt.description}
                                    </p>
                                </Card>
                            </div>
                        </div>
                    );
                })()}

                {/* Streak Celebration */}
                {streakCelebration && (
                    <StreakCelebration
                        previousStatus={streakCelebration.previousStatus}
                        newStreak={streakCelebration.newStreak}
                        onDismiss={() => setStreakCelebration(null)}
                    />
                )}

                {/* Support Modal (after lessons 2 and 20) */}
                {postLessonModal === 'support' && (
                    <div className="dot-modal-backdrop" onClick={() => setPostLessonModal(null)}>
                        <div className="dot-modal-content" onClick={e => e.stopPropagation()}>
                            <Card>
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: 'rgba(139, 65, 87, 0.1)' }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-burgundy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                        </svg>
                                    </div>
                                    <button onClick={() => setPostLessonModal(null)}
                                        className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                                        style={{ color: 'var(--color-ink-muted)', backgroundColor: 'rgba(var(--color-ink-rgb), 0.05)' }}>✕</button>
                                </div>
                                <h3 className="text-base font-bold mb-1" style={{ fontFamily: 'var(--font-serif)' }}>Enjoying AI Safety?</h3>
                                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-ink-secondary)' }}>
                                    If you're finding it useful, consider supporting the app!
                                </p>
                                <div className="flex gap-2 mb-3">
                                    <button
                                        onClick={() => window.open('https://buymeacoffee.com/elsadonnat0', '_blank')}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium"
                                        style={{ color: '#92400E', backgroundColor: 'rgba(201, 169, 110, 0.15)', border: '1px solid rgba(201, 169, 110, 0.25)' }}
                                    >
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
                                        </svg>
                                        Buy me a coffee
                                    </button>
                                    <button
                                        onClick={() => window.open('https://play.google.com/store/apps/details?id=com.elsadonnat.aisafety', '_blank')}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium"
                                        style={{ color: 'var(--color-ink-secondary)', backgroundColor: 'rgba(var(--color-ink-rgb), 0.05)', border: '1px solid rgba(var(--color-ink-rgb), 0.1)' }}
                                    >
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                        Rate the app
                                    </button>
                                </div>
                                <button onClick={() => setPostLessonModal(null)}
                                    className="w-full py-2 text-sm text-center"
                                    style={{ color: 'var(--color-ink-faint)' }}>Maybe later</button>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return null;
}

function ExitConfirmModal({ show, onConfirm, onCancel }) {
    if (!show) return null;
    return (
        <ConfirmModal
            title="Leave lesson?"
            message="Progress in this lesson will be lost."
            confirmLabel="Leave"
            cancelLabel="Stay"
            danger
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    );
}

// ═══════════════════════════════════════════════════════
// MCQ QUIZ QUESTION (for what, why, how)
// ═══════════════════════════════════════════════════════
function QuizQuestion({ question, lessonCardIds, onAnswer, onNext, onBack, onSkip, descriptionDifficulty = null }) {
    const { event, type } = question;
    const [answered, setAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(null);

    // MCQ options (memoized once)
    const [whatOptions] = useState(() => generateWhatOptions(event, lessonCardIds));
    const [descriptionOptions] = useState(() => generateDescriptionOptions(event, ALL_CONCEPTS, descriptionDifficulty));
    const handleAnswer = useCallback((answer, correct) => {
        if (answered) return;
        feedback.select();
        setSelectedAnswer(answer);
        const s = answer === correct ? 'green' : 'red';
        setScore(s);
        setAnswered(true);
        onAnswer(s);
        feedback.forScore(s);
    }, [answered, onAnswer]);

    const renderButtons = () => {
        if (answered) {
            return (
                <div className="pinned-footer flex gap-3">
                    {onBack && <Button variant="secondary" onClick={onBack}>← Back</Button>}
                    <Button className="flex-1" onClick={onNext}>Continue →</Button>
                </div>
            );
        }
        if (onSkip || onBack) {
            return (
                <div className="pinned-footer flex gap-3">
                    {onBack && <Button variant="secondary" onClick={onBack}>← Back</Button>}
                    {onSkip && <Button className="flex-1" variant="secondary" onClick={onSkip}>Skip</Button>}
                </div>
            );
        }
        return null;
    };

    // ─ WHAT IS X? MCQ ─
    if (type === 'what') {
        return (
            <div className="animate-slide-in-right">
                <Card style={answered && score ? { backgroundColor: SCORE_COLORS[score].bg, borderLeft: `3px solid ${SCORE_COLORS[score].border}` } : {}}>
                    <p className="text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: 'var(--color-ink-faint)' }}>What is this concept?</p>
                    <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
                        {event.quizDescription || event.description.substring(0, 120)}...
                    </p>
                    <div className="mcq-options mcq-options--grid">
                        {whatOptions.map((opt, i) => {
                            const isCorrect = opt.id === event.id;
                            const isSelected = selectedAnswer === opt.id;
                            let optStyle = {};
                            if (answered) {
                                if (isCorrect) optStyle = { backgroundColor: 'rgba(5, 150, 105, 0.1)', borderColor: 'var(--color-success)' };
                                else if (isSelected && !isCorrect) optStyle = { backgroundColor: 'rgba(166, 61, 61, 0.1)', borderColor: 'var(--color-error)' };
                            }
                            return (
                                <button key={i} onClick={() => handleAnswer(opt.id, event.id)} disabled={answered}
                                    className="mcq-option"
                                    style={{ borderColor: isSelected && !answered ? 'var(--color-burgundy)' : undefined, ...optStyle }}>
                                    <span className="font-semibold">{opt.title}</span>
                                    {answered && isCorrect && <span className="ml-2 text-xs" style={{ color: 'var(--color-success)' }}>✓</span>}
                                </button>
                            );
                        })}
                    </div>
                </Card>
                {renderButtons()}
            </div>
        );
    }

    // ─ WHY DOES X MATTER? MCQ ─
    if (type === 'why') {
        return (
            <div className="animate-slide-in-right">
                <Card style={answered && score ? { backgroundColor: SCORE_COLORS[score].bg, borderLeft: `3px solid ${SCORE_COLORS[score].border}` } : {}}>
                    <p className="text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: 'var(--color-ink-faint)' }}>Why does this matter?</p>
                    <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-serif)' }}>{event.title}</h3>
                    <p className="text-sm mb-5" style={{ color: 'var(--color-ink-muted)' }}>
                        <CategoryTag category={event.category} />
                    </p>
                    <div className="mcq-options">
                        {descriptionOptions.map((opt, i) => {
                            const isCorrect = opt.isCorrect;
                            const isSelected = selectedAnswer === i;
                            let optStyle = {};
                            if (answered) {
                                if (isCorrect) optStyle = { backgroundColor: 'rgba(5, 150, 105, 0.1)', borderColor: 'var(--color-success)' };
                                else if (isSelected && !isCorrect) optStyle = { backgroundColor: 'rgba(166, 61, 61, 0.1)', borderColor: 'var(--color-error)' };
                            }
                            return (
                                <button key={i} onClick={() => handleAnswer(i, descriptionOptions.findIndex(o => o.isCorrect))} disabled={answered}
                                    className="mcq-option"
                                    style={{ borderColor: isSelected && !answered ? 'var(--color-burgundy)' : undefined, ...optStyle }}>
                                    <span className="leading-relaxed text-sm block" style={{ color: 'var(--color-ink-secondary)' }}>{opt.description}</span>
                                    {answered && isCorrect && <span className="ml-2 text-xs font-bold mt-1 block" style={{ color: 'var(--color-success)' }}>✓ Correct</span>}
                                </button>
                            );
                        })}
                    </div>
                </Card>
                {renderButtons()}
            </div>
        );
    }

    // ─ HOW DOES X WORK? MCQ ─
    if (type === 'how') {
        return (
            <div className="animate-slide-in-right">
                <Card style={answered && score ? { backgroundColor: SCORE_COLORS[score].bg, borderLeft: `3px solid ${SCORE_COLORS[score].border}` } : {}}>
                    <p className="text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: 'var(--color-ink-faint)' }}>How does this work?</p>
                    <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-serif)' }}>{event.title}</h3>
                    <p className="text-sm mb-5" style={{ color: 'var(--color-ink-muted)' }}>
                        <CategoryTag category={event.category} />
                    </p>
                    <div className="mcq-options">
                        {descriptionOptions.map((opt, i) => {
                            const isCorrect = opt.isCorrect;
                            const isSelected = selectedAnswer === i;
                            let optStyle = {};
                            if (answered) {
                                if (isCorrect) optStyle = { backgroundColor: 'rgba(5, 150, 105, 0.1)', borderColor: 'var(--color-success)' };
                                else if (isSelected && !isCorrect) optStyle = { backgroundColor: 'rgba(166, 61, 61, 0.1)', borderColor: 'var(--color-error)' };
                            }
                            return (
                                <button key={i} onClick={() => handleAnswer(i, descriptionOptions.findIndex(o => o.isCorrect))} disabled={answered}
                                    className="mcq-option"
                                    style={{ borderColor: isSelected && !answered ? 'var(--color-burgundy)' : undefined, ...optStyle }}>
                                    <span className="leading-relaxed text-sm block" style={{ color: 'var(--color-ink-secondary)' }}>{opt.description}</span>
                                    {answered && isCorrect && <span className="ml-2 text-xs font-bold mt-1 block" style={{ color: 'var(--color-success)' }}>✓ Correct</span>}
                                </button>
                            );
                        })}
                    </div>
                </Card>
                {renderButtons()}
            </div>
        );
    }

    return null;
}

// ═══════════════════════════════════════════════════════
// PROGRESS TIMELINE — dots + lines showing session progress
// ═══════════════════════════════════════════════════════
function ProgressTimeline({ quizResults, eventsCount, questionsPerCard = 2, recapPerCard, currentQuestionIndex, variant = 'header' }) {
    const isCheckpoint = variant === 'checkpoint';
    const dotSize = isCheckpoint ? 12 : 8;
    const currentDotSize = isCheckpoint ? 14 : 10;
    const futureDotSize = isCheckpoint ? 8 : 6;
    const lineH = isCheckpoint ? 3 : 2;
    const gap = isCheckpoint ? 6 : 4;
    const groupGap = isCheckpoint ? 14 : 10;
    const sectionGap = isCheckpoint ? 22 : 16;

    const learnCount = eventsCount * questionsPerCard;
    const recapCount = eventsCount * recapPerCard;

    const getColor = (index) => {
        if (index >= quizResults.length) return null;
        const score = quizResults[index].firstScore;
        if (score === 'green') return 'var(--color-success)';
        if (score === 'yellow') return 'var(--color-warning)';
        return 'var(--color-error)';
    };

    const renderDot = (index) => {
        const isCurrent = index === currentQuestionIndex;
        const isFuture = index > quizResults.length || (index === quizResults.length && !isCurrent);
        const color = getColor(index);
        const size = isCurrent ? currentDotSize : (isFuture ? futureDotSize : dotSize);

        return (
            <div key={`dot-${index}`}
                className={`rounded-full flex-shrink-0 transition-all duration-300 ${isCurrent ? 'timeline-dot-current' : ''} ${isCheckpoint ? 'timeline-dot-stagger' : ''}`}
                style={{
                    width: size, height: size,
                    backgroundColor: color || (isCurrent ? 'var(--color-burgundy)' : 'rgba(28, 25, 23, 0.15)'),
                    opacity: isFuture && !isCurrent ? 0.3 : 1,
                    border: isCurrent ? '2px solid var(--color-burgundy)' : 'none',
                    ...(isCheckpoint ? { animationDelay: `${index * 50}ms` } : {}),
                }}
            />
        );
    };

    const renderLine = (afterIndex) => {
        const color = getColor(afterIndex);
        return (
            <div key={`line-${afterIndex}`} style={{
                width: gap + 4, height: lineH,
                backgroundColor: color || 'rgba(28, 25, 23, 0.12)',
                opacity: afterIndex < quizResults.length ? 0.6 : 0.2,
                borderRadius: 1, flexShrink: 0,
            }} />
        );
    };

    // Build learn card groups (2 dots per card)
    const learnGroups = [];
    for (let card = 0; card < eventsCount; card++) {
        const group = [];
        for (let q = 0; q < questionsPerCard; q++) {
            group.push(card * questionsPerCard + q);
        }
        learnGroups.push(group);
    }

    return (
        <div className="flex items-center justify-center w-full" style={{ minHeight: isCheckpoint ? 24 : 16 }}>
            {/* Learn section */}
            {learnGroups.map((group, gi) => (
                <div key={`lg-${gi}`} className="flex items-center" style={{ gap: 0 }}>
                    {group.map((dotIdx, di) => (
                        <div key={dotIdx} className="flex items-center" style={{ gap: 0 }}>
                            {renderDot(dotIdx)}
                            {di < group.length - 1 && renderLine(dotIdx)}
                        </div>
                    ))}
                    {/* Gap between card groups */}
                    {gi < learnGroups.length - 1 && <div style={{ width: groupGap }} />}
                </div>
            ))}

            {/* Section divider between learn and recap */}
            {recapCount > 0 && (
                <div className="flex items-center" style={{ gap: 2, marginLeft: sectionGap - groupGap, marginRight: sectionGap - groupGap }}>
                    <div className="rounded-full" style={{ width: 2, height: 2, backgroundColor: 'var(--color-ink-faint)', opacity: 0.4 }} />
                    <div className="rounded-full" style={{ width: 2, height: 2, backgroundColor: 'var(--color-ink-faint)', opacity: 0.4 }} />
                </div>
            )}

            {/* Recap section (flat, no grouping since shuffled) */}
            {recapCount > 0 && (
                <div className="flex items-center" style={{ gap: 0 }}>
                    {Array.from({ length: recapCount }, (_, i) => learnCount + i).map((dotIdx, i) => (
                        <div key={dotIdx} className="flex items-center" style={{ gap: 0 }}>
                            {renderDot(dotIdx)}
                            {i < recapCount - 1 && renderLine(dotIdx)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════
// CHECKPOINT SCREEN (brief interstitial at card boundaries)
// ═══════════════════════════════════════════════════════
function CheckpointScreen({ data, onDismiss, quizResults, totalQuestions, eventsCount, recapPerCard }) {
    const { label, greenCount } = data;

    useEffect(() => {
        const timer = setTimeout(onDismiss, 1000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <div className="lesson-flow-container animate-checkpoint-enter" onClick={onDismiss}
            style={{ cursor: 'pointer', userSelect: 'none' }}>
            <div className="flex-1 min-h-0 flex flex-col items-center justify-center py-6">
                <ProgressTimeline
                    quizResults={quizResults}
                    totalQuestions={totalQuestions}
                    eventsCount={eventsCount}
                    recapPerCard={recapPerCard}
                    currentQuestionIndex={quizResults.length}
                    variant="checkpoint"
                />
                <p className="text-sm font-semibold mt-5" style={{ color: 'var(--color-ink-secondary)' }}>
                    {label}
                </p>
                {greenCount > 0 && (
                    <p className="text-xs mt-1" style={{ color: 'var(--color-success)' }}>
                        {greenCount} correct so far
                    </p>
                )}
            </div>
        </div>
    );
}

