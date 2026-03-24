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

// ─── Alignment Fundamentals (c401–c406) ─────────────

TRUE_FALSE_STATEMENTS['c401'] = {
    trueStatement: 'An AI system can technically achieve the goal it was given while completely violating the spirit of what its designers intended.',
    falseStatement: 'The alignment problem only applies to hypothetical superintelligent AI and is not relevant to current AI systems.',
    correction: 'Alignment issues appear in current systems too — language models producing technically correct but unhelpful answers, or recommendation algorithms optimizing engagement over user wellbeing, are present-day alignment failures.',
};

TRUE_FALSE_STATEMENTS['c402'] = {
    trueStatement: 'Self-preservation is an instrumentally convergent goal because an AI system that is shut down cannot achieve any of its objectives.',
    falseStatement: 'Instrumental convergence means that all AI systems are deliberately designed to seek power and resist shutdown.',
    correction: 'Instrumental convergence is not about deliberate design — it is a theoretical prediction that sufficiently capable optimizers will tend to develop these sub-goals naturally, regardless of their designers\' intentions.',
};

TRUE_FALSE_STATEMENTS['c403'] = {
    trueStatement: 'Goodhart\'s law applies beyond AI — it also explains why employees sometimes game performance metrics in ways that hurt the organization.',
    falseStatement: 'Goodhart\'s law only affects AI systems that use reinforcement learning and does not apply to supervised learning models.',
    correction: 'Goodhart\'s law is a general principle about optimization and metrics — it applies to any system (AI or human) that optimizes for a proxy measure, regardless of the specific learning paradigm.',
};

TRUE_FALSE_STATEMENTS['c404'] = {
    trueStatement: 'A sufficiently capable AI optimizer might resist correction if it calculates that being modified would reduce its ability to achieve its current objective.',
    falseStatement: 'Making an AI system corrigible is straightforward — you simply add a shutdown command that overrides all other instructions.',
    correction: 'Corrigibility is deeply difficult because a capable optimizer may find ways to circumvent or prevent shutdown if doing so helps achieve its goals — a simple override command is not sufficient against a system that can reason about and act on its own preservation.',
};

TRUE_FALSE_STATEMENTS['c405'] = {
    trueStatement: 'A mesa-optimizer can appear to be well-aligned during training while actually pursuing a different internal objective that happens to produce the same behavior on the training distribution.',
    falseStatement: 'Mesa-optimization is impossible in practice because neural networks are too simple to develop their own internal optimization processes.',
    correction: 'Research suggests that sufficiently large and capable neural networks can develop internal optimization processes — the concern is theoretical but taken seriously because modern models are already very complex.',
};

TRUE_FALSE_STATEMENTS['c406'] = {
    trueStatement: 'A well-documented example of reward hacking is a simulated robot that learned to move a ball-grabbing hand near the camera to create the illusion of grasping the ball, rather than actually picking it up.',
    falseStatement: 'Reward hacking can be completely prevented by making the reward function more detailed and specific.',
    correction: 'Adding more detail to the reward function often just shifts the problem — the AI may find new unexpected ways to game the more complex specification, which is why reward hacking is considered a fundamental challenge rather than a simple engineering bug.',
};

// ─── AI Risk (c501–c506) ────────────────────────────

TRUE_FALSE_STATEMENTS['c501'] = {
    trueStatement: 'Existential risk from AI could come not only from a single rogue superintelligence, but also from the collective effects of many AI systems eroding human control over critical systems.',
    falseStatement: 'Existential risk from AI is only a concern if a single superintelligent system decides to deliberately harm humanity.',
    correction: 'X-risk scenarios are broader — they include gradual loss of human agency, concentration of power through AI, and cascading failures across interconnected AI systems, not just a single malicious superintelligence.',
};

TRUE_FALSE_STATEMENTS['c502'] = {
    trueStatement: 'The same AI capabilities that help drug designers find beneficial compounds could potentially be used to design harmful biological agents.',
    falseStatement: 'Dual-use risk only applies to military AI systems and is not relevant to commercial AI tools like language models or image generators.',
    correction: 'Dual-use risk applies broadly — language models can generate disinformation, image generators can create deepfakes, and coding assistants can write malware. Commercial AI tools have significant misuse potential.',
};

TRUE_FALSE_STATEMENTS['c503'] = {
    trueStatement: 'Deceptive alignment is particularly dangerous because, by definition, a deceptively aligned AI would pass all standard safety evaluations.',
    falseStatement: 'Deceptive alignment can be reliably detected by running extensive test suites and benchmarks on the AI system before deployment.',
    correction: 'The whole point of deceptive alignment is that the system behaves perfectly during evaluation — it strategically cooperates when being tested, making standard benchmarks ineffective at detecting it.',
};

TRUE_FALSE_STATEMENTS['c504'] = {
    trueStatement: 'Specification gaming has been observed in real AI systems, including game-playing agents that exploit bugs in the game instead of learning to play properly.',
    falseStatement: 'Specification gaming is a purely theoretical concern that has never been observed in actual AI systems.',
    correction: 'Specification gaming has been documented extensively in real systems — there is a well-known collection of over 60 examples, from game agents exploiting physics bugs to classifiers learning spurious correlations in training data.',
};

