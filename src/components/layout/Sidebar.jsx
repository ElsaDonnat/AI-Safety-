import { useApp } from '../../context/AppContext';
import { ALL_CONCEPTS } from '../../data/concepts';
import * as feedback from '../../services/feedback';

// Nav icons with Clash Display stroke contrast:
// - Vertical strokes thicker (2.0–2.2px), horizontal strokes thinner (1.2–1.4px)
// - Geometric shapes, sharp terminals, slight taper feel
const NAV_ITEMS = [
    {
        id: 'home',
        label: 'Home',
        // Circle with dot — thick circle, thin inner detail
        icon: (active) => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="9" strokeWidth={active ? 2.0 : 1.6} />
                <circle cx="12" cy="12" r="2.5" strokeWidth={active ? 1.4 : 1.0} fill={active ? 'currentColor' : 'none'} />
            </svg>
        ),
    },
    {
        id: 'learn',
        label: 'Learn',
        // Stacked lines — thick left verticals, tapering horizontal lines
        icon: (active) => {
            const v = active ? 2.2 : 1.8; // vertical weight
            const h = active ? 1.3 : 1.0; // horizontal weight
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    {/* Thick vertical spine */}
                    <line x1="4" y1="4" x2="4" y2="20" strokeWidth={v} strokeLinecap="round" />
                    {/* Horizontal arms — thinner */}
                    <line x1="4" y1="5" x2="20" y2="5" strokeWidth={h} />
                    <line x1="4" y1="10.5" x2="16" y2="10.5" strokeWidth={h} />
                    <line x1="4" y1="16" x2="12" y2="16" strokeWidth={h} />
                </svg>
            );
        },
    },
    {
        id: 'library',
        label: 'Library',
        // Grid — thick verticals, thin horizontals
        icon: (active) => {
            const v = active ? 2.0 : 1.6;
            const h = active ? 1.2 : 0.9;
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    {/* Vertical dividers — thick */}
                    <line x1="3" y1="3" x2="3" y2="21" strokeWidth={v} />
                    <line x1="12" y1="3" x2="12" y2="21" strokeWidth={v} />
                    <line x1="21" y1="3" x2="21" y2="21" strokeWidth={v} />
                    {/* Horizontal dividers — thin */}
                    <line x1="3" y1="3" x2="21" y2="3" strokeWidth={h} />
                    <line x1="3" y1="12" x2="21" y2="12" strokeWidth={h} />
                    <line x1="3" y1="21" x2="21" y2="21" strokeWidth={h} />
                </svg>
            );
        },
    },
    {
        id: 'practice',
        label: 'Practice',
        // Refresh arrows — thick vertical strokes, thin circular arc
        icon: (active) => {
            const v = active ? 2.2 : 1.8; // arrow stems
            const h = active ? 1.3 : 1.0; // arc
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round">
                    {/* Top arc — thin */}
                    <path d="M20 8A9 9 0 0 0 5 7" strokeWidth={h} />
                    {/* Bottom arc — thin */}
                    <path d="M4 16a9 9 0 0 0 15 1" strokeWidth={h} />
                    {/* Arrow heads — thick */}
                    <polyline points="21 4 21 9 16 9" strokeWidth={v} strokeLinejoin="round" />
                    <polyline points="3 20 3 15 8 15" strokeWidth={v} strokeLinejoin="round" />
                </svg>
            );
        },
    },
    {
        id: 'challenge',
        label: 'Challenge',
        // Diamond/rhombus — thick verticals, thin diagonals
        icon: (active) => {
            const v = active ? 2.2 : 1.8;
            const h = active ? 1.2 : 0.9;
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    {/* Diamond shape — thin diagonals */}
                    <path d="M12 2L22 12L12 22L2 12Z" strokeWidth={h} />
                    {/* Thick vertical center line */}
                    <line x1="12" y1="6" x2="12" y2="18" strokeWidth={v} />
                </svg>
            );
        },
    },
];

export default function Sidebar({ activeTab, onTabChange }) {
    const { state } = useApp();
    const learnedCount = state.seenCards?.length || 0;
    const totalConcepts = ALL_CONCEPTS.length;
    const progressPct = totalConcepts > 0 ? Math.round((learnedCount / totalConcepts) * 100) : 0;

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                {NAV_ITEMS.map(item => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => { feedback.tabSwitch(); onTabChange(item.id); }}
                            className={`sidebar-nav-item ${isActive ? 'sidebar-nav-item--active' : ''}`}
                        >
                            <span className="sidebar-nav-icon">
                                {item.icon(isActive)}
                            </span>
                            <span className="sidebar-nav-label" style={{ fontFamily: 'var(--font-mono)' }}>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="sidebar-progress">
                <div className="sidebar-progress-label">
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Progress</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{learnedCount}/{totalConcepts}</span>
                </div>
                <div className="sidebar-progress-bar">
                    <div
                        className="sidebar-progress-fill"
                        style={{ width: `${progressPct}%` }}
                    />
                </div>
                <p className="sidebar-progress-text" style={{ fontFamily: 'var(--font-mono)' }}>
                    {learnedCount === 0
                        ? 'Start your first lesson'
                        : `${progressPct}% of concepts discovered`
                    }
                </p>
            </div>
        </aside>
    );
}

export function MobileTabBar({ activeTab, onTabChange }) {
    return (
        <div className="mobile-tab-bar">
            {NAV_ITEMS.map(item => {
                const isActive = activeTab === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => { feedback.tabSwitch(); onTabChange(item.id); }}
                        className={`mobile-tab-item ${isActive ? 'mobile-tab-item--active' : ''}`}
                    >
                        {item.icon(isActive)}
                        <span className="mobile-tab-label">{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
