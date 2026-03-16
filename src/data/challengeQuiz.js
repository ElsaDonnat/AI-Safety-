/**
 * Challenge mode question generation — creative question types.
 * All questions are binary (correct/incorrect), no yellow scoring.
 *
 * Question types:
 * - trueOrFalse: conceptual misconception statements
 * - hardMCQ: what/description subtypes with same-category distractors
 * - oddOneOut: 4 concepts, 3 share a trait, find the outlier
 * - conceptRelationship: which concept is most related to X?
 */

import { ALL_CONCEPTS, CATEGORY_CONFIG } from './concepts';
import { shuffle } from './quiz';
import { TRUE_FALSE_STATEMENTS } from './trueFalseStatements';

// ─── Tier Configuration ──────────────────────────────
export const TIERS = [
    {
        name: 'Beginner',
        count: 5,
        types: ['trueOrFalse', 'hardMCQ'],
    },
    {
        name: 'Amateur',
        count: 7,
        types: ['trueOrFalse', 'hardMCQ', 'conceptRelationship'],
    },
    {
        name: 'Advanced',
        count: 8,
        types: ['hardMCQ', 'trueOrFalse', 'oddOneOut'],
    },
    {
        name: 'Expert',
        count: 8,
        types: ['hardMCQ', 'oddOneOut', 'conceptRelationship'],
    },
    {
        name: 'Master',
        count: 5,
        types: ['hardMCQ', 'oddOneOut'],
    },
    {
        name: 'Visionary',
        count: 2,
        types: ['hardMCQ', 'conceptRelationship'],
    },
];

// Total questions across all tiers
export const TOTAL_CHALLENGE_QUESTIONS = TIERS.reduce((sum, t) => sum + t.count, 0);

// ─── Hearts / Lives ──────────────────────────────────
export const MAX_HEARTS = 3;

// ─── Question Generators ─────────────────────────────

/**
 * True/False — conceptual misconception statements about AI safety.
 * Returns { type, statement, isTrue, concept, correction }
 */
function generateTrueOrFalse() {
    const pool = ALL_CONCEPTS.filter(c => c.description);
    if (pool.length === 0) return null;

    const concept = pool[Math.floor(Math.random() * pool.length)];
    const statements = TRUE_FALSE_STATEMENTS[concept.id];

    // Use static statements when available
    if (statements) {
        if (Math.random() < 0.5) {
            return {
                type: 'trueOrFalse',
                statement: `${concept.title}: ${statements.trueStatement}`,
                isTrue: true,
                concept,
                correction: null,
            };
        }
        return {
            type: 'trueOrFalse',
            statement: `${concept.title}: ${statements.falseStatement}`,
            isTrue: false,
            concept,
            correction: statements.correction,
        };
    }

    // Fallback: generate dynamically from descriptions
    if (Math.random() < 0.5) {
        return {
            type: 'trueOrFalse',
            statement: `${concept.title}: ${concept.quizDescription || concept.description}`,
            isTrue: true,
            concept,
            correction: null,
        };
    }

    const others = pool.filter(c => c.id !== concept.id);
    if (others.length === 0) return null;
    const wrong = others[Math.floor(Math.random() * others.length)];

    return {
        type: 'trueOrFalse',
        statement: `${concept.title}: ${wrong.quizDescription || wrong.description}`,
        isTrue: false,
        concept,
        correction: `That description actually refers to ${wrong.title}. ${concept.title} is: ${concept.quizDescription || concept.description}`,
    };
}

/**
 * Hard MCQ — what subtype: given a description, pick the right title
 * from same-category concepts for harder distractors.
 */
