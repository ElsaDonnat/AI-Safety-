import { useState, useRef, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getTodaysDailyQuiz, DAILY_QUIZ_XP_PER_CORRECT } from '../data/dailyQuiz';
import { getConceptsByIds } from '../data/concepts';
import { ALL_CONCEPTS } from '../data/concepts';
import { Card, Button, ProgressBar, StarButton } from './shared';
import Mascot from './Mascot';
import { shareText, buildDailyQuizShareText } from '../services/share';
import * as feedback from '../services/feedback';
import StreakCelebration from './StreakCelebration';
import { ChevronLeft, Calendar, Check, X as XIcon, Share2 } from 'lucide-react';

const PHASES = { INTRO: 'intro', QUIZ: 'quiz', RESULTS: 'results' };

function generateWrongTitles(correctId, count = 3) {
    const others = ALL_CONCEPTS.filter(c => c.id !== correctId);
    const shuffled = [...others].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(c => c.title);
}

function shuffleOptions(correct, wrongs) {
    const options = [
        { title: correct, isCorrect: true },
        ...wrongs.map(t => ({ title: t, isCorrect: false })),
    ];
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
}

export default function DailyQuizFlow({ onComplete }) {
    const { state, dispatch } = useApp();
    const dailyData = getTodaysDailyQuiz();
    const events = useMemo(() => getConceptsByIds(dailyData.cardIds || []), [dailyData]);

    const [phase, setPhase] = useState(PHASES.INTRO);
    const [quizIndex, setQuizIndex] = useState(0);
    const [results, setResults] = useState([]); // ['correct' | 'wrong']
    const [selectedOption, setSelectedOption] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [shareToast, setShareToast] = useState(false);
    const [streakCelebration, setStreakCelebration] = useState(null);
    const sessionStartTime = useRef(null);

    // Shuffle options once per question
    const shuffledOptions = useMemo(() => {
        return events.map(event => shuffleOptions(event.title, event.wrongTitles || generateWrongTitles(event.id)));
    }, [events]);

    useEffect(() => {
        sessionStartTime.current = Date.now();
        dispatch({ type: 'START_DAILY_QUIZ' });
    }, [dispatch]);

    useEffect(() => {
        if (shareToast) {
            const t = setTimeout(() => setShareToast(false), 2000);
            return () => clearTimeout(t);
        }
    }, [shareToast]);

    const totalCards = events.length;

    // ─── INTRO ───
    if (phase === PHASES.INTRO) {
        return (
            <div className="daily-quiz-container animate-fade-in">
                <div className="flex-shrink-0 pt-3">
                    <button onClick={onComplete} className="flex items-center gap-1 text-sm"
                        style={{ color: 'var(--color-ink-muted)' }}>
                        <ChevronLeft size={16} strokeWidth={2} />
                        Back
                    </button>
                </div>
                <div className="flex-1 min-h-0 flex flex-col justify-center">
                    <div className="py-4 text-center">
                        <div className="daily-quiz-date-badge">
                            <Calendar size={16} strokeWidth={2} />
                            {dailyData.dateLabel}
                        </div>

                        <h2 className="text-2xl font-bold mt-3 mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                            Daily AI Safety Quiz
                        </h2>
                        <p className="text-sm mb-2" style={{ color: 'var(--color-ink-muted)' }}>
                            Can you identify these concepts?
                        </p>

                        <div className="daily-quiz-bonus-pill">
                            {'2× XP BONUS'}
                        </div>

                        <div className="mt-4 space-y-3 px-4">
                            {events.map((event, i) => (
                                <div key={i} className="daily-quiz-year-card animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                                    <span className="daily-quiz-year">{event.summary || '???'}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0 pt-4 pb-2">
                    <Button className="w-full daily-quiz-btn" onClick={() => setPhase(PHASES.QUIZ)}>
                        Start Quiz
                    </Button>
                </div>
            </div>
        );
    }

    // ─── QUIZ PHASE ───
    if (phase === PHASES.QUIZ) {
        const event = events[quizIndex];
        const options = shuffledOptions[quizIndex];

        const handleAnswer = (optIndex) => {
            if (answered) return;
            feedback.select();
            setSelectedOption(optIndex);
            setAnswered(true);
            const isCorrect = options[optIndex].isCorrect;
            setResults(prev => [...prev, isCorrect ? 'correct' : 'wrong']);
            // Update 'what' mastery — consistent with lesson learn quiz behavior
            dispatch({
                type: 'UPDATE_CARD_MASTERY',
                cardId: event.id,
                questionType: 'what',
                score: isCorrect ? 'green' : 'red',
            });
            // Show the card reveal after a short delay
            setTimeout(() => setShowCard(true), 400);
        };

        const handleNext = () => {
            setSelectedOption(null);
            setAnswered(false);
            setShowCard(false);
            if (quizIndex + 1 < totalCards) {
                setQuizIndex(i => i + 1);
            } else {
                // Detect streak earning before dispatching XP
                const today = new Date().toISOString().split('T')[0];
                const wasActiveToday = state.lastActiveDate === today;
                let prevStreakStatus = 'inactive';
                if (!wasActiveToday && state.lastActiveDate && state.currentStreak > 0) {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    if (state.lastActiveDate === yesterday.toISOString().split('T')[0]) {
                        prevStreakStatus = 'at-risk';
                    }
                }
                // Quiz done — calculate XP and dispatch
                const xpEarned = results.filter(r => r === 'correct').length * DAILY_QUIZ_XP_PER_CORRECT;
                const cardIds = events.map(e => e.id);
                dispatch({ type: 'MARK_CARDS_SEEN', cardIds });
                dispatch({ type: 'COMPLETE_DAILY_QUIZ', xpEarned, cardIds });
                if (xpEarned > 0) {
                    dispatch({ type: 'ADD_XP', amount: xpEarned });
                }
                const duration = sessionStartTime.current ? Math.round((Date.now() - sessionStartTime.current) / 1000) : 0;
                dispatch({ type: 'RECORD_STUDY_SESSION', duration, sessionType: 'daily_quiz', questionsAnswered: results.length });
                // Show streak celebration if this is the first activity today
                if (!wasActiveToday) {
                    const newStreak = prevStreakStatus === 'at-risk' ? state.currentStreak + 1 : 1;
                    setTimeout(() => setStreakCelebration({ previousStatus: prevStreakStatus, newStreak }), 600);
                }
                setPhase(PHASES.RESULTS);
            }
        };

        return (
            <div className="daily-quiz-container animate-fade-in" key={`quiz-${quizIndex}`}>
                <div className="flex-shrink-0 pt-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full daily-quiz-phase-tag">
                            Quiz
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="daily-quiz-bonus-pill-sm">{'2× XP'}</span>
                            <span className="text-sm font-medium" style={{ color: 'var(--color-ink-muted)' }}>
                                {quizIndex + 1} / {totalCards}
                            </span>
                        </div>
                    </div>
                    <ProgressBar value={quizIndex + 1} max={totalCards} color="#B8860B" />
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto">
                    <div className="mt-5 animate-slide-in-right" key={quizIndex}>
                        {/* Concept hint */}
                        <div className="text-center mb-5">
                            <p className="text-sm mt-2 font-medium" style={{ color: 'var(--color-ink-muted)' }}>
                                Which concept matches this description?
                            </p>
                            <p className="text-base mt-2 font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                                {event.quizDescription || event.summary}
                            </p>
                        </div>

                        {/* Options */}
                        <div className="space-y-2.5">
                            {options.map((opt, i) => {
                                let optClass = 'daily-quiz-option';
                                if (answered) {
                                    if (opt.isCorrect) optClass += ' daily-quiz-option--correct';
                                    else if (selectedOption === i) optClass += ' daily-quiz-option--wrong';
                                    else optClass += ' daily-quiz-option--dimmed';
                                }

                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(i)}
                                        disabled={answered}
                                        className={optClass}
                                    >
                                        <span>{opt.title}</span>
                                        {answered && opt.isCorrect && (
                                            <Check size={16} color="var(--color-success)" strokeWidth={2.5} />
                                        )}
                                        {answered && selectedOption === i && !opt.isCorrect && (
                                            <XIcon size={16} color="var(--color-error)" strokeWidth={2.5} />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* XP feedback */}
                        {answered && !showCard && (
                            <div className="mt-4 pt-3 text-sm text-center animate-fade-in">
                                {options[selectedOption]?.isCorrect ? (
                                    <p className="font-semibold" style={{ color: 'var(--color-success)' }}>
                                        {'✓'} Correct! +{DAILY_QUIZ_XP_PER_CORRECT} XP
                                    </p>
                                ) : (
                                    <p className="font-semibold" style={{ color: 'var(--color-error)' }}>
                                        {'✗'} Not quite!
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Card reveal — the learning moment */}
                        {showCard && (
                            <Card className="mt-4 daily-quiz-card-reveal daily-quiz-learn-card">
                                <h3 className="text-base font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                                    {event.title}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
                                    {event.description}
                                </p>
                            </Card>
                        )}
                    </div>
                </div>

                {showCard && (
                    <div className="flex-shrink-0 mt-auto pt-4 pb-2">
                        <Button className="w-full daily-quiz-btn" onClick={handleNext}>
                            {quizIndex + 1 < totalCards ? 'Continue →' : 'See Results'}
                        </Button>
                    </div>
                )}
            </div>
        );
    }

    // ─── RESULTS PHASE ───
    if (phase === PHASES.RESULTS) {
        const correctCount = results.filter(r => r === 'correct').length;
        const xpEarned = correctCount * DAILY_QUIZ_XP_PER_CORRECT;

        return (
            <div className="daily-quiz-container animate-fade-in">
                <div className="flex-1 min-h-0 overflow-y-auto">
                    <div className="py-6 text-center">
                        <Mascot mood={correctCount === totalCards ? 'celebrating' : correctCount > 0 ? 'happy' : 'thinking'} size={70} />

                        <h2 className="text-2xl font-bold mt-4 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                            {correctCount === totalCards ? 'Perfect!' : correctCount > 0 ? 'Nice work!' : 'Better luck tomorrow!'}
                        </h2>

                        <p className="text-sm mb-2" style={{ color: 'var(--color-ink-muted)' }}>
                            {dailyData.dateLabel} {'·'} {correctCount}/{totalCards} correct
                        </p>

                        {xpEarned > 0 && (
                            <div className="daily-quiz-xp-result animate-pop-in">
                                <span className="daily-quiz-bonus-pill mr-2">{'2× BONUS'}</span>
                                <span className="text-xl font-bold" style={{ color: '#B8860B' }}>+{xpEarned} XP</span>
                            </div>
                        )}

                        {/* Acquired cards */}
                        <div className="mt-6 text-left">
                            <h3 className="text-xs uppercase tracking-wider font-semibold mb-3 px-1" style={{ color: '#B8860B' }}>
                                {totalCards} Bonus Cards Acquired
                            </h3>
                            <div className="space-y-2">
                                {events.map((event, i) => (
                                    <Card key={event.id} className="daily-quiz-learn-card animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                                        <div className="flex items-start gap-2">
                                            <div
                                                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                                                style={{
                                                    backgroundColor: results[i] === 'correct' ? 'rgba(5,150,105,0.1)' : 'rgba(166,61,61,0.1)',
                                                    color: results[i] === 'correct' ? 'var(--color-success)' : 'var(--color-error)',
                                                }}
                                            >
                                                {results[i] === 'correct' ? '✓' : '✗'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{event.title}</p>
                                                <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
                                                    {event.summary}
                                                </p>
                                            </div>
                                            <StarButton
                                                isStarred={(state.starredCards || []).includes(event.id)}
                                                onClick={() => dispatch({ type: 'TOGGLE_STAR', cardId: event.id })}
                                                size={16}
                                            />
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <p className="text-xs mt-5 px-2" style={{ color: 'var(--color-ink-muted)' }}>
                            These cards are now in your collection. Practice them in the Practice tab!
                        </p>
                    </div>
                </div>

                <div className="flex-shrink-0 pt-4 pb-2 space-y-2">
                    <Button className="w-full daily-quiz-btn" onClick={onComplete}>
                        Done
                    </Button>
                    <button
                        onClick={async () => {
                            const text = buildDailyQuizShareText({ correctCount, totalCards, xpEarned, dateLabel: dailyData.dateLabel });
                            const result = await shareText({ title: 'AI Safety', text });
                            if (result === 'copied') setShareToast(true);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[3px] text-sm font-medium transition-colors cursor-pointer"
                        style={{ color: '#8B6914', backgroundColor: 'rgba(184, 134, 11, 0.1)' }}
                    >
                        <Share2 size={16} strokeWidth={2} />
                        Share Result
                    </button>
                    {shareToast && (
                        <p className="text-xs text-center animate-fade-in" style={{ color: 'var(--color-success)' }}>
                            Copied to clipboard!
                        </p>
                    )}
                </div>

                {/* Streak Celebration */}
                {streakCelebration && (
                    <StreakCelebration
                        previousStatus={streakCelebration.previousStatus}
                        newStreak={streakCelebration.newStreak}
                        onDismiss={() => setStreakCelebration(null)}
                    />
                )}
            </div>
        );
    }

    return null;
}
