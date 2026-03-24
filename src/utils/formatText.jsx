import React from 'react';

/**
 * Renders a plain-text string with **bold** and *italic* markdown into JSX.
 * Handles **bold** first, then *italic* within each segment.
 */
export function formatText(text) {
    if (!text || typeof text !== 'string') return text;

    // Split on **bold** segments
    const boldParts = text.split(/\*\*([^*]+)\*\*/g);

    return boldParts.map((segment, i) => {
        // Odd indices are bold captures
        if (i % 2 === 1) {
            return <strong key={i}>{renderItalics(segment, i)}</strong>;
        }
        return <React.Fragment key={i}>{renderItalics(segment, i)}</React.Fragment>;
    });
}

function renderItalics(text, parentKey) {
    const parts = text.split(/\*([^*]+)\*/g);
    if (parts.length === 1) return text;
    return parts.map((part, j) => {
        if (j % 2 === 1) {
            return <em key={`${parentKey}-${j}`}>{part}</em>;
        }
        return part;
    });
}
