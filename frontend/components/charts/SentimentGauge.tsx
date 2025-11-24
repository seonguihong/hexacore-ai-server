"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { SentimentSnapshot } from "@/types/stock";

type Props = {
  data?: SentimentSnapshot;
  loading?: boolean;
};

export default function SentimentGauge({ data, loading }: Props) {
  if (loading) {
    return (
      <div className="glass-panel h-72 animate-pulse flex items-center justify-center text-white/40">
        감정 데이터를 불러오는 중...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="glass-panel h-72 flex items-center justify-center text-white/40">
        감정 데이터 없음
      </div>
    );
  }

  const chartData = [
    { name: "긍정", value: data.positive, color: "#10b981" },
    { name: "중립", value: data.neutral, color: "#fbbf24" },
    { name: "부정", value: data.negative, color: "#ef4444" }
  ];

  const sentimentScore = Math.round((data.positive - data.negative + 1) * 50);

  return (
    <div className="glass-panel p-4 h-72 flex flex-col">
      <h3 className="text-lg font-semibold mb-4">감정 분포</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{ background: "#0f172a", borderRadius: 12, border: "none" }}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-4">
        <p className="text-4xl font-semibold">{sentimentScore}</p>
        <p className="text-sm text-white/60">Sentiment Index</p>
      </div>
    </div>
  );
}