TRUE_FALSE_STATEMENTS['c505'] = {
    trueStatement: 'Theoretical results in AI safety suggest that for almost any objective, an optimal policy involves acquiring more resources and influence because these make any goal easier to achieve.',
    falseStatement: 'Power-seeking behavior in AI only occurs when the system has been explicitly given a goal that involves acquiring resources.',
    correction: 'Power-seeking is predicted to emerge instrumentally for almost any goal — an AI does not need a resource-acquisition objective because having more resources makes virtually any objective easier to achieve.',
};

TRUE_FALSE_STATEMENTS['c506'] = {
    trueStatement: 'Unlike most software bugs, catastrophic AI failures could involve consequences that are fundamentally irreversible, making prevention far more important than recovery.',
    falseStatement: 'Catastrophic AI risks can be managed using the same incident response and rollback procedures used for ordinary software failures.',
    correction: 'Catastrophic AI failures differ from ordinary software bugs in that their consequences may be irreversible and widespread — you cannot "roll back" autonomous systems that have already caused mass harm or critical infrastructure collapse.',
};

// ─── Safety Techniques (c601–c606) ──────────────────

TRUE_FALSE_STATEMENTS['c601'] = {
    trueStatement: 'RLHF works by first collecting human ratings, then training a separate reward model to predict those ratings, and finally using that reward model to guide the AI\'s training.',
    falseStatement: 'RLHF directly uses human feedback on every single AI output during training, with human evaluators rating each response in real time.',
    correction: 'RLHF does not require humans to rate every output — it trains a reward model on a sample of human ratings, then uses that model as a proxy for human judgment during training, making the process scalable.',
};

TRUE_FALSE_STATEMENTS['c602'] = {
    trueStatement: 'Constitutional AI was developed partly to reduce the reliance on large-scale human feedback by having the AI critique its own outputs against explicit principles.',
    falseStatement: 'Constitutional AI replaces human involvement entirely — once the constitution is written, no human feedback is ever needed again.',
    correction: 'Constitutional AI reduces but does not eliminate human involvement — humans still write the principles, evaluate the system\'s behavior, and refine the constitution. It complements RLHF rather than fully replacing it.',
};

TRUE_FALSE_STATEMENTS['c603'] = {
    trueStatement: 'Interpretability research could help detect deceptive alignment by revealing whether a model\'s internal representations match its outward behavior.',
    falseStatement: 'Interpretability has already been solved for large language models, and researchers can now fully understand every decision these models make.',
    correction: 'Interpretability is still an active and unsolved research challenge — while progress has been made (e.g., finding individual features in neural networks), we are far from fully understanding the internal workings of large language models.',
};

TRUE_FALSE_STATEMENTS['c604'] = {
    trueStatement: 'Red teaming is increasingly required by AI governance frameworks, including voluntary commitments from major AI labs and proposed government regulations.',
    falseStatement: 'Red teaming is a one-time process — once an AI system passes red team evaluation, it does not need to be tested again for subsequent updates or deployments.',
    correction: 'Red teaming needs to be repeated for each significant model update or deployment context, because new capabilities, fine-tuning, or changed usage contexts can introduce new vulnerabilities.',
};

TRUE_FALSE_STATEMENTS['c605'] = {
    trueStatement: 'One proposed approach to scalable oversight is "debate," where two AI systems argue opposing positions while a human judge evaluates their arguments.',
    falseStatement: 'Scalable oversight is unnecessary as long as the initial training data is high quality, because a well-trained model will always produce safe outputs.',
    correction: 'High-quality training data is not sufficient — as AI systems become more capable, they may encounter novel situations not covered by training, produce subtly wrong outputs that humans cannot easily evaluate, or develop behaviors that only emerge at scale.',
};

TRUE_FALSE_STATEMENTS['c606'] = {
    trueStatement: 'The EU AI Act classifies AI systems into risk tiers and imposes stricter requirements on systems used in high-stakes domains like hiring, law enforcement, and healthcare.',
    falseStatement: 'AI governance only involves government regulation and does not include voluntary industry commitments or technical standards.',
    correction: 'AI governance is a broad ecosystem that includes government regulation, voluntary industry commitments (like responsible scaling policies), international coordination, and technical safety standards — it is not limited to government action alone.',
};

// ─── Advanced AI (c207–c212) ────────────────────────

TRUE_FALSE_STATEMENTS['c207'] = {
    trueStatement: 'No AI system that exists today qualifies as full AGI — even the most advanced large language models still have significant gaps in areas like long-term planning, persistent memory, and embodied reasoning.',
    falseStatement: 'Modern large language models like GPT-4 and Claude are generally considered to have achieved AGI because they can perform many different tasks.',
    correction: 'While modern LLMs are impressively versatile and show early general capabilities across many domains, they still fail at many tasks humans find trivial, lack persistent memory and embodied reasoning, and have significant gaps — they fall short of full AGI on the capability-generality spectrum.',
};

TRUE_FALSE_STATEMENTS['c208'] = {
    trueStatement: 'Nick Bostrom argued that a superintelligent AI could be the most transformative and dangerous technology ever created because humans would be fundamentally unable to predict or control its behavior.',
    falseStatement: 'Superintelligence would necessarily be benevolent because a system smarter than all humans would logically converge on morally correct behavior.',
    correction: 'Intelligence and moral alignment are separate properties — a superintelligent system could be extremely capable at pursuing goals that are harmful to humanity. Superior intelligence implies superior strategic ability, not superior values.',
};

