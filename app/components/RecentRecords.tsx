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
      <div className="space-y-0 divide-y divide-[var(--color-border-subtle)]">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 bg-[var(--color-surface-soft)] animate-pulse" />
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="py-14 text-center">
        <p className="text-[18px] italic text-black">
          no entries yet
        </p>
        <p className="mt-2 text-[12px] text-[var(--color-text)]">
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
            className="group block py-4 transition-colors duration-500 hover:bg-[var(--color-surface-soft)] -mx-2 px-2"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-[15px] text-black tracking-[0.02em]">
                {formatDate(record.recorded_at)}
              </p>
              <span
                aria-hidden
                className="text-[11px] italic text-[var(--color-accent-ink)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                edit →
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
                    className="rounded-[5px] border border-[var(--color-border-subtle)] bg-white px-2 py-0.5 text-[11px] text-[var(--color-text)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
            {record.memo && (
              <p className="mt-2 text-[12px] leading-[1.7] italic text-[var(--color-text)] line-clamp-2">
                {record.memo}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
