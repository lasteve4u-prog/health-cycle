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
              rounded-full border px-3 py-1.5 text-xs transition-colors duration-200
              ${
                active
                  ? "border-black bg-black text-white font-bold"
                  : "border-[var(--color-border-default)] bg-white text-black hover:border-black font-normal"
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
