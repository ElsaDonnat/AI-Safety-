import { Button, Card } from './shared';
import Mascot from './Mascot';
import { TOPICS } from '../data/lessons';

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
                    <Mascot mood="celebrating" size={72} />
                    <h1 className="text-2xl font-bold mt-5 mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                        Welcome to AI Safety
                    </h1>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-ink-secondary)' }}>
                        Learn about AI safety through interactive lessons.
                        Each lesson teaches you key concepts, then you practice and build mastery over time.
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
                    <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                        What You'll Learn
                    </h2>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-ink-secondary)' }}>
                        Explore key topics in AI safety:
                    </p>
                    <div className="space-y-2 mb-6">
                        {TOPICS.map(topic => (
                            <div key={topic.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                                style={{ backgroundColor: `${topic.color}10`, border: `1.5px solid ${topic.color}25` }}>
                                <span className="text-lg">{topic.icon}</span>
                                <div>
                                    <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>{topic.title}</p>
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
