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
    return <div className="h-64 rounded-xl bg-stone-100 animate-pulse" />;
  }

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-stone-300 py-12 text-center">
        <p className="text-2xl mb-2">📈</p>
        <p className="text-sm text-stone-500">グラフを表示するデータがありません</p>
        <p className="text-xs text-stone-400 mt-1">記録を続けると推移が見られます</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4 mb-3 px-2">
        <div className="flex items-center gap-1.5">
          <span className="block w-3 h-0.5 rounded-full bg-[#a78bfa]" />
          <span className="text-xs text-stone-600">気分</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="block w-3 h-0.5 rounded-full bg-[#34d399]" />
          <span className="text-xs text-stone-600">体調</span>
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="#f5f5f4" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#a8a29e", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "#e7e5e4" }}
            />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tick={{ fill: "#a8a29e", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "#e7e5e4" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e7e5e4",
                fontSize: 12,
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
              labelStyle={{ color: "#57534e", fontWeight: 600 }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              name="気分"
              stroke="#a78bfa"
              strokeWidth={2}
              dot={{ r: 3, fill: "#a78bfa" }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="condition"
              name="体調"
              stroke="#34d399"
              strokeWidth={2}
              dot={{ r: 3, fill: "#34d399" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
