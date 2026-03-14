import { useEffect, useRef } from 'react';

/**
 * Subtle matrix rain — brown AI terms + binary falling vertically.
 * Characters change as they fall, like the real Matrix effect.
 * Rendered on a <canvas> for performance, positioned fixed on the right edge.
 */

const CHARS = '01アイセーフティモデルリスク安全';
const WORDS = ['align', 'safe', 'model', 'risk', 'bias', 'data', 'agent', 'trust', 'loss', 'eval', 'norm', 'goal', 'scale', 'value'];

export default function MatrixRain() {
    const canvasRef = useRef(null);
    const animRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const COL_WIDTH = 18;
        const FONT_SIZE = 11;
        const SPEED = 0.4; // pixels per frame
        const WIDTH = 180;

        let height = window.innerHeight;
        canvas.width = WIDTH;
        canvas.height = height;

        // Create columns
        const numCols = Math.floor(WIDTH / COL_WIDTH);
        const columns = [];
        for (let i = 0; i < numCols; i++) {
            columns.push({
                x: i * COL_WIDTH + 4,
                y: -Math.random() * height * 2, // stagger start
                speed: SPEED + Math.random() * 0.3,
                chars: [], // array of {char, age}
            });
            // Pre-fill with random chars
            const count = Math.floor(height / FONT_SIZE) + 10;
            for (let j = 0; j < count; j++) {
                const useWord = Math.random() < 0.15;
                columns[i].chars.push({
                    char: useWord ? WORDS[Math.floor(Math.random() * WORDS.length)] : CHARS[Math.floor(Math.random() * CHARS.length)],
                    mutateTimer: Math.random() * 200,
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, WIDTH, height);
            ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;

            for (const col of columns) {
                col.y += col.speed;

                // Reset when scrolled past bottom
                if (col.y > height + 200) {
                    col.y = -Math.random() * height;
                }

                for (let j = 0; j < col.chars.length; j++) {
                    const charY = col.y + j * FONT_SIZE;
                    if (charY < -20 || charY > height + 20) continue;

                    // Mutate chars occasionally
                    col.chars[j].mutateTimer -= 1;
                    if (col.chars[j].mutateTimer <= 0) {
                        const useWord = Math.random() < 0.1;
                        col.chars[j].char = useWord
                            ? WORDS[Math.floor(Math.random() * WORDS.length)]
                            : CHARS[Math.floor(Math.random() * CHARS.length)];
                        col.chars[j].mutateTimer = 100 + Math.random() * 300;
                    }

                    // Fade based on vertical position — stronger in middle
                    const distFromCenter = Math.abs(charY - height / 2) / (height / 2);
                    const alpha = 0.18 * (1 - distFromCenter * 0.6);

                    ctx.fillStyle = `rgba(44, 36, 32, ${Math.max(0, alpha)})`;
                    ctx.fillText(col.chars[j].char, col.x, charY);
                }
            }

            animRef.current = requestAnimationFrame(draw);
        }

        animRef.current = requestAnimationFrame(draw);

        const handleResize = () => {
            height = window.innerHeight;
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
                right: 0,
                width: '180px',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
}
