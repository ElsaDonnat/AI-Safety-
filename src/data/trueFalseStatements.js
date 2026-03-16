// True/False statements for quiz questions.
// Keyed by card ID. Each entry has one true statement and one false statement with a correction.
export const TRUE_FALSE_STATEMENTS = {};

// ─── AI Basics (c101–c106) ────────────────────────────

TRUE_FALSE_STATEMENTS['c101'] = {
    trueStatement: 'An AI system can be designed for a single narrow task, like playing chess, without being capable of general-purpose reasoning.',
    falseStatement: 'All artificial intelligence systems are capable of learning and improving from experience.',
    correction: 'Not all AI systems learn from experience — some rely entirely on hand-coded rules and logic, such as early expert systems.',
};

TRUE_FALSE_STATEMENTS['c102'] = {
    trueStatement: 'A machine learning model can improve its performance on a task as it is exposed to more training data.',
    falseStatement: 'Machine learning and artificial intelligence are the same thing.',
    correction: 'Machine learning is a subset of AI, not a synonym — AI also includes rule-based and symbolic approaches that don\'t learn from data.',
};

TRUE_FALSE_STATEMENTS['c103'] = {
    trueStatement: 'The "depth" in deep learning refers to the number of layers in the neural network, which allows it to learn more abstract features.',
    falseStatement: 'Deep learning can achieve strong results on complex tasks using only a single-layer neural network.',
    correction: 'Deep learning specifically requires multiple layers — a single-layer network cannot learn the hierarchical, abstract representations that make deep learning powerful.',
};

TRUE_FALSE_STATEMENTS['c104'] = {
    trueStatement: 'NLP systems can both understand existing text and generate new text that was not in their training data.',
    falseStatement: 'Natural language processing works by looking up pre-written responses from a database rather than generating new text.',
    correction: 'Modern NLP systems, powered by deep learning, generate novel text by predicting likely sequences of words — they do not simply retrieve pre-written responses.',
};

TRUE_FALSE_STATEMENTS['c105'] = {
    trueStatement: 'Neural networks learn by adjusting the strength of connections between nodes during training, not by being explicitly programmed with rules.',
    falseStatement: 'Neural networks are accurate simulations of biological brains and work the same way neurons do in the human brain.',
    correction: 'Neural networks are only loosely inspired by biological brains — they use simplified mathematical functions, not actual biological neuron behavior.',
};

TRUE_FALSE_STATEMENTS['c106'] = {
    trueStatement: 'Computer vision systems can be trained to detect objects, recognize faces, and read text from images.',
    falseStatement: 'Computer vision has always performed as well as it does today, even before the rise of deep learning.',
    correction: 'Deep learning transformed computer vision — before it, traditional techniques performed far worse on complex visual tasks like object recognition.',
};

// ─── AI Progress (c201–c206) ──────────────────────────

TRUE_FALSE_STATEMENTS['c201'] = {
    trueStatement: 'Large language models can perform tasks they were not explicitly trained for, such as answering questions or writing code, by leveraging patterns learned during training.',
    falseStatement: 'Large language models understand language the same way humans do, with genuine comprehension of meaning.',
    correction: 'LLMs predict and generate language based on statistical patterns in their training data — whether this constitutes genuine understanding is highly debated, and most researchers agree it differs fundamentally from human comprehension.',
};

TRUE_FALSE_STATEMENTS['c202'] = {
    trueStatement: 'A single foundation model can be adapted to many different tasks — like translation, coding, and medical diagnosis — without being retrained from scratch each time.',
    falseStatement: 'Each foundation model is purpose-built for one specific task and cannot be repurposed for other applications.',
    correction: 'The defining feature of foundation models is their generality — they are pretrained on broad data and can be adapted to many different downstream tasks.',
};

TRUE_FALSE_STATEMENTS['c203'] = {
    trueStatement: 'Scaling laws have helped AI labs predict how much performance they will gain from investing in larger models and more training data.',
    falseStatement: 'Scaling laws guarantee that making a model larger will always improve its safety and reliability.',
    correction: 'Scaling laws predict improvements in capability metrics, not safety — a larger model may be more capable but not necessarily safer or more reliable.',
};

