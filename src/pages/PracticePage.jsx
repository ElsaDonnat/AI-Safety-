import { useState, useMemo, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_CONCEPTS, getConceptById, CATEGORY_CONFIG } from '../data/concepts';
import { LESSONS, TOPICS } from '../data/lessons';
import { generateWhatOptions, generateDescriptionOptions, SCORE_COLORS, getScoreColor, getScoreLabel, shuffle } from '../data/quiz';
import { calculateNextReview, getDueEvents, getCardStatus } from '../data/spacedRepetition';
import { Card, Button, MasteryDots, ProgressBar, Divider, CategoryTag, StarButton, TabSelector, ConfirmModal, ExpandableText } from '../components/shared';
import Mascot from '../components/Mascot';
import * as feedback from '../services/feedback';
import { shareText, buildPracticeShareText } from '../services/share';
import StreakCelebration from '../components/StreakCelebration';

// ─── Matching colors (same palette as learn flow) ───
const MATCH_COLORS = [
    '#9B8EC4', '#5A9BD5', '#D98C3B', '#D4739D', '#6BAFAC',
];

// ─── Views ───────────────────────────────────────────
const VIEW = {
    HUB: 'hub',
    COLLECTION: 'collection',
    LESSON_PICKER: 'lesson_picker',
    SESSION: 'session',
    RESULTS: 'results',
};