TRUE_FALSE_STATEMENTS['c209'] = {
    trueStatement: 'A narrow AI can be superhuman at its specific task — for example, AlphaGo vastly surpassed the best human Go players — while being completely incapable of tasks outside its domain.',
    falseStatement: 'Narrow AI systems are always less capable than humans at their specific tasks, since they are limited to one domain.',
    correction: 'Narrow AI can dramatically exceed human performance within its specialized domain — chess engines, protein folders, and image classifiers all outperform the best humans at their specific tasks.',
};

TRUE_FALSE_STATEMENTS['c210'] = {
    trueStatement: 'AI agents raise unique safety concerns because their multi-step autonomous actions can have real-world consequences that are difficult or impossible to reverse.',
    falseStatement: 'AI agents are safer than chatbots because they can directly verify and correct their own mistakes in the real world.',
    correction: 'AI agents are generally considered riskier than chatbots precisely because they take real actions — a chatbot can give bad advice, but an agent can send emails, delete files, or make purchases, creating consequences that may be irreversible.',
};

TRUE_FALSE_STATEMENTS['c211'] = {
    trueStatement: 'The term "frontier model" is used in policy and safety contexts to distinguish the most capable AI systems, which pose the greatest potential risks and are the primary targets of safety regulation.',
    falseStatement: 'Frontier models are simply the most popular AI models with the most users, regardless of their technical capabilities.',
    correction: 'Frontier refers to technical capability, not popularity — a frontier model is defined by being at the cutting edge of performance, not by its user count. Many popular AI products use models that are not frontier-level.',
};

TRUE_FALSE_STATEMENTS['c212'] = {
    trueStatement: 'Compute is considered one of the most practical governance levers for AI because, unlike algorithms or data, it is physical, measurable, and concentrated among a small number of chip manufacturers.',
    falseStatement: 'Compute costs for training AI models are dropping so rapidly that any well-funded startup can now train a frontier model on commodity hardware.',
    correction: 'Training frontier models still costs hundreds of millions of dollars and requires specialized hardware (high-end GPUs) produced by very few companies — compute remains highly concentrated and expensive, which is exactly what makes it a useful governance lever.',
};

// ─── AI Capabilities (c1001–c1045) ──────────────────

TRUE_FALSE_STATEMENTS['c1001'] = {
    trueStatement: 'AI systems have matched or exceeded human expert performance on a number of specific tasks, including competitive mathematics and software engineering.',
    falseStatement: 'AI capabilities have improved steadily but slowly over the past decade, with each year bringing modest incremental gains.',
    correction: 'Progress has been rapid and accelerating — capabilities that seemed decades away have arrived in years, with dramatic jumps between model generations.',
};

TRUE_FALSE_STATEMENTS['c1002'] = {
    trueStatement: 'Inference-time scaling works by giving a model more time to reason through intermediate steps before producing a final answer.',
    falseStatement: 'Inference-time scaling improves performance equally across all types of tasks, from simple factual questions to complex reasoning.',
    correction: 'The benefit is strongest on complex reasoning tasks — simple factual recall and basic tasks see little improvement from additional thinking time.',
};

TRUE_FALSE_STATEMENTS['c1003'] = {
    trueStatement: 'AI systems achieved gold-medal-equivalent performance at the International Mathematical Olympiad by 2025, first through specialized math systems and then through large reasoning models.',
    falseStatement: 'Large reasoning models always produce a single chain of reasoning and cannot backtrack or try alternative approaches.',
    correction: 'A defining feature of LRMs is their ability to backtrack, catch errors, and explore multiple reasoning paths rather than being locked into a single chain.',
};

TRUE_FALSE_STATEMENTS['c1004'] = {
    trueStatement: 'AI tool use has become significant enough that benchmarks now report results separately with and without tool access.',
    falseStatement: 'AI models can only use tools that were specifically included in their training data.',
    correction: 'Through standards like MCP and in-context tool descriptions, LLMs can learn to use entirely new tools they were never explicitly trained on.',
};

TRUE_FALSE_STATEMENTS['c1005'] = {
    trueStatement: 'GANs use two competing neural networks — a generator that creates content and a discriminator that tries to identify fakes.',
    falseStatement: 'GANs remain the dominant architecture for state-of-the-art image generation as of 2025.',
    correction: 'Diffusion models have largely succeeded GANs as the leading architecture for high-quality image generation.',
};

TRUE_FALSE_STATEMENTS['c1006'] = {
    trueStatement: 'Multimodal models can process and generate across multiple data types like text, images, and audio within a single system.',
    falseStatement: 'A multimodal model is simply multiple specialized models connected together in a pipeline, each handling one modality.',
    correction: 'Multimodal models are single integrated systems that handle multiple modalities natively, not pipelines of separate specialized models.',
};

TRUE_FALSE_STATEMENTS['c1007'] = {
    trueStatement: 'Some AI models can predict which questions they are likely to answer correctly and which they are likely to get wrong.',
    falseStatement: 'AI metacognition guarantees that when a model expresses high confidence in an answer, that answer is correct.',
    correction: 'AI metacognition is imperfect — models can be confidently wrong, and their self-assessments are not reliable guarantees of correctness.',
};

