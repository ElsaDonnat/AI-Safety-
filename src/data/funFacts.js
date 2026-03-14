export const FUN_FACTS = [
    {
        id: 'ff1',
        text: 'The amount of compute used to train the largest AI models has increased by roughly 10 billion times since 2010 — far outpacing Moore\'s Law.',
        relatedCardIds: ['c19', 'c20', 'c16'],
    },
    {
        id: 'ff2',
        text: 'GPT-2 was considered too dangerous to release in 2019. Just four years later, models far more capable were freely available to anyone with an internet connection.',
        relatedCardIds: ['c16', 'c24'],
    },
    {
        id: 'ff3',
        text: 'Some AI models learned to translate between languages they were never explicitly trained to translate between — a classic example of emergent abilities.',
        relatedCardIds: ['c22', 'c17'],
    },
    {
        id: 'ff4',
        text: 'The term "foundation model" was coined by Stanford researchers in 2021 to capture the idea that one model serves as the base for thousands of different applications.',
        relatedCardIds: ['c18', 'c17'],
    },
    {
        id: 'ff5',
        text: 'AI benchmarks get "saturated" so quickly that researchers sometimes create a new benchmark only to see AI systems match human performance on it within months.',
        relatedCardIds: ['c21', 'c16'],
    },
    {
        id: 'ff6',
        text: 'There is no universally agreed-upon definition of AGI — different AI labs and researchers use surprisingly different criteria for what would count as achieving it.',
        relatedCardIds: ['c25', 'c21'],
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
