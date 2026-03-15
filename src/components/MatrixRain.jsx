import { useEffect, useRef } from 'react';

/**
 * Full-screen matrix rain — mostly numbers + some Japanese, falling vertically.
 * Columns start from top on mount, fall slowly, with varying opacity.
 * Fades out at ~65% screen height. Clustered randomly, not evenly spaced.
 * Positioned behind sidebar and content (z-index: 0).
 */

// Weighted: ~70% digits, ~20% Japanese, ~10% binary
const CHARS_NUM = '0123456789';
const CHARS_JP = 'アイセフモデリスク安全';
const CHARS_BIN = '01';

// ~5% of chars get coral color
const CORAL_CHANCE = 0.05;

function randomChar() {
    const r = Math.random();
    if (r < 0.70) return CHARS_NUM[Math.floor(Math.random() * CHARS_NUM.length)];
    if (r < 0.90) return CHARS_JP[Math.floor(Math.random() * CHARS_JP.length)];
    return CHARS_BIN[Math.floor(Math.random() * CHARS_BIN.length)];
}

export default function MatrixRain() {
    const canvasRef = useRef(null);
    const animRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const FONT_SIZE = 12;
        const BASE_SPEED = 0.3;
        const CHAR_SPACING = 16;
        const FADE_END = 0.65; // fully transparent by 65% of screen height

        // Sidebar width for offset (matches CSS --sidebar-width)
        const SIDEBAR_WIDTH = 232;
        const isWide = window.innerWidth >= 900;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Create clustered columns — start at sidebar edge on wide screens
        const columns = [];
        const startX = isWide ? SIDEBAR_WIDTH : 5 + Math.random() * 20;
        let x = startX + Math.random() * 15;
        while (x < width - 10) {
            const columnAlpha = 0.15 + Math.random() * 0.25; // 0.15–0.40 (more opaque)
            const speed = BASE_SPEED + Math.random() * 0.2;
            const charCount = Math.floor((height * FADE_END) / CHAR_SPACING) + 8;

            const chars = [];
            for (let j = 0; j < charCount; j++) {
                chars.push({
                    char: randomChar(),
                    isCoral: Math.random() < CORAL_CHANCE,
                    mutateTimer: 20 + Math.random() * 60, // faster mutation
                });
            }

            // Each column starts way above with different offsets
            // headY tracks the leading edge — chars above headY are visible, below are not yet
            const totalColHeight = charCount * CHAR_SPACING;
            columns.push({
                x,
                y: -totalColHeight - Math.random() * height * 0.8, // start fully above viewport
                headY: 0, // will be computed relative to y
                speed,
                alpha: columnAlpha,
                chars,
                entryDelay: Math.random() * 5000, // random delay 0-5s before starting to fall
                started: false,
            });

            // Random gap to next column — sometimes tight (cluster), sometimes wide
            const gap = Math.random() < 0.35
                ? 15 + Math.random() * 25   // tight cluster (35% chance)
                : 40 + Math.random() * 60;  // normal/wide spacing
            x += gap;
        }

        // Shuffle entry order so it's not left-to-right
        columns.forEach(col => {
            col.entryDelay = Math.random() * 4000;
        });

        const startTime = Date.now();

        function draw() {
            ctx.clearRect(0, 0, width, height);
            ctx.font = `${FONT_SIZE}px 'Share Tech Mono', monospace`;

            const elapsed = Date.now() - startTime;

            for (let ci = 0; ci < columns.length; ci++) {
                const col = columns[ci];

                // Stagger entry
                if (!col.started) {
                    if (elapsed < col.entryDelay) continue;
                    col.started = true;
                    // Reset y to start from just above viewport
                    col.y = -col.chars.length * CHAR_SPACING;
                }

                col.y += col.speed;

                // Reset when the entire column has scrolled past the fade zone
                if (col.y > height * FADE_END + 100) {
                    col.y = -col.chars.length * CHAR_SPACING - Math.random() * height * 0.3;
                }

                for (let j = 0; j < col.chars.length; j++) {
                    const charY = col.y + j * CHAR_SPACING;

                    // Skip chars above viewport or below fade zone
                    if (charY < -20) continue;
                    if (charY > height * FADE_END) break;

                    // Mutate chars faster
                    col.chars[j].mutateTimer -= 1;
                    if (col.chars[j].mutateTimer <= 0) {
                        col.chars[j].char = randomChar();
                        col.chars[j].isCoral = Math.random() < CORAL_CHANCE;
                        col.chars[j].mutateTimer = 20 + Math.random() * 60;
                    }

                    // Vertical fade: full opacity at top, zero by FADE_END
                    const verticalProgress = Math.max(0, charY) / (height * FADE_END);
                    const verticalFade = 1.0 - verticalProgress;

                    // Horizontal fade: edges clearly visible, center very faint
                    // On wide screens, compute center relative to content area (right of sidebar)
                    const contentLeft = isWide ? SIDEBAR_WIDTH : 0;
                    const contentWidth = width - contentLeft;
                    const centerX = contentLeft + contentWidth / 2;
                    const distFromCenter = Math.min(1, Math.abs(col.x - centerX) / (contentWidth / 2)); // 0 = center, 1 = edge
                    const eased = distFromCenter * distFromCenter; // quadratic (softer than cubic)
                    const horizontalFade = 0.15 + eased * 0.85;

                    const alpha = col.alpha * verticalFade * horizontalFade;
                    if (alpha <= 0.008) continue;

                    // ~5% of chars render in coral instead of ink
                    if (col.chars[j].isCoral) {
                        ctx.fillStyle = `rgba(212, 114, 106, ${Math.max(0, alpha)})`;
                    } else {
                        ctx.fillStyle = `rgba(44, 36, 32, ${Math.max(0, alpha)})`;
                    }
                    ctx.fillText(col.chars[j].char, col.x, charY);
                }
            }

            animRef.current = requestAnimationFrame(draw);
        }

        animRef.current = requestAnimationFrame(draw);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
}
