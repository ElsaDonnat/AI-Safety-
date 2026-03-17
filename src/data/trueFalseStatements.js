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
    falseStatement: 'Modern NLP systems understand the meaning of words in the same way that humans do, with genuine comprehension of grammar and semantics.',
    correction: 'Modern NLP systems process language through statistical pattern recognition, not human-like comprehension — they can produce fluent text without understanding meaning the way people do.',
};

TRUE_FALSE_STATEMENTS['c105'] = {
    trueStatement: 'Neural networks learn by adjusting the strength of connections between nodes during training, not by being explicitly programmed with rules.',
    falseStatement: 'Neural networks are accurate simulations of biological brains and work the same way neurons do in the human brain.',
    correction: 'Neural networks are only loosely inspired by biological brains — they use simplified mathematical functions, not actual biological neuron behavior.',
};

TRUE_FALSE_STATEMENTS['c106'] = {
    trueStatement: 'Computer vision systems can be trained to detect objects, recognize faces, and read text from images.',
    falseStatement: 'Computer vision systems that perform well on benchmark datasets can be trusted to work reliably in all real-world conditions, including unusual lighting or angles.',
    correction: 'CV systems often struggle with conditions outside their training distribution — unusual lighting, occlusion, or adversarial inputs can cause failures that benchmarks do not capture.',
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
    falseStatement: 'Open-source AI models have eliminated the advantage that major AI labs hold, since anyone can now replicate frontier capabilities.',
    correction: 'While open-source models have narrowed the gap, frontier AI development still requires massive compute budgets and specialized talent that only well-funded labs can sustain.',
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

// ─── AI Regulation (c701–c706) ──────────────────────────

TRUE_FALSE_STATEMENTS['c701'] = {
    trueStatement: 'AI regulations can require companies to meet specific safety standards before they are allowed to deploy an AI system to the public.',
    falseStatement: 'AI regulation is most effective when it focuses on regulating the underlying technology rather than the specific applications and contexts in which AI is used.',
    correction: 'Most AI regulation targets applications and use cases rather than the technology itself, because the same model can be harmless in one context and dangerous in another.',
};

TRUE_FALSE_STATEMENTS['c702'] = {
    trueStatement: 'Under risk-based regulation, an AI system used to filter spam emails would face fewer regulatory requirements than one used to make medical diagnoses.',
    falseStatement: 'Under risk-based regulation, an AI system that assists doctors with diagnoses would be classified the same as one that recommends restaurants, since both process personal data.',
    correction: 'Risk-based regulation specifically differentiates by potential harm — a medical diagnosis system poses much higher risk than a restaurant recommender and would face stricter requirements.',
};

TRUE_FALSE_STATEMENTS['c703'] = {
    trueStatement: 'The EU AI Act can apply to AI companies based outside Europe if their systems are used by people within the EU.',
    falseStatement: 'The EU AI Act only applies to AI companies that are headquartered within European Union member states.',
    correction: 'The EU AI Act has extraterritorial reach — it applies to any AI system placed on the EU market or whose output is used within the EU, regardless of where the provider is based.',
};

TRUE_FALSE_STATEMENTS['c704'] = {
    trueStatement: 'An algorithmic impact assessment can reveal potential biases in an AI system before it is deployed and affects real people.',
    falseStatement: 'Algorithmic impact assessments are only relevant for AI systems that make fully autonomous decisions without any human involvement.',
    correction: 'Impact assessments are valuable for any AI system that affects people, including those that assist human decision-makers — even advisory AI can introduce bias into decisions.',
};

TRUE_FALSE_STATEMENTS['c705'] = {
    trueStatement: 'Regulatory sandboxes allow regulators to learn how new AI technology works in practice, which helps them write better-informed rules.',
    falseStatement: 'Companies that test their AI in regulatory sandboxes are permanently exempt from future regulations on those systems.',
    correction: 'Sandboxes are temporary and time-limited — once the testing period ends, the AI system must comply with all applicable regulations like any other system.',
};

TRUE_FALSE_STATEMENTS['c706'] = {
    trueStatement: 'Effective enforcement of AI regulations may require regulators to develop technical expertise in machine learning and AI systems.',
    falseStatement: 'Publishing AI regulations is sufficient to ensure compliance — the existence of clear rules means companies will follow them without active enforcement.',
    correction: 'Rules without enforcement lack teeth — companies may deprioritize compliance when it is costly, hard to verify, or when regulators lack technical capacity to detect violations.',
};

// ─── Global AI Governance (c801–c806) ────────────────────

TRUE_FALSE_STATEMENTS['c801'] = {
    trueStatement: 'A country with strict AI regulations could see companies relocate to countries with weaker rules, which is one reason international coordination matters.',
    falseStatement: 'International AI governance is unnecessary because each country can fully regulate AI within its own borders.',
    correction: 'AI systems operate across borders — a model trained in one country can be deployed worldwide — so purely national regulation leaves gaps that only international coordination can address.',
};

TRUE_FALSE_STATEMENTS['c802'] = {
    trueStatement: 'AI Safety Summits can help build political momentum for AI regulation even when they do not produce legally binding agreements.',
    falseStatement: 'AI Safety Summits produce legally binding international treaties that all participating countries must follow.',
    correction: 'AI Safety Summits produce declarations and voluntary commitments, not binding treaties — they build political consensus but do not create enforceable international law.',
};

TRUE_FALSE_STATEMENTS['c803'] = {
    trueStatement: 'Technical standards help translate broad regulatory goals like "AI must be fair" into specific, measurable requirements that engineers can implement.',
    falseStatement: 'Technical standards for AI carry the force of law — once a standard is published, companies are legally required to comply with it.',
    correction: 'Standards are typically voluntary unless a government adopts them into binding regulation — many companies follow standards for market credibility, not legal obligation.',
};

TRUE_FALSE_STATEMENTS['c804'] = {
    trueStatement: 'Because training frontier AI models requires enormous computing resources, controlling access to compute can influence who is able to build the most powerful systems.',
    falseStatement: 'Compute governance will become less relevant over time as AI models become more efficient and require less hardware to train.',
    correction: 'While efficiency improvements are real, frontier AI training continues to demand ever-larger compute budgets — and governance also covers deployment infrastructure, not just training.',
};

TRUE_FALSE_STATEMENTS['c805'] = {
    trueStatement: 'Voluntary commitments by AI companies can help establish safety norms even in areas where formal regulation has not yet been developed.',
    falseStatement: 'Voluntary commitments from AI companies provide the same level of accountability as legally binding regulations.',
    correction: 'Voluntary commitments lack legal enforcement mechanisms — companies can change or abandon them without facing penalties, which is why critics argue they are insufficient on their own.',
};

TRUE_FALSE_STATEMENTS['c806'] = {
    trueStatement: 'Including affected communities in AI governance decisions can surface risks and harms that developers and policymakers might otherwise overlook.',
    falseStatement: 'Multi-stakeholder governance slows down AI progress because including too many voices in policy-making makes it harder to reach agreement on anything.',
    correction: 'While broader participation can take longer, it produces more robust and legitimate policy — decisions made without affected communities often overlook real-world harms and face later resistance.',
};

// ─── Accountability & Oversight (c901–c906) ──────────────

TRUE_FALSE_STATEMENTS['c901'] = {
    trueStatement: 'Clear accountability structures can incentivize AI developers to invest more in safety and testing before deploying their systems.',
    falseStatement: 'Since AI systems generate their own outputs, responsibility for harmful decisions rests with the AI itself rather than with the developers or deployers.',
    correction: 'AI systems have no legal personhood — accountability frameworks assign responsibility to the humans and organizations that design, build, and deploy them.',
};

TRUE_FALSE_STATEMENTS['c902'] = {
    trueStatement: 'An independent AI audit can reveal safety or fairness problems that the system\'s own developers may have missed or underestimated.',
    falseStatement: 'AI systems only need to be audited once before deployment, after which they can be trusted to perform consistently without further review.',
    correction: 'AI systems can change as data distributions shift and user patterns evolve — ongoing or periodic auditing is necessary to catch problems that emerge after deployment.',
};

TRUE_FALSE_STATEMENTS['c903'] = {
    trueStatement: 'Requiring organizations to disclose how their AI makes decisions can help affected individuals challenge outcomes they believe are unfair.',
    falseStatement: 'Full transparency about an AI system\'s inner workings would automatically make the system safe and fair for everyone.',
    correction: 'Transparency is necessary but not sufficient — knowing how a system works does not fix its flaws; separate action is needed to address the problems transparency reveals.',
};

TRUE_FALSE_STATEMENTS['c904'] = {
    trueStatement: 'Applying traditional product liability law to AI is complicated because AI systems can change their behavior after deployment as they encounter new data and situations.',
    falseStatement: 'Existing liability laws designed for traditional products work perfectly for AI systems without any adaptation.',
    correction: 'Traditional liability law assumes human decision-makers and predictable product behavior — AI\'s autonomy, opacity, and evolving behavior create novel challenges requiring adapted frameworks.',
};

TRUE_FALSE_STATEMENTS['c905'] = {
    trueStatement: 'An AI system that performs well during testing can behave differently in the real world because production conditions often differ from test environments.',
    falseStatement: 'If an AI system passes all pre-deployment tests, there is no need to monitor it after release.',
    correction: 'Pre-deployment testing cannot anticipate all real-world conditions — user behavior, data patterns, and edge cases in production can cause problems that only emerge after release.',
};

TRUE_FALSE_STATEMENTS['c906'] = {
    trueStatement: 'Employees at AI companies may be among the first to notice safety risks that are not visible to outside regulators or the public.',
    falseStatement: 'Employees who raise safety concerns at AI companies are adequately protected by existing employment law, making AI-specific whistleblower protections redundant.',
    correction: 'General employment law often lacks protections tailored to the unique risks of AI — employees may face retaliation through reassignment or termination, and AI-specific harms may not fit neatly into existing legal categories.',
};
