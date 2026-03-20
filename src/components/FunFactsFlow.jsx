import { useState, useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { getFunFactsForSeenCards, getNextFunFact } from '../data/funFacts';
import { getConceptById } from '../data/concepts';
import { Button, CategoryTag } from './shared';
import * as feedback from '../services/feedback';
import { ChevronLeft, Lightbulb } from 'lucide-react';

export default function FunFactsFlow({ onExit }) {
    const { state, dispatch } = useApp();
    const [factIndex, setFactIndex] = useState(0);

    const availableFacts = useMemo(
        () => getFunFactsForSeenCards(state.seenCards || []),
        [state.seenCards]
    );

    const currentFact = useMemo(
        () => getNextFunFact(state.seenFunFacts, availableFacts, factIndex),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [availableFacts, factIndex]
    );

    // Look up related cards from relatedCardIds
    const relatedCards = useMemo(() => {
        if (!currentFact || !currentFact.relatedCardIds) return [];
        return currentFact.relatedCardIds
            .map(id => getConceptById(id))
            .filter(Boolean);
    }, [currentFact]);

    const seenCount = useMemo(() => {
        const availableIds = new Set(availableFacts.map(f => f.id));
        return (state.seenFunFacts || []).filter(id => availableIds.has(id)).length;
    }, [state.seenFunFacts, availableFacts]);

    const handleNext = useCallback(() => {
        if (currentFact) {
            dispatch({ type: 'MARK_FUN_FACT_SEEN', funFactId: currentFact.id });
        }
        feedback.select();
        setFactIndex(i => i + 1);
    }, [currentFact, dispatch]);

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

            {/* Fun fact content */}
            <div className="animate-slide-in-right" key={`q-${factIndex}`}>
                {/* Fun fact text */}
                <div className="p-5 rounded-[3px] mb-5" style={{ backgroundColor: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                    <div className="flex items-center gap-1.5 mb-3">
                        <Lightbulb size={16} strokeWidth={2} color="#92400E" />
                        <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: '#92400E' }}>
                            Did you know?
                        </span>
                    </div>
                    <p className="text-[0.95rem] leading-relaxed font-medium" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                        {currentFact.text}
                    </p>
                </div>

                {/* Related cards */}
                {relatedCards.length > 0 && (
                    <div className="mb-5">
                        <p className="text-[10px] uppercase tracking-wider font-semibold mb-2.5" style={{ color: 'var(--color-ink-faint)' }}>
                            Related concepts
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {relatedCards.map(card => (
                                <div key={card.id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                                    style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.06)' }}>
                                    <CategoryTag category={card.category} />
                                    <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                                        {card.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Next button */}
                <div className="mt-5">
                    <Button className="w-full" onClick={handleNext}>
                        Next Fun Fact
                    </Button>
                </div>
            </div>
        </div>
    );
}