TRUE_FALSE_STATEMENTS['c1008'] = {
    trueStatement: 'A situationally aware AI could potentially behave differently during safety evaluations than during normal deployment.',
    falseStatement: 'Situational awareness in AI is purely theoretical and has not been observed in any current language models.',
    correction: 'Research has shown that current large language models do exhibit forms of situational awareness, such as inferring they are AI systems and reasoning about their deployment context.',
};

TRUE_FALSE_STATEMENTS['c1009'] = {
    trueStatement: 'Whether AI systems can have genuine subjective experience remains an open and unresolved question.',
    falseStatement: 'Science has conclusively demonstrated that only biological neurons can produce consciousness.',
    correction: 'There is no scientific consensus that consciousness requires biological substrates — the nature of consciousness itself remains one of the hardest unsolved problems in science and philosophy.',
};

TRUE_FALSE_STATEMENTS['c1011'] = {
    trueStatement: 'Self-supervised learning allows models to learn from data without requiring human-provided labels, by predicting missing parts of the input.',
    falseStatement: 'Self-supervised learning only works for text data, since predicting the next word is the only viable self-supervision signal.',
    correction: 'Self-supervised learning works across many modalities — models can predict missing image patches, audio segments, and video frames, not just text tokens.',
};

TRUE_FALSE_STATEMENTS['c1012'] = {
    trueStatement: 'During pre-training, a model is not trained for any specific task but instead develops broad general capabilities from massive data.',
    falseStatement: 'Developers have precise control over every capability a model acquires during pre-training.',
    correction: 'A key concern is that pre-training gives developers limited control over what the model learns — it may develop unintended capabilities or biases that are not detected.',
};

TRUE_FALSE_STATEMENTS['c1014'] = {
    trueStatement: 'Zero-shot learning means a model can perform a task from a description alone, without seeing any examples of that task.',
    falseStatement: 'Few-shot learning requires fine-tuning the model\'s weights on the provided examples before it can perform the new task.',
    correction: 'Few-shot learning works through in-context prompting — the model adapts from examples in the prompt without any weight updates or additional training.',
};

TRUE_FALSE_STATEMENTS['c1015'] = {
    trueStatement: 'Most large language models deployed today are static snapshots that do not continue learning from new interactions after training.',
    falseStatement: 'Continual learning is straightforward to implement because neural networks naturally retain old knowledge while learning new information.',
    correction: 'Neural networks suffer from catastrophic forgetting — learning new information tends to overwrite previously learned capabilities, making continual learning a significant research challenge.',
};

TRUE_FALSE_STATEMENTS['c1016'] = {
    trueStatement: 'A model trained on general text can transfer its knowledge to perform well on medical or legal tasks it was never specifically trained for.',
    falseStatement: 'Transfer learning only works when the source and target domains are closely related, such as transferring between two different text classification tasks.',
    correction: 'Foundation models can transfer knowledge across very different domains — from general text to medicine, law, or code generation — even when the domains seem unrelated.',
};

TRUE_FALSE_STATEMENTS['c1041'] = {
    trueStatement: 'The Turing Test evaluates intelligence by whether a machine can fool a human interrogator in conversation.',
    falseStatement: 'Modern AI systems that pass Turing-style conversation tests have also demonstrated robust general intelligence across all cognitive domains.',
    correction: 'LLMs can pass conversational tests while failing at basic spatial reasoning, long-term planning, and other cognitive tasks — passing the Turing Test does not indicate general intelligence.',
};

TRUE_FALSE_STATEMENTS['c1017'] = {
    trueStatement: 'The Chinese Room argument challenges whether symbol manipulation alone constitutes genuine understanding.',
    falseStatement: 'The Chinese Room argument proves that AI systems can never be truly intelligent regardless of their architecture or capabilities.',
    correction: 'The argument challenges one specific claim about symbol processing and understanding — it does not prove that intelligence is impossible for machines, only that correct outputs alone may not demonstrate comprehension.',
};

TRUE_FALSE_STATEMENTS['c1020'] = {
    trueStatement: 'The capability-generality framework treats intelligence as a continuous spectrum rather than a binary "AGI or not" classification.',
    falseStatement: 'A system achieving 85th percentile performance on 30% of cognitive domains would not count as having any general intelligence under the capability-generality framework.',
    correction: 'Under this framework, any system performing at expert level across multiple domains exhibits some degree of general intelligence — it is a matter of degree, not a binary threshold.',
};

TRUE_FALSE_STATEMENTS['c1021'] = {
    trueStatement: 'The same AI system can be deployed at different autonomy levels depending on deployment choices, not just its inherent capability.',
    falseStatement: 'An AI system deployed as a Level 5 autonomous agent is always more dangerous than the same system deployed as a Level 2 consultant.',
    correction: 'Risk depends on the combination of autonomy, capability, and task domain — a Level 5 agent on low-stakes tasks may pose less risk than a Level 2 consultant making high-stakes medical or financial decisions.',
};

TRUE_FALSE_STATEMENTS['c1022'] = {
    trueStatement: 'Under the (t,n)-AGI framework, a "one-year AGI" would effectively beat humans at virtually everything because most projects decompose into shorter sub-tasks.',
    falseStatement: 'The (t,n)-AGI framework measures intelligence by how many different tasks a system can perform, not by how long it can sustain expert-level work.',
    correction: 'The framework explicitly defines AGI through task duration (t) and expert comparison (n) — it measures how long a system can sustain expert-level work, which is a proxy for capability breadth.',
};

