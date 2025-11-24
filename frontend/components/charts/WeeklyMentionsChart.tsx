"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { WeeklyStockStat } from "@/types/stock";

type Props = {
  data?: WeeklyStockStat[];
  loading?: boolean;
};

export default function WeeklyMentionsChart({ data, loading }: Props) {
  if (loading) {
    return (
      <div className="glass-panel h-72 animate-pulse flex items-center justify-center text-white/40">
        1주일 언급량을 불러오는 중...
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="glass-panel h-72 flex items-center justify-center text-white/60">
        표시할 데이터가 없습니다.
      </div>
    );
  }

  const chartData = data.map((item) => ({
    name: item.name,
    mentions: item.weeklyMentions,
    positiveRatio: Math.round(item.positiveRatio * 100)
  }));

  return (
    <div className="glass-panel p-4 h-72">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">1주일 언급량</h3>
        <span className="text-xs text-white/40">종목별 총 건수</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 0, right: 16, left: -16, bottom: 0 }}>
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{ background: "#0f172a", borderRadius: 12, border: "none" }}
            formatter={(value, key) =>
              key === "positiveRatio" ? [`${value}%`, "긍정 비율"] : [`${value}건`, "언급량"]
            }
          />
          <Bar dataKey="mentions" fill="#3c7dff" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

