"use client";

interface Option {
  value: number;
  label: string;
  icon: string;
}

interface LevelSelectorProps {
  options: Option[];
  value: number | null;
  onChange: (value: number) => void;
}

export function LevelSelector({ options, value, onChange }: LevelSelectorProps) {
  return (
    <div className="grid grid-cols-5 gap-1.5">
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(opt.value)}
            className={`
              flex flex-col items-center justify-center gap-1 rounded-[5px] border px-1 py-2.5
              transition-colors duration-200
              ${
                selected
                  ? "border-[var(--color-text-secondary)] bg-[var(--color-purple-soft)] text-[var(--color-text-secondary)]"
                  : "border-[var(--color-border-default)] bg-white text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-strong)]/50"
              }
            `}
          >
            <span aria-hidden className="text-lg leading-none">
              {opt.icon}
            </span>
            <span
              className={`text-[10px] leading-tight text-center ${
                selected ? "font-medium" : "font-normal"
              }`}
            >
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
