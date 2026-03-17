// ─── AI Safety Domains, Topics, Chapters & Lessons ─────────
// 4-level hierarchy: Domain → Topic → Chapter → Lesson

// ─── Domains (top-level tabs) ───────────────────────────────
export const DOMAINS = [
    {
        id: 'foundations',
        title: 'Foundations of AI',
        description: 'Core concepts behind modern AI systems',
        icon: 'foundations',
        color: '#8BC6A3',
        order: 0,
    },
    {
        id: 'governance',
        title: 'Governance',
        description: 'Policy, regulation, and international coordination',
        icon: 'governance',
        color: '#C2DDE8',
        order: 1,
        comingSoon: true,
    },
    {
        id: 'ai-safety',
        title: 'AI Safety',
        description: 'Alignment, interpretability, and risk mitigation',
        icon: 'ai-safety',
        color: '#B99EDB',
        order: 2,
    },
];

// ─── Topics (within domains) ────────────────────────────────
export const TOPICS = [
    {
        id: 'ai-basics',
        domain: 'foundations',
        title: 'AI Basics',
        description: 'What AI is and how it works at a high level',
        icon: 'ai-basics',
        color: '#A8C8D8',
        order: 0,
    },
    {
        id: 'ai-progress',
        domain: 'foundations',
        title: 'AI Progress',
        description: 'How AI capabilities are advancing and accelerating',
        icon: 'ai-progress',
        color: '#D4726A',
        order: 1,
    },
    {
        id: 'ai-concepts',
        domain: 'foundations',
        title: 'AI Concepts',
        description: 'Key technical ideas behind modern AI systems',
        icon: 'ai-concepts',
        color: '#9B7EC8',
        order: 2,
    },
    // ─── AI Safety & Alignment ─────────────────────────────
    {
        id: 'alignment-fundamentals',
        domain: 'ai-safety',
        title: 'Alignment Fundamentals',
        description: 'Core concepts behind the challenge of aligning AI with human intent',
        icon: 'alignment',
        color: '#9B7EC8',
        order: 0,
    },
    {
        id: 'ai-risk',
        domain: 'ai-safety',
        title: 'AI Risk',
        description: 'Types of risk posed by advanced AI systems',
        icon: 'risk',
        color: '#C44D4D',
        order: 1,
    },
    {
        id: 'safety-techniques',
        domain: 'ai-safety',
        title: 'Safety Techniques',
        description: 'Methods and approaches for making AI systems safer',
        icon: 'safety',
        color: '#5A9E6F',
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
    // Alignment Fundamentals
    { id: 'alignment-fundamentals-beginner', topic: 'alignment-fundamentals', title: 'Beginner', difficulty: 'beginner', order: 0 },
    { id: 'alignment-fundamentals-amateur', topic: 'alignment-fundamentals', title: 'Amateur', difficulty: 'amateur', order: 1, comingSoon: true },
    { id: 'alignment-fundamentals-advanced', topic: 'alignment-fundamentals', title: 'Advanced', difficulty: 'advanced', order: 2, comingSoon: true },
    // AI Risk
    { id: 'ai-risk-beginner', topic: 'ai-risk', title: 'Beginner', difficulty: 'beginner', order: 0 },
    { id: 'ai-risk-amateur', topic: 'ai-risk', title: 'Amateur', difficulty: 'amateur', order: 1, comingSoon: true },
    { id: 'ai-risk-advanced', topic: 'ai-risk', title: 'Advanced', difficulty: 'advanced', order: 2, comingSoon: true },
    // Safety Techniques
    { id: 'safety-techniques-beginner', topic: 'safety-techniques', title: 'Beginner', difficulty: 'beginner', order: 0 },
    { id: 'safety-techniques-amateur', topic: 'safety-techniques', title: 'Amateur', difficulty: 'amateur', order: 1, comingSoon: true },
    { id: 'safety-techniques-advanced', topic: 'safety-techniques', title: 'Advanced', difficulty: 'advanced', order: 2, comingSoon: true },
];

// Difficulty badge colors
export const DIFFICULTY_COLORS = {
    beginner: '#A8C8D8',
    amateur: '#D4A04A',
    advanced: '#D4726A',
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
        subtitle: 'Training, inference, and the two classic learning paradigms',
        mood: 'There are different ways machines can learn\u2026',
        chapter: 'ai-concepts-beginner',
        topic: 'ai-concepts',
        isFoundational: true,
        cardIds: ['c301', 'c302', 'c303'],
    },
    {
        id: 'lesson-ai-concepts-b-1',
        number: 1,
        title: 'Modern AI Building Blocks',
        subtitle: 'Reinforcement learning, transformers, and fine-tuning',
        mood: 'These ideas power almost everything in modern AI\u2026',
        chapter: 'ai-concepts-beginner',
        topic: 'ai-concepts',
        isFoundational: false,
        cardIds: ['c304', 'c305', 'c306'],
    },

    // ─── Alignment Fundamentals / Beginner ────────────────
    {
        id: 'lesson-alignment-b-0',
        number: 0,
        title: 'The Alignment Challenge',
        subtitle: 'Why making AI do what we want is surprisingly hard',
        mood: 'The most important problem you\'ve never heard of\u2026',
        chapter: 'alignment-fundamentals-beginner',
        topic: 'alignment-fundamentals',
        isFoundational: true,
        cardIds: ['c401', 'c403', 'c406'],
    },
    {
        id: 'lesson-alignment-b-1',
        number: 1,
        title: 'Dangerous Tendencies',
        subtitle: 'Instrumental convergence, corrigibility, and mesa-optimization',
        mood: 'What happens when AI systems develop goals of their own?',
        chapter: 'alignment-fundamentals-beginner',
        topic: 'alignment-fundamentals',
        isFoundational: false,
        cardIds: ['c402', 'c404', 'c405'],
    },

    // ─── AI Risk / Beginner ───────────────────────────────
    {
        id: 'lesson-risk-b-0',
        number: 0,
        title: 'Why AI Risk Matters',
        subtitle: 'Existential risk, catastrophe, and what could go wrong',
        mood: 'Let\'s talk about what keeps AI researchers up at night\u2026',
        chapter: 'ai-risk-beginner',
        topic: 'ai-risk',
        isFoundational: true,
        cardIds: ['c501', 'c506', 'c504'],
    },
    {
        id: 'lesson-risk-b-1',
        number: 1,
        title: 'How Things Go Wrong',
        subtitle: 'Misuse, deception, and power-seeking',
        mood: 'The failure modes that matter most\u2026',
        chapter: 'ai-risk-beginner',
        topic: 'ai-risk',
        isFoundational: false,
        cardIds: ['c502', 'c503', 'c505'],
    },

    // ─── Safety Techniques / Beginner ─────────────────────
    {
        id: 'lesson-safety-b-0',
        number: 0,
        title: 'Training AI to Be Safe',
        subtitle: 'RLHF, constitutional AI, and red teaming',
        mood: 'How do we actually make AI systems behave?',
        chapter: 'safety-techniques-beginner',
        topic: 'safety-techniques',
        isFoundational: true,
        cardIds: ['c601', 'c602', 'c604'],
    },
    {
        id: 'lesson-safety-b-1',
        number: 1,
        title: 'Keeping Control',
        subtitle: 'Interpretability, oversight, and governance',
        mood: 'The tools and institutions for a safer AI future\u2026',
        chapter: 'safety-techniques-beginner',
        topic: 'safety-techniques',
        isFoundational: false,
        cardIds: ['c603', 'c605', 'c606'],
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
