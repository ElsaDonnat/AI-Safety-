import { useState, useMemo, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_CONCEPTS, CATEGORIES } from '../data/concepts';
import { TOPICS, DOMAINS } from '../data/lessons';
import { Card, MasteryDots, CategoryTag, StarButton, CardConnections } from '../components/shared';
import { Star, BookOpen, ChevronDown, X } from 'lucide-react';
import { cardImage } from '../utils/images';
import { DEV_UNLOCK_ALL } from '../config/devFlags';

const DIFFICULTY_OPTIONS = [
    { id: 1, label: 'Beginner', color: '#5A9E6F' },
    { id: 2, label: 'Amateur', color: '#D4A026' },
    { id: 3, label: 'Advanced', color: '#C44D4D' },
];

function FilterDropdown({ value, options, onChange, allLabel = 'All', activeColor = null }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return;
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);

    const selected = options.find(o => o.id === value);
    const displayLabel = selected ? selected.label : allLabel;

    return (
        <div ref={ref} className="relative flex-1 min-w-0">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center gap-1.5 px-2.5 py-2 rounded-[3px] text-xs font-semibold transition-all truncate"
                style={{
                    backgroundColor: selected && activeColor
                        ? `${activeColor}18`
                        : 'var(--color-card)',
                    border: selected && activeColor
                        ? `1px solid ${activeColor}40`
                        : '1px solid rgba(var(--color-ink-rgb), 0.1)',
                    color: selected && activeColor ? activeColor : 'var(--color-ink-muted)',
                }}
            >
                {selected && activeColor && (
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: activeColor }} />
                )}
                <span className="truncate">{displayLabel}</span>
                <ChevronDown size={12} className="flex-shrink-0 ml-auto" style={{
                    transform: open ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.15s',
                }} />
            </button>
            {open && (
                <div
                    className="absolute top-full left-0 right-0 mt-1 rounded-[3px] shadow-lg overflow-auto"
                    style={{
                        backgroundColor: 'var(--color-card)',
                        border: '1px solid rgba(var(--color-ink-rgb), 0.1)',
                        zIndex: 50,
                        maxHeight: 260,
                    }}
                >
                    <button
                        onClick={() => { onChange(null); setOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs font-medium transition-colors"
                        style={{
                            backgroundColor: !value ? 'rgba(var(--color-ink-rgb), 0.06)' : 'transparent',
                            color: !value ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                        }}
                    >
                        {allLabel}
                    </button>
                    {options.map(opt => (
                        <button
                            key={opt.id}
                            onClick={() => { onChange(opt.id); setOpen(false); }}
                            className="w-full text-left px-3 py-2 text-xs font-medium transition-colors flex items-center gap-2"
                            style={{
                                backgroundColor: value === opt.id ? 'rgba(var(--color-ink-rgb), 0.06)' : 'transparent',
                                color: value === opt.id ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                            }}
                        >
                            {opt.color && (
                                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: opt.color }} />
                            )}
                            <span className="truncate">{opt.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function LibraryPage() {
    const { state, dispatch } = useApp();
    const [search, setSearch] = useState('');
    const [domainFilter, setDomainFilter] = useState(null);
    const [topicFilter, setTopicFilter] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [difficultyFilter, setDifficultyFilter] = useState(null);
    const [expandedCard, setExpandedCard] = useState(null);
    const [showStarredOnly, setShowStarredOnly] = useState(false);

    const seenCards = useMemo(() => state.seenCards || [], [state.seenCards]);

    const discoveredConcepts = useMemo(() => {
        if (DEV_UNLOCK_ALL) return ALL_CONCEPTS;
        return ALL_CONCEPTS.filter(c => seenCards.includes(c.id));
    }, [seenCards]);

    const starredCards = useMemo(() => state.starredCards || [], [state.starredCards]);

    // Domain options with colors
    const domainOptions = useMemo(() =>
        [...DOMAINS].sort((a, b) => a.order - b.order).map(d => ({ id: d.id, label: d.title, color: d.color })),
    []);

    // Topic options filtered by selected domain
    const topicOptions = useMemo(() => {
        if (!domainFilter) return [];
        return TOPICS
            .filter(t => t.domain === domainFilter)
            .sort((a, b) => a.order - b.order)
            .map(t => ({ id: t.id, label: t.title, color: t.color }));
    }, [domainFilter]);

    // Category options with colors
    const categoryOptions = useMemo(() =>
        CATEGORIES.map(c => ({ id: c.id, label: c.label, color: c.color })),
    []);

    // When domain changes, reset topic
    const handleDomainChange = (domainId) => {
        setDomainFilter(domainId);
        setTopicFilter(null);
    };

    // Get all topic IDs for the selected domain (for filtering)
    const domainTopicIds = useMemo(() => {
        if (!domainFilter) return null;
        return TOPICS.filter(t => t.domain === domainFilter).map(t => t.id);
    }, [domainFilter]);

    const filtered = useMemo(() => {
        let result = discoveredConcepts;
        if (showStarredOnly) {
            result = result.filter(c => starredCards.includes(c.id));
        }
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(c =>
                c.title.toLowerCase().includes(q) ||
                c.tags.some(t => t.toLowerCase().includes(q))
            );
        }
        if (topicFilter) {
            result = result.filter(c => c.topic === topicFilter);
        } else if (domainTopicIds) {
            result = result.filter(c => domainTopicIds.includes(c.topic));
        }
        if (categoryFilter) {
            result = result.filter(c => c.category === categoryFilter);
        }
        if (difficultyFilter) {
            result = result.filter(c => c.difficulty === difficultyFilter);
        }
        return result;
    }, [discoveredConcepts, search, topicFilter, domainTopicIds, categoryFilter, difficultyFilter, showStarredOnly, starredCards]);

    const activeFilterCount = [domainFilter, topicFilter, categoryFilter, difficultyFilter].filter(Boolean).length;

    const clearAllFilters = () => {
        setDomainFilter(null);
        setTopicFilter(null);
        setCategoryFilter(null);
        setDifficultyFilter(null);
        setShowStarredOnly(false);
        setSearch('');
    };

    if (discoveredConcepts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="mb-4"><BookOpen size={40} color="var(--color-ink-muted)" strokeWidth={1.5} /></div>
                <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                    No cards discovered yet
                </h2>
                <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                    Complete lessons to discover AI safety concepts and build your library.
                </p>
            </div>
        );
    }

    const selectedDomain = DOMAINS.find(d => d.id === domainFilter);
    const selectedTopic = TOPICS.find(t => t.id === topicFilter);
    const selectedCategory = CATEGORIES.find(c => c.id === categoryFilter);

    return (
        <div className="px-4 py-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                Library
            </h2>

            {/* Row 1: Star toggle + Search — same height */}
            <div className="flex gap-2 mb-3">
                <button
                    onClick={() => setShowStarredOnly(s => !s)}
                    className="flex items-center justify-center gap-1.5 px-3 rounded-[3px] text-sm font-semibold transition-all flex-shrink-0"
                    style={{
                        height: 38,
                        backgroundColor: showStarredOnly ? 'rgba(230, 168, 23, 0.12)' : 'var(--color-card)',
                        border: showStarredOnly ? '1px solid rgba(230, 168, 23, 0.3)' : '1px solid rgba(var(--color-ink-rgb), 0.1)',
                        color: showStarredOnly ? '#8B6914' : 'var(--color-ink-muted)',
                    }}
                >
                    <Star size={14} fill={showStarredOnly ? 'currentColor' : 'none'} strokeWidth={2} />
                    {starredCards.length > 0 && <span>{starredCards.length}</span>}
                </button>
                <input
                    type="text"
                    placeholder="Search cards..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="px-3 rounded-[3px] text-sm"
                    style={{
                        height: 38,
                        backgroundColor: 'var(--color-card)',
                        border: '1px solid rgba(var(--color-ink-rgb), 0.1)',
                        color: 'var(--color-ink)',
                        outline: 'none',
                        flex: 1,
                        minWidth: 0,
                    }}
                />
            </div>

            {/* Row 2: Domain + Topic (appears when domain selected) */}
            <div className="flex gap-2 mb-2">
                <FilterDropdown
                    value={domainFilter}
                    options={domainOptions}
                    onChange={handleDomainChange}
                    allLabel="All Domains"
                    activeColor={selectedDomain?.color}
                />
                {domainFilter && (
                    <FilterDropdown
                        value={topicFilter}
                        options={topicOptions}
                        onChange={setTopicFilter}
                        allLabel="All Topics"
                        activeColor={selectedTopic?.color}
                    />
                )}
            </div>

            {/* Row 3: Category + Difficulty */}
            <div className="flex gap-2 mb-3">
                <FilterDropdown
                    value={categoryFilter}
                    options={categoryOptions}
                    onChange={setCategoryFilter}
                    allLabel="All Types"
                    activeColor={selectedCategory?.color}
                />
                <FilterDropdown
                    value={difficultyFilter}
                    options={DIFFICULTY_OPTIONS}
                    onChange={setDifficultyFilter}
                    allLabel="All Levels"
                    activeColor={DIFFICULTY_OPTIONS.find(d => d.id === difficultyFilter)?.color}
                />
            </div>

            {/* Active filter summary + clear */}
            {activeFilterCount > 0 && (
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: 'var(--color-ink-faint)' }}>
                        Filters:
                    </span>
                    {domainFilter && selectedDomain && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
                            style={{ backgroundColor: `${selectedDomain.color}18`, color: selectedDomain.color }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedDomain.color }} />
                            {selectedDomain.title}
                            <button onClick={() => handleDomainChange(null)} className="ml-0.5 hover:opacity-70"><X size={10} /></button>
                        </span>
                    )}
                    {topicFilter && selectedTopic && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
                            style={{ backgroundColor: `${selectedTopic.color}18`, color: selectedTopic.color }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedTopic.color }} />
                            {selectedTopic.title}
                            <button onClick={() => setTopicFilter(null)} className="ml-0.5 hover:opacity-70"><X size={10} /></button>
                        </span>
                    )}
                    {categoryFilter && selectedCategory && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
                            style={{ backgroundColor: `${selectedCategory.color}18`, color: selectedCategory.color }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedCategory.color }} />
                            {selectedCategory.label}
                            <button onClick={() => setCategoryFilter(null)} className="ml-0.5 hover:opacity-70"><X size={10} /></button>
                        </span>
                    )}
                    {difficultyFilter && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
                            style={{
                                backgroundColor: `${DIFFICULTY_OPTIONS.find(d => d.id === difficultyFilter)?.color}18`,
                                color: DIFFICULTY_OPTIONS.find(d => d.id === difficultyFilter)?.color,
                            }}>
                            {DIFFICULTY_OPTIONS.find(d => d.id === difficultyFilter)?.label}
                            <button onClick={() => setDifficultyFilter(null)} className="ml-0.5 hover:opacity-70"><X size={10} /></button>
                        </span>
                    )}
                    <button
                        onClick={clearAllFilters}
                        className="text-[10px] font-semibold ml-auto"
                        style={{ color: 'var(--color-ink-muted)' }}
                    >
                        Clear all
                    </button>
                </div>
            )}

            {/* Result count */}
            <p className="text-[11px] font-medium mb-3" style={{ color: 'var(--color-ink-faint)' }}>
                {filtered.length} card{filtered.length !== 1 ? 's' : ''}
            </p>

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
                                <StarButton
                                    isStarred={starredCards.includes(concept.id)}
                                    onClick={() => dispatch({ type: 'TOGGLE_STAR', cardId: concept.id })}
                                    size={16}
                                />
                            </div>
                            {isExpanded && (
                                <div className="mt-3 pt-3 animate-fade-in" style={{ borderTop: '1px solid rgba(var(--color-ink-rgb), 0.06)' }}>
                                    {concept.image && (
                                        <div className="rounded-[3px] overflow-hidden mb-3 flex items-center justify-center"
                                            style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.03)' }}>
                                            <img
                                                src={cardImage(concept.image)}
                                                alt={concept.title}
                                                className="w-full max-h-48 object-contain"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
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
                                    <CardConnections
                                        cardId={concept.id}
                                        allConcepts={ALL_CONCEPTS}
                                        onCardClick={(id) => setExpandedCard(id)}
                                    />
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
