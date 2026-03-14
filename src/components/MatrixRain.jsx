import { useEffect, useRef } from 'react';

/**
 * Full-screen matrix rain — mostly numbers + some Japanese, falling vertically.
 * Columns start from top on mount, fall slowly, with varying opacity per column.
 * Fades out toward the bottom and faster in the center horizontally.
 * Positioned behind all content, full viewport width.
 */

// Weighted toward numbers: ~70% digits, ~20% Japanese, ~10% binary
const CHARS_NUM = '0123456789';
const CHARS_JP = 'アイセフモデリスク安全';
const CHARS_BIN = '01';

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
        const COL_SPACING = 55; // wide spacing — no overlap
        const BASE_SPEED = 0.25; // slower base speed
        const CHAR_SPACING = 16; // vertical gap between chars in a column

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Create sparse, non-overlapping columns spread across the full width
        const numCols = Math.floor(width / COL_SPACING);
        const columns = [];
        for (let i = 0; i < numCols; i++) {
            const x = i * COL_SPACING + 10 + Math.random() * (COL_SPACING * 0.4);
            const columnAlpha = 0.06 + Math.random() * 0.14; // 0.06–0.20 — some very faint, some slightly visible
            const speed = BASE_SPEED + Math.random() * 0.15;
            const charCount = Math.floor(height / CHAR_SPACING) + 5;

            const chars = [];
            for (let j = 0; j < charCount; j++) {
                chars.push({
                    char: randomChar(),
                    mutateTimer: 80 + Math.random() * 250,
                });
            }

            columns.push({
                x,
                y: -height - Math.random() * height, // start well above viewport — will fall in
                speed,
                alpha: columnAlpha,
                chars,
            });
        }

        // Stagger entry: columns start appearing from left-ish, with delays
        const startTime = Date.now();
        const entryDuration = 4000; // 4 seconds for all columns to start appearing

        function draw() {
            ctx.clearRect(0, 0, width, height);
            ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;

            const elapsed = Date.now() - startTime;

            for (let ci = 0; ci < columns.length; ci++) {
                const col = columns[ci];

                // Stagger entry: each column starts moving after a delay
                const entryDelay = (ci / columns.length) * entryDuration;
                if (elapsed < entryDelay) continue;

                col.y += col.speed;

                // Reset when scrolled well past bottom
                if (col.y > height + 300) {
                    col.y = -Math.random() * height * 0.5 - 200;
                }

                for (let j = 0; j < col.chars.length; j++) {
                    const charY = col.y + j * CHAR_SPACING;
                    if (charY < -20 || charY > height + 20) continue;

                    // Mutate chars occasionally
                    col.chars[j].mutateTimer -= 1;
                    if (col.chars[j].mutateTimer <= 0) {
                        col.chars[j].char = randomChar();
                        col.chars[j].mutateTimer = 80 + Math.random() * 250;
                    }

                    // Vertical fade: visible at top, fading toward bottom
                    const verticalFade = 1.0 - (charY / height) * 0.85;

                    // Horizontal fade: fade faster in center (where content is)
                    // Content area is roughly 200px–(width-200px) on desktop
                    const centerX = width / 2;
                    const distFromCenter = Math.abs(col.x - centerX) / (width / 2);
                    // Center = 0.3 opacity multiplier, edges = 1.0
                    const horizontalFade = 0.3 + distFromCenter * 0.7;

                    const alpha = col.alpha * verticalFade * horizontalFade;
                    if (alpha <= 0.01) continue;

                    ctx.fillStyle = `rgba(44, 36, 32, ${Math.max(0, alpha)})`;
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
