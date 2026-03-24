// ─── AI Safety Domains, Topics, Chapters & Lessons ─────────
// 4-level hierarchy: Domain → Topic → Chapter → Lesson

// ─── Domains (top-level tabs) ───────────────────────────────
export const DOMAINS = [
    {
        id: 'foundations',
        title: 'Foundations of AI',
        description: 'Core concepts behind modern AI systems',
        icon: 'foundations',
        color: '#8CB564',
        order: 0,
    },
    {
        id: 'governance',
        title: 'Governance',
        description: 'Policy, regulation, and international coordination',
        icon: 'governance',
        color: '#7CBFB5',
        order: 1,
    },
    {
        id: 'ai-safety',
        title: 'AI Safety',
        description: 'Alignment, interpretability, and risk mitigation',
        icon: 'ai-safety',
        color: '#B99EDB',
        order: 2,
    },
    {
        id: 'ml4g',
        title: 'ML for Good',
        description: 'Companion learning path for the ML4G course',
        icon: 'ai-basics',
        color: '#4CAF50',
        order: 99,
        courseOnly: 'ml4g', // only visible when this course mode is active
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
    {
        id: 'advanced-ai',
        domain: 'foundations',
        title: 'Advanced AI',
        description: 'AGI, superintelligence, and the frontier of AI capabilities',
        icon: 'advanced-ai',
        color: '#D4726A',
        order: 3,
    },
    // ─── AI Safety & Alignment ─────────────────────────────
    {
        id: 'ai-security',
        domain: 'ai-safety',
        title: 'AI Security',
        description: 'Robustness, adversarial attacks, and practical AI failure modes',
        icon: 'ai-security',
        color: '#C44D4D',
        order: 3,
    },
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
    // ─── Governance ──────────────────────────────────────
    {
        id: 'ai-ethics',
        domain: 'governance',
        title: 'AI Ethics',
        description: 'Fairness, bias, transparency, and accountability in AI',
        icon: 'ethics',
        color: '#5A9E6F',
        order: 0,
    },
    {
        id: 'global-ai-policy',
        domain: 'governance',
        title: 'Global AI Policy',
        description: 'Regulation, international coordination, and policy debates',
        icon: 'policy',
        color: '#7BA3CC',
        order: 1,
    },
    // ─── AI Capabilities (ML4G course-only) ────────────────
    {
        id: 'ai-capabilities',
        domain: 'ml4g',
        title: 'AI Capabilities',
        description: 'What AI systems can do today, the foundation model paradigm, and how capabilities are built',
        icon: 'ai-progress',
        color: '#2563EB',
        order: 1,
    },
    // ─── ML for Good (course-only) ───────────────────────────
    {
        id: 'ml4g-overview',
        domain: 'ml4g',
        title: 'ML4G Overview',
        description: 'Introduction to the ML for Good curriculum',
        icon: 'ai-basics',
        color: '#4CAF50',
        order: 0,
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
    // Advanced AI
    { id: 'advanced-ai-beginner', topic: 'advanced-ai', title: 'Beginner', difficulty: 'beginner', order: 0 },
    { id: 'advanced-ai-amateur', topic: 'advanced-ai', title: 'Amateur', difficulty: 'amateur', order: 1, comingSoon: true },
    { id: 'advanced-ai-advanced', topic: 'advanced-ai', title: 'Advanced', difficulty: 'advanced', order: 2, comingSoon: true },
    // AI Security
    { id: 'ai-security-beginner', topic: 'ai-security', title: 'Beginner', difficulty: 'beginner', order: 0 },
    { id: 'ai-security-amateur', topic: 'ai-security', title: 'Amateur', difficulty: 'amateur', order: 1, comingSoon: true },
    { id: 'ai-security-advanced', topic: 'ai-security', title: 'Advanced', difficulty: 'advanced', order: 2, comingSoon: true },
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
    // AI Ethics
    { id: 'ai-ethics-beginner', topic: 'ai-ethics', title: 'Beginner', difficulty: 'beginner', order: 0 },
    { id: 'ai-ethics-amateur', topic: 'ai-ethics', title: 'Amateur', difficulty: 'amateur', order: 1, comingSoon: true },
    { id: 'ai-ethics-advanced', topic: 'ai-ethics', title: 'Advanced', difficulty: 'advanced', order: 2, comingSoon: true },
    // Global AI Policy
    { id: 'global-ai-policy-beginner', topic: 'global-ai-policy', title: 'Beginner', difficulty: 'beginner', order: 0 },
    { id: 'global-ai-policy-amateur', topic: 'global-ai-policy', title: 'Amateur', difficulty: 'amateur', order: 1, comingSoon: true },
    { id: 'global-ai-policy-advanced', topic: 'global-ai-policy', title: 'Advanced', difficulty: 'advanced', order: 2, comingSoon: true },
    // AI Capabilities
    { id: 'ai-capabilities-current', topic: 'ai-capabilities', title: 'Current Capabilities', difficulty: 'beginner', order: 0 },
    { id: 'ai-capabilities-foundation', topic: 'ai-capabilities', title: 'Foundation Models', difficulty: 'beginner', order: 1 },
    { id: 'ai-capabilities-defining-agi', topic: 'ai-capabilities', title: 'Defining & Measuring AGI', difficulty: 'amateur', order: 2 },
    { id: 'ai-capabilities-scale', topic: 'ai-capabilities', title: 'Leveraging Scale', difficulty: 'amateur', order: 3 },
    { id: 'ai-capabilities-forecasting', topic: 'ai-capabilities', title: 'Forecasting Timelines', difficulty: 'advanced', order: 4 },
    { id: 'ai-capabilities-takeoff', topic: 'ai-capabilities', title: 'Takeoff', difficulty: 'advanced', order: 5 },
    // ML for Good (course-only)
    { id: 'ml4g-overview-beginner', topic: 'ml4g-overview', title: 'Beginner', difficulty: 'beginner', order: 0 },
];

// Difficulty badge colors — single source of truth
// Uses CSS variable names; call getComputedStyle() or use var() in JSX.
// For inline JS styles where var() doesn't work, these hardcoded fallbacks
// match the CSS variables --color-diff-beginner / amateur / advanced.
export const DIFFICULTY_COLORS = {
    beginner: 'var(--color-diff-beginner)',
    amateur: 'var(--color-diff-amateur)',
    advanced: 'var(--color-diff-advanced)',
};

export const DIFFICULTY_BG_COLORS = {
    beginner: 'var(--color-diff-beginner-bg)',
    amateur: 'var(--color-diff-amateur-bg)',
    advanced: 'var(--color-diff-advanced-bg)',
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

    // ─── Advanced AI / Beginner ─────────────────────────────
    {
        id: 'lesson-advanced-ai-b-0',
        number: 0,
        title: 'The Intelligence Spectrum',
        subtitle: 'From narrow AI to AGI and superintelligence',
        mood: 'How smart could AI get?',
        chapter: 'advanced-ai-beginner',
        topic: 'advanced-ai',
        isFoundational: true,
        cardIds: ['c207', 'c209', 'c208'],
    },
    {
        id: 'lesson-advanced-ai-b-1',
        number: 1,
        title: 'The Cutting Edge',
        subtitle: 'AI agents, frontier models, and the role of compute',
        mood: 'What defines the most capable AI systems today?',
        chapter: 'advanced-ai-beginner',
        topic: 'advanced-ai',
        isFoundational: false,
        cardIds: ['c210', 'c211', 'c212'],
    },

    // ─── AI Security / Beginner ───────────────────────────────
    {
        id: 'lesson-security-b-0',
        number: 0,
        title: 'When AI Breaks',
        subtitle: 'Robustness, hallucination, and distribution shift',
        mood: 'AI systems fail in ways you might not expect\u2026',
        chapter: 'ai-security-beginner',
        topic: 'ai-security',
        isFoundational: true,
        cardIds: ['c901', 'c902', 'c906'],
    },
    {
        id: 'lesson-security-b-1',
        number: 1,
        title: 'Attacking AI',
        subtitle: 'Adversarial examples, prompt injection, and jailbreaking',
        mood: 'How do you break an AI on purpose?',
        chapter: 'ai-security-beginner',
        topic: 'ai-security',
        isFoundational: false,
        cardIds: ['c903', 'c904', 'c905'],
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

    // ─── AI Ethics / Beginner ───────────────────────────
    {
        id: 'lesson-ethics-b-0',
        number: 0,
        title: 'The Ethics of AI',
        subtitle: 'Bias, fairness, and why AI ethics matters',
        mood: 'AI works as designed — but is the design fair?',
        chapter: 'ai-ethics-beginner',
        topic: 'ai-ethics',
        isFoundational: true,
        cardIds: ['c701', 'c702', 'c703'],
    },
    {
        id: 'lesson-ethics-b-1',
        number: 1,
        title: 'Structural Risks',
        subtitle: 'Power concentration, race dynamics, and value lock-in',
        mood: 'The risks that don\'t come from the AI itself\u2026',
        chapter: 'ai-ethics-beginner',
        topic: 'ai-ethics',
        isFoundational: false,
        cardIds: ['c704', 'c705', 'c706'],
    },

    // ─── Global AI Policy / Beginner ────────────────────
    {
        id: 'lesson-policy-b-0',
        number: 0,
        title: 'Governing AI',
        subtitle: 'Regulation, the EU AI Act, and open vs. closed models',
        mood: 'The rules of the road for the AI age\u2026',
        chapter: 'global-ai-policy-beginner',
        topic: 'global-ai-policy',
        isFoundational: true,
        cardIds: ['c801', 'c802', 'c806'],
    },
    {
        id: 'lesson-policy-b-1',
        number: 1,
        title: 'Safety Beyond Labs',
        subtitle: 'Responsible scaling, safety institutes, and global coordination',
        mood: 'Can the world agree on how to govern AI?',
        chapter: 'global-ai-policy-beginner',
        topic: 'global-ai-policy',
        isFoundational: false,
        cardIds: ['c803', 'c804', 'c805'],
    },

    // ─── AI Capabilities / Current Capabilities ──────────────
    {
        id: 'lesson-ai-capabilities-cc-0',
        number: 0,
        title: 'AI Capabilities',
        subtitle: 'The expanding frontier of what AI systems can do',
        mood: 'Let\u2019s map the territory before diving in\u2026',
        chapter: 'ai-capabilities-current',
        topic: 'ai-capabilities',
        isFoundational: true,
        cardIds: ['c1001'],
    },
    {
        id: 'lesson-ai-capabilities-cc-1',
        number: 1,
        title: 'Reasoning & Tools',
        subtitle: 'How modern AI thinks longer and reaches for external help',
        mood: 'AI is learning to think \u2014 and to ask for a calculator.',
        chapter: 'ai-capabilities-current',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c1004', 'c1002', 'c1003'],
    },
    {
        id: 'lesson-ai-capabilities-cc-2',
        number: 2,
        title: 'Vision & Media',
        subtitle: 'From grainy fakes to photorealistic generation across modalities',
        mood: 'Seeing is no longer believing.',
        chapter: 'ai-capabilities-current',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c1005', 'c1006'],
    },
    {
        id: 'lesson-ai-capabilities-cc-3',
        number: 3,
        title: 'Machine Self-Knowledge',
        subtitle: 'When AI systems start to understand themselves',
        mood: 'What does the machine know about itself?',
        chapter: 'ai-capabilities-current',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c1007', 'c1008', 'c1009'],
    },

    // ─── AI Capabilities / Foundation Models ────────────────
    {
        id: 'lesson-ai-capabilities-fm-0',
        number: 4,
        title: 'The Paradigm Shift',
        subtitle: 'From specialized models to general-purpose foundations',
        mood: 'One model to power them all.',
        chapter: 'ai-capabilities-foundation',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c201', 'c202', 'c211'],
    },
    {
        id: 'lesson-ai-capabilities-fm-1',
        number: 5,
        title: 'Learning From Raw Data',
        subtitle: 'How foundation models learn without human labels',
        mood: 'The secret ingredient: let the data teach itself.',
        chapter: 'ai-capabilities-foundation',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c1011', 'c1012'],
    },
    {
        id: 'lesson-ai-capabilities-fm-2',
        number: 6,
        title: 'Specialization',
        subtitle: 'From general knowledge to specific skills and safety',
        mood: 'Raw power meets careful guidance.',
        chapter: 'ai-capabilities-foundation',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c306', 'c601'],
    },
    {
        id: 'lesson-ai-capabilities-fm-3',
        number: 7,
        title: 'Adaptation & Transfer',
        subtitle: 'How models apply old knowledge to new problems',
        mood: 'Knowledge doesn\u2019t stay where you put it.',
        chapter: 'ai-capabilities-foundation',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c1016', 'c1014', 'c1015'],
    },

    // ── Chapter 3: Defining & Measuring AGI ──────────────────────
    {
        id: 'lesson-ai-capabilities-agi-0',
        number: 8,
        title: 'Tests of Intelligence',
        subtitle: 'Historical attempts to define what it means for a machine to "think"',
        mood: 'Philosophers and computer scientists have been arguing about this since 1950.',
        chapter: 'ai-capabilities-defining-agi',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c1041', 'c1017'],
    },
    {
        id: 'lesson-ai-capabilities-agi-1',
        number: 9,
        title: 'The AI Spectrum',
        subtitle: 'From narrow tools to superintelligent systems — and everything between',
        mood: 'It\u2019s not a switch that flips. It\u2019s a dial.',
        chapter: 'ai-capabilities-defining-agi',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c209', 'c207', 'c1045', 'c208'],
    },
    {
        id: 'lesson-ai-capabilities-agi-2',
        number: 10,
        title: 'Measuring Intelligence',
        subtitle: 'Frameworks for tracking AI progress with precision',
        mood: 'If you can\u2019t measure it, you can\u2019t plan for it.',
        chapter: 'ai-capabilities-defining-agi',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c1020', 'c1021', 'c1022'],
    },

    // ── Chapter 4: Leveraging Scale ──────────────────────────────
    {
        id: 'lesson-ai-capabilities-scale-0',
        number: 11,
        title: 'The Scaling Engine',
        subtitle: 'What fuels AI improvement: compute, data, and synthetic alternatives',
        mood: 'Three inputs, one exponential output.',
        chapter: 'ai-capabilities-scale',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c1023', 'c1024', 'c1025'],
    },
    {
        id: 'lesson-ai-capabilities-scale-1',
        number: 12,
        title: 'Scaling Trends',
        subtitle: 'The empirical patterns driving AI progress',
        mood: 'The numbers have been eerily consistent.',
        chapter: 'ai-capabilities-scale',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c203', 'c1026', 'c1027'],
    },
    {
        id: 'lesson-ai-capabilities-scale-2',
        number: 13,
        title: 'The Scale Debate',
        subtitle: 'Will bigger models be enough, or do we need new ideas?',
        mood: 'Billions of dollars ride on this question.',
        chapter: 'ai-capabilities-scale',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c1028', 'c1029'],
    },
    {
        id: 'lesson-ai-capabilities-scale-3',
        number: 14,
        title: 'Beyond Raw Scale',
        subtitle: 'Unlocking latent capability through post-training techniques',
        mood: 'The model is smarter than its benchmark score suggests.',
        chapter: 'ai-capabilities-scale',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c1030', 'c1002'],
    },

    // ── Chapter 5: Forecasting Timelines ─────────────────────────
    {
        id: 'lesson-ai-capabilities-forecast-0',
        number: 15,
        title: 'AI Benchmarks',
        subtitle: 'The standard tests measuring what AI systems can do',
        mood: 'Scorecards for the most consequential technology race in history.',
        chapter: 'ai-capabilities-forecasting',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c1031', 'c1032', 'c1033'],
    },
    {
        id: 'lesson-ai-capabilities-forecast-1',
        number: 16,
        title: 'Frontier Evaluations',
        subtitle: 'The hardest tests designed to stay ahead of AI progress',
        mood: 'What happens when the easy tests run out?',
        chapter: 'ai-capabilities-forecasting',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c1034', 'c1035', 'c1036'],
    },
    {
        id: 'lesson-ai-capabilities-forecast-2',
        number: 17,
        title: 'Predicting Progress',
        subtitle: 'Frameworks and constraints for forecasting AI timelines',
        mood: 'All models are wrong, but some are useful.',
        chapter: 'ai-capabilities-forecasting',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c1037', 'c1038', 'c1039'],
    },

    // ── Chapter 6: Takeoff ───────────────────────────────────────
    {
        id: 'lesson-ai-capabilities-takeoff-0',
        number: 18,
        title: 'Takeoff Scenarios',
        subtitle: 'Gradual improvement or explosive transformation?',
        mood: 'The speed of the change determines which safety strategies even work.',
        chapter: 'ai-capabilities-takeoff',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c1044', 'c1040'],
    },
    {
        id: 'lesson-ai-capabilities-takeoff-1',
        number: 19,
        title: 'Recursive Improvement',
        subtitle: 'When AI starts improving AI',
        mood: 'The feedback loop that keeps safety researchers up at night.',
        chapter: 'ai-capabilities-takeoff',
        topic: 'ai-capabilities',
        isFoundational: false,
        cardIds: ['c1042', 'c1043'],
    },

    // ─── ML for Good / Overview / Beginner ───────────────────
    {
        id: 'lesson-ml4g-overview-b-0',
        number: 0,
        title: 'Welcome to ML for Good',
        subtitle: 'Your companion guide to the ML4G course',
        mood: 'Let\u2019s explore how ML can be a force for good\u2026',
        chapter: 'ml4g-overview-beginner',
        topic: 'ml4g-overview',
        isFoundational: true,
        cardIds: ['c101', 'c102', 'c103'], // reuses existing cards as placeholder
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
