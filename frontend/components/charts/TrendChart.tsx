"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MentionPoint } from "@/types/stock";
import dayjs from "dayjs";

type Props = {
  data?: MentionPoint[];
  loading?: boolean;
};

export default function TrendChart({ data, loading }: Props) {
  if (loading) {
    return (
      <div className="glass-panel h-72 animate-pulse flex items-center justify-center text-white/40">
        언급량 데이터를 불러오는 중...
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="glass-panel h-72 flex items-center justify-center text-white/40">
        표시할 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className="glass-panel p-4 h-72">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">언급량 추이</h3>
        <span className="text-xs text-white/50">
          {dayjs(data[data.length - 1].timestamp).format("MM/DD HH:mm")} 기준
        </span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="mentionsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3c7dff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3c7dff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => dayjs(value).format("HH:mm")}
            stroke="#94a3b8"
          />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{ background: "#0f172a", borderRadius: 12, border: "none" }}
            labelFormatter={(value) => dayjs(value).format("MM/DD HH:mm")}
          />
          <Area
            type="monotone"
            dataKey="mentions"
            stroke="#3c7dff"
            fillOpacity={1}
            fill="url(#mentionsGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

