/**
 * Course Mode Configuration
 *
 * Defines available courses that users can unlock with a password.
 * When a course is active, the app becomes a companion for that specific
 * course — lessons, ordering, and emphasis may change.
 *
 * To add a new course:
 *  1. Add an entry to COURSES below (metadata + password)
 *  2. Set the password hash (use hashPassword() to generate)
 *  3. Create a course content file in src/data/courses/<courseId>.js
 *  4. Register it in src/data/courses/index.js
 *
 * This file handles metadata & auth. Course content (modules, lessons,
 * card overrides) lives in src/data/courses/.
 */

// Simple hash for password verification (not cryptographic — just prevents casual peeking)
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const ch = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

export const COURSES = [
    {
        id: 'ml4g',
        name: 'ML4G',
        fullName: 'ML for Good',
        description: 'A companion mode for the ML for Good course. Lessons and cards are tailored to the ML4G curriculum.',
        passwordHash: 1339035764, // hash of 'ML4G2026'
    },
];

/**
 * Validate a password against a course's stored hash.
 * @param {string} courseId
 * @param {string} password
 * @returns {boolean}
 */
export function validateCoursePassword(courseId, password) {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return false;
    return simpleHash(password.trim()) === course.passwordHash;
}

/**
 * Get a course definition by ID.
 * @param {string} courseId
 * @returns {object|undefined}
 */
export function getCourseById(courseId) {
    return COURSES.find(c => c.id === courseId);
}

/**
 * Helper: hash a password string. Run in the browser console to generate
 * a hash for a new course password:
 *   import { hashPassword } from './src/data/courseConfig.js';
 *   hashPassword('my-secret-password');
 */
export function hashPassword(str) {
    return simpleHash(str);
}
