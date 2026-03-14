import { useApp } from '../../context/AppContext';
import { ALL_CONCEPTS } from '../../data/concepts';
import * as feedback from '../../services/feedback';

// Nav icons — brush-pen style: each stroke is a filled leaf/crescent shape,
// tapered at both ends, thick in the middle. Verticals are heavier than
// horizontals, like a chisel-tipped Japanese pencil held at an angle.
const NAV_ITEMS = [
    {
        id: 'home',
        label: 'Home',
        // Brush-drawn ring: outer circle + inner ellipse (rx<ry → thick sides, thin top/bottom)
        // Slight center offset for organic asymmetry. Plus a center ink dot.
        icon: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12 2.5 A9.5 9.5 0 1 1 11.99 2.5 Z M12.2 4.3 A6.3 7.9 0 1 0 12.19 4.3 Z"/>
                <circle cx="12" cy="12" r="2.2" />
            </svg>
        ),
    },
    {
        id: 'learn',
        label: 'Learn',
        // Vertical stem (thick leaf stroke) + 3 horizontal lines (thin leaf strokes, decreasing length)
        icon: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 2 C7.5 5 7.5 18 5 21 C2.5 18 2.5 5 5 2 Z"/>
                <path d="M5 5 C8 3.8 17 3.8 20 5 C17 6.2 8 6.2 5 5 Z"/>
                <path d="M5 11 C7.5 9.8 14 9.8 16.5 11 C14 12.2 7.5 12.2 5 11 Z"/>
                <path d="M5 17 C6.5 15.8 10.5 15.8 12 17 C10.5 18.2 6.5 18.2 5 17 Z"/>
            </svg>
        ),
    },
    {
        id: 'library',
        label: 'Library',
        // Grid: 3 thick vertical leaf strokes + 3 thin horizontal leaf strokes
        icon: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.5 3 C6.2 6 6.2 18 4.5 21 C2.8 18 2.8 6 4.5 3 Z"/>
                <path d="M12 3 C13.7 6 13.7 18 12 21 C10.3 18 10.3 6 12 3 Z"/>
                <path d="M19.5 3 C21.2 6 21.2 18 19.5 21 C17.8 18 17.8 6 19.5 3 Z"/>
                <path d="M3 4.5 C6 3.5 18 3.5 21 4.5 C18 5.5 6 5.5 3 4.5 Z"/>
                <path d="M3 12 C6 11 18 11 21 12 C18 13 6 13 3 12 Z"/>
                <path d="M3 19.5 C6 18.5 18 18.5 21 19.5 C18 20.5 6 20.5 3 19.5 Z"/>
            </svg>
        ),
    },
    {
        id: 'practice',
        label: 'Practice',
        // Two crescent-shaped arc brush strokes + leaf-shaped arrowheads
        icon: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 8 Q12 1.5 6 8 Q12 4.5 18 8 Z"/>
                <path d="M6 16 Q12 22.5 18 16 Q12 19.5 6 16 Z"/>
                <path d="M4.5 5.5 Q5.8 7.5 6.5 9.5 Q5 8 4.5 5.5 Z"/>
                <path d="M19.5 18.5 Q18.2 16.5 17.5 14.5 Q19 16 19.5 18.5 Z"/>
            </svg>
        ),
    },
    {
        id: 'challenge',
        label: 'Challenge',
        // Diamond: 4 leaf-shaped edge strokes (thick on \ diags, thin on / diags)
        // + inner vertical brush accent
        icon: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3 Q18 5.5 21 12 Q15 9.5 12 3 Z"/>
                <path d="M21 12 Q18 18 12 21 Q15.5 15.5 21 12 Z"/>
                <path d="M12 21 Q6 18.5 3 12 Q9 14.5 12 21 Z"/>
                <path d="M3 12 Q6 6 12 3 Q8.5 8.5 3 12 Z"/>
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
