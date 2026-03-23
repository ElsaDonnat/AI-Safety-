import { Button, Card } from './shared';
import { TOPICS } from '../data/lessons';
import { Bot, TrendingUp, Brain } from 'lucide-react';

const ICON_MAP = {
    'ai-basics': Bot,
    'ai-progress': TrendingUp,
    'ai-concepts': Brain,
};

/**
 * Onboarding overlay screens. Rendered based on onboardingStep.
 * Steps handled here: 'welcome', 'topic_overview'
 */
export default function OnboardingOverlay({ step, dispatch }) {
    const skip = () => dispatch({ type: 'SET_ONBOARDING_STEP', step: 'complete' });

    if (step === 'welcome') {
        return (
            <div className="onboarding-overlay animate-fade-in">
                <div className="onboarding-card">
                    <h1 className="mt-2 mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '36px', letterSpacing: '-0.04em', color: 'var(--color-ink)', transform: 'scaleY(0.92)', transformOrigin: 'bottom', display: 'inline-flex', alignItems: 'baseline', gap: '3px' }}>
                        alignd<span style={{ display: 'inline-block', width: '0.18em', height: '0.18em', backgroundColor: 'var(--color-sky)', borderRadius: '50%', marginLeft: '0.04em', flexShrink: 0 }} />
                    </h1>
                    <p className="text-xs uppercase tracking-widest mb-6" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-muted)' }}>
                        your ai safety companion
                    </p>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-ink-secondary)' }}>
                        Learn AI safety concepts through interactive lessons.
                        Build mastery with spaced repetition and challenge quizzes.
                    </p>
                    <Button className="w-full" onClick={() => dispatch({ type: 'SET_ONBOARDING_STEP', step: 'topic_overview' })}>
                        Get Started
                    </Button>
                    <button onClick={skip} className="onboarding-skip">
                        Skip tutorial
                    </button>
                </div>
            </div>
        );
    }

    if (step === 'topic_overview') {
        return (
            <div className="onboarding-overlay animate-fade-in">
                <div className="onboarding-card">
                    <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)', letterSpacing: '-0.01em' }}>
                        What You'll Learn
                    </h2>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-ink-secondary)' }}>
                        Explore key topics in AI safety:
                    </p>
                    <div className="space-y-2 mb-6">
                        {TOPICS.map(topic => (
                            <div key={topic.id} className="flex items-center gap-3 px-3 py-2.5 rounded-[3px]"
                                style={{ backgroundColor: `${topic.color}10`, border: `1.5px solid ${topic.color}25` }}>
                                <span>{(() => { const IC = ICON_MAP[topic.icon]; return IC ? <IC size={18} color={topic.color} strokeWidth={1.8} /> : null; })()}</span>
                                <div>
                                    <p className="text-sm font-medium" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>{topic.title}</p>
                                    <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>{topic.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button className="w-full" onClick={() => dispatch({ type: 'SET_ONBOARDING_STEP', step: 'complete' })}>
                        Start First Lesson
                    </Button>
                </div>
            </div>
        );
    }

    return null;
}
