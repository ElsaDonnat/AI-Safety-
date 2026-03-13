// ─── AI Safety Concepts ─────────────────────────────────────
// Each concept teaches one AI safety idea.

const CORE_CONCEPTS = [
    {
        id: 'c1',
        title: 'Value Alignment',
        summary: 'Ensuring AI systems pursue goals aligned with human values',
        description: 'Value alignment is the challenge of building AI systems whose goals and behaviors are aligned with human values and intentions. As AI systems become more capable, ensuring they do what we actually want becomes increasingly critical.',
        quizDescription: 'The challenge of ensuring AI systems pursue goals that match human values and intentions.',
        topic: 'alignment',
        secondaryTopic: null,
        category: 'alignment',
        difficulty: 1,
        tags: ['alignment-problem', 'agi', 'corrigibility'],
        linkedCards: ['c2', 'c5'],
        importance: 1,
        isFoundational: true,
    },
    {
        id: 'c2',
        title: 'Reinforcement Learning from Human Feedback',
        summary: 'Training AI using human preferences to guide behavior',
        description: 'RLHF is a technique where AI models are fine-tuned using human feedback as a reward signal. Human evaluators rank model outputs, and this ranking data trains a reward model that guides further training.',
        quizDescription: 'A training technique that uses human preference rankings to fine-tune AI model behavior.',
        topic: 'alignment',
        secondaryTopic: 'technical',
        category: 'technical',
        difficulty: 2,
        tags: ['rlhf', 'training', 'reward-model'],
        linkedCards: ['c1'],
        importance: 2,
        isFoundational: false,
    },
    {
        id: 'c3',
        title: 'Mechanistic Interpretability',
        summary: 'Understanding the internal workings of neural networks',
        description: 'Mechanistic interpretability aims to reverse-engineer neural networks to understand how they process information internally. By identifying circuits and features within models, researchers hope to verify that AI systems are reasoning safely.',
        quizDescription: 'The field of reverse-engineering neural networks to understand their internal computations and reasoning.',
        topic: 'interpretability',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 2,
        tags: ['interpretability', 'circuits', 'features', 'transparency'],
        linkedCards: ['c4'],
        importance: 1,
        isFoundational: true,
    },
    {
        id: 'c4',
        title: 'Superposition in Neural Networks',
        summary: 'How neural networks encode more features than they have dimensions',
        description: 'Superposition is the phenomenon where neural networks represent more concepts than they have neurons by encoding features in overlapping patterns. Understanding superposition is key to mechanistic interpretability.',
        quizDescription: 'The phenomenon where neural networks encode more features than their dimensionality would seem to allow.',
        topic: 'interpretability',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 3,
        tags: ['superposition', 'features', 'polysemanticity'],
        linkedCards: ['c3'],
        importance: 2,
        isFoundational: false,
    },
    {
        id: 'c5',
        title: 'AI Governance and Regulation',
        summary: 'Policy frameworks for managing AI development and deployment',
        description: 'AI governance encompasses the policies, regulations, and institutional frameworks designed to manage the development and deployment of AI systems. This includes efforts like the EU AI Act, voluntary commitments, and international coordination.',
        quizDescription: 'The policies, regulations, and frameworks designed to manage AI development and deployment safely.',
        topic: 'governance',
        secondaryTopic: null,
        category: 'policy',
        difficulty: 1,
        tags: ['regulation', 'eu-ai-act', 'governance', 'international'],
        linkedCards: ['c1'],
        importance: 1,
        isFoundational: true,
    },
];

export const ALL_CONCEPTS = [...CORE_CONCEPTS];
export const CORE_CONCEPT_COUNT = CORE_CONCEPTS.length;

// ─── Categories ─────────────────────────────────────────────
// Edit this array to add, remove, or reorder categories.
// Each concept's `category` field should match one of these IDs.
export const CATEGORIES = [
    { id: 'technical', label: 'Technical', color: '#0D9488', icon: 'gear' },
    { id: 'alignment', label: 'Alignment', color: '#7C3AED', icon: 'compass' },
    { id: 'policy', label: 'Policy', color: '#2563EB', icon: 'building' },
    { id: 'ethics', label: 'Ethics', color: '#059669', icon: 'heart' },
    { id: 'risks', label: 'Risks', color: '#DC2626', icon: 'warning' },
];

// Derived lookup — components use this for quick access by ID.
// Do NOT edit this directly; edit CATEGORIES above instead.
export const CATEGORY_CONFIG = Object.fromEntries(
    CATEGORIES.map(cat => [cat.id, cat])
);

export function getConceptById(id) {
    return ALL_CONCEPTS.find(c => c.id === id) || null;
}

export function getConceptsByIds(ids) {
    return ids.map(id => ALL_CONCEPTS.find(c => c.id === id)).filter(Boolean);
}

export function getConceptsByTopic(topic) {
    return ALL_CONCEPTS.filter(c => c.topic === topic || c.secondaryTopic === topic);
}

export function getConceptsByTag(tag) {
    return ALL_CONCEPTS.filter(c => c.tags.includes(tag));
}
