import { useState, useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { getFunFactsForSeenCards, getNextFunFact } from '../data/funFacts';
import { getConceptById } from '../data/concepts';
import { Button, CategoryTag } from './shared';
import * as feedback from '../services/feedback';
import { ChevronLeft, Check, X as XIcon, Lightbulb } from 'lucide-react';

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
    const [factIndex, setFactIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answered, setAnswered] = useState(false);

    const availableFacts = useMemo(
        () => getFunFactsForSeenCards(state.seenCards || []),
        [state.seenCards]
    );

    const currentFact = useMemo(
        () => getNextFunFact(state.seenFunFacts, availableFacts, factIndex),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [availableFacts, factIndex]
    );

    const concept = currentFact ? getConceptById(currentFact.cardId) : null;

    const shuffledOptions = useMemo(
        () => currentFact ? shuffleOptions(currentFact.correctAnswer, currentFact.wrongAnswers) : [],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentFact?.id, factIndex]
    );

    const seenCount = useMemo(() => {
        const availableIds = new Set(availableFacts.map(f => f.id));
        return (state.seenFunFacts || []).filter(id => availableIds.has(id)).length;
    }, [state.seenFunFacts, availableFacts]);

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

        if (currentFact) {
            dispatch({ type: 'MARK_FUN_FACT_SEEN', funFactId: currentFact.id });
        }
    }, [answered, shuffledOptions, currentFact, dispatch]);

    const handleNext = useCallback(() => {
        setSelectedOption(null);
        setAnswered(false);
        setFactIndex(i => i + 1);
    }, []);

    // ─── Empty state ───
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
        <div className="py-6 animate-fade-in" key={`ff-${factIndex}`}>
            {/* Top bar */}
            <div className="flex items-center justify-between mb-4">
                <button onClick={onExit} className="flex items-center gap-1 text-sm"
                    style={{ color: 'var(--color-ink-muted)' }}>
                    <ChevronLeft size={16} strokeWidth={2} />
                    Back
                </button>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: 'rgba(234, 179, 8, 0.15)', color: '#92400E' }}>
                        <Lightbulb size={12} strokeWidth={2} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} /> Fun Fact
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'var(--color-ink-muted)' }}>
                        {seenCount}/{availableFacts.length}
                    </span>
                </div>
            </div>

            {/* Concept reference */}
            {concept && (
                <div className="text-center mb-5 animate-fade-in">
                    <p className="text-[10px] uppercase tracking-wider font-semibold mb-1.5" style={{ color: 'var(--color-ink-faint)' }}>
                        Related to
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.06)' }}>
                        <CategoryTag category={concept.category} />
                        <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                            {concept.title}
                        </span>
                    </div>
                </div>
            )}

            {/* Question */}
            <div className="animate-slide-in-right" key={`q-${factIndex}`}>
                <div className="text-center mb-6 px-2">
                    <h2 className="text-base font-bold leading-relaxed" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                        {currentFact.question}
                    </h2>
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                    {shuffledOptions.map((opt, i) => {
                        let bg = 'var(--color-card)';
                        let border = '1.5px solid var(--color-ink-faint)';
                        let textColor = 'var(--color-ink)';
                        let opacity = 1;
                        let icon = null;

                        if (answered) {
                            if (opt.isCorrect) {
                                bg = 'rgba(34, 197, 94, 0.1)';
                                border = '1.5px solid var(--color-success)';
                                textColor = 'var(--color-success)';
                                icon = <Check size={16} color="var(--color-success)" strokeWidth={2.5} />;
                            } else if (selectedOption === i) {
                                bg = 'rgba(239, 68, 68, 0.1)';
                                border = '1.5px solid var(--color-error)';
                                textColor = 'var(--color-error)';
                                icon = <XIcon size={16} color="var(--color-error)" strokeWidth={2.5} />;
                            } else {
                                opacity = 0.4;
                            }
                        }

                        return (
                            <button
                                key={i}
                                onClick={() => handleAnswer(i)}
                                disabled={answered}
                                className="w-full text-left px-4 py-3 rounded-[3px] flex items-center justify-between gap-2 transition-all active:scale-[0.98]"
                                style={{ backgroundColor: bg, border, color: textColor, opacity }}
                            >
                                <span className="text-sm font-medium">{opt.text}</span>
                                {icon}
                            </button>
                        );
                    })}
                </div>

                {/* Explanation (after answering) */}
                {answered && (
                    <div className="mt-5 animate-fade-in">
                        <div className="p-4 rounded-[3px]" style={{ backgroundColor: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                            <div className="flex items-center gap-1.5 mb-2">
                                <Lightbulb size={14} strokeWidth={2} color="#92400E" />
                                <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: '#92400E' }}>
                                    Did you know?
                                </span>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink)' }}>
                                {currentFact.explanation}
                            </p>
                        </div>

                        <div className="mt-5">
                            <Button className="w-full" onClick={handleNext}>
                                Next Fun Fact
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
