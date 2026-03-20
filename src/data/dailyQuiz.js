// Daily quiz content — placeholder for AI safety topics
const DAILY_QUIZ_DAYS = [
    { dateLabel: 'AI Foundations', cards: [{ id: 'c101' }, { id: 'c102' }, { id: 'c103' }] },
    { dateLabel: 'AI Applications', cards: [{ id: 'c104' }, { id: 'c105' }, { id: 'c106' }] },
    { dateLabel: 'Frontier AI', cards: [{ id: 'c201' }, { id: 'c202' }, { id: 'c203' }] },
    { dateLabel: 'Measuring AI', cards: [{ id: 'c204' }, { id: 'c205' }, { id: 'c206' }] },
    { dateLabel: 'Learning Paradigms', cards: [{ id: 'c302' }, { id: 'c303' }, { id: 'c304' }] },
    { dateLabel: 'Modern AI Stack', cards: [{ id: 'c301' }, { id: 'c305' }, { id: 'c306' }] },
    { dateLabel: 'Alignment Basics', cards: [{ id: 'c401' }, { id: 'c403' }, { id: 'c406' }] },
    { dateLabel: 'AI Control', cards: [{ id: 'c402' }, { id: 'c404' }, { id: 'c405' }] },
    { dateLabel: 'AI Risk Landscape', cards: [{ id: 'c501' }, { id: 'c504' }, { id: 'c506' }] },
    { dateLabel: 'Dangerous Failures', cards: [{ id: 'c502' }, { id: 'c503' }, { id: 'c505' }] },
    { dateLabel: 'Safety Toolbox', cards: [{ id: 'c601' }, { id: 'c602' }, { id: 'c604' }] },
    { dateLabel: 'Oversight & Governance', cards: [{ id: 'c603' }, { id: 'c605' }, { id: 'c606' }] },
    { dateLabel: 'Ethics & Fairness', cards: [{ id: 'c701' }, { id: 'c702' }, { id: 'c703' }] },
    { dateLabel: 'Trust & Accountability', cards: [{ id: 'c704' }, { id: 'c705' }, { id: 'c706' }] },
    { dateLabel: 'AI Regulation', cards: [{ id: 'c801' }, { id: 'c802' }, { id: 'c806' }] },
    { dateLabel: 'Global AI Safety', cards: [{ id: 'c803' }, { id: 'c804' }, { id: 'c805' }] },
    { dateLabel: 'Intelligence Spectrum', cards: [{ id: 'c207' }, { id: 'c209' }, { id: 'c208' }] },
    { dateLabel: 'AI at the Frontier', cards: [{ id: 'c210' }, { id: 'c211' }, { id: 'c212' }] },
    { dateLabel: 'When AI Breaks', cards: [{ id: 'c901' }, { id: 'c902' }, { id: 'c906' }] },
    { dateLabel: 'Attacking AI', cards: [{ id: 'c903' }, { id: 'c904' }, { id: 'c905' }] },
];

export const DAILY_QUIZ_EVENTS = [];

export function getTodaysDailyQuiz() {
    if (DAILY_QUIZ_DAYS.length === 0) {
        return { dateLabel: 'Coming Soon', dayIndex: 0, cardIds: [] };
    }
    const start = new Date(2026, 2, 2);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const dayIndex = ((diffDays % DAILY_QUIZ_DAYS.length) + DAILY_QUIZ_DAYS.length) % DAILY_QUIZ_DAYS.length;
    const day = DAILY_QUIZ_DAYS[dayIndex];
    return {
        dateLabel: day.dateLabel,
        dayIndex,
        cardIds: day.cards.map(c => c.id),
    };
}

export const DAILY_QUIZ_XP_PER_CORRECT = 20;
