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
      <ul className="divide-y divide-[var(--color-border-subtle)]">
        {[...Array(3)].map((_, i) => (
          <li key={i} className="h-24 animate-pulse bg-[var(--color-surface-soft)]" />
        ))}
      </ul>
    );
  }

  if (records.length === 0) {
    return (
      <div className="px-5 py-12 text-center">
        <p className="text-[16px] font-bold text-[var(--color-text-strong)]">
          まだ記録がありません
        </p>
        <p className="mt-2 text-[13px] text-[var(--color-text-soft)]">
          今日の体調を記録してみましょう
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-[var(--color-border-subtle)]">
      {records.map((record) => (
        <li key={record.id}>
          <Link
            href={`/record/${record.id}`}
            aria-label={`${formatDate(record.recorded_at)}の記録を編集`}
            className="group block px-5 py-4 transition-colors duration-300 hover:bg-[var(--color-surface-soft)]"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-[15px] font-bold text-[var(--color-text-strong)]">
                {formatDate(record.recorded_at)}
              </p>
              <span
                aria-hidden
                className="text-[12px] font-semibold text-[var(--color-coral)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                編集 →
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <MoodBadge value={record.mood} />
              <ConditionBadge value={record.condition} />
            </div>
            {record.symptoms.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {record.symptoms.map((s) => (
                  <span
                    key={s}
                    className="rounded-[var(--radius-pill)] border border-[var(--color-border-default)] bg-[var(--color-surface-cream)] px-2.5 py-0.5 text-[12px] text-[var(--color-text)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
            {record.memo && (
              <p className="mt-2 line-clamp-2 text-[13px] leading-[1.6] text-[var(--color-text)]">
                {record.memo}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
