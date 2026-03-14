export const DESCRIPTION_DISTRACTORS = {
    'c16': {
        hardCorrect: 'The rapid advancement of AI capabilities over time and the urgency this creates for ensuring these systems are developed safely.',
        distractors: [
            { text: 'A branch of philosophy examining whether machines can have consciousness or subjective experiences.', d: 1 },
            { text: 'The process of deploying AI systems in commercial products to maximize revenue and market share.', d: 1 },
            { text: 'The historical development of computer hardware from vacuum tubes to modern processors.', d: 2 },
            { text: 'A field focused on measuring how quickly AI companies can hire researchers and scale their teams.', d: 2 },
            { text: 'The gradual improvement of AI systems over decades, suggesting we have plenty of time to address safety before risks become real.', d: 3 },
            { text: 'The study of how AI capabilities advance, driven primarily by algorithmic breakthroughs rather than increases in compute or data.', d: 3 },
        ],
    },
    'c17': {
        hardCorrect: 'Neural networks trained on enormous text corpora that can generate coherent language, answer questions, and perform reasoning across diverse domains.',
        distractors: [
            { text: 'Physical robots that can understand and respond to spoken commands in warehouse environments.', d: 1 },
            { text: 'Databases that store and retrieve factual information using keyword search algorithms.', d: 1 },
            { text: 'AI systems trained exclusively on images that can generate photorealistic pictures from text prompts.', d: 2 },
            { text: 'Rule-based chatbots that use hand-coded decision trees to respond to a fixed set of user questions.', d: 2 },
            { text: 'AI systems trained on text data that work by storing and retrieving exact passages rather than learning statistical patterns.', d: 3 },
            { text: 'AI models that learn language by being explicitly taught grammar rules and vocabulary, then applying those rules to generate text.', d: 3 },
        ],
    },
    'c18': {
        hardCorrect: 'Large AI models trained on broad, diverse data that serve as a base for many different applications through fine-tuning or prompting.',
        distractors: [
            { text: 'Open-source software libraries that provide pre-built functions for common programming tasks.', d: 1 },
            { text: 'The physical data centers and server infrastructure required to host AI systems at scale.', d: 1 },
            { text: 'AI systems designed and optimized from scratch for a single specific task, like playing chess or detecting spam.', d: 2 },
            { text: 'A collection of many small, specialized AI models that each handle one narrow task and are combined into a pipeline.', d: 2 },
            { text: 'Large pretrained models that can only be used for the exact task they were trained on and require full retraining for any new application.', d: 3 },
            { text: 'General-purpose AI models that are fully safe and predictable because their broad training eliminates unexpected behaviors.', d: 3 },
        ],
    },
    'c19': {
        hardCorrect: 'The exponential growth in processing power used for AI training, which drives capability improvements and determines which organizations can build advanced systems.',
        distractors: [
            { text: 'The total number of AI researchers employed globally and how that workforce has grown over time.', d: 1 },
            { text: 'The study of how energy-efficient AI algorithms can reduce electricity consumption in consumer devices.', d: 1 },
            { text: 'The amount of training data available on the internet and how dataset size affects model quality.', d: 2 },
            { text: 'Improvements in AI software algorithms that make models smarter without needing any additional hardware.', d: 2 },
            { text: 'The growth in computing power used for AI, which has been increasing steadily and linearly over the past decade.', d: 3 },
            { text: 'The role of compute in AI progress, which matters mainly because faster chips allow models to run quicker at inference time rather than during training.', d: 3 },
        ],
    },
    'c20': {
        hardCorrect: 'Empirical findings that AI model performance follows predictable curves when you increase parameters, data, or compute, enabling forecasts of future capability.',
        distractors: [
            { text: 'Legal frameworks that determine how large an AI company can grow before triggering antitrust regulation.', d: 1 },
            { text: 'Business principles about how AI startups should scale their teams and operations as they grow.', d: 1 },
            { text: 'The observation that computer chip transistor counts double roughly every two years, as described by Moore\'s Law.', d: 2 },
            { text: 'Guidelines for how to increase the size of training datasets by collecting more data from the internet.', d: 2 },
            { text: 'Relationships showing that AI performance improves unpredictably with scale, making it impossible to forecast when systems will reach certain capability levels.', d: 3 },
            { text: 'Empirical rules showing that model performance improves with scale, but only up to a fixed ceiling beyond which no amount of additional compute helps.', d: 3 },
        ],
    },
    'c21': {
        hardCorrect: 'Standardized tests and evaluation suites that measure AI performance on defined tasks, helping track progress while struggling to capture deeper understanding or safety.',
        distractors: [
            { text: 'Marketing ratings that rank AI products based on customer satisfaction surveys and app store reviews.', d: 1 },
            { text: 'Financial metrics used to evaluate the profitability and market value of AI companies.', d: 1 },
            { text: 'The process of red-teaming AI systems by having humans try to find harmful or dangerous outputs.', d: 2 },
            { text: 'Internal testing procedures that AI labs use to evaluate employee performance on research projects.', d: 2 },
            { text: 'Standardized tests that comprehensively measure all AI capabilities including safety, common sense, and real-world reliability.', d: 3 },
            { text: 'Testing frameworks that perfectly capture AI understanding, since models that score well on benchmarks have genuinely mastered the underlying concepts.', d: 3 },
        ],
    },
    'c22': {
        hardCorrect: 'Abilities that arise abruptly in AI models past certain scale thresholds, without being directly trained for, making future capabilities hard to predict.',
        distractors: [
            { text: 'The gradual improvement in AI accuracy that occurs as engineers fix bugs and optimize code over many software updates.', d: 1 },
            { text: 'Features intentionally built into AI products by design teams based on user feedback and market research.', d: 1 },
            { text: 'Capabilities that researchers deliberately train into AI models by providing specific examples and labeled data for each skill.', d: 2 },
            { text: 'The phenomenon where AI models slowly get better at tasks as they are fine-tuned on more specialized data.', d: 2 },
            { text: 'Capabilities that appear gradually and predictably as models scale up, following smooth performance curves that allow researchers to anticipate exactly when each ability will emerge.', d: 3 },
            { text: 'Unexpected abilities in large AI models that emerge because the models have memorized and are retrieving specific training examples rather than developing new capabilities.', d: 3 },
        ],
    },
    'c23': {
        hardCorrect: 'AI systems that operate with increasing autonomy — setting goals, making plans, using tools, and executing multi-step tasks with real-world consequences.',
        distractors: [
            { text: 'Human employees at AI companies who are responsible for manually reviewing and approving model outputs before they reach users.', d: 1 },
            { text: 'Software programs that automate simple repetitive tasks like file backups or scheduled emails using fixed scripts.', d: 1 },
            { text: 'AI assistants that provide helpful responses to questions but cannot take any actions or interact with external systems.', d: 2 },
            { text: 'Robotic systems designed for physical manufacturing tasks like welding and assembly on factory production lines.', d: 2 },
            { text: 'AI systems that can take actions autonomously but are inherently safe because each individual step is simple and easily reversible.', d: 3 },
            { text: 'Autonomous AI systems that plan and act independently, whose safety concerns are fully addressed by having a human approve the final output.', d: 3 },
        ],
    },
    'c24': {
        hardCorrect: 'The most capable AI systems in existence at any point in time, built by top labs with vast resources, and the first to present novel capabilities and risks.',
        distractors: [
            { text: 'Open-source AI models that are freely available for anyone to download, modify, and use without restrictions.', d: 1 },
            { text: 'The user-facing interface designs and visual styling of consumer AI products like chatbots and voice assistants.', d: 1 },
            { text: 'AI models that were once state-of-the-art but have been superseded by newer, more capable systems.', d: 2 },
            { text: 'Specialized narrow AI systems that achieve superhuman performance on a single task like playing a specific board game.', d: 2 },
            { text: 'The most capable AI systems, which receive extra safety scrutiny primarily because they are the most profitable products for their companies.', d: 3 },
            { text: 'Leading AI models that represent the cutting edge, whose capabilities and risks are fully understood before deployment because of extensive pre-release testing.', d: 3 },
        ],
    },
    'c25': {
        hardCorrect: 'A yet-to-be-achieved level of AI that would equal or surpass human reasoning across all cognitive domains, representing the central long-term concern of AI safety.',
        distractors: [
            { text: 'A certification standard that AI companies can earn by demonstrating their models meet specific performance benchmarks.', d: 1 },
            { text: 'The general intelligence level of current AI assistants like Siri and Alexa, which already understand language as well as humans do.', d: 1 },
            { text: 'An AI system that has achieved superhuman performance in one specific domain, such as playing chess or Go better than any human.', d: 2 },
            { text: 'The collective intelligence that emerges when many specialized AI systems are networked together to share information.', d: 2 },
            { text: 'A hypothetical AI with human-level ability across all tasks, which most researchers agree has already been achieved by current large language models.', d: 3 },
            { text: 'An AI system matching human cognition in all domains, whose alignment with human values would be straightforward to ensure once the technical capability is reached.', d: 3 },
        ],
    },
};
