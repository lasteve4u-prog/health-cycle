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
            onClick={() => onChange(opt.value)}
            className={`
              flex flex-col items-center gap-1.5 rounded-xl py-3 px-1 transition-all duration-150
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C3130]
              ${selected
                ? "bg-[#1C3130] text-stone-50 shadow-md scale-105"
                : "bg-stone-100 text-stone-500 hover:bg-stone-200"
              }
            `}
          >
            <span className="text-xl leading-none">{opt.icon}</span>
            <span className="text-[10px] font-medium leading-tight text-center">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
