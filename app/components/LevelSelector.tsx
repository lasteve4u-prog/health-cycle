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
              flex flex-col items-center justify-center gap-1.5 rounded-[14.88px] border-2 border-[var(--color-text-primary)] py-3 px-1
              transition-transform duration-100
              ${
                selected
                  ? "bg-[var(--color-surface-strong)] text-[var(--color-text-primary)] shadow-[rgb(16,24,32)_3px_3px_0px_0px] -translate-x-[1px] -translate-y-[1px]"
                  : "bg-[var(--color-surface-raised)] text-[var(--color-text-primary)] hover:-translate-y-[1px]"
              }
            `}
          >
            <span aria-hidden className="text-xl leading-none">
              {opt.icon}
            </span>
            <span className="text-[10px] font-bold leading-tight text-center">
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
