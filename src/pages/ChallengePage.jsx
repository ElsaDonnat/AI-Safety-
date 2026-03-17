import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TIERS, TOTAL_CHALLENGE_QUESTIONS, MAX_HEARTS, generateChallengeGame } from '../data/challengeQuiz';
import { ALL_CONCEPTS } from '../data/concepts';
import { Button } from '../components/shared';
import Mascot from '../components/Mascot';
import { Heart, Zap, Users, Lightbulb, ChevronRight, Flame, BookOpen, GraduationCap, Cog, Trophy, Star, Target, Gamepad2, Medal } from 'lucide-react';
import * as feedback from '../services/feedback';
import StreakCelebration from '../components/StreakCelebration';
import FunFactsFlow from '../components/FunFactsFlow';
import { getFunFactsForSeenCards } from '../data/funFacts';
import { DEV_UNLOCK_ALL } from '../config/devFlags';

// ─── Tier display helpers ─────────────────────────────────────
// Build display info for each tier (colors, icons, flavors) for the UI
const TIER_DISPLAY = TIERS.map((t, i) => {
    const colors = ['#4A90D9', '#2E7D32', '#E65100', '#8E24AA', '#C62828', '#FF6F00'];
    const iconComponents = [Flame, BookOpen, GraduationCap, Cog, Trophy, Zap];
    const flavors = [
        'The journey begins...',
        'Knowledge grows deeper.',
        'Concepts interweave.',
        'Mastery takes shape.',
        'Almost at the summit.',
        'You see the full picture.',
    ];
    return {
        id: t.name.toLowerCase(),
        label: t.name,
        questions: t.count,
        color: colors[i] || '#666',
        IconComponent: iconComponents[i] || null,
        flavor: flavors[i] || '',
    };
});

/** Given a question index, return the tier display object it belongs to. */
function getTierForQuestion(qIdx) {
    let cumulative = 0;
    for (let i = 0; i < TIERS.length; i++) {
        cumulative += TIERS[i].count;
        if (qIdx < cumulative) return TIER_DISPLAY[i];
    }
    return TIER_DISPLAY[TIER_DISPLAY.length - 1];
}

/** Given a question index, return tier progress info. */
function getTierProgress(qIdx) {
    let cumulative = 0;
    for (let i = 0; i < TIERS.length; i++) {
        const start = cumulative;
        cumulative += TIERS[i].count;
        if (qIdx < cumulative) {
            return {
                tier: TIER_DISPLAY[i],
                tierIndex: i,
                indexInTier: qIdx - start,
                tierTotal: TIERS[i].count,
            };
        }
    }
    const lastIdx = TIERS.length - 1;
    return {
        tier: TIER_DISPLAY[lastIdx],
        tierIndex: lastIdx,
        indexInTier: TIERS[lastIdx].count - 1,
        tierTotal: TIERS[lastIdx].count,
    };
}

// Tier icons using Lucide for clean, consistent look
const TIER_ICONS = {
    beginner: Flame,
    amateur: BookOpen,
    advanced: GraduationCap,
    expert: Cog,
    master: Trophy,
    visionary: Zap,
};
const TierIcon = ({ tierId, size = 24, color = '#666' }) => {
    const IconComponent = TIER_ICONS[tierId];
    if (!IconComponent) return null;
    return <IconComponent size={size} color={color} strokeWidth={1.8} />;
};

// ─── Views ───────────────────────────────────────────────────
const VIEW = { HUB: 'hub', SETUP_MULTI: 'setup_multi', GAME: 'game', PASS_PHONE: 'pass_phone', RESULTS: 'results', FUN_FACTS: 'fun_facts' };

// ─── Hearts Component ────────────────────────────────────────
function Hearts({ current, max = MAX_HEARTS, losingIndex = -1 }) {
    return (
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {Array.from({ length: max }, (_, i) => {
                const isFilled = i < current;
                const isLosing = i === losingIndex;
                return (
                    <Heart key={i} size={24}
                        fill={isFilled ? '#E05555' : 'none'}
                        color={isFilled ? '#E05555' : 'var(--color-ink-faint)'}
                        strokeWidth={2}
                        className={isLosing ? 'challenge-heart--losing' : isFilled ? 'challenge-heart--alive' : ''}
                    />
                );
            })}
        </div>
    );
}

// ─── Question Renderer ───────────────────────────────────────

function ChallengeQuestion({ question, onAnswer }) {
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    // No useEffect needed — parent uses `key` prop to remount on new question

    if (!question) return null;

    const handleSelect = (index, isCorrect) => {
        if (answered) return;
        feedback.select();
        setSelected(index);
        setAnswered(true);

        if (isCorrect) feedback.correct();
        else feedback.wrong();
        setTimeout(() => onAnswer(isCorrect), 1200);
    };

    switch (question.type) {
        case 'hardMCQ':
            return (
                <MCQLayout
                    question={question}
                    selected={selected}
                    answered={answered}
                    nearMiss={false}
                    onSelect={handleSelect}
                />
            );
        case 'oddOneOut':
            return (
                <OddOneOutLayout
                    question={question}
                    selected={selected}
                    answered={answered}
                    onSelect={(id) => {
                        if (answered) return;
                        const isCorrect = question.options.some(o => o.id === id && o.isOutlier);
                        setSelected(id);
                        setAnswered(true);
                        if (isCorrect) feedback.correct();
                        else feedback.wrong();
                        setTimeout(() => onAnswer(isCorrect), 1200);
                    }}
                />
            );
        case 'trueOrFalse':
            return (
                <TrueOrFalseLayout
                    question={question}
                    selected={selected}
                    answered={answered}
                    onSelect={(val) => {
                        if (answered) return;
                        const isCorrect = val === question.isTrue;
                        setSelected(val);
                        setAnswered(true);
                        if (isCorrect) feedback.correct();
                        else feedback.wrong();
                        setTimeout(() => onAnswer(isCorrect), 1200);
                    }}
                />
            );
        case 'conceptRelationship':
            return (
                <MCQLayout
                    question={question}
                    selected={selected}
                    answered={answered}
                    nearMiss={false}
                    onSelect={handleSelect}
                />
            );
        default:
            return <p>Unknown question type</p>;
    }
}

// ─── MCQ Layout (hardMCQ, conceptRelationship) ───────────────

