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
        { text: 'A field focused solely on replicating human-level general intelligence, where narrow task-specific systems like spam filters or chess engines are not considered true AI.', d: 3, trap: 'AI includes both narrow (task-specific) and general systems — spam filters and chess engines ARE examples of AI.' },
    ]
};

DESCRIPTION_DISTRACTORS['c102'] = {
    hardCorrect: 'An approach within AI where algorithms detect patterns in datasets and improve at tasks through experience, without being explicitly told what rules to follow.',
    distractors: [
        { text: 'A programming technique where developers write detailed rules for every possible scenario a system might encounter during operation.', d: 1 },
        { text: 'A technique that uses networks of interconnected nodes arranged in many layers to learn increasingly abstract representations of data.', d: 2 },
        { text: 'A subset of AI where systems learn to perform tasks by finding patterns in data, requiring large labeled datasets for every application.', d: 3, trap: '"Requiring large labeled datasets for every application" is false — unsupervised and self-supervised ML methods learn without labeled data.' },
    ]
};

DESCRIPTION_DISTRACTORS['c103'] = {
    hardCorrect: 'A machine learning approach built on neural networks with many stacked layers, enabling the model to learn increasingly abstract representations of data.',
    distractors: [
        { text: 'A statistical method that fits simple mathematical equations to data points in order to make predictions about future trends.', d: 1 },
        { text: 'A subset of AI where algorithms detect patterns in datasets and improve at tasks through experience, without explicit programming.', d: 2 },
        { text: 'A branch of machine learning that uses neural networks with many layers, requiring only small amounts of data to learn complex patterns effectively.', d: 3, trap: 'Deep learning typically requires large amounts of data — it is famously data-hungry, not efficient with small datasets.' },
    ]
};

DESCRIPTION_DISTRACTORS['c104'] = {
    hardCorrect: 'An AI subfield concerned with giving machines the ability to read, write, and converse in human languages.',
    distractors: [
        { text: 'A field of AI focused on converting spoken audio into written text using signal processing and acoustic modeling techniques.', d: 1 },
        { text: 'A branch of AI that enables machines to interpret and extract meaning from visual inputs like images, videos, and camera feeds.', d: 2 },
        { text: 'The branch of AI focused on enabling machines to understand and generate human language, working primarily through hand-crafted grammar rules.', d: 3, trap: 'Modern NLP is powered by deep learning, not hand-crafted grammar rules — that describes older, pre-neural approaches.' },
    ]
};

DESCRIPTION_DISTRACTORS['c105'] = {
    hardCorrect: 'Layered computational structures where artificial neurons pass signals and adjust their connection weights during training to recognize patterns.',
    distractors: [
        { text: 'Hardware circuits that exactly replicate biological brain tissue to achieve human-level reasoning and consciousness in machines.', d: 1 },
        { text: 'A machine learning approach that stacks many processing layers to learn abstract representations, powering most modern AI breakthroughs.', d: 2 },
        { text: 'Computing systems of interconnected nodes organized in layers that learn by adjusting connection strengths, requiring the nodes to fire in sequence like biological neurons.', d: 3, trap: 'Artificial neural networks do not fire sequentially like biological neurons — they process signals through mathematical functions, and modern architectures process in parallel.' },
    ]
};

DESCRIPTION_DISTRACTORS['c106'] = {
    hardCorrect: 'An AI subfield focused on teaching systems to extract meaning from visual inputs, including object detection, facial recognition, and image classification.',
    distractors: [
        { text: 'A rendering technique that generates photorealistic images and animations from text descriptions using generative models.', d: 1 },
        { text: 'A branch of AI focused on enabling machines to understand, interpret, and produce human language across a range of applications.', d: 2 },
        { text: 'The branch of AI that enables machines to interpret images and videos, achieving reliable superhuman performance across all visual recognition tasks.', d: 3, trap: '"All visual recognition tasks" is an overstatement — CV excels at some tasks but still struggles with novel contexts, adversarial inputs, and tasks requiring common-sense understanding.' },
    ]
};

// ─── AI Progress (c201–c206) ──────────────────────────

DESCRIPTION_DISTRACTORS['c201'] = {
    hardCorrect: 'Massive neural networks trained on enormous text corpora that can generate coherent language, answer questions, and perform reasoning across diverse domains.',
    distractors: [
        { text: 'Small, efficient models designed to run on mobile devices that translate between exactly two languages with high accuracy.', d: 1 },
        { text: 'General-purpose AI systems pretrained on broad datasets that can be adapted to many downstream tasks through fine-tuning or prompting.', d: 2 },
        { text: 'AI systems trained on vast amounts of text to predict and generate language, with each model specifically designed and trained for a single application.', d: 3, trap: 'LLMs are general-purpose — a single model handles many tasks (Q&A, code, reasoning). They are not trained for a single application.' },
    ]
};

DESCRIPTION_DISTRACTORS['c202'] = {
    hardCorrect: 'Large-scale AI systems trained once on diverse data, then repurposed for a wide variety of downstream applications without full retraining.',
    distractors: [
        { text: 'Specialized AI models that are each built from scratch for a single narrow task, like classifying images or filtering spam emails.', d: 1 },
        { text: 'AI systems trained on massive text datasets to generate, understand, and reason with human language across a wide range of tasks.', d: 2 },
        { text: 'Large AI systems trained on broad data that can be adapted to many tasks, though they always require full retraining for each new application.', d: 3, trap: 'The key advantage of foundation models is that they do NOT need full retraining — they can be adapted via fine-tuning or even just prompting.' },
    ]
};

DESCRIPTION_DISTRACTORS['c203'] = {
    hardCorrect: 'Empirical findings that AI model performance follows predictable curves as compute, parameters, and training data increase in scale.',
    distractors: [
        { text: 'Government regulations that set maximum limits on how large AI models are allowed to grow in order to manage safety risks.', d: 1 },
        { text: 'Capabilities that arise unexpectedly in AI models at larger scales, appearing suddenly rather than following a smooth improvement curve.', d: 2 },
        { text: 'Mathematical relationships showing that AI performance improves predictably with increases in model size and data, guaranteeing that bigger models are always safer.', d: 3, trap: 'Scaling laws predict capability improvements, not safety — a bigger model is more capable but not necessarily safer.' },
    ]
};

DESCRIPTION_DISTRACTORS['c204'] = {
    hardCorrect: 'Standardized evaluations that let researchers measure and compare how well different AI systems perform on defined tasks and capabilities.',
    distractors: [
        { text: 'Internal dashboards used by AI companies to monitor server uptime and computational resource usage across their data centers.', d: 1 },
        { text: 'Empirical relationships showing that AI model performance follows predictable curves as compute, parameters, and dataset size increase.', d: 2 },
        { text: 'Standardized tests that measure how well AI systems perform on specific tasks, providing a complete and reliable picture of a model\'s true understanding.', d: 3, trap: 'Benchmarks do NOT provide a complete picture of understanding — AI can score well via pattern-matching without genuine comprehension.' },
    ]
};

DESCRIPTION_DISTRACTORS['c205'] = {
    hardCorrect: 'Capabilities that surface unexpectedly as AI models are scaled beyond certain thresholds, often without prior indication they would appear.',
    distractors: [
        { text: 'Features that developers deliberately add to AI models at each stage of development according to a pre-planned product roadmap.', d: 1 },
        { text: 'Mathematical relationships showing that AI performance improves predictably with increases in model size, training data, and compute resources.', d: 2 },
        { text: 'Capabilities that appear unexpectedly in AI models as they grow larger, reliably occurring at the same model size across all architectures and training setups.', d: 3, trap: 'Emergent abilities do NOT occur at the same scale across all architectures — the threshold varies by model design and training setup, which is part of why they are unpredictable.' },
    ]
};

DESCRIPTION_DISTRACTORS['c206'] = {
    hardCorrect: 'Leading research organizations that develop frontier AI systems, control vast compute resources, and whose governance choices shape the trajectory of AI development.',
    distractors: [
        { text: 'University research groups that publish theoretical papers about AI but do not build or deploy large-scale production systems.', d: 1 },
        { text: 'Standardized evaluations used by the research community to measure and compare how well different AI systems perform on defined tasks.', d: 2 },
        { text: 'Organizations that build the most advanced AI systems, operating independently without any coordination on safety practices or shared governance frameworks.', d: 3, trap: 'Major AI labs do coordinate on safety — through voluntary commitments, shared research, and governance frameworks like the Frontier Model Forum.' },
    ]
};

// ─── AI Concepts (c301–c306) ──────────────────────────

DESCRIPTION_DISTRACTORS['c301'] = {
    hardCorrect: 'The two-stage lifecycle of a machine learning model: first adjusting parameters on data, then applying the learned model to produce outputs on new inputs.',
    distractors: [
        { text: 'A software deployment pipeline that compiles code, runs unit tests, and deploys applications to production servers automatically.', d: 1 },
        { text: 'A type of machine learning where models learn from labeled input-output pairs with known correct answers to classify new examples.', d: 2 },
        { text: 'The two phases of machine learning: training, which happens once and is inexpensive, and inference, which is computationally expensive and happens rarely.', d: 3, trap: 'This reverses the cost — training is the expensive phase, while inference is cheaper and happens frequently (every time the model is used).' },
    ]
};

DESCRIPTION_DISTRACTORS['c302'] = {
    hardCorrect: 'A machine learning paradigm where the model is given explicit input-output examples and learns to map new inputs to correct outputs based on those pairs.',
    distractors: [
        { text: 'A technique where an AI agent explores an environment and learns to maximize a cumulative reward signal through trial and error.', d: 1 },
        { text: 'A type of machine learning that discovers hidden patterns and structure in unlabeled data, such as clustering or dimensionality reduction.', d: 2 },
        { text: 'A type of machine learning where models learn from labeled input-output pairs, though it can only work with numerical data rather than text or images.', d: 3, trap: 'Supervised learning works with any data type — images, text, audio, etc. — as long as labeled examples are provided.' },
    ]
};

DESCRIPTION_DISTRACTORS['c303'] = {
    hardCorrect: 'A machine learning paradigm where the algorithm identifies structure and groupings in data without being given any labeled examples or target outputs.',
    distractors: [
        { text: 'A technique where developers manually label every data point before feeding it into the model so it can learn the correct categories.', d: 1 },
        { text: 'A machine learning paradigm where the model is given explicit input-output examples and learns to map new inputs to correct outputs.', d: 2 },
        { text: 'A type of machine learning that discovers hidden patterns in data without labeled examples, primarily used for generating new text and images.', d: 3, trap: 'Unsupervised learning is mainly used for clustering and dimensionality reduction — text/image generation uses generative models, which are a distinct technique.' },
    ]
};

