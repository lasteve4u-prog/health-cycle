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
            onClick={() => toggle(symptom)}
            className={`
              rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-150
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C3130]
              ${active
                ? "bg-[#1C3130] text-stone-50"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
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
