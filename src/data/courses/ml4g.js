/**
 * ML for Good (ML4G) course definition.
 *
 * This is the single source of truth for everything ML4G-specific:
 * topic/chapter/lesson structure, and optional card overrides.
 *
 * Structure mirrors the General view hierarchy:
 *   topics → chapters → lessons
 *
 * Lessons reference existing card IDs from the main card registry —
 * no card duplication. If a course needs a card that doesn't exist,
 * create it in the main registry first.
 */

export const ml4gCourse = {
    id: 'ml4g',
    name: 'ML for Good',
    description: 'A companion mode for the ML for Good course. Lessons and cards are tailored to the ML4G curriculum.',

    // Course content organized into topics → chapters → lessons
    topics: [
        {
            id: 'ml4g-topic-intro',
            title: 'Introduction to AI Safety',
            subtitle: 'Core concepts and why AI safety matters',
            icon: 'foundations',
            color: '#8CB564',
            chapters: [
                {
                    id: 'ml4g-ch-intro',
                    title: 'Getting Started',
                    icon: 'foundations',
                    color: '#8CB564',
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
            ],
        },
        {
            id: 'ml4g-topic-capabilities',
            title: 'AI Capabilities',
            subtitle: 'What AI systems can do today, the foundation model paradigm, and how capabilities are built',
            icon: 'ai-progress',
            color: '#2563EB',
            chapters: [
                {
                    id: 'ml4g-ch-current',
                    title: 'Current Capabilities',
                    icon: 'advanced-ai',
                    color: '#3B82F6',
                    lessons: [
                        {
                            id: 'ml4g-L03',
                            title: 'The AI Landscape',
                            subtitle: 'Mapping what modern AI can do',
                            mood: 'Let\u2019s map the territory before diving in\u2026',
                            cardIds: ['c1001'],
                        },
                        {
                            id: 'ml4g-L04',
                            title: 'Reasoning & Tools',
                            subtitle: 'How modern AI thinks longer and reaches for external help',
                            mood: 'AI is learning to think \u2014 and to ask for a calculator.',
                            cardIds: ['c1004', 'c1002', 'c1003'],
                        },
                        {
                            id: 'ml4g-L05',
                            title: 'Vision & Media',
                            subtitle: 'From grainy fakes to photorealistic generation across modalities',
                            mood: 'Seeing is no longer believing.',
                            cardIds: ['c1005', 'c1006'],
                        },
                        {
                            id: 'ml4g-L06',
                            title: 'Machine Self-Knowledge',
                            subtitle: 'When AI systems start to understand themselves',
                            mood: 'What does the machine know about itself?',
                            cardIds: ['c1007', 'c1008', 'c1009'],
                        },
                    ],
                },
                {
                    id: 'ml4g-ch-foundation',
                    title: 'Foundation Models',
                    icon: 'layers',
                    color: '#2BA89E',
                    lessons: [
                        {
                            id: 'ml4g-L07',
                            title: 'The Paradigm Shift',
                            subtitle: 'From specialized models to general-purpose foundations',
                            mood: 'One model to power them all.',
                            cardIds: ['c201', 'c202', 'c211'],
                        },
                        {
                            id: 'ml4g-L08',
                            title: 'Learning From Raw Data',
                            subtitle: 'How foundation models learn without human labels',
                            mood: 'The secret ingredient: let the data teach itself.',
                            cardIds: ['c1011', 'c1012'],
                        },
                        {
                            id: 'ml4g-L09',
                            title: 'Specialization',
                            subtitle: 'From general knowledge to specific skills and safety',
                            mood: 'Raw power meets careful guidance.',
                            cardIds: ['c306', 'c601'],
                        },
                        {
                            id: 'ml4g-L10',
                            title: 'Adaptation & Transfer',
                            subtitle: 'How models apply old knowledge to new problems',
                            mood: 'Knowledge doesn\u2019t stay where you put it.',
                            cardIds: ['c1016', 'c1014', 'c1015'],
                        },
                    ],
                },
                {
                    id: 'ml4g-ch-agi',
                    title: 'Defining & Measuring AGI',
                    icon: 'ai-concepts',
                    color: '#8B5CF6',
                    lessons: [
                        {
                            id: 'ml4g-L11',
                            title: 'Tests of Intelligence',
                            subtitle: 'Historical attempts to define what it means for a machine to "think"',
                            mood: 'Philosophers and computer scientists have been arguing about this since 1950.',
                            cardIds: ['c1041', 'c1017'],
                        },
                        {
                            id: 'ml4g-L12',
                            title: 'The AI Spectrum',
                            subtitle: 'From narrow tools to superintelligent systems \u2014 and everything between',
                            mood: 'It\u2019s not a switch that flips. It\u2019s a dial.',
                            cardIds: ['c209', 'c207', 'c1045', 'c208'],
                        },
                        {
                            id: 'ml4g-L13',
                            title: 'Measuring Intelligence',
                            subtitle: 'Frameworks for tracking AI progress with precision',
                            mood: 'If you can\u2019t measure it, you can\u2019t plan for it.',
                            cardIds: ['c1020', 'c1021', 'c1022'],
                        },
                    ],
                },
                {
                    id: 'ml4g-ch-scale',
                    title: 'Leveraging Scale',
                    icon: 'ai-progress',
                    color: '#D4A026',
                    lessons: [
                        {
                            id: 'ml4g-L14',
                            title: 'The Scaling Engine',
                            subtitle: 'What fuels AI improvement: compute, data, and synthetic alternatives',
                            mood: 'Three inputs, one exponential output.',
                            cardIds: ['c1023', 'c1024', 'c1025'],
                        },
                        {
                            id: 'ml4g-L15',
                            title: 'Scaling Trends',
                            subtitle: 'The empirical patterns driving AI progress',
                            mood: 'The numbers have been eerily consistent.',
                            cardIds: ['c203', 'c1026', 'c1027'],
                        },
                        {
                            id: 'ml4g-L16',
                            title: 'The Scale Debate',
                            subtitle: 'Will bigger models be enough, or do we need new ideas?',
                            mood: 'Billions of dollars ride on this question.',
                            cardIds: ['c1028', 'c1029'],
                        },
                        {
                            id: 'ml4g-L17',
                            title: 'Beyond Raw Scale',
                            subtitle: 'Unlocking latent capability through post-training techniques',
                            mood: 'The model is smarter than its benchmark score suggests.',
                            cardIds: ['c1030', 'c1002'],
                        },
                    ],
                },
                {
                    id: 'ml4g-ch-forecasting',
                    title: 'Forecasting Timelines',
                    icon: 'calendar',
                    color: '#EC4899',
                    lessons: [
                        {
                            id: 'ml4g-L18',
                            title: 'AI Benchmarks',
                            subtitle: 'The standard tests measuring what AI systems can do',
                            mood: 'Scorecards for the most consequential technology race in history.',
                            cardIds: ['c1031', 'c1032', 'c1033'],
                        },
                        {
                            id: 'ml4g-L19',
                            title: 'Frontier Evaluations',
                            subtitle: 'The hardest tests designed to stay ahead of AI progress',
                            mood: 'What happens when the easy tests run out?',
                            cardIds: ['c1034', 'c1035', 'c1036'],
                        },
                        {
                            id: 'ml4g-L20',
                            title: 'Predicting Progress',
                            subtitle: 'Frameworks and constraints for forecasting AI timelines',
                            mood: 'All models are wrong, but some are useful.',
                            cardIds: ['c1037', 'c1038', 'c1039'],
                        },
                    ],
                },
                {
                    id: 'ml4g-ch-takeoff',
                    title: 'Takeoff',
                    icon: 'zap',
                    color: '#EF4444',
                    lessons: [
                        {
                            id: 'ml4g-L21',
                            title: 'Takeoff Scenarios',
                            subtitle: 'Gradual improvement or explosive transformation?',
                            mood: 'The speed of the change determines which safety strategies even work.',
                            cardIds: ['c1044', 'c1040'],
                        },
                        {
                            id: 'ml4g-L22',
                            title: 'Recursive Improvement',
                            subtitle: 'When AI starts improving AI',
                            mood: 'The feedback loop that keeps safety researchers up at night.',
                            cardIds: ['c1042', 'c1043'],
                        },
                    ],
                },
            ],
        },
        {
            id: 'ml4g-topic-alignment',
            title: 'Alignment Fundamentals',
            subtitle: 'Understanding the alignment problem and safety techniques',
            icon: 'alignment',
            color: '#9333EA',
            chapters: [
                {
                    id: 'ml4g-ch-alignment',
                    title: 'Core Alignment',
                    icon: 'alignment',
                    color: '#9333EA',
                    lessons: [
                        {
                            id: 'ml4g-L23',
                            title: 'The Alignment Problem',
                            subtitle: 'Why aligning AI with human values is hard',
                            mood: 'thinking',
                            cardIds: ['c401', 'c403'],
                        },
                        {
                            id: 'ml4g-L24',
                            title: 'Safety Techniques',
                            subtitle: 'Tools for making AI safer',
                            mood: 'determined',
                            cardIds: ['c601', 'c602'],
                        },
                    ],
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
