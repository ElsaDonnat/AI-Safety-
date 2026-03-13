import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_CONCEPTS, CATEGORIES } from '../data/concepts';
import { TOPICS } from '../data/lessons';
import { Card, MasteryDots, CategoryTag } from '../components/shared';

export default function LibraryPage() {
    const { state } = useApp();
    const [search, setSearch] = useState('');
    const [topicFilter, setTopicFilter] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [expandedCard, setExpandedCard] = useState(null);

    const seenCards = state.seenCards || [];

    const discoveredConcepts = useMemo(() => {
        return ALL_CONCEPTS.filter(c => seenCards.includes(c.id));
    }, [seenCards]);

    const filtered = useMemo(() => {
        let result = discoveredConcepts;
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(c =>
                c.title.toLowerCase().includes(q) ||
                c.tags.some(t => t.toLowerCase().includes(q))
            );
        }
        if (topicFilter) {
            result = result.filter(c => c.topic === topicFilter);
        }
        if (categoryFilter) {
            result = result.filter(c => c.category === categoryFilter);
        }
        return result;
    }, [discoveredConcepts, search, topicFilter, categoryFilter]);

    if (discoveredConcepts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="text-4xl mb-4">📚</div>
                <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-serif)' }}>
                    No cards discovered yet
                </h2>
                <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                    Complete lessons to discover AI safety concepts and build your library.
                </p>
            </div>
        );
    }

    return (
        <div className="px-4 py-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                Library
            </h2>

            {/* Search */}
            <input
                type="text"
                placeholder="Search cards..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm mb-4"
                style={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid rgba(var(--color-ink-rgb), 0.1)',
                    color: 'var(--color-ink)',
                    outline: 'none',
                }}
            />

            {/* Topic filter chips */}
            <div className="flex flex-wrap gap-2 mb-3">
                <button
                    onClick={() => setTopicFilter(null)}
                    className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                    style={{
                        backgroundColor: !topicFilter ? 'var(--color-primary)' : 'rgba(var(--color-ink-rgb), 0.06)',
                        color: !topicFilter ? '#fff' : 'var(--color-ink-muted)',
                    }}
                >
                    All Topics
                </button>
                {TOPICS.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTopicFilter(topicFilter === t.id ? null : t.id)}
                        className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                        style={{
                            backgroundColor: topicFilter === t.id ? t.color : 'rgba(var(--color-ink-rgb), 0.06)',
                            color: topicFilter === t.id ? '#fff' : 'var(--color-ink-muted)',
                        }}
                    >
                        {t.title}
                    </button>
                ))}
            </div>

            {/* Category filter chips */}
            <div className="flex flex-wrap gap-2 mb-4">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setCategoryFilter(categoryFilter === cat.id ? null : cat.id)}
                        className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                        style={{
                            backgroundColor: categoryFilter === cat.id ? cat.color : 'rgba(var(--color-ink-rgb), 0.06)',
                            color: categoryFilter === cat.id ? '#fff' : 'var(--color-ink-muted)',
                        }}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Cards */}
            <div className="space-y-3">
                {filtered.map(concept => {
                    const mastery = state.cardMastery?.[concept.id];
                    const isExpanded = expandedCard === concept.id;
                    return (
                        <Card
                            key={concept.id}
                            onClick={() => setExpandedCard(isExpanded ? null : concept.id)}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <CategoryTag category={concept.category} />
                                        <MasteryDots mastery={mastery} size="sm" />
                                    </div>
                                    <h3 className="font-bold text-sm" style={{ color: 'var(--color-ink)' }}>
                                        {concept.title}
                                    </h3>
                                    <p className="text-xs mt-1" style={{ color: 'var(--color-ink-muted)' }}>
                                        {concept.summary}
                                    </p>
                                </div>
                            </div>
                            {isExpanded && (
                                <div className="mt-3 pt-3 animate-fade-in" style={{ borderTop: '1px solid rgba(var(--color-ink-rgb), 0.06)' }}>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
                                        {concept.description}
                                    </p>
                                    {concept.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-3">
                                            {concept.tags.map(tag => (
                                                <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium"
                                                    style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.05)', color: 'var(--color-ink-muted)' }}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {concept.linkedCards.length > 0 && (
                                        <div className="mt-3">
                                            <p className="text-[11px] uppercase tracking-wider font-semibold mb-1" style={{ color: 'var(--color-ink-faint)' }}>
                                                Related Concepts
                                            </p>
                                            {concept.linkedCards.map(linkedId => {
                                                const linked = ALL_CONCEPTS.find(c => c.id === linkedId);
                                                return linked ? (
                                                    <p key={linkedId} className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                                                        • {linked.title}
                                                    </p>
                                                ) : null;
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>

            {filtered.length === 0 && discoveredConcepts.length > 0 && (
                <p className="text-center text-sm py-8" style={{ color: 'var(--color-ink-muted)' }}>
                    No cards match your filters.
                </p>
            )}
        </div>
    );
}