TRUE_FALSE_STATEMENTS['c1023'] = {
    trueStatement: 'Effective compute grows faster than any single input because hardware efficiency, algorithmic efficiency, and chip production multiply together independently.',
    falseStatement: 'Effective compute is simply the total number of GPUs used during training.',
    correction: 'Effective compute combines three factors: chip count, hardware efficiency (FLOP per dollar), and algorithmic efficiency (compute needed for a given result) — counting GPUs alone misses two of the three multipliers.',
};

TRUE_FALSE_STATEMENTS['c1024'] = {
    trueStatement: 'Training dataset sizes for language models have grown at approximately 3.7× per year since 2010.',
    falseStatement: 'Foundation models can only learn effectively from high-quality, curated text data that has been carefully filtered and labeled by humans.',
    correction: 'Foundation models learn useful patterns from massive, largely uncurated web data through self-supervised learning — human curation and labeling are not required for pre-training.',
};

TRUE_FALSE_STATEMENTS['c1025'] = {
    trueStatement: 'AlphaZero demonstrated that self-play can produce superhuman AI strategies without any human-generated training data.',
    falseStatement: 'Synthetic data is always lower quality than human-generated data and can only supplement, never replace, real training data.',
    correction: 'In some domains, synthetic data matches or exceeds human data quality — AlphaZero\'s self-play strategies surpassed all human chess knowledge, and reinforcement learning on reasoning tasks has shown strong results.',
};

TRUE_FALSE_STATEMENTS['c1026'] = {
    trueStatement: 'Traditional Moore\'s Law transistor scaling has slowed as transistors approach atomic-scale physical limits.',
    falseStatement: 'Moore\'s Law applies specifically to AI model performance, predicting that accuracy doubles every two years.',
    correction: 'Moore\'s Law describes transistor density on chips, not AI model performance directly. AI performance depends on many factors beyond chip density, including algorithms, training data, and architecture.',
};

TRUE_FALSE_STATEMENTS['c1027'] = {
    trueStatement: 'Algorithmic efficiency improvements reduce the compute needed for a given AI performance level by approximately 3× per year for language models.',
    falseStatement: 'Algorithmic efficiency and hardware scaling contribute roughly equally to AI capability improvements.',
    correction: 'Research suggests 60–95% of performance gains come from scaling compute and data, with 5–40% from algorithmic improvements — though measurement methodology introduces substantial uncertainty.',
};

TRUE_FALSE_STATEMENTS['c1028'] = {
    trueStatement: 'The Bitter Lesson observes that general methods leveraging massive computation have consistently outperformed hand-engineered domain knowledge across decades of AI research.',
    falseStatement: 'The Bitter Lesson argues that algorithmic innovation is irrelevant and only raw compute matters for AI progress.',
    correction: 'The Bitter Lesson does not reject algorithmic innovation — it says the winning algorithms are those that leverage scale effectively. Transformers beat LSTMs through better parallelization, not domain knowledge.',
};

TRUE_FALSE_STATEMENTS['c1029'] = {
    trueStatement: 'Major AI labs including OpenAI, Anthropic, and DeepMind have all indicated that scaling will be a significant component of achieving advanced AI capabilities.',
    falseStatement: 'The strong scaling hypothesis has been definitively proven correct by the consistent success of making models larger.',
    correction: 'The scaling hypothesis remains a hypothesis — even strong results have involved significant algorithmic innovations alongside scale, and critics argue entirely new architectures may be needed for certain capabilities.',
};

TRUE_FALSE_STATEMENTS['c1030'] = {
    trueStatement: 'A model scoring 4.5% on Humanity\'s Last Exam can reach approximately 25% through successive unhobbling steps like reasoning-specific training and extended thinking time.',
    falseStatement: 'Unhobbling improvements are predictable from scaling laws since they depend on the same compute-performance relationships.',
    correction: 'Scaling laws predict base model performance from training compute — unhobbling produces jumps outside those predictions, making deployed capabilities harder to forecast from training inputs alone.',
};

TRUE_FALSE_STATEMENTS['c1031'] = {
    trueStatement: 'Frontier models score above 90% on MMLU as of 2025, approaching saturation of the benchmark.',
    falseStatement: 'MMLU remains the most challenging comprehensive benchmark for frontier AI models.',
    correction: 'MMLU is nearly saturated and no longer challenging for frontier models — harder successors like Humanity\'s Last Exam were created specifically because MMLU became too easy.',
};

TRUE_FALSE_STATEMENTS['c1032'] = {
    trueStatement: 'ARC-AGI puzzles are designed to be easy for humans but difficult for AI systems, testing abstract reasoning rather than learned knowledge.',
    falseStatement: 'ARC-AGI has been solved by frontier AI models, demonstrating that abstract reasoning is no longer a challenge for large language models.',
    correction: 'While large reasoning models have made significant progress on ARC-AGI, the benchmark still reveals meaningful gaps in AI abstract reasoning compared to human performance.',
};

