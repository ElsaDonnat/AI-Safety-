// ─── AI Safety Concepts ─────────────────────────────────────
// Each concept teaches one idea. Cards are vocabulary-style: brief description
// plus related concepts with relationship descriptions.

const CORE_CONCEPTS = [
    // ─── AI Basics / Beginner ───────────────────────────────
    {
        id: 'c101',
        title: 'Artificial Intelligence',
        summary: 'Machines that can perform tasks normally requiring human intelligence',
        description: 'Artificial intelligence (AI) is the broad field of building machines that can perform tasks typically requiring human cognition — such as recognizing images, understanding language, or making decisions. AI ranges from narrow systems that excel at one task to the aspirational goal of general-purpose intelligence.',
        quizDescription: 'The field of building machines capable of performing tasks that normally require human intelligence.',
        topic: 'ai-basics',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['ai', 'foundations', 'overview'],
        linkedCards: [
            { id: 'c102', relationship: 'includes' },
            { id: 'c103', relationship: 'includes' },
        ],
        importance: 1,
        isFoundational: true,
    },
    {
        id: 'c102',
        title: 'Machine Learning',
        summary: 'Systems that learn patterns from data instead of following explicit rules',
        description: 'Machine learning (ML) is a subset of AI where systems learn to perform tasks by finding patterns in data, rather than being explicitly programmed. Given enough examples, an ML model can learn to classify emails as spam, recommend movies, or predict stock prices.',
        quizDescription: 'A subset of AI where systems learn to perform tasks by identifying patterns in data rather than following hand-coded rules.',
        topic: 'ai-basics',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['ml', 'training', 'foundations'],
        linkedCards: [
            { id: 'c101', relationship: 'a subset of' },
            { id: 'c105', relationship: 'uses' },
            { id: 'c301', relationship: 'works through' },
        ],
        importance: 1,
        isFoundational: false,
    },
    {
        id: 'c103',
        title: 'Deep Learning',
        summary: 'Machine learning using neural networks with many layers',
        description: 'Deep learning is a subset of machine learning that uses neural networks with many layers (hence "deep") to learn complex patterns. It powers most modern AI breakthroughs, from image recognition to language generation. The "depth" allows the network to learn increasingly abstract representations of data.',
        quizDescription: 'A subset of machine learning that uses multi-layered neural networks to learn complex, hierarchical patterns in data.',
        topic: 'ai-basics',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['deep-learning', 'neural-networks', 'foundations'],
        linkedCards: [
            { id: 'c102', relationship: 'a subset of' },
            { id: 'c105', relationship: 'built on' },
        ],
        importance: 1,
        isFoundational: false,
    },
    {
        id: 'c104',
        title: 'Natural Language Processing',
        summary: 'Teaching machines to understand and generate human language',
        description: 'Natural language processing (NLP) is the branch of AI focused on enabling machines to understand, interpret, and generate human language. Modern NLP is powered by deep learning and is behind applications like chatbots, translation services, and search engines.',
        quizDescription: 'The branch of AI that enables machines to understand, interpret, and generate human language.',
        topic: 'ai-basics',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['nlp', 'language', 'applications'],
        linkedCards: [
            { id: 'c103', relationship: 'powered by' },
            { id: 'c201', relationship: 'exemplified by' },
        ],
        importance: 2,
        isFoundational: false,
    },
    {
        id: 'c105',
        title: 'Neural Networks',
        summary: 'Computing systems loosely inspired by biological brain structure',
        description: 'Neural networks are computing systems made up of interconnected nodes (neurons) organized in layers. Loosely inspired by the brain, they learn by adjusting the strength of connections between neurons during training. They are the foundation of deep learning and most modern AI systems.',
        quizDescription: 'Computing systems of interconnected nodes organized in layers, loosely inspired by the brain, that learn by adjusting connection strengths.',
        topic: 'ai-basics',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['neural-networks', 'architecture', 'foundations'],
        linkedCards: [
            { id: 'c103', relationship: 'enables' },
            { id: 'c305', relationship: 'a type includes' },
        ],
        importance: 1,
        isFoundational: false,
    },
    {
        id: 'c106',
        title: 'Computer Vision',
        summary: 'Teaching machines to interpret and understand visual information',
        description: 'Computer vision is the branch of AI that enables machines to interpret images and videos — recognizing faces, detecting objects, or reading text from photos. Deep learning transformed this field, making it possible for AI to match or exceed human performance on many visual tasks.',
        quizDescription: 'The branch of AI that enables machines to interpret and understand visual information from images and videos.',
        topic: 'ai-basics',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['cv', 'perception', 'applications'],
        linkedCards: [
            { id: 'c103', relationship: 'powered by' },
            { id: 'c105', relationship: 'applies' },
        ],
        importance: 2,
        isFoundational: false,
    },

    // ─── AI Progress / Beginner ─────────────────────────────
    {
        id: 'c201',
        title: 'Large Language Models',
        summary: 'AI systems trained on massive text data to generate human-like language',
        description: 'Large language models (LLMs) are AI systems trained on vast amounts of text to predict and generate language. Models like GPT and Claude can answer questions, write code, and reason through problems. They are the most visible face of recent AI progress and a central focus of safety research.',
        quizDescription: 'AI systems trained on massive text datasets to generate, understand, and reason with human language across a wide range of tasks.',
        topic: 'ai-progress',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['llm', 'language-models', 'frontier', 'capabilities'],
        linkedCards: [
            { id: 'c103', relationship: 'built on' },
            { id: 'c202', relationship: 'an example of' },
            { id: 'c305', relationship: 'uses the' },
        ],
        importance: 1,
        isFoundational: true,
    },
    {
        id: 'c202',
        title: 'Foundation Models',
        summary: 'Large pretrained models that can be adapted to many different tasks',
        description: 'Foundation models are large AI systems trained on broad data that can be adapted to many tasks without retraining from scratch. Instead of building a separate AI for each problem, one foundation model can be fine-tuned or prompted for translation, coding, medical diagnosis, and more.',
        quizDescription: 'General-purpose AI models pretrained on broad datasets that can be adapted to many downstream tasks through fine-tuning or prompting.',
        topic: 'ai-progress',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['foundation-models', 'pre-training', 'capabilities'],
        linkedCards: [
            { id: 'c102', relationship: 'trained using' },
            { id: 'c306', relationship: 'adapted via' },
        ],
        importance: 1,
        isFoundational: false,
    },
    {
        id: 'c203',
        title: 'Scaling Laws',
        summary: 'Predictable relationships between model size, data, and performance',
        description: 'Scaling laws are empirical relationships showing that AI performance improves predictably as you increase model size, training data, and compute. They have guided billions of dollars in AI investment and raise safety concerns — if capabilities keep improving predictably, dangerous capabilities may emerge on a known timeline.',
        quizDescription: 'Mathematical relationships showing that AI performance improves predictably with increases in model size, data, and compute.',
        topic: 'ai-progress',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['scaling', 'compute', 'research', 'progress'],
        linkedCards: [
            { id: 'c202', relationship: 'predicts performance of' },
            { id: 'c205', relationship: 'can lead to' },
        ],
        importance: 1,
        isFoundational: false,
    },
    {
        id: 'c204',
        title: 'Benchmarks',
        summary: 'Standardized tests used to measure AI capabilities',
        description: 'Benchmarks are standardized tests that measure how well AI systems perform on specific tasks, from language understanding to math reasoning. They help track progress and compare models, but have limitations — AI can score well on tests without truly understanding the underlying concepts.',
        quizDescription: 'Standardized testing frameworks that measure AI capabilities on specific tasks, enabling comparison between models.',
        topic: 'ai-progress',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['evaluation', 'measurement', 'capabilities'],
        linkedCards: [
            { id: 'c201', relationship: 'measures progress of' },
            { id: 'c205', relationship: 'can reveal' },
        ],
        importance: 2,
        isFoundational: false,
    },
    {
        id: 'c205',
        title: 'Emergent Abilities',
        summary: 'Unexpected capabilities that appear as AI models grow larger',
        description: 'Emergent abilities are capabilities that appear unexpectedly in AI models as they are scaled up. A model that cannot do a task at one size may suddenly gain that ability at a larger size. Examples include chain-of-thought reasoning and in-context learning. These surprises make AI development harder to predict.',
        quizDescription: 'Capabilities that arise unexpectedly in AI models at larger scales, appearing suddenly rather than gradually.',
        topic: 'ai-progress',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['emergence', 'capabilities', 'surprises', 'scaling'],
        linkedCards: [
            { id: 'c203', relationship: 'arise from' },
            { id: 'c201', relationship: 'observed in' },
        ],
        importance: 1,
        isFoundational: false,
    },
    {
        id: 'c206',
        title: 'AI Labs',
        summary: 'Organizations at the forefront of building advanced AI systems',
        description: 'AI labs are the organizations — such as OpenAI, Anthropic, Google DeepMind, and Meta AI — that build and deploy the most advanced AI systems. They control access to massive compute resources and shape the direction of AI progress. Their safety practices and governance decisions have outsized impact.',
        quizDescription: 'Organizations like OpenAI, Anthropic, and DeepMind that build the most advanced AI systems and shape AI progress.',
        topic: 'ai-progress',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['industry', 'organizations', 'frontier', 'governance'],
        linkedCards: [
            { id: 'c202', relationship: 'build' },
            { id: 'c203', relationship: 'drive research on' },
        ],
        importance: 2,
        isFoundational: false,
    },

    // ─── AI Concepts / Beginner ─────────────────────────────
    {
        id: 'c301',
        title: 'Training and Inference',
        summary: 'The two main phases of using a machine learning model',
        description: 'Training is the phase where a model learns from data by adjusting its internal parameters. Inference is when the trained model is used to make predictions on new inputs. Training is computationally expensive and happens once (or periodically); inference happens every time the model is used.',
        quizDescription: 'The two phases of ML: training (learning from data) and inference (making predictions on new inputs).',
        topic: 'ai-concepts',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['training', 'inference', 'fundamentals'],
        linkedCards: [
            { id: 'c102', relationship: 'two phases of' },
            { id: 'c302', relationship: 'training includes' },
        ],
        importance: 1,
        isFoundational: true,
    },
    {
        id: 'c302',
        title: 'Supervised Learning',
        summary: 'Learning from labeled examples with known correct answers',
        description: 'Supervised learning is a type of machine learning where the model is trained on labeled data — input-output pairs where the correct answer is known. For example, training an email filter by showing it thousands of emails already labeled "spam" or "not spam." It is the most common form of ML in practice.',
        quizDescription: 'A type of machine learning where models learn from labeled input-output pairs with known correct answers.',
        topic: 'ai-concepts',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['supervised', 'training', 'ml-type'],
        linkedCards: [
            { id: 'c102', relationship: 'a type of' },
            { id: 'c303', relationship: 'contrasts with' },
        ],
        importance: 1,
        isFoundational: false,
    },
    {
        id: 'c303',
        title: 'Unsupervised Learning',
        summary: 'Learning patterns from unlabeled data without explicit correct answers',
        description: 'Unsupervised learning is a type of machine learning where the model finds patterns in data without labeled examples. It discovers hidden structure — like grouping customers by behavior or finding topics in documents. LLM pre-training is a form of unsupervised learning (predicting the next word).',
        quizDescription: 'A type of machine learning that discovers hidden patterns and structure in data without labeled examples.',
        topic: 'ai-concepts',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['unsupervised', 'training', 'ml-type'],
        linkedCards: [
            { id: 'c102', relationship: 'a type of' },
            { id: 'c302', relationship: 'contrasts with' },
        ],
        importance: 1,
        isFoundational: false,
    },
    {
        id: 'c304',
        title: 'Reinforcement Learning',
        summary: 'Learning through trial and error using rewards and penalties',
        description: 'Reinforcement learning (RL) is a type of machine learning where an agent learns by interacting with an environment and receiving rewards or penalties. It is how AlphaGo learned to play Go and how chatbots are fine-tuned with human feedback (RLHF). The agent learns a strategy that maximizes cumulative reward over time.',
        quizDescription: 'A type of machine learning where an agent learns optimal behavior through trial-and-error interaction with an environment.',
        topic: 'ai-concepts',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['rl', 'training', 'ml-type', 'rewards'],
        linkedCards: [
            { id: 'c102', relationship: 'a type of' },
            { id: 'c302', relationship: 'contrasts with' },
        ],
        importance: 1,
        isFoundational: false,
    },
    {
        id: 'c305',
        title: 'Transformers',
        summary: 'The neural network architecture behind modern LLMs',
        description: 'Transformers are a neural network architecture introduced in 2017 that revolutionized AI. Their key innovation — the "attention mechanism" — lets the model weigh the importance of different parts of the input simultaneously. Transformers power virtually all modern large language models, including GPT and Claude.',
        quizDescription: 'The neural network architecture using attention mechanisms that powers virtually all modern large language models.',
        topic: 'ai-concepts',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['transformers', 'attention', 'architecture', 'llm'],
        linkedCards: [
            { id: 'c201', relationship: 'architecture behind' },
            { id: 'c105', relationship: 'a type of' },
        ],
        importance: 1,
        isFoundational: false,
    },
    {
        id: 'c306',
        title: 'Fine-Tuning',
        summary: 'Adapting a pretrained model to a specific task or domain',
        description: 'Fine-tuning is the process of taking a pretrained foundation model and further training it on a smaller, task-specific dataset. This adapts the general model to perform well on a particular task — like training a general language model to be a medical assistant or a code generator — without the cost of training from scratch.',
        quizDescription: 'The process of further training a pretrained model on task-specific data to specialize it for a particular use case.',
        topic: 'ai-concepts',
        secondaryTopic: null,
        category: 'technical',
        difficulty: 1,
        tags: ['fine-tuning', 'transfer-learning', 'adaptation'],
        linkedCards: [
            { id: 'c202', relationship: 'adapts' },
            { id: 'c301', relationship: 'a form of' },
        ],
        importance: 1,
        isFoundational: false,
    },
];

export const ALL_CONCEPTS = [...CORE_CONCEPTS];
export const CORE_CONCEPT_COUNT = CORE_CONCEPTS.length;

// ─── Categories ─────────────────────────────────────────────
// Edit this array to add, remove, or reorder categories.
// Each concept's `category` field should match one of these IDs.
export const CATEGORIES = [
    { id: 'technical', label: 'Technical', color: '#7BAFCC', icon: 'gear' },
    { id: 'alignment', label: 'Alignment', color: '#9B7EC8', icon: 'compass' },
    { id: 'policy', label: 'Policy', color: '#7BA3CC', icon: 'building' },
    { id: 'ethics', label: 'Ethics', color: '#5A9E6F', icon: 'heart' },
    { id: 'risks', label: 'Risks', color: '#C44D4D', icon: 'warning' },
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
