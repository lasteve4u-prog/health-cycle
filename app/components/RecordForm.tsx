"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { type MoodLevel, type ConditionLevel } from "@/types/database";
import { LevelSelector } from "./LevelSelector";
import { SymptomPicker } from "./SymptomPicker";

const MOOD_OPTIONS = [
  { value: 1, label: "とても悪い", icon: "😞" },
  { value: 2, label: "悪い", icon: "😕" },
  { value: 3, label: "普通", icon: "😐" },
  { value: 4, label: "良い", icon: "🙂" },
  { value: 5, label: "とても良い", icon: "😊" },
];

const CONDITION_OPTIONS = [
  { value: 1, label: "とても辛い", icon: "🤒" },
  { value: 2, label: "辛い", icon: "😣" },
  { value: 3, label: "普通", icon: "😐" },
  { value: 4, label: "良い", icon: "💪" },
  { value: 5, label: "絶好調", icon: "✨" },
];

type Status = "idle" | "loading" | "success" | "error";

const sectionLabel =
  "mb-3 block text-[11px] font-bold tracking-[0.22em] uppercase text-[var(--color-text-primary)]";

export function RecordForm() {
  const [mood, setMood] = useState<MoodLevel | null>(null);
  const [condition, setCondition] = useState<ConditionLevel | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [memo, setMemo] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood || !condition) return;

    setStatus("loading");
    setErrorMessage("");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setStatus("error");
      setErrorMessage("ログインが必要です");
      return;
    }

    const { error } = await supabase.from("records").upsert({
      user_id: user.id,
      recorded_at: new Date().toISOString().split("T")[0],
      mood,
      condition,
      symptoms,
      memo: memo.trim() || null,
    }, { onConflict: "user_id,recorded_at" });

    if (error) {
      setStatus("error");
      setErrorMessage("保存に失敗しました。もう一度お試しください。");
    } else {
      setStatus("success");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
        <div
          aria-hidden
          className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[var(--color-text-primary)] bg-[var(--color-surface-strong)] text-3xl"
        >
          ✓
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--color-text-primary)]">
            記録しました
          </h2>
          <p className="mt-1 text-sm text-[var(--color-text-primary)]/60">
            {today}
          </p>
        </div>
        <button
          onClick={() => {
            setMood(null);
            setCondition(null);
            setSymptoms([]);
            setMemo("");
            setStatus("idle");
          }}
          className="mt-2 rounded-full border-2 border-[var(--color-text-primary)] bg-[var(--color-surface-raised)] px-5 py-2 text-sm font-bold text-[var(--color-text-primary)] transition-transform duration-100 hover:-translate-y-[1px]"
        >
          続けて記録する
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="rounded-[16px] border-2 border-[var(--color-text-primary)] bg-[var(--color-surface-muted)] px-4 py-3 text-center">
        <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[var(--color-text-primary)]/70">
          Today
        </p>
        <p className="mt-1 text-base font-bold text-[var(--color-text-primary)]">
          {today}
        </p>
      </div>

      <section>
        <h2 className={sectionLabel}>気分</h2>
        <LevelSelector
          options={MOOD_OPTIONS}
          value={mood}
          onChange={(v) => setMood(v as MoodLevel)}
        />
      </section>

      <section>
        <h2 className={sectionLabel}>体調</h2>
        <LevelSelector
          options={CONDITION_OPTIONS}
          value={condition}
          onChange={(v) => setCondition(v as ConditionLevel)}
        />
      </section>

      <section>
        <h2 className={sectionLabel}>症状（複数選択可）</h2>
        <SymptomPicker selected={symptoms} onChange={setSymptoms} />
      </section>

      <section>
        <h2 className={sectionLabel}>メモ</h2>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="今日の気づきや出来事..."
          rows={3}
          className="w-full rounded-[16px] border-2 border-[var(--color-text-primary)] bg-[var(--color-surface-raised)] px-4 py-3 text-sm font-medium text-[var(--color-text-primary)] placeholder-[var(--color-text-primary)]/30 resize-none transition-shadow duration-100 focus:outline-none focus:shadow-[var(--shadow-card-strong)]"
        />
      </section>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-[12px] border-2 border-[var(--color-text-primary)] bg-[var(--color-surface-raised)] px-3 py-2 text-center text-sm font-semibold text-[var(--color-text-primary)]"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={!mood || !condition || status === "loading"}
        className="w-full rounded-[20.8px] border-2 border-[var(--color-text-primary)] bg-[var(--color-text-primary)] py-4 text-base font-bold text-[var(--color-surface-muted)] shadow-[var(--shadow-2)] transition-transform duration-100 hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[rgb(16,24,32)_2px_2px_0px_0px] disabled:cursor-not-allowed disabled:bg-[var(--color-surface-raised)] disabled:text-[var(--color-text-primary)]/30 disabled:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0"
      >
        {status === "loading" ? "保存中..." : "今日の記録を保存する"}
      </button>
    </form>
  );
}
