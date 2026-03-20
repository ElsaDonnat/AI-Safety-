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
import { shuffle, generateDescriptionOptions } from './quiz';
import { TRUE_FALSE_STATEMENTS } from './trueFalseStatements';
import { DESCRIPTION_DISTRACTORS } from './descriptionDistractors';

// ─── Tier Configuration ──────────────────────────────
export const TIERS = [
    {
        name: 'Beginner',
        count: 5,
        types: ['trueOrFalse', 'hardMCQ'],
        difficulty: 1,  // easy distractors — you can guess from general knowledge
    },
    {
        name: 'Amateur',
        count: 7,
        types: ['trueOrFalse', 'hardMCQ', 'conceptRelationship'],
        difficulty: 1,
    },
    {
        name: 'Advanced',
        count: 8,
        types: ['hardMCQ', 'trueOrFalse', 'oddOneOut'],
        difficulty: 2,  // medium — distractors are from related concepts
    },
    {
        name: 'Expert',
        count: 8,
        types: ['hardMCQ', 'oddOneOut', 'conceptRelationship'],
        difficulty: 2,
    },
    {
        name: 'Master',
        count: 5,
        types: ['hardMCQ', 'oddOneOut'],
        difficulty: 3,  // hard — subtle errors that require deep understanding
    },
    {
        name: 'Visionary',
        count: 2,
        types: ['hardMCQ', 'conceptRelationship'],
        difficulty: 3,
    },
];

// Total questions across all tiers
export const TOTAL_CHALLENGE_QUESTIONS = TIERS.reduce((sum, t) => sum + t.count, 0);

// ─── Hearts / Lives ──────────────────────────────────
export const MAX_HEARTS = 3;

// ─── Active concept pool (can be overridden for course mode) ───
let _activeConcepts = ALL_CONCEPTS;

/**
 * Set the active concepts pool for question generation.
 * Call with resolved concepts when course mode is active.
 * Call with no arguments (or ALL_CONCEPTS) to reset.
 */
export function setActiveConcepts(concepts = ALL_CONCEPTS) {
    _activeConcepts = concepts;
}

// ─── Question Generators ─────────────────────────────

/**
 * True/False — conceptual misconception statements about AI safety.
 * Returns { type, statement, isTrue, concept, correction }
 */
function generateTrueOrFalse() {
    const pool = _activeConcepts.filter(c => c.description);
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
    const pool = _activeConcepts.filter(c => c.description);
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
 * Hard MCQ — description subtype: given a title, pick the right description.
 * Uses curated distractors from DESCRIPTION_DISTRACTORS when available,
 * with difficulty-appropriate options. Falls back to same-category descriptions.
 *
 * @param {number} difficulty - 1 (easy), 2 (medium), 3 (hard/subtle)
 */
function generateHardMCQDescription(difficulty = 1) {
    const pool = _activeConcepts.filter(c => c.description);
    if (pool.length < 2) return null;

    const concept = pool[Math.floor(Math.random() * pool.length)];
    const custom = DESCRIPTION_DISTRACTORS[concept.id];

    // Use curated distractors when available
    if (custom) {
        const options = generateDescriptionOptions(concept, _activeConcepts, difficulty);
        // Find the distractor entries to attach explanations for d:3
        const explanations = [];
        if (difficulty >= 3) {
            for (const opt of options) {
                if (opt.isCorrect) continue;
                const match = custom.distractors.find(d => d.text === opt.description);
                if (match && match.trap) explanations.push(match.trap);
            }
        }

        return {
            type: 'hardMCQ',
            subtype: 'description',
            question: `What does "${concept.title}" refer to?`,
            options,
            concept,
            explanation: explanations.length > 0 ? explanations[0] : null,
        };
    }

    // Fallback: same-category distractors
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
        explanation: null,
    };
}

/**
 * Odd One Out — 4 concepts, 3 share a category/topic, find the outlier.
 */
function generateOddOneOut() {
    // Group by category
    const byCategory = {};
    for (const c of _activeConcepts) {
        if (!byCategory[c.category]) byCategory[c.category] = [];
        byCategory[c.category].push(c);
    }

    // Find a category with at least 3 concepts
    const eligibleCategories = Object.entries(byCategory).filter(([, concepts]) => concepts.length >= 3);
    if (eligibleCategories.length === 0) return null;

    const [category, concepts] = eligibleCategories[Math.floor(Math.random() * eligibleCategories.length)];
    const group = shuffle(concepts).slice(0, 3);

    // Pick an outlier from a different category
    const outlierPool = _activeConcepts.filter(c => c.category !== category);
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
    const withLinks = _activeConcepts.filter(c => c.linkedCards && c.linkedCards.length > 0);
    if (withLinks.length === 0) return null;

    const concept = withLinks[Math.floor(Math.random() * withLinks.length)];
    const linkedEntry = concept.linkedCards[Math.floor(Math.random() * concept.linkedCards.length)];
    const linkedId = typeof linkedEntry === 'string' ? linkedEntry : linkedEntry.id;
    const linkedConcept = _activeConcepts.find(c => c.id === linkedId);
    if (!linkedConcept) return null;

    // Get distractors (not linked)
    const linkedIds = concept.linkedCards.map(lc => typeof lc === 'string' ? lc : lc.id);
    const distractorPool = _activeConcepts.filter(
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
    trueOrFalse: () => generateTrueOrFalse(),
    hardMCQ: (d) => (Math.random() < 0.5 ? generateHardMCQWhat() : generateHardMCQDescription(d)),
    oddOneOut: () => generateOddOneOut(),
    conceptRelationship: () => generateConceptRelationship(),
};

/**
 * Generate a single question of the given type.
 * @param {string} type - Question type key
 * @param {number} difficulty - 1 (easy), 2 (medium), 3 (hard)
 * Returns null if generation fails (not enough concepts).
 */
export function generateQuestion(type, difficulty = 1) {
    const generator = GENERATORS[type];
    if (!generator) return null;
    return generator(difficulty);
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
        const tierDifficulty = tier.difficulty || 1;
        const tierQuestions = [];

        for (let i = 0; i < tier.count; i++) {
            // Pick a random type from allowed types for this tier
            const typePool = shuffle(tier.types);
            let question = null;

            for (const type of typePool) {
                question = generateQuestion(type, tierDifficulty);
                if (question) break;
            }

            if (question) {
                question.tier = t;
                question.tierName = tier.name;
                question.difficulty = tierDifficulty;
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
            let explanation = correct
                ? 'Correct!'
                : `The correct answer was: ${correctOption?.title || correctOption?.description}`;
            // Append trap explanation for hard questions when wrong
            if (!correct && question.explanation) {
                explanation += ` — ${question.explanation}`;
            }
            return { correct, explanation };
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
