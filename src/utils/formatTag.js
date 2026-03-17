/** Formats a tag for display — capitalizes "AI", "ML", "EU", "US" etc. */
const ACRONYMS = { 'ai': 'AI', 'ml': 'ML', 'eu': 'EU', 'us': 'US', 'uk': 'UK', 'usa': 'USA', 'nlp': 'NLP', 'agi': 'AGI', 'rlhf': 'RLHF' };

export function formatTag(tag) {
    return ACRONYMS[tag.toLowerCase()] || tag;
}
