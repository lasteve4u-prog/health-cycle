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
  "mb-2 block text-xs font-medium text-[var(--color-text-tertiary)]";

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
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
        <div
          aria-hidden
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-purple-soft)] text-[var(--color-text-secondary)]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-text-tertiary)]">
            記録しました
          </h2>
          <p className="mt-1 text-xs font-light text-[var(--color-text-primary)]">
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
          className="mt-1 rounded-[5px] border border-[var(--color-border-default)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-text-tertiary)] transition-colors duration-200 hover:bg-[var(--color-surface-strong)]"
        >
          続けて記録する
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-baseline justify-between border-b border-[var(--color-border-subtle)] pb-3">
        <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-text-secondary)]">
          Today
        </span>
        <span className="text-sm font-medium text-[var(--color-text-tertiary)]">
          {today}
        </span>
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
          placeholder="今日の気づきや出来事…"
          rows={3}
          className="w-full rounded-[5px] border border-[var(--color-border-default)] bg-white px-3 py-2.5 text-sm font-normal text-[var(--color-text-tertiary)] placeholder-[var(--color-text-primary)]/50 resize-none transition-shadow duration-200 focus:outline-none focus:border-[var(--color-text-secondary)] focus:shadow-[var(--shadow-focus)]"
        />
      </section>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-[5px] border border-[var(--color-error)]/30 bg-[var(--color-error)]/5 px-3 py-2 text-xs font-medium text-[var(--color-error)]"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={!mood || !condition || status === "loading"}
        className="w-full rounded-[5px] bg-[var(--color-text-secondary)] py-2.5 text-sm font-medium text-[var(--color-text-inverse)] shadow-[var(--shadow-sm)] transition-colors duration-200 hover:bg-[var(--color-purple-hover)] disabled:cursor-not-allowed disabled:bg-[var(--color-text-secondary)]/40"
      >
        {status === "loading" ? "保存中…" : "今日の記録を保存する"}
      </button>
    </form>
  );
}
