import { useState, useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { getFunFactsForSeenCards, pickFunFactsForRound, FUN_FACTS_TOTAL, FUN_FACTS_PER_ROUND } from '../data/funFacts';
import { getConceptById } from '../data/concepts';
import { Button, CategoryTag } from './shared';
import * as feedback from '../services/feedback';
import { ChevronLeft, Check, X as XIcon, Lightbulb, Trophy, RotateCcw, ArrowLeft, Sparkles } from 'lucide-react';

const PHASE = { INTRO: 'intro', QUIZ: 'quiz', RESULTS: 'results' };

function shuffleOptions(correct, wrongs) {
    const options = [
        { text: correct, isCorrect: true },
        ...wrongs.map(t => ({ text: t, isCorrect: false })),
    ];
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
}

export default function FunFactsFlow({ onExit }) {
    const { state, dispatch } = useApp();
    const [phase, setPhase] = useState(PHASE.QUIZ);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [roundResults, setRoundResults] = useState([]); // { factId, correct }

    const availableFacts = useMemo(
        () => getFunFactsForSeenCards(state.seenCards || []),
        [state.seenCards]
    );

    const _SeenCount = useMemo(() => {
        const availableIds = new Set(availableFacts.map(f => f.id));
        return (state.seenFunFacts || []).filter(id => availableIds.has(id)).length;
    }, [state.seenFunFacts, availableFacts]);

    // Pick questions for this round (memoized once per mount / phase reset)
    const [roundFacts, setRoundFacts] = useState(() =>
        pickFunFactsForRound(state.seenFunFacts, Math.min(FUN_FACTS_PER_ROUND, availableFacts.length))
    );

    const currentFact = roundFacts[questionIndex] || null;
    const concept = currentFact ? getConceptById(currentFact.cardId) : null;
    const totalQuestions = roundFacts.length;

    const shuffledOptions = useMemo(
        () => currentFact ? shuffleOptions(currentFact.correctAnswer, currentFact.wrongAnswers) : [],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentFact?.id]
    );

    const handleAnswer = useCallback((optIndex) => {
        if (answered) return;
        feedback.select();
        setSelectedOption(optIndex);
        setAnswered(true);

        const isCorrect = shuffledOptions[optIndex].isCorrect;
        setTimeout(() => {
            if (isCorrect) feedback.correct();
            else feedback.wrong();
        }, 150);

        if (isCorrect) setScore(s => s + 1);
        setRoundResults(prev => [...prev, { factId: currentFact.id, correct: isCorrect }]);

        if (currentFact) {
            dispatch({ type: 'MARK_FUN_FACT_SEEN', funFactId: currentFact.id });
        }
    }, [answered, shuffledOptions, currentFact, dispatch]);

    const handleNext = useCallback(() => {
        if (questionIndex + 1 >= totalQuestions) {
            setPhase(PHASE.RESULTS);
            return;
        }
        setSelectedOption(null);
        setAnswered(false);
        setQuestionIndex(i => i + 1);
    }, [questionIndex, totalQuestions]);

    const handlePlayAgain = useCallback(() => {
        const newFacts = pickFunFactsForRound(state.seenFunFacts, Math.min(FUN_FACTS_PER_ROUND, availableFacts.length));
        setRoundFacts(newFacts);
        setQuestionIndex(0);
        setSelectedOption(null);
        setAnswered(false);
        setScore(0);
        setRoundResults([]);
        setPhase(PHASE.QUIZ);
    }, [state.seenFunFacts, availableFacts.length]);

    const handleStartQuiz = useCallback(() => {
        const newFacts = pickFunFactsForRound(state.seenFunFacts, Math.min(FUN_FACTS_PER_ROUND, availableFacts.length));
        setRoundFacts(newFacts);
        setQuestionIndex(0);
        setSelectedOption(null);
        setAnswered(false);
        setScore(0);
        setRoundResults([]);
        setPhase(PHASE.QUIZ);
    }, [state.seenFunFacts, availableFacts.length]);

    // ─── Compute discovered count (including any newly seen this round) ───
    const discoveredCount = useMemo(() => {
        const allSeen = new Set(state.seenFunFacts || []);
        roundResults.forEach(r => allSeen.add(r.factId));
        return Math.min(allSeen.size, FUN_FACTS_TOTAL);
    }, [state.seenFunFacts, roundResults]);

    // ─── INTRO SCREEN ───
    if (phase === PHASE.INTRO) {
        return (
            <div className="px-4 py-6 max-w-2xl mx-auto animate-fade-in">
                <div className="flex-shrink-0">
                    <button onClick={onExit} className="flex items-center gap-1 text-sm"
                        style={{ color: 'var(--color-ink-muted)' }}>
                        <ChevronLeft size={16} strokeWidth={2} />
                        Back
                    </button>
                </div>

                <div className="text-center mt-10 mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
                        style={{ background: 'rgba(234, 179, 8, 0.12)', border: '2px solid rgba(234, 179, 8, 0.25)' }}>
                        <Lightbulb size={30} strokeWidth={1.8} color="#92400E" />
                    </div>
                    <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
                        Fun Facts Trivia
                    </h2>
                    <p className="text-sm leading-relaxed mb-1" style={{ color: 'var(--color-ink-muted)', maxWidth: 320, margin: '0 auto' }}>
                        Test your knowledge with {totalQuestions} trivia questions about the history, people, and milestones of AI.
                    </p>
                </div>

                {/* How it works */}
                <div className="mb-6" style={{
                    background: 'var(--color-card)',
                    boxShadow: 'var(--shadow-card)',
                    borderRadius: '3px',
                    padding: '16px 18px',
                }}>
                    <p style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: 'var(--color-ink-muted)',
                        marginBottom: 12,
                    }}>How it works</p>
                    <div className="space-y-3">
                        {[
                            { icon: '?', label: `Answer ${totalQuestions} multiple-choice trivia questions` },
                            { icon: '!', label: 'Learn fascinating facts about AI history after each answer' },
                            { icon: '\u2605', label: 'Try to get the highest score — every correct answer counts' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div style={{
                                    width: 24, height: 24, borderRadius: '50%',
                                    background: 'rgba(234, 179, 8, 0.12)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '12px', fontWeight: 700, color: '#92400E', flexShrink: 0,
                                }}>{item.icon}</div>
                                <p className="text-sm" style={{ color: 'var(--color-ink)', lineHeight: 1.5 }}>{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Discovery progress */}
                <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                        style={{ background: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.15)' }}>
                        <Sparkles size={14} color="#92400E" strokeWidth={2} />
                        <span className="text-sm font-medium" style={{ color: '#92400E' }}>
                            {discoveredCount} / {FUN_FACTS_TOTAL} facts discovered
                        </span>
                    </div>
                </div>

                <Button className="w-full" onClick={handleStartQuiz}>
                    Start Trivia
                </Button>
            </div>
        );
    }

    // ─── RESULTS SCREEN ───
    if (phase === PHASE.RESULTS) {
        const pct = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
        const isPerfect = score === totalQuestions;
        const isGreat = pct >= 70;

        let emoji, title, subtitle;
        if (isPerfect) {
            emoji = <Trophy size={40} strokeWidth={1.8} color="#D4A04A" />;
            title = 'Perfect Score!';
            subtitle = 'You\'re an AI trivia master.';
        } else if (isGreat) {
            emoji = <Sparkles size={40} strokeWidth={1.8} color="#D4A04A" />;
            title = 'Great Job!';
            subtitle = 'You really know your AI history.';
        } else if (pct >= 40) {
            emoji = <Lightbulb size={40} strokeWidth={1.8} color="#92400E" />;
            title = 'Good Effort!';
            subtitle = 'Every question is a chance to learn something new.';
        } else {
            emoji = <Lightbulb size={40} strokeWidth={1.8} color="var(--color-ink-muted)" />;
            title = 'Keep Exploring!';
            subtitle = 'You discovered some great facts along the way.';
        }

        return (
            <div className="px-4 py-6 max-w-2xl mx-auto animate-fade-in">
                <div className="text-center mt-6 mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-5"
                        style={{
                            background: isPerfect ? 'rgba(212, 160, 74, 0.15)' : 'rgba(234, 179, 8, 0.10)',
                            border: isPerfect ? '2px solid rgba(212, 160, 74, 0.3)' : '2px solid rgba(234, 179, 8, 0.2)',
                        }}>
                        {emoji}
                    </div>
                    <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
                        {title}
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                        {subtitle}
                    </p>
                </div>

                {/* Score display */}
                <div className="mb-6" style={{
                    background: 'var(--color-card)',
                    boxShadow: 'var(--shadow-card)',
                    borderRadius: '3px',
                    padding: '20px',
                    textAlign: 'center',
                }}>
                    <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '48px',
                        fontWeight: 700,
                        color: isPerfect ? '#D4A04A' : isGreat ? 'var(--color-success)' : 'var(--color-ink)',
                        lineHeight: 1,
                        marginBottom: 4,
                    }}>
                        {score}/{totalQuestions}
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--color-ink-muted)' }}>
                        correct answers
                    </p>

                    {/* Progress bar */}
                    <div style={{
                        marginTop: 16,
                        height: 6,
                        borderRadius: 3,
                        background: 'rgba(var(--color-ink-rgb), 0.08)',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            width: `${pct}%`,
                            height: '100%',
                            borderRadius: 3,
                            background: isPerfect ? '#D4A04A' : isGreat ? 'var(--color-success)' : 'var(--color-coral)',
                            transition: 'width 0.6s ease',
                        }} />
                    </div>
                </div>

                {/* Discovery count */}
                <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                        style={{ background: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.15)' }}>
                        <Sparkles size={14} color="#92400E" strokeWidth={2} />
                        <span className="text-sm font-medium" style={{ color: '#92400E' }}>
                            {discoveredCount} / {FUN_FACTS_TOTAL} facts discovered
                        </span>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                    <Button className="w-full" onClick={handlePlayAgain}>
                        <RotateCcw size={16} strokeWidth={2} style={{ marginRight: 8, display: 'inline' }} />
                        Play Again
                    </Button>
                    <button
                        onClick={onExit}
                        className="w-full text-center py-3 text-sm font-medium rounded-[3px] transition-all active:scale-[0.98]"
                        style={{
                            background: 'var(--color-card)',
                            border: '1.5px solid var(--color-border)',
                            color: 'var(--color-ink-muted)',
                        }}
                    >
                        <ArrowLeft size={14} strokeWidth={2} style={{ marginRight: 6, display: 'inline', verticalAlign: 'middle' }} />
                        Back to Challenge
                    </button>
                </div>
            </div>
        );
    }

    // ─── QUIZ PHASE ───

    // Empty state (shouldn't normally happen)
    if (!currentFact) {
        return (
            <div className="py-6 animate-fade-in">
                <div className="flex-shrink-0 pt-3">
                    <button onClick={onExit} className="flex items-center gap-1 text-sm"
                        style={{ color: 'var(--color-ink-muted)' }}>
                        <ChevronLeft size={16} strokeWidth={2} />
                        Back
                    </button>
                </div>
                <div className="text-center mt-16">
                    <div className="mb-4"><Lightbulb size={40} color="var(--color-ink-muted)" strokeWidth={1.5} /></div>
                    <h2 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>No Fun Facts Yet</h2>
                    <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                        Learn more concepts in lessons to unlock fun facts!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 py-3 max-w-2xl mx-auto animate-fade-in" key={`ff-${questionIndex}`}>
            {/* Top bar */}
            <div className="flex items-center justify-between mb-2">
                <button onClick={onExit} className="flex items-center gap-1 text-sm"
                    style={{ color: 'var(--color-ink-muted)' }}>
                    <ChevronLeft size={16} strokeWidth={2} />
                    Back
                </button>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                        {score} <span style={{ fontWeight: 400, color: 'var(--color-ink-muted)' }}>pts</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: 'var(--color-coral-soft)', color: 'var(--color-coral)' }}>
                        {questionIndex + 1}/{totalQuestions}
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{
                height: 3,
                borderRadius: 2,
                background: 'rgba(var(--color-ink-rgb), 0.08)',
                marginBottom: 14,
                overflow: 'hidden',
            }}>
                <div style={{
                    width: `${((questionIndex + (answered ? 1 : 0)) / totalQuestions) * 100}%`,
                    height: '100%',
                    borderRadius: 2,
                    background: 'var(--color-coral)',
                    transition: 'width 0.4s ease',
                }} />
            </div>

            {/* Concept reference */}
            {concept && (
                <div className="text-center mb-3 animate-fade-in">
                    <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{ color: 'var(--color-ink-faint)' }}>
                        Related to
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
                        style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.06)' }}>
                        <CategoryTag category={concept.category} />
                        <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                            {concept.title}
                        </span>
                    </div>
                </div>
            )}

            {/* Question */}
            <div className="animate-slide-in-right" key={`q-${questionIndex}`}>
                <div className="text-center mb-4 px-2">
                    <h2 className="text-sm font-semibold leading-relaxed" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)', letterSpacing: '-0.01em' }}>
                        {currentFact.question}
                    </h2>
                </div>

                {/* Options */}
                <div className="space-y-2">
                    {shuffledOptions.map((opt, i) => {
                        let bg = 'var(--color-card)';
                        let border = '1px solid var(--color-border)';
                        let textColor = 'var(--color-ink)';
                        let opacity = 1;
                        let icon = null;
                        const isSelected = selectedOption === i;
                        const isWrong = answered && !opt.isCorrect && !isSelected;

                        if (answered) {
                            if (opt.isCorrect) {
                                bg = 'rgba(34, 197, 94, 0.1)';
                                border = '1.5px solid var(--color-success)';
                                textColor = 'var(--color-success)';
                                icon = <Check size={14} color="var(--color-success)" strokeWidth={2.5} />;
                            } else if (isSelected) {
                                bg = 'rgba(239, 68, 68, 0.1)';
                                border = '1.5px solid var(--color-error)';
                                textColor = 'var(--color-error)';
                                icon = <XIcon size={14} color="var(--color-error)" strokeWidth={2.5} />;
                            } else {
                                opacity = 0.35;
                            }
                        }

                        return (
                            <button
                                key={i}
                                onClick={() => handleAnswer(i)}
                                disabled={answered}
                                className={`w-full text-left rounded-[3px] flex items-center justify-between gap-2 transition-all active:scale-[0.98] ${isWrong ? 'px-3 py-2' : 'px-4 py-2.5'}`}
                                style={{ backgroundColor: bg, border, color: textColor, opacity }}
                            >
                                <span className={`${isWrong ? 'text-xs' : 'text-sm'} font-medium`}>{opt.text}</span>
                                {icon}
                            </button>
                        );
                    })}
                </div>

                {/* Explanation (after answering) */}
                {answered && (
                    <div className="mt-4 animate-fade-in">
                        <div className="px-3 py-3 rounded-[3px]" style={{ backgroundColor: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                            <div className="flex items-center gap-1.5 mb-1.5">
                                <Lightbulb size={13} strokeWidth={2} color="#92400E" />
                                <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: '#92400E' }}>
                                    Did you know?
                                </span>
                            </div>
                            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-ink)' }}>
                                {currentFact.explanation}
                            </p>
                        </div>

                        <div className="mt-4">
                            <Button className="w-full" onClick={handleNext}>
                                {questionIndex + 1 >= totalQuestions ? 'See Results' : 'Next Question'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
