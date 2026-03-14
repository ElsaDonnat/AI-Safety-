import { useApp } from '../../context/AppContext';
import { ALL_CONCEPTS } from '../../data/concepts';
import * as feedback from '../../services/feedback';

// Artsy minimal nav icons — geometric, abstract, single-weight monoline
const NAV_ITEMS = [
    {
        id: 'home',
        label: 'Home',
        icon: (active) => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 1.8 : 1.4}>
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="2" fill={active ? 'currentColor' : 'none'} />
            </svg>
        ),
    },
    {
        id: 'learn',
        label: 'Learn',
        icon: (active) => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 1.8 : 1.4}>
                <line x1="4" y1="5" x2="20" y2="5" />
                <line x1="4" y1="10" x2="16" y2="10" />
                <line x1="4" y1="15" x2="12" y2="15" />
                <line x1="4" y1="20" x2="8" y2="20" />
            </svg>
        ),
    },
    {
        id: 'library',
        label: 'Library',
        icon: (active) => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 1.8 : 1.4}>
                <rect x="3" y="3" width="8" height="8" />
                <rect x="13" y="3" width="8" height="8" />
                <rect x="3" y="13" width="8" height="8" />
                <rect x="13" y="13" width="8" height="8" />
            </svg>
        ),
    },
    {
        id: 'practice',
        label: 'Practice',
        icon: (active) => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 1.8 : 1.4}>
                <path d="M12 3v18" />
                <path d="M3 12h18" />
                <circle cx="12" cy="12" r="9" />
            </svg>
        ),
    },
    {
        id: 'challenge',
        label: 'Challenge',
        icon: (active) => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 1.8 : 1.4}>
                <path d="M12 3l3 6 3 6H6l3-6 3-6z" />
                <line x1="12" y1="15" x2="12" y2="21" />
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
                            <span className="sidebar-nav-label" style={{ fontFamily: 'var(--font-display)' }}>{item.label}</span>
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
