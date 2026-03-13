import { ALL_CONCEPTS } from './concepts';
import { DESCRIPTION_DISTRACTORS } from './descriptionDistractors';

// ─── Fisher-Yates shuffle ────────────────────────────
export function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ─── Centralized score color mapping ────────────────
export const SCORE_COLORS = {
    green: { bg: 'rgba(5, 150, 105, 0.08)', border: 'var(--color-success)' },
    yellow: { bg: 'rgba(198, 134, 42, 0.08)', border: 'var(--color-warning)' },
    red: { bg: 'rgba(166, 61, 61, 0.08)', border: 'var(--color-error)' },
};

export function getScoreColor(score) {
    return SCORE_COLORS[score] || SCORE_COLORS.red;
}

export function getScoreLabel(score) {
    if (score === 'green') return '\u2713 Correct!';
    if (score === 'yellow') return '\u2248 Close!';
    return '\u2717 Not quite';
}

// Generate "what" MCQ options — pick the right title for a concept
export function generateWhatOptions(correctConcept, lessonCardIds, allConcepts = ALL_CONCEPTS) {
    const options = [{ id: correctConcept.id, title: correctConcept.title, description: correctConcept.description }];

    // Get distractors from the same lesson first
    const lessonConcepts = allConcepts.filter(c => lessonCardIds.includes(c.id) && c.id !== correctConcept.id);
    const otherConcepts = allConcepts.filter(c => !lessonCardIds.includes(c.id) && c.id !== correctConcept.id);

    const shuffledLesson = shuffle(lessonConcepts);
    const shuffledOther = shuffle(otherConcepts);

    for (const c of shuffledLesson) {
        if (options.length < 4) options.push({ id: c.id, title: c.title, description: c.description });
    }
    for (const c of shuffledOther) {
        if (options.length < 4) options.push({ id: c.id, title: c.title, description: c.description });
    }

    return shuffle(options);
}

// Generate "description" MCQ options — given a concept title, pick the right description
// difficulty (optional): 1 = easy distractors, 2 = hard, 3 = very subtle (uses hardCorrect)
export function generateDescriptionOptions(correctConcept, allConcepts = ALL_CONCEPTS, difficulty = null) {
    const custom = DESCRIPTION_DISTRACTORS[correctConcept.id];

    if (custom) {
        // Use hardCorrect as the correct answer at difficulty 3
        const correctDesc = (difficulty === 3 && custom.hardCorrect)
            ? custom.hardCorrect
            : (correctConcept.quizDescription || correctConcept.description);

        const correctOption = { id: correctConcept.id, description: correctDesc, isCorrect: true };

        // Build distractor pool: prefer requested difficulty, then fill from other tiers
        let pool;
        if (difficulty) {
            const preferred = shuffle(custom.distractors.filter(d => d.d === difficulty));
            const fallback = shuffle(custom.distractors.filter(d => d.d !== difficulty));
            pool = [...preferred, ...fallback];
        } else {
            pool = shuffle(custom.distractors);
        }

        const options = [correctOption];
        for (const d of pool) {
            if (options.length >= 4) break;
            options.push({ id: correctConcept.id, description: d.text, isCorrect: false });
        }
        return shuffle(options);
    }

    // Fallback: pick descriptions from concepts in the same or nearby categories
    const correctOption = {
        id: correctConcept.id,
        description: correctConcept.quizDescription || correctConcept.description,
        isCorrect: true,
    };
    const options = [correctOption];

    // Prefer same-category concepts for harder distractors, then others
    const sameCategory = allConcepts
        .filter(c => c.id !== correctConcept.id && c.category === correctConcept.category);
    const otherCategory = allConcepts
        .filter(c => c.id !== correctConcept.id && c.category !== correctConcept.category);

    const shuffledPool = shuffle([...sameCategory, ...otherCategory]);
    for (const c of shuffledPool) {
        if (options.length >= 4) break;
        options.push({
            id: c.id,
            description: c.quizDescription || c.description,
            isCorrect: false,
        });
    }

    return shuffle(options);
}

// Calculate XP for a session — difficulty multiplier applied per result
export function calculateXP(results) {
    let xp = 0;
    for (const r of results) {
        const diff = r.difficulty || 1;
        if (r.firstScore === "green") xp += 10 * diff;
        else if (r.firstScore === "yellow") xp += 5 * diff;
        else if (r.firstScore === "red" && r.retryScore && r.retryScore !== "red") xp += 5 * diff;
    }
    return xp;
}
