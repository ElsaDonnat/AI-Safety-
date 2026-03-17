export const FUN_FACTS = [
    {
        id: 'ff1',
        text: 'The amount of compute used to train the largest AI models has increased by roughly 10 billion times since 2010 — far outpacing Moore\'s Law.',
        relatedCardIds: ['c203', 'c201'],
    },
    {
        id: 'ff2',
        text: 'Some AI models learned to translate between languages they were never explicitly trained to translate between — a classic example of emergent abilities.',
        relatedCardIds: ['c205', 'c201'],
    },
    {
        id: 'ff3',
        text: 'The term "foundation model" was coined by Stanford researchers in 2021 to capture the idea that one model serves as the base for thousands of different applications.',
        relatedCardIds: ['c202', 'c201'],
    },
    {
        id: 'ff4',
        text: 'AI benchmarks get "saturated" so quickly that researchers sometimes create a new benchmark only to see AI systems match human performance on it within months.',
        relatedCardIds: ['c204', 'c205'],
    },
    {
        id: 'ff5',
        text: 'The Transformer architecture, introduced in a 2017 paper called "Attention Is All You Need," is behind virtually every major language model today.',
        relatedCardIds: ['c305', 'c201'],
    },
    // ─── Governance Fun Facts ────────────────────────────────
    {
        id: 'ff6',
        text: 'The EU AI Act took over three years to negotiate and runs to more than 400 pages — making it one of the most detailed pieces of technology legislation ever written.',
        relatedCardIds: ['c703', 'c701'],
    },
    {
        id: 'ff7',
        text: 'Some countries have experimented with "algorithmic registers" — public databases that list every AI system used by government agencies, so citizens can see exactly where AI is making decisions about their lives.',
        relatedCardIds: ['c704', 'c903'],
    },
    {
        id: 'ff8',
        text: 'The first AI Safety Summit at Bletchley Park in 2023 was held at the same historic site where Alan Turing helped crack the Enigma code during World War II — a fitting location for discussing the future of intelligent machines.',
        relatedCardIds: ['c802', 'c801'],
    },
    {
        id: 'ff9',
        text: 'The global supply chain for advanced AI chips is remarkably concentrated — over 90% of the most advanced chips are manufactured by a single company, TSMC in Taiwan, making compute governance a geopolitical issue.',
        relatedCardIds: ['c804', 'c203'],
    },
    {
        id: 'ff10',
        text: 'In 2024, a group of current and former employees at major AI labs published an open letter calling for stronger whistleblower protections, arguing that the people closest to the technology are often least able to speak about its risks.',
        relatedCardIds: ['c906', 'c901'],
    },
    {
        id: 'ff11',
        text: 'The concept of algorithmic auditing was partly inspired by financial auditing — just as companies must have their accounts independently verified, there are growing calls for AI systems to face similar external scrutiny.',
        relatedCardIds: ['c902', 'c803'],
    },
    {
        id: 'ff12',
        text: 'China, the EU, and the US have all taken different approaches to AI regulation — China focuses on specific AI applications, the EU on comprehensive risk-based law, and the US on sector-specific guidelines and executive orders.',
        relatedCardIds: ['c701', 'c801'],
    },
];

export function getFunFactsForSeenCards() {
    return FUN_FACTS;
}

export function getNextFunFact(seenFunFactIds, availableFacts, index) {
    if (!availableFacts || availableFacts.length === 0) return null;
    const seenSet = new Set(seenFunFactIds || []);
    const unseen = availableFacts.filter(ff => !seenSet.has(ff.id));
    if (unseen.length > 0) return unseen[index % unseen.length];
    return availableFacts[index % availableFacts.length];
}
