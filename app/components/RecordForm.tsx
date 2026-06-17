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
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="text-5xl">🌿</div>
        <h2 className="text-xl font-semibold text-stone-800">記録しました</h2>
        <p className="text-stone-500 text-sm">{today}の体調を記録しました</p>
        <button
          onClick={() => {
            setMood(null);
            setCondition(null);
            setSymptoms([]);
            setMemo("");
            setStatus("idle");
          }}
          className="mt-2 rounded-full bg-stone-100 px-5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-200 transition-colors"
        >
          続けて記録する
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 日付 */}
      <div className="text-center">
        <p className="text-sm text-stone-400 tracking-wide uppercase">Today</p>
        <p className="text-lg font-medium text-stone-700 mt-0.5">{today}</p>
      </div>

      {/* 気分 */}
      <section>
        <h2 className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-3">
          気分
        </h2>
        <LevelSelector
          options={MOOD_OPTIONS}
          value={mood}
          onChange={(v) => setMood(v as MoodLevel)}
        />
      </section>

      {/* 体調 */}
      <section>
        <h2 className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-3">
          体調
        </h2>
        <LevelSelector
          options={CONDITION_OPTIONS}
          value={condition}
          onChange={(v) => setCondition(v as ConditionLevel)}
        />
      </section>

      {/* 症状 */}
      <section>
        <h2 className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-3">
          症状（複数選択可）
        </h2>
        <SymptomPicker selected={symptoms} onChange={setSymptoms} />
      </section>

      {/* メモ */}
      <section>
        <h2 className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-3">
          メモ
        </h2>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="今日の気づきや出来事を記録しておきましょう..."
          rows={3}
          className="w-full rounded-xl bg-stone-100 px-4 py-3 text-sm text-stone-700 placeholder-stone-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#1C3130] transition"
        />
      </section>

      {/* エラー */}
      {status === "error" && (
        <p className="text-sm text-red-600 text-center">{errorMessage}</p>
      )}

      {/* 送信 */}
      <button
        type="submit"
        disabled={!mood || !condition || status === "loading"}
        className="w-full rounded-full bg-[#1C3130] py-3.5 text-sm font-semibold text-stone-50 transition-all hover:bg-[#2a4a48] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "保存中..." : "今日の記録を保存する"}
      </button>
    </form>
  );
}
