import { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Brain, ChevronRight, ChevronLeft, Sparkles, BookOpen, Target, X } from 'lucide-react';
import * as feedback from '../../services/feedback';

const SCREENS = [
    {
        id: 'welcome',
        title: 'Welcome to ML4G!',
        subtitle: 'Machine Learning for Good',
        body: `You're about to start a journey through the world of AI safety — one of the most important challenges of our time.\n\nThis app is your companion for the ML4G course. It's designed to help you build a deep, lasting understanding of AI safety concepts through interactive lessons and spaced repetition.`,
        icon: 'brain',
    },
    {
        id: 'how-it-works',
        title: 'How It Works',
        subtitle: 'Learn, practice, remember',
        body: `Each lesson introduces key concepts with short explanations, then quizzes you right away to lock them in.\n\nThe app tracks what you know and what needs review. Over time, it brings back concepts at just the right moment — so you actually remember what you learn, not just cram and forget.`,
        icon: 'book',
    },
    {
        id: 'ready',
        title: 'You\'re All Set',
        subtitle: 'Let\'s get started',
        body: `The lessons follow the ML4G curriculum, so everything you learn here connects directly to the course.\n\nTake your time, revisit what's tricky, and enjoy the process. AI safety needs more people who understand it well — and that's exactly what you're building here.`,
        icon: 'target',
    },
];

const ICON_MAP = {
    brain: Brain,
    book: BookOpen,
    target: Target,
};

export default function CourseIntroFlow({ lesson, onComplete, onExit }) {
    const { dispatch } = useApp();
    const [screenIndex, setScreenIndex] = useState(0);
    const [exiting, setExiting] = useState(false);
    const [direction, setDirection] = useState('forward');
    const containerRef = useRef(null);

    const screen = SCREENS[screenIndex];
    const isLast = screenIndex === SCREENS.length - 1;
    const isFirst = screenIndex === 0;
    const IconComp = ICON_MAP[screen.icon] || Brain;

    function handleNext() {
        feedback.lightTap?.();
        if (isLast) {
            // Mark as completed without XP or streak
            dispatch({ type: 'COMPLETE_LESSON', payload: { lessonId: lesson.id } });
            setExiting(true);
            setTimeout(() => onComplete(), 200);
            return;
        }
        setDirection('forward');
        setScreenIndex(i => i + 1);
    }

    function handleBack() {
        if (isFirst) return;
        feedback.lightTap?.();
        setDirection('backward');
        setScreenIndex(i => i - 1);
    }

    function handleExit() {
        feedback.lightTap?.();
        if (onExit) onExit();
        else onComplete();
    }

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex flex-col"
            style={{
                background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
                opacity: exiting ? 0 : 1,
                transition: 'opacity 0.2s ease',
            }}
        >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 pt-5 pb-2">
                <button
                    onClick={handleExit}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                    <X size={16} color="rgba(255,255,255,0.6)" />
                </button>
                {/* Progress dots */}
                <div className="flex gap-2">
                    {SCREENS.map((_, i) => (
                        <div
                            key={i}
                            className="rounded-full transition-all duration-300"
                            style={{
                                width: i === screenIndex ? '24px' : '8px',
                                height: '8px',
                                backgroundColor: i === screenIndex
                                    ? '#60a5fa'
                                    : i < screenIndex
                                        ? 'rgba(96,165,250,0.5)'
                                        : 'rgba(255,255,255,0.2)',
                            }}
                        />
                    ))}
                </div>
                <div className="w-8" />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 overflow-hidden">
                <div
                    key={screenIndex}
                    className="flex flex-col items-center text-center max-w-md animate-fade-in"
                    style={{
                        animation: `slideIn${direction === 'forward' ? 'Right' : 'Left'} 0.3s ease-out`,
                    }}
                >
                    {/* Icon */}
                    <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
                        style={{
                            background: 'linear-gradient(135deg, rgba(96,165,250,0.2) 0%, rgba(45,212,191,0.2) 100%)',
                            border: '1px solid rgba(96,165,250,0.3)',
                            boxShadow: '0 0 40px rgba(96,165,250,0.15)',
                        }}
                    >
                        <IconComp size={36} color="#60a5fa" strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <h1
                        className="text-2xl font-bold mb-2"
                        style={{
                            fontFamily: 'var(--font-display)',
                            color: '#f1f5f9',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {screen.title}
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="text-sm mb-8"
                        style={{ color: 'rgba(148,163,184,0.9)', fontWeight: 500 }}
                    >
                        {screen.subtitle}
                    </p>

                    {/* Body text */}
                    <div
                        className="text-sm leading-relaxed"
                        style={{
                            color: 'rgba(203,213,225,0.85)',
                            maxWidth: '380px',
                            lineHeight: '1.7',
                        }}
                    >
                        {screen.body.split('\n\n').map((paragraph, i) => (
                            <p key={i} className={i > 0 ? 'mt-4' : ''}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom navigation */}
            <div className="px-6 pb-8 pt-4">
                <div className="flex gap-3 max-w-md mx-auto">
                    {!isFirst && (
                        <button
                            onClick={handleBack}
                            className="flex items-center justify-center gap-1 px-5 py-3.5 rounded-xl text-sm font-medium transition-all active:scale-[0.97]"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.08)',
                                color: 'rgba(255,255,255,0.7)',
                                border: '1px solid rgba(255,255,255,0.1)',
                            }}
                        >
                            <ChevronLeft size={16} />
                            Back
                        </button>
                    )}
                    <button
                        onClick={handleNext}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.97]"
                        style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            color: '#fff',
                            boxShadow: '0 4px 15px rgba(59,130,246,0.3)',
                        }}
                    >
                        {isLast ? (
                            <>
                                Start Learning
                                <Sparkles size={16} />
                            </>
                        ) : (
                            <>
                                Continue
                                <ChevronRight size={16} />
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Inline keyframes */}
            <style>{`
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}
