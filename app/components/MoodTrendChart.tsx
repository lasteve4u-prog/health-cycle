"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { createClient } from "@/lib/supabase/client";
import { type HealthRecord } from "@/types/database";

interface ChartPoint {
  date: string;
  mood: number;
  condition: number;
}

const INK = "#101820";
const ACCENT = "#8dc975";

function formatShortDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export function MoodTrendChart() {
  const [data, setData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    const since = new Date();
    since.setDate(since.getDate() - 30);
    const sinceStr = since.toISOString().split("T")[0];

    supabase
      .from("records")
      .select("recorded_at, mood, condition")
      .gte("recorded_at", sinceStr)
      .order("recorded_at", { ascending: true })
      .then(({ data: records }) => {
        const points = ((records as Pick<HealthRecord, "recorded_at" | "mood" | "condition">[]) ?? []).map(
          (r) => ({
            date: formatShortDate(r.recorded_at),
            mood: r.mood,
            condition: r.condition,
          })
        );
        setData(points);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-64 rounded-[20.8px] border-2 border-[var(--color-text-primary)]/20 bg-[var(--color-surface-raised)]/40 animate-pulse" />
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-[20.8px] border-2 border-dashed border-[var(--color-text-primary)] bg-[var(--color-surface-raised)] py-12 text-center">
        <p className="text-2xl" aria-hidden>
          ▱
        </p>
        <p className="mt-2 text-sm font-bold text-[var(--color-text-primary)]">
          グラフを表示するデータがありません
        </p>
        <p className="mt-1 text-xs text-[var(--color-text-primary)]/60">
          記録を続けると推移が見られます
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[20.8px] border-2 border-[var(--color-text-primary)] bg-[var(--color-surface-raised)] p-4 shadow-[var(--shadow-card-strong)]">
      <div className="mb-3 flex items-center gap-4 px-1">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="block h-3 w-3 rounded-full border-2 border-[var(--color-text-primary)] bg-[var(--color-text-primary)]"
          />
          <span className="text-xs font-bold text-[var(--color-text-primary)]">気分</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="block h-3 w-3 rounded-full border-2 border-[var(--color-text-primary)] bg-[var(--color-surface-strong)]"
          />
          <span className="text-xs font-bold text-[var(--color-text-primary)]">体調</span>
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
            <CartesianGrid stroke={INK} strokeDasharray="2 4" strokeOpacity={0.15} vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: INK, fontSize: 11, fontWeight: 600 }}
              tickLine={false}
              axisLine={{ stroke: INK, strokeWidth: 2 }}
            />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tick={{ fill: INK, fontSize: 11, fontWeight: 600 }}
              tickLine={false}
              axisLine={{ stroke: INK, strokeWidth: 2 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: `2px solid ${INK}`,
                background: "#ffffff",
                fontSize: 12,
                fontWeight: 600,
                boxShadow: `${INK} 3px 3px 0px 0px`,
              }}
              labelStyle={{ color: INK, fontWeight: 700 }}
              cursor={{ stroke: INK, strokeWidth: 1, strokeDasharray: "2 4" }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              name="気分"
              stroke={INK}
              strokeWidth={2.5}
              dot={{ r: 3, fill: INK, stroke: INK }}
              activeDot={{ r: 5, fill: INK, stroke: INK, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="condition"
              name="体調"
              stroke={ACCENT}
              strokeWidth={2.5}
              dot={{ r: 3, fill: ACCENT, stroke: INK, strokeWidth: 1 }}
              activeDot={{ r: 5, fill: ACCENT, stroke: INK, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