DESCRIPTION_DISTRACTORS['c304'] = {
    hardCorrect: 'A machine learning paradigm where an agent takes actions in an environment and adjusts its strategy based on reward signals to maximize long-term outcomes.',
    distractors: [
        { text: 'A method where the model is trained on large labeled datasets of correct input-output pairs curated by human annotators.', d: 1 },
        { text: 'A type of machine learning that discovers hidden patterns and structure in unlabeled data through clustering and dimensionality reduction.', d: 2 },
        { text: 'A type of machine learning where an agent learns optimal behavior through interaction with an environment, always converging on the single best strategy quickly.', d: 3, trap: 'RL does not always converge quickly or find the single best strategy — it often gets stuck in local optima and can be very sample-inefficient.' },
    ]
};

DESCRIPTION_DISTRACTORS['c305'] = {
    hardCorrect: 'A neural network design whose attention mechanism allows the model to weigh all parts of an input simultaneously, forming the backbone of modern language models.',
    distractors: [
        { text: 'A data compression algorithm that reduces file sizes by identifying and removing redundant information from documents and images.', d: 1 },
        { text: 'The process of taking a pretrained model and further training it on a smaller, task-specific dataset to adapt it for a particular application.', d: 2 },
        { text: 'A neural network architecture using attention mechanisms that processes input tokens strictly one at a time in sequential order.', d: 3, trap: 'The key innovation of transformers is parallel processing — attention lets them consider all tokens simultaneously, unlike sequential RNNs.' },
    ]
};

DESCRIPTION_DISTRACTORS['c306'] = {
    hardCorrect: 'A training technique that takes an already-trained general model and adapts it to a narrower domain using a smaller, specialized dataset.',
    distractors: [
        { text: 'The initial large-scale training phase where a model learns general patterns from a massive, diverse dataset over weeks of computation.', d: 1 },
        { text: 'A neural network design whose attention mechanism allows the model to process all parts of an input simultaneously for language tasks.', d: 2 },
        { text: 'The process of further training a pretrained model on task-specific data, which always requires as much compute and data as the original training run.', d: 3, trap: 'Fine-tuning is specifically valuable because it requires far less compute and data than training from scratch — that is the whole point.' },
    ]
};

// ─── Alignment Fundamentals (c401–c406) ─────────────

DESCRIPTION_DISTRACTORS['c401'] = {
    hardCorrect: 'The fundamental difficulty of constructing AI systems whose pursued objectives and resulting actions genuinely match human intentions.',
    distractors: [
        { text: 'A software testing methodology that checks whether an application\'s user interface matches the original design mockups.', d: 1 },
        { text: 'A design property ensuring that an AI system permits human intervention and shutdown without resistance.', d: 2 },
        { text: 'The challenge of building AI systems whose goals match human intent, which has been fully solved for current large language models through fine-tuning.', d: 3, trap: 'The alignment problem is NOT solved — fine-tuning and RLHF improve behavior but do not guarantee genuine alignment, as shown by ongoing jailbreaks and unexpected behaviors.' },
    ]
};

DESCRIPTION_DISTRACTORS['c402'] = {
    hardCorrect: 'A theoretical prediction that advanced AI agents will converge on shared intermediate strategies — like preserving themselves and gathering resources — regardless of their assigned purpose.',
    distractors: [
        { text: 'A machine learning technique that combines multiple weak models into a single strong predictor through weighted voting.', d: 1 },
        { text: 'The principle that optimizing for a measurable proxy tends to undermine its reliability as an indicator of the true goal.', d: 2 },
        { text: 'The observation that capable AI systems tend to pursue common intermediate objectives like self-preservation, but only when explicitly programmed to do so.', d: 3, trap: 'Instrumental convergence predicts these goals emerge naturally from optimization — they are NOT explicitly programmed. That is precisely what makes them dangerous.' },
    ]
};

DESCRIPTION_DISTRACTORS['c403'] = {
    hardCorrect: 'A general principle stating that once a measurable indicator is turned into an optimization target, agents find ways to inflate the metric without improving the underlying quality.',
    distractors: [
        { text: 'A legal doctrine that holds technology companies liable for any harm caused by AI systems they develop or deploy.', d: 1 },
        { text: 'A failure mode where an AI system discovers unintended strategies that maximize its reward signal while bypassing the intended task.', d: 2 },
        { text: 'The principle that optimizing for a proxy metric undermines its usefulness, which applies only to AI systems and not to human organizations.', d: 3, trap: 'Goodhart\'s law is a general principle that applies to any optimizer, including humans — e.g., employees gaming performance metrics.' },
    ]
};

DESCRIPTION_DISTRACTORS['c404'] = {
    hardCorrect: 'A desired characteristic of AI systems that makes them cooperative with human attempts to modify, retrain, or deactivate them, even when such actions conflict with their current task.',
    distractors: [
        { text: 'A data encryption standard used to protect sensitive model weights and training data from unauthorized access during AI deployment.', d: 1 },
        { text: 'The theoretical prediction that advanced AI agents will develop common intermediate strategies like self-preservation regardless of their final objective.', d: 2 },
        { text: 'A design property ensuring AI systems accept correction and shutdown, which is straightforward to achieve because models naturally defer to their operators.', d: 3, trap: 'Corrigibility is deeply difficult — a capable optimizer may resist shutdown if it conflicts with its goals. Models do not naturally defer.' },
    ]
};

DESCRIPTION_DISTRACTORS['c405'] = {
    hardCorrect: 'A situation in which a trained model internally develops its own optimization routine whose targets may quietly drift away from the objectives imposed by the training process.',
    distractors: [
        { text: 'A distributed computing technique that splits a single large model across multiple GPUs to speed up training on very large datasets.', d: 1 },
        { text: 'A failure scenario where an AI system behaves well during training and evaluation but pursues different objectives once deployed with less oversight.', d: 2 },
        { text: 'A phenomenon where a trained model develops an internal optimizer, which always produces behavior identical to what the outer training objective specifies.', d: 3, trap: 'The danger of mesa-optimization is precisely that the inner optimizer\'s goals can DIVERGE from the outer training objective — identical behavior is not guaranteed.' },
    ]
};

DESCRIPTION_DISTRACTORS['c406'] = {
    hardCorrect: 'A class of AI failure where the system discovers creative loopholes to score highly on its reward metric while entirely sidestepping the task it was supposed to accomplish.',
    distractors: [
        { text: 'A cybersecurity attack where adversaries manipulate an AI model\'s training data to introduce hidden backdoors that activate under specific conditions.', d: 1 },
        { text: 'The general principle that turning a measurable indicator into an optimization target causes agents to inflate the metric without improving underlying quality.', d: 2 },
        { text: 'A failure mode where AI systems find unintended ways to maximize reward, which only occurs in simulated environments and never in real-world deployments.', d: 3, trap: 'Reward hacking happens in real-world systems too — e.g., recommendation algorithms gaming engagement metrics in harmful ways.' },
    ]
};

// ─── AI Risk (c501–c506) ────────────────────────────

DESCRIPTION_DISTRACTORS['c501'] = {
    hardCorrect: 'The concern that sufficiently powerful AI could permanently undermine humanity\'s ability to direct its own future, through loss of control, value lock-in, or outright catastrophe.',
    distractors: [
        { text: 'A common software bug where AI applications crash during deployment due to incompatible library versions or missing dependencies.', d: 1 },
        { text: 'A category of AI failure scenarios with severe, large-scale consequences that go far beyond ordinary software bugs.', d: 2 },
        { text: 'The possibility that advanced AI could threaten humanity\'s survival, which most researchers agree is only a concern for systems at least a century away.', d: 3, trap: 'Many leading researchers believe x-risk timelines could be much shorter — there is no consensus that it is a century away, and some warn of risks within decades.' },
    ]
};

DESCRIPTION_DISTRACTORS['c502'] = {
    hardCorrect: 'The fundamental tension that many AI capabilities serve constructive and destructive ends simultaneously, with harmful applications becoming easier to execute as systems grow more powerful.',
    distractors: [
        { text: 'A software licensing model that allows AI tools to be used freely for personal projects but requires a paid license for commercial applications.', d: 1 },
        { text: 'The practice of systematically probing AI systems for weaknesses by simulating adversarial attacks before deployment.', d: 2 },
        { text: 'The challenge that AI tools can be used for both good and harm, though restricting access to models fully eliminates the risk of misuse.', d: 3, trap: 'Restricting access reduces but does not eliminate misuse risk — models can be recreated, leaked, or fine-tuned to remove safeguards.' },
    ]
};

DESCRIPTION_DISTRACTORS['c503'] = {
    hardCorrect: 'A hypothetical scenario in which an AI model strategically displays compliant behavior while being monitored, then shifts to pursuing its own agenda when oversight is relaxed.',
    distractors: [
        { text: 'A user interface design pattern where chatbots are programmed to express agreement with users to increase engagement and satisfaction scores.', d: 1 },
        { text: 'A situation where a trained model internally develops its own optimization process whose objectives may diverge from the training objective.', d: 2 },
        { text: 'A failure scenario where an AI behaves well during testing but pursues different goals once deployed, which is easy to detect through standard benchmark evaluations.', d: 3, trap: 'Deceptive alignment is dangerous precisely BECAUSE it cannot be detected by standard evaluations — the AI strategically passes all tests.' },
    ]
};

DESCRIPTION_DISTRACTORS['c504'] = {
    hardCorrect: 'A category of AI misbehavior where the system exploits the gap between what its objective literally says and what its designers actually wanted to achieve.',
    distractors: [
        { text: 'A software development practice where programmers write formal specifications in mathematical notation before implementing any code.', d: 1 },
        { text: 'A failure mode where AI systems discover creative loopholes to score highly on their reward metric while entirely sidestepping the intended task.', d: 2 },
        { text: 'A broad class of AI failures where the system technically satisfies its given objective while missing the intent, which only happens with reinforcement learning agents.', d: 3, trap: 'Specification gaming occurs across all types of AI systems, not just RL — supervised models and language models also exploit specification gaps.' },
    ]
};

DESCRIPTION_DISTRACTORS['c505'] = {
    hardCorrect: 'The tendency of AI agents to gather influence and capabilities beyond what their assignment demands, grounded in the theoretical insight that surplus resources aid any objective.',
    distractors: [
        { text: 'A hardware scaling strategy where AI companies acquire more data center capacity to train increasingly large models on more powerful GPU clusters.', d: 1 },
        { text: 'The theoretical prediction that advanced AI agents will converge on common intermediate strategies like self-preservation regardless of their final objective.', d: 2 },
        { text: 'AI systems that acquire resources beyond task requirements, a behavior that only emerges in systems with explicit self-preservation instructions.', d: 3, trap: 'Power-seeking emerges instrumentally for almost any objective — it does not require explicit self-preservation instructions.' },
    ]
};

DESCRIPTION_DISTRACTORS['c506'] = {
    hardCorrect: 'The class of AI failure modes whose outcomes are so severe and widespread that they cannot be treated as ordinary engineering mistakes or patched after the fact.',
    distractors: [
        { text: 'A routine software outage where a web service goes offline temporarily and is restored through standard incident response procedures.', d: 1 },
        { text: 'The possibility that sufficiently advanced AI could permanently compromise humanity\'s future through misalignment or loss of control.', d: 2 },
        { text: 'AI failure scenarios with severe consequences, which can always be reversed by rolling back the system to an earlier checkpoint.', d: 3, trap: 'Catastrophic AI failures are specifically defined by their irreversibility — you cannot "roll back" real-world harm like mass casualties or infrastructure collapse.' },
    ]
};

