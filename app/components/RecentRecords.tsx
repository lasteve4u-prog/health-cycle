"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { type HealthRecord } from "@/types/database";
import { MoodBadge, ConditionBadge } from "./MoodBadge";

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("ja-JP", { month: "long", day: "numeric", weekday: "short" });
}

export function RecentRecords() {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("records")
      .select("*")
      .order("recorded_at", { ascending: false })
      .limit(10)
      .then(({ data }) => {
        setRecords((data as HealthRecord[]) ?? []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-[16px] border-2 border-[var(--color-text-primary)]/20 bg-[var(--color-surface-raised)]/40 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="rounded-[20.8px] border-2 border-dashed border-[var(--color-text-primary)] bg-[var(--color-surface-raised)] py-12 text-center">
        <p className="text-2xl" aria-hidden>
          ✦
        </p>
        <p className="mt-2 text-sm font-bold text-[var(--color-text-primary)]">
          まだ記録がありません
        </p>
        <p className="mt-1 text-xs text-[var(--color-text-primary)]/60">
          今日の体調を記録してみましょう
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {records.map((record) => (
        <li
          key={record.id}
          className="rounded-[16px] border-2 border-[var(--color-text-primary)] bg-[var(--color-surface-raised)] p-4 shadow-[var(--shadow-card-strong)]"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-extrabold text-[var(--color-text-primary)]">
              {formatDate(record.recorded_at)}
            </p>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <MoodBadge value={record.mood} />
            <ConditionBadge value={record.condition} />
          </div>
          {record.symptoms.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {record.symptoms.map((s) => (
                <span
                  key={s}
                  className="rounded-full border-2 border-[var(--color-text-primary)] bg-[var(--color-surface-muted)] px-2 py-0.5 text-xs font-bold text-[var(--color-text-primary)]"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
          {record.memo && (
            <p className="mt-2.5 border-t-2 border-dashed border-[var(--color-text-primary)]/15 pt-2 text-xs text-[var(--color-text-primary)]/70 line-clamp-2">
              {record.memo}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
