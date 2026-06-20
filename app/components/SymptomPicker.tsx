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
              rounded-full border px-3.5 py-1.5 text-[12px] tracking-[0.02em] transition-colors duration-500
              ${
                active
                  ? "border-black bg-[var(--color-surface-raised)] text-[var(--color-accent-ink)]"
                  : "border-[var(--color-border-default)] bg-white text-[var(--color-text)] hover:border-black hover:text-black"
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
