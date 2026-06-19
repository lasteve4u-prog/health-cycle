const badgeBase =
  "inline-flex items-center gap-1 rounded-[4px] border px-1.5 py-0.5 text-[11px] font-medium";

const NEUTRAL = "border-[var(--color-border-default)] bg-white text-[var(--color-text-primary)]";
const SOFT = "border-[var(--color-border-subtle)] bg-[var(--color-surface-strong)]/60 text-[var(--color-text-tertiary)]";
const ACCENT = "border-[var(--color-text-secondary)]/30 bg-[var(--color-purple-soft)] text-[var(--color-text-secondary)]";

const MOOD_MAP: Record<number, { icon: string; label: string; style: string }> = {
  1: { icon: "😞", label: "とても悪い", style: NEUTRAL },
  2: { icon: "😕", label: "悪い", style: NEUTRAL },
  3: { icon: "😐", label: "普通", style: SOFT },
  4: { icon: "🙂", label: "良い", style: SOFT },
  5: { icon: "😊", label: "とても良い", style: ACCENT },
};

export function MoodBadge({ value }: { value: number }) {
  const { icon, label, style } = MOOD_MAP[value] ?? MOOD_MAP[3];
  return (
    <span className={`${badgeBase} ${style}`}>
      <span aria-hidden>{icon}</span> {label}
    </span>
  );
}

const CONDITION_MAP: Record<number, { icon: string; label: string; style: string }> = {
  1: { icon: "🤒", label: "とても辛い", style: NEUTRAL },
  2: { icon: "😣", label: "辛い", style: NEUTRAL },
  3: { icon: "😐", label: "普通", style: SOFT },
  4: { icon: "💪", label: "良い", style: SOFT },
  5: { icon: "✨", label: "絶好調", style: ACCENT },
};

export function ConditionBadge({ value }: { value: number }) {
  const { icon, label, style } = CONDITION_MAP[value] ?? CONDITION_MAP[3];
  return (
    <span className={`${badgeBase} ${style}`}>
      <span aria-hidden>{icon}</span> {label}
    </span>
  );
}
