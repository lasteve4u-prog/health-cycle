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
              flex flex-col items-center justify-center gap-1.5 rounded-[5px] border px-1 py-3
              transition-colors duration-500
              ${
                selected
                  ? "border-black bg-[var(--color-surface-raised)] text-[var(--color-accent-ink)]"
                  : "border-[var(--color-border-default)] bg-white text-[var(--color-text)] hover:border-black hover:text-black"
              }
            `}
          >
            <span aria-hidden className="text-lg leading-none">
              {opt.icon}
            </span>
            <span className="text-[10px] leading-tight text-center tracking-[0.04em]">
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
