const TONES = {
  gold: 'var(--color-amber-300)',
  violet: 'var(--color-violet-500)',
};

/**
 * XPBar
 * Simple progress bar for XP/challenge progress. Was missing entirely —
 * built from its two call sites: components/contributor/ChallengeCard.jsx
 * (`<XPBar progress={n} total={n} tone="violet"|"gold" />`) and
 * pages/contributor/Rewards.jsx (same shape).
 */
export default function XPBar({ progress = 0, total = 1, tone = 'violet' }) {
  const percent = total > 0 ? Math.min(100, Math.max(0, (progress / total) * 100)) : 0;
  const fill = TONES[tone] ?? TONES.violet;

  return (
    <div
      className="h-2 rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={total}
      style={{ background: 'var(--color-surface-active)' }}
    >
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${percent}%`, background: fill }}
      />
    </div>
  );
}
