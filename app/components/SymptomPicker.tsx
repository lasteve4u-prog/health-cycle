"use client";

import { SYMPTOMS } from "@/types/database";

interface SymptomPickerProps {
  selected: string[];
  onChange: (symptoms: string[]) => void;
}

export function SymptomPicker({ selected, onChange }: SymptomPickerProps) {
  const toggle = (symptom: string) => {
    if (selected.includes(symptom)) {
      onChange(selected.filter((s) => s !== symptom));
    } else {
      onChange([...selected, symptom]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {SYMPTOMS.map((symptom) => {
        const active = selected.includes(symptom);
        return (
          <button
            key={symptom}
            type="button"
            aria-pressed={active}
            onClick={() => toggle(symptom)}
            className={`
              rounded-full border-2 border-[var(--color-text-primary)] px-3.5 py-1.5 text-sm font-bold
              transition-transform duration-100
              ${
                active
                  ? "bg-[var(--color-text-primary)] text-[var(--color-surface-muted)] shadow-[rgb(16,24,32)_2px_2px_0px_0px] -translate-x-[1px] -translate-y-[1px]"
                  : "bg-[var(--color-surface-raised)] text-[var(--color-text-primary)] hover:-translate-y-[1px]"
              }
            `}
          >
            {symptom}
          </button>
        );
      })}
    </div>
  );
}
