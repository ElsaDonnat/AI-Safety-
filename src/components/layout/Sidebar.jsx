import { useApp } from '../../context/AppContext';
import { ALL_CONCEPTS } from '../../data/concepts';
import * as feedback from '../../services/feedback';
import { NAV_ICONS } from './NavIcons';

const NAV_ITEMS = [
    { id: 'home', label: 'Home' },
    { id: 'learn', label: 'Learn' },
    { id: 'library', label: 'Library' },
    { id: 'practice', label: 'Practice' },
    { id: 'challenge', label: 'Challenge' },
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
                                {NAV_ICONS[item.id]}
                            </span>
                            <span className="sidebar-nav-label">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="sidebar-progress">
                <div className="sidebar-progress-label">
                    <span style={{ fontFamily: 'var(--font-mono)' }}>Progress</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{learnedCount}/{totalConcepts}</span>
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
                        {NAV_ICONS[item.id]}
                        <span className="mobile-tab-label">{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
