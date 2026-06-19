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
    <div className="flex flex-wrap gap-1.5">
      {SYMPTOMS.map((symptom) => {
        const active = selected.includes(symptom);
        return (
          <button
            key={symptom}
            type="button"
            aria-pressed={active}
            onClick={() => toggle(symptom)}
            className={`
              rounded-[5px] border px-2.5 py-1 text-xs transition-colors duration-200
              ${
                active
                  ? "border-[var(--color-text-secondary)] bg-[var(--color-purple-soft)] text-[var(--color-text-secondary)] font-medium"
                  : "border-[var(--color-border-default)] bg-white text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-strong)]/50"
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
