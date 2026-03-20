/**
 * ML for Good (ML4G) course definition.
 *
 * This is the single source of truth for everything ML4G-specific:
 * module structure, lesson ordering, and optional card overrides.
 *
 * Lessons reference existing card IDs from the main card registry —
 * no card duplication. If a course needs a card that doesn't exist,
 * create it in the main registry first.
 */

export const ml4gCourse = {
    id: 'ml4g',
    name: 'ML for Good',
    description: 'A companion mode for the ML for Good course. Lessons and cards are tailored to the ML4G curriculum.',

    // Course content organized into modules
    modules: [
        {
            id: 'ml4g-mod-1',
            title: 'Introduction to AI Safety',
            subtitle: 'Core concepts and why AI safety matters',
            lessons: [
                {
                    id: 'ml4g-L01',
                    title: 'What is AI?',
                    subtitle: 'Foundations of artificial intelligence',
                    mood: 'curious',
                    cardIds: ['c101', 'c102', 'c103'],
                },
                {
                    id: 'ml4g-L02',
                    title: 'Why Safety Matters',
                    subtitle: 'Introduction to AI risks',
                    mood: 'serious',
                    cardIds: ['c501', 'c502'],
                },
            ],
        },
        {
            id: 'ml4g-mod-2',
            title: 'Alignment Fundamentals',
            subtitle: 'Understanding the alignment problem',
            lessons: [
                {
                    id: 'ml4g-L03',
                    title: 'The Alignment Problem',
                    subtitle: 'Why aligning AI with human values is hard',
                    mood: 'thinking',
                    cardIds: ['c401', 'c403'],
                },
                {
                    id: 'ml4g-L04',
                    title: 'Safety Techniques',
                    subtitle: 'Tools for making AI safer',
                    mood: 'determined',
                    cardIds: ['c601', 'c602'],
                },
            ],
        },
    ],

    // Lightweight overrides for cards that need different framing in this course.
    // Only the specified fields get replaced; everything else comes from the base card.
    cardOverrides: {
        'c501': {
            whyItMatters: '[ML4G override] This is a test override for course mode — existential risk framed for ML4G students.',
        },
    },
};