function generateHardMCQWhat() {
    const pool = ALL_CONCEPTS.filter(c => c.description);
    if (pool.length < 2) return null;

    const concept = pool[Math.floor(Math.random() * pool.length)];
    const sameCategory = pool.filter(c => c.id !== concept.id && c.category === concept.category);
    const otherCategory = pool.filter(c => c.id !== concept.id && c.category !== concept.category);

    const distractors = [];
    const shuffledSame = shuffle(sameCategory);
    const shuffledOther = shuffle(otherCategory);

    for (const c of shuffledSame) {
        if (distractors.length >= 3) break;
        distractors.push({ title: c.title, isCorrect: false });
    }
    for (const c of shuffledOther) {
        if (distractors.length >= 3) break;
        distractors.push({ title: c.title, isCorrect: false });
    }

    const options = shuffle([
        { title: concept.title, isCorrect: true },
        ...distractors,
    ]);

    return {
        type: 'hardMCQ',
        subtype: 'what',
        question: `Which concept is described by: "${concept.quizDescription || concept.description}"?`,
        options,
        concept,
    };
}

/**
 * Hard MCQ — description subtype: given a title, pick the right description
 * from same-category concepts for harder distractors.
 */
function generateHardMCQDescription() {
    const pool = ALL_CONCEPTS.filter(c => c.description);
    if (pool.length < 2) return null;

    const concept = pool[Math.floor(Math.random() * pool.length)];
    const sameCategory = pool.filter(c => c.id !== concept.id && c.category === concept.category);
    const otherCategory = pool.filter(c => c.id !== concept.id && c.category !== concept.category);

    const distractors = [];
    const shuffledSame = shuffle(sameCategory);
    const shuffledOther = shuffle(otherCategory);

    for (const c of shuffledSame) {
        if (distractors.length >= 3) break;
        distractors.push({ description: c.quizDescription || c.description, isCorrect: false });
    }
    for (const c of shuffledOther) {
        if (distractors.length >= 3) break;
        distractors.push({ description: c.quizDescription || c.description, isCorrect: false });
    }

    const options = shuffle([
        { description: concept.quizDescription || concept.description, isCorrect: true },
        ...distractors,
    ]);

    return {
        type: 'hardMCQ',
        subtype: 'description',
        question: `What does "${concept.title}" refer to?`,
        options,
        concept,
    };
}

/**
 * Odd One Out — 4 concepts, 3 share a category/topic, find the outlier.
 */
function generateOddOneOut() {
    // Group by category
    const byCategory = {};
    for (const c of ALL_CONCEPTS) {
        if (!byCategory[c.category]) byCategory[c.category] = [];
        byCategory[c.category].push(c);
    }

    // Find a category with at least 3 concepts
    const eligibleCategories = Object.entries(byCategory).filter(([, concepts]) => concepts.length >= 3);
    if (eligibleCategories.length === 0) return null;

    const [category, concepts] = eligibleCategories[Math.floor(Math.random() * eligibleCategories.length)];
    const group = shuffle(concepts).slice(0, 3);

    // Pick an outlier from a different category
    const outlierPool = ALL_CONCEPTS.filter(c => c.category !== category);
    if (outlierPool.length === 0) return null;
    const outlier = outlierPool[Math.floor(Math.random() * outlierPool.length)];

    const allFour = shuffle([...group, outlier]);
    const categoryLabel = CATEGORY_CONFIG[category]?.label || category;

    return {
        type: 'oddOneOut',
        question: `Which concept does NOT belong with the others?`,
        hint: `Three of these are in the "${categoryLabel}" category.`,
        options: allFour.map(c => ({
            id: c.id,
            title: c.title,
            isOutlier: c.id === outlier.id,
        })),
        outlier,
        sharedTrait: `${categoryLabel} category`,
    };
}

/**
 * Concept Relationship — which concept is most related to X?
 * Uses linkedCards field.
 */
