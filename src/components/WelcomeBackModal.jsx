import Mascot from './Mascot';
import { Button } from './shared';

function getMessage(days) {
  if (days >= 7) return "It's been a while! The world of AI safety keeps evolving — let's catch up together.";
  if (days >= 3) return "Welcome back! AI doesn't take days off, and neither should our understanding of it.";
  return "Great to see you again! Every session brings you closer to understanding AI safety.";
}

export default function WelcomeBackModal({ daysAway, onDismiss }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-5"
      style={{ backgroundColor: 'rgba(var(--color-ink-rgb), 0.4)', backdropFilter: 'blur(4px)' }}
      onClick={onDismiss}
    >
      <div
        className="w-full max-w-sm rounded-[4px] p-6 text-center animate-welcome-back"
        style={{ backgroundColor: 'var(--color-card)', boxShadow: 'var(--shadow-elevated)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center mb-3">
          <Mascot mood="celebrating" size={80} />
        </div>
        <h2
          className="text-xl font-bold mb-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
        >
          Welcome back!
        </h2>
        <p
          className="text-sm mb-5"
          style={{ color: 'var(--color-ink-secondary)', lineHeight: 1.5 }}
        >
          {getMessage(daysAway)}
        </p>
        <Button variant="primary" onClick={onDismiss}>
          Let's go! →
        </Button>
      </div>
    </div>
  );
}
