/**
 * Course registry — single place to look up course content + metadata.
 *
 * Combines the content definitions (modules, lessons, card overrides)
 * from individual course files with the metadata/password config from
 * courseConfig.js.
 */

import { ml4gCourse } from './ml4g';

// ─── Course content registry ─────────────────────────
export const COURSE_CONTENT = {
    ml4g: ml4gCourse,
};

/**
 * Get course content (modules, lessons, overrides) by ID.
 * @param {string} courseId
 * @returns {object|undefined}
 */
export function getCourseContent(courseId) {
    return COURSE_CONTENT[courseId];
}

/**
 * Derive the set of all card IDs used by a course.
 * Used for practice/quiz filtering — no manual tagging needed.
 * @param {string} courseId
 * @returns {Set<string>}
 */
export function getCourseCardIds(courseId) {
    const course = COURSE_CONTENT[courseId];
    if (!course) return new Set();
    const ids = new Set();
    for (const topic of course.topics) {
        for (const chapter of topic.chapters) {
            for (const lesson of chapter.lessons) {
                for (const cardId of lesson.cardIds) {
                    ids.add(cardId);
                }
            }
        }
    }
    return ids;
}

/**
 * Resolve a card with course overrides applied.
 * If course mode is active and the course has overrides for this card,
 * returns a shallow-merged copy. Otherwise returns the base card as-is.
 *
 * @param {object} baseCard - The card object from the main registry
 * @param {object|null} courseMode - state.courseMode ({ courseId } or null)
 * @returns {object} The resolved card (may be the same reference if no overrides)
 */
export function resolveCard(baseCard, courseMode) {
    if (!baseCard || !courseMode) return baseCard;

    const course = COURSE_CONTENT[courseMode.courseId];
    const overrides = course?.cardOverrides?.[baseCard.id];
    if (!overrides) return baseCard;

    return { ...baseCard, ...overrides };
}

/**
 * Resolve all concepts with course overrides applied.
 * Returns the same array reference if no course mode is active.
 * @param {Array} allConcepts - ALL_CONCEPTS from concepts.js
 * @param {object|null} courseMode - state.courseMode
 * @returns {Array} Resolved concepts (new array only if overrides exist)
 */
export function resolveAllConcepts(allConcepts, courseMode) {
    if (!courseMode) return allConcepts;
    const course = COURSE_CONTENT[courseMode.courseId];
    if (!course?.cardOverrides || Object.keys(course.cardOverrides).length === 0) {
        return allConcepts;
    }
    return allConcepts.map(c => resolveCard(c, courseMode));
}