function generateConceptRelationship() {
    // Find concepts with linkedCards
    const withLinks = ALL_CONCEPTS.filter(c => c.linkedCards && c.linkedCards.length > 0);
    if (withLinks.length === 0) return null;

    const concept = withLinks[Math.floor(Math.random() * withLinks.length)];
    const linkedEntry = concept.linkedCards[Math.floor(Math.random() * concept.linkedCards.length)];
    const linkedId = typeof linkedEntry === 'string' ? linkedEntry : linkedEntry.id;
    const linkedConcept = ALL_CONCEPTS.find(c => c.id === linkedId);
    if (!linkedConcept) return null;

    // Get distractors (not linked)
    const linkedIds = concept.linkedCards.map(lc => typeof lc === 'string' ? lc : lc.id);
    const distractorPool = ALL_CONCEPTS.filter(
        c => c.id !== concept.id && !linkedIds.includes(c.id)
    );
    const distractors = shuffle(distractorPool).slice(0, 3);

    if (distractors.length < 2) return null;

    const options = shuffle([
        { id: linkedConcept.id, title: linkedConcept.title, isCorrect: true },
        ...distractors.map(c => ({ id: c.id, title: c.title, isCorrect: false })),
    ]);

    return {
        type: 'conceptRelationship',
        question: `Which concept is most closely related to "${concept.title}"?`,
        options,
        concept,
        linkedConcept,
    };
}

// ─── Question Type Registry ──────────────────────────
const GENERATORS = {
    trueOrFalse: generateTrueOrFalse,
    hardMCQ: () => (Math.random() < 0.5 ? generateHardMCQWhat() : generateHardMCQDescription()),
    oddOneOut: generateOddOneOut,
    conceptRelationship: generateConceptRelationship,
};

/**
 * Generate a single question of the given type.
 * Returns null if generation fails (not enough concepts).
 */
export function generateQuestion(type) {
    const generator = GENERATORS[type];
    if (!generator) return null;
    return generator();
}

/**
 * Generate a full challenge game — returns array of questions across tiers.
 * Stops at the requested tier (0-indexed) or generates all tiers.
 */
export function generateChallengeGame(maxTier = TIERS.length - 1) {
    const questions = [];
    const _UsedConceptIds = new Set();

    for (let t = 0; t <= Math.min(maxTier, TIERS.length - 1); t++) {
        const tier = TIERS[t];
        const tierQuestions = [];

        for (let i = 0; i < tier.count; i++) {
            // Pick a random type from allowed types for this tier
            const typePool = shuffle(tier.types);
            let question = null;

            for (const type of typePool) {
                question = generateQuestion(type);
                if (question) break;
            }

            if (question) {
                question.tier = t;
                question.tierName = tier.name;
                tierQuestions.push(question);
            }
        }

        questions.push(...tierQuestions);
    }

    return questions;
}

/**
 * Check if user's answer is correct for a challenge question.
 * Returns { correct: boolean, explanation: string }
 */
export function checkChallengeAnswer(question, answer) {
    switch (question.type) {
        case 'trueOrFalse': {
            const correct = answer === question.isTrue;
            return {
                correct,
                explanation: correct
                    ? 'Correct!'
                    : (question.correction || `The correct answer was ${question.isTrue ? 'True' : 'False'}.`),
            };
        }
        case 'hardMCQ': {
            const correctOption = question.options.find(o => o.isCorrect);
            const correct = answer === (correctOption?.title || correctOption?.description);
            return {
                correct,
                explanation: correct
                    ? 'Correct!'
                    : `The correct answer was: ${correctOption?.title || correctOption?.description}`,
            };
        }
        case 'oddOneOut': {
            const correct = answer === question.outlier.id;
            return {
                correct,
                explanation: correct
                    ? 'Correct!'
                    : `${question.outlier.title} was the odd one out. The others share the ${question.sharedTrait}.`,
            };
        }
        case 'conceptRelationship': {
            const correctOption = question.options.find(o => o.isCorrect);
            const correct = answer === correctOption?.id;
            return {
                correct,
                explanation: correct
                    ? 'Correct!'
                    : `${question.linkedConcept.title} is most closely related to ${question.concept.title}.`,
            };
        }
        default:
            return { correct: false, explanation: 'Unknown question type.' };
    }
}
