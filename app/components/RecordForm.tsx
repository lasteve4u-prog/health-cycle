"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  type ConditionLevel,
  type HealthRecord,
  type MoodLevel,
} from "@/types/database";
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
  "mb-3 block text-[14px] font-bold text-[var(--color-text-strong)]";

function formatJaDate(isoDate: string) {
  return new Date(isoDate + "T00:00:00").toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

interface RecordFormProps {
  initialRecord?: HealthRecord;
}

export function RecordForm({ initialRecord }: RecordFormProps = {}) {
  const router = useRouter();
  const isEdit = Boolean(initialRecord);

  const [mood, setMood] = useState<MoodLevel | null>(
    (initialRecord?.mood as MoodLevel) ?? null,
  );
  const [condition, setCondition] = useState<ConditionLevel | null>(
    (initialRecord?.condition as ConditionLevel) ?? null,
  );
  const [symptoms, setSymptoms] = useState<string[]>(initialRecord?.symptoms ?? []);
  const [memo, setMemo] = useState(initialRecord?.memo ?? "");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const recordedAtIso =
    initialRecord?.recorded_at ?? new Date().toISOString().split("T")[0];
  const recordedAtLabel = formatJaDate(recordedAtIso);

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

    const { error } = await supabase.from("records").upsert(
      {
        user_id: user.id,
        recorded_at: recordedAtIso,
        mood,
        condition,
        symptoms,
        memo: memo.trim() || null,
      },
      { onConflict: "user_id,recorded_at" },
    );

    if (error) {
      setStatus("error");
      setErrorMessage("保存に失敗しました。もう一度お試しください。");
    } else {
      setStatus("success");
      router.refresh();
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-14 text-center">
        <div
          aria-hidden
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-coral)] text-white shadow-[var(--shadow-glow)]"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-[var(--color-text-strong)]">
            {isEdit ? "更新しました" : "保存しました"}
          </h2>
          <p className="mt-2 text-[13px] text-[var(--color-text-soft)]">
            {recordedAtLabel}
          </p>
        </div>
        <div className="mt-2 flex gap-3">
          {isEdit ? (
            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded-[var(--radius-pill)] bg-[var(--color-coral)] px-6 py-3 text-[14px] font-bold text-white shadow-[var(--shadow-glow)] transition-opacity duration-300 hover:opacity-90"
            >
              ダッシュボードへ
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMood(null);
                setCondition(null);
                setSymptoms([]);
                setMemo("");
                setStatus("idle");
              }}
              className="rounded-[var(--radius-pill)] border border-[var(--color-coral)] bg-white px-6 py-3 text-[14px] font-bold text-[var(--color-coral)] transition-colors duration-300 hover:bg-[var(--color-surface-cream)]"
            >
              続けて記録する
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="flex items-center justify-between rounded-[var(--radius-md)] bg-[var(--color-surface-cream)] px-5 py-3">
        <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--color-coral)]">
          {isEdit ? "editing" : "today"}
        </span>
        <span className="text-[14px] font-bold text-[var(--color-text-strong)]">
          {recordedAtLabel}
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
        <h2 className={sectionLabel}>症状</h2>
        <SymptomPicker selected={symptoms} onChange={setSymptoms} />
      </section>

      <section>
        <h2 className={sectionLabel}>メモ</h2>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="今日の気づきや出来事…"
          rows={3}
          className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-white px-4 py-3 text-[14px] text-[var(--color-text)] placeholder-[var(--color-text-soft)] transition-colors duration-300 focus:border-[var(--color-coral)] focus:outline-none"
        />
      </section>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-[var(--radius-md)] border border-[var(--color-error)] bg-white px-4 py-3 text-[13px] font-semibold text-[var(--color-error)]"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={!mood || !condition || status === "loading"}
        className="w-full rounded-[var(--radius-pill)] bg-[var(--color-coral)] py-4 text-[15px] font-bold text-white shadow-[var(--shadow-glow)] transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:bg-[var(--color-border-default)] disabled:text-white disabled:shadow-none"
      >
        {status === "loading"
          ? "保存中…"
          : isEdit
            ? "変更を保存する"
            : "この内容で記録する"}
      </button>
    </form>
  );
}
