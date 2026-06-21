const badgeBase =
  "inline-flex items-center gap-1 rounded-[var(--radius-pill)] border px-2.5 py-0.5 text-[12px] font-semibold";

const MUTED = "border-[var(--color-border-subtle)] bg-white text-[var(--color-text-soft)]";
const DEFAULT = "border-[var(--color-border-default)] bg-white text-[var(--color-text)]";
const STRONG = "border-[var(--color-border-default)] bg-[var(--color-surface-cream)] text-[var(--color-text-strong)]";
const ACCENT = "border-[var(--color-coral)] bg-[var(--color-coral)] text-white";

const MOOD_MAP: Record<number, { icon: string; label: string; style: string }> = {
  1: { icon: "😞", label: "とても悪い", style: MUTED },
  2: { icon: "😕", label: "悪い", style: DEFAULT },
  3: { icon: "😐", label: "普通", style: DEFAULT },
  4: { icon: "🙂", label: "良い", style: STRONG },
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
  1: { icon: "🤒", label: "とても辛い", style: MUTED },
  2: { icon: "😣", label: "辛い", style: DEFAULT },
  3: { icon: "😐", label: "普通", style: DEFAULT },
  4: { icon: "💪", label: "良い", style: STRONG },
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
