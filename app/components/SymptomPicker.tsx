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
              rounded-[var(--radius-pill)] border px-4 py-2 text-[13px] font-semibold transition-colors duration-300
              ${
                active
                  ? "border-[var(--color-coral)] bg-[var(--color-coral)] text-white shadow-[var(--shadow-glow)]"
                  : "border-[var(--color-border-default)] bg-white text-[var(--color-text)] hover:border-[var(--color-coral)] hover:text-[var(--color-coral)]"
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