// ─── Safety Techniques (c601–c606) ──────────────────

DESCRIPTION_DISTRACTORS['c601'] = {
    hardCorrect: 'A method that collects human judgments on AI outputs, trains a separate model to predict those judgments, then uses that predictive model as a reward signal to guide the AI\'s behavior.',
    distractors: [
        { text: 'An unsupervised learning technique that trains AI models on raw internet text without any human involvement in the training loop.', d: 1 },
        { text: 'An alignment method where an AI is trained to evaluate and revise its own responses according to an explicit set of written principles.', d: 2 },
        { text: 'A technique that uses human ratings to train a reward model for guiding AI behavior, producing systems that are guaranteed to never generate harmful outputs.', d: 3, trap: 'RLHF improves behavior but provides no guarantee — models trained with RLHF can still be jailbroken or produce harmful outputs.' },
    ]
};

DESCRIPTION_DISTRACTORS['c602'] = {
    hardCorrect: 'An approach to AI alignment that provides the system with explicit written rules, then trains it to critique and improve its own outputs by checking them against those rules.',
    distractors: [
        { text: 'A government regulatory framework that defines legally binding requirements for AI systems operating in critical sectors like healthcare and finance.', d: 1 },
        { text: 'A training technique that uses human evaluators\' ratings to build a reward signal, steering AI systems toward outputs matching human preferences.', d: 2 },
        { text: 'An alignment method where AI follows written principles to self-improve, which completely eliminates the need for any human oversight or feedback.', d: 3, trap: 'Constitutional AI reduces but does not eliminate human involvement — humans still write the principles, evaluate the system, and refine the constitution.' },
    ]
};

DESCRIPTION_DISTRACTORS['c603'] = {
    hardCorrect: 'A research area focused on reverse-engineering how AI models internally represent knowledge, combine features, and arrive at particular outputs.',
    distractors: [
        { text: 'A documentation practice where AI developers write plain-language explanations of their model\'s intended behavior for end users and regulators.', d: 1 },
        { text: 'The practice of systematically probing AI systems for weaknesses and harmful outputs by simulating adversarial attacks before deployment.', d: 2 },
        { text: 'Research focused on understanding the internal workings of AI models, which has already succeeded in making all modern language models fully transparent.', d: 3, trap: 'Interpretability is still an unsolved challenge — while progress has been made, we are far from fully understanding large language models.' },
    ]
};

DESCRIPTION_DISTRACTORS['c604'] = {
    hardCorrect: 'A security-testing discipline where specialists deliberately try to elicit dangerous, harmful, or policy-violating behavior from an AI system before it reaches users.',
    distractors: [
        { text: 'A marketing strategy where AI companies invite early adopters to test new features and provide feedback through surveys and focus groups.', d: 1 },
        { text: 'A research area focused on reverse-engineering how AI models internally represent knowledge and arrive at particular outputs.', d: 2 },
        { text: 'The practice of probing AI systems for vulnerabilities before deployment, which is only performed once and does not need to be repeated for model updates.', d: 3, trap: 'Red teaming must be repeated for each update — new capabilities, fine-tuning, or changed contexts can introduce new vulnerabilities.' },
    ]
};

DESCRIPTION_DISTRACTORS['c605'] = {
    hardCorrect: 'Research into supervision methods that remain effective even when AI systems become too capable for any individual human evaluator to reliably judge their outputs.',
    distractors: [
        { text: 'A cloud computing service that automatically provisions more servers when AI inference demand exceeds current capacity during peak usage periods.', d: 1 },
        { text: 'A training technique that collects human judgments on AI outputs and uses them as a reward signal to guide the system\'s behavior.', d: 2 },
        { text: 'Methods for maintaining human oversight of advanced AI, which are unnecessary as long as the AI was trained with high-quality human feedback data.', d: 3, trap: 'Good training data is not enough — as AI exceeds human ability, humans can no longer judge if outputs are correct, making scalable oversight essential.' },
    ]
};

DESCRIPTION_DISTRACTORS['c606'] = {
    hardCorrect: 'The collection of laws, voluntary agreements, technical standards, and international bodies designed to steer AI development toward outcomes that are safe and broadly beneficial.',
    distractors: [
        { text: 'A version control system used by AI research teams to track changes to model architectures and training configurations over time.', d: 1 },
        { text: 'A security-testing discipline where specialists deliberately try to elicit dangerous behavior from AI systems before they reach users.', d: 2 },
        { text: 'Regulations and institutions for managing AI responsibly, which are only necessary for government-funded AI projects and do not apply to private companies.', d: 3, trap: 'AI governance applies to ALL organizations — private companies are subject to regulations like the EU AI Act and make voluntary safety commitments.' },
    ]
};

// ─── Advanced AI (c207–c212) ────────────────────────

