// ─── AI Safety Topics & Lessons ─────────────────────────────
// Topics and lessons for AI Safety learning app.

export const TOPICS = [
    {
        id: 'alignment',
        title: 'Value Alignment',
        description: 'How to ensure AI systems pursue human-compatible goals',
        icon: '\uD83C\uDFAF',
        color: '#7C3AED',
    },
    {
        id: 'interpretability',
        title: 'Interpretability',
        description: 'Understanding what happens inside AI models',
        icon: '\uD83D\uDD0D',
        color: '#0D9488',
    },
    {
        id: 'governance',
        title: 'AI Governance',
        description: 'Policy frameworks for safe AI development',
        icon: '\u2696\uFE0F',
        color: '#2563EB',
    },
];

export const LESSONS = [
    {
        id: 'lesson-alignment-0',
        number: 0,
        title: 'What is Value Alignment?',
        subtitle: 'The core challenge of AI safety',
        mood: 'Before we dive in, let\u2019s understand why alignment matters\u2026',
        topic: 'alignment',
        isFoundational: true,
        cardIds: ['c1'],
    },
    {
        id: 'lesson-alignment-1',
        number: 1,
        title: 'Training with Human Feedback',
        subtitle: 'RLHF and preference learning',
        mood: 'How do we teach AI what humans actually want?',
        topic: 'alignment',
        isFoundational: false,
        cardIds: ['c2'],
    },
    {
        id: 'lesson-interp-0',
        number: 0,
        title: 'What is Interpretability?',
        subtitle: 'Opening the black box',
        mood: 'Can we understand what AI models are actually thinking?',
        topic: 'interpretability',
        isFoundational: true,
        cardIds: ['c3'],
    },
    {
        id: 'lesson-interp-1',
        number: 1,
        title: 'Superposition and Features',
        subtitle: 'How networks encode knowledge',
        mood: 'Neural networks are more complex than they seem\u2026',
        topic: 'interpretability',
        isFoundational: false,
        cardIds: ['c4'],
    },
    {
        id: 'lesson-gov-0',
        number: 0,
        title: 'AI Governance Basics',
        subtitle: 'Rules for the AI age',
        mood: 'Who decides how AI should be built and used?',
        topic: 'governance',
        isFoundational: true,
        cardIds: ['c5'],
    },
];

export function getLessonsByTopic(topicId) {
    return LESSONS.filter(l => l.topic === topicId);
}