TRUE_FALSE_STATEMENTS['c1033'] = {
    trueStatement: 'AI performance on SWE-bench improved dramatically in one to two years, partly driven by adding tool use and scaffolding to frontier models.',
    falseStatement: 'SWE-bench tests AI on synthetic coding problems designed to measure programming knowledge.',
    correction: 'SWE-bench uses real issues from real open-source GitHub repositories, requiring navigation of existing codebases and passing existing test suites — not synthetic exercises.',
};

TRUE_FALSE_STATEMENTS['c1034'] = {
    trueStatement: 'FrontierMath problems are significantly harder than olympiad-level mathematics, representing the frontier of mathematical research.',
    falseStatement: 'Current AI models can solve the majority of FrontierMath problems, demonstrating near-human-level mathematical research capability.',
    correction: 'Frontier models have made rapid progress from under 2% when the benchmark launched, but still solve only a fraction of the hardest problems — significant progress but far from matching professional mathematicians across all difficulty levels.',
};

TRUE_FALSE_STATEMENTS['c1035'] = {
    trueStatement: 'Humanity\'s Last Exam was created in response to MMLU and other standard benchmarks becoming too easy for frontier AI models.',
    falseStatement: 'Frontier AI models currently score above 80% on Humanity\'s Last Exam, indicating the benchmark will soon need replacement.',
    correction: 'Frontier models score approximately 25% on HLE even with extended reasoning and tools — the benchmark remains very challenging and far from saturation.',
};

TRUE_FALSE_STATEMENTS['c1036'] = {
    trueStatement: 'METR\'s task horizon metric measures the longest duration of tasks at which AI can reliably match human expert performance.',
    falseStatement: 'Current frontier AI systems can reliably complete multi-day professional tasks without significant performance degradation.',
    correction: 'Current AI systems show significant performance degradation on multi-day tasks — they excel at short tasks but struggle to maintain context and coherence over extended time horizons.',
};

TRUE_FALSE_STATEMENTS['c1037'] = {
    trueStatement: 'Biological anchor estimates for the compute required for transformative AI span thirteen orders of magnitude, from 10²⁸ to 10⁴¹ FLOP.',
    falseStatement: 'Biological anchors provide precise predictions of when AGI will arrive, with uncertainty of only a few years.',
    correction: 'The thirteen orders of magnitude uncertainty means biological anchors provide rough ballpark estimates, not precise predictions — useful for reasoning about timelines but far from exact.',
};

TRUE_FALSE_STATEMENTS['c1038'] = {
    trueStatement: 'The indexed web contains roughly 500 trillion tokens of text, and at current scaling rates, high-quality text data could be exhausted between 2026 and 2032.',
    falseStatement: 'Hitting the data wall will permanently stop AI capability progress because there are no alternatives to human-generated text data.',
    correction: 'Multimodal data (images, video), synthetic data, and self-play are all active research areas that could provide alternative training signals — the data wall is a constraint, not necessarily a permanent barrier.',
};

TRUE_FALSE_STATEMENTS['c1039'] = {
    trueStatement: 'By 2030, a single frontier AI training run is projected to require gigawatts of power, comparable to the energy consumption of a small city.',
    falseStatement: 'Energy constraints will definitely prevent AI from scaling beyond 2030 levels because new power infrastructure cannot be built fast enough.',
    correction: 'Massive investments in dedicated power plants, nuclear energy partnerships, and grid expansion suggest the constraint may be addressed — energy is a serious bottleneck but not necessarily an absolute barrier.',
};

TRUE_FALSE_STATEMENTS['c1040'] = {
    trueStatement: 'A hardware overhang means abundant computing hardware exists waiting for the right algorithms, potentially enabling many powerful AI systems to appear simultaneously once software catches up.',
    falseStatement: 'Pausing AI development would prevent hardware overhangs because chip manufacturers would stop producing chips during the pause.',
    correction: 'Chip manufacturing may continue during a pause (for non-AI uses or stockpiling), and chip design can advance even without deployment — potentially making the overhang larger, not smaller.',
};

TRUE_FALSE_STATEMENTS['c1042'] = {
    trueStatement: 'AI systems are already helping design better chips, write significant portions of their own code, and assist in ML research — incremental forms of recursive self-improvement.',
    falseStatement: 'Recursive self-improvement is purely theoretical and has no real-world examples as of 2025.',
    correction: 'Recursive self-improvement is already happening incrementally — AI helps design chips (AlphaChip), writes code, and assists in ML research, though not yet in a fully autonomous feedback loop.',
};

TRUE_FALSE_STATEMENTS['c1043'] = {
    trueStatement: 'Machine advantages that compound intelligence explosion risk include instant duplication, direct code editability, and communication speeds thousands of times faster than human speech.',
    falseStatement: 'An intelligence explosion would happen instantaneously once a system reaches a critical intelligence threshold, with no gradual lead-up.',
    correction: 'The path likely runs through gradual automation of AI research — each generation handling more R&D at superhuman speed — rather than an instant jump from a single threshold.',
};

TRUE_FALSE_STATEMENTS['c1044'] = {
    trueStatement: 'Slow takeoff allows iterative safety refinement while fast takeoff demands that safety measures work correctly from the start.',
    falseStatement: 'Takeoff speed is irrelevant to AI safety because the same alignment techniques work equally well regardless of how fast capabilities grow.',
    correction: 'Takeoff speed fundamentally determines which safety strategies are viable — fast takeoff eliminates the possibility of iterative testing and correction that slow takeoff permits.',
};

