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
        { text: 'The broad field of building machines that can perform tasks typically requiring human cognition, ranging exclusively from narrow task-specific systems to general-purpose agents.', d: 3, trap: 'The word "exclusively" is wrong — AI also includes non-agent systems like classifiers and generative models, not just narrow-to-general agents.' },
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

// ─── Why-It-Matters Distractors ─────────────────────────────
// One plausible-but-wrong "why it matters" statement per card.
// Used in "why" dimension quizzes as a tempting incorrect option.

export const WHY_DISTRACTORS = {
    'c102': { distractor: 'Because learned patterns are discovered automatically by the algorithm, they are always more accurate and less biased than rules written by human experts.' },
    'c103': { distractor: 'Adding more layers always improves both performance and interpretability, because each additional layer makes the model\'s reasoning more transparent and auditable.' },
    'c104': { distractor: 'Language-capable AI systems truly understand meaning and intent, so their outputs can be trusted as factual without human verification.' },
    'c105': { distractor: 'Because neural networks are modeled on biological brains, their decision-making process is inherently transparent and can be fully explained by neuroscience principles.' },
    'c106': { distractor: 'Visual AI has achieved consistent superhuman accuracy across all conditions and demographics, making human review of its outputs unnecessary in safety-critical applications.' },
    'c202': { distractor: 'Building one model for many tasks eliminates the need for domain experts to review its outputs, since the system already understands each field deeply.' },
    'c203': { distractor: 'Knowing how performance scales lets labs skip safety testing at intermediate sizes, since they can extrapolate results from smaller models.' },
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
    'c208': { distractor: 'A system vastly smarter than humans would naturally develop ethical reasoning superior to our own, making explicit alignment constraints unnecessary.' },
    'c209': { distractor: 'Since narrow AI can only operate within its trained domain, it poses no safety concerns and can be deployed freely without evaluation or oversight.' },
    'c210': { distractor: 'Autonomous systems are inherently safer than chat-based AI because they can immediately detect and reverse their own mistakes without human intervention.' },
    'c211': { distractor: 'Older, well-established models pose greater safety risks than cutting-edge systems because they lack the latest safety techniques built into newer architectures.' },
    'c212': { distractor: 'Algorithmic efficiency improvements are making compute irrelevant to AI governance — soon anyone with a laptop will be able to train frontier models.' },

    'c902': { distractor: 'Fabricated outputs are easy for end users to identify because AI-generated falsehoods always contain obvious factual errors or stylistic tells.' },
    'c903': { distractor: 'These attacks only work in academic research settings with white-box access to model internals and pose no threat to deployed commercial systems.' },
    'c904': { distractor: 'Instruction-tuning techniques used in modern language models have fully solved this vulnerability, making it a historical concern rather than a current threat.' },
    'c905': { distractor: 'Safety training with RLHF creates permanent guardrails that cannot be circumvented, making these bypass techniques ineffective against properly trained models.' },
    'c906': { distractor: 'Training on sufficiently large and diverse datasets eliminates this problem entirely, because massive data captures all possible real-world variations.' },
};
