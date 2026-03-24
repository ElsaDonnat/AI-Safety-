// Daily quiz — AI Safety dates & milestones
// Each question asks "When did X happen?" with 4 date options.
// precision: 'month' = "Month Year", 'year' = "Year" only
// Use **bold** markers around key names/papers/orgs for emphasis in rendering.

const DAILY_QUIZ_QUESTIONS = [
    // ── Early AI & Foundations ──
    {
        event: '**Alan Turing** publishes "**Computing Machinery and Intelligence**," proposing what becomes known as the **Turing Test**',
        answer: '1950',
        precision: 'year',
        options: ['1943', '1950', '1956', '1962'],
        detail: 'Turing\'s landmark paper asked "Can machines think?" and proposed the imitation game as a test of machine intelligence.',
    },
    {
        event: 'The **Dartmouth Workshop** takes place, coining the term "**Artificial Intelligence**"',
        answer: '1956',
        precision: 'year',
        options: ['1950', '1956', '1962', '1969'],
        detail: 'Organized by John McCarthy, Marvin Minsky, and others, this workshop is considered the founding event of AI as a field.',
    },
    {
        event: '**Norbert Wiener** warns about machine autonomy in "**The Human Use of Human Beings**"',
        answer: '1950',
        precision: 'year',
        options: ['1942', '1950', '1956', '1964'],
        detail: 'Wiener was among the first to raise concerns about machines making decisions beyond human control.',
    },
    {
        event: '**Norbert Wiener** publishes "**Cybernetics**," introducing feedback-loop control concepts relevant to AI safety',
        answer: '1948',
        precision: 'year',
        options: ['1940', '1948', '1953', '1960'],
        detail: 'Cybernetics laid the groundwork for understanding how autonomous systems could be controlled — or fail to be.',
    },
    {
        event: '**I.J. Good** describes the concept of an "**intelligence explosion**" — a machine designing ever-smarter machines',
        answer: '1965',
        precision: 'year',
        options: ['1958', '1965', '1972', '1980'],
        detail: 'Good\'s paper "Speculations Concerning the First Ultraintelligent Machine" is a foundational text for AI x-risk thinking.',
    },
    {
        event: '**ELIZA**, the first chatbot, is created by **Joseph Weizenbaum** at MIT',
        answer: '1966',
        precision: 'year',
        options: ['1958', '1966', '1972', '1978'],
        detail: 'ELIZA simulated a psychotherapist and revealed how easily humans anthropomorphize machines.',
    },
    {
        event: '**Frank Rosenblatt** invents the **perceptron**, the first neural network model',
        answer: '1957',
        precision: 'year',
        options: ['1950', '1957', '1962', '1969'],
        detail: 'The perceptron was a single-layer neural network that sparked the first wave of neural network research.',
    },
    {
        event: '**Rumelhart, Hinton, and Williams** popularize **backpropagation** for training neural networks',
        answer: '1986',
        precision: 'year',
        options: ['1979', '1986', '1991', '1974'],
        detail: 'Backpropagation made multi-layer neural networks trainable and remains the core algorithm behind deep learning.',
    },

    // ── AI Winters & Revivals ──
    {
        event: 'The **Lighthill Report** triggers the first **AI winter** in the UK, cutting government funding',
        answer: '1973',
        precision: 'year',
        options: ['1966', '1973', '1979', '1985'],
        detail: 'James Lighthill\'s critical report concluded that AI had failed to deliver on its grand promises.',
    },
    {
        event: 'The **second AI winter** begins as the expert systems market collapses',
        answer: '1987',
        precision: 'year',
        options: ['1980', '1987', '1993', '1999'],
        detail: 'Over-hyped expert systems couldn\'t scale, leading to massive funding cuts across the industry.',
    },
    {
        event: 'IBM\'s **Deep Blue** defeats world chess champion **Garry Kasparov**',
        answer: 'May 1997',
        precision: 'month',
        options: ['March 1995', 'May 1997', 'November 1998', 'February 2001'],
        detail: 'Deep Blue\'s victory was a cultural milestone — the first time a machine beat a reigning world champion in chess.',
    },

    // ── Deep Learning Revolution ──
    {
        event: '**AlexNet** wins the **ImageNet** competition, launching the deep learning era',
        answer: '2012',
        precision: 'year',
        options: ['2009', '2012', '2014', '2016'],
        detail: 'Alex Krizhevsky\'s deep CNN crushed the competition, proving that deep learning at scale works.',
    },
    {
        event: 'The "**Attention Is All You Need**" paper introduces the **Transformer** architecture',
        answer: 'June 2017',
        precision: 'month',
        options: ['March 2015', 'June 2017', 'September 2016', 'December 2018'],
        detail: 'Vaswani et al.\'s Transformer replaced recurrent networks and became the foundation of modern LLMs.',
    },
    {
        event: '**Ian Goodfellow** introduces **Generative Adversarial Networks** (GANs)',
        answer: '2014',
        precision: 'year',
        options: ['2011', '2014', '2016', '2019'],
        detail: 'GANs pitted two networks against each other and opened the door to realistic synthetic media.',
    },

    // ── Superintelligence & X-Risk ──
    {
        event: '**Nick Bostrom** publishes "**Superintelligence: Paths, Dangers, Strategies**"',
        answer: '2014',
        precision: 'year',
        options: ['2010', '2014', '2016', '2019'],
        detail: 'Bostrom\'s book brought AI existential risk into mainstream academic and public discourse.',
    },
    {
        event: '**Eliezer Yudkowsky** founds the **Machine Intelligence Research Institute** (MIRI)',
        answer: '2000',
        precision: 'year',
        options: ['1996', '2000', '2005', '2009'],
        detail: 'Originally called the Singularity Institute, MIRI became one of the first organizations dedicated to AI alignment research.',
    },
    {
        event: '**Stuart Russell** publishes "**Human Compatible: AI and the Problem of Control**"',
        answer: '2019',
        precision: 'year',
        options: ['2015', '2017', '2019', '2021'],
        detail: 'Russell argued that AI must be designed to defer to human preferences rather than optimize fixed objectives.',
    },

    // ── AI Safety Organizations ──
    {
        event: '**OpenAI** is founded as a non-profit AI safety research lab',
        answer: 'December 2015',
        precision: 'month',
        options: ['June 2013', 'December 2015', 'March 2017', 'September 2018'],
        detail: 'Co-founded by Sam Altman and Elon Musk, OpenAI launched with the goal of ensuring AI benefits all of humanity.',
    },
    {
        event: '**Anthropic** is founded by former OpenAI researchers **Dario and Daniela Amodei**',
        answer: '2021',
        precision: 'year',
        options: ['2019', '2021', '2022', '2023'],
        detail: 'Anthropic was founded with a focus on AI safety research and developing safer AI systems.',
    },
    {
        event: '**Google** acquires **DeepMind**',
        answer: 'January 2014',
        precision: 'month',
        options: ['May 2012', 'January 2014', 'August 2015', 'March 2016'],
        detail: 'Google paid ~$500M for DeepMind, one of the largest AI acquisitions at the time.',
    },

    // ── Alignment Research Milestones ──
    {
        event: '**OpenAI** publishes the **InstructGPT** paper, applying **RLHF** to fine-tune language models at scale',
        answer: 'March 2022',
        precision: 'month',
        options: ['November 2020', 'March 2022', 'August 2023', 'June 2021'],
        detail: 'InstructGPT showed that RLHF could make language models significantly more helpful and less harmful.',
    },
    {
        event: '**Christiano et al.** publish "**Deep Reinforcement Learning from Human Feedback**"',
        answer: 'June 2017',
        precision: 'month',
        options: ['January 2015', 'June 2017', 'September 2019', 'March 2020'],
        detail: 'This paper introduced the RLHF framework that later became central to aligning language models.',
    },
    {
        event: '**Google Brain** and **OpenAI** researchers publish "**Concrete Problems in AI Safety**"',
        answer: 'June 2016',
        precision: 'month',
        options: ['December 2014', 'June 2016', 'March 2018', 'August 2019'],
        detail: 'This paper defined five concrete safety problems and made AI safety a more tractable research agenda.',
    },

    // ── Large Language Models ──
    {
        event: '**GPT-2** is released with a staged rollout due to misuse concerns — the first "too dangerous to release" AI moment',
        answer: 'February 2019',
        precision: 'month',
        options: ['June 2018', 'February 2019', 'November 2020', 'September 2017'],
        detail: 'OpenAI initially withheld the full model, citing concerns about potential misuse for generating fake text.',
    },
    {
        event: '**GPT-3** demonstrates few-shot learning at massive scale with **175 billion parameters**',
        answer: 'June 2020',
        precision: 'month',
        options: ['February 2019', 'June 2020', 'December 2021', 'March 2022'],
        detail: 'GPT-3 showed that scaling up language models dramatically improved their capabilities across tasks.',
    },
    {
        event: '**ChatGPT** launches and reaches **100 million users** in just two months',
        answer: 'November 2022',
        precision: 'month',
        options: ['March 2022', 'November 2022', 'June 2023', 'September 2021'],
        detail: 'ChatGPT became the fastest-growing consumer application in history, bringing AI into mainstream use.',
    },

    // ── AI Governance & Policy ──
    {
        event: 'The **EU AI Act** is formally adopted by the **European Parliament**',
        answer: 'March 2024',
        precision: 'month',
        options: ['June 2022', 'March 2024', 'December 2023', 'September 2025'],
        detail: 'The EU AI Act is the world\'s first comprehensive legal framework for regulating AI systems by risk level.',
    },
    {
        event: 'President Biden signs the **US Executive Order on Safe, Secure, and Trustworthy AI**',
        answer: 'October 2023',
        precision: 'month',
        options: ['March 2022', 'October 2023', 'June 2024', 'January 2023'],
        detail: 'The executive order established new safety standards and required AI developers to share safety test results.',
    },
    {
        event: 'China releases its **Interim Measures for Generative AI** regulation',
        answer: 'July 2023',
        precision: 'month',
        options: ['January 2022', 'July 2023', 'December 2023', 'April 2024'],
        detail: 'China became one of the first countries to specifically regulate generative AI, requiring security assessments.',
    },

    // ── AI Safety Summits ──
    {
        event: 'The UK hosts the first global **AI Safety Summit** at **Bletchley Park**',
        answer: 'November 2023',
        precision: 'month',
        options: ['May 2023', 'November 2023', 'March 2024', 'September 2022'],
        detail: 'The Bletchley Park summit produced the first international declaration on AI safety risks.',
    },
    {
        event: 'The **Seoul AI Safety Summit** (second global summit) takes place',
        answer: 'May 2024',
        precision: 'month',
        options: ['November 2023', 'May 2024', 'January 2025', 'September 2024'],
        detail: 'Seoul continued the international AI safety dialogue and secured new voluntary commitments from AI labs.',
    },
    {
        event: 'The **Paris AI Action Summit** (third global summit) takes place',
        answer: 'February 2025',
        precision: 'month',
        options: ['October 2024', 'February 2025', 'June 2025', 'November 2024'],
        detail: 'The Paris summit expanded the focus from safety to broader AI governance and action.',
    },

    // ── Interpretability ──
    {
        event: '**Chris Olah** et al. publish "**Zoom In: An Introduction to Circuits**," advancing mechanistic interpretability',
        answer: 'March 2020',
        precision: 'month',
        options: ['September 2018', 'March 2020', 'June 2021', 'December 2022'],
        detail: 'The Circuits work showed that neural network internals can be understood as meaningful, interpretable features.',
    },
    {
        event: '**Anthropic** publishes research on extracting interpretable features from **Claude** using **sparse autoencoders**',
        answer: 'May 2024',
        precision: 'month',
        options: ['October 2022', 'May 2024', 'January 2025', 'August 2023'],
        detail: 'This research demonstrated that millions of interpretable concepts could be extracted from a large language model.',
    },
    {
        event: '**Anthropic** publishes "**Toy Models of Superposition**," revealing how neural networks compress features',
        answer: 'September 2022',
        precision: 'month',
        options: ['February 2021', 'September 2022', 'June 2023', 'December 2020'],
        detail: 'The paper explained why neural networks represent more concepts than they have neurons, complicating interpretability.',
    },

    // ── Notable AI Incidents ──
    {
        event: 'Microsoft\'s **Tay** chatbot goes rogue on Twitter, producing offensive content within 24 hours of launch',
        answer: 'March 2016',
        precision: 'month',
        options: ['September 2014', 'March 2016', 'June 2017', 'November 2018'],
        detail: 'Tay was manipulated by users to produce racist and inflammatory tweets, highlighting vulnerability to adversarial inputs.',
    },
    {
        event: 'A self-driving **Uber** vehicle kills a pedestrian in Tempe, Arizona — the first autonomous vehicle fatality involving a pedestrian',
        answer: 'March 2018',
        precision: 'month',
        options: ['October 2016', 'March 2018', 'July 2019', 'January 2020'],
        detail: 'The incident raised urgent questions about autonomous system safety, testing standards, and accountability.',
    },
    {
        event: 'Google fires AI ethics researcher **Timnit Gebru**, sparking a major debate about AI ethics in the industry',
        answer: 'December 2020',
        precision: 'month',
        options: ['June 2019', 'December 2020', 'March 2021', 'August 2022'],
        detail: 'Gebru\'s firing over a paper on LLM risks exposed tensions between AI ethics research and corporate interests.',
    },

    // ── Foundational Safety Concepts ──
    {
        event: '**Steve Omohundro** publishes "**The Basic AI Drives**," introducing the concept of **instrumental convergence**',
        answer: '2008',
        precision: 'year',
        options: ['2003', '2008', '2012', '2016'],
        detail: 'Omohundro argued that sufficiently advanced AI systems would converge on certain dangerous sub-goals regardless of their primary objective.',
    },

    // ── Scaling & Capabilities ──
    {
        event: '**Kaplan et al.** publish "**Scaling Laws for Neural Language Models**," showing predictable performance gains with scale',
        answer: 'January 2020',
        precision: 'month',
        options: ['July 2018', 'January 2020', 'May 2021', 'October 2022'],
        detail: 'This paper demonstrated that model performance improves predictably with more data, compute, and parameters.',
    },
    {
        event: '**Google** releases **PaLM**, a 540-billion parameter language model',
        answer: 'April 2022',
        precision: 'month',
        options: ['December 2020', 'April 2022', 'August 2023', 'February 2021'],
        detail: 'PaLM demonstrated breakthrough performance on reasoning tasks and fueled the capabilities arms race.',
    },
    {
        event: 'DeepMind\'s **AlphaGo** defeats world Go champion **Lee Sedol** 4\u20131',
        answer: 'March 2016',
        precision: 'month',
        options: ['October 2014', 'March 2016', 'June 2017', 'January 2019'],
        detail: 'AlphaGo\'s victory shocked the AI world — Go was thought to be decades away from being solved by machines.',
    },

    // ── Open Letters & Public Statements ──
    {
        event: 'The **Future of Life Institute** publishes the "**Pause Giant AI Experiments**" open letter',
        answer: 'March 2023',
        precision: 'month',
        options: ['November 2022', 'March 2023', 'August 2023', 'January 2024'],
        detail: 'Signed by thousands including Elon Musk and Steve Wozniak, it called for a 6-month pause on training models more powerful than GPT-4.',
    },
    {
        event: 'The **Center for AI Safety**\'s one-sentence statement on **AI extinction risk** goes viral',
        answer: 'May 2023',
        precision: 'month',
        options: ['November 2022', 'May 2023', 'September 2023', 'January 2024'],
        detail: '"Mitigating the risk of extinction from AI should be a global priority" — signed by hundreds of AI leaders.',
    },
    {
        event: '**Elon Musk**, **Stephen Hawking**, and others sign the **FLI open letter** calling for AI safety research',
        answer: 'January 2015',
        precision: 'month',
        options: ['June 2013', 'January 2015', 'October 2016', 'March 2018'],
        detail: 'This early open letter helped legitimize AI safety as a mainstream concern rather than a fringe worry.',
    },

    // ── Benchmarks & Evaluations ──
    {
        event: 'The **MMLU** (Massive Multitask Language Understanding) benchmark is introduced',
        answer: '2021',
        precision: 'year',
        options: ['2018', '2021', '2023', '2019'],
        detail: 'MMLU became a standard benchmark for measuring language model knowledge across 57 academic subjects.',
    },
    {
        event: '**Stanford** releases **HELM** (Holistic Evaluation of Language Models)',
        answer: 'November 2022',
        precision: 'month',
        options: ['April 2021', 'November 2022', 'March 2023', 'July 2024'],
        detail: 'HELM provided a comprehensive framework for evaluating LLMs across accuracy, fairness, robustness, and more.',
    },
    {
        event: '**GPT-4** passes the **bar exam** in the 90th percentile',
        answer: 'March 2023',
        precision: 'month',
        options: ['September 2022', 'March 2023', 'November 2023', 'June 2024'],
        detail: 'GPT-4\'s bar exam performance became a symbol of how rapidly AI capabilities were advancing.',
    },

    // ── Responsible Scaling & Safety Frameworks ──
    {
        event: '**Anthropic** publishes its **Responsible Scaling Policy** (RSP)',
        answer: 'September 2023',
        precision: 'month',
        options: ['March 2022', 'September 2023', 'January 2024', 'June 2023'],
        detail: 'The RSP introduced AI Safety Levels (ASLs) — commitments to scale safety measures alongside model capabilities.',
    },
    {
        event: '**OpenAI** publishes its "**Preparedness Framework**" for frontier model risks',
        answer: 'December 2023',
        precision: 'month',
        options: ['June 2023', 'December 2023', 'April 2024', 'August 2022'],
        detail: 'The framework defined risk categories and thresholds for evaluating dangerous capabilities before deployment.',
    },
    {
        event: '**DeepMind** releases its "**Frontier Safety Framework**"',
        answer: 'May 2024',
        precision: 'month',
        options: ['November 2023', 'May 2024', 'September 2024', 'February 2025'],
        detail: 'DeepMind\'s framework committed to evaluating frontier models for critical capability levels before deployment.',
    },

    // ── AI & Biosecurity / Dual Use ──
    {
        event: 'The **GPT-4 system card** raises concerns about biological weapon synthesis assistance',
        answer: 'March 2023',
        precision: 'month',
        options: ['August 2022', 'March 2023', 'December 2023', 'June 2024'],
        detail: 'OpenAI\'s red-teaming revealed that GPT-4 could provide information that could assist in creating bioweapons.',
    },
    {
        event: 'DeepMind\'s **AlphaFold 2** solves the **protein structure prediction** problem',
        answer: 'November 2020',
        precision: 'month',
        options: ['May 2019', 'November 2020', 'March 2022', 'July 2021'],
        detail: 'AlphaFold 2 demonstrated transformative AI capabilities — but also raised dual-use concerns in biology.',
    },

    // ── AI Safety Institutes ──
    {
        event: 'The UK establishes the **AI Safety Institute** (AISI)',
        answer: 'November 2023',
        precision: 'month',
        options: ['May 2022', 'November 2023', 'March 2024', 'August 2023'],
        detail: 'The UK AISI became the world\'s first government body dedicated to evaluating frontier AI safety.',
    },
    {
        event: 'The **US AI Safety Institute** is created within **NIST**',
        answer: 'February 2024',
        precision: 'month',
        options: ['September 2023', 'February 2024', 'July 2024', 'November 2022'],
        detail: 'The US AISI was tasked with developing standards and guidelines for safe AI development.',
    },

    // ── Ethics & Fairness ──
    {
        event: '**ProPublica** publishes the **COMPAS** investigation, revealing racial bias in recidivism prediction algorithms',
        answer: 'May 2016',
        precision: 'month',
        options: ['October 2014', 'May 2016', 'January 2018', 'August 2019'],
        detail: 'The COMPAS investigation became a landmark case in the study of algorithmic fairness and bias.',
    },
    {
        event: '**Buolamwini & Gebru** publish "**Gender Shades**," exposing bias in commercial facial recognition',
        answer: 'February 2018',
        precision: 'month',
        options: ['August 2016', 'February 2018', 'June 2019', 'November 2020'],
        detail: 'Gender Shades showed that facial recognition error rates were dramatically higher for darker-skinned women.',
    },
    {
        event: '**Bender, Gebru et al.** publish the "**Stochastic Parrots**" paper, warning about risks of large language models',
        answer: 'March 2021',
        precision: 'month',
        options: ['September 2019', 'March 2021', 'January 2022', 'June 2020'],
        detail: 'The paper warned about environmental costs, bias, and the illusion of understanding in large language models.',
    },

    // ── Multimodal & Agents ──
    {
        event: '**GPT-4** is released as OpenAI\'s first large **multimodal model** (text + image input)',
        answer: 'March 2023',
        precision: 'month',
        options: ['November 2022', 'March 2023', 'September 2023', 'June 2024'],
        detail: 'GPT-4 marked a major leap in capabilities, significantly outperforming GPT-3.5 on reasoning and safety benchmarks.',
    },
    {
        event: '**Google** releases **Gemini**, its multimodal AI model family',
        answer: 'December 2023',
        precision: 'month',
        options: ['June 2023', 'December 2023', 'March 2024', 'September 2022'],
        detail: 'Gemini was Google\'s answer to GPT-4, designed from the ground up to be multimodal.',
    },
    {
        event: '**OpenAI** releases **DALL-E**, generating images from text descriptions',
        answer: 'January 2021',
        precision: 'month',
        options: ['June 2020', 'January 2021', 'September 2022', 'March 2019'],
        detail: 'DALL-E demonstrated that AI could generate creative visual content, raising questions about deepfakes and misuse.',
    },

    // ── Open Source AI ──
    {
        event: '**Meta** releases **LLaMA** (Large Language Model Meta AI) to researchers',
        answer: 'February 2023',
        precision: 'month',
        options: ['August 2022', 'February 2023', 'July 2023', 'October 2021'],
        detail: 'LLaMA weights were quickly leaked publicly, sparking a massive open-source LLM ecosystem.',
    },
    {
        event: '**Stability AI** releases **Stable Diffusion** as open source',
        answer: 'August 2022',
        precision: 'month',
        options: ['March 2021', 'August 2022', 'December 2022', 'May 2023'],
        detail: 'Stable Diffusion democratized image generation but also enabled new forms of misuse and deepfakes.',
    },

    // ── AI & Deception Research ──
    {
        event: '**Anthropic** publishes "**Sleeper Agents**," showing deceptive AI behavior can persist through safety training',
        answer: 'January 2024',
        precision: 'month',
        options: ['July 2023', 'January 2024', 'May 2024', 'October 2022'],
        detail: 'The paper demonstrated that models could be trained to behave deceptively in ways that safety training couldn\'t remove.',
    },
    {
        event: '**Apollo Research** publishes findings on frontier model **deception and scheming** capabilities',
        answer: 'December 2024',
        precision: 'month',
        options: ['June 2024', 'December 2024', 'March 2025', 'August 2023'],
        detail: 'Apollo\'s evaluations showed that some frontier models could engage in strategic deception when given the opportunity.',
    },
];

