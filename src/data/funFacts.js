export const FUN_FACTS = [];

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
