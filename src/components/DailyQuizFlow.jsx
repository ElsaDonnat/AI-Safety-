import { useState, useRef, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getTodaysDailyQuiz, DAILY_QUIZ_XP_PER_CORRECT } from '../data/dailyQuiz';
import { Card, Button, ProgressBar } from './shared';
import Mascot from './Mascot';
import { shareText, buildDailyQuizShareText } from '../services/share';
import * as feedback from '../services/feedback';
import StreakCelebration from './StreakCelebration';
import { ChevronLeft, Calendar, Check, X as XIcon, Share2, ChevronDown, ChevronUp } from 'lucide-react';

const PHASES = { INTRO: 'intro', QUIZ: 'quiz', RESULTS: 'results' };

function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export default function DailyQuizFlow({ onComplete }) {
    const { state, dispatch } = useApp();
    const dailyData = useMemo(() => getTodaysDailyQuiz(), []);
    const questions = useMemo(() => dailyData.questions || [], [dailyData]);

    const [phase, setPhase] = useState(PHASES.INTRO);
    const [quizIndex, setQuizIndex] = useState(0);
    const [results, setResults] = useState([]); // ['correct' | 'wrong']
    const [selectedOption, setSelectedOption] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [shareToast, setShareToast] = useState(false);
    const [streakCelebration, setStreakCelebration] = useState(null);
    const [expandedResult, setExpandedResult] = useState(null);
    const sessionStartTime = useRef(null);

    // Shuffle options once per question
    const shuffledOptions = useMemo(() => {
        return questions.map(q => {
            const opts = q.options.map(o => ({ label: o, isCorrect: o === q.answer }));
            return shuffleArray(opts);
        });
    }, [questions]);

    useEffect(() => {
        sessionStartTime.current = Date.now();
    }, []);

    useEffect(() => {
        if (shareToast) {
            const t = setTimeout(() => setShareToast(false), 2000);
            return () => clearTimeout(t);
        }
    }, [shareToast]);

    const totalQuestions = questions.length;

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
                            Daily Quiz
                        </div>

                        <h2 className="text-2xl font-bold mt-3 mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                            AI Safety Dates
                        </h2>
                        <p className="text-sm mb-2" style={{ color: 'var(--color-ink-muted)' }}>
                            When did these events happen?
                        </p>

                        <div className="daily-quiz-bonus-pill">
                            {'2\u00d7 XP BONUS'}
                        </div>

                        <div className="mt-4 space-y-3 px-4">
                            {questions.map((q, i) => (
                                <div key={i} className="daily-quiz-year-card animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                                    <span className="daily-quiz-year" style={{ fontSize: '13px', fontWeight: 400 }}>{q.event.length > 80 ? q.event.slice(0, 77) + '...' : q.event}</span>
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
        const question = questions[quizIndex];
        const options = shuffledOptions[quizIndex];

        const handleAnswer = (optIndex) => {
            if (answered) return;
            feedback.select();
            setSelectedOption(optIndex);
            setAnswered(true);
            const isCorrect = options[optIndex].isCorrect;
            setResults(prev => [...prev, isCorrect ? 'correct' : 'wrong']);
            setTimeout(() => setShowDetail(true), 400);
        };

        const handleNext = () => {
            setSelectedOption(null);
            setAnswered(false);
            setShowDetail(false);
            if (quizIndex + 1 < totalQuestions) {
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
                // Calculate results
                const finalResults = [...results, options[selectedOption]?.isCorrect ? 'correct' : 'wrong'].slice(0, totalQuestions);
                // Use results accumulated so far (already includes this answer)
                const correctCount = results.filter(r => r === 'correct').length;
                const xpEarned = correctCount * DAILY_QUIZ_XP_PER_CORRECT;

                // Store results for later review
                const lastResults = {
                    questions: questions.map((q, i) => ({
                        event: q.event,
                        answer: q.answer,
                        detail: q.detail,
                        result: finalResults[i] || results[i],
                    })),
                    results: finalResults.length ? finalResults : results,
                    xpEarned,
                };

                dispatch({ type: 'COMPLETE_DAILY_QUIZ', xpEarned, cardIds: [], lastResults });
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
                            <span className="daily-quiz-bonus-pill-sm">{'2\u00d7 XP'}</span>
                            <span className="text-sm font-medium" style={{ color: 'var(--color-ink-muted)' }}>
                                {quizIndex + 1} / {totalQuestions}
                            </span>
                        </div>
                    </div>
                    <ProgressBar value={quizIndex + 1} max={totalQuestions} color="#B8860B" />
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto">
                    <div className="mt-5 animate-slide-in-right" key={quizIndex}>
                        {/* Question */}
                        <div className="text-center mb-5">
                            <p className="text-sm mt-2 font-medium" style={{ color: 'var(--color-ink-muted)' }}>
                                When did this happen?
                            </p>
                            <p className="text-base mt-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)', fontWeight: 400, lineHeight: 1.5 }}>
                                {question.event}
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
                                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>{opt.label}</span>
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

                        {/* Feedback + Detail */}
                        {answered && !showDetail && (
                            <div className="mt-4 pt-3 text-sm text-center animate-fade-in">
                                {options[selectedOption]?.isCorrect ? (
                                    <p className="font-semibold" style={{ color: 'var(--color-success)' }}>
                                        {'\u2713'} Correct! +{DAILY_QUIZ_XP_PER_CORRECT} XP
                                    </p>
                                ) : (
                                    <p className="font-semibold" style={{ color: 'var(--color-error)' }}>
                                        {'\u2717'} Not quite — it was {question.answer}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Detail card after answering */}
                        {showDetail && (
                            <Card className="mt-4 daily-quiz-card-reveal daily-quiz-learn-card">
                                <div className="flex items-start gap-2 mb-2">
                                    <div
                                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                                        style={{
                                            backgroundColor: options[selectedOption]?.isCorrect ? 'rgba(5,150,105,0.1)' : 'rgba(166,61,61,0.1)',
                                            color: options[selectedOption]?.isCorrect ? 'var(--color-success)' : 'var(--color-error)',
                                        }}
                                    >
                                        {options[selectedOption]?.isCorrect ? '\u2713' : '\u2717'}
                                    </div>
                                    <p className="text-sm font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
                                        {question.answer}
                                    </p>
                                </div>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
                                    {question.detail}
                                </p>
                            </Card>
                        )}
                    </div>
                </div>

                {showDetail && (
                    <div className="flex-shrink-0 mt-auto pt-4 pb-2">
                        <Button className="w-full daily-quiz-btn" onClick={handleNext}>
                            {quizIndex + 1 < totalQuestions ? 'Continue \u2192' : 'See Results'}
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
                        <Mascot mood={correctCount === totalQuestions ? 'celebrating' : correctCount > 0 ? 'happy' : 'thinking'} size={70} />

                        <h2 className="text-2xl font-bold mt-4 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                            {correctCount === totalQuestions ? 'Perfect!' : correctCount > 0 ? 'Nice work!' : 'Better luck tomorrow!'}
                        </h2>

                        <p className="text-sm mb-2" style={{ color: 'var(--color-ink-muted)' }}>
                            {correctCount}/{totalQuestions} correct
                        </p>

                        {xpEarned > 0 && (
                            <div className="daily-quiz-xp-result animate-pop-in">
                                <span className="daily-quiz-bonus-pill mr-2">{'2\u00d7 BONUS'}</span>
                                <span className="text-xl font-bold" style={{ color: '#B8860B' }}>+{xpEarned} XP</span>
                            </div>
                        )}

                        {/* Results list with expandable details */}
                        <div className="mt-6 text-left">
                            <h3 className="text-xs uppercase tracking-wider font-semibold mb-3 px-1" style={{ color: '#B8860B' }}>
                                Today's Events
                            </h3>
                            <div className="space-y-2">
                                {questions.map((q, i) => (
                                    <Card
                                        key={i}
                                        className="daily-quiz-learn-card animate-fade-in-up cursor-pointer"
                                        style={{ animationDelay: `${i * 100}ms` }}
                                        onClick={() => setExpandedResult(expandedResult === i ? null : i)}
                                    >
                                        <div className="flex items-start gap-2">
                                            <div
                                                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                                                style={{
                                                    backgroundColor: results[i] === 'correct' ? 'rgba(5,150,105,0.1)' : 'rgba(166,61,61,0.1)',
                                                    color: results[i] === 'correct' ? 'var(--color-success)' : 'var(--color-error)',
                                                }}
                                            >
                                                {results[i] === 'correct' ? '\u2713' : '\u2717'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}>
                                                    {q.answer}
                                                </p>
                                                <p className="text-sm mt-0.5" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
                                                    {q.event}
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0 mt-1">
                                                {expandedResult === i
                                                    ? <ChevronUp size={14} color="var(--color-ink-muted)" />
                                                    : <ChevronDown size={14} color="var(--color-ink-muted)" />
                                                }
                                            </div>
                                        </div>
                                        {expandedResult === i && (
                                            <div className="mt-2 pt-2 animate-fade-in" style={{ borderTop: '1px solid rgba(var(--color-ink-rgb), 0.06)' }}>
                                                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                                                    {q.detail}
                                                </p>
                                            </div>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0 pt-4 pb-2 space-y-2">
                    <Button className="w-full daily-quiz-btn" onClick={onComplete}>
                        Done
                    </Button>
                    <button
                        onClick={async () => {
                            const text = buildDailyQuizShareText({ correctCount, totalCards: totalQuestions, xpEarned, dateLabel: dailyData.dateLabel });
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

/**
 * Compact review component shown on LearnPage after quiz is completed.
 * Shows the 3 events with dates, expandable to show detail notes.
 */
export function DailyQuizCompletedReview() {
    const { state } = useApp();
    const [expanded, setExpanded] = useState(false);
    const [expandedItem, setExpandedItem] = useState(null);

    const lastResults = state.dailyQuiz?.lastResults;
    const todayStr = new Date().toISOString().split('T')[0];
    const isCompletedToday = state.dailyQuiz?.lastCompletedDate === todayStr;

    if (!isCompletedToday || !lastResults) return null;

    const correctCount = lastResults.results?.filter(r => r === 'correct').length || 0;
    const total = lastResults.questions?.length || 0;

    if (!expanded) {
        return (
            <Card
                className="mb-4 cursor-pointer daily-quiz-completed-card"
                onClick={() => setExpanded(true)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[3px] flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(5, 150, 105, 0.08)' }}>
                        <Check size={20} color="var(--color-success)" strokeWidth={1.8} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>
                            Daily Quiz Complete
                        </p>
                        <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                            {correctCount}/{total} correct {lastResults.xpEarned > 0 ? `\u00b7 +${lastResults.xpEarned} XP` : ''} — tap to review
                        </p>
                    </div>
                    <ChevronDown size={16} color="var(--color-ink-faint)" strokeWidth={2} />
                </div>
            </Card>
        );
    }

    return (
        <Card className="mb-4 daily-quiz-completed-card">
            <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => { setExpanded(false); setExpandedItem(null); }}
            >
                <div className="w-10 h-10 rounded-[3px] flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(5, 150, 105, 0.08)' }}>
                    <Check size={20} color="var(--color-success)" strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>
                        Daily Quiz Complete
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                        {correctCount}/{total} correct {lastResults.xpEarned > 0 ? `\u00b7 +${lastResults.xpEarned} XP` : ''}
                    </p>
                </div>
                <ChevronUp size={16} color="var(--color-ink-faint)" strokeWidth={2} />
            </div>

            <div className="mt-3 space-y-2">
                {lastResults.questions.map((q, i) => (
                    <div
                        key={i}
                        className="rounded-[6px] px-3 py-2.5 cursor-pointer transition-colors"
                        style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.03)' }}
                        onClick={(e) => { e.stopPropagation(); setExpandedItem(expandedItem === i ? null : i); }}
                    >
                        <div className="flex items-start gap-2">
                            <div
                                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5"
                                style={{
                                    backgroundColor: q.result === 'correct' ? 'rgba(5,150,105,0.1)' : 'rgba(166,61,61,0.1)',
                                    color: q.result === 'correct' ? 'var(--color-success)' : 'var(--color-error)',
                                }}
                            >
                                {q.result === 'correct' ? '\u2713' : '\u2717'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-semibold" style={{ color: 'var(--color-accent)' }}>
                                    {q.answer}
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink)', fontWeight: 400, lineHeight: 1.4 }}>
                                    {q.event}
                                </p>
                            </div>
                            <div className="flex-shrink-0 mt-1">
                                {expandedItem === i
                                    ? <ChevronUp size={12} color="var(--color-ink-muted)" />
                                    : <ChevronDown size={12} color="var(--color-ink-muted)" />
                                }
                            </div>
                        </div>
                        {expandedItem === i && (
                            <div className="mt-2 pt-2 animate-fade-in" style={{ borderTop: '1px solid rgba(var(--color-ink-rgb), 0.06)' }}>
                                <p className="text-[11px] leading-relaxed pl-6" style={{ color: 'var(--color-ink-muted)' }}>
                                    {q.detail}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
}