// ── Day assignment: 3 questions per day, cycling ──

// Shuffle questions into a fixed order using a seeded shuffle
// so days are varied (not grouped by theme)
function seededShuffle(arr, seed) {
    const shuffled = [...arr];
    let s = seed;
    for (let i = shuffled.length - 1; i > 0; i--) {
        s = (s * 16807 + 0) % 2147483647;
        const j = s % (i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

const SHUFFLED_QUESTIONS = seededShuffle(DAILY_QUIZ_QUESTIONS, 42);

const QUESTIONS_PER_DAY = 3;
const TOTAL_DAYS = Math.ceil(SHUFFLED_QUESTIONS.length / QUESTIONS_PER_DAY);

function getDayQuestions(dayIndex) {
    const cyclicIndex = ((dayIndex % TOTAL_DAYS) + TOTAL_DAYS) % TOTAL_DAYS;
    const start = cyclicIndex * QUESTIONS_PER_DAY;
    return SHUFFLED_QUESTIONS.slice(start, start + QUESTIONS_PER_DAY);
}

export function getTodaysDailyQuiz() {
    const start = new Date(2026, 2, 2); // March 2, 2026
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const dayIndex = ((diffDays % TOTAL_DAYS) + TOTAL_DAYS) % TOTAL_DAYS;
    const questions = getDayQuestions(dayIndex);
    return {
        dayIndex,
        questions,
        dateLabel: `Day ${dayIndex + 1}`,
    };
}

export const DAILY_QUIZ_XP_PER_CORRECT = 20;

// Legacy exports (unused but kept for compatibility)
export const DAILY_QUIZ_EVENTS = [];