function MCQLayout({ question, selected, answered, nearMiss, onSelect }) {
    // Normalize options: hardMCQ options have title or description, conceptRelationship has title
    const normalizedOptions = question.options.map(opt => ({
        ...opt,
        label: opt.label || opt.title || opt.description || '',
    }));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-ink)', fontFamily: 'var(--font-display)', textAlign: 'center' }}>
                {question.prompt || question.question}
            </p>
            {answered && nearMiss && (
                <p style={{
                    textAlign: 'center', fontSize: '0.85rem', fontWeight: 600,
                    color: '#D97706', fontFamily: 'var(--font-sans)',
                    padding: '4px 12px', background: 'rgba(217, 119, 6, 0.1)',
                    borderRadius: 8, margin: '0 auto',
                }}>
                    Close! You were in the right ballpark.
                </p>
            )}
            {question.context && (
                <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-secondary)', textAlign: 'center', fontStyle: 'italic', lineHeight: 1.5 }}>
                    {question.context}
                </p>
            )}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 8,
                marginTop: 4,
            }}>
                {normalizedOptions.map((opt, i) => {
                    const isSelected = selected === i;
                    const isCorrect = opt.isCorrect;
                    let bg = 'var(--color-card)';
                    let border = '1.5px solid var(--color-ink-faint, #E7E5E4)';
                    let color = 'var(--color-ink)';
                    if (answered) {
                        if (isCorrect) {
                            bg = 'rgba(5, 150, 105, 0.12)';
                            border = '1.5px solid var(--color-success)';
                            color = 'var(--color-success)';
                        } else if (isSelected) {
                            bg = 'rgba(166, 61, 61, 0.12)';
                            border = '1.5px solid var(--color-error)';
                            color = 'var(--color-error)';
                        } else {
                            bg = 'rgba(0,0,0,0.02)';
                            color = 'var(--color-ink-muted)';
                        }
                    }

                    return (
                        <button
                            key={i}
                            onClick={() => onSelect(i, isCorrect)}
                            disabled={answered}
                            style={{
                                background: bg,
                                border,
                                borderRadius: 10,
                                padding: '12px 16px',
                                cursor: answered ? 'default' : 'pointer',
                                textAlign: 'left',
                                fontSize: question.subtype === 'description' ? '0.78rem' : '0.88rem',
                                fontFamily: 'var(--font-sans)',
                                color,
                                fontWeight: (isSelected || (answered && isCorrect)) ? 600 : 400,
                                lineHeight: 1.4,
                                transition: 'all 0.15s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                            }}
                        >
                            {answered && isCorrect && <span>&#10003;</span>}
                            {answered && isSelected && !isCorrect && <span>&#10007;</span>}
                            {opt.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Odd One Out Layout ──────────────────────────────────────

function OddOneOutLayout({ question, selected, answered, onSelect }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-ink)', fontFamily: 'var(--font-display)', textAlign: 'center' }}>
                {question.prompt || question.question}
            </p>
            {question.hint && (
                <p style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)', textAlign: 'center', fontStyle: 'italic' }}>
                    {question.hint}
                </p>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {question.options.map(opt => {
                    const isOutlier = opt.isOutlier;
                    const isSelected = selected === opt.id;
                    let bg = 'var(--color-card)';
                    let border = '1.5px solid var(--color-ink-faint, #E7E5E4)';
                    let color = 'var(--color-ink)';

                    if (answered) {
                        if (isOutlier) {
                            bg = 'rgba(5, 150, 105, 0.12)';
                            border = '1.5px solid var(--color-success)';
                            color = 'var(--color-success)';
                        } else if (isSelected) {
                            bg = 'rgba(166, 61, 61, 0.12)';
                            border = '1.5px solid var(--color-error)';
                            color = 'var(--color-error)';
                        } else {
                            bg = 'rgba(var(--color-ink-rgb), 0.06)';
                            border = '1.5px solid rgba(var(--color-ink-rgb), 0.2)';
                        }
                    }

                    return (
                        <button
                            key={opt.id}
                            onClick={() => onSelect(opt.id)}
                            disabled={answered}
                            style={{
                                background: bg,
                                border,
                                borderRadius: 10,
                                padding: '12px 10px',
                                cursor: answered ? 'default' : 'pointer',
                                fontSize: '0.82rem',
                                fontFamily: 'var(--font-display)',
                                color,
                                fontWeight: (isSelected || (answered && isOutlier)) ? 600 : 400,
                                lineHeight: 1.3,
                                textAlign: 'center',
                                transition: 'all 0.15s ease',
                            }}
                        >
                            {opt.title}
                        </button>
                    );
                })}
            </div>
            {answered && (
                <p style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)', textAlign: 'center', fontStyle: 'italic' }}>
                    The other three: {question.sharedTrait}
                </p>
            )}
        </div>
    );
}

// ─── True or False Layout ────────────────────────────────────

function TrueOrFalseLayout({ question, selected, answered, onSelect }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                {question.prompt || 'True or false?'}
            </p>
            <div style={{
                background: 'var(--color-card)',
                border: '1.5px solid var(--color-ink-faint, #E7E5E4)',
                borderRadius: 12,
                padding: '20px 16px',
                width: '100%',
                textAlign: 'center',
            }}>
                <p style={{ fontSize: '0.9rem', fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--color-ink)', lineHeight: 1.6 }}>
                    &ldquo;{question.statement}&rdquo;
                </p>
            </div>
            <div style={{ display: 'flex', gap: 12, width: '100%' }}>
                {[true, false].map(val => {
                    const label = val ? 'True' : 'False';
                    const isSelected = selected === val;
                    const isCorrect = val === question.isTrue;
                    let bg = 'var(--color-card)';
                    let border = '1.5px solid var(--color-ink-faint, #E7E5E4)';
                    let color = 'var(--color-ink)';

                    if (answered) {
                        if (isCorrect) {
                            bg = 'rgba(5, 150, 105, 0.12)';
                            border = '1.5px solid var(--color-success)';
                            color = 'var(--color-success)';
                        } else if (isSelected) {
                            bg = 'rgba(166, 61, 61, 0.12)';
                            border = '1.5px solid var(--color-error)';
                            color = 'var(--color-error)';
                        }
                    }

                    return (
                        <button
                            key={label}
                            onClick={() => onSelect(val)}
                            disabled={answered}
                            style={{
                                flex: 1,
                                background: bg,
                                border,
                                borderRadius: 10,
                                padding: '14px',
                                cursor: answered ? 'default' : 'pointer',
                                fontSize: '1rem',
                                fontWeight: 600,
                                fontFamily: 'var(--font-display)',
                                color,
                                transition: 'all 0.15s ease',
                            }}
                        >
                            {answered && isCorrect && <span>&#10003; </span>}
                            {answered && isSelected && !isCorrect && <span>&#10007; </span>}
                            {label}
                        </button>
                    );
                })}
            </div>
            {answered && !question.isTrue && question.correction && (
                <p style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)', textAlign: 'center', fontStyle: 'italic' }}>
                    {question.correction}
                </p>
            )}
        </div>
    );
}

// ─── Tier Transition Overlay ─────────────────────────────────

function TierTransition({ tier, onContinue }) {
    useEffect(() => {
        const timer = setTimeout(onContinue, 2500);
        return () => clearTimeout(timer);
    }, [onContinue]);

    return (
        <div
            onClick={onContinue}
            style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '40px 20px', textAlign: 'center', cursor: 'pointer', minHeight: 300,
            }}
            className="animate-fade-in"
        >
            <div style={{
                marginBottom: 16,
                filter: tier.id === 'visionary' ? 'drop-shadow(0 0 12px rgba(220, 38, 38, 0.5))' : 'none',
            }}>
                <TierIcon tierId={tier.id} size={48} color={tier.color} />
            </div>
            <p style={{
                fontSize: '0.7rem', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase',
                color: 'var(--color-ink-muted)', marginBottom: 8,
            }}>
                Level Up
            </p>
            <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700,
                color: tier.color, marginBottom: 8,
            }}>
                {tier.label}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', fontStyle: 'italic' }}>
                {tier.flavor}
            </p>
            <p style={{ fontSize: '0.7rem', color: 'var(--color-ink-faint)', marginTop: 20 }}>
                Tap to continue
            </p>
        </div>
    );
}

// ─── Main ChallengePage ──────────────────────────────────────

// Shared tint — used for header gradient endpoint + stats card backgrounds
const CHALLENGE_TINT = 'rgba(var(--color-ink-rgb), 0.36)';

export default function ChallengePage({ onSessionChange, registerBackHandler }) {
    const { state, dispatch } = useApp();
    const [view, setView] = useState(VIEW.HUB);
    const [mode, setMode] = useState(null);         // 'solo' | 'multiplayer'
    const [players, setPlayers] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [gameQuestions, setGameQuestions] = useState([]); // pre-generated questions
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [quizmasterMood, setQuizmasterMood] = useState('thinking');
    const [reactorMood, setReactorMood] = useState('happy');

    const [tierTransition, setTierTransition] = useState(null); // tier display object or null
    const [streakCelebration, setStreakCelebration] = useState(null);

    // Multiplayer setup
    const [newPlayerName, setNewPlayerName] = useState('');
    const [mePlayerName, setMePlayerName] = useState(null);
    const [showMePicker, setShowMePicker] = useState(false);

    // Timers
    const sessionStartTime = useRef(null);
    const sessionRecorded = useRef(false);

    // Session change notification
    useEffect(() => {
        if (onSessionChange) {
            onSessionChange(view === VIEW.GAME || view === VIEW.PASS_PHONE);
        }
    }, [view, onSessionChange]);

    // ─── Game Control (ordered by dependency chain) ──

    const startSoloGame = useCallback(() => {
        const questions = generateChallengeGame();
        setGameQuestions(questions);
        setMode('solo');
        setPlayers([{ name: 'You', hearts: MAX_HEARTS, score: 0, eliminated: false }]);
        setCurrentPlayerIndex(0);
        setQuestionIndex(0);
        setConsecutiveCorrect(0);
        setBestStreak(0);
        setQuizmasterMood('thinking');
        setReactorMood('happy');
        setTierTransition(null);
        sessionStartTime.current = Date.now();
        sessionRecorded.current = false;

        setCurrentQuestion(questions[0] || null);
        setView(VIEW.GAME);
    }, []);

    const startMultiplayerGame = useCallback(() => {
        if (players.length === 0) return;
        const questions = generateChallengeGame();
        setGameQuestions(questions);
        setMode('multiplayer');
        setPlayers(prev => prev.map(p => ({ ...p, hearts: MAX_HEARTS, score: 0, eliminated: false })));
        setCurrentPlayerIndex(0);
        setQuestionIndex(0);
        setConsecutiveCorrect(0);
        setBestStreak(0);
        setQuizmasterMood('thinking');
        setReactorMood('happy');
        sessionStartTime.current = Date.now();
        sessionRecorded.current = false;

        setCurrentQuestion(questions[0] || null);
        setView(VIEW.PASS_PHONE);
    }, [players]);

    const endGame = useCallback(() => {
        // Record study session
        if (!sessionRecorded.current && sessionStartTime.current) {
            const duration = Math.round((Date.now() - sessionStartTime.current) / 1000);
            dispatch({
                type: 'RECORD_STUDY_SESSION',
                duration,
                sessionType: 'challenge',
                questionsAnswered: questionIndex,
            });
            sessionRecorded.current = true;
        }

        // Calculate correct count: solo = player score, multiplayer = only "me" player's score
        const totalCorrect = mode === 'solo'
            ? players[0]?.score || 0
            : (mePlayerName ? (players.find(p => p.name === mePlayerName)?.score || 0) : 0);

        // Check if "me" won in multiplayer
        let isVictory = false;
        if (mode === 'multiplayer' && mePlayerName) {
            const winner = [...players].sort((a, b) => b.score - a.score || b.hearts - a.hearts)[0];
            isVictory = winner?.name === mePlayerName;
        }

        // Update challenge stats
        dispatch({
            type: 'UPDATE_CHALLENGE_STATS',
            mode: mode || 'solo',
            score: mode === 'solo' ? (players[0]?.score || 0) : 0,
            bestStreak,
            correctCount: totalCorrect,
            isVictory,
        });

        // Detect streak earning before dispatching XP
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

        // Award XP for the game
        if (totalCorrect > 0) {
            dispatch({ type: 'ADD_XP', amount: totalCorrect * 8 });
        }

        // Show streak celebration if this is the first activity today
        if (!wasActiveToday && totalCorrect > 0) {
            const newStreak = prevStreakStatus === 'at-risk' ? state.currentStreak + 1 : 1;
            setTimeout(() => setStreakCelebration({ previousStatus: prevStreakStatus, newStreak }), 600);
        }

        feedback.gameOver();
        setView(VIEW.RESULTS);
    }, [dispatch, mode, players, questionIndex, bestStreak, mePlayerName, state.lastActiveDate, state.currentStreak]);

    const advanceQuestion = useCallback(() => {
        const nextIdx = questionIndex + 1;
        setQuestionIndex(nextIdx);
        setQuizmasterMood('thinking');
        setReactorMood('happy');

        // Use pre-generated questions array
        const q = gameQuestions[nextIdx] || null;
        setCurrentQuestion(q);
    }, [questionIndex, gameQuestions]);

    const advanceToNextPlayer = useCallback((currentPlayers) => {
        let nextPI = (currentPlayerIndex + 1) % currentPlayers.length;
        let loops = 0;
        while (currentPlayers[nextPI].eliminated && loops < currentPlayers.length) {
            nextPI = (nextPI + 1) % currentPlayers.length;
            loops++;
        }
        setCurrentPlayerIndex(nextPI);
        advanceQuestion();
        setView(VIEW.PASS_PHONE);
    }, [currentPlayerIndex, advanceQuestion]);

    const checkGameState = useCallback(() => {
        // Read the latest players state
        setPlayers(prevPlayers => {
            const current = prevPlayers[currentPlayerIndex];

            if (mode === 'solo') {
                if (current.hearts <= 0) {
                    setTimeout(() => endGame(), 100);
                    return prevPlayers;
                }
                // Check if all questions completed
                if (questionIndex >= TOTAL_CHALLENGE_QUESTIONS - 1) {
                    setTimeout(() => endGame(), 100);
                    return prevPlayers;
                }
                // Check for tier transition
                const currentTier = getTierForQuestion(questionIndex);
                const nextTier = getTierForQuestion(questionIndex + 1);
                if (nextTier.id !== currentTier.id) {
                    // Award a bonus heart at tier transitions (max 5 hearts)
                    const updated = [...prevPlayers];
                    const player = updated[0];
                    const atFullHearts = player.hearts === MAX_HEARTS;
                    const enteringHardTier = ['advanced', 'expert', 'master', 'visionary'].includes(nextTier.id);
                    if ((atFullHearts || enteringHardTier) && player.hearts < 5) {
                        updated[0] = { ...player, hearts: player.hearts + 1 };
                    }
                    setTierTransition(nextTier);
                    return updated;
                } else {
                    advanceQuestion();
                }
                return prevPlayers;
            }

            // Multiplayer
            const alive = prevPlayers.filter(p => p.hearts > 0);
            if (alive.length <= 1) {
                setTimeout(() => endGame(), 100);
                return prevPlayers;
            }

            // Next player
            advanceToNextPlayer(prevPlayers);
            return prevPlayers;
        });
    }, [mode, currentPlayerIndex, endGame, advanceQuestion, advanceToNextPlayer, questionIndex]);

    const handleAnswer = useCallback((isCorrect) => {
        setPlayers(prev => {
            const updated = [...prev];
            const pi = currentPlayerIndex;
            if (isCorrect) {
                updated[pi] = { ...updated[pi], score: updated[pi].score + 1 };
            } else {
                const newHearts = updated[pi].hearts - 1;
                updated[pi] = { ...updated[pi], hearts: newHearts, eliminated: newHearts <= 0 };
                feedback.heartLost();
            }
            return updated;
        });

        if (isCorrect) {
            setQuizmasterMood('celebrating');
            setReactorMood('celebrating');
            setConsecutiveCorrect(c => {
                const newC = c + 1;
                setBestStreak(bs => Math.max(bs, newC));
                return newC;
            });

            // Update mastery for the concept in the question
            const concept = currentQuestion?.concept;
            if (concept) {
                dispatch({
                    type: 'UPDATE_CARD_MASTERY',
                    cardId: concept.id,
                    questionType: 'what',
                    score: 'green',
                });
            }
        } else {
            setQuizmasterMood('sad');
            setReactorMood('sad');
            setConsecutiveCorrect(0);

            const concept = currentQuestion?.concept;
            if (concept) {
                dispatch({
                    type: 'UPDATE_CARD_MASTERY',
                    cardId: concept.id,
                    questionType: 'what',
                    score: 'red',
                });
            }
        }

        // Check game state after a delay (let animation play)
        setTimeout(() => {
            checkGameState();
        }, 300);
    }, [currentPlayerIndex, currentQuestion, dispatch, checkGameState]);

    // Register back handler (after endGame is declared)
    useEffect(() => {
        if (!registerBackHandler) return;
        if (view === VIEW.HUB) return;

        const unregister = registerBackHandler(() => {
            if (view === VIEW.GAME || view === VIEW.PASS_PHONE) {
                endGame();
            } else if (view === VIEW.SETUP_MULTI) {
                setView(VIEW.HUB);
            } else if (view === VIEW.RESULTS) {
                setView(VIEW.HUB);
            } else if (view === VIEW.FUN_FACTS) {
                setView(VIEW.HUB);
            }
        });
        return unregister;
    }, [view, registerBackHandler, endGame]);

    // ─── Multiplayer Setup ───────────────────────────

    const addPlayer = () => {
        const name = newPlayerName.trim();
        if (!name || players.length >= 5) return;
        if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) return;
        setPlayers(prev => [...prev, { name, hearts: MAX_HEARTS, score: 0, eliminated: false }]);
        setNewPlayerName('');
    };

    const removePlayer = (index) => {
        setPlayers(prev => prev.filter((_, i) => i !== index));
    };

    // ─── Derived data ────────────────────────────────

    const ch = state.challenge || {};
    const seenCardsForFacts = useMemo(() => {
        if (DEV_UNLOCK_ALL) return ALL_CONCEPTS.map(c => c.id);
        return state.seenCards || [];
    }, [state.seenCards]);
    const availableFunFacts = useMemo(() => getFunFactsForSeenCards(seenCardsForFacts), [seenCardsForFacts]);
    const seenFunFactCount = useMemo(() => {
        const availableIds = new Set(availableFunFacts.map(f => f.id));
        return (state.seenFunFacts || []).filter(id => availableIds.has(id)).length;
    }, [state.seenFunFacts, availableFunFacts]);
    const currentPlayer = players[currentPlayerIndex];
    const isNewHighScore = mode === 'solo' && (players[0]?.score || 0) > (ch.soloHighScore || 0);
    const tierInfo = mode === 'solo' ? getTierProgress(questionIndex) : null;

    const handleTierTransitionDone = useCallback(() => {
        setTierTransition(null);
        advanceQuestion();
    }, [advanceQuestion]);

    // Compute all-time accuracy from cardMastery
    const allTimeAccuracy = (() => {
        const mastery = state.cardMastery || {};
        let correct = 0, total = 0;
        for (const ev of Object.values(mastery)) {
            for (const dim of ['whatScore', 'whyScore', 'howScore']) {
                if (ev[dim]) { total++; if (ev[dim] === 'green') correct++; }
            }
        }
        return total > 0 ? Math.round((correct / total) * 100) : null;
    })();

    // ─── Render ──────────────────────────────────────

    if (view === VIEW.FUN_FACTS) {
        return <FunFactsFlow onExit={() => setView(VIEW.HUB)} />;
    }

    if (view === VIEW.HUB) {
        // Determine best tier reached from solo high score
        const bestTierReached = ch.soloHighScore > 0
            ? TIER_DISPLAY.indexOf(getTierForQuestion(ch.soloHighScore - 1))
            : -1;
        const totalGames = (ch.soloGamesPlayed || 0) + (ch.multiplayerGamesPlayed || 0);
        const hasStats = totalGames > 0;

        // Tier-specific accent colors for variety
        const tierAccents = ['#7BAFCC', '#5A9E6F', '#D4A04A', '#9B7EC8', '#D4726A', '#E6A817'];

        return (
            <div className="px-4 py-6 max-w-2xl mx-auto animate-fade-in">
                {/* ── Page header ── */}
                <div className="mb-5">
                    <h2 className="text-[22px] font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
                        Challenge
                    </h2>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
                        {totalGames === 0
                            ? 'Put your knowledge to the test'
                            : <><span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 600 }}>{totalGames}</span> game{totalGames !== 1 ? 's' : ''} played</>
                        }
                    </p>
                </div>

                {/* ── Tier Ladder — warm beige panel at top ── */}
                <div style={{
                    background: 'var(--color-warm-light)',
                    border: '1px solid var(--color-warm)',
                    borderRadius: '3px',
                    padding: '16px 12px 14px',
                    marginBottom: 12,
                }}>
                    <p style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: 'var(--color-ink-muted)',
                        marginBottom: 12,
                    }}>
                        {bestTierReached < 0 ? 'Tier Progression' : `Best: ${TIER_DISPLAY[bestTierReached].label}`}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', padding: '0 2px' }}>
                        {/* Track line — behind circles */}
                        <div style={{
                            position: 'absolute',
                            top: 18,
                            left: 28,
                            right: 28,
                            height: '2px',
                            background: 'rgba(var(--color-ink-rgb), 0.10)',
                            zIndex: 0,
                        }} />
                        {/* Progress fill */}
                        {bestTierReached >= 0 && (
                            <div style={{
                                position: 'absolute',
                                top: 18,
                                left: 28,
                                width: `${(bestTierReached / (TIER_DISPLAY.length - 1)) * (100 - 10)}%`,
                                height: '2px',
                                background: 'var(--color-burgundy)',
                                transition: 'width 0.4s ease',
                                zIndex: 0,
                            }} />
                        )}
                        {TIER_DISPLAY.map((tier, i) => {
                            const reached = i <= bestTierReached;
                            const isBest = i === bestTierReached;
                            const accentColor = tierAccents[i];
                            return (
                                <div key={tier.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, zIndex: 1, flex: 1 }}>
                                    <div style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: '50%',
                                        background: reached ? accentColor : 'var(--color-card)',
                                        border: isBest ? `2.5px solid ${accentColor}` : reached ? `2px solid ${accentColor}` : '2px solid rgba(var(--color-ink-rgb), 0.15)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s',
                                        boxShadow: isBest ? `0 0 10px ${accentColor}40` : '0 1px 3px rgba(0,0,0,0.06)',
                                    }}>
                                        {tier.IconComponent && <tier.IconComponent size={16} color={reached ? '#fff' : 'var(--color-ink-secondary)'} strokeWidth={2} />}
                                    </div>
                                    <span style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '9px',
                                        fontWeight: isBest ? 700 : 600,
                                        letterSpacing: '0.03em',
                                        textTransform: 'uppercase',
                                        color: reached ? accentColor : 'var(--color-ink-secondary)',
                                    }}>
                                        {tier.label.slice(0, 3)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Solo Challenge — hero CTA ── */}
                <button
                    onClick={startSoloGame}
                    className="w-full text-left active:scale-[0.99] transition-all duration-150"
                    style={{
                        background: 'var(--color-sidebar-bg)',
                        borderRadius: '3px',
                        padding: '20px 18px',
                        border: 'none',
                        cursor: 'pointer',
                        marginBottom: 12,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Subtle diagonal accent */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '120px',
                        height: '100%',
                        background: 'linear-gradient(135deg, transparent 0%, rgba(212, 114, 106, 0.08) 100%)',
                        pointerEvents: 'none',
                    }} />
                    <div className="flex items-center gap-4" style={{ position: 'relative' }}>
                        <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: '3px',
                            background: 'rgba(212, 114, 106, 0.15)',
                            border: '1.5px solid rgba(212, 114, 106, 0.25)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <Zap size={24} color="var(--color-burgundy-light)" strokeWidth={2} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', color: '#F0EBE5', marginBottom: 3, letterSpacing: '-0.01em' }}>
                                Solo Challenge
                            </p>
                            <p style={{ fontSize: '12px', color: 'var(--color-sidebar-text)', opacity: 0.8 }}>
                                {TIER_DISPLAY.length} tiers, {TOTAL_CHALLENGE_QUESTIONS} questions
                                {ch.soloHighScore > 0 && <> {'\u00B7'} Best: <span style={{ color: 'var(--color-burgundy-light)', fontWeight: 600 }}>{ch.soloHighScore}/{TOTAL_CHALLENGE_QUESTIONS}</span></>}
                            </p>
                        </div>
                        <div style={{
                            width: 32,
                            height: 32,
                            borderRadius: '3px',
                            background: 'var(--color-burgundy)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: '0 2px 8px rgba(212, 114, 106, 0.35)',
                        }}>
                            <ChevronRight size={16} color="#fff" strokeWidth={2.5} />
                        </div>
                    </div>
                </button>

                {/* ── "How far can you go?" hint — right under Solo ── */}
                {!hasStats && (
                    <div style={{
                        borderRadius: '3px',
                        padding: '12px 16px',
                        background: 'var(--color-card)',
                        boxShadow: 'var(--shadow-card)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        marginBottom: 12,
                    }}>
                        <Mascot mood="happy" size={34} />
                        <p style={{ fontSize: '12px', color: 'var(--color-ink-muted)', lineHeight: 1.4 }}>
                            Each wrong answer costs a heart. Climb all {TIER_DISPLAY.length} tiers to become a <span style={{ fontWeight: 600, color: 'var(--color-ink-secondary)' }}>Visionary</span>.
                        </p>
                    </div>
                )}

                {/* ── Secondary actions row: Multiplayer + Fun Facts — colored ── */}
                <div className="flex gap-2.5 mb-4">
                    {/* Multiplayer — baby blue */}
                    <button
                        onClick={() => {
                            setPlayers([]);
                            setNewPlayerName('');
                            setView(VIEW.SETUP_MULTI);
                        }}
                        className="flex-1 text-left active:scale-[0.99] transition-all duration-150"
                        style={{
                            background: 'var(--color-bronze)',
                            borderRadius: '3px',
                            padding: '14px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <div className="flex items-center gap-2.5 mb-2">
                            <Users size={16} color="rgba(255,255,255,0.85)" strokeWidth={2} />
                            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px', color: '#fff' }}>
                                Multiplayer
                            </p>
                        </div>
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
                            Pass the phone, up to 5 players
                        </p>
                    </button>

                    {/* Fun Facts — coral */}
                    <button
                        onClick={availableFunFacts.length > 0 ? () => setView(VIEW.FUN_FACTS) : undefined}
                        className="flex-1 text-left active:scale-[0.99] transition-all duration-150"
                        style={{
                            background: 'var(--color-burgundy)',
                            borderRadius: '3px',
                            padding: '14px',
                            border: 'none',
                            cursor: availableFunFacts.length > 0 ? 'pointer' : 'default',
                            opacity: availableFunFacts.length > 0 ? 1 : 0.5,
                        }}
                    >
                        <div className="flex items-center gap-2.5 mb-2">
                            <Lightbulb size={16} color="rgba(255,255,255,0.85)" strokeWidth={2} />
                            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px', color: '#fff' }}>
                                Fun Facts
                            </p>
                        </div>
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
                            {availableFunFacts.length > 0
                                ? `${seenFunFactCount}/${availableFunFacts.length} discovered`
                                : 'Unlock by learning concepts'
                            }
                        </p>
                    </button>
                </div>

                {/* ── Stats panel ── */}
                {hasStats && (
                    <div style={{
                        borderRadius: '3px',
                        padding: '14px 12px',
                        background: 'var(--color-card)',
                        boxShadow: 'var(--shadow-card)',
                    }}>
                        <p style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            color: 'var(--color-ink-faint)',
                            marginBottom: 10,
                        }}>
                            Your stats
                        </p>
                        <div className="flex justify-around items-start">
                            <div className="text-center">
                                <p style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-burgundy)', lineHeight: 1 }}>
                                    {ch.soloHighScore || 0}
                                </p>
                                <p style={{ fontSize: '10px', color: 'var(--color-ink-muted)', marginTop: 3 }}>Best Score</p>
                            </div>
                            {allTimeAccuracy !== null && (
                                <div className="text-center">
                                    <p style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-burgundy)', lineHeight: 1 }}>
                                        {allTimeAccuracy}%
                                    </p>
                                    <p style={{ fontSize: '10px', color: 'var(--color-ink-muted)', marginTop: 3 }}>Accuracy</p>
                                </div>
                            )}
                            <div className="text-center">
                                <p style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-burgundy)', lineHeight: 1 }}>
                                    {ch.multiplayerVictories || 0}
                                </p>
                                <p style={{ fontSize: '10px', color: 'var(--color-ink-muted)', marginTop: 3 }}>Victories</p>
                            </div>
                            {totalGames > 0 && (
                                <div className="text-center">
                                    <p style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-burgundy)', lineHeight: 1 }}>
                                        {totalGames}
                                    </p>
                                    <p style={{ fontSize: '10px', color: 'var(--color-ink-muted)', marginTop: 3 }}>Games</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // ─── Multiplayer Setup ───────────────────────────

    if (view === VIEW.SETUP_MULTI) {
        return (
            <div style={{ padding: '16px 0' }} className="animate-fade-in">
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, textAlign: 'center', color: 'var(--color-ink)', marginBottom: 16 }}>
                    Who's playing?
                </h2>

                {/* Player input */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                    <input
                        type="text"
                        value={newPlayerName}
                        onChange={e => setNewPlayerName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addPlayer()}
                        placeholder="Player name"
                        maxLength={20}
                        style={{
                            flex: 1,
                            padding: '10px 14px',
                            border: '1.5px solid var(--color-ink-faint, #E7E5E4)',
                            borderRadius: 10,
                            fontSize: '0.9rem',
                            fontFamily: 'var(--font-sans)',
                            background: 'var(--color-card)',
                            outline: 'none',
                        }}
                    />
                    <Button
                        onClick={addPlayer}
                        disabled={!newPlayerName.trim() || players.length >= 5}
                    >
                        Add
                    </Button>
                </div>

                {/* Player list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                    {players.length === 0 && (
                        <p style={{ textAlign: 'center', color: 'var(--color-ink-muted)', fontSize: '0.82rem', padding: 16 }}>
                            Add 1-5 players to get started
                        </p>
                    )}
                    {players.map((p, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: 'var(--color-card)',
                            border: '1.5px solid var(--color-ink-faint, #E7E5E4)',
                            borderRadius: 10,
                            padding: '10px 14px',
                        }}>
                            <span style={{ fontWeight: 600, color: 'var(--color-ink)' }}>{p.name}</span>
                            <button
                                onClick={() => removePlayer(i)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)', fontSize: '1.2rem', padding: 4 }}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                    <Button variant="ghost" onClick={() => setView(VIEW.HUB)}>
                        Back
                    </Button>
                    <Button
                        onClick={() => setShowMePicker(true)}
                        disabled={players.length === 0}
                        style={{ flex: 1 }}
                    >
                        Start Game
                    </Button>
                </div>

                {/* "Which one is you?" picker */}
                {showMePicker && (
                    <div style={{
                        position: 'fixed', inset: 0, zIndex: 100,
                        background: 'rgba(0,0,0,0.45)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: 24,
                    }} onClick={() => { setShowMePicker(false); }}>
                        <div
                            style={{
                                background: 'var(--color-card)',
                                borderRadius: 16,
                                padding: '24px 20px',
                                width: '100%',
                                maxWidth: 320,
                                boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                            }}
                            onClick={e => e.stopPropagation()}
                            className="animate-fade-in"
                        >
                            <h3 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.05rem',
                                fontWeight: 700,
                                textAlign: 'center',
                                color: 'var(--color-ink)',
                                marginBottom: 4,
                            }}>
                                Which one is you?
                            </h3>
                            <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-ink-muted)', marginBottom: 16 }}>
                                We'll track your victories
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                                {players.map((p) => (
                                    <button
                                        key={p.name}
                                        onClick={() => {
                                            setMePlayerName(p.name);
                                            setShowMePicker(false);
                                            startMultiplayerGame();
                                        }}
                                        style={{
                                            padding: '10px 14px',
                                            borderRadius: 10,
                                            border: '1.5px solid var(--color-ink-faint, #E7E5E4)',
                                            background: 'var(--color-surface, #FFFFFF)',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                            color: 'var(--color-ink)',
                                            cursor: 'pointer',
                                            fontFamily: 'var(--font-sans)',
                                            transition: 'background 0.15s',
                                        }}
                                    >
                                        {p.name}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => {
                                    setMePlayerName(null);
                                    setShowMePicker(false);
                                    startMultiplayerGame();
                                }}
                                style={{
                                    width: '100%',
                                    padding: '8px 14px',
                                    borderRadius: 10,
                                    border: 'none',
                                    background: 'none',
                                    fontSize: '0.82rem',
                                    color: 'var(--color-ink-muted)',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--font-sans)',
                                }}
                            >
                                None of them
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // ─── Pass Phone Screen (Multiplayer) ─────────────

    if (view === VIEW.PASS_PHONE) {
        return (
            <div className="pass-phone-overlay animate-fade-in">
                <Mascot variant="quizmaster" mood="happy" size={70} />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-ink)' }}>
                    Pass to {currentPlayer?.name}!
                </h2>
                <Hearts current={currentPlayer?.hearts || 0} max={Math.max(MAX_HEARTS, currentPlayer?.hearts || 0)} />
                <p style={{ fontSize: '0.82rem', color: 'var(--color-ink-muted)' }}>
                    Score: {currentPlayer?.score || 0}
                </p>
                <Button onClick={() => setView(VIEW.GAME)} style={{ marginTop: 8, minWidth: 140 }}>
                    Ready!
                </Button>
            </div>
        );
    }

    // ─── Game View ───────────────────────────────────

    if (view === VIEW.GAME) {
        // Show tier transition overlay
        if (tierTransition) {
            return (
                <div style={{ padding: '12px 0', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
                    <TierTransition tier={tierTransition} onContinue={handleTierTransitionDone} />
                </div>
            );
        }

        return (
            <div style={{ padding: '12px 0', display: 'flex', flexDirection: 'column', minHeight: '100%' }} className="animate-fade-in">
                {/* Tier badge + progress (solo) */}
                {mode === 'solo' && tierInfo && (
                    <div style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                            <span style={{
                                fontSize: '0.7rem', fontWeight: 700, color: tierInfo.tier.color,
                                background: `${tierInfo.tier.color}15`, padding: '2px 8px', borderRadius: 6,
                            }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><TierIcon tierId={tierInfo.tier.id} size={14} color={tierInfo.tier.color} /> {tierInfo.tier.label}</span>
                            </span>
                            <span style={{ fontSize: '0.68rem', color: 'var(--color-ink-muted)' }}>
                                {questionIndex + 1} / {TOTAL_CHALLENGE_QUESTIONS}
                            </span>
                        </div>
                        {/* Progress bar */}
                        <div style={{ height: 3, borderRadius: 2, background: 'rgba(var(--color-ink-rgb), 0.06)', overflow: 'hidden' }}>
                            <div style={{
                                height: '100%', borderRadius: 2,
                                background: tierInfo.tier.color,
                                width: `${((questionIndex + 1) / TOTAL_CHALLENGE_QUESTIONS) * 100}%`,
                                transition: 'width 0.3s ease',
                            }} />
                        </div>
                    </div>
                )}

                {/* Top bar: hearts + score + streak */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <Hearts current={currentPlayer?.hearts || 0} max={Math.max(MAX_HEARTS, currentPlayer?.hearts || 0)} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {mode === 'multiplayer' && (
                            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-primary, #1E3A5F)' }}>
                                {currentPlayer?.name}
                            </span>
                        )}
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                                {currentPlayer?.score || 0}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-ink-muted)', marginLeft: 2 }}>pts</span>
                        </div>
                        {consecutiveCorrect >= 2 && (
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: '#E05500',
                                background: 'rgba(224, 85, 0, 0.1)',
                                padding: '2px 8px',
                                borderRadius: 8,
                            }}>
                                {consecutiveCorrect}x
                            </span>
                        )}
                    </div>
                </div>

                {/* Quizmaster mascot */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                    <Mascot variant="quizmaster" mood={quizmasterMood} size={52} />
                </div>

                {/* Question card */}
                <div style={{
                    background: tierInfo?.tier.id === 'visionary' ? 'rgba(220, 38, 38, 0.06)' : 'var(--color-surface, #F3ECE2)',
                    borderRadius: 14,
                    padding: '20px 16px',
                    flex: 1,
                    border: tierInfo?.tier.id === 'visionary' ? '1.5px solid rgba(220, 38, 38, 0.2)' : 'none',
                }}>
                    <ChallengeQuestion
                        key={`q-${questionIndex}-${currentPlayerIndex}`}
                        question={currentQuestion}
                        onAnswer={handleAnswer}
                    />
                </div>

                {/* Reactor mascot */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
                    <Mascot mood={reactorMood} size={44} />
                </div>
            </div>
        );
    }

    // ─── Results View ────────────────────────────────

    if (view === VIEW.RESULTS) {
        const soloScore = players[0]?.score || 0;
        const reachedTier = getTierForQuestion(Math.min(questionIndex, TOTAL_CHALLENGE_QUESTIONS - 1));
        const isPerfect = mode === 'solo' && soloScore === TOTAL_CHALLENGE_QUESTIONS;

        if (mode === 'solo') {
            return (
                <div style={{ padding: '20px 0', textAlign: 'center' }} className="animate-fade-in">
                    {/* Mascots */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
                        <Mascot variant="quizmaster" mood={soloScore >= 10 ? 'celebrating' : soloScore >= 5 ? 'happy' : 'thinking'} size={60} />
                        <Mascot mood={soloScore >= 10 ? 'celebrating' : soloScore >= 5 ? 'happy' : 'sad'} size={52} />
                    </div>

                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-ink)', marginBottom: 8 }}>
                        {isPerfect ? 'Perfect Run!' : 'Game Over!'}
                    </h2>

                    {/* Tier reached badge */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: `${reachedTier.color}12`, border: `1.5px solid ${reachedTier.color}30`,
                        borderRadius: 10, padding: '6px 14px', marginBottom: 16,
                    }}>
                        <TierIcon tierId={reachedTier.id} size={20} color={reachedTier.color} />
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: reachedTier.color }}>
                            {reachedTier.label}
                        </span>
                    </div>

                    {/* Score */}
                    <div style={{ marginBottom: 16 }}>
                        <p style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-primary, #1E3A5F)' }}>
                            {soloScore}/{TOTAL_CHALLENGE_QUESTIONS}
                        </p>
                        <p style={{ fontSize: '0.82rem', color: 'var(--color-ink-muted)' }}>
                            questions answered correctly
                        </p>
                    </div>

                    {/* New high score banner */}
                    {isNewHighScore && (
                        <div style={{
                            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                            borderRadius: 10,
                            padding: '10px 16px',
                            marginBottom: 16,
                            color: 'white',
                            fontWeight: 700,
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.95rem',
                        }}>
                            New High Score!
                        </div>
                    )}

                    {/* Tier progress visualization */}
                    <div style={{
                        display: 'flex', gap: 3, marginBottom: 16, padding: '0 4px',
                    }}>
                        {TIER_DISPLAY.map((tier, tierIdx) => {
                            const reachedIdx = TIER_DISPLAY.indexOf(reachedTier);
                            const progress = getTierProgress(questionIndex);
                            let fillPercent;
                            if (tierIdx < reachedIdx) {
                                fillPercent = 100;
                            } else if (tierIdx === reachedIdx) {
                                fillPercent = ((progress.indexInTier + 1) / tier.questions) * 100;
                            } else {
                                fillPercent = 0;
                            }
                            return (
                                <div key={tier.id} style={{
                                    flex: tier.questions, height: 6, borderRadius: 3,
                                    background: 'rgba(var(--color-ink-rgb), 0.06)',
                                    overflow: 'hidden',
                                }} title={tier.label}>
                                    {fillPercent > 0 && (
                                        <div style={{
                                            width: `${fillPercent}%`, height: '100%', borderRadius: 3,
                                            background: tier.color,
                                            transition: 'width 0.3s',
                                        }} />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Stats row */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        background: CHALLENGE_TINT,
                        borderRadius: 12,
                        padding: '14px 12px',
                        marginBottom: 20,
                    }}>
                        <div>
                            <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary, #1E3A5F)', fontFamily: 'var(--font-display)' }}>
                                {bestStreak}
                            </p>
                            <p style={{ fontSize: '0.68rem', color: 'var(--color-ink-muted)' }}>Best Streak</p>
                        </div>
                        <div>
                            <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary, #1E3A5F)', fontFamily: 'var(--font-display)' }}>
                                +{soloScore * 8}
                            </p>
                            <p style={{ fontSize: '0.68rem', color: 'var(--color-ink-muted)' }}>XP Earned</p>
                        </div>
                        <div>
                            <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary, #1E3A5F)', fontFamily: 'var(--font-display)' }}>
                                {questionIndex + 1}
                            </p>
                            <p style={{ fontSize: '0.68rem', color: 'var(--color-ink-muted)' }}>Questions</p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                        <Button variant="ghost" onClick={() => setView(VIEW.HUB)}>
                            Back
                        </Button>
                        <Button onClick={startSoloGame}>
                            Play Again
                        </Button>
                    </div>

                    {/* Streak Celebration */}
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

        // ─── Multiplayer Results ─────────────────────

        const sorted = [...players].sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return b.hearts - a.hearts; // tiebreak: more hearts = higher
        });
        const podiumColors = ['podium-bar--gold', 'podium-bar--silver', 'podium-bar--bronze'];
        const podiumHeights = [120, 90, 70];

        return (
            <div style={{ padding: '20px 0', textAlign: 'center' }} className="animate-fade-in">
                {/* Mascots */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
                    <Mascot variant="quizmaster" mood="celebrating" size={56} />
                    <Mascot mood="celebrating" size={48} />
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-ink)', marginBottom: 16 }}>
                    {sorted[0]?.name} wins!
                </h2>

                {/* Podium */}
                <div className="podium-bars" style={{ marginBottom: 24 }}>
                    {sorted.slice(0, 3).map((player, i) => {
                        // Show 2nd, 1st, 3rd order for visual podium
                        const displayOrder = [1, 0, 2];
                        const displayIdx = displayOrder[i] !== undefined ? displayOrder[i] : i;
                        const p = sorted[displayIdx];
                        if (!p) return null;

                        return (
                            <div
                                key={displayIdx}
                                className={`podium-bar ${podiumColors[displayIdx] || ''}`}
                                style={{ height: podiumHeights[displayIdx] || 60, order: i }}
                            >
                                <span style={{ fontSize: '1.4rem' }}>
                                    <Medal size={22} color={displayIdx === 0 ? '#FFD700' : displayIdx === 1 ? '#C0C0C0' : '#CD7F32'} strokeWidth={2} />
                                </span>
                                <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>{p.name}</span>
                                <span style={{ fontSize: '0.75rem' }}>{p.score} pts</span>
                            </div>
                        );
                    })}
                </div>

                {/* Full leaderboard */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
                    {sorted.map((p, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: i === 0 ? 'rgba(255, 215, 0, 0.08)' : 'var(--color-card)',
                            border: '1px solid var(--color-ink-faint, #E7E5E4)',
                            borderRadius: 8,
                            padding: '8px 14px',
                        }}>
                            <span style={{ fontWeight: 600, color: 'var(--color-ink)' }}>
                                {i + 1}. {p.name}
                            </span>
                            <span style={{ fontWeight: 700, color: 'var(--color-primary, #1E3A5F)', fontFamily: 'var(--font-display)' }}>
                                {p.score} pts
                            </span>
                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                    <Button variant="ghost" onClick={() => setView(VIEW.HUB)}>
                        Back
                    </Button>
                    <Button onClick={() => {
                        setPlayers(prev => prev.map(p => ({ ...p, hearts: MAX_HEARTS, score: 0, eliminated: false })));
                        startMultiplayerGame();
                    }}>
                        Play Again
                    </Button>
                </div>
            </div>
        );
    }

    return null;
}
