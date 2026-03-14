/**
 * Minimal editorial streak flame — monoline style matching the app's design language.
 * Three states: active (coral gradient), at-risk (amber with clock), inactive (warm gray).
 */
export default function StreakFlame({ status = 'inactive', size = 18 }) {
    const className = status !== 'inactive' ? `streak-flame--${status}` : undefined;

    // Color configs per status
    const colors = {
        active: { stroke: '#D4726A', fill: 'rgba(212, 114, 106, 0.15)', inner: '#F0C060' },
        'at-risk': { stroke: '#D4A04A', fill: 'rgba(212, 160, 74, 0.12)', inner: '#E8956A' },
        inactive: { stroke: '#B5A99F', fill: 'rgba(181, 169, 159, 0.08)', inner: '#D1C8BE' },
    };

    const c = colors[status];

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            {/* Outer flame shape — filled softly */}
            <path
                d="M12 2C12 2 6 8.5 6 13.5C6 17.1 8.7 20 12 20C15.3 20 18 17.1 18 13.5C18 8.5 12 2 12 2Z"
                fill={c.fill}
                stroke={c.stroke}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Inner flame — smaller, warm core */}
            <path
                d="M12 9C12 9 9.5 12.5 9.5 14.5C9.5 16.1 10.6 17 12 17C13.4 17 14.5 16.1 14.5 14.5C14.5 12.5 12 9 12 9Z"
                fill={status === 'inactive' ? 'none' : c.inner}
                stroke={c.stroke}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={status === 'inactive' ? 0.5 : 0.8}
            />
            {/* Clock badge for at-risk */}
            {status === 'at-risk' && (
                <g transform="translate(17, 4)">
                    <circle cx="0" cy="0" r="3.5" fill="#F5E6D3" stroke="#D4A04A" strokeWidth="1" />
                    <line x1="0" y1="0" x2="0" y2="-1.8" stroke="#5D4037" strokeWidth="1" strokeLinecap="round" />
                    <line x1="0" y1="0" x2="1.5" y2="0" stroke="#5D4037" strokeWidth="1" strokeLinecap="round" />
                </g>
            )}
        </svg>
    );
}
