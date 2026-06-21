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

const CORAL = "#ff8c94";
const CORAL_SOFT = "#ffb3b8";
const AXIS = "#b08a8a";
const GRID = "#fff0eb";

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
    return <div className="h-56 animate-pulse rounded-[var(--radius-md)] bg-[var(--color-surface-cream)]" />;
  }

  if (data.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-[16px] font-bold text-[var(--color-text-strong)]">
          まだデータがありません
        </p>
        <p className="mt-2 text-[13px] text-[var(--color-text-soft)]">
          記録を続けると推移が見られます
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <span aria-hidden className="block h-2.5 w-2.5 rounded-full" style={{ background: CORAL }} />
          <span className="text-[13px] font-semibold text-[var(--color-text)]">気分</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span aria-hidden className="block h-2.5 w-2.5 rounded-full" style={{ background: CORAL_SOFT }} />
          <span className="text-[13px] font-semibold text-[var(--color-text)]">体調</span>
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
            <CartesianGrid stroke={GRID} strokeDasharray="0" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: AXIS, fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: GRID, strokeWidth: 1 }}
            />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tick={{ fill: AXIS, fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: GRID, strokeWidth: 1 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: "1px solid #ffe0d8",
                background: "#ffffff",
                fontSize: 13,
                fontWeight: 600,
                boxShadow: "rgba(255, 140, 148, 0.2) 0px 4px 16px 0px",
              }}
              labelStyle={{ color: "#5a3a3a", fontWeight: 700 }}
              cursor={{ stroke: CORAL, strokeWidth: 1, strokeDasharray: "3 3" }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              name="気分"
              stroke={CORAL}
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: CORAL, stroke: CORAL }}
              activeDot={{ r: 5.5, fill: CORAL, stroke: "#ffffff", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="condition"
              name="体調"
              stroke={CORAL_SOFT}
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: CORAL_SOFT, stroke: CORAL_SOFT }}
              activeDot={{ r: 5.5, fill: CORAL_SOFT, stroke: "#ffffff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
