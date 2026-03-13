// Daily quiz content — placeholder for AI safety topics
const DAILY_QUIZ_DAYS = [];

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