TRUE_FALSE_STATEMENTS['c204'] = {
    trueStatement: 'An AI system can achieve high scores on a benchmark without necessarily understanding the concepts being tested.',
    falseStatement: 'If an AI scores above human level on a benchmark, it has fully mastered the skills that benchmark measures.',
    correction: 'High benchmark scores can result from pattern matching or shortcuts rather than genuine mastery — AI can exploit statistical regularities in test formats without true understanding.',
};

TRUE_FALSE_STATEMENTS['c205'] = {
    trueStatement: 'Some AI capabilities, like chain-of-thought reasoning, appeared unexpectedly at certain model scales without being explicitly trained for.',
    falseStatement: 'Emergent abilities in AI models can always be predicted in advance based on the model\'s training data.',
    correction: 'Emergent abilities are, by definition, unexpected — they appear at certain scales without prior indication, which is precisely what makes them a safety concern.',
};

TRUE_FALSE_STATEMENTS['c206'] = {
    trueStatement: 'The safety practices and governance decisions of major AI labs have an outsized impact on the direction of AI development.',
    falseStatement: 'Any organization with a standard laptop can build and train frontier AI models comparable to those from major AI labs.',
    correction: 'Frontier AI models require massive compute resources — thousands of specialized GPUs and millions of dollars — that only well-funded AI labs can access.',
};

// ─── AI Concepts (c301–c306) ──────────────────────────

TRUE_FALSE_STATEMENTS['c301'] = {
    trueStatement: 'Training a large model is typically far more computationally expensive than running inference with that same model.',
    falseStatement: 'Training and inference require roughly the same amount of computational resources for a given model.',
    correction: 'Training is far more expensive — it involves processing enormous datasets and adjusting billions of parameters, while inference processes one input at a time using the already-learned parameters.',
};

TRUE_FALSE_STATEMENTS['c302'] = {
    trueStatement: 'Supervised learning requires a dataset where each input has a corresponding labeled output that the model learns to predict.',
    falseStatement: 'Supervised learning does not need labeled data — it can discover patterns from raw, unlabeled examples.',
    correction: 'That describes unsupervised learning. Supervised learning specifically requires labeled input-output pairs where the correct answer is known.',
};

TRUE_FALSE_STATEMENTS['c303'] = {
    trueStatement: 'Clustering — grouping similar data points together — is a common example of unsupervised learning.',
    falseStatement: 'Unsupervised learning always produces more accurate results than supervised learning because it finds patterns humans might miss.',
    correction: 'Unsupervised and supervised learning solve different problems — supervised learning is generally more accurate for tasks where labeled data is available, because it has explicit correct answers to learn from.',
};

TRUE_FALSE_STATEMENTS['c304'] = {
    trueStatement: 'Reinforcement learning from human feedback (RLHF) is used to fine-tune chatbots so their responses better align with human preferences.',
    falseStatement: 'Reinforcement learning requires a pre-labeled dataset of correct answers, just like supervised learning.',
    correction: 'Reinforcement learning does not use labeled correct answers — instead, an agent learns by receiving reward or penalty signals from interacting with an environment.',
};

TRUE_FALSE_STATEMENTS['c305'] = {
    trueStatement: 'The attention mechanism in transformers allows the model to consider the relationships between all words in a sentence simultaneously, rather than processing them one by one.',
    falseStatement: 'Transformers process input tokens strictly one at a time in sequential order, like earlier recurrent neural networks.',
    correction: 'A key innovation of transformers is parallel processing through the attention mechanism — unlike recurrent networks, they can weigh all parts of the input simultaneously.',
};

TRUE_FALSE_STATEMENTS['c306'] = {
    trueStatement: 'Fine-tuning allows a general-purpose model to become specialized for a specific task using a relatively small, targeted dataset.',
    falseStatement: 'Fine-tuning a model requires just as much data and compute as training the original model from scratch.',
    correction: 'Fine-tuning is specifically valuable because it requires far less data and compute — it builds on knowledge the model already learned during pretraining.',
};
