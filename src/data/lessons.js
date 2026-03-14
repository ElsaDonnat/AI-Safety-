// ─── AI Safety Domains, Topics, Chapters & Lessons ─────────
// 4-level hierarchy: Domain → Topic → Chapter → Lesson

// ─── Domains (top-level tabs) ───────────────────────────────
export const DOMAINS = [
    {
        id: 'foundations',
        title: 'Foundations of AI',
        description: 'Core concepts behind modern AI systems',
        icon: '\uD83E\uDDE0',
        color: '#1E3A5F',
        order: 0,
    },
    {
        id: 'governance',
        title: 'Governance',
        description: 'Policy, regulation, and international coordination',
        icon: '\u2696\uFE0F',
        color: '#2563EB',
        order: 1,
        comingSoon: true,
    },
    {
        id: 'ai-safety',
        title: 'AI Safety',
        description: 'Alignment, interpretability, and risk mitigation',
        icon: '\uD83D\uDEE1\uFE0F',
        color: '#7C3AED',
        order: 2,
        comingSoon: true,
    },
];

// ─── Topics (within domains) ────────────────────────────────
export const TOPICS = [
    {
        id: 'ai-basics',
        domain: 'foundations',
        title: 'AI Basics',
        description: 'What AI is and how it works at a high level',
        icon: '\uD83E\uDD16',
        color: '#0D9488',
        order: 0,
    },
    {
        id: 'ai-progress',
        domain: 'foundations',
        title: 'AI Progress',
        description: 'How AI capabilities are advancing and accelerating',
        icon: '\uD83D\uDE80',
        color: '#2563EB',
        order: 1,
    },
    {
        id: 'ai-concepts',
        domain: 'foundations',
        title: 'AI Concepts',
        description: 'Key technical ideas behind modern AI systems',
        icon: '\u2699\uFE0F',
        color: '#DC2626',
        order: 2,
    },
];

// ─── Chapters (difficulty tiers within topics) ──────────────
export const CHAPTERS = [
    // AI Basics
    { id: 'ai-basics-beginner', topic: 'ai-basics', title: 'Beginner', difficulty: 'beginner', order: 0 },
    { id: 'ai-basics-amateur', topic: 'ai-basics', title: 'Amateur', difficulty: 'amateur', order: 1, comingSoon: true },
    { id: 'ai-basics-advanced', topic: 'ai-basics', title: 'Advanced', difficulty: 'advanced', order: 2, comingSoon: true },
    // AI Progress
    { id: 'ai-progress-beginner', topic: 'ai-progress', title: 'Beginner', difficulty: 'beginner', order: 0 },
    { id: 'ai-progress-amateur', topic: 'ai-progress', title: 'Amateur', difficulty: 'amateur', order: 1, comingSoon: true },
    { id: 'ai-progress-advanced', topic: 'ai-progress', title: 'Advanced', difficulty: 'advanced', order: 2, comingSoon: true },
    // AI Concepts
    { id: 'ai-concepts-beginner', topic: 'ai-concepts', title: 'Beginner', difficulty: 'beginner', order: 0 },
    { id: 'ai-concepts-amateur', topic: 'ai-concepts', title: 'Amateur', difficulty: 'amateur', order: 1, comingSoon: true },
    { id: 'ai-concepts-advanced', topic: 'ai-concepts', title: 'Advanced', difficulty: 'advanced', order: 2, comingSoon: true },
];

// Difficulty badge colors
export const DIFFICULTY_COLORS = {
    beginner: '#22C55E',
    amateur: '#F59E0B',
    advanced: '#EF4444',
};

// ─── Lessons ────────────────────────────────────────────────
export const LESSONS = [
    // ─── AI Basics / Beginner ───────────────────────────────
    {
        id: 'lesson-ai-basics-b-0',
        number: 0,
        title: 'What is AI?',
        subtitle: 'The core hierarchy: AI, ML, and deep learning',
        mood: 'Let\u2019s start at the very beginning\u2026',
        chapter: 'ai-basics-beginner',
        topic: 'ai-basics',
        isFoundational: true,
        cardIds: ['c101', 'c102', 'c103'],
    },
    {
        id: 'lesson-ai-basics-b-1',
        number: 1,
        title: 'How AI Sees & Speaks',
        subtitle: 'Neural networks and their applications',
        mood: 'Now let\u2019s see what AI can actually do\u2026',
        chapter: 'ai-basics-beginner',
        topic: 'ai-basics',
        isFoundational: false,
        cardIds: ['c105', 'c104', 'c106'],
    },

    // ─── AI Progress / Beginner ─────────────────────────────
    {
        id: 'lesson-ai-progress-b-0',
        number: 0,
        title: 'The AI Landscape',
        subtitle: 'LLMs, foundation models, and who builds them',
        mood: 'AI is moving fast. Here\u2019s what\u2019s happening\u2026',
        chapter: 'ai-progress-beginner',
        topic: 'ai-progress',
        isFoundational: true,
        cardIds: ['c201', 'c202', 'c206'],
    },
    {
        id: 'lesson-ai-progress-b-1',
        number: 1,
        title: 'Why AI Keeps Getting Better',
        subtitle: 'Scaling laws, benchmarks, and surprises',
        mood: 'What if getting smarter AI was as simple as making it bigger?',
        chapter: 'ai-progress-beginner',
        topic: 'ai-progress',
        isFoundational: false,
        cardIds: ['c203', 'c204', 'c205'],
    },

    // ─── AI Concepts / Beginner ─────────────────────────────
    {
        id: 'lesson-ai-concepts-b-0',
        number: 0,
        title: 'How Machines Learn',
        subtitle: 'Training, inference, and the three learning paradigms',
        mood: 'There are different ways machines can learn\u2026',
        chapter: 'ai-concepts-beginner',
        topic: 'ai-concepts',
        isFoundational: true,
        cardIds: ['c301', 'c302', 'c303', 'c304'],
    },
    {
        id: 'lesson-ai-concepts-b-1',
        number: 1,
        title: 'Modern AI Building Blocks',
        subtitle: 'Transformers and fine-tuning',
        mood: 'These two ideas power almost everything in modern AI\u2026',
        chapter: 'ai-concepts-beginner',
        topic: 'ai-concepts',
        isFoundational: false,
        cardIds: ['c305', 'c306'],
    },
];

// ─── Helper Functions ───────────────────────────────────────

export function getTopicsByDomain(domainId) {
    return TOPICS.filter(t => t.domain === domainId).sort((a, b) => a.order - b.order);
}

export function getChaptersByTopic(topicId) {
    return CHAPTERS.filter(ch => ch.topic === topicId).sort((a, b) => a.order - b.order);
}

export function getLessonsByChapter(chapterId) {
    return LESSONS.filter(l => l.chapter === chapterId);
}

export function getLessonsByTopic(topicId) {
    return LESSONS.filter(l => l.topic === topicId);
}