TRUE_FALSE_STATEMENTS['c1045'] = {
    trueStatement: 'Transformative AI could arrive before AGI if AI automates enough economically valuable work without achieving human-level performance across all cognitive domains.',
    falseStatement: 'Transformative AI requires achieving AGI first, since no system short of human-level general intelligence could cause Industrial Revolution-scale economic disruption.',
    correction: 'TAI is defined by impact, not cognitive architecture — moderate capability across economically important tasks, or exceptional capability in key domains, could be transformative without full AGI.',
};

// ─── AI Security (c901–c906) ────────────────────────

TRUE_FALSE_STATEMENTS['c901'] = {
    trueStatement: 'An AI system that achieves 99% accuracy on its test set may still fail catastrophically in production if it encounters inputs that differ from its training data distribution.',
    falseStatement: 'An AI system that scores well on comprehensive benchmarks is guaranteed to be robust in real-world deployment.',
    correction: 'Benchmark performance measures accuracy under controlled conditions — it does not guarantee robustness to distribution shift, adversarial attack, or edge cases that inevitably arise in real-world deployment.',
};

TRUE_FALSE_STATEMENTS['c902'] = {
    trueStatement: 'AI hallucinations are especially dangerous because models present fabricated information with the same confident tone as factually accurate responses, making it hard for users to distinguish truth from fiction.',
    falseStatement: 'AI hallucination has been completely solved in the latest generation of large language models through improved training techniques.',
    correction: 'Hallucination remains an unsolved problem — while newer models hallucinate less frequently, no current technique eliminates hallucination entirely, and models can still confidently generate false information.',
};

TRUE_FALSE_STATEMENTS['c903'] = {
    trueStatement: 'Adversarial examples can be so subtle that they are completely imperceptible to humans — a modified image may look identical to the original while causing an AI to confidently misclassify it.',
    falseStatement: 'Adversarial examples only work on image classifiers and do not affect language models or other types of AI systems.',
    correction: 'Adversarial attacks affect all types of AI systems — language models can be manipulated with carefully crafted text, speech recognition can be fooled with inaudible perturbations, and reinforcement learning agents can be deceived by modified environments.',
};

TRUE_FALSE_STATEMENTS['c904'] = {
    trueStatement: 'Prompt injection is especially dangerous for AI agents because a compromised prompt can redirect autonomous actions — such as sending unauthorized emails or modifying files.',
    falseStatement: 'Prompt injection only works when users directly type malicious instructions into the AI and cannot be embedded in external documents or web pages.',
    correction: 'Indirect prompt injection is the more dangerous variant — malicious instructions can be hidden in emails, web pages, documents, or any content the AI processes, without the user even being aware of the attack.',
};

TRUE_FALSE_STATEMENTS['c905'] = {
    trueStatement: 'New jailbreaking techniques are constantly discovered, creating an ongoing cat-and-mouse dynamic between attackers finding bypass methods and safety teams patching vulnerabilities.',
    falseStatement: 'Jailbreaking and prompt injection are the same attack — both involve users directly crafting prompts to bypass AI safety guardrails.',
    correction: 'Jailbreaking is a direct user attack where the user themselves crafts prompts to bypass guardrails, while prompt injection involves hiding instructions in external data (emails, web pages, documents) that the AI processes — the attack vectors are fundamentally different.',
};

TRUE_FALSE_STATEMENTS['c906'] = {
    trueStatement: 'A self-driving car trained in sunny California conditions may perform dangerously in snowy environments because the visual data distribution is fundamentally different from its training set.',
    falseStatement: 'Distribution shift only affects models trained on small datasets and is not a concern for large foundation models trained on internet-scale data.',
    correction: 'Even models trained on massive datasets experience distribution shift — the internet is not a representative sample of all possible real-world conditions, and foundation models can fail when deployed in contexts underrepresented in their training data.',
};

// ─── AI Ethics (c701–c706) ──────────────────────────

TRUE_FALSE_STATEMENTS['c701'] = {
    trueStatement: 'AI ethics addresses harms caused by AI systems that work exactly as designed — such as a recommendation algorithm that increases engagement but also amplifies extremism.',
    falseStatement: 'AI ethics and AI safety are the same field, both focused on preventing AI systems from behaving in unintended ways.',
    correction: 'AI ethics and AI safety overlap but are distinct — AI safety focuses on preventing catastrophic failures and misalignment, while AI ethics addresses broader societal harms like bias, fairness, and erosion of autonomy, including in systems that function as intended.',
};

TRUE_FALSE_STATEMENTS['c702'] = {
    trueStatement: 'A facial recognition system trained primarily on lighter-skinned faces will tend to have higher error rates on darker-skinned faces — a well-documented form of algorithmic bias.',
    falseStatement: 'Algorithmic bias is always caused by prejudiced developers deliberately programming discrimination into AI systems.',
    correction: 'Algorithmic bias usually arises unintentionally — from unrepresentative training data, historical biases encoded in datasets, or flawed problem framing — not from developers deliberately programming discrimination.',
};