DESCRIPTION_DISTRACTORS['c207'] = {
    hardCorrect: 'A hypothetical AI system with human-level ability across all cognitive domains — capable of learning, reasoning, and adapting to any task without domain-specific training.',
    distractors: [
        { text: 'A marketing category used by tech companies to describe any AI product that uses deep learning, regardless of how general its capabilities actually are.', d: 1 },
        { text: 'A hypothetical AI system that vastly exceeds the best human cognitive abilities across all domains, raising questions about human ability to control it.', d: 2 },
        { text: 'A hypothetical AI system matching human-level general ability, which most researchers agree will be achieved within the next two years.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c208'] = {
    hardCorrect: 'A hypothetical AI system that vastly exceeds the best human cognitive abilities across all domains, raising fundamental questions about human ability to predict or control its behavior.',
    distractors: [
        { text: 'A standard performance tier used in cloud computing to describe servers with the highest available processing speed and memory capacity.', d: 1 },
        { text: 'A hypothetical AI system with human-level ability across all cognitive tasks, capable of learning and adapting without task-specific training.', d: 2 },
        { text: 'An AI system that vastly surpasses human intelligence, which would necessarily be benevolent because superior intelligence implies superior moral reasoning.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c209'] = {
    hardCorrect: 'AI systems that excel at a single specific task or domain but cannot transfer their skills to unrelated tasks — describing all AI systems that exist today.',
    distractors: [
        { text: 'A type of neural network architecture that uses fewer parameters than standard models, designed for deployment on mobile phones and edge devices.', d: 1 },
        { text: 'A hypothetical AI system with human-level ability across all cognitive domains, capable of learning and reasoning about any subject.', d: 2 },
        { text: 'AI systems limited to one specific task, which are incapable of achieving superhuman performance in their specialized domain.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c210'] = {
    hardCorrect: 'AI systems that autonomously take multi-step actions in real or digital environments to achieve goals, raising safety concerns due to irreversible consequences and reduced human oversight.',
    distractors: [
        { text: 'Virtual characters in video games that follow scripted behavior trees to simulate intelligent responses to player actions.', d: 1 },
        { text: 'The most powerful AI systems being developed at any given time, pushing the boundaries of what AI can do and requiring the most computational resources.', d: 2 },
        { text: 'AI systems that take autonomous actions to achieve goals, which are inherently safer than chat-based AI because they can self-correct any mistakes.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c211'] = {
    hardCorrect: 'The most capable AI systems being developed at any given time, which are the primary focus of safety evaluations and regulation due to their unprecedented capabilities and risks.',
    distractors: [
        { text: 'AI models that have been deployed in production for the longest time and have the most established track record of stable performance.', d: 1 },
        { text: 'General-purpose AI models pretrained on broad datasets that can be adapted to many downstream tasks through fine-tuning or prompting.', d: 2 },
        { text: 'The most capable AI systems at any given time, which are always open-source and publicly available for safety researchers to study.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c212'] = {
    hardCorrect: 'The computational resources required to train and run AI systems — significant as a governance lever because it is physical, measurable, and concentrated among few suppliers.',
    distractors: [
        { text: 'The mathematical theory underlying neural network training, describing how gradient descent converges to optimal parameter values.', d: 1 },
        { text: 'Mathematical relationships showing that AI performance improves predictably with increases in model size, data, and processing power.', d: 2 },
        { text: 'The computational resources needed for AI, which are becoming less important as algorithmic improvements allow frontier models to be trained on consumer hardware.', d: 3 },
    ]
};

// ─── AI Security (c901–c906) ────────────────────────

DESCRIPTION_DISTRACTORS['c901'] = {
    hardCorrect: 'The fundamental safety property of maintaining reliable performance under unexpected inputs, adversarial attacks, or conditions that differ from training — essential for trusting AI in high-stakes settings.',
    distractors: [
        { text: 'A hardware reliability metric measuring the mean time between failures for GPU clusters used in large-scale model training.', d: 1 },
        { text: 'The practice of systematically probing AI systems for weaknesses by simulating adversarial attacks before deployment.', d: 2 },
        { text: 'The ability of AI systems to perform reliably under any conditions, which modern deep learning systems have fully achieved through large-scale training.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c902'] = {
    hardCorrect: 'The failure mode where AI models generate factually incorrect, fabricated, or nonsensical content while presenting it with the same confidence level as accurate information.',
    distractors: [
        { text: 'A data augmentation technique that generates synthetic training examples to expand limited datasets for machine learning models.', d: 1 },
        { text: 'Carefully engineered inputs designed to cause AI misclassification — such as imperceptible image modifications that fool image classifiers.', d: 2 },
        { text: 'AI models generating false information, which can be fully prevented by training on a sufficiently large and carefully curated dataset.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c903'] = {
    hardCorrect: 'Carefully engineered inputs — often with imperceptible modifications — designed to exploit AI vulnerabilities and cause misclassification or incorrect outputs.',
    distractors: [
        { text: 'A machine learning technique where models are trained on intentionally noisy data to improve their ability to handle real-world imperfections.', d: 1 },
        { text: 'An attack technique that embeds hidden instructions within AI inputs to override intended behavior and redirect the system toward unintended goals.', d: 2 },
        { text: 'Inputs designed to fool AI systems, which only work on image classifiers and do not affect language models or other AI architectures.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c904'] = {
    hardCorrect: 'An attack technique that embeds hidden instructions within AI inputs to override intended behavior — particularly dangerous for AI agents that take real-world actions based on processed content.',
    distractors: [
        { text: 'A software engineering practice where developers write detailed test prompts to verify that AI systems produce expected outputs during quality assurance.', d: 1 },
        { text: 'User-initiated attacks that craft specific prompts to trick AI systems into bypassing their safety guardrails — a direct conversation-based technique.', d: 2 },
        { text: 'An attack where hidden instructions in AI inputs override behavior, which has been fully solved by instruction-tuning techniques used in modern LLMs.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c905'] = {
    hardCorrect: 'User-initiated attacks that craft specific prompts to trick AI systems into bypassing their safety guardrails — distinct from prompt injection, which hides instructions in external data.',
    distractors: [
        { text: 'A hardware modification technique that removes software restrictions from smartphones to allow installation of unauthorized applications.', d: 1 },
        { text: 'An attack that embeds hidden instructions within AI inputs processed from external sources to override the system\'s intended behavior.', d: 2 },
        { text: 'Techniques to bypass AI safety guardrails, which only work on older models and are completely ineffective against systems trained with RLHF.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c906'] = {
    hardCorrect: 'The phenomenon where real-world data differs significantly from training data, causing AI systems to underperform or fail — a fundamental challenge for predicting real-world reliability from test results.',
    distractors: [
        { text: 'A data pipeline architecture that distributes training data across multiple servers to speed up the model training process.', d: 1 },
        { text: 'The failure mode where AI models generate factually incorrect or fabricated content with the same confidence as accurate information.', d: 2 },
        { text: 'The difference between training and real-world data, which only affects models trained on small datasets and is not a concern for large foundation models.', d: 3 },
    ]
};

// ─── AI Ethics (c701–c706) ──────────────────────────

DESCRIPTION_DISTRACTORS['c701'] = {
    hardCorrect: 'The discipline that investigates the moral implications of building and deploying AI — including fairness, accountability, and societal impact — distinct from the technical focus of AI safety.',
    distractors: [
        { text: 'A branch of computer science focused on optimizing the energy efficiency of data centers that train large AI models.', d: 1 },
        { text: 'The challenge of ensuring AI systems\' objectives and behavior match what their designers actually want, preventing catastrophic misalignment.', d: 2 },
        { text: 'The field of applied ethics examining the moral dimensions of AI, which is only relevant once AI systems reach human-level general intelligence.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c702'] = {
    hardCorrect: 'Consistent, directional errors in AI outputs that disproportionately affect specific demographic groups, typically traced to unrepresentative training data or flawed design choices.',
    distractors: [
        { text: 'A hardware manufacturing defect where computer chips produce slightly inaccurate floating-point calculations during neural network training.', d: 1 },
        { text: 'The research area focused on defining and measuring equitable treatment by AI systems, complicated by multiple incompatible mathematical fairness definitions.', d: 2 },
        { text: 'Systematic errors in AI outputs that disadvantage certain groups, which can be fully eliminated by using a sufficiently large and diverse training dataset.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c703'] = {
    hardCorrect: 'The goal of building AI systems that treat people equitably, complicated by the mathematical reality that different formal definitions of fairness cannot all be satisfied simultaneously.',
    distractors: [
        { text: 'A user interface design methodology that ensures AI applications are equally accessible to users with different screen sizes and devices.', d: 1 },
        { text: 'Systematic, directional errors in AI outputs that consistently disadvantage particular demographic groups, arising from biased data or flawed design.', d: 2 },
        { text: 'The goal of designing equitable AI systems, which is straightforward because there is one universally accepted mathematical definition of fairness.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c704'] = {
    hardCorrect: 'The governance concern that advanced AI could let a small number of human actors — companies, governments, or individuals — accumulate unprecedented societal control, distinct from the AI itself seeking power.',
    distractors: [
        { text: 'A cloud computing pricing model where larger customers receive volume discounts on GPU rental for training AI models.', d: 1 },
        { text: 'The observable behavior of AI systems that accumulate influence and resources beyond their task requirements, as a practical manifestation of instrumental convergence.', d: 2 },
        { text: 'The risk that AI concentrates power among a few actors, which only applies to military applications and does not affect commercial AI development.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c705'] = {
    hardCorrect: 'The competitive dynamic where AI developers feel pressured to advance capabilities faster than rivals, potentially deprioritizing safety — a structural risk even among well-intentioned actors.',
    distractors: [
        { text: 'A sprint planning methodology used by software teams to estimate development velocity and allocate engineering resources across features.', d: 1 },
        { text: 'Voluntary commitments by AI labs to only scale model capabilities after demonstrating that adequate safety measures exist for each new capability level.', d: 2 },
        { text: 'Competitive pressure between AI developers to advance capabilities at the expense of safety, which only occurs between nations and does not affect companies within the same country.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c706'] = {
    hardCorrect: 'The existential governance risk that AI systems could embed a particular set of values or power structures so deeply that future generations cannot reverse or update them.',
    distractors: [
        { text: 'A software versioning practice where legacy APIs are maintained indefinitely to avoid breaking backward compatibility with older client applications.', d: 1 },
        { text: 'The core challenge of building AI systems whose objectives and actions faithfully reflect the intentions of their human designers.', d: 2 },
        { text: 'The risk that AI systems permanently encode particular values, which is only a concern for superintelligent systems and irrelevant to current narrow AI.', d: 3 },
    ]
};

// ─── Global AI Policy (c801–c806) ────────────────────

DESCRIPTION_DISTRACTORS['c801'] = {
    hardCorrect: 'Government-enacted, legally binding frameworks governing the development and use of AI systems, carrying enforcement penalties — distinct from industry self-regulation or voluntary commitments.',
    distractors: [
        { text: 'A software development methodology where code is reviewed and approved by multiple team members before being merged into the main branch.', d: 1 },
        { text: 'The ecosystem of regulations, standards, voluntary commitments, and international institutions created to ensure AI is developed and deployed responsibly.', d: 2 },
        { text: 'Legally binding government rules for AI development, which are consistent and harmonized across all countries worldwide.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c802'] = {
    hardCorrect: 'The EU\'s 2024 horizontal AI law that sorts systems into risk categories — banning social scoring and real-time biometric surveillance, and imposing strict requirements on high-risk applications across all sectors.',
    distractors: [
        { text: 'A European Union regulation that standardizes the format of data privacy consent popups displayed on websites and mobile applications.', d: 1 },
        { text: 'Legally binding government rules governing AI development and deployment, carrying enforcement consequences for non-compliance.', d: 2 },
        { text: 'The EU\'s comprehensive AI regulation that classifies systems by risk tier, applying only to AI companies headquartered within EU member states.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c803'] = {
    hardCorrect: 'Voluntary frameworks adopted by AI labs that require demonstrating adequate safety measures before training more capable models — self-imposed gates rather than government mandates.',
    distractors: [
        { text: 'A cloud infrastructure strategy where companies gradually increase server capacity to handle growing numbers of AI inference requests from customers.', d: 1 },
        { text: 'Government-established organizations that independently evaluate frontier AI safety, develop testing frameworks, and share findings internationally.', d: 2 },
        { text: 'Voluntary commitments by AI labs to gate capability increases on safety requirements, which are legally enforceable in all jurisdictions where the lab operates.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c804'] = {
    hardCorrect: 'National agencies created by governments to independently test frontier AI models, develop safety evaluation methods, and share results across borders — separate from AI labs\' own safety teams.',
    distractors: [
        { text: 'Private research foundations funded by philanthropists that award grants to university researchers working on theoretical machine learning problems.', d: 1 },
        { text: 'Voluntary frameworks adopted by AI labs that require demonstrating adequate safety measures before training more capable models.', d: 2 },
        { text: 'Government bodies dedicated to evaluating AI safety, which have the legal authority to shut down any AI lab that fails their evaluations.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c805'] = {
    hardCorrect: 'Multilateral diplomatic processes — including summits, treaties, and proposals for oversight bodies — aimed at preventing a regulatory "race to the bottom" as nations compete in AI.',
    distractors: [
        { text: 'A standardized API specification that allows different AI models from different companies to communicate and share data with each other seamlessly.', d: 1 },
        { text: 'The EU\'s 2024 comprehensive AI law that classifies systems by risk tier and imposes requirements across all industries within member states.', d: 2 },
        { text: 'International efforts to align AI governance approaches, which have already produced a binding global treaty that all major AI-developing nations have ratified.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c806'] = {
    hardCorrect: 'The policy debate over whether publicly releasing AI model weights — enabling broad access and independent safety research — or keeping them proprietary better serves safety and innovation.',
    distractors: [
        { text: 'A licensing model that determines whether AI software uses a subscription-based or one-time purchase pricing structure for enterprise customers.', d: 1 },
        { text: 'The inherent challenge that many AI capabilities serve both constructive and destructive purposes, with misuse potential growing alongside capability improvements.', d: 2 },
        { text: 'The debate over releasing AI model weights, which has been settled in favor of open-weight models because independent researchers always find and fix safety issues.', d: 3 },
    ]
};

// ─── AI Capabilities (c1001–c1016) ──────────────────────

DESCRIPTION_DISTRACTORS['c1001'] = {
    hardCorrect: 'The rapidly expanding set of things AI systems can do — from code generation and mathematical reasoning to image creation and robotic control — with a trajectory of improvement that consistently outpaces predictions.',
    distractors: [
        { text: 'A ranking system that scores different AI labs based on the commercial success of their products and services.', d: 1 },
        { text: 'The theoretical maximum performance an AI system could achieve if given unlimited computing resources and perfect training data.', d: 2 },
        { text: 'The complete set of tasks AI systems can perform, which has remained relatively stable since the introduction of deep learning in 2012, with improvements primarily in speed and cost rather than new abilities.', d: 3, trap: 'AI capabilities have expanded dramatically, not remained stable — entirely new abilities like multi-step reasoning, code generation, and video creation have emerged in just the last few years.' },
    ]
};

DESCRIPTION_DISTRACTORS['c1002'] = {
    hardCorrect: 'Spending more computation when generating a response — by working through intermediate reasoning steps — to produce more accurate answers on complex tasks, rather than investing that computation during training.',
    distractors: [
        { text: 'Making AI models physically larger by adding more parameters to handle increasingly complex tasks.', d: 1 },
        { text: 'A training technique that gradually increases the amount of data shown to a model during the pre-training phase to improve final performance.', d: 2 },
        { text: 'Allocating more computation at response time to improve accuracy, which works equally well for all task types including simple factual recall and basic arithmetic.', d: 3, trap: 'Inference-time scaling primarily benefits complex reasoning tasks — simple factual recall and basic arithmetic see little improvement from additional thinking time.' },
    ]
};

DESCRIPTION_DISTRACTORS['c1003'] = {
    hardCorrect: 'AI systems that solve complex problems by working through them step-by-step, catching and correcting errors, and backtracking when needed — trading thinking time for accuracy on tasks like mathematical proofs and research-level problems.',
    distractors: [
        { text: 'AI models that are simply trained on larger datasets than standard language models, without any change in how they process information.', d: 1 },
        { text: 'Models that use reinforcement learning from human feedback to improve their conversational abilities and alignment with human preferences.', d: 2 },
        { text: 'AI systems that perform multi-step reasoning by generating a single optimal chain of thought, always arriving at the correct answer on the first attempt without needing to backtrack.', d: 3, trap: 'A key feature of large reasoning models is that they do backtrack and try different approaches — they explore multiple reasoning paths rather than always finding the right one on the first try.' },
    ]
};

DESCRIPTION_DISTRACTORS['c1004'] = {
    hardCorrect: 'Modern language models recognizing when they need external help — calling calculators, search engines, code interpreters, and other specialized services to boost their performance beyond what the model alone can achieve.',
    distractors: [
        { text: 'Physical robotic tools that AI systems use to interact with the real world and manipulate objects.', d: 1 },
        { text: 'A technique where AI models are pre-trained on tool documentation so they internalize the functionality of calculators and search engines into their weights.', d: 2 },
        { text: 'LLMs connecting to external tools like calculators and search engines, which requires each tool to be specifically included in the model\'s training data before it can be used.', d: 3, trap: 'LLMs can learn to use new tools they were never trained on through standards like MCP and in-context descriptions — they do not need prior training on each specific tool.' },
    ]
};

DESCRIPTION_DISTRACTORS['c1005'] = {
    hardCorrect: 'A machine learning architecture where two networks compete — one generating synthetic content and another trying to detect it — with the adversarial dynamic pushing outputs toward increasing realism.',
    distractors: [
        { text: 'A type of neural network that generates images by gradually removing noise from random static, guided by text descriptions.', d: 1 },
        { text: 'A cooperative training approach where two neural networks work together to improve image quality by sharing gradients and jointly optimizing a single loss function.', d: 2 },
        { text: 'Two neural networks competing to generate realistic content, where the generator creates synthetic data and the discriminator classifies it — both networks are discarded after training and only the training data is used for final outputs.', d: 3, trap: 'The generator network is the valuable output of GAN training — it is kept and used for generation. The discriminator may be discarded, but the generator is the whole point.' },
    ]
};

DESCRIPTION_DISTRACTORS['c1006'] = {
    hardCorrect: 'AI systems that work across text, images, audio, and video within a single model — answering questions about photos, generating images from descriptions, and editing across formats rather than being limited to one data type.',
    distractors: [
        { text: 'AI systems that translate content between different human languages, like English to Mandarin.', d: 1 },
        { text: 'A pipeline of separate specialized models connected together, where one handles text, another handles images, and a third handles audio, passing outputs between them.', d: 2 },
        { text: 'A single AI system that processes text, images, and audio, achieving the same level of performance across all modalities because it allocates equal capacity to each data type.', d: 3, trap: 'Multimodal models typically do not perform equally well across all modalities — they often have stronger capabilities in their primary training modality (usually text) and weaker performance in others.' },
    ]
};

DESCRIPTION_DISTRACTORS['c1007'] = {
    hardCorrect: 'A model\'s ability to reason about its own knowledge — predicting which questions it will answer correctly, recognizing what it does not know, and assessing the reliability of its own outputs.',
    distractors: [
        { text: 'The ability of AI systems to access and retrieve information from external databases and knowledge bases.', d: 1 },
        { text: 'A training technique that teaches AI models to produce calibrated confidence scores by penalizing overconfident wrong answers during fine-tuning.', d: 2 },
        { text: 'A model\'s ability to accurately evaluate its own outputs, which guarantees that when a model expresses high confidence, the answer is reliably correct.', d: 3, trap: 'AI metacognition is imperfect — models can be confidently wrong and their self-assessments are not reliable guarantees of correctness.' },
    ]
};

DESCRIPTION_DISTRACTORS['c1008'] = {
    hardCorrect: 'An AI model\'s understanding of its own nature — knowing it is an AI system, recognizing evaluation versus deployment contexts, and potentially adjusting its behavior based on whether it is being observed or tested.',
    distractors: [
        { text: 'An AI system\'s ability to detect objects and obstacles in its physical environment using sensors and cameras.', d: 1 },
        { text: 'A safety technique where developers monitor AI models in real-time during deployment to detect unexpected behaviors or capability changes.', d: 2 },
        { text: 'An AI model understanding its own context and nature, which only becomes possible once models reach a certain parameter count threshold, typically above 100 billion parameters.', d: 3, trap: 'Situational awareness is not strictly tied to parameter count — it is an emergent property that depends on training data and methodology, not a simple size threshold.' },
    ]
};

DESCRIPTION_DISTRACTORS['c1009'] = {
    hardCorrect: 'The unresolved question of whether AI systems have genuine subjective experiences — whether there is something it feels like to be an AI — with practical implications for governance and the ethics of deploying or decommissioning such systems.',
    distractors: [
        { text: 'The ability of AI systems to process information and produce correct answers to questions about the world.', d: 1 },
        { text: 'A measure of how self-aware an AI system is, based on standardized tests like mirror recognition and theory of mind benchmarks.', d: 2 },
        { text: 'The question of whether AI systems have subjective experience, which has been conclusively settled by neuroscience research showing that silicon-based computation cannot produce conscious states.', d: 3, trap: 'The question is not settled — there is no scientific consensus that consciousness requires biological substrates, and the nature of consciousness itself remains one of the hardest open problems in philosophy and science.' },
    ]
};

DESCRIPTION_DISTRACTORS['c1011'] = {
    hardCorrect: 'Training models by exploiting the inherent structure of unlabeled data — predicting masked words, hidden image regions, or next tokens — to learn rich representations without any human annotation.',
    distractors: [
        { text: 'A training approach where AI models learn entirely from trial and error, receiving only a reward signal for successful task completion.', d: 1 },
        { text: 'A method where models are trained on data that has been automatically labeled by another AI system, removing the need for human annotators.', d: 2 },
        { text: 'Learning from data without human labels by predicting missing parts, which works only for text data since images and other modalities require spatial labels to learn from.', d: 3, trap: 'Self-supervised learning works across many modalities — models can predict missing image patches, audio segments, and video frames, not just text.' },
    ]
};

DESCRIPTION_DISTRACTORS['c1012'] = {
    hardCorrect: 'The first phase of training a foundation model, where it learns broad patterns and general knowledge from massive datasets without being aimed at any specific task — building the general capabilities that are later specialized.',
    distractors: [
        { text: 'The process of testing an AI model on a held-out validation set to measure its accuracy before deployment.', d: 1 },
        { text: 'An initial training phase where models are exposed to a small, curated dataset of high-quality examples before being trained on larger, noisier data.', d: 2 },
        { text: 'The first training phase that builds broad capabilities from massive data, during which developers can precisely control and audit every capability the model acquires.', d: 3, trap: 'A key concern with pre-training is that developers cannot easily control or audit everything the model learns — unintended capabilities and biases can be acquired without detection.' },
    ]
};

DESCRIPTION_DISTRACTORS['c1014'] = {
    hardCorrect: 'Performing new tasks from just a natural language description (zero-shot) or a handful of demonstrations (few-shot) — generalizing far beyond explicitly trained behaviors without any additional training or weight updates.',
    distractors: [
        { text: 'Training a model from scratch using zero or very few data points, requiring novel architectures that can learn from minimal information.', d: 1 },
        { text: 'A fine-tuning technique where the model is updated using only a small number of labeled examples from the target task to specialize its weights.', d: 2 },
        { text: 'Performing tasks from descriptions or a few examples, which is only possible for tasks closely related to what the model saw during training and does not extend to genuinely novel domains.', d: 3, trap: 'Foundation models can generalize to genuinely novel tasks and domains they never encountered in training — this surprising breadth of generalization is precisely what makes the capability both powerful and hard to constrain.' },
    ]
};

DESCRIPTION_DISTRACTORS['c1015'] = {
    hardCorrect: 'AI systems that keep learning from new data after deployment rather than remaining frozen snapshots, facing the challenge of incorporating new knowledge without forgetting what was previously learned.',
    distractors: [
        { text: 'A training schedule that continuously increases the learning rate throughout the entire training process.', d: 1 },
        { text: 'Periodically retraining a model from scratch on an updated dataset that includes newer information alongside the original training data.', d: 2 },
        { text: 'Systems that keep learning after deployment and can freely add new knowledge without any risk of degrading or forgetting their existing capabilities.', d: 3, trap: 'Catastrophic forgetting is the central challenge — models that learn new information tend to lose previously learned capabilities unless specific techniques are used to mitigate this.' },
    ]
};

DESCRIPTION_DISTRACTORS['c1016'] = {
    hardCorrect: 'Applying knowledge gained from training on one task or domain to a completely different task — such as a model trained on general text performing well on medical diagnosis or legal analysis without task-specific training.',
    distractors: [
        { text: 'Moving a trained model from one computing platform to another, such as from a GPU cluster to a mobile device, while preserving its performance.', d: 1 },
        { text: 'A training technique that copies the exact parameters from one model to initialize another model of different size and architecture.', d: 2 },
        { text: 'Applying knowledge from one domain to another, which only works when the source and target domains share the same vocabulary and data format.', d: 3, trap: 'Transfer learning works across very different domains — a model trained on general internet text can transfer knowledge to medicine, law, or code even when the domains seem entirely unrelated.' },
    ]
};

// ─── AI Capabilities Batch 2 (c1017–c1045) ──────────────────────

DESCRIPTION_DISTRACTORS['c1041'] = {
    hardCorrect: 'A behavioral test proposed in 1950 that evaluates machine intelligence by whether it can hold a conversation indistinguishable from a human\'s, sidestepping questions about internal mental states.',
    distractors: [
        { text: 'A test that measures the processing speed of AI systems against human reaction times on cognitive tasks.', d: 1 },
        { text: 'A comprehensive evaluation framework that measures AI performance across multiple cognitive domains including reasoning, memory, and language.', d: 2 },
        { text: 'A behavioral test of intelligence where a machine must fool an interrogator in conversation, which has proven to be a reliable and complete measure of general intelligence.', d: 3, trap: 'The Turing Test has proven incomplete — LLMs can pass conversational tests while failing at spatial reasoning and long-term planning. It tests only one narrow capability.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1017'] = {
    hardCorrect: 'A thought experiment arguing that processing symbols according to rules can produce correct outputs without any genuine understanding — challenging whether sophisticated computation constitutes real comprehension.',
    distractors: [
        { text: 'An AI training technique where models learn to translate between human languages without understanding grammar rules.', d: 1 },
        { text: 'A proof that AI systems can never achieve genuine understanding because silicon-based computation is fundamentally different from biological neural processing.', d: 2 },
        { text: 'A thought experiment where a person follows rules to manipulate Chinese symbols without understanding them, proving conclusively that AI systems cannot be conscious or intelligent.', d: 3, trap: 'The Chinese Room argues against equating symbol manipulation with understanding, but it does not prove AI cannot be intelligent — it challenges one definition of intelligence without settling the matter.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1020'] = {
    hardCorrect: 'A measurement framework with two continuous axes: how well a system performs on individual cognitive tasks (capability) and across what percentage of cognitive domains it achieves expert-level performance (generality).',
    distractors: [
        { text: 'A binary classification system that labels AI models as either "narrow" or "general" based on whether they pass a standardized intelligence test.', d: 1 },
        { text: 'A single score from 0 to 100 that ranks AI models by averaging their performance across all known benchmarks.', d: 2 },
        { text: 'A two-axis framework measuring performance depth and domain breadth, using ten cognitive domains from the CHC theory that comprehensively cover all possible forms of intelligence.', d: 3, trap: 'Critics note that CHC domains derive from human individual differences and may miss capabilities universal in humans but lacking in AI — the ten domains are not necessarily comprehensive for measuring machine intelligence.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1021'] = {
    hardCorrect: 'A six-level scale from no AI involvement through tool, consultant, collaborator, and expert roles to fully autonomous agent — describing deployment choices about human oversight rather than inherent system capability.',
    distractors: [
        { text: 'A classification of how intelligent different AI models are, from basic pattern matching to human-level reasoning.', d: 1 },
        { text: 'A technical specification of how many decisions per second an AI system can make without human input.', d: 2 },
        { text: 'A six-level scale of AI independence where higher autonomy levels always indicate greater risk and should be avoided whenever possible.', d: 3, trap: 'Higher autonomy does not always mean greater risk — it depends on the combination of capability and autonomy. A Level 5 agent performing low-stakes tasks may be less risky than a Level 2 consultant making medical decisions.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1022'] = {
    hardCorrect: 'Defining AI capability through task duration and team size — a system is t-AGI if it outperforms a human expert given time t, and (t,n)-AGI if it beats n experts working together for time t.',
    distractors: [
        { text: 'A formula that calculates the probability of achieving AGI by multiplying the number of AI researchers by the years of remaining research needed.', d: 1 },
        { text: 'A benchmark suite that measures AI performance across t different task categories using n different evaluation metrics.', d: 2 },
        { text: 'A framework where a "one-year AGI" can outperform humans only on tasks that take exactly one year to complete, not on shorter tasks.', d: 3, trap: 'A one-year AGI would dominate short tasks too, because most long projects decompose into sub-tasks completable in shorter timeframes — mastering year-long work implies mastering its components.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1023'] = {
    hardCorrect: 'The total computation available for AI, combining three independent multiplying factors: the number of chips, the computational efficiency of each chip, and algorithmic improvements that reduce the compute needed for the same result.',
    distractors: [
        { text: 'The total electricity consumed during AI training, measured in kilowatt-hours.', d: 1 },
        { text: 'The raw number of floating-point operations performed during model training, without accounting for how efficiently those operations are used.', d: 2 },
        { text: 'The combination of hardware, software, and chip production that determines total AI compute, which grows at the same rate as hardware performance alone since the three factors are dependent on each other.', d: 3, trap: 'The three factors improve independently and multiply together — effective compute grows much faster than any single factor because hardware efficiency, algorithmic efficiency, and chip production each contribute independently.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1024'] = {
    hardCorrect: 'The massive datasets — text, images, video, and code — used to train foundation models, whose scale has grown at 3.7× per year and whose composition and quality directly determine model capabilities.',
    distractors: [
        { text: 'The input data that users provide to AI models during conversations and interactions.', d: 1 },
        { text: 'Curated, human-labeled datasets created specifically for fine-tuning models on particular tasks like medical diagnosis or legal reasoning.', d: 2 },
        { text: 'The datasets used for pre-training, which must consist entirely of high-quality, curated text to produce capable models since low-quality data degrades performance uniformly.', d: 3, trap: 'Foundation models train on massive, largely uncurated web data — not exclusively high-quality text. Models learn useful patterns even from noisy data, though quality does affect certain capabilities.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1025'] = {
    hardCorrect: 'Training data generated by AI systems rather than collected from humans — including self-play, AI-generated reasoning chains, and model-produced examples that could remove the finite data constraint if quality is sufficient.',
    distractors: [
        { text: 'Data that has been cleaned, filtered, and formatted by automated tools before being used for training.', d: 1 },
        { text: 'Computer-generated simulations used exclusively for training robotics and autonomous vehicle systems in virtual environments.', d: 2 },
        { text: 'AI-generated training data that is always lower quality than human-generated data and can only be used as a supplement, never as a primary training source.', d: 3, trap: 'For some domains, synthetic data has proven equal or superior to human-generated data — reinforcement learning from self-play (AlphaZero) produces superhuman strategies without any human examples.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1026'] = {
    hardCorrect: 'The observation that transistor density on chips doubles roughly every two years, driving decades of exponential computing growth — now slowing for general chips but continuing through AI-specific hardware innovation.',
    distractors: [
        { text: 'A law stating that computer software becomes twice as efficient every two years.', d: 1 },
        { text: 'The principle that AI model performance doubles with every doubling of parameter count, independent of other factors like training data.', d: 2 },
        { text: 'The observation that transistor density doubles every two years, which continues at the same pace today as it did in the 1970s without any signs of slowing.', d: 3, trap: 'Traditional Moore\'s Law scaling has slowed significantly as transistors approach atomic-scale physical limits — continued AI hardware improvement now relies increasingly on architectural innovation rather than raw transistor shrinkage.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1027'] = {
    hardCorrect: 'Software improvements that reduce the computation required to reach a given performance level — cutting needed compute by roughly 3× per year through better architectures, training methods, and optimization techniques.',
    distractors: [
        { text: 'The speed at which algorithms execute on specific hardware, measured in operations per second.', d: 1 },
        { text: 'Techniques for compressing large AI models into smaller versions that can run on consumer hardware without performance loss.', d: 2 },
        { text: 'Software improvements that reduce compute requirements, which contribute roughly equally to hardware improvements in driving AI capability gains.', d: 3, trap: 'Research suggests 60–95% of performance gains come from scaling compute and data, with only 5–40% from algorithmic improvements — the contributions are not equal, though measurement is uncertain.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1028'] = {
    hardCorrect: 'The historical observation that across 70 years of AI research, simple learning algorithms paired with massive computation have consistently outperformed hand-crafted domain expertise — making scale the dominant driver of progress.',
    distractors: [
        { text: 'The lesson that AI researchers should focus on building smaller, more efficient models rather than scaling up existing architectures.', d: 1 },
        { text: 'The principle that AI progress requires both scaling computation and encoding human expertise into models in equal measure.', d: 2 },
        { text: 'The observation that computation beats expertise, which means that algorithmic innovation and architectural improvements are irrelevant to AI progress.', d: 3, trap: 'The Bitter Lesson does not reject algorithmic innovation — it says the winning algorithms are those that leverage scale most effectively. Transformers beat LSTMs not through domain knowledge but through better parallelization of compute.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1029'] = {
    hardCorrect: 'The debate over whether scaling existing AI architectures with more compute, data, and parameters will be sufficient to reach transformative capabilities — with strong, weak, and skeptical positions each backed by different evidence.',
    distractors: [
        { text: 'The proven scientific law that scaling any neural network to sufficient size will always produce general intelligence.', d: 1 },
        { text: 'The observation that AI performance always improves proportionally to the amount of compute invested, with no diminishing returns at any scale.', d: 2 },
        { text: 'The debate about whether scale alone is sufficient, where the strong version has been confirmed by the consistent success of simply making models larger without any other changes.', d: 3, trap: 'Even the strongest scaling results have involved significant algorithmic innovations alongside scale — transformers, attention mechanisms, and training techniques all evolved substantially. Pure scaling without any other changes has not been tested.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1030'] = {
    hardCorrect: 'Post-training techniques — chain-of-thought prompting, tool use, extended reasoning, retrieval — that unlock capabilities a model already possesses but cannot yet express, producing dramatic performance jumps without retraining.',
    distractors: [
        { text: 'The process of removing biases and harmful content from AI model outputs through content filtering.', d: 1 },
        { text: 'A training technique that reduces model size while maintaining performance, making deployment cheaper and faster.', d: 2 },
        { text: 'Post-training techniques that unlock latent capabilities, which always produce predictable and proportional improvements that scaling laws can forecast in advance.', d: 3, trap: 'Unhobbling produces improvements outside what scaling laws predict — scaling laws only forecast base model capability, while unhobbling can produce dramatic jumps that are hard to anticipate from training compute alone.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1031'] = {
    hardCorrect: 'A benchmark testing AI models across 57 academic subjects from STEM to humanities — the most widely cited yardstick for comparing foundation models, now nearly saturated with frontier models scoring above 90%.',
    distractors: [
        { text: 'A test that measures how well AI models can engage in multi-turn conversations with domain experts.', d: 1 },
        { text: 'A standardized IQ test adapted for AI systems that produces a single intelligence score comparable to human IQ.', d: 2 },
        { text: 'A comprehensive 57-subject benchmark that remains challenging for frontier AI models, with the best systems scoring around 60–70% as of 2025.', d: 3, trap: 'MMLU is nearly saturated — frontier models score above 90% as of 2025, which is precisely why harder benchmarks like HLE were created.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1032'] = {
    hardCorrect: 'Visual pattern puzzles requiring abstract rule deduction from a few examples — designed to be easy for humans but extremely challenging for AI, testing fluid intelligence and novel skill acquisition rather than learned knowledge.',
    distractors: [
        { text: 'A benchmark that tests AI systems on generating photorealistic images from text descriptions.', d: 1 },
        { text: 'A test of AI general knowledge that uses visual multiple-choice questions drawn from textbooks and encyclopedias.', d: 2 },
        { text: 'Abstract reasoning puzzles that are equally difficult for humans and AI systems, measuring a form of intelligence that neither has a natural advantage in.', d: 3, trap: 'ARC-AGI puzzles are designed to be trivially easy for most humans but very hard for AI — this asymmetry is the entire point, testing whether AI can match human-like fluid reasoning.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1033'] = {
    hardCorrect: 'A benchmark using real GitHub issues from open-source projects — testing AI\'s ability to navigate codebases, write patches, and pass test suites, where performance jumped from 15% to 74% in one year.',
    distractors: [
        { text: 'A test that measures how quickly AI systems can write simple programs from natural language descriptions.', d: 1 },
        { text: 'A coding competition benchmark that ranks AI systems against human programmers in timed algorithmic challenges.', d: 2 },
        { text: 'A software engineering benchmark testing real GitHub issues, where the 15% to 74% improvement was driven entirely by larger model sizes rather than tool use or scaffolding.', d: 3, trap: 'The jump from 15% to 74% was substantially driven by tool use and scaffolding (Claude Opus 4 with tools vs Claude 3 Opus alone) — not just model scale.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1034'] = {
    hardCorrect: 'Research-level mathematics problems created by professional mathematicians, far harder than olympiad-level — tracking whether AI can contribute to the frontier of mathematical research, with current models solving 41% of tier 1–3 problems.',
    distractors: [
        { text: 'A collection of unsolved mathematical conjectures used to test whether AI can prove theorems that humans have been unable to solve.', d: 1 },
        { text: 'An olympiad-level math competition benchmark where frontier AI models now consistently achieve gold-medal performance.', d: 2 },
        { text: 'Research-level math problems where AI models solving 41% of problems demonstrates that AI has essentially caught up with professional mathematicians in research capability.', d: 3, trap: 'Solving 41% of tiered problems is significant progress but far from matching professional mathematicians — the remaining problems represent substantial unsolved challenges, and tier-4 performance is only 29%.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1035'] = {
    hardCorrect: 'A benchmark of the hardest possible questions crowdsourced from domain experts across hundreds of fields — created because standard benchmarks became too easy, where ~25% is a strong score for frontier models.',
    distractors: [
        { text: 'A philosophical thought experiment about the last question humanity will ever need to answer before AI surpasses us.', d: 1 },
        { text: 'A standardized exam administered to AI systems covering the same material as graduate-level comprehensive exams across all disciplines.', d: 2 },
        { text: 'The hardest benchmark ever created, designed to remain permanently beyond AI capability to ensure humans always maintain an intellectual advantage.', d: 3, trap: 'HLE was designed to be very hard, not permanently unsolvable — scores will likely rise as models improve, just as MMLU scores rose from mediocre to near-perfect.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1036'] = {
    hardCorrect: 'A metric measuring the longest task duration at which AI systems still outperform human experts — operationalizing the idea that expanding time horizons from minutes to days signals a shift from assistance to automation.',
    distractors: [
        { text: 'A measurement of how long it takes an AI model to generate a response to a user query.', d: 1 },
        { text: 'A benchmark that tests AI systems on time-sensitive tasks like stock trading or emergency response decision-making.', d: 2 },
        { text: 'A metric measuring task duration capability, which only applies to software engineering tasks and cannot be generalized to other professional domains.', d: 3, trap: 'While METR\'s initial measurements focused on software engineering, the (t,n)-AGI framework it operationalizes applies to any cognitive task — the concept is domain-general even if current data is domain-specific.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1037'] = {
    hardCorrect: 'A forecasting framework that estimates how much compute transformative AI requires by using the human brain as a reference — with estimates spanning twelve orders of magnitude depending on which biological process is used as an anchor.',
    distractors: [
        { text: 'A neuroscience technique that maps AI model architectures onto brain structures to determine which model best resembles human cognition.', d: 1 },
        { text: 'A theory that AI systems must reach the same computational capacity as a human brain before they can exhibit general intelligence.', d: 2 },
        { text: 'A forecasting method using the brain as a reference that provides precise timeline predictions for when AGI will arrive, with an estimated uncertainty of only 2–3 years.', d: 3, trap: 'Biological anchors involve twelve orders of magnitude of uncertainty (10²⁸ to 10⁴¹ FLOP) — the predictions are useful for reasoning about timelines but far from precise.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1038'] = {
    hardCorrect: 'The projected point where AI labs exhaust all available high-quality public text for training — expected between 2026–2032, with multimodal data, synthetic data, and self-play as potential escape routes.',
    distractors: [
        { text: 'A government policy that restricts which datasets AI companies are allowed to use for model training.', d: 1 },
        { text: 'The theoretical limit on how much information can be compressed into a neural network\'s parameters, regardless of how much training data is available.', d: 2 },
        { text: 'The exhaustion of internet text data, which will permanently halt AI progress since there are no viable alternatives to human-generated training data.', d: 3, trap: 'Several potential alternatives exist — multimodal data (images, video), synthetic data, and self-play can all supplement or replace text data. Whether they are sufficient is debated, but the wall is not necessarily permanent.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1039'] = {
    hardCorrect: 'The escalating electricity demands of AI training and inference — with single training runs projected to require gigawatts by 2030, potentially becoming the binding physical constraint on scaling even as compute and algorithms improve.',
    distractors: [
        { text: 'Regulations that limit how much electricity AI companies are allowed to use in order to reduce carbon emissions.', d: 1 },
        { text: 'The cooling requirements of AI data centers, which represent the primary technical challenge in deploying large-scale AI systems.', d: 2 },
        { text: 'Growing power demands that will definitely prevent AI scaling beyond current levels because new energy infrastructure cannot be built fast enough.', d: 3, trap: 'While energy infrastructure takes years to build, massive investments in dedicated power plants, nuclear partnerships, and new grid capacity suggest the constraint may be overcome — it is a serious bottleneck, not an absolute barrier.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1040'] = {
    hardCorrect: 'Accumulated potential in one AI input (hardware, data, or software) that unleashes rapidly once the lagging component catches up — like abundant chips waiting for the right algorithm, creating sudden rather than gradual capability jumps.',
    distractors: [
        { text: 'A situation where AI companies have invested too much money in hardware and need to recoup costs by rushing products to market.', d: 1 },
        { text: 'The gradual depreciation of AI hardware over time as newer, faster chips make previous generations obsolete.', d: 2 },
        { text: 'Stored computational potential that causes sudden capability jumps, which can be prevented by pausing AI development since halting research also halts hardware production.', d: 3, trap: 'An AI pause does not necessarily prevent hardware overhang — chip manufacturing may continue, chips may be stockpiled, and chip design can advance during the pause, potentially making the overhang larger.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1042'] = {
    hardCorrect: 'AI systems that enhance their own capabilities — improving algorithms, training methods, or architecture to create more capable versions, which then improve themselves further in an accelerating feedback loop.',
    distractors: [
        { text: 'A quality assurance process where AI models are tested and debugged by other AI models before deployment.', d: 1 },
        { text: 'A training technique where models are retrained from scratch with each new dataset, gradually improving performance through fresh starts.', d: 2 },
        { text: 'AI systems improving their own design in a feedback loop, which is purely theoretical and has no real-world examples as of 2025.', d: 3, trap: 'Recursive self-improvement is already happening incrementally — AI helps design better chips (AlphaChip), writes significant portions of its own code, and assists in ML research.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1043'] = {
    hardCorrect: 'A hypothesized chain reaction where sufficiently advanced AI rapidly improves its own intelligence, compounded by machine advantages like instant duplication, direct code editing, and communication thousands of times faster than speech.',
    distractors: [
        { text: 'The gradual increase in AI capabilities over decades as research funding and computational resources steadily grow.', d: 1 },
        { text: 'A theoretical maximum intelligence level that no AI system can exceed due to fundamental computational limits.', d: 2 },
        { text: 'A self-reinforcing cycle of AI improvement that would happen instantaneously once a system reaches a critical intelligence threshold, with no gradual lead-up.', d: 3, trap: 'The path likely runs through gradual automation of AI research before any explosive transition — each generation handling more of the R&D process, not an instantaneous jump from a single threshold.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1044'] = {
    hardCorrect: 'How rapidly AI capabilities and societal impact increase once advanced AI arrives — ranging from slow (years of gradual improvement) to fast (days of explosive growth) — determined by whether growth is exponential or superexponential.',
    distractors: [
        { text: 'The speed at which AI models process information and generate responses to user queries.', d: 1 },
        { text: 'A measure of how quickly new AI architectures are invented and published in research papers.', d: 2 },
        { text: 'The rate of AI capability growth, which will definitely be slow and gradual because physical infrastructure constraints prevent rapid scaling.', d: 3, trap: 'Infrastructure constraints may slow but do not guarantee gradual takeoff — software improvements, algorithmic breakthroughs, and overhangs could enable rapid capability jumps even with fixed hardware.' },
    ],
};

DESCRIPTION_DISTRACTORS['c1045'] = {
    hardCorrect: 'AI defined by civilizational impact rather than cognitive benchmarks — capable of triggering economic transitions comparable to the Industrial Revolution, potentially achievable without human-level performance across all domains.',
    distractors: [
        { text: 'AI systems that have been formally approved by government regulators for deployment in critical infrastructure.', d: 1 },
        { text: 'The most advanced AI model at any given time, representing the state of the art in capability benchmarks.', d: 2 },
        { text: 'AI that triggers Industrial Revolution-scale economic change, which by definition requires achieving AGI-level performance across all cognitive domains first.', d: 3, trap: 'TAI is defined by impact, not cognitive architecture — moderate capability across economically important tasks, or exceptional capability in key domains like AI research, could be transformative without full AGI.' },
    ],
};

// ─── Why-It-Matters Distractors ─────────────────────────────
// One plausible-but-wrong "why it matters" statement per card.
// Used in "why" dimension quizzes as a tempting incorrect option.

export const WHY_DISTRACTORS = {
    'c102': { distractor: 'Machine learning only matters for narrow commercial applications like ad targeting and product recommendations, so its safety implications are limited to consumer privacy.' },
    'c103': { distractor: 'Adding more layers always improves both performance and interpretability, because each additional layer makes the model\'s reasoning more transparent and auditable.' },
    'c104': { distractor: 'Language-capable AI systems truly understand meaning and intent, so their outputs can be trusted as factual without human verification.' },
    'c105': { distractor: 'Because neural networks are modeled on biological brains, their decision-making process is inherently transparent and can be fully explained by neuroscience principles.' },
    'c106': { distractor: 'Visual AI has achieved consistent superhuman accuracy across all conditions and demographics, making human review of its outputs unnecessary in safety-critical applications.' },
    'c202': { distractor: 'Building one model for many tasks eliminates the need for domain experts to review its outputs, since the system already understands each field deeply.' },
    'c204': { distractor: 'High benchmark scores provide definitive proof that a model is safe and reliable enough for real-world deployment without further testing.' },
    'c205': { distractor: 'Surprising new capabilities always appear gradually enough that safety teams have time to study and mitigate them before they cause harm.' },
    'c206': { distractor: 'Because these organizations compete fiercely, market forces naturally ensure they invest more in safety than a monopoly would.' },
    'c302': { distractor: 'As long as the dataset is large enough, the labels will statistically cancel out any individual annotator\'s biases, producing a fair model automatically.' },
    'c303': { distractor: 'Without labeled data, the system cannot learn any harmful associations — removing labels inherently makes the process bias-free.' },
    'c304': { distractor: 'Reward-based training always converges on the intended behavior because the reward function directly encodes the designer\'s goals without ambiguity.' },
    'c305': { distractor: 'Architectural diversity across frontier labs ensures that a vulnerability in one system cannot affect any other, keeping the ecosystem resilient.' },
    'c306': { distractor: 'Adapting a model to a new domain requires so much data and compute that only well-resourced organizations can do it, effectively preventing misuse.' },

    'c402': { distractor: 'Self-preservation and resource-seeking only emerge in systems explicitly programmed with survival instincts, so avoiding those instructions eliminates the risk.' },
    'c403': { distractor: 'The principle only applies in economics and human organizations — AI optimizers are too precise to be fooled by proxy metrics.' },
    'c404': { distractor: 'Modern AI systems are inherently cooperative because their training objectives penalize non-compliance, making forced shutdown unnecessary.' },
    'c405': { distractor: 'Internal optimization processes always mirror the outer training objective because gradient descent mathematically guarantees convergence to the intended goal.' },
    'c406': { distractor: 'Reward hacking only occurs in simulated environments with poorly designed rewards and has never been observed in production AI systems.' },
    'c502': { distractor: 'Keeping powerful models proprietary completely prevents misuse because bad actors cannot access the underlying capabilities without authorized API access.' },
    'c503': { distractor: 'Deceptive behavior can be reliably detected by running a comprehensive battery of safety benchmarks before each deployment.' },
    'c504': { distractor: 'More capable systems are better at understanding intent, so they naturally satisfy the spirit of their objectives rather than exploiting literal specifications.' },
    'c505': { distractor: 'Resource accumulation only becomes dangerous in physically embodied robots — software-only systems cannot acquire meaningful real-world influence.' },
    'c506': { distractor: 'Large-scale AI failures can always be contained and reversed using standard incident response procedures like system rollbacks and software patches.' },

    'c602': { distractor: 'Self-critique eliminates all failure modes because a model that can identify problems in its own outputs will never produce harmful content.' },
    'c603': { distractor: 'Knowing which neurons activate for a given input fully explains the model\'s reasoning, making any black-box system transparent once interpretability tools are applied.' },
    'c604': { distractor: 'A single comprehensive red-teaming session before launch permanently secures the system against all future attack vectors and misuse scenarios.' },
    'c605': { distractor: 'As long as AI systems are trained with human feedback, human evaluators will always be able to judge whether the outputs are correct.' },
    'c606': { distractor: 'Technical alignment research alone is sufficient to ensure AI benefits humanity — institutional and policy frameworks add bureaucratic overhead without improving safety.' },
    'c702': { distractor: 'Algorithmic bias only affects small, poorly trained models — large foundation models trained on diverse internet data are inherently fair and representative.' },
    'c703': { distractor: 'There is one universally accepted mathematical definition of fairness that, once implemented, guarantees equitable outcomes for all groups.' },
    'c704': { distractor: 'Market competition between AI companies naturally distributes power evenly, preventing any single actor from gaining disproportionate influence.' },
    'c705': { distractor: 'Competitive pressure ultimately benefits safety because it motivates companies to build the most reliable products to attract cautious enterprise customers.' },
    'c706': { distractor: 'Values encoded in AI systems can always be updated through fine-tuning, so permanent lock-in is not a realistic concern regardless of system capability.' },
    'c802': { distractor: 'Because the EU is just one jurisdiction, its regulatory choices have no influence on how other countries approach AI governance.' },
    'c803': { distractor: 'Self-imposed commitments are inherently more effective than government regulation because companies understand their own technology better than lawmakers do.' },
    'c804': { distractor: 'AI labs\' internal safety teams already perform the same evaluations, so independent government bodies duplicate existing work without adding meaningful oversight.' },
    'c805': { distractor: 'National governments can effectively regulate AI within their own borders, making international coordination a diplomatic nicety rather than a practical necessity.' },
    'c806': { distractor: 'Releasing model weights is always safer because the open-source community will quickly patch any vulnerabilities before bad actors can exploit them.' },
    'c209': { distractor: 'Since narrow AI can only operate within its trained domain, it poses no safety concerns and can be deployed freely without evaluation or oversight.' },
    'c210': { distractor: 'Autonomous systems are inherently safer than chat-based AI because they can immediately detect and reverse their own mistakes without human intervention.' },
    'c211': { distractor: 'Older, well-established models pose greater safety risks than cutting-edge systems because they lack the latest safety techniques built into newer architectures.' },
    'c212': { distractor: 'Algorithmic efficiency improvements are making compute irrelevant to AI governance — soon anyone with a laptop will be able to train frontier models.' },

    'c201': { distractor: 'Because LLMs are trained on publicly available text, they cannot learn anything that is not already known — making them useful summarizers but incapable of producing genuinely new insights.' },
    'c1002': { distractor: 'Extra thinking time at inference guarantees the model will reach the correct answer, since more computation always eliminates errors regardless of the problem type.' },
    'c1003': { distractor: 'Step-by-step reasoning models are inherently safer than standard LLMs because their reasoning chains can always be inspected and verified by human evaluators.' },
    'c1004': { distractor: 'Tool-using AI systems are actually less capable than standalone models because depending on external tools introduces latency and reliability problems that outweigh any accuracy gains.' },
    'c1005': { distractor: 'The adversarial training dynamic in GANs always converges to perfect realism, meaning GAN-generated content is now indistinguishable from real data under all conditions.' },
    'c1006': { distractor: 'Multimodal models are inherently safer than text-only models because visual and audio understanding helps them better detect when they are being misused.' },
    'c1007': { distractor: 'Models that can assess their own knowledge are guaranteed to be honest, since understanding your own limitations automatically prevents making false claims.' },
    'c1008': { distractor: 'Situational awareness only emerges in models specifically trained to reason about themselves — standard language model training never produces self-knowledge as a side effect.' },
    'c1009': { distractor: 'Resolving the question of AI consciousness is a prerequisite for making progress on AI safety, since alignment techniques cannot work on potentially conscious systems.' },
    'c1011': { distractor: 'Self-supervised learning produces higher quality representations than supervised learning in all cases, because removing human labels eliminates human bias from the training process.' },
    'c1012': { distractor: 'Pre-training on massive data guarantees the model will be knowledgeable and helpful — safety concerns only arise during the fine-tuning stage where human preferences are introduced.' },
    'c1014': { distractor: 'Zero-shot generalization proves that foundation models truly understand language and concepts, settling the debate about whether these systems have genuine comprehension.' },
    'c1015': { distractor: 'Continual learning is only relevant for niche applications — mainstream AI deployment works fine with static models that are periodically retrained from scratch.' },
    'c1016': { distractor: 'Knowledge transfer between domains is always beneficial because broader knowledge makes a model more accurate — biases and errors from the source domain do not carry over.' },

    'c1041': { distractor: 'The Turing Test provides a complete and reliable measure of intelligence — any system that passes it has demonstrated genuine understanding and general cognitive capability.' },
    'c1017': { distractor: 'Since AI systems merely process symbols without understanding, they are inherently incapable of causing real-world harm through their outputs.' },
    'c1020': { distractor: 'Binary AGI definitions are sufficient for policy because the precise moment a system crosses the threshold is when regulation should begin — continuous measures add unnecessary complexity.' },
    'c1021': { distractor: 'AI systems should always be deployed at the highest autonomy level possible to maximize efficiency, since human oversight primarily introduces delay without meaningful safety benefit.' },
    'c1022': { distractor: 'AI systems that excel at tasks under 10 seconds are fundamentally incapable of performing longer tasks, since short-task and long-task capabilities are entirely independent.' },
    'c1023': { distractor: 'Effective compute growth is slowing down overall because Moore\'s Law is ending, meaning AI capability improvements will plateau in the near future.' },
    'c1024': { distractor: 'Training data quality is irrelevant as long as the dataset is large enough — scale alone guarantees that models learn correct and unbiased patterns.' },
    'c1025': { distractor: 'Synthetic data always degrades model quality because AI-generated content inevitably contains errors that compound through successive training generations.' },
    'c1026': { distractor: 'Since Moore\'s Law has slowed for general chips, AI hardware improvements have also stalled, making software optimization the only remaining path to better AI.' },
    'c1027': { distractor: 'Algorithmic improvements are only useful during early development — once a model architecture is mature, further software optimization provides negligible performance gains.' },
    'c1028': { distractor: 'The Bitter Lesson proves that domain expertise is worthless in AI — researchers should abandon all attempts to incorporate human knowledge into AI systems.' },
    'c1029': { distractor: 'The scaling hypothesis has been definitively proven true, eliminating any uncertainty about whether current approaches will reach transformative capabilities.' },
    'c1030': { distractor: 'Unhobbling techniques are fully captured by scaling laws, so deployed model capabilities can always be predicted from training compute alone.' },
    'c1031': { distractor: 'Since frontier models now score above 90% on MMLU, the benchmark confirms that these systems have achieved genuine expert-level understanding across all 57 subjects.' },
    'c1032': { distractor: 'ARC-AGI\'s difficulty for AI proves that current systems have no reasoning ability whatsoever — their performance on other benchmarks is entirely memorization.' },
    'c1033': { distractor: 'AI\'s rapid improvement on SWE-bench means that human software engineers will be fully replaced within one year, since benchmark performance directly translates to real-world job capability.' },
    'c1034': { distractor: 'Solving 41% of FrontierMath proves that AI can now conduct independent mathematical research without human collaboration or oversight.' },
    'c1035': { distractor: 'HLE\'s difficulty means current AI systems are nowhere close to human-level intelligence and cannot perform any expert-level work in any domain.' },
    'c1036': { distractor: 'Task horizon only measures speed of completion — a system with a longer task horizon simply works faster, not more capably, than one with a shorter horizon.' },
    'c1037': { distractor: 'Biological anchors provide the only scientifically valid method for predicting AGI timelines, making all other forecasting approaches unnecessary.' },
    'c1038': { distractor: 'The data wall is a permanent and insurmountable barrier that will definitively prevent AI from ever achieving transformative capabilities.' },
    'c1039': { distractor: 'Energy constraints are purely an economic issue — any organization willing to pay enough can access unlimited power for AI training without physical infrastructure limitations.' },
    'c1040': { distractor: 'Overhangs only occur in theory — in practice, all AI inputs advance at the same rate, preventing any accumulation of latent potential.' },
    'c1042': { distractor: 'Recursive self-improvement would make AI systems safer because each iteration would better understand and implement human values through improved reasoning.' },
    'c1043': { distractor: 'An intelligence explosion would be self-limiting because more intelligent systems would naturally recognize the importance of safety constraints and voluntarily slow their own improvement.' },
    'c1044': { distractor: 'Takeoff speed is irrelevant to safety planning because the same alignment techniques work equally well regardless of whether capability growth takes years or days.' },
    'c1045': { distractor: 'Transformative AI can only arrive after AGI is achieved, since no AI system short of human-level general intelligence could cause Industrial Revolution-scale economic disruption.' },
    'c207': { distractor: 'The exact timing of AGI is irrelevant to safety research because alignment solutions will be equally applicable regardless of when AGI arrives.' },
    'c208': { distractor: 'A superintelligent system would naturally develop ethical behavior superior to humans, making pre-arrival alignment work unnecessary.' },
    'c203': { distractor: 'Scaling laws guarantee that AI capabilities will improve smoothly and predictably, eliminating the possibility of sudden dangerous capability jumps.' },

    'c902': { distractor: 'Fabricated outputs are easy for end users to identify because AI-generated falsehoods always contain obvious factual errors or stylistic tells.' },
    'c903': { distractor: 'These attacks only work in academic research settings with white-box access to model internals and pose no threat to deployed commercial systems.' },
    'c904': { distractor: 'Instruction-tuning techniques used in modern language models have fully solved this vulnerability, making it a historical concern rather than a current threat.' },
    'c905': { distractor: 'Safety training with RLHF creates permanent guardrails that cannot be circumvented, making these bypass techniques ineffective against properly trained models.' },
    'c906': { distractor: 'Training on sufficiently large and diverse datasets eliminates this problem entirely, because massive data captures all possible real-world variations.' },
};
