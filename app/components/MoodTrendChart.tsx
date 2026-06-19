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

const NAVY = "#061b31";
const PURPLE = "#533afd";
const AXIS = "#50617a";
const GRID = "rgba(6, 27, 49, 0.08)";

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
      <div className="h-64 rounded-[5px] border border-[var(--color-border-subtle)] bg-[var(--color-surface-strong)]/40 animate-pulse" />
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-[5px] border border-[var(--color-border-subtle)] bg-white py-12 text-center">
        <p className="text-sm font-medium text-[var(--color-text-tertiary)]">
          グラフを表示するデータがありません
        </p>
        <p className="mt-1 text-xs font-light text-[var(--color-text-primary)]">
          記録を続けると推移が見られます
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[5px] border border-[var(--color-border-subtle)] bg-white p-4 shadow-[var(--shadow-sm)]">
      <div className="mb-4 flex items-center gap-4 px-1">
        <div className="flex items-center gap-1.5">
          <span aria-hidden className="block h-2 w-2 rounded-full bg-[#533afd]" />
          <span className="text-xs font-medium text-[var(--color-text-tertiary)]">気分</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span aria-hidden className="block h-2 w-2 rounded-full bg-[#061b31]" />
          <span className="text-xs font-medium text-[var(--color-text-tertiary)]">体調</span>
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
            <CartesianGrid stroke={GRID} strokeDasharray="0" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: AXIS, fontSize: 11, fontWeight: 400 }}
              tickLine={false}
              axisLine={{ stroke: GRID, strokeWidth: 1 }}
            />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tick={{ fill: AXIS, fontSize: 11, fontWeight: 400 }}
              tickLine={false}
              axisLine={{ stroke: GRID, strokeWidth: 1 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 5,
                border: `1px solid ${GRID}`,
                background: "#ffffff",
                fontSize: 12,
                fontWeight: 500,
                boxShadow: "0 3px 6px rgba(6, 27, 49, 0.06), 0 8px 16px rgba(6, 27, 49, 0.06)",
              }}
              labelStyle={{ color: NAVY, fontWeight: 600 }}
              cursor={{ stroke: AXIS, strokeWidth: 1, strokeDasharray: "3 3" }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              name="気分"
              stroke={PURPLE}
              strokeWidth={2}
              dot={{ r: 2.5, fill: PURPLE, stroke: PURPLE }}
              activeDot={{ r: 4.5, fill: PURPLE, stroke: "#ffffff", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="condition"
              name="体調"
              stroke={NAVY}
              strokeWidth={2}
              dot={{ r: 2.5, fill: NAVY, stroke: NAVY }}
              activeDot={{ r: 4.5, fill: NAVY, stroke: "#ffffff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
