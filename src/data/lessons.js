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
    },
    {
        id: 'ai-safety',
        title: 'AI Safety',
        description: 'Alignment, interpretability, and risk mitigation',
        icon: 'ai-safety',
        color: '#B99EDB',
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
    // ─── Governance Topics ────────────────────────────────────
    {
        id: 'ai-regulation',
        domain: 'governance',
        title: 'AI Regulation',
        description: 'How governments create and enforce rules for AI',
        icon: 'ai-regulation',
        color: '#7BA3CC',
        order: 0,
    },
    {
        id: 'global-ai-governance',
        domain: 'governance',
        title: 'Global AI Governance',
        description: 'International coordination on AI policy and standards',
        icon: 'global-governance',
        color: '#5A9E6F',
        order: 1,
    },
    {
        id: 'accountability-oversight',
        domain: 'governance',
        title: 'Accountability & Oversight',
        description: 'Mechanisms for holding AI systems and developers accountable',
        icon: 'accountability',
        color: '#D4A04A',
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
    // AI Regulation
    { id: 'ai-regulation-beginner', topic: 'ai-regulation', title: 'Beginner', difficulty: 'beginner', order: 0 },
    { id: 'ai-regulation-amateur', topic: 'ai-regulation', title: 'Amateur', difficulty: 'amateur', order: 1, comingSoon: true },
    { id: 'ai-regulation-advanced', topic: 'ai-regulation', title: 'Advanced', difficulty: 'advanced', order: 2, comingSoon: true },
    // Global AI Governance
    { id: 'global-ai-governance-beginner', topic: 'global-ai-governance', title: 'Beginner', difficulty: 'beginner', order: 0 },
    { id: 'global-ai-governance-amateur', topic: 'global-ai-governance', title: 'Amateur', difficulty: 'amateur', order: 1, comingSoon: true },
    { id: 'global-ai-governance-advanced', topic: 'global-ai-governance', title: 'Advanced', difficulty: 'advanced', order: 2, comingSoon: true },
    // Accountability & Oversight
    { id: 'accountability-oversight-beginner', topic: 'accountability-oversight', title: 'Beginner', difficulty: 'beginner', order: 0 },
    { id: 'accountability-oversight-amateur', topic: 'accountability-oversight', title: 'Amateur', difficulty: 'amateur', order: 1, comingSoon: true },
    { id: 'accountability-oversight-advanced', topic: 'accountability-oversight', title: 'Advanced', difficulty: 'advanced', order: 2, comingSoon: true },
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

    // ─── AI Regulation / Beginner ─────────────────────────────
    {
        id: 'lesson-ai-regulation-b-0',
        number: 0,
        title: 'Rules for AI',
        subtitle: 'Why we regulate AI, risk tiers, and the EU AI Act',
        mood: 'AI is powerful. Who makes the rules?',
        chapter: 'ai-regulation-beginner',
        topic: 'ai-regulation',
        isFoundational: true,
        cardIds: ['c701', 'c702', 'c703'],
    },
    {
        id: 'lesson-ai-regulation-b-1',
        number: 1,
        title: 'Regulation in Practice',
        subtitle: 'Impact assessments, sandboxes, and enforcement',
        mood: 'How do you actually enforce AI rules?',
        chapter: 'ai-regulation-beginner',
        topic: 'ai-regulation',
        isFoundational: false,
        cardIds: ['c704', 'c705', 'c706'],
    },

    // ─── Global AI Governance / Beginner ──────────────────────
    {
        id: 'lesson-global-ai-governance-b-0',
        number: 0,
        title: 'The Global Challenge',
        subtitle: 'International summits, standards, and cooperation',
        mood: 'AI doesn\u2019t stop at borders\u2026',
        chapter: 'global-ai-governance-beginner',
        topic: 'global-ai-governance',
        isFoundational: true,
        cardIds: ['c801', 'c802', 'c803'],
    },
    {
        id: 'lesson-global-ai-governance-b-1',
        number: 1,
        title: 'Governing the Frontier',
        subtitle: 'Compute controls, commitments, and inclusive policy',
        mood: 'How do you govern what doesn\u2019t exist yet?',
        chapter: 'global-ai-governance-beginner',
        topic: 'global-ai-governance',
        isFoundational: false,
        cardIds: ['c804', 'c805', 'c806'],
    },

    // ─── Accountability & Oversight / Beginner ────────────────
    {
        id: 'lesson-accountability-oversight-b-0',
        number: 0,
        title: 'Who\u2019s Responsible?',
        subtitle: 'Accountability, auditing, and transparency',
        mood: 'When AI gets it wrong, who answers?',
        chapter: 'accountability-oversight-beginner',
        topic: 'accountability-oversight',
        isFoundational: true,
        cardIds: ['c901', 'c902', 'c903'],
    },
    {
        id: 'lesson-accountability-oversight-b-1',
        number: 1,
        title: 'Keeping AI in Check',
        subtitle: 'Liability, monitoring, and protections',
        mood: 'Trust, but verify\u2026',
        chapter: 'accountability-oversight-beginner',
        topic: 'accountability-oversight',
        isFoundational: false,
        cardIds: ['c904', 'c905', 'c906'],
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
