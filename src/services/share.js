/**
 * Text sharing via Web Share API with clipboard fallback.
 */

const STORE_URL = 'https://play.google.com/store/apps/details?id=com.elsadonnat.aisafety';

/**
 * Share text content. Uses Web Share API on Android/mobile,
 * falls back to clipboard copy on desktop.
 * @returns {Promise<'shared'|'copied'|'dismissed'>}
 */
export async function shareText({ title, text }) {
    if (navigator.share) {
        try {
            await navigator.share({ title, text });
            return 'shared';
        } catch (e) {
            if (e.name === 'AbortError') return 'dismissed';
        }
    }

    try {
        await navigator.clipboard.writeText(text);
        return 'copied';
    } catch {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        return 'copied';
    }
}

export function buildLessonShareText({ lessonTitle, greenCount, totalQuestions, xp, streak }) {
    const lines = [`I just completed '${lessonTitle}' on AI Safety!`];
    let stats = `${greenCount}/${totalQuestions} exact \u00B7 +${xp} XP`;
    if (streak > 1) stats += ` \u00B7 ${streak}-day streak \uD83D\uDD25`;
    lines.push(stats);
    lines.push('', `Learn AI safety \u2014 ${STORE_URL}`);
    return lines.join('\n');
}

export function buildPracticeShareText({ sessionMode, greenCount, totalQuestions, perfectSession }) {
    const lines = [];
    if (perfectSession) {
        lines.push('Perfect practice session on AI Safety! \u2728');
    } else {
        lines.push('Practice session complete on AI Safety!');
    }
    lines.push(`${sessionMode} \u00B7 ${greenCount}/${totalQuestions} exact`);
    lines.push('', `Learn AI safety \u2014 ${STORE_URL}`);
    return lines.join('\n');
}

export function buildDailyQuizShareText({ correctCount, totalCards, xpEarned, dateLabel }) {
    const lines = [];
    if (correctCount === totalCards) {
        lines.push('I aced today\'s AI Safety daily quiz! \uD83C\uDF1F');
    } else {
        lines.push(`I scored ${correctCount}/${totalCards} on today's AI Safety daily quiz!`);
    }
    lines.push(`${dateLabel} \u00B7 +${xpEarned} XP (2\u00D7 bonus!)`);
    lines.push('', `Learn AI safety \u2014 ${STORE_URL}`);
    return lines.join('\n');
}

export function buildAchievementShareText({ title, emoji }) {
    const lines = [
        `I just unlocked '${title}' ${emoji} on AI Safety!`,
        '',
        `Learn AI safety \u2014 ${STORE_URL}`,
    ];
    return lines.join('\n');
}

export function buildStreakShareText({ currentStreak }) {
    const lines = [];
    if (currentStreak >= 7) {
        lines.push(`I'm on a ${currentStreak}-day learning streak on AI Safety! \uD83D\uDD25`);
        lines.push('Can you beat it?');
    } else {
        lines.push(`I've been learning AI safety ${currentStreak} day${currentStreak === 1 ? '' : 's'} in a row on AI Safety! \uD83D\uDD25`);
    }
    lines.push('', `Learn AI safety \u2014 ${STORE_URL}`);
    return lines.join('\n');
}
