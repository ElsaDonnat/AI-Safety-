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
