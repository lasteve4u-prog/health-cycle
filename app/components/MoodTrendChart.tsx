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

const INK = "#000000";
const PEACH = "#b88a8e";
const AXIS = "#727171";
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
      <div className="py-14 text-center">
        <p className="text-[18px] italic text-black">
          no data yet
        </p>
        <p className="mt-2 text-[12px] text-[var(--color-text)]">
          記録を続けると推移が見られます
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white pt-2">
      <div className="mb-5 flex items-center gap-5 px-1">
        <div className="flex items-center gap-2">
          <span aria-hidden className="block h-2 w-2 rounded-full bg-black" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-black">
            mood
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span aria-hidden className="block h-2 w-2 rounded-full" style={{ background: PEACH }} />
          <span className="text-[11px] uppercase tracking-[0.22em] text-black">
            body
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
                borderRadius: 5,
                border: "1px solid #000000",
                background: "#ffffff",
                fontSize: 12,
                fontWeight: 400,
                boxShadow: "rgba(0, 0, 0, 0.04) 0px 1px 2px 0px",
              }}
              labelStyle={{ color: INK, fontStyle: "italic" }}
              cursor={{ stroke: INK, strokeWidth: 1, strokeDasharray: "3 3" }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              name="mood"
              stroke={INK}
              strokeWidth={1.5}
              dot={{ r: 2.5, fill: INK, stroke: INK }}
              activeDot={{ r: 4.5, fill: INK, stroke: "#ffffff", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="condition"
              name="body"
              stroke={PEACH}
              strokeWidth={1.5}
              dot={{ r: 2.5, fill: PEACH, stroke: PEACH }}
              activeDot={{ r: 4.5, fill: PEACH, stroke: "#ffffff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
