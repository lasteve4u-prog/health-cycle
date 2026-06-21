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
    <div className="grid grid-cols-5 gap-2">
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(opt.value)}
            className={`
              flex flex-col items-center justify-center gap-1.5 rounded-[var(--radius-md)] border px-1 py-3
              transition-all duration-300
              ${
                selected
                  ? "border-[var(--color-coral)] bg-[var(--color-surface-cream)] text-[var(--color-text-strong)] shadow-[var(--shadow-glow)]"
                  : "border-[var(--color-border-default)] bg-white text-[var(--color-text-soft)] hover:border-[var(--color-coral)] hover:text-[var(--color-text)]"
              }
            `}
          >
            <span aria-hidden className="text-xl leading-none">
              {opt.icon}
            </span>
            <span className="text-[11px] font-semibold leading-tight text-center">
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
