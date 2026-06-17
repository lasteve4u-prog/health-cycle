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
          <div key={i} className="h-24 rounded-xl bg-stone-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-stone-300 py-12 text-center">
        <p className="text-2xl mb-2">🌱</p>
        <p className="text-sm text-stone-500">まだ記録がありません</p>
        <p className="text-xs text-stone-400 mt-1">今日の体調を記録してみましょう</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {records.map((record) => (
        <div key={record.id} className="rounded-xl bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium text-stone-700">{formatDate(record.recorded_at)}</p>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <MoodBadge value={record.mood} />
            <ConditionBadge value={record.condition} />
          </div>
          {record.symptoms.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {record.symptoms.map((s) => (
                <span key={s} className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
                  {s}
                </span>
              ))}
            </div>
          )}
          {record.memo && (
            <p className="mt-2 text-xs text-stone-500 line-clamp-2">{record.memo}</p>
          )}
        </div>
      ))}
    </div>
  );
}
