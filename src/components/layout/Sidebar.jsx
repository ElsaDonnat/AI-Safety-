import { useApp } from '../../context/AppContext';
import { ALL_CONCEPTS } from '../../data/concepts';
import * as feedback from '../../services/feedback';

// Nav icons — brush-pen style. Each icon drawn as single/compound paths to
// avoid visible overlapping artifacts. Thick verticals, thin horizontals,
// tapered ends — like a chisel-tipped Japanese pencil.
const NAV_ITEMS = [
    {
        id: 'home',
        label: 'Home',
        // Outlined house — compound path (outer minus inner), matching thin stroke weight of other icons
        icon: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="
                    M12 2.5 L21.5 12 L19 12 L19 21 L5 21 L5 12 L2.5 12 Z
                    M12 6 Q15 6.5 17 12 L17 19 L7 19 L7 12 Q9 6.5 12 6 Z
                "/>
            </svg>
        ),
    },
    {
        id: 'learn',
        label: 'Learn',
        // F-shape as single path outline — no overlapping strokes
        icon: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="
                    M3.5 3 L20 3
                    C20.3 3 20.5 3.5 20 4
                    C18 5.5 10 6 7 6
                    L7 10
                    C10 10 14 9.8 16 9.5
                    C16.5 9.5 16.5 10 16 10.5
                    C14 11.5 10 12 7 12
                    L7 18
                    C7 19.5 6.5 21 5 21
                    C3.5 21 3 19.5 3 18
                    L3 3.5 C3 3.2 3.2 3 3.5 3 Z
                "/>
            </svg>
        ),
    },
    {
        id: 'library',
        label: 'Library',
        // Three book spines (non-overlapping vertical strokes) + shelf
        icon: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.5 3 C7 6 7 17 5.5 20 C4 17 4 6 5.5 3 Z"/>
                <path d="M12 3.5 C13.5 6.5 13.5 16.5 12 19.5 C10.5 16.5 10.5 6.5 12 3.5 Z"/>
                <path d="M18.5 3 C20 6 20 17 18.5 20 C17 17 17 6 18.5 3 Z"/>
                <path d="M3 20.5 C7 19.5 17 19.5 21 20.5 C17 21.5 7 21.5 3 20.5 Z"/>
            </svg>
        ),
    },
    {
        id: 'practice',
        label: 'Practice',
        // Two arc-arrows as single shapes (crescent + integrated arrowhead each)
        icon: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="
                    M19 8 Q12 1 4.5 5.5
                    L6 8.5 Q12 4 18 8
                    Z
                "/>
                <path d="
                    M5 16 Q12 23 19.5 18.5
                    L18 15.5 Q12 20 6 16
                    Z
                "/>
            </svg>
        ),
    },
    {
        id: 'challenge',
        label: 'Challenge',
        // Diamond outline as single compound path (outer straight, inner rounded)
        // + center vertical brush accent
        icon: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="
                    M12 2 L22 12 L12 22 L2 12 Z
                    M12 5.5 Q17 6.5 18.5 12 Q17 17.5 12 18.5 Q7 17.5 5.5 12 Q7 6.5 12 5.5 Z
                "/>
                <path d="M12 8 C13 9.5 13 14.5 12 16 C11 14.5 11 9.5 12 8 Z"/>
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