export default function PracticePage({ onSessionChange, registerBackHandler }) {
    const { state, dispatch } = useApp();
    const [view, setView] = useState(VIEW.HUB);
    const [practiceTab, setPracticeTab] = useState(() =>
        window.AISAFETY_OPEN_CARD ? 'collection' : 'hub'
    ); // hub | collection
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [results, setResults] = useState([]);
    const [sessionMode, setSessionMode] = useState(null);
    const [selectedLessons, setSelectedLessons] = useState([]);
    const [collectionSort, setCollectionSort] = useState('success'); // success | times
    const [expandedCardId, setExpandedCardId] = useState(() => {
        if (window.AISAFETY_OPEN_CARD) {
            const id = window.AISAFETY_OPEN_CARD;
            window.AISAFETY_OPEN_CARD = null;
            return id;
        }
        return null;
    });
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const sessionStartTime = useRef(null);
    const sessionRecorded = useRef(false);
    const [sessionDuration, setSessionDuration] = useState(0);
    const [shareToast, setShareToast] = useState(false);
    const [streakCelebration, setStreakCelebration] = useState(null);

    useEffect(() => {
        onSessionChange?.(view === VIEW.SESSION || view === VIEW.RESULTS);
    }, [view, onSessionChange]);

    useEffect(() => {
        if (shareToast) {
            const t = setTimeout(() => setShareToast(false), 2000);
            return () => clearTimeout(t);
        }
    }, [shareToast]);

    // Register back handler for non-hub views
    useEffect(() => {
        if (view !== VIEW.HUB && registerBackHandler) {
            return registerBackHandler(() => {
                if (view === VIEW.SESSION) {
                    setShowExitConfirm(true);
                } else {
                    setView(VIEW.HUB);
                }
            });
        }
    }, [view, registerBackHandler]);

    // ─── Derived data ────────────────────────────────
    const learnedConcepts = useMemo(() => {
        return (state.seenCards || []).map(id => getConceptById(id)).filter(Boolean);
    }, [state.seenCards]);

    const starredConcepts = useMemo(() => {
        return (state.starredCards || []).map(id => getConceptById(id)).filter(Boolean);
    }, [state.starredCards]);

    const conceptStats = useMemo(() => {
        return learnedConcepts.map(c => {
            const mastery = state.cardMastery[c.id];
            const overall = mastery?.overallMastery ?? 0;
            const timesReviewed = mastery?.timesReviewed ?? 0;
            const successRate = timesReviewed > 0 ? Math.round((overall / 9) * 100) : 0;
            const cardStatus = getCardStatus(c.id, state.cardMastery, state.srSchedule || {}, []);
            return { concept: c, mastery, overall, timesReviewed, successRate, cardStatus };
        });
    }, [learnedConcepts, state.cardMastery, state.srSchedule]);

    // 4-status card tiers
    const statusTiers = useMemo(() => {
        const newCards = conceptStats.filter(s => s.cardStatus === 'new');
        const learning = conceptStats.filter(s => s.cardStatus === 'learning');
        const known = conceptStats.filter(s => s.cardStatus === 'known');
        const assimilated = conceptStats.filter(s => s.cardStatus === 'fully_assimilated');
        return { new: newCards, learning, known, fully_assimilated: assimilated };
    }, [conceptStats]);

    // Spaced repetition: cards due for review
    const dueCards = useMemo(() => {
        return getDueEvents(state.srSchedule || {}, state.seenCards || []);
    }, [state.srSchedule, state.seenCards]);

    const weakConcepts = useMemo(() => {
        return [...conceptStats].sort((a, b) => a.overall - b.overall);
    }, [conceptStats]);

    // Group results by card for per-card breakdown (used in RESULTS view)
    const cardBreakdown = useMemo(() => {
        const map = {};
        results.forEach(r => {
            if (!map[r.cardId]) map[r.cardId] = { concept: getConceptById(r.cardId), questions: [] };
            map[r.cardId].questions.push(r);
        });
        return Object.values(map);
    }, [results]);

    // ─── Select 4 cards for a matching question ─────
    const selectMatchConcepts = (pool) => {
        if (pool.length < 4) return null;
        const scoreOrder = { red: 0, null: 1, undefined: 1, yellow: 2, green: 3 };
        const sorted = [...pool].sort((a, b) => {
            const aScore = scoreOrder[state.cardMastery[a.id]?.whyScore] ?? 1;
            const bScore = scoreOrder[state.cardMastery[b.id]?.whyScore] ?? 1;
            return aScore - bScore;
        });
        const byTopic = {};
        for (const c of sorted) {
            const topicId = c.topic || 'other';
            if (!byTopic[topicId]) byTopic[topicId] = [];
            byTopic[topicId].push(c);
        }
        const picked = [];
        const topics = Object.keys(byTopic);
        for (const topic of topics) {
            if (picked.length >= 4) break;
            picked.push(byTopic[topic][0]);
        }
        if (picked.length < 4) {
            const pickedIds = new Set(picked.map(c => c.id));
            for (const c of sorted) {
                if (picked.length >= 4) break;
                if (!pickedIds.has(c.id)) {
                    picked.push(c);
                    pickedIds.add(c.id);
                }
            }
        }
        return picked.slice(0, 4);
    };

    // ─── Question generation ─────────────────────────
    const generateQuestionsForPool = (conceptPool) => {
        const qList = [];
        const shuffled = shuffle([...conceptPool]);
        const pool = shuffled.slice(0, 15);

        const matchConcepts = selectMatchConcepts(pool);
        let matchQuestion = null;
        if (matchConcepts) {
            matchQuestion = {
                type: 'match',
                concepts: matchConcepts,
                names: shuffle(matchConcepts.map(c => ({ id: c.id, label: c.title }))),
                descriptions: shuffle(matchConcepts.map(c => ({ id: c.id, label: c.summary }))),
                key: `practice-match-${Date.now()}-${Math.random()}`,
            };
        }

        const regularCap = matchQuestion ? 10 : 12;

        for (const concept of pool) {
            const mastery = state.cardMastery[concept.id];
            const scores = {
                what: mastery?.whatScore,
                why: mastery?.whyScore,
                how: mastery?.howScore,
            };

            const scoreOrder = { red: 0, null: 1, undefined: 1, yellow: 2, green: 3 };
            const types = Object.entries(scores)
                .sort((a, b) => (scoreOrder[a[1]] ?? 1) - (scoreOrder[b[1]] ?? 1));

            const numQs = Math.min(2, types.filter(t => (scoreOrder[t[1]] ?? 1) < 3).length || 1);
            for (let i = 0; i < numQs && i < types.length; i++) {
                qList.push({
                    concept,
                    type: types[i][0],
                    key: `practice-${concept.id}-${types[i][0]}-${Date.now()}-${Math.random()}`,
                });
            }
            if (qList.length >= regularCap) break;
        }

        const allQuestions = shuffle(qList);
        if (matchQuestion) {
            const pos = Math.floor(Math.random() * (allQuestions.length + 1));
            allQuestions.splice(pos, 0, matchQuestion);
        }
        return allQuestions;
    };

    const startSession = (mode, conceptPool) => {
        const qs = generateQuestionsForPool(conceptPool);
        if (qs.length === 0) return;
        setSessionQuestions(qs);
        setCurrentIndex(0);
        setResults([]);
        setSessionMode(mode);
        sessionStartTime.current = Date.now();
        sessionRecorded.current = false;
        setView(VIEW.SESSION);
    };

    const startSpacedReview = () => {
        const dueIds = dueCards.slice(0, 15).map(d => d.eventId);
        const duePool = dueIds.map(id => getConceptById(id)).filter(Boolean);
        if (duePool.length > 0) {
            startSession('Spaced Review', duePool);
        } else {
            const pool = weakConcepts.filter(w => w.overall < 7).map(w => w.concept);
            startSession('Spaced Review', pool.length > 0 ? pool : learnedConcepts);
        }
    };

    const startFavorites = () => {
        startSession('Favorites', starredConcepts);
    };

    const startLessonPractice = () => {
        const cardIds = selectedLessons.flatMap(lessonId => {
            const lesson = LESSONS.find(l => l.id === lessonId);
            return lesson ? lesson.cardIds : [];
        });
        const concepts = [...new Set(cardIds)].map(id => getConceptById(id)).filter(Boolean);
        const learned = concepts.filter(c => (state.seenCards || []).includes(c.id));
        startSession('By Lesson', learned.length > 0 ? learned : concepts);
        setSelectedLessons([]);
    };

    const startByDifficulty = (difficultyLevel) => {
        const pool = learnedConcepts.filter(c => c.difficulty === difficultyLevel);
        if (pool.length === 0) return;
        const labels = { 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced' };
        startSession(`${labels[difficultyLevel]} Concepts`, pool);
    };

    // ─── No concepts learned ──────────────────────────
    if (learnedConcepts.length === 0) {
        return (
            <div className="py-12 text-center animate-fade-in">
                <Mascot mood="happy" size={70} />
                <h2 className="text-xl font-bold mt-4" style={{ fontFamily: 'var(--font-serif)' }}>
                    Practice awaits
                </h2>
                <p className="text-sm mt-2 mx-4" style={{ color: 'var(--color-ink-muted)' }}>
                    Complete your first lesson to unlock practice mode. Each session targets your weakest areas.
                </p>
            </div>
        );
    }

    // ═══════════════════════════════════════════════════
    // SESSION (active quiz)
    // ═══════════════════════════════════════════════════
    if (view === VIEW.SESSION) {
        const q = sessionQuestions[currentIndex];
        if (!q) return null;

        const handleSessionNext = () => {
            if (currentIndex + 1 >= sessionQuestions.length) {
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
                const xp = results.reduce((s, r) => {
                    const diff = getConceptById(r.cardId)?.difficulty || 1;
                    return s + (r.score === 'green' ? 5 * diff : r.score === 'yellow' ? 2 * diff : 0);
                }, 0);
                if (xp > 0) dispatch({ type: 'ADD_XP', amount: xp });
                if (!sessionRecorded.current && sessionStartTime.current) {
                    sessionRecorded.current = true;
                    const duration = Math.round((Date.now() - sessionStartTime.current) / 1000);
                    setSessionDuration(duration);
                    dispatch({ type: 'RECORD_STUDY_SESSION', duration, sessionType: 'practice', questionsAnswered: results.length });
                }
                if (!wasActiveToday && xp > 0) {
                    const newStreak = prevStreakStatus === 'at-risk' ? state.currentStreak + 1 : 1;
                    setTimeout(() => setStreakCelebration({ previousStatus: prevStreakStatus, newStreak }), 600);
                }
                setView(VIEW.RESULTS);
                feedback.complete();
            } else {
                setCurrentIndex(i => i + 1);
            }
        };

        return (
            <>
            {showExitConfirm && (
                <ConfirmModal
                    title="Leave session?"
                    message="Progress in this session will be lost."
                    confirmLabel="Leave"
                    cancelLabel="Stay"
                    danger
                    onConfirm={() => { setShowExitConfirm(false); setView(VIEW.HUB); }}
                    onCancel={() => setShowExitConfirm(false)}
                />
            )}
            <div className="lesson-flow-container">
                <div className="flex-shrink-0 pt-4">
                    <div className="flex items-center justify-center mb-4 relative">
                        <button onClick={() => setShowExitConfirm(true)} className="text-sm flex items-center gap-1 absolute left-0"
                            style={{ color: 'var(--color-ink-muted)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                            Exit
                        </button>
                        <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}>
                            {sessionMode} · {currentIndex + 1}/{sessionQuestions.length}
                        </span>
                    </div>
                    <ProgressBar value={currentIndex + 1} max={sessionQuestions.length} />
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto mt-4" key={`practice-${currentIndex}`}>
                    {q.type === 'match' ? (
                        <PracticeMatchQuestion
                            question={q}
                            onAnswer={(scores, concepts, pairs) => {
                                setResults(prev => [
                                    ...prev,
                                    { cardId: concepts[0].id, type: 'match', score: scores[0] },
                                    { cardId: concepts[1].id, type: 'match', score: scores[1] },
                                ]);
                                concepts.forEach(c => {
                                    const isCorrect = pairs[c.id] === c.id;
                                    const cScore = isCorrect ? 'green' : 'red';
                                    dispatch({ type: 'UPDATE_CARD_MASTERY', cardId: c.id, questionType: 'why', score: cScore });
                                    const schedule = state.srSchedule?.[c.id] || { interval: 0, ease: 2.5, reviewCount: 0 };
                                    const next = calculateNextReview(schedule, cScore);
                                    dispatch({ type: 'UPDATE_SR_SCHEDULE', cardId: c.id, ...next });
                                });
                            }}
                            onNext={handleSessionNext}
                            onBack={currentIndex > 0 ? () => setCurrentIndex(i => i - 1) : null}
                        />
                    ) : (
                        <PracticeQuestion
                            question={q}
                            cardMastery={state.cardMastery[q.concept.id]}
                            isStarred={(state.starredCards || []).includes(q.concept.id)}
                            onToggleStar={() => dispatch({ type: 'TOGGLE_STAR', cardId: q.concept.id })}
                            onAnswer={(score) => {
                                setResults(prev => [...prev, { cardId: q.concept.id, type: q.type, score }]);
                                dispatch({
                                    type: 'UPDATE_CARD_MASTERY',
                                    cardId: q.concept.id,
                                    questionType: q.type,
                                    score,
                                });
                                const schedule = state.srSchedule?.[q.concept.id] || { interval: 0, ease: 2.5, reviewCount: 0 };
                                const next = calculateNextReview(schedule, score);
                                dispatch({ type: 'UPDATE_SR_SCHEDULE', cardId: q.concept.id, ...next });
                            }}
                            onNext={handleSessionNext}
                            onBack={currentIndex > 0 ? () => setCurrentIndex(i => i - 1) : null}
                        />
                    )}
                </div>
            </div>
            </>
        );
    }

    // ═══════════════════════════════════════════════════
    // RESULTS
    // ═══════════════════════════════════════════════════
    if (view === VIEW.RESULTS) {
        const greenCount = results.filter(r => r.score === 'green').length;
        const yellowCount = results.filter(r => r.score === 'yellow').length;
        const redCount = results.filter(r => r.score === 'red').length;
        const perfectSession = redCount === 0 && yellowCount === 0 && results.length > 0;
        const sessionMin = Math.floor(sessionDuration / 60);
        const sessionSec = sessionDuration % 60;
        const sessionTimeStr = sessionMin > 0 ? `${sessionMin}m ${sessionSec}s` : `${sessionSec}s`;

        return (
            <div className="lesson-flow-container animate-fade-in">
                <div className="flex-1 min-h-0 overflow-y-auto">
                    <div className="py-4">
                        <div className="text-center">
                            <Mascot mood={perfectSession ? 'celebrating' : redCount === 0 ? 'happy' : greenCount > redCount ? 'happy' : 'thinking'} size={70} />
                            <h2 className="text-2xl font-bold mt-4 mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                                {perfectSession ? 'Perfect Session!' : 'Practice Complete'}
                            </h2>
                            <p className="text-sm mb-1" style={{ color: 'var(--color-ink-muted)' }}>
                                {sessionMode} · {results.length} questions · {sessionTimeStr}
                            </p>
                        </div>

                        <Card className="mt-4">
                            <div className="flex items-center gap-1 mb-4 justify-center flex-wrap">
                                {results.map((r, i) => (
                                    <div key={i} className="w-2.5 h-2.5 rounded-full animate-dot-stagger" style={{
                                        animationDelay: `${i * 40}ms`,
                                        backgroundColor: r.score === 'green' ? 'var(--color-success)' :
                                            r.score === 'yellow' ? 'var(--color-warning)' : 'var(--color-error)'
                                    }} />
                                ))}
                            </div>

                            <div className="grid grid-cols-3 gap-3 text-center">
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
                        </Card>

                        <h3 className="text-sm font-semibold mt-6 mb-3" style={{ color: 'var(--color-ink-muted)' }}>
                            Card Breakdown
                        </h3>
                        <div className="space-y-2">
                            {cardBreakdown.map(({ concept, questions }) => {
                                if (!concept) return null;
                                const allGreen = questions.every(q => q.score === 'green');
                                const hasRed = questions.some(q => q.score === 'red');
                                const borderColor = allGreen ? 'var(--color-success)' : hasRed ? 'var(--color-error)' : 'var(--color-warning)';
                                return (
                                    <Card key={concept.id} className="p-3" style={{ borderLeft: `3px solid ${borderColor}` }}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold truncate" style={{ fontFamily: 'var(--font-serif)' }}>
                                                    {concept.title}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {questions.map((q, i) => {
                                                        const label = q.type === 'what' ? 'What' : q.type === 'why' ? 'Why' : q.type === 'how' ? 'How' : q.type === 'match' ? 'Match' : q.type;
                                                        return (
                                                            <span key={i} className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                                                                style={{
                                                                    backgroundColor: q.score === 'green' ? 'rgba(5,150,105,0.1)' :
                                                                        q.score === 'yellow' ? 'rgba(198,134,42,0.1)' : 'rgba(166,61,61,0.1)',
                                                                    color: q.score === 'green' ? 'var(--color-success)' :
                                                                        q.score === 'yellow' ? 'var(--color-warning)' : 'var(--color-error)',
                                                                }}>
                                                                {label}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <StarButton
                                                isStarred={(state.starredCards || []).includes(concept.id)}
                                                onClick={() => dispatch({ type: 'TOGGLE_STAR', cardId: concept.id })}
                                                size={16}
                                            />
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0 pt-4 pb-2 space-y-2">
                    <div className="flex gap-3">
                        <Button variant="secondary" onClick={() => { setView(VIEW.HUB); setPracticeTab('hub'); }}>
                            Done
                        </Button>
                        <Button className="flex-1" onClick={() => startSpacedReview()}>
                            Practice Again
                        </Button>
                    </div>
                    <button
                        onClick={async () => {
                            const text = buildPracticeShareText({ sessionMode, greenCount, totalQuestions: results.length, perfectSession });
                            const result = await shareText({ title: 'AI Safety', text });
                            if (result === 'copied') setShareToast(true);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                        style={{ color: 'var(--color-primary)', backgroundColor: 'rgba(30, 58, 95, 0.08)' }}
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

                {streakCelebration && (
                    <StreakCelebration
                        previousStatus={streakCelebration.previousStatus}
                        newStreak={streakCelebration.newStreak}
                        onDismiss={() => setStreakCelebration(null)}
                    />
                )}
            </div>
        );
    }

    // ═══════════════════════════════════════════════════
    // LESSON PICKER
    // ═══════════════════════════════════════════════════
    if (view === VIEW.LESSON_PICKER) {
        const availableLessons = LESSONS.filter(l =>
            !l.isFoundational && l.cardIds.some(id => (state.seenCards || []).includes(id))
        );

        const lessonsByTopic = {};
        availableLessons.forEach(l => {
            if (!lessonsByTopic[l.topic]) lessonsByTopic[l.topic] = [];
            lessonsByTopic[l.topic].push(l);
        });

        return (
            <div className="lesson-flow-container animate-fade-in">
                <div className="flex-shrink-0 pt-4">
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={() => { setView(VIEW.HUB); setSelectedLessons([]); }}
                            className="text-sm flex items-center gap-1" style={{ color: 'var(--color-ink-muted)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                            Back
                        </button>
                        <span className="text-sm font-medium" style={{ color: 'var(--color-ink-muted)' }}>
                            {selectedLessons.length} selected
                        </span>
                    </div>

                    <h2 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-serif)' }}>Choose Lessons</h2>
                    <p className="text-xs mb-4" style={{ color: 'var(--color-ink-muted)' }}>
                        Select which lessons to practice. Cards from all selected lessons will be combined.
                    </p>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto">
                    {TOPICS.map(topic => {
                        const topicLessons = lessonsByTopic[topic.id] || [];
                        if (topicLessons.length === 0) return null;
                        return (
                            <div key={topic.id} className="mb-4">
                                <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: topic.color }}>
                                    {topic.icon} {topic.title}
                                </h3>
                                <div className="space-y-2">
                                    {topicLessons.map(lesson => {
                                        const isSelected = selectedLessons.includes(lesson.id);
                                        const cardCount = lesson.cardIds.length;
                                        const masteredCount = lesson.cardIds.filter(id => {
                                            const m = state.cardMastery[id];
                                            return m && m.overallMastery >= 7;
                                        }).length;

                                        return (
                                            <Card
                                                key={lesson.id}
                                                onClick={() => {
                                                    setSelectedLessons(prev =>
                                                        prev.includes(lesson.id)
                                                            ? prev.filter(id => id !== lesson.id)
                                                            : [...prev, lesson.id]
                                                    );
                                                }}
                                                className="p-3"
                                                style={{
                                                    borderLeft: isSelected ? `3px solid ${topic.color}` : '3px solid transparent',
                                                    backgroundColor: isSelected ? 'rgba(30, 58, 95, 0.04)' : 'var(--color-card)',
                                                }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                                        style={{
                                                            backgroundColor: isSelected ? topic.color : 'rgba(var(--color-ink-rgb), 0.06)',
                                                            color: isSelected ? 'white' : 'var(--color-ink-muted)',
                                                        }}>
                                                        {isSelected ? '\u2713' : lesson.number}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-semibold truncate" style={{ fontFamily: 'var(--font-serif)' }}>
                                                            {lesson.title}
                                                        </h4>
                                                        <p className="text-xs" style={{ color: 'var(--color-ink-faint)' }}>
                                                            {cardCount} card{cardCount !== 1 ? 's' : ''} · {masteredCount} mastered
                                                        </p>
                                                    </div>
                                                </div>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}

                    {availableLessons.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                                Complete lessons to unlock them for practice.
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex-shrink-0 pt-4 pb-2">
                    <Button className="w-full" disabled={selectedLessons.length === 0} onClick={startLessonPractice}>
                        Practice {selectedLessons.length > 0 ? `${selectedLessons.length} Lesson${selectedLessons.length > 1 ? 's' : ''}` : ''}
                    </Button>
                </div>
            </div>
        );
    }

    // ═══════════════════════════════════════════════════
    // HUB + COLLECTION (main view with tabs)
    // ═══════════════════════════════════════════════════
    return (
        <div className="py-6 animate-fade-in">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>Practice</h1>
                <p className="text-xs mt-1" style={{ color: 'var(--color-ink-muted)' }}>
                    {learnedConcepts.length} concepts learned · {starredConcepts.length} starred
                </p>
            </div>

            <div className="mb-5">
                <TabSelector
                    tabs={[
                        { id: 'hub', label: 'Modes' },
                        { id: 'collection', label: 'My Cards' },
                    ]}
                    activeTab={practiceTab}
                    onChange={setPracticeTab}
                />
            </div>

            {practiceTab === 'hub' ? (
                <HubView
                    starredConcepts={starredConcepts}
                    weakConcepts={weakConcepts}
                    statusTiers={statusTiers}
                    dueCount={dueCards.length}
                    state={state}
                    dispatch={dispatch}
                    onStartSpacedReview={startSpacedReview}
                    onStartFavorites={startFavorites}
                    onOpenLessonPicker={() => setView(VIEW.LESSON_PICKER)}
                    onStartByDifficulty={startByDifficulty}
                    learnedConcepts={learnedConcepts}
                    learnedCount={learnedConcepts.length}
                />
            ) : (
                <CollectionView
                    statusTiers={statusTiers}
                    collectionSort={collectionSort}
                    setCollectionSort={setCollectionSort}
                    expandedCardId={expandedCardId}
                    setExpandedCardId={setExpandedCardId}
                    state={state}
                    dispatch={dispatch}
                    onStartSession={(concepts) => startSession('Custom', concepts)}
                />
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════
// HUB VIEW — Practice mode cards
// ═══════════════════════════════════════════════════════
function HubView({ starredConcepts, weakConcepts, statusTiers, dueCount, state, dispatch, onStartSpacedReview, onStartFavorites, onOpenLessonPicker, onStartByDifficulty, learnedConcepts }) {
    const [showClearStarsConfirm, setShowClearStarsConfirm] = useState(false);

    return (
        <div className="space-y-3">
            {/* Spaced Review */}
            <Card onClick={onStartSpacedReview} className="lesson-card-row p-4">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(30, 58, 95, 0.1)' }}>
                        <span className="text-lg">&#x1F9E0;</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold" style={{ fontFamily: 'var(--font-serif)' }}>Spaced Review</h3>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
                            Reviews cards at optimal intervals
                        </p>
                        {dueCount > 0 ? (
                            <div className="flex items-center gap-1.5 mt-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                                <span className="text-[10px] font-semibold" style={{ color: 'var(--color-primary)' }}>
                                    {dueCount} card{dueCount !== 1 ? 's' : ''} due for review
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 mt-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-success)' }} />
                                <span className="text-[10px] font-semibold" style={{ color: 'var(--color-success)' }}>
                                    All caught up!
                                </span>
                            </div>
                        )}
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-faint)" strokeWidth="2" className="mt-2 flex-shrink-0">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </div>
            </Card>

            {/* Favorites */}
            <Card
                onClick={starredConcepts.length > 0 ? onStartFavorites : undefined}
                className="lesson-card-row p-4"
                style={{ opacity: starredConcepts.length > 0 ? 1 : 0.5 }}
            >
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(230, 168, 23, 0.1)' }}>
                        <span className="text-lg">{'\u2B50'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold" style={{ fontFamily: 'var(--font-serif)' }}>Favorites</h3>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
                            {starredConcepts.length > 0
                                ? `${starredConcepts.length} starred card${starredConcepts.length !== 1 ? 's' : ''} · shuffled`
                                : 'Star cards during lessons to add them here'
                            }
                        </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {starredConcepts.length > 0 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); setShowClearStarsConfirm(true); }}
                                className="text-[10px] font-semibold px-2 py-1 rounded-lg transition-all active:scale-95"
                                style={{ backgroundColor: 'rgba(166, 61, 61, 0.08)', color: 'var(--color-error)' }}
                            >
                                Clear all
                            </button>
                        )}
                        {starredConcepts.length > 0 && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-faint)" strokeWidth="2" className="mt-0">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        )}
                    </div>
                </div>
            </Card>

            {showClearStarsConfirm && (
                <ConfirmModal
                    title="Clear all favorites?"
                    message={`This will remove ${starredConcepts.length} card${starredConcepts.length !== 1 ? 's' : ''} from your favorites. You can always star them again later.`}
                    confirmLabel="Clear all"
                    onConfirm={() => { dispatch({ type: 'CLEAR_ALL_STARS' }); setShowClearStarsConfirm(false); }}
                    onCancel={() => setShowClearStarsConfirm(false)}
                    danger
                />
            )}

            {/* By Lesson */}
            <Card onClick={onOpenLessonPicker} className="lesson-card-row p-4">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(101, 119, 74, 0.1)' }}>
                        <span className="text-lg">{'\uD83D\uDCDA'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold" style={{ fontFamily: 'var(--font-serif)' }}>By Lesson</h3>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
                            Pick lessons to combine into a custom session
                        </p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-faint)" strokeWidth="2" className="mt-2 flex-shrink-0">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </div>
            </Card>

            {/* By Difficulty */}
            <Card className="p-4">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(185, 28, 28, 0.08)' }}>
                        <span className="text-lg">&#x1F4CA;</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold" style={{ fontFamily: 'var(--font-serif)' }}>By Difficulty</h3>
                        <p className="text-xs mt-0.5 mb-2.5" style={{ color: 'var(--color-ink-muted)' }}>
                            Practice concepts filtered by difficulty level
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {[
                                { level: 1, label: 'Beginner', color: '#059669', bg: 'rgba(5, 150, 105, 0.1)' },
                                { level: 2, label: 'Intermediate', color: '#D97706', bg: 'rgba(217, 119, 6, 0.1)' },
                                { level: 3, label: 'Advanced', color: '#DC2626', bg: 'rgba(220, 38, 38, 0.1)' },
                            ].map(({ level, label, color, bg }) => {
                                const count = learnedConcepts.filter(c => c.difficulty === level).length;
                                const enabled = count > 0;
                                return (
                                    <button
                                        key={level}
                                        onClick={enabled ? () => onStartByDifficulty(level) : undefined}
                                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all duration-150"
                                        style={{
                                            backgroundColor: enabled ? bg : 'rgba(var(--color-ink-rgb), 0.04)',
                                            color: enabled ? color : 'var(--color-ink-faint)',
                                            opacity: enabled ? 1 : 0.45,
                                            cursor: enabled ? 'pointer' : 'default',
                                        }}
                                    >
                                        {label}
                                        {enabled && <span className="opacity-60">({count})</span>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Card Status overview */}
            <div className="mt-4">
                <Divider />
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-ink-faint)' }}>
                    Card Status
                </h3>
                <div className="grid grid-cols-4 gap-2">
                    <div className="text-center p-2.5 rounded-xl" style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.04)' }}>
                        <div className="text-lg font-bold" style={{ color: 'var(--color-ink-muted)' }}>{statusTiers.new.length}</div>
                        <div className="text-[9px] font-semibold" style={{ color: 'var(--color-ink-muted)' }}>New</div>
                    </div>
                    <div className="text-center p-2.5 rounded-xl" style={{ backgroundColor: 'rgba(166, 61, 61, 0.06)' }}>
                        <div className="text-lg font-bold" style={{ color: 'var(--color-error)' }}>{statusTiers.learning.length}</div>
                        <div className="text-[9px] font-semibold" style={{ color: 'var(--color-error)' }}>Learning</div>
                    </div>
                    <div className="text-center p-2.5 rounded-xl" style={{ backgroundColor: 'rgba(198, 134, 42, 0.06)' }}>
                        <div className="text-lg font-bold" style={{ color: 'var(--color-warning)' }}>{statusTiers.known.length}</div>
                        <div className="text-[9px] font-semibold" style={{ color: 'var(--color-warning)' }}>Known</div>
                    </div>
                    <div className="text-center p-2.5 rounded-xl" style={{ backgroundColor: 'rgba(5, 150, 105, 0.06)' }}>
                        <div className="text-lg font-bold" style={{ color: 'var(--color-success)' }}>{statusTiers.fully_assimilated.length}</div>
                        <div className="text-[9px] font-semibold" style={{ color: 'var(--color-success)' }}>Mastered</div>
                    </div>
                </div>
            </div>

            {/* Top weak concepts preview */}
            {weakConcepts.length > 0 && weakConcepts[0].overall < 7 && (
                <div className="mt-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-ink-faint)' }}>
                        Needs Most Attention
                    </h3>
                    <div className="space-y-2">
                        {weakConcepts.slice(0, 4).filter(w => w.overall < 7).map(({ concept, mastery }) => (
                            <Card key={concept.id} className="p-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold truncate" style={{ fontFamily: 'var(--font-serif)' }}>
                                            {concept.title}
                                        </h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <MasteryDots mastery={mastery} />
                                            <CategoryTag category={concept.category} />
                                        </div>
                                    </div>
                                    <StarButton
                                        isStarred={(state.starredCards || []).includes(concept.id)}
                                        onClick={() => dispatch({ type: 'TOGGLE_STAR', cardId: concept.id })}
                                        size={16}
                                    />
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════
// COLLECTION VIEW — Card triage
// ═══════════════════════════════════════════════════════
function CollectionView({ statusTiers, collectionSort, setCollectionSort, expandedCardId, setExpandedCardId, state, dispatch, onStartSession }) {
    const tierConfig = [
        {
            key: 'new',
            label: 'New',
            color: 'var(--color-ink-muted)',
            bg: 'rgba(var(--color-ink-rgb), 0.04)',
            items: statusTiers.new,
            practiceLabel: 'Practice these',
        },
        {
            key: 'learning',
            label: 'Learning',
            color: 'var(--color-error)',
            bg: 'rgba(166, 61, 61, 0.06)',
            items: statusTiers.learning,
            practiceLabel: 'Practice these',
        },
        {
            key: 'known',
            label: 'Known',
            color: 'var(--color-warning)',
            bg: 'rgba(198, 134, 42, 0.06)',
            items: statusTiers.known,
            practiceLabel: null,
        },
        {
            key: 'fully_assimilated',
            label: 'Fully Assimilated',
            color: 'var(--color-success)',
            bg: 'rgba(5, 150, 105, 0.06)',
            items: statusTiers.fully_assimilated,
            practiceLabel: null,
        },
    ];

    return (
        <div>
            <div className="mb-4">
                <TabSelector
                    tabs={[
                        { id: 'success', label: '% Success' },
                        { id: 'times', label: 'Times Seen' },
                    ]}
                    activeTab={collectionSort}
                    onChange={setCollectionSort}
                />
            </div>

            {tierConfig.map(tier => (
                <div key={tier.key} className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-sm font-bold" style={{ color: tier.color }}>{tier.label}</h3>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: tier.bg, color: tier.color }}>
                            {tier.items.length}
                        </span>
                        {tier.items.length > 0 && tier.practiceLabel && (
                            <button
                                onClick={() => onStartSession(tier.items.map(i => i.concept))}
                                className="ml-auto text-[10px] font-semibold px-2 py-1 rounded-lg transition-all"
                                style={{ backgroundColor: tier.bg, color: tier.color }}
                            >
                                {tier.practiceLabel} {'\u2192'}
                            </button>
                        )}
                    </div>

                    {tier.items.length === 0 ? (
                        <div className="text-center py-4 rounded-xl" style={{ backgroundColor: tier.bg }}>
                            <p className="text-xs" style={{ color: 'var(--color-ink-faint)' }}>
                                {tier.key === 'new' ? 'All cards have been reviewed' :
                                    tier.key === 'learning' ? 'No cards still learning — great work!' :
                                    tier.key === 'fully_assimilated' ? 'Keep practicing to fully assimilate cards' :
                                    'No cards at this level yet'}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-1.5">
                            {(collectionSort === 'success'
                                ? [...tier.items].sort((a, b) => a.successRate - b.successRate)
                                : [...tier.items].sort((a, b) => a.timesReviewed - b.timesReviewed)
                            ).map(({ concept, mastery, timesReviewed, successRate }) => {
                                const isExpanded = expandedCardId === concept.id;
                                return (
                                    <Card
                                        key={concept.id}
                                        onClick={() => setExpandedCardId(isExpanded ? null : concept.id)}
                                        className="p-3"
                                        style={{
                                            borderLeft: `3px solid ${isExpanded ? tier.color : 'transparent'}`,
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold truncate" style={{ fontFamily: 'var(--font-serif)' }}>
                                                    {concept.title}
                                                </h4>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <MasteryDots mastery={mastery} />
                                                    <span className="text-[10px]" style={{ color: 'var(--color-ink-faint)' }}>
                                                        {collectionSort === 'success'
                                                            ? `${successRate}% success`
                                                            : `${timesReviewed} time${timesReviewed !== 1 ? 's' : ''} seen`
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <StarButton
                                                    isStarred={(state.starredCards || []).includes(concept.id)}
                                                    onClick={() => dispatch({ type: 'TOGGLE_STAR', cardId: concept.id })}
                                                    size={16}
                                                />
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-faint)" strokeWidth="2"
                                                    className="transition-transform duration-200"
                                                    style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </div>
                                        </div>

                                        {isExpanded && (
                                            <div className="animate-fade-in mt-3 pt-3" style={{ borderTop: '1px solid rgba(var(--color-ink-rgb), 0.06)' }}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <CategoryTag category={concept.category} />
                                                        {concept.tags && concept.tags.slice(0, 3).map(tag => (
                                                            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.06)', color: 'var(--color-ink-muted)' }}>
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <span className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>
                                                        Difficulty {concept.difficulty}
                                                    </span>
                                                </div>
                                                <ExpandableText lines={3} className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-ink-secondary)' }}>
                                                    {concept.description}
                                                </ExpandableText>
                                                <div className="flex items-center gap-4 mt-3 pt-3" style={{ borderTop: '1px solid rgba(var(--color-ink-rgb), 0.06)' }}>
                                                    <div className="text-[10px]">
                                                        <span style={{ color: 'var(--color-ink-faint)' }}>Reviewed: </span>
                                                        <span className="font-bold">{timesReviewed}x</span>
                                                    </div>
                                                    <div className="text-[10px]">
                                                        <span style={{ color: 'var(--color-ink-faint)' }}>Success: </span>
                                                        <span className="font-bold">{successRate}%</span>
                                                    </div>
                                                    <div className="text-[10px] flex items-center gap-1">
                                                        <span style={{ color: 'var(--color-ink-faint)' }}>Mastery: </span>
                                                        <MasteryDots mastery={mastery} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// ═══════════════════════════════════════════════════════
// PRACTICE MATCH QUESTION — match 4 concepts to their summaries
// ═══════════════════════════════════════════════════════
function PracticeMatchQuestion({ question, onAnswer, onNext, onBack }) {
    const [matchPairs, setMatchPairs] = useState({});
    const [matchSelected, setMatchSelected] = useState(null);
    const [matchChecked, setMatchChecked] = useState(false);

    const pairCount = Object.keys(matchPairs).length;
    const allPaired = pairCount === 4;

    const nameColorMap = {};
    const descColorMap = {};
    Object.keys(matchPairs).forEach((nameId, i) => {
        nameColorMap[nameId] = MATCH_COLORS[i % MATCH_COLORS.length];
        descColorMap[matchPairs[nameId]] = MATCH_COLORS[i % MATCH_COLORS.length];
    });

    const handleNameClick = (nameId) => {
        if (matchChecked) return;
        setMatchSelected(matchSelected === nameId ? null : nameId);
    };

    const handleDescClick = (descId) => {
        if (matchChecked) return;
        if (!matchSelected) {
            const pairedName = Object.entries(matchPairs).find(([, d]) => d === descId)?.[0];
            if (pairedName) {
                setMatchPairs(prev => { const next = { ...prev }; delete next[pairedName]; return next; });
            }
            return;
        }
        setMatchPairs(prev => {
            const next = { ...prev };
            delete next[matchSelected];
            const existing = Object.entries(next).find(([, d]) => d === descId)?.[0];
            if (existing) delete next[existing];
            next[matchSelected] = descId;
            return next;
        });
        setMatchSelected(null);
    };

    const handleCheck = () => {
        if (!allPaired || matchChecked) return;
        const correctCount = question.names.filter(n => matchPairs[n.id] === n.id).length;
        const wrongCount = 4 - correctCount;
        const scores = wrongCount === 0 ? ['green', 'green']
            : wrongCount === 1 ? ['green', 'yellow']
            : wrongCount === 2 ? ['yellow', 'yellow']
            : ['red', 'red'];
        setMatchChecked(true);
        onAnswer(scores, question.concepts, matchPairs);
        if (wrongCount === 0) feedback.forScore('green');
        else if (wrongCount <= 2) feedback.forScore('yellow');
        else feedback.forScore('red');
    };

    const matchScore = matchChecked
        ? (question.names.filter(n => matchPairs[n.id] === n.id).length === 4 ? 'green'
            : question.names.filter(n => matchPairs[n.id] === n.id).length >= 2 ? 'yellow' : 'red')
        : null;

    return (
        <div className="animate-slide-in-right">
            <Card style={matchChecked && matchScore ? {
                backgroundColor: SCORE_COLORS[matchScore].bg,
                borderLeft: `3px solid ${SCORE_COLORS[matchScore].border}`
            } : {}}>
                <p className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color: 'var(--color-ink-faint)' }}>
                    Match each concept to its description
                </p>
                <p className="text-[11px] mb-3" style={{ color: 'var(--color-ink-faint)' }}>
                    Tap a concept, then tap its description
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div className="flex flex-col gap-1.5">
                        {question.names.map((n) => {
                            const isPaired = !!matchPairs[n.id];
                            const isActive = matchSelected === n.id;
                            const color = nameColorMap[n.id];
                            let bg = 'var(--color-card)';
                            let border = 'rgba(var(--color-ink-rgb), 0.08)';
                            let borderStyle = 'solid';
                            if (matchChecked && isPaired) {
                                const isCorrect = matchPairs[n.id] === n.id;
                                bg = isCorrect ? 'rgba(5, 150, 105, 0.1)' : 'rgba(166, 61, 61, 0.1)';
                                border = isCorrect ? 'var(--color-success)' : 'var(--color-error)';
                            } else if (isActive) {
                                bg = 'rgba(30, 58, 95, 0.08)';
                                border = 'var(--color-primary)';
                                borderStyle = 'dashed';
                            } else if (isPaired && color) {
                                bg = `${color}18`;
                                border = color;
                            }
                            return (
                                <button key={n.id} onClick={() => handleNameClick(n.id)} disabled={matchChecked}
                                    className="rounded-lg transition-all flex items-center justify-center"
                                    style={{
                                        padding: '10px 6px', minHeight: '44px',
                                        fontSize: '0.7rem', fontWeight: 600, fontFamily: 'var(--font-serif)',
                                        textAlign: 'center', backgroundColor: bg,
                                        border: `2px ${borderStyle} ${border}`,
                                        color: 'var(--color-ink)', cursor: matchChecked ? 'default' : 'pointer',
                                    }}>
                                    {n.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        {question.descriptions.map((d) => {
                            const pairedByName = Object.entries(matchPairs).find(([, descId]) => descId === d.id)?.[0];
                            const isPaired = !!pairedByName;
                            const color = descColorMap[d.id];
                            let bg = 'var(--color-card)';
                            let border = 'rgba(var(--color-ink-rgb), 0.08)';
                            let borderStyle = 'solid';
                            if (matchChecked && isPaired) {
                                const isCorrect = pairedByName === d.id;
                                bg = isCorrect ? 'rgba(5, 150, 105, 0.1)' : 'rgba(166, 61, 61, 0.1)';
                                border = isCorrect ? 'var(--color-success)' : 'var(--color-error)';
                            } else if (isPaired && color) {
                                bg = `${color}18`;
                                border = color;
                            } else if (matchSelected && !isPaired) {
                                border = 'rgba(30, 58, 95, 0.3)';
                                borderStyle = 'dashed';
                            }
                            return (
                                <button key={d.id} onClick={() => handleDescClick(d.id)} disabled={matchChecked}
                                    className="rounded-lg transition-all flex items-center justify-center"
                                    style={{
                                        padding: '10px 6px', minHeight: '44px',
                                        fontSize: '0.65rem', fontWeight: 500,
                                        textAlign: 'center', backgroundColor: bg,
                                        border: `2px ${borderStyle} ${border}`,
                                        color: 'var(--color-ink-secondary)', cursor: matchChecked ? 'default' : 'pointer',
                                    }}>
                                    {d.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {!matchChecked && (
                    <div className="mt-4">
                        <Button className="w-full" onClick={handleCheck} disabled={!allPaired}>
                            Check Matches
                        </Button>
                    </div>
                )}

                {matchChecked && (
                    <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(var(--color-ink-rgb), 0.06)' }}>
                        <p className="text-sm font-semibold" style={{ color: SCORE_COLORS[matchScore].border }}>
                            {matchScore === 'green' ? 'Perfect match!' : matchScore === 'yellow' ? 'Close — some pairs were off' : 'Several pairs were wrong'}
                        </p>
                    </div>
                )}
            </Card>
            {matchChecked && (
                <div className="pinned-footer flex gap-3">
                    {onBack && <Button variant="secondary" onClick={onBack}>{'\u2190'} Back</Button>}
                    <Button className="flex-1" onClick={onNext}>Continue {'\u2192'}</Button>
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════
// PRACTICE QUESTION — individual question card
// ═══════════════════════════════════════════════════════
function PracticeQuestion({ question, cardMastery, isStarred, onToggleStar, onAnswer, onNext, onBack }) {
    const { concept, type } = question;
    const [answered, setAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(null);

    const descDifficulty = (() => {
        if (!cardMastery) return 2;
        const scoreMap = { green: 3, yellow: 1, red: 0 };
        const overall = (scoreMap[cardMastery.whatScore] ?? 0)
            + (scoreMap[cardMastery.whyScore] ?? 0)
            + (scoreMap[cardMastery.howScore] ?? 0);
        return overall >= 5 ? 3 : 2;
    })();
    const [whatOptions] = useState(() => generateWhatOptions(concept, ALL_CONCEPTS.map(c => c.id)));
    const [descriptionOptions] = useState(() => generateDescriptionOptions(concept, ALL_CONCEPTS, descDifficulty));

    const handleMCQ = (answer, correct) => {
        if (answered) return;
        setSelectedAnswer(answer);
        const s = answer === correct ? 'green' : 'red';
        setScore(s);
        setAnswered(true);
        onAnswer(s);
        feedback.forScore(s);
    };

    const renderFeedback = () => {
        if (!answered || !score) return null;
        return (
            <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(var(--color-ink-rgb), 0.06)' }}>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold" style={{
                        color: getScoreColor(score).border
                    }}>
                        {getScoreLabel(score)}
                    </p>
                    <StarButton isStarred={isStarred} onClick={onToggleStar} size={16} />
                </div>
                {score !== 'green' && (
                    <div className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
                        <strong>{concept.title}</strong> — {concept.summary}
                    </div>
                )}
            </div>
        );
    };

    if (type === 'what') {
        return (
            <div className="animate-slide-in-right">
                <Card style={answered && score ? { backgroundColor: SCORE_COLORS[score].bg, borderLeft: `3px solid ${SCORE_COLORS[score].border}` } : {}}>
                    <p className="text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: 'var(--color-ink-faint)' }}>What is this concept?</p>
                    <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>{concept.quizDescription || concept.description.substring(0, 120) + '...'}</p>
                    <div className="mcq-options mcq-options--grid">
                        {whatOptions.map((opt, i) => {
                            const isCorrect = opt.id === concept.id;
                            const isSelected = selectedAnswer === opt.id;
                            let optStyle = {};
                            if (answered) {
                                if (isCorrect) optStyle = { backgroundColor: 'rgba(5, 150, 105, 0.1)', borderColor: 'var(--color-success)' };
                                else if (isSelected) optStyle = { backgroundColor: 'rgba(166, 61, 61, 0.1)', borderColor: 'var(--color-error)' };
                            }
                            return (
                                <button key={i} onClick={() => handleMCQ(opt.id, concept.id)} disabled={answered}
                                    className="mcq-option"
                                    style={{ ...optStyle }}>
                                    <span className="font-semibold">{opt.title}</span>
                                    {answered && isCorrect && <span className="ml-2 text-xs" style={{ color: 'var(--color-success)' }}>{'\u2713'}</span>}
                                </button>
                            );
                        })}
                    </div>
                    {renderFeedback()}
                </Card>
                {answered ? (
                    <div className="pinned-footer flex gap-3">
                        {onBack && <Button variant="secondary" onClick={onBack}>{'\u2190'} Back</Button>}
                        <Button className="flex-1" onClick={onNext}>Continue {'\u2192'}</Button>
                    </div>
                ) : (
                    onBack && <div className="pinned-footer"><Button variant="secondary" className="w-full" onClick={onBack}>{'\u2190'} Back</Button></div>
                )}
            </div>
        );
    }

    if (type === 'why' || type === 'how') {
        const promptLabel = type === 'why' ? 'Why does this matter?' : 'How does this work?';
        return (
            <div className="animate-slide-in-right">
                <Card style={answered && score ? { backgroundColor: SCORE_COLORS[score].bg, borderLeft: `3px solid ${SCORE_COLORS[score].border}` } : {}}>
                    <p className="text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: 'var(--color-ink-faint)' }}>{promptLabel}</p>
                    <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-serif)' }}>{concept.title}</h3>
                    <p className="text-sm mb-5" style={{ color: 'var(--color-ink-muted)' }}>{concept.summary}</p>
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
                                <button key={i} onClick={() => handleMCQ(i, descriptionOptions.findIndex(o => o.isCorrect))} disabled={answered}
                                    className="mcq-option"
                                    style={{ borderColor: isSelected && !answered ? 'var(--color-primary)' : undefined, ...optStyle }}>
                                    <span className="leading-relaxed text-sm block" style={{ color: 'var(--color-ink-secondary)' }}>{opt.description}</span>
                                    {answered && isCorrect && <span className="ml-2 text-xs font-bold mt-1 block" style={{ color: 'var(--color-success)' }}>{'\u2713'} Correct</span>}
                                </button>
                            );
                        })}
                    </div>
                    {renderFeedback()}
                </Card>
                {answered ? (
                    <div className="pinned-footer flex gap-3">
                        {onBack && <Button variant="secondary" onClick={onBack}>{'\u2190'} Back</Button>}
                        <Button className="flex-1" onClick={onNext}>Continue {'\u2192'}</Button>
                    </div>
                ) : (
                    onBack && <div className="pinned-footer"><Button variant="secondary" className="w-full" onClick={onBack}>{'\u2190'} Back</Button></div>
                )}
            </div>
        );
    }

    return null;
}
