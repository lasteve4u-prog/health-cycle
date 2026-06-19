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
  "mb-2.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-black";

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
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div
          aria-hidden
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-black">
            {isEdit ? "更新しました" : "記録しました"}
          </h2>
          <p className="mt-1 text-xs font-normal text-[var(--color-text)]">
            {recordedAtLabel}
          </p>
        </div>
        <div className="mt-2 flex gap-2">
          {isEdit ? (
            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded-full bg-black px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#1a1a1a]"
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
              className="rounded-full border border-black bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-black transition-colors duration-200 hover:bg-black hover:text-white"
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
      <div className="flex items-baseline justify-between border-b border-[var(--color-border-subtle)] pb-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-black">
          {isEdit ? "Editing" : "Today"}
        </span>
        <span className="text-sm font-bold text-black">
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
          className="w-full rounded-[4px] border border-[var(--color-border-default)] bg-white px-3 py-2.5 text-sm font-normal text-black placeholder-[var(--color-text)] resize-none transition-colors duration-200 focus:outline-none focus:border-black"
        />
      </section>

      {status === "error" && (
        <p
          role="alert"
          className="border border-[var(--color-error)] bg-[var(--color-error)]/5 px-3 py-2 text-xs font-bold text-[var(--color-error)]"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={!mood || !condition || status === "loading"}
        className="w-full rounded-full bg-black py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#1a1a1a] disabled:cursor-not-allowed disabled:bg-[var(--color-border-default)] disabled:text-white"
      >
        {status === "loading"
          ? "保存中…"
          : isEdit
            ? "変更を保存する"
            : "今日の記録を保存する"}
      </button>
    </form>
  );
}