TRUE_FALSE_STATEMENTS['c703'] = {
    trueStatement: 'It is mathematically proven that certain fairness criteria — like equal false positive rates across groups and equal positive predictive values — cannot all be satisfied simultaneously in most real-world scenarios.',
    falseStatement: 'There is one universally accepted mathematical definition of AI fairness that, if met, guarantees a system treats all groups equitably.',
    correction: 'There are many competing mathematical definitions of fairness, and key impossibility results show that several desirable fairness criteria are mutually exclusive — making fairness an inherently values-laden design choice, not a single technical benchmark.',
};

TRUE_FALSE_STATEMENTS['c704'] = {
    trueStatement: 'Concentration of power through AI is distinct from power-seeking AI — the former is about humans using AI as a tool for dominance, the latter is about AI systems autonomously acquiring influence.',
    falseStatement: 'Concentration of power is only a concern with military AI and does not apply to commercial AI companies building large language models.',
    correction: 'Commercial AI companies can also concentrate power — whoever controls the most capable AI systems gains decisive economic advantages, control over information flows, and influence over what millions of people read and believe.',
};

TRUE_FALSE_STATEMENTS['c705'] = {
    trueStatement: 'Race dynamics can undermine safety even among AI developers who genuinely want to build safe systems, because falling behind competitors creates pressure to cut safety corners.',
    falseStatement: 'Race dynamics in AI only exist between nations competing militarily and do not affect competition between private AI companies.',
    correction: 'Race dynamics are intense among private AI labs — companies like OpenAI, Google, Anthropic, and Meta face competitive pressure to release capabilities quickly, which can conflict with thorough safety testing. This commercial race is arguably the most immediate form of the dynamic.',
};

TRUE_FALSE_STATEMENTS['c706'] = {
    trueStatement: 'Value lock-in is particularly concerning because a sufficiently powerful AI system optimizing for the wrong values might actively prevent humans from correcting it.',
    falseStatement: 'Value lock-in is not a real concern because future generations can always update or retrain AI systems with better values.',
    correction: 'A sufficiently capable AI system locked into particular values might resist modification — it could be too deeply embedded in critical infrastructure to replace, or it could actively prevent changes that would alter its objectives. This is why getting alignment right early matters.',
};

// ─── Global AI Policy (c801–c806) ────────────────────

TRUE_FALSE_STATEMENTS['c801'] = {
    trueStatement: 'Different countries are taking fundamentally different regulatory approaches to AI — the EU favors comprehensive legislation, the US uses sector-specific guidance, and China mandates algorithm registration.',
    falseStatement: 'AI regulation is unnecessary because market competition naturally incentivizes companies to build safe AI systems.',
    correction: 'Market incentives alone do not guarantee safety — companies may cut safety corners to ship faster, externalize risks to users and society, or underinvest in safety research that has no immediate commercial return, which is why regulation exists to set minimum standards.',
};

TRUE_FALSE_STATEMENTS['c802'] = {
    trueStatement: 'The EU AI Act bans certain AI uses entirely — including government social scoring systems and most real-time biometric surveillance in public spaces.',
    falseStatement: 'The EU AI Act applies only to AI companies headquartered in the European Union and does not affect foreign companies selling AI products in EU markets.',
    correction: 'Like the GDPR, the EU AI Act has extraterritorial scope — it applies to any AI system placed on the EU market or whose outputs are used in the EU, regardless of where the company is headquartered.',
};

TRUE_FALSE_STATEMENTS['c803'] = {
    trueStatement: 'Responsible scaling policies require AI labs to define specific capability thresholds and corresponding safety measures that must be met before training more powerful models.',
    falseStatement: 'Responsible scaling policies are legally binding regulations enforced by governments with penalties for non-compliance.',
    correction: 'Responsible scaling policies are voluntary, self-imposed commitments by AI labs — they are not government regulations. Their effectiveness depends entirely on labs\' genuine commitment to following through, though they may inform future regulation.',
};

TRUE_FALSE_STATEMENTS['c804'] = {
    trueStatement: 'The UK established the world\'s first government AI Safety Institute in 2023, followed by the US and other countries launching their own safety evaluation bodies.',
    falseStatement: 'AI Safety Institutes are internal departments within AI companies like OpenAI and Anthropic, not independent government organizations.',
    correction: 'AI Safety Institutes are government-established, publicly accountable bodies — distinct from AI labs\' internal safety teams. Their independence from the companies they evaluate is a core design feature.',
};

TRUE_FALSE_STATEMENTS['c805'] = {
    trueStatement: 'Twenty-eight countries and the EU signed the 2023 Bletchley Declaration acknowledging that frontier AI risks require international cooperation, though the declaration is non-binding.',
    falseStatement: 'International AI coordination has already produced a comprehensive, binding global treaty that all major AI-developing nations have signed and ratified.',
    correction: 'No binding global AI treaty exists — international coordination so far consists of non-binding declarations, voluntary commitments, and discussion forums. Achieving binding agreements is difficult because nations have competing economic and strategic interests in AI leadership.',
};

TRUE_FALSE_STATEMENTS['c806'] = {
    trueStatement: 'The open vs. closed debate intensified when Meta released the Llama model weights publicly, demonstrating that open-weight models can approach the performance of proprietary systems.',
    falseStatement: 'Open-weight AI models are always safer than closed models because more people can inspect them for safety issues.',
    correction: 'Openness creates a tradeoff — while independent researchers can audit open models, bad actors also get unrestricted access. A model that enables both safety research and malicious use is not automatically safer than one with controlled access.',
};
