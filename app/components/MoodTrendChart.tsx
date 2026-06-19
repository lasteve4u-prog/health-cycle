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

const BLACK = "#000000";
const BLUE = "#136bea";
const AXIS = "#666666";
const GRID = "#ececec";

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
    return <div className="h-64 bg-[var(--color-surface-soft)] animate-pulse" />;
  }

  if (data.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm font-bold text-black">
          グラフを表示するデータがありません
        </p>
        <p className="mt-1 text-xs font-normal text-[var(--color-text)]">
          記録を続けると推移が見られます
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white pt-2">
      <div className="mb-4 flex items-center gap-4 px-1">
        <div className="flex items-center gap-1.5">
          <span aria-hidden className="block h-2 w-2 rounded-full bg-black" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-black">
            気分
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span aria-hidden className="block h-2 w-2 rounded-full bg-[#136bea]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-black">
            体調
          </span>
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
            <CartesianGrid stroke={GRID} strokeDasharray="0" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: AXIS, fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: GRID, strokeWidth: 1 }}
            />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tick={{ fill: AXIS, fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: GRID, strokeWidth: 1 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 4,
                border: "1px solid #000000",
                background: "#ffffff",
                fontSize: 12,
                fontWeight: 700,
                boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 6px 0px",
              }}
              labelStyle={{ color: BLACK, fontWeight: 700 }}
              cursor={{ stroke: BLACK, strokeWidth: 1, strokeDasharray: "3 3" }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              name="気分"
              stroke={BLACK}
              strokeWidth={2}
              dot={{ r: 2.5, fill: BLACK, stroke: BLACK }}
              activeDot={{ r: 4.5, fill: BLACK, stroke: "#ffffff", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="condition"
              name="体調"
              stroke={BLUE}
              strokeWidth={2}
              dot={{ r: 2.5, fill: BLUE, stroke: BLUE }}
              activeDot={{ r: 4.5, fill: BLUE, stroke: "#ffffff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
