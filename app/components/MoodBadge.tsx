const MOOD_MAP: Record<number, { icon: string; label: string; color: string }> = {
  1: { icon: "😞", label: "とても悪い", color: "bg-red-50 text-red-700" },
  2: { icon: "😕", label: "悪い", color: "bg-orange-50 text-orange-700" },
  3: { icon: "😐", label: "普通", color: "bg-stone-100 text-stone-600" },
  4: { icon: "🙂", label: "良い", color: "bg-emerald-50 text-emerald-700" },
  5: { icon: "😊", label: "とても良い", color: "bg-emerald-100 text-emerald-800" },
};

export function MoodBadge({ value }: { value: number }) {
  const { icon, label, color } = MOOD_MAP[value] ?? MOOD_MAP[3];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
      {icon} {label}
    </span>
  );
}

const CONDITION_MAP: Record<number, { icon: string; label: string; color: string }> = {
  1: { icon: "🤒", label: "とても辛い", color: "bg-red-50 text-red-700" },
  2: { icon: "😣", label: "辛い", color: "bg-orange-50 text-orange-700" },
  3: { icon: "😐", label: "普通", color: "bg-stone-100 text-stone-600" },
  4: { icon: "💪", label: "良い", color: "bg-emerald-50 text-emerald-700" },
  5: { icon: "✨", label: "絶好調", color: "bg-emerald-100 text-emerald-800" },
};

export function ConditionBadge({ value }: { value: number }) {
  const { icon, label, color } = CONDITION_MAP[value] ?? CONDITION_MAP[3];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
      {icon} {label}
    </span>
  );
}
