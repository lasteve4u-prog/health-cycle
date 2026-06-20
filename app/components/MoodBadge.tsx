const badgeBase =
  "inline-flex items-center gap-1 rounded-[5px] border px-2 py-0.5 text-[11px] tracking-[0.02em]";

const MUTED = "border-[var(--color-border-default)] bg-white text-[var(--color-text)]";
const STRONG = "border-[var(--color-border-muted)] bg-white text-black";
const ACCENT = "border-black bg-[var(--color-surface-raised)] text-[var(--color-accent-ink)]";

const MOOD_MAP: Record<number, { icon: string; label: string; style: string }> = {
  1: { icon: "😞", label: "とても悪い", style: MUTED },
  2: { icon: "😕", label: "悪い", style: MUTED },
  3: { icon: "😐", label: "普通", style: STRONG },
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
  2: { icon: "😣", label: "辛い", style: MUTED },
  3: { icon: "😐", label: "普通", style: STRONG },
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
