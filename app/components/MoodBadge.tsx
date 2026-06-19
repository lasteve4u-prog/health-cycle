const badgeBase =
  "inline-flex items-center gap-1 rounded-full border-2 border-[var(--color-text-primary)] px-2.5 py-0.5 text-xs font-bold";

const MOOD_MAP: Record<number, { icon: string; label: string; surface: string; text: string }> = {
  1: { icon: "😞", label: "とても悪い", surface: "bg-[var(--color-surface-raised)]", text: "text-[var(--color-text-primary)]" },
  2: { icon: "😕", label: "悪い", surface: "bg-[var(--color-surface-raised)]", text: "text-[var(--color-text-primary)]" },
  3: { icon: "😐", label: "普通", surface: "bg-[var(--color-surface-muted)]", text: "text-[var(--color-text-primary)]" },
  4: { icon: "🙂", label: "良い", surface: "bg-[var(--color-surface-strong)]", text: "text-[var(--color-text-primary)]" },
  5: { icon: "😊", label: "とても良い", surface: "bg-[var(--color-text-primary)]", text: "text-[var(--color-surface-muted)]" },
};

export function MoodBadge({ value }: { value: number }) {
  const { icon, label, surface, text } = MOOD_MAP[value] ?? MOOD_MAP[3];
  return (
    <span className={`${badgeBase} ${surface} ${text}`}>
      <span aria-hidden>{icon}</span> {label}
    </span>
  );
}

const CONDITION_MAP: Record<number, { icon: string; label: string; surface: string; text: string }> = {
  1: { icon: "🤒", label: "とても辛い", surface: "bg-[var(--color-surface-raised)]", text: "text-[var(--color-text-primary)]" },
  2: { icon: "😣", label: "辛い", surface: "bg-[var(--color-surface-raised)]", text: "text-[var(--color-text-primary)]" },
  3: { icon: "😐", label: "普通", surface: "bg-[var(--color-surface-muted)]", text: "text-[var(--color-text-primary)]" },
  4: { icon: "💪", label: "良い", surface: "bg-[var(--color-surface-strong)]", text: "text-[var(--color-text-primary)]" },
  5: { icon: "✨", label: "絶好調", surface: "bg-[var(--color-text-primary)]", text: "text-[var(--color-surface-muted)]" },
};

export function ConditionBadge({ value }: { value: number }) {
  const { icon, label, surface, text } = CONDITION_MAP[value] ?? CONDITION_MAP[3];
  return (
    <span className={`${badgeBase} ${surface} ${text}`}>
      <span aria-hidden>{icon}</span> {label}
    </span>
  );
}
