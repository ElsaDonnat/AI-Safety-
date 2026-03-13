// ─── Card Image Helper ─────────────────────────────────────
// Returns the full URL path for a card image filename.
// Uses Vite's BASE_URL so it works on both GitHub Pages and Capacitor.

const BASE = import.meta.env.BASE_URL;

export function cardImage(filename) {
    if (!filename) return null;
    return `${BASE}images/cards/${filename}`;
}
