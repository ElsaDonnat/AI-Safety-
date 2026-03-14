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
    {
        id: 'risks',
        title: 'AI Risks',
        description: 'Understanding and mitigating potential harms from AI',
        icon: '\u26A0\uFE0F',
        color: '#DC2626',
    },
    {
        id: 'ethics',
        title: 'AI Ethics',
        description: 'Fairness, accountability, and societal impact of AI',
        icon: '\uD83D\uDCA1',
        color: '#059669',
    },
    {
        id: 'ai-progress',
        title: 'AI Progress',
        description: 'How AI systems are advancing and why the pace matters for safety',
        icon: '\uD83D\uDE80',
        color: '#2563EB',
    },
];

export const LESSONS = [
    // ─── Alignment (3 lessons) ──────────────────────────────
    {
        id: 'lesson-alignment-0',
        number: 0,
        title: 'Introduction to Value Alignment',
        subtitle: 'The core challenge and how we tackle it',
        mood: 'Before we dive in, let\u2019s understand why alignment matters\u2026',
        topic: 'alignment',
        isFoundational: true,
        cardIds: ['c1', 'c2'],
    },
    {
        id: 'lesson-alignment-1',
        number: 1,
        title: 'Reward Hacking & Specification',
        subtitle: 'Getting what you asked for, not what you wanted',
        mood: 'AI is very good at finding loopholes\u2026',
        topic: 'alignment',
        isFoundational: false,
        cardIds: ['c6', 'c7'],
    },
    {
        id: 'lesson-alignment-2',
        number: 2,
        title: 'Constitutional AI & Oversight',
        subtitle: 'Scaling alignment beyond human review',
        mood: 'Can AI help align itself?',
        topic: 'alignment',
        isFoundational: false,
        cardIds: ['c8', 'c14'],
    },

    // ─── Interpretability (2 lessons) ───────────────────────
    {
        id: 'lesson-interp-0',
        number: 0,
        title: 'What is Interpretability?',
        subtitle: 'Opening the black box',
        mood: 'Can we understand what AI models are actually thinking?',
        topic: 'interpretability',
        isFoundational: true,
        cardIds: ['c3', 'c4'],
    },
    {
        id: 'lesson-interp-1',
        number: 1,
        title: 'Visualization & Robustness',
        subtitle: 'Seeing what models see',
        mood: 'What do neurons actually respond to?',
        topic: 'interpretability',
        isFoundational: false,
        cardIds: ['c9', 'c15'],
    },

    // ─── Governance (1 lesson) ──────────────────────────────
    {
        id: 'lesson-gov-0',
        number: 0,
        title: 'AI Governance Basics',
        subtitle: 'Rules for the AI age',
        mood: 'Who decides how AI should be built and used?',
        topic: 'governance',
        isFoundational: true,
        cardIds: ['c5', 'c13'],
    },

    // ─── Risks (1 lesson, single card) ──────────────────────
    {
        id: 'lesson-risks-0',
        number: 0,
        title: 'Understanding AI Risks',
        subtitle: 'Why safety matters now',
        mood: 'The stakes are higher than you might think\u2026',
        topic: 'risks',
        isFoundational: true,
        cardIds: ['c10'],
    },

    // ─── Ethics (1 lesson) ──────────────────────────────────
    {
        id: 'lesson-ethics-0',
        number: 0,
        title: 'AI Ethics Foundations',
        subtitle: 'Fairness, accountability, and transparency',
        mood: 'Who is affected when AI gets it wrong?',
        topic: 'ethics',
        isFoundational: true,
        cardIds: ['c11', 'c12'],
    },

    // ─── AI Progress (4 lessons) ────────────────────────────
    {
        id: 'lesson-ai-progress-0',
        number: 0,
        title: 'The Pace of Progress',
        subtitle: 'Why understanding AI trajectories matters',
        mood: 'AI is advancing faster than ever. Understanding the trajectory is the first step to shaping it.',
        topic: 'ai-progress',
        isFoundational: true,
        cardIds: ['c16', 'c17', 'c18'],
    },
    {
        id: 'lesson-ai-progress-1',
        number: 1,
        title: 'What\'s Driving Progress',
        subtitle: 'Compute, scale, and predictable improvement',
        mood: 'What if getting smarter AI was as simple as making it bigger?',
        topic: 'ai-progress',
        isFoundational: false,
        cardIds: ['c19', 'c20'],
    },
    {
        id: 'lesson-ai-progress-2',
        number: 2,
        title: 'Measuring and Surprises',
        subtitle: 'How we track progress \u2014 and what catches us off guard',
        mood: 'Some of AI\'s most important capabilities weren\'t predicted by their creators\u2026',
        topic: 'ai-progress',
        isFoundational: false,
        cardIds: ['c21', 'c22'],
    },
    {
        id: 'lesson-ai-progress-3',
        number: 3,
        title: 'The Frontier and Beyond',
        subtitle: 'Where AI is headed next',
        mood: 'Where is all this heading \u2014 and what does it mean for safety?',
        topic: 'ai-progress',
        isFoundational: false,
        cardIds: ['c23', 'c24', 'c25'],
    },
];

export function getLessonsByTopic(topicId) {
    return LESSONS.filter(l => l.topic === topicId);
}
