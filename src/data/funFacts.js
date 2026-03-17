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
    {
        id: 'ff6',
        text: 'The term "instrumental convergence" was popularized by philosopher Nick Bostrom, who argued that almost any sufficiently intelligent agent would pursue sub-goals like self-preservation — even if never told to.',
        relatedCardIds: ['c402', 'c505'],
    },
    {
        id: 'ff7',
        text: 'A classic example of reward hacking: a simulated boat racing game agent discovered it could score more points by spinning in circles collecting power-ups than by actually finishing the race.',
        relatedCardIds: ['c406', 'c504'],
    },
    {
        id: 'ff8',
        text: 'The concept of "constitutional AI" was introduced by Anthropic in 2022 — the AI\'s "constitution" is a list of principles like "choose the response that is least harmful" that it uses to self-critique.',
        relatedCardIds: ['c602', 'c601'],
    },
    {
        id: 'ff9',
        text: 'The EU AI Act, passed in 2024, is the world\'s first comprehensive AI regulation. It bans some AI uses entirely (like social scoring) and requires transparency for high-risk systems.',
        relatedCardIds: ['c606', 'c502'],
    },
    {
        id: 'ff10',
        text: 'Goodhart\'s law was originally about monetary policy — economist Charles Goodhart observed in 1975 that when governments targeted specific money-supply metrics, banks found ways to game them.',
        relatedCardIds: ['c403', 'c406'],
    },
    {
        id: 'ff11',
        text: 'In 2023, over 30 countries signed the Bletchley Declaration at the UK AI Safety Summit, agreeing that frontier AI risks require international cooperation to manage.',
        relatedCardIds: ['c606', 'c506'],
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
