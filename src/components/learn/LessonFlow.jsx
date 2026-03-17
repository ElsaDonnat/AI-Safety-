import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getConceptById, getConceptsByIds, ALL_CONCEPTS, CATEGORY_CONFIG } from '../../data/concepts';
import { generateWhatOptions, generateDescriptionOptions, calculateXP, SCORE_COLORS, shuffle } from '../../data/quiz';
import { calculateNextReview } from '../../data/spacedRepetition';
import { Card, Button, CategoryTag, CategoryIcon, Divider, StarButton, ConfirmModal, ExpandableText, AnimatedCounter, CardConnections, MasteryDots } from '../shared';
import { formatTag } from '../../utils/formatTag';
import { flyXPToStar } from '../../utils/xpAnimation';
import Mascot from '../Mascot';
import { TOPICS, CHAPTERS, DIFFICULTY_COLORS } from '../../data/lessons';

// Monoline topic icons — matches LearnPage ICON_SVG
const TOPIC_ICON = {
    'ai-basics': (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" /><line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" /><line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" /><path d="M9 15h6" />
        </svg>
    ),
    'ai-progress': (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
        </svg>
    ),
    'ai-concepts': (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
        </svg>
    ),
};

// Highlight key AI terms in coral
function highlightText(text) {
    const HIGHLIGHT_TERMS = [
        'AI', 'ML', 'artificial intelligence', 'machine learning', 'deep learning',
        'neural network', 'neural networks', 'training', 'model', 'models',
        'data', 'algorithm', 'algorithms', 'GPT', 'LLM', 'alignment',
        'safety', 'risk', 'bias', 'fairness', 'interpretability', 'RLHF',
        'reward', 'agent', 'agents', 'human', 'intelligence', 'tasks',
        'patterns', 'layers', 'parameters', 'compute', 'scaling',
    ];
    // Build regex — match whole words, case insensitive for most but preserve case
    const escaped = HIGHLIGHT_TERMS.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => {
        if (regex.test(part) || HIGHLIGHT_TERMS.some(t => t.toLowerCase() === part.toLowerCase())) {
            return <span key={i} style={{ color: 'var(--color-burgundy)', fontWeight: 600 }}>{part}</span>;
        }
        return part;
    });
}
import { cardImage } from '../../utils/images';
import * as feedback from '../../services/feedback';
import { shareText, buildLessonShareText } from '../../services/share';
import StreakFlame from '../StreakFlame';
import StreakCelebration from '../StreakCelebration';

// ─── PHASES ────────────────────────────────────────────
const PHASE = {
    INTRO: 'intro',
    TOPIC_INTRO: 'topic_intro',
    LEARN_CARD: 'learn_card',
    LEARN_QUIZ: 'learn_quiz',
    RECAP_TRANSITION: 'recap_transition',
    RECAP: 'recap',
    FINAL_REVIEW: 'final_review',
    SUMMARY: 'summary',
};

// 3 mastery dimensions for AI Safety
const QUESTION_TYPES = ['what', 'why', 'how'];

