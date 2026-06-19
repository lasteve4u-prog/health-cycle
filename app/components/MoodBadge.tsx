const badgeBase =
  "inline-flex items-center gap-1 rounded-[4px] border px-1.5 py-0.5 text-[11px]";

const NEUTRAL = "border-[var(--color-border-default)] bg-white text-[var(--color-text)] font-normal";
const STRONG = "border-black bg-white text-black font-bold";
const INVERSE = "border-black bg-black text-white font-bold";

const MOOD_MAP: Record<number, { icon: string; label: string; style: string }> = {
  1: { icon: "😞", label: "とても悪い", style: NEUTRAL },
  2: { icon: "😕", label: "悪い", style: NEUTRAL },
  3: { icon: "😐", label: "普通", style: STRONG },
  4: { icon: "🙂", label: "良い", style: STRONG },
  5: { icon: "😊", label: "とても良い", style: INVERSE },
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
  3: { icon: "😐", label: "普通", style: STRONG },
  4: { icon: "💪", label: "良い", style: STRONG },
  5: { icon: "✨", label: "絶好調", style: INVERSE },
};

export function ConditionBadge({ value }: { value: number }) {
  const { icon, label, style } = CONDITION_MAP[value] ?? CONDITION_MAP[3];
  return (
    <span className={`${badgeBase} ${style}`}>
      <span aria-hidden>{icon}</span> {label}
    </span>
  );
}
