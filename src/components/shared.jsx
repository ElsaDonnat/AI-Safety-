import { useState, useRef, useEffect, forwardRef } from 'react';
import { CATEGORY_CONFIG } from '../data/concepts';
import * as feedback from '../services/feedback';
import { Lightbulb, Wrench, AlertTriangle, Scale, ClipboardCheck, FileText, Building, HelpCircle, Star, Calendar, ChevronRight } from 'lucide-react';

/** Truncates text to `lines` lines with a "Read more / Less" toggle. */
export function ExpandableText({ children, lines = 3, className = '', style = {}, footerLeft = null }) {
    const [expanded, setExpanded] = useState(false);
    const [needsTruncation, setNeedsTruncation] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;
        // Compare full scrollHeight vs clamped height
        const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20;
        setNeedsTruncation(el.scrollHeight > lineHeight * lines + 4);
    }, [children, lines]);

    return (
        <div>
            <p
                ref={textRef}
                className={className}
                style={{
                    ...style,
                    ...(!expanded && needsTruncation ? {
                        display: '-webkit-box',
                        WebkitLineClamp: lines,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    } : {}),
                }}
            >
                {children}
            </p>
            {(needsTruncation || footerLeft) && (
                <div className="flex items-center justify-between mt-1">
                    <div className="flex-1 min-w-0">{footerLeft}</div>
                    {needsTruncation && (
                        <button
                            onClick={() => setExpanded(e => !e)}
                            className="text-xs font-medium flex-shrink-0 ml-3"
                            style={{ color: 'var(--color-coral)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                            {expanded ? 'Show less' : 'Read more'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export function CategoryTag({ category }) {
    const config = CATEGORY_CONFIG[category];
    if (!config) return null;

    return (
        <span
            className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-[2px]"
            style={{ color: config.color, backgroundColor: `${config.color}18`, fontFamily: 'var(--font-mono)' }}
        >
            {config.label}
        </span>
    );
}

// Maps category icon keys to Lucide components
const ICON_COMPONENTS = {
    lightbulb: Lightbulb,
    wrench: Wrench,
    'alert-triangle': AlertTriangle,
    scale: Scale,
    'clipboard-check': ClipboardCheck,
    'file-text': FileText,
    building: Building,
    'help-circle': HelpCircle,
};

export function CategoryIcon({ category, size = 16, color }) {
    const config = CATEGORY_CONFIG[category];
    if (!config) return null;
    const IconComponent = ICON_COMPONENTS[config.icon] || HelpCircle;
    const c = color || config.color || 'currentColor';
    return <IconComponent size={size} color={c} strokeWidth={2} style={{ flexShrink: 0 }} />;
}

export function ImportanceTag() {
    return null;
}

export function DiHBadge({ size = 'sm' }) {
    const isSmall = size === 'sm';
    return (
        <span
            className="inline-flex items-center gap-1 rounded-[2px] font-semibold uppercase tracking-wider flex-shrink-0"
            style={{
                fontSize: isSmall ? '9px' : '11px',
                padding: isSmall ? '2px 6px' : '3px 8px',
                color: '#8B6914',
                backgroundColor: 'rgba(230, 168, 23, 0.12)',
                border: '1px solid rgba(230, 168, 23, 0.2)',
            }}
        >
            <Calendar size={isSmall ? 10 : 12} strokeWidth={2} />
            Bonus
        </span>
    );
}

export function MasteryDots({ mastery, size = 'sm', hasWhy = true }) {
    const dotSize = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3';
    const gap = size === 'sm' ? 'gap-1' : 'gap-1.5';

    const getColor = (score) => {
        if (score === 'green') return 'var(--color-success)';
        if (score === 'yellow') return 'var(--color-warning)';
        if (score === 'red') return 'var(--color-error)';
        return 'var(--color-ink-faint)';
    };

    const labels = hasWhy ? ['What', 'Why', 'How'] : ['What', 'How'];
    const scores = hasWhy
        ? [mastery?.whatScore, mastery?.whyScore, mastery?.howScore]
        : [mastery?.whatScore, mastery?.howScore];

    return (
        <div className={`flex items-center ${gap}`} title={scores.map((s, i) => `${labels[i]}: ${s || 'not tested'}`).join(', ')}>
            {scores.map((score, i) => (
                <div
                    key={i}
                    className={`${dotSize} rounded-full transition-colors duration-300`}
                    style={{
                        backgroundColor: getColor(score),
                        opacity: score ? 1 : 0.3
                    }}
                />
            ))}
        </div>
    );
}

export function Divider() {
    return (
        <div className="flex items-center justify-center my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.08)' }} />
            <div className="mx-3">
                <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: 'var(--color-sky-deep)' }} />
            </div>
            <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.08)' }} />
        </div>
    );
}

export function ProgressBar({ value, max, color }) {
    const pct = Math.min((value / max) * 100, 100);
    return (
        <div className="w-full overflow-hidden" style={{ height: '4px', borderRadius: '1px', backgroundColor: 'var(--color-surface-alt, rgba(var(--color-ink-rgb), 0.06))' }}>
            <div
                className="h-full transition-all duration-500 ease-out"
                style={{
                    width: `${pct}%`,
                    borderRadius: '1px',
                    backgroundColor: color || 'var(--color-sky)',
                }}
            />
        </div>
    );
}

export const Button = forwardRef(function Button({ children, onClick, variant = 'primary', disabled = false, className = '' }, ref) {
    const base = 'px-6 py-3 rounded-[3px] font-semibold text-sm transition-all duration-200 active:scale-[0.98] cursor-pointer';

    const variants = {
        primary: {
            backgroundColor: disabled ? 'var(--color-ink-faint)' : 'var(--color-sky)',
            color: '#fff',
            boxShadow: disabled ? 'none' : '0 2px 8px rgba(168, 200, 216, 0.35)'
        },
        secondary: {
            backgroundColor: 'rgba(168, 200, 216, 0.12)',
            color: 'var(--color-sky-deep)',
        },
        ghost: {
            backgroundColor: 'transparent',
            color: 'var(--color-ink-muted)',
        }
    };

    // Enlarge → arrows inside button text by 20%
    const enlargeArrows = (node) => {
        if (typeof node === 'string') {
            if (!node.includes('\u2192')) return node;
            return node.split(/(\u2192)/g).map((part, i) =>
                part === '\u2192' ? <span key={i} style={{ fontSize: '1.2em', lineHeight: 1 }}>{'\u2192'}</span> : part
            );
        }
        return node;
    };

    const processedChildren = Array.isArray(children)
        ? children.map((child, i) => typeof child === 'string' ? <span key={i}>{enlargeArrows(child)}</span> : child)
        : enlargeArrows(children);

    return (
        <button
            ref={ref}
            onClick={(e) => { if (!disabled) feedback.tap(); onClick?.(e); }}
            disabled={disabled}
            className={`${base} ${className}`}
            style={{
                ...variants[variant],
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
            }}
        >
            {processedChildren}
        </button>
    );
});

export function Card({ children, className = '', onClick, style = {} }) {
    return (
        <div
            onClick={onClick}
            className={`rounded-[3px] p-5 transition-all duration-200 ${onClick ? 'cursor-pointer active:scale-[0.99]' : ''} ${className}`}
            style={{
                backgroundColor: 'var(--color-card)',
                boxShadow: 'var(--shadow-card)',
                ...style
            }}
        >
            {children}
        </div>
    );
}

export function StarButton({ isStarred, onClick, size = 18 }) {
    return (
        <button
            onClick={(e) => { e.stopPropagation(); feedback.starPing(); onClick(); }}
            className="flex items-center justify-center transition-all duration-200 active:scale-90"
            style={{ color: isStarred ? 'var(--color-coral)' : 'var(--color-ink-faint)', minWidth: '44px', minHeight: '44px' }}
            title={isStarred ? 'Remove from favorites' : 'Add to favorites'}
        >
            <Star size={size} fill={isStarred ? 'currentColor' : 'none'} strokeWidth={2} />
        </button>
    );
}

let _confirmModalCounter = 0;

export function ConfirmModal({ title, message, confirmLabel = 'Yes', cancelLabel = 'Cancel', onConfirm, onCancel, danger = false }) {
    const cancelRef = useRef(null);
    const [titleId] = useState(() => `confirm-title-${++_confirmModalCounter}`);

    useEffect(() => {
        cancelRef.current?.focus();
        feedback.modalOpen();
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.4)', backdropFilter: 'blur(4px)' }} onClick={onCancel || onConfirm}>
            <div role="dialog" aria-modal="true" aria-labelledby={titleId.current} className="w-full max-w-sm rounded-[4px] p-6 animate-fade-in" style={{ backgroundColor: 'var(--color-card)', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
                <h3 id={titleId.current} className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                    {title}
                </h3>
                <p className="text-sm mb-6" style={{ color: 'var(--color-ink-muted)' }}>
                    {message}
                </p>
                <div className="flex gap-3">
                    {cancelLabel && (
                        <Button ref={cancelRef} variant="secondary" className="flex-1" onClick={onCancel}>
                            {cancelLabel}
                        </Button>
                    )}
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-6 py-3 rounded-[3px] font-semibold text-sm transition-all duration-200 active:scale-[0.98] cursor-pointer"
                        style={{
                            backgroundColor: danger ? 'var(--color-error)' : 'var(--color-sky)',
                            color: '#fff',
                            boxShadow: danger ? '0 2px 8px rgba(166, 61, 61, 0.25)' : '0 2px 8px rgba(168, 200, 216, 0.35)',
                        }}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

export function ControversyNote({ note }) {
    const [expanded, setExpanded] = useState(false);
    if (!note) return null;

    return (
        <div className="mt-3 animate-fade-in">
            <button
                onClick={() => setExpanded(e => !e)}
                className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
                style={{ color: 'var(--color-ink-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ backgroundColor: 'var(--color-coral-soft)', color: 'var(--color-coral)' }}>
                    ?
                </span>
                {expanded ? 'Hide scholarly note' : 'See scholarly note'}
            </button>
            {expanded && (
                <div className="mt-2 px-3 py-2.5 rounded-[3px] text-xs leading-relaxed animate-fade-in"
                    style={{
                        backgroundColor: 'rgba(var(--color-ink-rgb), 0.04)',
                        borderLeft: '2px solid var(--color-coral)',
                        color: 'var(--color-ink-secondary)',
                        fontStyle: 'italic',
                    }}>
                    {note}
                </div>
            )}
        </div>
    );
}

export function AnimatedCounter({ value, prefix = '', duration = 600, delay = 0, className = '', style = {} }) {
    const [display, setDisplay] = useState(0);
    const hasStarted = useRef(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (hasStarted.current) return;
            hasStarted.current = true;
            const startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setDisplay(Math.round(value * eased));
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }, delay);
        return () => clearTimeout(timeout);
    }, [value, duration, delay]);

    return <span className={className} style={style}>{prefix}{display}</span>;
}

export function TabSelector({ tabs, activeTab, onChange, accentColor }) {
    return (
        <div className="flex rounded-[3px] p-1" style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.05)' }}>
            {tabs.map(tab => {
                const isActive = activeTab === tab.id;
                const useAccent = isActive && accentColor && tab.accent;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className="flex-1 px-4 py-2 rounded-[2px] text-xs font-semibold transition-all duration-200"
                        style={{
                            backgroundColor: useAccent
                                ? `${accentColor}15`
                                : isActive ? 'var(--color-card)' : 'transparent',
                            color: useAccent
                                ? accentColor
                                : isActive ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                            boxShadow: isActive ? 'var(--shadow-card)' : 'none',
                            border: useAccent ? `1px solid ${accentColor}25` : '1px solid transparent',
                        }}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}

/** Shows linked cards for a concept. */
export function CardConnections({ cardId, onCardClick, allConcepts = [] }) {
    const concept = allConcepts.find(c => c.id === cardId);
    if (!concept || !concept.linkedCards || concept.linkedCards.length === 0) return null;

    // linkedCards can be string[] (legacy) or { id, relationship }[]
    const linkedEntries = concept.linkedCards.map(entry => {
        const id = typeof entry === 'string' ? entry : entry.id;
        const relationship = typeof entry === 'string' ? null : entry.relationship;
        const linked = allConcepts.find(c => c.id === id);
        return linked ? { ...linked, relationship } : null;
    }).filter(Boolean);

    if (linkedEntries.length === 0) return null;

    return (
        <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(var(--color-ink-rgb), 0.06)' }}>
            <p className="text-[11px] uppercase tracking-wider font-semibold mb-2" style={{ color: 'var(--color-ink-faint)' }}>
                Related Concepts
            </p>
            {linkedEntries.map(conn => (
                <div
                    key={conn.id}
                    className={`flex items-start gap-2 text-xs py-1.5 ${onCardClick ? 'cursor-pointer active:opacity-70' : ''}`}
                    style={{ color: 'var(--color-ink-muted)' }}
                    onClick={onCardClick ? (e) => { e.stopPropagation(); onCardClick(conn.id); } : undefined}
                >
                    <ChevronRight size={12} color={CATEGORY_CONFIG[conn.category]?.color || '#999'} strokeWidth={2.5} className="flex-shrink-0 mt-0.5" />
                    <div>
                        {conn.relationship && (
                            <span className="text-[10px] mr-1 px-1.5 py-0.5 rounded-[2px]" style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.05)', color: 'var(--color-ink-faint)' }}>
                                {conn.relationship}
                            </span>
                        )}
                        <span className="font-medium" style={{ color: 'var(--color-ink)' }}>
                            {conn.title}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