export default function LessonFlow({ lesson, onComplete }) {
    const { state, dispatch } = useApp();
    const recapPerCard = state.recapPerCard ?? 1;
    const concepts = useMemo(() => getConceptsByIds(lesson.cardIds || []), [lesson]);
    const topic = useMemo(() => TOPICS.find(t => t.id === lesson.topic), [lesson]);
    const chapter = useMemo(() => CHAPTERS.find(ch => ch.id === lesson.chapter), [lesson]);

    const [phase, setPhase] = useState(PHASE.INTRO);
    const [cardIndex, setCardIndex] = useState(0);
    const [learnQuizIndex, setLearnQuizIndex] = useState(0);
    const [recapIndex, setRecapIndex] = useState(0);
    const [reviewIndex, setReviewIndex] = useState(0);
    const [quizResults, setQuizResults] = useState([]);
    const [selectedDot, setSelectedDot] = useState(null);
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const [checkpointData, setCheckpointData] = useState(null);
    const xpDispatched = useRef(false);
    const pendingNextAction = useRef(null);
    const lastAnswerScore = useRef(null);
    const sessionStartTime = useRef(null);
    const [sessionDuration, setSessionDuration] = useState(0);
    const [shareToast, setShareToast] = useState(false);
    const [streakCelebration, setStreakCelebration] = useState(null);

    const selectedTypes = useMemo(() => {
        return concepts.map(() => shuffle([...QUESTION_TYPES]));
    }, [concepts]);

    const learnTypes = useMemo(() => {
        return selectedTypes.map(types => types.slice(0, 2));
    }, [selectedTypes]);

    const remainingTypes = useMemo(() => {
        return selectedTypes.map(types => types[2]);
    }, [selectedTypes]);

    const learnQuizQuestions = useMemo(() => {
        const qs = [];
        concepts.forEach((concept, i) => {
            learnTypes[i].forEach(type => {
                qs.push({ concept, type, cardIdx: i, phase: 'learn' });
            });
        });
        return qs;
    }, [concepts, learnTypes]);

    const [recapQuestions] = useState(() => {
        if (recapPerCard === 0) return [];
        const qs = [];
        concepts.forEach((concept, i) => {
            qs.push({ concept, type: remainingTypes[i], cardIdx: i, phase: 'recap' });
        });
        return shuffle(qs);
    });

    const currentCardLearnQs = useMemo(() => {
        return learnQuizQuestions.filter(q => q.cardIdx === cardIndex);
    }, [learnQuizQuestions, cardIndex]);

    const hardResults = useMemo(() => {
        return quizResults.filter(r => r.firstScore === 'red' || r.firstScore === 'yellow');
    }, [quizResults]);

    const totalQuestions = concepts.length * (2 + recapPerCard);
    const answeredCount = quizResults.length;

    useEffect(() => { sessionStartTime.current = Date.now(); }, []);

    useEffect(() => {
        if (phase === PHASE.LEARN_CARD) feedback.cardReveal();
    }, [phase, cardIndex]);

    useEffect(() => {
        if (shareToast) {
            const t = setTimeout(() => setShareToast(false), 2000);
            return () => clearTimeout(t);
        }
    }, [shareToast]);

    useEffect(() => {
        if (phase === PHASE.SUMMARY && !xpDispatched.current) {
            xpDispatched.current = true;
            feedback.complete();
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
            dispatch({ type: 'MARK_CARDS_SEEN', cardIds: concepts.map(c => c.id) });
            dispatch({ type: 'ADD_XP', amount: xp });
            const duration = sessionStartTime.current ? Math.round((Date.now() - sessionStartTime.current) / 1000) : 0;
            setSessionDuration(duration); // eslint-disable-line react-hooks/set-state-in-effect
            dispatch({ type: 'RECORD_STUDY_SESSION', duration, sessionType: 'lesson', questionsAnswered: quizResults.length });
            if (!wasActiveToday) {
                const newStreak = prevStreakStatus === 'at-risk' ? state.currentStreak + 1 : 1;
                setTimeout(() => setStreakCelebration({ previousStatus: prevStreakStatus, newStreak }), 600);
            }
        }
    }, [phase, quizResults, lesson.id, dispatch, state.lastActiveDate, state.currentStreak, concepts]);

    const handleExit = useCallback(() => {
        setShowExitConfirm(true);
    }, []);

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
        const schedule = state.srSchedule?.[cardId] || { interval: 0, ease: 2.5, reviewCount: 0 };
        const next = calculateNextReview(schedule, score);
        dispatch({ type: 'UPDATE_SR_SCHEDULE', cardId, ...next });
    }, [dispatch, state.srSchedule]);

    const handleNext = useCallback((originalNext, _questionConcept, isCardBoundary = false) => {
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

    if (checkpointData) {
        return <CheckpointScreen data={checkpointData} onDismiss={dismissCheckpoint}
            quizResults={quizResults} totalQuestions={totalQuestions}
            conceptsCount={concepts.length} recapPerCard={recapPerCard} />;
    }

    // ════════════════════════════════════════════════════
    // INTRO
    // ════════════════════════════════════════════════════
    if (phase === PHASE.INTRO) {
        const timesCompleted = state.completedLessons[lesson.id] || 0;
        const startLesson = () => {
            setPhase(PHASE.LEARN_CARD);
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
                <div className="flex-1 min-h-0 flex flex-col items-center justify-center" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="py-2 w-full">
                        {/* Header: lesson number badge + type + title + difficulty chip — centered */}
                        <div className="text-center mb-4">
                            {/* Lesson number badge */}
                            <div className="flex justify-center mb-3">
                                <div className="w-10 h-10 rounded-[3px] flex items-center justify-center"
                                    style={{
                                        backgroundColor: topic?.color || 'var(--color-bronze)',
                                        color: '#fff',
                                    }}>
                                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600 }}>
                                        {lesson.number + 1}
                                    </span>
                                </div>
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-widest block mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-faint)' }}>
                                {lesson.isFoundational ? 'Topic Introduction' : `Lesson ${lesson.number + 1}`}
                            </span>
                            <h1 className="lesson-intro-title font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                                {lesson.title}
                            </h1>
                            {chapter && (() => {
                                const diffColor = DIFFICULTY_COLORS[chapter.difficulty] || '#888';
                                return (
                                    <span
                                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[2px] uppercase tracking-wider mt-2"
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
                                );
                            })()}
                        </div>

                        {/* Topic info — icon + name + description in one row */}
                        {topic && (
                            <div className="flex items-start gap-3 px-4 py-3 mb-4 rounded-[3px]"
                                style={{ backgroundColor: `${topic.color}08`, borderLeft: `3px solid ${topic.color}` }}>
                                <span className="flex-shrink-0 mt-0.5">{TOPIC_ICON[topic.icon]?.(topic.color)}</span>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>{topic.title}</p>
                                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>{topic.description}</p>
                                </div>
                            </div>
                        )}

                        {/* Stats line */}
                        <p className="text-xs text-center mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-muted)' }}>
                            {concepts.length} {concepts.length === 1 ? 'concept' : 'concepts'} {'\u00B7'} {totalQuestions} questions {'\u00B7'} ~{Math.max(1, Math.round(totalQuestions / 2))} min
                        </p>

                        {/* Concept cards — with coral highlights */}
                        {concepts.length > 0 && (
                            <div className="flex flex-col gap-1.5 mb-2 text-left">
                                {concepts.map((concept, i) => {
                                    const catConfig = CATEGORY_CONFIG[concept.category];
                                    return (
                                        <div key={concept.id}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-[3px] animate-fade-in-up"
                                            style={{ backgroundColor: `${catConfig?.color || '#999'}10`, border: `1.5px solid ${catConfig?.color || 'var(--color-ink-faint)'}25`, animationDelay: `${i * 0.1}s` }}>
                                            <CategoryIcon category={concept.category} size={18} />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-ink)' }}>{concept.title}</p>
                                                <p className="text-xs" style={{ color: 'var(--color-ink-secondary)' }}>{highlightText(concept.summary)}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {timesCompleted > 0 && (
                            <p className="text-xs font-medium mt-1 text-center" style={{ color: 'var(--color-success)' }}>
                                Completed {timesCompleted} {timesCompleted === 1 ? 'time' : 'times'}
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
    // LEARN CARD
    // ════════════════════════════════════════════════════
    if (phase === PHASE.LEARN_CARD) {
        const concept = concepts[cardIndex];
        if (!concept) { setPhase(PHASE.RECAP_TRANSITION); return null; }

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
                        <span className="text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-[2px]"
                            style={{ backgroundColor: 'var(--color-burgundy-soft)', color: 'var(--color-burgundy)' }}>
                            Study {'\u00B7'} {cardIndex + 1}/{concepts.length}
                        </span>
                    </div>
                    <ProgressTimeline quizResults={quizResults} totalQuestions={totalQuestions}
                        conceptsCount={concepts.length} recapPerCard={recapPerCard}
                        currentQuestionIndex={cardIndex * 2} variant="header" />
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto mt-4" key={concept.id}>
                    <div className="animate-slide-in-right">
                        <Card>
                            <div className="flex items-center justify-between">
                                <CategoryTag category={concept.category} />
                                <div className="relative">
                                    <StarButton
                                        isStarred={(state.starredCards || []).includes(concept.id)}
                                        onClick={() => dispatch({ type: 'TOGGLE_STAR', cardId: concept.id })}
                                    />
                                    {cardIndex === 0 && !state.hasSeenFavoriteTip && (
                                        <div className="absolute right-0 top-full mt-1 w-56 z-50 animate-fade-in">
                                            <div className="rounded-[3px] p-3 text-xs leading-relaxed"
                                                style={{ backgroundColor: 'var(--color-card)', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', border: '1px solid rgba(var(--color-ink-rgb), 0.15)', color: 'var(--color-ink-secondary)' }}>
                                                <div className="absolute -top-1.5 right-4 w-3 h-3 rotate-45"
                                                    style={{ backgroundColor: 'var(--color-card)', borderTop: '1px solid rgba(var(--color-ink-rgb), 0.15)', borderLeft: '1px solid rgba(var(--color-ink-rgb), 0.15)' }} />
                                                <p><strong style={{ color: 'var(--color-ink)' }}>Tap the star</strong> to save concepts to your favorites.</p>
                                                <button onClick={(e) => { e.stopPropagation(); dispatch({ type: 'DISMISS_FAVORITE_TIP' }); }}
                                                    className="mt-2 text-xs font-semibold"
                                                    style={{ color: 'var(--color-burgundy)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                                    Got it
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {concept.image && (
                                <div className="mt-3 mb-2 rounded-[3px] overflow-hidden flex items-center justify-center"
                                    style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.03)' }}>
                                    <img
                                        src={cardImage(concept.image)}
                                        alt={concept.title}
                                        className="w-full max-h-56 object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            )}
                            <h2 className="text-xl font-bold mt-3 mb-2 leading-snug" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>{concept.title}</h2>
                            {concept.summary && <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-ink-muted)' }}>{concept.summary}</p>}
                            <ExpandableText lines={3} className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-ink-secondary)' }}>
                                {highlightText(concept.description)}
                            </ExpandableText>
                            {concept.tags && concept.tags.length > 0 && (
                                <div className="flex items-center gap-1.5 flex-wrap mb-3">
                                    {concept.tags.map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-[2px] font-medium"
                                            style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.05)', color: 'var(--color-ink-muted)' }}>{formatTag(tag)}</span>
                                    ))}
                                </div>
                            )}
                            <CardConnections cardId={concept.id} seenCardIds={state.seenCards || []} allConcepts={ALL_CONCEPTS} />
                        </Card>
                    </div>
                </div>
                <div className="flex-shrink-0 flex gap-3 pt-4 pb-2">
                    {cardIndex > 0 && (
                        <Button variant="secondary" onClick={() => { setCardIndex(i => i - 1); setLearnQuizIndex(0); }}>{'\u2190 Back'}</Button>
                    )}
                    <Button className="flex-1" onClick={() => { setLearnQuizIndex(0); setPhase(PHASE.LEARN_QUIZ); }}>{'Quiz Me \u2192'}</Button>
                </div>
            </div>
            </>
        );
    }

    // ════════════════════════════════════════════════════
    // LEARN QUIZ
    // ════════════════════════════════════════════════════
    if (phase === PHASE.LEARN_QUIZ) {
        const q = currentCardLearnQs[learnQuizIndex];
        if (!q) {
            const next = cardIndex + 1;
            if (next < concepts.length) { setCardIndex(next); setLearnQuizIndex(0); setPhase(PHASE.LEARN_CARD); }
            else if (recapPerCard > 0 && concepts.length > 2) { setPhase(PHASE.RECAP_TRANSITION); }
            else if (recapPerCard > 0) { setRecapIndex(0); setPhase(PHASE.RECAP); }
            else { setPhase(PHASE.SUMMARY); }
            return null;
        }
        const isLastOfCard = learnQuizIndex === currentCardLearnQs.length - 1;
        return (
            <>
            <ExitConfirmModal show={showExitConfirm} onConfirm={onComplete} onCancel={() => setShowExitConfirm(false)} />
            <div className="lesson-flow-container">
                <div className="flex-shrink-0 pt-4">
                    <div className="flex items-center justify-center mb-2 relative">
                        <button onClick={handleExit} className="text-sm flex items-center gap-1 absolute left-0" style={{ color: 'var(--color-ink-muted)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                            Exit
                        </button>
                        <span className="text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-[2px]"
                            style={{ backgroundColor: 'var(--color-burgundy-soft)', color: 'var(--color-burgundy)' }}>
                            Learn Quiz {'\u00B7'} {answeredCount + 1}/{totalQuestions}
                        </span>
                    </div>
                    <ProgressTimeline quizResults={quizResults} totalQuestions={totalQuestions}
                        conceptsCount={concepts.length} recapPerCard={recapPerCard}
                        currentQuestionIndex={answeredCount} variant="header" />
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto mt-4" key={`learn-q-${cardIndex}-${learnQuizIndex}`}>
                    <QuizQuestion question={q} lessonCardIds={lesson.cardIds} descriptionDifficulty={1}
                        onAnswer={(score) => recordAnswer(q.concept.id, q.type, score)}
                        onNext={() => handleNext(() => setLearnQuizIndex(i => i + 1), q.concept,
                            (isLastOfCard && cardIndex < concepts.length - 1)
                                ? `Card ${cardIndex + 1} of ${concepts.length} complete`
                                : false)}
                        onBack={learnQuizIndex > 0 ? () => setLearnQuizIndex(i => i - 1) : null} />
                </div>
            </div>
            </>
        );
    }

    // ════════════════════════════════════════════════════
    // RECAP TRANSITION
    // ════════════════════════════════════════════════════
    if (phase === PHASE.RECAP_TRANSITION) {
        return (
            <div className="lesson-flow-container animate-fade-in">
                <div className="flex-1 min-h-0 overflow-y-auto">
                    <div className="text-center py-6">
                        <div className="animate-recap-pulse"><Mascot mood="thinking" size={72} /></div>
                        <h2 className="text-2xl font-bold mt-6 mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>Time to Recap</h2>
                        <p className="text-sm mb-1" style={{ color: 'var(--color-ink-muted)' }}>{"Now let's see how well you remember everything"}</p>
                        <p className="text-xs mb-6" style={{ color: 'var(--color-ink-faint)' }}>{recapQuestions.length} {recapQuestions.length === 1 ? 'question' : 'questions'}</p>
                        <div className="flex flex-col gap-1.5 mt-1 mb-4 text-left mx-auto" style={{ maxWidth: 320 }}>
                            {concepts.map((c, i) => {
                                const catConfig = CATEGORY_CONFIG[c.category];
                                return (
                                    <div key={c.id} className="flex items-center gap-3 px-3 py-2.5 rounded-[3px] animate-fade-in-up"
                                        style={{ backgroundColor: `${catConfig?.color || '#999'}10`, border: `1.5px solid ${catConfig?.color || 'var(--color-ink-faint)'}25`, animationDelay: `${i * 0.1}s` }}>
                                        <CategoryIcon category={c.category} size={18} />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-ink)' }}>{c.title}</p>
                                            <p className="text-xs truncate" style={{ color: catConfig?.color || 'var(--color-ink-muted)' }}>{c.summary}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex-shrink-0 pt-4 pb-2">
                    <Button className="w-full" onClick={() => { setRecapIndex(0); setPhase(PHASE.RECAP); }}>{'Start Recap \u2192'}</Button>
                </div>
            </div>
        );
    }

    // ════════════════════════════════════════════════════
    // RECAP
    // ════════════════════════════════════════════════════
    if (phase === PHASE.RECAP) {
        const q = recapQuestions[recapIndex];
        if (!q) {
            if (hardResults.length > 0) { setReviewIndex(0); setPhase(PHASE.FINAL_REVIEW); }
            else { setPhase(PHASE.SUMMARY); }
            return null;
        }
        return (
            <>
            <ExitConfirmModal show={showExitConfirm} onConfirm={onComplete} onCancel={() => setShowExitConfirm(false)} />
            <div className="lesson-flow-container">
                <div className="flex-shrink-0 pt-4">
                    <div className="flex items-center justify-center mb-2 relative">
                        <button onClick={handleExit} className="text-sm flex items-center gap-1 absolute left-0" style={{ color: 'var(--color-ink-muted)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                            Exit
                        </button>
                        <span className="text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-[2px]"
                            style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.15)', color: 'var(--color-burgundy)' }}>
                            Recap {'\u00B7'} {answeredCount + 1}/{totalQuestions}
                        </span>
                    </div>
                    <ProgressTimeline quizResults={quizResults} totalQuestions={totalQuestions}
                        conceptsCount={concepts.length} recapPerCard={recapPerCard}
                        currentQuestionIndex={answeredCount} variant="header" />
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto mt-4" key={`recap-${recapIndex}`}>
                    <QuizQuestion question={q} lessonCardIds={lesson.cardIds} descriptionDifficulty={2}
                        onAnswer={(score) => recordAnswer(q.concept.id, q.type, score)}
                        onNext={() => handleNext(() => setRecapIndex(i => i + 1), q.concept, false)}
                        onBack={recapIndex > 0 ? () => setRecapIndex(i => i - 1) : null}
                        onSkip={() => setRecapIndex(i => i + 1)} />
                </div>
            </div>
            </>
        );
    }

    // ════════════════════════════════════════════════════
    // FINAL REVIEW
    // ════════════════════════════════════════════════════
    if (phase === PHASE.FINAL_REVIEW) {
        const hardConcepts = [...new Set(hardResults.map(r => r.cardId))].map(id => concepts.find(c => c.id === id)).filter(Boolean);
        if (reviewIndex < hardConcepts.length) {
            const concept = hardConcepts[reviewIndex];
            const conceptResults = hardResults.filter(r => r.cardId === concept.id);
            const worstScore = conceptResults.some(r => r.firstScore === 'red') ? 'red' : 'yellow';
            const borderColor = worstScore === 'red' ? 'var(--color-error)' : 'var(--color-warning)';
            return (
                <div className="lesson-flow-container animate-fade-in">
                    <div className="flex-shrink-0 text-center mb-4 pt-4">
                        <Mascot mood={worstScore === 'red' ? 'surprised' : 'thinking'} size={50} />
                        <p className="text-sm font-semibold mt-2" style={{ color: borderColor }}>
                            {worstScore === 'red' ? "Let's review this one" : "Almost had it"}
                        </p>
                        <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>Review {reviewIndex + 1} of {hardConcepts.length}</span>
                    </div>
                    <div className="flex-1 min-h-0 overflow-y-auto">
                        <Card className="animate-slide-in-right" style={{ borderLeft: `3px solid ${borderColor}` }}>
                            <CategoryTag category={concept.category} />
                            <h2 className="text-xl font-bold mt-3 mb-2" style={{ fontFamily: 'var(--font-display)' }}>{concept.title}</h2>
                            {concept.summary && <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-burgundy)' }}>{concept.summary}</p>}
                            <ExpandableText lines={3} className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-ink-secondary)' }}>
                                {concept.description}
                            </ExpandableText>
                        </Card>
                    </div>
                    <div className="flex-shrink-0 flex gap-3 pt-4 pb-2">
                        {reviewIndex > 0 && <Button variant="secondary" onClick={() => setReviewIndex(i => i - 1)}>{'\u2190 Back'}</Button>}
                        <Button className="flex-1" onClick={() => setReviewIndex(i => i + 1)}>
                            {reviewIndex < hardConcepts.length - 1 ? 'Next Review \u2192' : 'See Results \u2192'}
                        </Button>
                    </div>
                </div>
            );
        }
        setPhase(PHASE.SUMMARY);
        return null;
    }

    // ════════════════════════════════════════════════════
    // SUMMARY
    // ════════════════════════════════════════════════════
    if (phase === PHASE.SUMMARY) {
        const xp = calculateXP(quizResults);
        const greenCount = quizResults.filter(r => r.firstScore === 'green').length;
        const yellowCount = quizResults.filter(r => r.firstScore === 'yellow').length;
        const redCount = quizResults.filter(r => r.firstScore === 'red').length;
        const allPassed = redCount === 0 || quizResults.every(r => r.firstScore !== 'red' || (r.retryScore && r.retryScore !== 'red'));
        const streak = state.currentStreak;
        const sessionMin = Math.floor(sessionDuration / 60);
        const sessionSec = sessionDuration % 60;
        const sessionTimeStr = sessionMin > 0 ? `${sessionMin}m ${sessionSec}s` : `${sessionSec}s`;

        return (
            <div className="lesson-flow-container animate-fade-in">
                <div className="flex-1 min-h-0 overflow-y-auto">
                    <div className="text-center pt-8 pb-4 relative">
                        <Mascot mood={allPassed ? 'celebrating' : 'thinking'} size={64} />
                        <h2 className="text-2xl font-bold mt-2 mb-0.5" style={{ fontFamily: 'var(--font-display)' }}>
                            {allPassed ? 'Lesson Complete!' : 'Keep Practicing'}
                        </h2>
                        <p className="text-sm mb-3" style={{ color: 'var(--color-ink-muted)' }}>{lesson.title}</p>
                        <Card className={allPassed ? 'animate-celebration' : ''} style={{
                            borderTop: allPassed ? '3px solid var(--color-success)' : '3px solid var(--color-warning)',
                        }}>
                            <div className="text-sm font-semibold mb-2" style={{ color: 'var(--color-ink-secondary)' }}>
                                {concepts.length} {concepts.length === 1 ? 'concept' : 'concepts'} {'\u00B7'} {quizResults.length} questions {'\u00B7'} {sessionTimeStr}
                            </div>
                            <div className="flex items-center gap-1 mb-3 justify-center flex-wrap">
                                {quizResults.map((r, i) => (
                                    <button key={i} className="w-3 h-3 rounded-full result-dot-btn animate-dot-stagger"
                                        title={`${concepts.find(c => c.id === r.cardId)?.title || 'Concept'} \u2014 ${r.questionType}`}
                                        onClick={() => setSelectedDot(r)}
                                        style={{ animationDelay: `${i * 40}ms`,
                                            backgroundColor: r.firstScore === 'green' ? 'var(--color-success)' : r.firstScore === 'yellow' ? 'var(--color-warning)' : 'var(--color-error)' }} />
                                ))}
                            </div>
                            <div className="grid grid-cols-3 gap-3 text-center mb-3">
                                <div className="animate-scale-in" style={{ animationDelay: '200ms' }}>
                                    <div className="text-lg font-bold" style={{ color: 'var(--color-success)' }}>{greenCount}</div>
                                    <div className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>Correct</div>
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
                            <div className="mb-3 text-left">
                                {concepts.map(c => {
                                    const mastery = state.cardMastery?.[c.id];
                                    return (
                                        <div key={c.id} className="flex items-center justify-between py-1.5">
                                            <span className="text-xs font-medium truncate flex-1" style={{ color: 'var(--color-ink-secondary)' }}>{c.title}</span>
                                            <MasteryDots mastery={mastery} size="sm" />
                                        </div>
                                    );
                                })}
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
                    <button onClick={async () => {
                        const text = buildLessonShareText({ lessonTitle: lesson.title, greenCount, totalQuestions: quizResults.length, xp, streak });
                        const result = await shareText({ title: 'AI Safety', text });
                        if (result === 'copied') setShareToast(true);
                    }} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[3px] text-sm font-medium transition-colors cursor-pointer"
                        style={{ color: 'var(--color-burgundy)', backgroundColor: 'rgba(var(--color-ink-rgb), 0.08)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
                        </svg>
                        Share Result
                    </button>
                    {shareToast && <p className="text-xs text-center animate-fade-in" style={{ color: 'var(--color-success)' }}>Copied to clipboard!</p>}
                </div>
                {selectedDot && (() => {
                    const dotConcept = concepts.find(c => c.id === selectedDot.cardId);
                    if (!dotConcept) return null;
                    const qType = selectedDot.questionType;
                    const dotColor = selectedDot.firstScore === 'green' ? 'var(--color-success)' : selectedDot.firstScore === 'yellow' ? 'var(--color-warning)' : 'var(--color-error)';
                    const isTarget = selectedDot.firstScore !== 'green';
                    const hlBg = isTarget ? 'var(--color-warning-light)' : 'rgba(5, 150, 105, 0.12)';
                    const typeLabels = { what: 'What is it?', why: 'Why it matters', how: 'How it works' };
                    return (
                        <div className="dot-modal-backdrop" onClick={() => setSelectedDot(null)}>
                            <div className="dot-modal-content" onClick={e => e.stopPropagation()}>
                                <Card style={{ borderLeft: `3px solid ${dotColor}` }}>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-[2px]"
                                            style={{ backgroundColor: hlBg, color: dotColor }}>{typeLabels[qType] || qType}</span>
                                        <button onClick={() => setSelectedDot(null)} className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                                            style={{ color: 'var(--color-ink-muted)', backgroundColor: 'rgba(var(--color-ink-rgb), 0.05)' }}>{'\u2715'}</button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <CategoryTag category={dotConcept.category} />
                                        <StarButton isStarred={(state.starredCards || []).includes(dotConcept.id)}
                                            onClick={() => dispatch({ type: 'TOGGLE_STAR', cardId: dotConcept.id })} />
                                    </div>
                                    <h2 className="text-xl font-bold leading-snug mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>{dotConcept.title}</h2>
                                    <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-ink-secondary)' }}>{dotConcept.description}</p>
                                </Card>
                            </div>
                        </div>
                    );
                })()}
                {streakCelebration && <StreakCelebration previousStatus={streakCelebration.previousStatus} newStreak={streakCelebration.newStreak} onDismiss={() => setStreakCelebration(null)} />}
            </div>
        );
    }

    return null;
}

function ExitConfirmModal({ show, onConfirm, onCancel }) {
    if (!show) return null;
    return <ConfirmModal title="Leave lesson?" message="Progress in this lesson will be lost." confirmLabel="Leave" cancelLabel="Stay" danger onConfirm={onConfirm} onCancel={onCancel} />;
}

// ═══════════════════════════════════════════════════════
// MCQ QUIZ QUESTION (what, why, how)
// ═══════════════════════════════════════════════════════
function QuizQuestion({ question, lessonCardIds, onAnswer, onNext, onBack, onSkip, descriptionDifficulty = null }) {
    const { concept, type } = question;
    const [answered, setAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(null);
    const [whatOptions] = useState(() => generateWhatOptions(concept, lessonCardIds));
    const [descriptionOptions] = useState(() => generateDescriptionOptions(concept, ALL_CONCEPTS, descriptionDifficulty));

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
            return (<div className="pinned-footer flex gap-3">
                {onBack && <Button variant="secondary" onClick={onBack}>{'\u2190 Back'}</Button>}
                <Button className="flex-1" onClick={onNext}>{'Continue \u2192'}</Button>
            </div>);
        }
        if (onSkip || onBack) {
            return (<div className="pinned-footer flex gap-3">
                {onBack && <Button variant="secondary" onClick={onBack}>{'\u2190 Back'}</Button>}
                {onSkip && <Button className="flex-1" variant="secondary" onClick={onSkip}>Skip</Button>}
            </div>);
        }
        return null;
    };

    if (type === 'what') {
        return (
            <div className="animate-slide-in-right">
                <Card style={answered && score ? { backgroundColor: SCORE_COLORS[score].bg, borderLeft: `3px solid ${SCORE_COLORS[score].border}` } : {}}>
                    <p className="text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: 'var(--color-ink-faint)' }}>What is this concept?</p>
                    <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>{highlightText(concept.quizDescription || concept.description)}</p>
                    <div className="mcq-options mcq-options--grid">
                        {whatOptions.map((opt, i) => {
                            const isCorrect = opt.id === concept.id;
                            const isSelected = selectedAnswer === opt.id;
                            let optStyle = {};
                            if (answered) {
                                if (isCorrect) optStyle = { backgroundColor: 'rgba(5, 150, 105, 0.1)', borderColor: 'var(--color-success)' };
                                else if (isSelected && !isCorrect) optStyle = { backgroundColor: 'rgba(166, 61, 61, 0.1)', borderColor: 'var(--color-error)' };
                            }
                            return (<button key={i} onClick={() => handleAnswer(opt.id, concept.id)} disabled={answered} className="mcq-option"
                                style={{ borderColor: isSelected && !answered ? 'var(--color-burgundy)' : undefined, ...optStyle }}>
                                <span className="font-semibold">{opt.title}</span>
                                {answered && isCorrect && <span className="ml-2 text-xs" style={{ color: 'var(--color-success)' }}>{'\u2713'}</span>}
                            </button>);
                        })}
                    </div>
                </Card>
                {renderButtons()}
            </div>
        );
    }

    if (type === 'why') {
        return (
            <div className="animate-slide-in-right">
                <Card style={answered && score ? { backgroundColor: SCORE_COLORS[score].bg, borderLeft: `3px solid ${SCORE_COLORS[score].border}` } : {}}>
                    <p className="text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: 'var(--color-ink-faint)' }}>Why does this matter?</p>
                    <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>{concept.title}</h3>
                    <p className="text-sm mb-5" style={{ color: 'var(--color-ink-muted)' }}>Which description best explains this concept?</p>
                    <div className="mcq-options">
                        {descriptionOptions.map((opt, i) => {
                            const isCorrect = opt.isCorrect;
                            const isSelected = selectedAnswer === i;
                            let optStyle = {};
                            if (answered) {
                                if (isCorrect) optStyle = { backgroundColor: 'rgba(5, 150, 105, 0.1)', borderColor: 'var(--color-success)' };
                                else if (isSelected && !isCorrect) optStyle = { backgroundColor: 'rgba(166, 61, 61, 0.1)', borderColor: 'var(--color-error)' };
                            }
                            return (<button key={i} onClick={() => handleAnswer(i, descriptionOptions.findIndex(o => o.isCorrect))} disabled={answered} className="mcq-option"
                                style={{ borderColor: isSelected && !answered ? 'var(--color-burgundy)' : undefined, ...optStyle }}>
                                <span className="leading-relaxed text-sm block" style={{ color: 'var(--color-ink-secondary)' }}>{opt.description}</span>
                                {answered && isCorrect && <span className="ml-2 text-xs font-bold mt-1 block" style={{ color: 'var(--color-success)' }}>{'\u2713 Correct'}</span>}
                            </button>);
                        })}
                    </div>
                </Card>
                {renderButtons()}
            </div>
        );
    }

    if (type === 'how') {
        return (
            <div className="animate-slide-in-right">
                <Card style={answered && score ? { backgroundColor: SCORE_COLORS[score].bg, borderLeft: `3px solid ${SCORE_COLORS[score].border}` } : {}}>
                    <p className="text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: 'var(--color-ink-faint)' }}>How does this work?</p>
                    <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>{concept.title}</h3>
                    <p className="text-sm mb-5" style={{ color: 'var(--color-ink-muted)' }}>Pick the correct description</p>
                    <div className="mcq-options">
                        {descriptionOptions.map((opt, i) => {
                            const isCorrect = opt.isCorrect;
                            const isSelected = selectedAnswer === i;
                            let optStyle = {};
                            if (answered) {
                                if (isCorrect) optStyle = { backgroundColor: 'rgba(5, 150, 105, 0.1)', borderColor: 'var(--color-success)' };
                                else if (isSelected && !isCorrect) optStyle = { backgroundColor: 'rgba(166, 61, 61, 0.1)', borderColor: 'var(--color-error)' };
                            }
                            return (<button key={i} onClick={() => handleAnswer(i, descriptionOptions.findIndex(o => o.isCorrect))} disabled={answered} className="mcq-option"
                                style={{ borderColor: isSelected && !answered ? 'var(--color-burgundy)' : undefined, ...optStyle }}>
                                <span className="leading-relaxed text-sm block" style={{ color: 'var(--color-ink-secondary)' }}>{opt.description}</span>
                                {answered && isCorrect && <span className="ml-2 text-xs font-bold mt-1 block" style={{ color: 'var(--color-success)' }}>{'\u2713 Correct'}</span>}
                            </button>);
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
// PROGRESS TIMELINE
// ═══════════════════════════════════════════════════════
function ProgressTimeline({ quizResults, conceptsCount, questionsPerCard = 2, recapPerCard, currentQuestionIndex, variant = 'header' }) {
    const isCheckpoint = variant === 'checkpoint';
    const dotSize = isCheckpoint ? 12 : 8;
    const currentDotSize = isCheckpoint ? 14 : 10;
    const futureDotSize = isCheckpoint ? 8 : 6;
    const lineH = isCheckpoint ? 3 : 2;
    const gap = isCheckpoint ? 6 : 4;
    const groupGap = isCheckpoint ? 14 : 10;
    const sectionGap = isCheckpoint ? 22 : 16;
    const learnCount = conceptsCount * questionsPerCard;
    const recapCount = conceptsCount * recapPerCard;

    const getColor = (index) => {
        if (index >= quizResults.length) return null;
        const s = quizResults[index].firstScore;
        if (s === 'green') return 'var(--color-success)';
        if (s === 'yellow') return 'var(--color-warning)';
        return 'var(--color-error)';
    };

    const renderDot = (index) => {
        const isCurrent = index === currentQuestionIndex;
        const isFuture = index > quizResults.length || (index === quizResults.length && !isCurrent);
        const color = getColor(index);
        const size = isCurrent ? currentDotSize : (isFuture ? futureDotSize : dotSize);
        return (<div key={`dot-${index}`}
            className={`rounded-full flex-shrink-0 transition-all duration-300 ${isCurrent ? 'timeline-dot-current' : ''} ${isCheckpoint ? 'timeline-dot-stagger' : ''}`}
            style={{ width: size, height: size,
                backgroundColor: color || (isCurrent ? 'var(--color-burgundy)' : 'rgba(28, 25, 23, 0.15)'),
                opacity: isFuture && !isCurrent ? 0.3 : 1,
                border: isCurrent ? '2px solid var(--color-burgundy)' : 'none',
                ...(isCheckpoint ? { animationDelay: `${index * 50}ms` } : {}),
            }} />);
    };

    const renderLine = (afterIndex) => {
        const color = getColor(afterIndex);
        return (<div key={`line-${afterIndex}`} style={{
            width: gap + 4, height: lineH,
            backgroundColor: color || 'rgba(28, 25, 23, 0.12)',
            opacity: afterIndex < quizResults.length ? 0.6 : 0.2,
            borderRadius: 1, flexShrink: 0,
        }} />);
    };

    const learnGroups = [];
    for (let card = 0; card < conceptsCount; card++) {
        const group = [];
        for (let q = 0; q < questionsPerCard; q++) { group.push(card * questionsPerCard + q); }
        learnGroups.push(group);
    }

    return (
        <div className="flex items-center justify-center w-full" style={{ minHeight: isCheckpoint ? 24 : 16 }}>
            {learnGroups.map((group, gi) => (
                <div key={`lg-${gi}`} className="flex items-center" style={{ gap: 0 }}>
                    {group.map((dotIdx, di) => (
                        <div key={dotIdx} className="flex items-center" style={{ gap: 0 }}>
                            {renderDot(dotIdx)}
                            {di < group.length - 1 && renderLine(dotIdx)}
                        </div>
                    ))}
                    {gi < learnGroups.length - 1 && <div style={{ width: groupGap }} />}
                </div>
            ))}
            {recapCount > 0 && (
                <div className="flex items-center" style={{ gap: 2, marginLeft: sectionGap - groupGap, marginRight: sectionGap - groupGap }}>
                    <div className="rounded-full" style={{ width: 2, height: 2, backgroundColor: 'var(--color-ink-faint)', opacity: 0.4 }} />
                    <div className="rounded-full" style={{ width: 2, height: 2, backgroundColor: 'var(--color-ink-faint)', opacity: 0.4 }} />
                </div>
            )}
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
// CHECKPOINT SCREEN
// ═══════════════════════════════════════════════════════
function CheckpointScreen({ data, onDismiss, quizResults, totalQuestions, conceptsCount, recapPerCard }) {
    const { label, greenCount } = data;
    useEffect(() => {
        const timer = setTimeout(onDismiss, 1000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <div className="lesson-flow-container animate-checkpoint-enter" onClick={onDismiss} style={{ cursor: 'pointer', userSelect: 'none' }}>
            <div className="flex-1 min-h-0 flex flex-col items-center justify-center py-6">
                <ProgressTimeline quizResults={quizResults} totalQuestions={totalQuestions} conceptsCount={conceptsCount}
                    recapPerCard={recapPerCard} currentQuestionIndex={quizResults.length} variant="checkpoint" />
                <p className="text-sm font-semibold mt-5" style={{ color: 'var(--color-ink-secondary)' }}>{label}</p>
                {greenCount > 0 && <p className="text-xs mt-1" style={{ color: 'var(--color-success)' }}>{greenCount} correct so far</p>}
            </div>
        </div>
    );
}
