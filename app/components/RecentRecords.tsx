"use client";

import Link from "next/link";
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
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-[5px] border border-[var(--color-border-subtle)] bg-[var(--color-surface-strong)]/40 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="rounded-[5px] border border-[var(--color-border-subtle)] bg-white py-12 text-center">
        <p className="text-sm font-medium text-[var(--color-text-tertiary)]">
          まだ記録がありません
        </p>
        <p className="mt-1 text-xs font-light text-[var(--color-text-primary)]">
          今日の体調を記録してみましょう
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {records.map((record) => (
        <li key={record.id}>
          <Link
            href={`/record/${record.id}`}
            aria-label={`${formatDate(record.recorded_at)}の記録を編集`}
            className="group block rounded-[5px] border border-[var(--color-border-subtle)] bg-white p-4 transition-all duration-200 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-sm)]"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-[var(--color-text-tertiary)]">
                {formatDate(record.recorded_at)}
              </p>
              <span
                aria-hidden
                className="text-xs font-medium text-[var(--color-text-secondary)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                編集 →
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <MoodBadge value={record.mood} />
              <ConditionBadge value={record.condition} />
            </div>
            {record.symptoms.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {record.symptoms.map((s) => (
                  <span
                    key={s}
                    className="rounded-[4px] border border-[var(--color-border-subtle)] bg-[var(--color-surface-strong)]/60 px-1.5 py-0.5 text-[11px] font-medium text-[var(--color-text-tertiary)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
            {record.memo && (
              <p className="mt-2 border-t border-[var(--color-border-subtle)] pt-2 text-xs font-light leading-relaxed text-[var(--color-text-primary)] line-clamp-2">
                {record.memo}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
