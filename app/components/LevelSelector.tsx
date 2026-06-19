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
              flex flex-col items-center justify-center gap-1 rounded-[4px] border px-1 py-2.5
              transition-colors duration-200
              ${
                selected
                  ? "border-black bg-black text-white"
                  : "border-[var(--color-border-default)] bg-white text-black hover:border-black"
              }
            `}
          >
            <span aria-hidden className="text-lg leading-none">
              {opt.icon}
            </span>
            <span className="text-[10px] leading-tight text-center font-normal">
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
