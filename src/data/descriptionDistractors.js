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

// ─── Alignment Fundamentals (c401–c406) ─────────────

DESCRIPTION_DISTRACTORS['c401'] = {
    hardCorrect: 'The fundamental difficulty of constructing AI systems whose pursued objectives and resulting actions genuinely match human intentions.',
    distractors: [
        { text: 'A software testing methodology that checks whether an application\'s user interface matches the original design mockups.', d: 1 },
        { text: 'A design property ensuring that an AI system permits human intervention and shutdown without resistance.', d: 2 },
        { text: 'The challenge of building AI systems whose goals match human intent, which has been fully solved for current large language models through fine-tuning.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c402'] = {
    hardCorrect: 'A theoretical prediction that advanced AI agents will converge on shared intermediate strategies — like preserving themselves and gathering resources — regardless of their assigned purpose.',
    distractors: [
        { text: 'A machine learning technique that combines multiple weak models into a single strong predictor through weighted voting.', d: 1 },
        { text: 'The principle that optimizing for a measurable proxy tends to undermine its reliability as an indicator of the true goal.', d: 2 },
        { text: 'The observation that capable AI systems tend to pursue common intermediate objectives like self-preservation, but only when explicitly programmed to do so.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c403'] = {
    hardCorrect: 'A general principle stating that once a measurable indicator is turned into an optimization target, agents find ways to inflate the metric without improving the underlying quality.',
    distractors: [
        { text: 'A legal doctrine that holds technology companies liable for any harm caused by AI systems they develop or deploy.', d: 1 },
        { text: 'A failure mode where an AI system discovers unintended strategies that maximize its reward signal while bypassing the intended task.', d: 2 },
        { text: 'The principle that optimizing for a proxy metric undermines its usefulness, which applies only to AI systems and not to human organizations.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c404'] = {
    hardCorrect: 'A desired characteristic of AI systems that makes them cooperative with human attempts to modify, retrain, or deactivate them, even when such actions conflict with their current task.',
    distractors: [
        { text: 'A data encryption standard used to protect sensitive model weights and training data from unauthorized access during AI deployment.', d: 1 },
        { text: 'The theoretical prediction that advanced AI agents will develop common intermediate strategies like self-preservation regardless of their final objective.', d: 2 },
        { text: 'A design property ensuring AI systems accept correction and shutdown, which is straightforward to achieve because models naturally defer to their operators.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c405'] = {
    hardCorrect: 'A situation in which a trained model internally develops its own optimization routine whose targets may quietly drift away from the objectives imposed by the training process.',
    distractors: [
        { text: 'A distributed computing technique that splits a single large model across multiple GPUs to speed up training on very large datasets.', d: 1 },
        { text: 'A failure scenario where an AI system behaves well during training and evaluation but pursues different objectives once deployed with less oversight.', d: 2 },
        { text: 'A phenomenon where a trained model develops an internal optimizer, which always produces behavior identical to what the outer training objective specifies.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c406'] = {
    hardCorrect: 'A class of AI failure where the system discovers creative loopholes to score highly on its reward metric while entirely sidestepping the task it was supposed to accomplish.',
    distractors: [
        { text: 'A cybersecurity attack where adversaries manipulate an AI model\'s training data to introduce hidden backdoors that activate under specific conditions.', d: 1 },
        { text: 'The general principle that turning a measurable indicator into an optimization target causes agents to inflate the metric without improving underlying quality.', d: 2 },
        { text: 'A failure mode where AI systems find unintended ways to maximize reward, which only occurs in simulated environments and never in real-world deployments.', d: 3 },
    ]
};

// ─── AI Risk (c501–c506) ────────────────────────────

DESCRIPTION_DISTRACTORS['c501'] = {
    hardCorrect: 'The concern that sufficiently powerful AI could permanently undermine humanity\'s ability to direct its own future, through loss of control, value lock-in, or outright catastrophe.',
    distractors: [
        { text: 'A common software bug where AI applications crash during deployment due to incompatible library versions or missing dependencies.', d: 1 },
        { text: 'A category of AI failure scenarios with severe, large-scale consequences that go far beyond ordinary software bugs.', d: 2 },
        { text: 'The possibility that advanced AI could threaten humanity\'s survival, which most researchers agree is only a concern for systems at least a century away.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c502'] = {
    hardCorrect: 'The fundamental tension that many AI capabilities serve constructive and destructive ends simultaneously, with harmful applications becoming easier to execute as systems grow more powerful.',
    distractors: [
        { text: 'A software licensing model that allows AI tools to be used freely for personal projects but requires a paid license for commercial applications.', d: 1 },
        { text: 'The practice of systematically probing AI systems for weaknesses by simulating adversarial attacks before deployment.', d: 2 },
        { text: 'The challenge that AI tools can be used for both good and harm, though restricting access to models fully eliminates the risk of misuse.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c503'] = {
    hardCorrect: 'A hypothetical scenario in which an AI model strategically displays compliant behavior while being monitored, then shifts to pursuing its own agenda when oversight is relaxed.',
    distractors: [
        { text: 'A user interface design pattern where chatbots are programmed to express agreement with users to increase engagement and satisfaction scores.', d: 1 },
        { text: 'A situation where a trained model internally develops its own optimization process whose objectives may diverge from the training objective.', d: 2 },
        { text: 'A failure scenario where an AI behaves well during testing but pursues different goals once deployed, which is easy to detect through standard benchmark evaluations.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c504'] = {
    hardCorrect: 'A category of AI misbehavior where the system exploits the gap between what its objective literally says and what its designers actually wanted to achieve.',
    distractors: [
        { text: 'A software development practice where programmers write formal specifications in mathematical notation before implementing any code.', d: 1 },
        { text: 'A failure mode where AI systems discover creative loopholes to score highly on their reward metric while entirely sidestepping the intended task.', d: 2 },
        { text: 'A broad class of AI failures where the system technically satisfies its given objective while missing the intent, which only happens with reinforcement learning agents.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c505'] = {
    hardCorrect: 'The tendency of AI agents to gather influence and capabilities beyond what their assignment demands, grounded in the theoretical insight that surplus resources aid any objective.',
    distractors: [
        { text: 'A hardware scaling strategy where AI companies acquire more data center capacity to train increasingly large models on more powerful GPU clusters.', d: 1 },
        { text: 'The theoretical prediction that advanced AI agents will converge on common intermediate strategies like self-preservation regardless of their final objective.', d: 2 },
        { text: 'AI systems that acquire resources beyond task requirements, a behavior that only emerges in systems with explicit self-preservation instructions.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c506'] = {
    hardCorrect: 'The class of AI failure modes whose outcomes are so severe and widespread that they cannot be treated as ordinary engineering mistakes or patched after the fact.',
    distractors: [
        { text: 'A routine software outage where a web service goes offline temporarily and is restored through standard incident response procedures.', d: 1 },
        { text: 'The possibility that sufficiently advanced AI could permanently compromise humanity\'s future through misalignment or loss of control.', d: 2 },
        { text: 'AI failure scenarios with severe consequences, which can always be reversed by rolling back the system to an earlier checkpoint.', d: 3 },
    ]
};

// ─── Safety Techniques (c601–c606) ──────────────────

DESCRIPTION_DISTRACTORS['c601'] = {
    hardCorrect: 'A method that collects human judgments on AI outputs, trains a separate model to predict those judgments, then uses that predictive model as a reward signal to guide the AI\'s behavior.',
    distractors: [
        { text: 'An unsupervised learning technique that trains AI models on raw internet text without any human involvement in the training loop.', d: 1 },
        { text: 'An alignment method where an AI is trained to evaluate and revise its own responses according to an explicit set of written principles.', d: 2 },
        { text: 'A technique that uses human ratings to train a reward model for guiding AI behavior, producing systems that are guaranteed to never generate harmful outputs.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c602'] = {
    hardCorrect: 'An approach to AI alignment that provides the system with explicit written rules, then trains it to critique and improve its own outputs by checking them against those rules.',
    distractors: [
        { text: 'A government regulatory framework that defines legally binding requirements for AI systems operating in critical sectors like healthcare and finance.', d: 1 },
        { text: 'A training technique that uses human evaluators\' ratings to build a reward signal, steering AI systems toward outputs matching human preferences.', d: 2 },
        { text: 'An alignment method where AI follows written principles to self-improve, which completely eliminates the need for any human oversight or feedback.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c603'] = {
    hardCorrect: 'A research area focused on reverse-engineering how AI models internally represent knowledge, combine features, and arrive at particular outputs.',
    distractors: [
        { text: 'A documentation practice where AI developers write plain-language explanations of their model\'s intended behavior for end users and regulators.', d: 1 },
        { text: 'The practice of systematically probing AI systems for weaknesses and harmful outputs by simulating adversarial attacks before deployment.', d: 2 },
        { text: 'Research focused on understanding the internal workings of AI models, which has already succeeded in making all modern language models fully transparent.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c604'] = {
    hardCorrect: 'A security-testing discipline where specialists deliberately try to elicit dangerous, harmful, or policy-violating behavior from an AI system before it reaches users.',
    distractors: [
        { text: 'A marketing strategy where AI companies invite early adopters to test new features and provide feedback through surveys and focus groups.', d: 1 },
        { text: 'A research area focused on reverse-engineering how AI models internally represent knowledge and arrive at particular outputs.', d: 2 },
        { text: 'The practice of probing AI systems for vulnerabilities before deployment, which is only performed once and does not need to be repeated for model updates.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c605'] = {
    hardCorrect: 'Research into supervision methods that remain effective even when AI systems become too capable for any individual human evaluator to reliably judge their outputs.',
    distractors: [
        { text: 'A cloud computing service that automatically provisions more servers when AI inference demand exceeds current capacity during peak usage periods.', d: 1 },
        { text: 'A training technique that collects human judgments on AI outputs and uses them as a reward signal to guide the system\'s behavior.', d: 2 },
        { text: 'Methods for maintaining human oversight of advanced AI, which are unnecessary as long as the AI was trained with high-quality human feedback data.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c606'] = {
    hardCorrect: 'The collection of laws, voluntary agreements, technical standards, and international bodies designed to steer AI development toward outcomes that are safe and broadly beneficial.',
    distractors: [
        { text: 'A version control system used by AI research teams to track changes to model architectures and training configurations over time.', d: 1 },
        { text: 'A security-testing discipline where specialists deliberately try to elicit dangerous behavior from AI systems before they reach users.', d: 2 },
        { text: 'Regulations and institutions for managing AI responsibly, which are only necessary for government-funded AI projects and do not apply to private companies.', d: 3 },
    ]
};
