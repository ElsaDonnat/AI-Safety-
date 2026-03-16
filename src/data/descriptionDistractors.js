// Description distractors for hardMCQ questions.
// Keyed by card ID. Each entry has a hardCorrect (alternative correct description)
// and 3 distractors at difficulty levels 1-3.
export const DESCRIPTION_DISTRACTORS = {};

// ─── AI Basics (c101–c106) ────────────────────────────

DESCRIPTION_DISTRACTORS['c101'] = {
    hardCorrect: 'A broad discipline focused on creating systems that can perceive, reason, and act in ways typically associated with human cognition.',
    distractors: [
        { text: 'A branch of computer science dedicated to building robots that replicate the full range of human physical and mental abilities.', d: 1 },
        { text: 'A technique that enables systems to improve their performance on tasks by learning from data rather than following pre-written instructions.', d: 2 },
        { text: 'The broad field of building machines that can perform tasks typically requiring human cognition, ranging exclusively from narrow task-specific systems to general-purpose agents.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c102'] = {
    hardCorrect: 'An approach within AI where algorithms detect patterns in datasets and improve at tasks through experience, without being explicitly told what rules to follow.',
    distractors: [
        { text: 'A programming technique where developers write detailed rules for every possible scenario a system might encounter during operation.', d: 1 },
        { text: 'A technique that uses networks of interconnected nodes arranged in many layers to learn increasingly abstract representations of data.', d: 2 },
        { text: 'A subset of AI where systems learn to perform tasks by finding patterns in data, requiring large labeled datasets for every application.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c103'] = {
    hardCorrect: 'A machine learning approach built on neural networks with many stacked layers, enabling the model to learn increasingly abstract representations of data.',
    distractors: [
        { text: 'A statistical method that fits simple mathematical equations to data points in order to make predictions about future trends.', d: 1 },
        { text: 'A subset of AI where algorithms detect patterns in datasets and improve at tasks through experience, without explicit programming.', d: 2 },
        { text: 'A branch of machine learning that uses neural networks with many layers, requiring only small amounts of data to learn complex patterns effectively.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c104'] = {
    hardCorrect: 'An AI subfield concerned with giving machines the ability to read, write, and converse in human languages.',
    distractors: [
        { text: 'A field of AI focused on converting spoken audio into written text using signal processing and acoustic modeling techniques.', d: 1 },
        { text: 'A branch of AI that enables machines to interpret and extract meaning from visual inputs like images, videos, and camera feeds.', d: 2 },
        { text: 'The branch of AI focused on enabling machines to understand and generate human language, working primarily through hand-crafted grammar rules.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c105'] = {
    hardCorrect: 'Layered computational structures where artificial neurons pass signals and adjust their connection weights during training to recognize patterns.',
    distractors: [
        { text: 'Hardware circuits that exactly replicate biological brain tissue to achieve human-level reasoning and consciousness in machines.', d: 1 },
        { text: 'A machine learning approach that stacks many processing layers to learn abstract representations, powering most modern AI breakthroughs.', d: 2 },
        { text: 'Computing systems of interconnected nodes organized in layers that learn by adjusting connection strengths, requiring the nodes to fire in sequence like biological neurons.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c106'] = {
    hardCorrect: 'An AI subfield focused on teaching systems to extract meaning from visual inputs, including object detection, facial recognition, and image classification.',
    distractors: [
        { text: 'A rendering technique that generates photorealistic images and animations from text descriptions using generative models.', d: 1 },
        { text: 'A branch of AI focused on enabling machines to understand, interpret, and produce human language across a range of applications.', d: 2 },
        { text: 'The branch of AI that enables machines to interpret images and videos, achieving reliable superhuman performance across all visual recognition tasks.', d: 3 },
    ]
};

// ─── AI Progress (c201–c206) ──────────────────────────

DESCRIPTION_DISTRACTORS['c201'] = {
    hardCorrect: 'Massive neural networks trained on enormous text corpora that can generate coherent language, answer questions, and perform reasoning across diverse domains.',
    distractors: [
        { text: 'Small, efficient models designed to run on mobile devices that translate between exactly two languages with high accuracy.', d: 1 },
        { text: 'General-purpose AI systems pretrained on broad datasets that can be adapted to many downstream tasks through fine-tuning or prompting.', d: 2 },
        { text: 'AI systems trained on vast amounts of text to predict and generate language, with each model specifically designed and trained for a single application.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c202'] = {
    hardCorrect: 'Large-scale AI systems trained once on diverse data, then repurposed for a wide variety of downstream applications without full retraining.',
    distractors: [
        { text: 'Specialized AI models that are each built from scratch for a single narrow task, like classifying images or filtering spam emails.', d: 1 },
        { text: 'AI systems trained on massive text datasets to generate, understand, and reason with human language across a wide range of tasks.', d: 2 },
        { text: 'Large AI systems trained on broad data that can be adapted to many tasks, though they always require full retraining for each new application.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c203'] = {
    hardCorrect: 'Empirical findings that AI model performance follows predictable curves as compute, parameters, and training data increase in scale.',
    distractors: [
        { text: 'Government regulations that set maximum limits on how large AI models are allowed to grow in order to manage safety risks.', d: 1 },
        { text: 'Capabilities that arise unexpectedly in AI models at larger scales, appearing suddenly rather than following a smooth improvement curve.', d: 2 },
        { text: 'Mathematical relationships showing that AI performance improves predictably with increases in model size and data, guaranteeing that bigger models are always safer.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c204'] = {
    hardCorrect: 'Standardized evaluations that let researchers measure and compare how well different AI systems perform on defined tasks and capabilities.',
    distractors: [
        { text: 'Internal dashboards used by AI companies to monitor server uptime and computational resource usage across their data centers.', d: 1 },
        { text: 'Empirical relationships showing that AI model performance follows predictable curves as compute, parameters, and dataset size increase.', d: 2 },
        { text: 'Standardized tests that measure how well AI systems perform on specific tasks, providing a complete and reliable picture of a model\'s true understanding.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c205'] = {
    hardCorrect: 'Capabilities that surface unexpectedly as AI models are scaled beyond certain thresholds, often without prior indication they would appear.',
    distractors: [
        { text: 'Features that developers deliberately add to AI models at each stage of development according to a pre-planned product roadmap.', d: 1 },
        { text: 'Mathematical relationships showing that AI performance improves predictably with increases in model size, training data, and compute resources.', d: 2 },
        { text: 'Capabilities that appear unexpectedly in AI models as they grow larger, reliably occurring at the same model size across all architectures and training setups.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c206'] = {
    hardCorrect: 'Leading research organizations that develop frontier AI systems, control vast compute resources, and whose governance choices shape the trajectory of AI development.',
    distractors: [
        { text: 'University research groups that publish theoretical papers about AI but do not build or deploy large-scale production systems.', d: 1 },
        { text: 'Standardized evaluations used by the research community to measure and compare how well different AI systems perform on defined tasks.', d: 2 },
        { text: 'Organizations that build the most advanced AI systems, operating independently without any coordination on safety practices or shared governance frameworks.', d: 3 },
    ]
};

// ─── AI Concepts (c301–c306) ──────────────────────────

DESCRIPTION_DISTRACTORS['c301'] = {
    hardCorrect: 'The two-stage lifecycle of a machine learning model: first adjusting parameters on data, then applying the learned model to produce outputs on new inputs.',
    distractors: [
        { text: 'A software deployment pipeline that compiles code, runs unit tests, and deploys applications to production servers automatically.', d: 1 },
        { text: 'A type of machine learning where models learn from labeled input-output pairs with known correct answers to classify new examples.', d: 2 },
        { text: 'The two phases of machine learning: training, which happens once and is inexpensive, and inference, which is computationally expensive and happens rarely.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c302'] = {
    hardCorrect: 'A machine learning paradigm where the model is given explicit input-output examples and learns to map new inputs to correct outputs based on those pairs.',
    distractors: [
        { text: 'A technique where an AI agent explores an environment and learns to maximize a cumulative reward signal through trial and error.', d: 1 },
        { text: 'A type of machine learning that discovers hidden patterns and structure in unlabeled data, such as clustering or dimensionality reduction.', d: 2 },
        { text: 'A type of machine learning where models learn from labeled input-output pairs, though it can only work with numerical data rather than text or images.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c303'] = {
    hardCorrect: 'A machine learning paradigm where the algorithm identifies structure and groupings in data without being given any labeled examples or target outputs.',
    distractors: [
        { text: 'A technique where developers manually label every data point before feeding it into the model so it can learn the correct categories.', d: 1 },
        { text: 'A machine learning paradigm where the model is given explicit input-output examples and learns to map new inputs to correct outputs.', d: 2 },
        { text: 'A type of machine learning that discovers hidden patterns in data without labeled examples, primarily used for generating new text and images.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c304'] = {
    hardCorrect: 'A machine learning paradigm where an agent takes actions in an environment and adjusts its strategy based on reward signals to maximize long-term outcomes.',
    distractors: [
        { text: 'A method where the model is trained on large labeled datasets of correct input-output pairs curated by human annotators.', d: 1 },
        { text: 'A type of machine learning that discovers hidden patterns and structure in unlabeled data through clustering and dimensionality reduction.', d: 2 },
        { text: 'A type of machine learning where an agent learns optimal behavior through interaction with an environment, always converging on the single best strategy quickly.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c305'] = {
    hardCorrect: 'A neural network design whose attention mechanism allows the model to weigh all parts of an input simultaneously, forming the backbone of modern language models.',
    distractors: [
        { text: 'A data compression algorithm that reduces file sizes by identifying and removing redundant information from documents and images.', d: 1 },
        { text: 'The process of taking a pretrained model and further training it on a smaller, task-specific dataset to adapt it for a particular application.', d: 2 },
        { text: 'A neural network architecture using attention mechanisms that processes input tokens strictly one at a time in sequential order.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c306'] = {
    hardCorrect: 'A training technique that takes an already-trained general model and adapts it to a narrower domain using a smaller, specialized dataset.',
    distractors: [
        { text: 'The initial large-scale training phase where a model learns general patterns from a massive, diverse dataset over weeks of computation.', d: 1 },
        { text: 'A neural network design whose attention mechanism allows the model to process all parts of an input simultaneously for language tasks.', d: 2 },
        { text: 'The process of further training a pretrained model on task-specific data, which always requires as much compute and data as the original training run.', d: 3 },
    ]
};
