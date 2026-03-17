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
    hardCorrect: 'Massive neural networks trained on enormous text corpora that can generate coherent language, answer questions, and tackle complex tasks across diverse domains.',
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
        { text: 'AI systems trained on massive text datasets that generate fluent language and perform complex tasks across many domains, from coding to analysis.', d: 2 },
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

// ─── AI Regulation (c701–c706) ──────────────────────────

DESCRIPTION_DISTRACTORS['c701'] = {
    hardCorrect: 'The body of government-enacted requirements and restrictions that determine how AI technologies may be created, evaluated, and made available for public use.',
    distractors: [
        { text: 'A collection of software tools that automatically scan AI models for errors and fix safety problems before they can be released to the public.', d: 1 },
        { text: 'Formal evaluations conducted prior to an AI system\'s release that examine how it might negatively affect people\'s rights, welfare, and access to fair treatment.', d: 2 },
        { text: 'Government-enacted requirements and restrictions for AI technologies, applying only once systems have caused documented harm to users rather than preventing harm in advance.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c702'] = {
    hardCorrect: 'A tiered oversight model that categorizes AI applications by the severity of potential harm they pose, subjecting higher-risk systems to more demanding requirements.',
    distractors: [
        { text: 'A method of ranking AI research papers by their scientific impact and novelty to help funding agencies decide which projects deserve financial support.', d: 1 },
        { text: 'Controlled regulatory environments that allow innovators to test AI applications under temporarily relaxed rules while authorities gain firsthand insight into the technology.', d: 2 },
        { text: 'A tiered oversight model that categorizes AI applications by their technical complexity and computational cost, with more resource-intensive systems subject to greater scrutiny.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c703'] = {
    hardCorrect: 'A landmark piece of European legislation that imposes legally binding obligations on AI providers and users, organized around a hierarchy of application risk levels.',
    distractors: [
        { text: 'A voluntary code of conduct published by European technology companies that recommends best practices for AI development without any legal enforcement mechanisms.', d: 1 },
        { text: 'The collective effort by governments and multilateral organizations to harmonize policies and set shared expectations for AI development across national boundaries.', d: 2 },
        { text: 'A landmark piece of European legislation that imposes legally binding obligations on AI providers, limited to systems that are both developed and deployed within EU borders.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c704'] = {
    hardCorrect: 'Formal evaluations conducted prior to an AI system\'s release that examine how it might negatively affect people\'s rights, welfare, and access to fair treatment.',
    distractors: [
        { text: 'Automated benchmarking suites that measure how quickly an AI model can process data and generate outputs across a range of computational tasks.', d: 1 },
        { text: 'The systems of verification, penalties, and oversight that give regulatory requirements their practical force and ensure AI developers actually follow the rules.', d: 2 },
        { text: 'Formal evaluations conducted after an AI system has been deployed to production, analyzing its actual negative effects on individuals and communities over time.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c705'] = {
    hardCorrect: 'Controlled regulatory environments that allow innovators to test AI applications under temporarily relaxed rules while authorities gain firsthand insight into the technology.',
    distractors: [
        { text: 'Isolated computing environments where AI models are trained exclusively on synthetic data to prevent them from ever accessing real personal information.', d: 1 },
        { text: 'A tiered oversight model that categorizes AI applications by the severity of potential harm they pose, subjecting higher-risk systems to more demanding requirements.', d: 2 },
        { text: 'Controlled regulatory environments where innovators can deploy AI applications permanently under relaxed rules while authorities observe their long-term behavior.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c706'] = {
    hardCorrect: 'The systems of verification, penalties, and oversight that give regulatory requirements their practical force and ensure AI developers actually follow the rules.',
    distractors: [
        { text: 'Marketing certifications that AI companies display on their products to signal quality and safety to consumers in competitive retail markets.', d: 1 },
        { text: 'Formal evaluations conducted prior to an AI system\'s release that examine how it might negatively affect people\'s rights, welfare, and access to fair treatment.', d: 2 },
        { text: 'The systems of verification and oversight that ensure AI developers follow regulatory requirements, relying primarily on self-reported compliance data from the companies themselves.', d: 3 },
    ]
};

// ─── Global AI Governance (c801–c806) ────────────────────

DESCRIPTION_DISTRACTORS['c801'] = {
    hardCorrect: 'The collective effort by governments and multilateral organizations to harmonize policies and set shared expectations for AI development across national boundaries.',
    distractors: [
        { text: 'Bilateral trade agreements between countries that set tariffs and quotas on the import and export of consumer electronics and computing hardware.', d: 1 },
        { text: 'Self-imposed safety obligations adopted by companies building the most advanced AI, covering areas such as pre-release testing and safety information sharing.', d: 2 },
        { text: 'The collective effort by governments and multilateral organizations to harmonize policies for AI development, with agreements that carry binding legal force in all participating nations.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c802'] = {
    hardCorrect: 'Major diplomatic events where heads of state, technologists, and civil society convene to address the challenges posed by the most capable AI systems.',
    distractors: [
        { text: 'Annual academic conferences where machine learning researchers present new algorithms, share benchmark results, and compete for best paper awards.', d: 1 },
        { text: 'Formally published specifications from recognized bodies that translate high-level governance goals into precise, implementable requirements for AI system development.', d: 2 },
        { text: 'Major diplomatic events organized by a single host nation that set the global AI safety agenda, with the host country retaining authority over which commitments participants adopt.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c803'] = {
    hardCorrect: 'Formally published specifications from recognized bodies that translate high-level governance goals into precise, implementable requirements for AI system development.',
    distractors: [
        { text: 'Open-source software libraries that developers use to build and train neural networks more efficiently across different hardware platforms and programming languages.', d: 1 },
        { text: 'Major diplomatic events where heads of state, technologists, and civil society convene to address the challenges posed by the most capable AI systems.', d: 2 },
        { text: 'Formally published specifications from recognized bodies that define requirements for AI system development, automatically carrying the force of law in all participating countries.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c804'] = {
    hardCorrect: 'A strategy for shaping AI development by exerting control over the scarce, high-performance processing infrastructure that large-scale model training depends on.',
    distractors: [
        { text: 'A cloud computing pricing model that charges AI developers per hour of GPU usage based on the size and complexity of their training runs.', d: 1 },
        { text: 'A governance philosophy that insists on broad participation from government, industry, academia, and civil society in decisions about how AI should be regulated.', d: 2 },
        { text: 'A strategy for shaping AI development by controlling access to specialized hardware, effectively preventing any organization without government approval from building AI systems of any size.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c805'] = {
    hardCorrect: 'Self-imposed safety obligations adopted by organizations at the frontier of AI development, intended to bridge the gap until binding regulations are established.',
    distractors: [
        { text: 'Legally binding international treaties that set maximum capability thresholds for AI models, with economic sanctions imposed on countries that exceed the agreed limits.', d: 1 },
        { text: 'The collective effort by governments and multilateral organizations to harmonize policies and set shared expectations for AI development across national boundaries.', d: 2 },
        { text: 'Self-imposed safety obligations adopted by companies building advanced AI, with independent regulators verifying compliance and imposing penalties for violations.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c806'] = {
    hardCorrect: 'A governance philosophy that insists on broad participation — from government and industry to academia and civil society — in decisions about how AI should be regulated.',
    distractors: [
        { text: 'A project management methodology used by software teams to coordinate the development and deployment of AI products across multiple departments.', d: 1 },
        { text: 'A strategy for shaping AI development by exerting control over the scarce, high-performance processing infrastructure that large-scale model training depends on.', d: 2 },
        { text: 'A governance philosophy that brings together government, industry, and academia to shape AI decisions, giving each participating group equal decision-making authority.', d: 3 },
    ]
};

// ─── Accountability & Oversight (c901–c906) ──────────────

DESCRIPTION_DISTRACTORS['c901'] = {
    hardCorrect: 'The expectation that those who create or operate AI systems bear responsibility for the consequences, and that people harmed by AI have meaningful paths to redress.',
    distractors: [
        { text: 'A performance metric that measures how accurately an AI model completes assigned tasks compared to human experts in controlled laboratory experiments.', d: 1 },
        { text: 'Systematic, independent examination of AI systems to verify they satisfy applicable requirements for fairness, reliability, and safety.', d: 2 },
        { text: 'The expectation that those who create AI systems bear responsibility for consequences, applying only when the developer intended the system to cause the specific harm in question.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c902'] = {
    hardCorrect: 'An external review process that holds AI developers accountable by checking their systems against benchmarks for bias, security, and regulatory compliance.',
    distractors: [
        { text: 'The process of archiving old versions of AI models in secure databases to maintain a historical record of how the technology has evolved over time.', d: 1 },
        { text: 'Rules compelling organizations to publicly disclose specific details about their AI systems, from the data they were trained on to the way they reach decisions.', d: 2 },
        { text: 'Systematic examination of AI systems to verify they satisfy requirements for fairness, reliability, and safety, conducted by the same team that developed the system.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c903'] = {
    hardCorrect: 'Obligations that make the inner workings of AI systems visible to outside parties, empowering regulators and affected individuals to scrutinize and challenge automated decisions.',
    distractors: [
        { text: 'User interface design principles that ensure AI-powered applications are visually clear, easy to navigate, and accessible to users with disabilities.', d: 1 },
        { text: 'The body of legal rules that determines who must compensate for damages when an AI system\'s outputs or actions cause injury or loss.', d: 2 },
        { text: 'Rules compelling organizations to disclose details about their AI systems\' decision-making processes, limited to systems that interact directly with individual consumers.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c904'] = {
    hardCorrect: 'The body of legal rules that determines who must compensate for damages when an AI system\'s outputs or actions cause injury or loss.',
    distractors: [
        { text: 'Insurance policies that AI companies purchase to protect themselves from financial losses caused by stock market fluctuations and changing regulations.', d: 1 },
        { text: 'Continuous observation of AI systems in live environments, intended to surface performance degradation, emerging biases, or unexpected behaviors after launch.', d: 2 },
        { text: 'The body of legal rules that determines who must compensate for AI-caused damages, placing accountability exclusively on the end user who chose to rely on the system.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c905'] = {
    hardCorrect: 'Continuous observation of AI systems in live environments, intended to surface performance degradation, emerging biases, or unexpected behaviors after launch.',
    distractors: [
        { text: 'The phase of machine learning where a model\'s internal parameters are adjusted through exposure to large datasets before it is put into use.', d: 1 },
        { text: 'Systematic, independent examination of AI systems to verify they satisfy applicable requirements for fairness, reliability, and safety.', d: 2 },
        { text: 'Observation of AI systems in live environments during an initial period after launch, after which monitoring is discontinued once the system is considered stable.', d: 3 },
    ]
};

DESCRIPTION_DISTRACTORS['c906'] = {
    hardCorrect: 'Legal measures shielding employees and insiders who flag dangerous or unethical AI practices from punishment by their employers.',
    distractors: [
        { text: 'Cybersecurity protocols that protect AI systems from being hacked, manipulated, or taken offline by malicious external actors or nation-state adversaries.', d: 1 },
        { text: 'The body of legal rules that determines who must compensate for damages when an AI system\'s outputs or actions cause injury or loss.', d: 2 },
        { text: 'Legal measures shielding individuals who flag dangerous AI practices from punishment, available only to senior executives with direct knowledge of company strategy.', d: 3 },
    ]
};
