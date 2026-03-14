import { useApp } from '../../context/AppContext';
import { ALL_CONCEPTS } from '../../data/concepts';
import * as feedback from '../../services/feedback';

// Nav icons as filled shapes with typographic stroke contrast baked into geometry.
// Like Clash Display glyphs: thick vertical mass, thin horizontal/diagonal mass,
// with smooth transitions — NOT uniform-width strokes with varying strokeWidth.
const NAV_ITEMS = [
    {
        id: 'home',
        label: 'Home',
        // Contrast ring (like the 'O' glyph) — thick side walls, thin top/bottom walls
        // Achieved via outer circle + inner ellipse compound path with evenodd fill
        icon: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M2.5 12 A9.5 9.5 0 1 1 21.5 12 A9.5 9.5 0 1 1 2.5 12 Z M5 12 A7 8.5 0 1 0 19 12 A7 8.5 0 1 0 5 12 Z"
                />
                <circle cx="12" cy="12" r="2.4" />
            </svg>
        ),
    },
    {
        id: 'learn',
        label: 'Learn',
        // Thick vertical stem + thin horizontal arms at decreasing lengths
        icon: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3.5" y="3" width="2.4" height="18" rx="0.4" />
                <rect x="3.5" y="4" width="16" height="1.1" />
                <rect x="3.5" y="10.5" width="12" height="1.1" />
                <rect x="3.5" y="17" width="8" height="1.1" />
            </svg>
        ),
    },
    {
        id: 'library',
        label: 'Library',
        // Grid with thick vertical bars + thin horizontal bars
        icon: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="2.2" height="18" />
                <rect x="10.9" y="3" width="2.2" height="18" />
                <rect x="18.8" y="3" width="2.2" height="18" />
                <rect x="3" y="3" width="18" height="1.0" />
                <rect x="3" y="11.5" width="18" height="1.0" />
                <rect x="3" y="20" width="18" height="1.0" />
            </svg>
        ),
    },
    {
        id: 'practice',
        label: 'Practice',
        // Refresh arrows: thin-stroked arcs + filled L-shaped arrowheads
        // with thick vertical + thin horizontal (like the letter ⌐ and its mirror)
        icon: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 9 A9 9 0 0 0 5 7" fill="none" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" />
                <path d="M4 15 A9 9 0 0 0 19 17" fill="none" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" />
                <path d="M20 4 H22 V9 H16 V8 H20 Z" />
                <path d="M4 20 H2 V15 H8 V16 H4 Z" />
            </svg>
        ),
    },
    {
        id: 'challenge',
        label: 'Challenge',
        // Diamond with contrast: thick side walls, thin top/bottom edges
        // + thick vertical center accent
        icon: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M12 2 L22 12 L12 22 L2 12 Z M12 3.8 L5.5 12 L12 20.2 L18.5 12 Z"
                />
                <rect x="11" y="7" width="2" height="10" rx="0.5" />
            </svg>
        ),
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
