"use client";

import type { WeeklyStockStat } from "@/types/stock";

type Props = {
  data?: WeeklyStockStat[];
  loading?: boolean;
};

export default function WeeklyMentionsList({ data, loading }: Props) {
  if (loading) {
    return (
      <div className="glass-panel p-4 animate-pulse text-white/40">데이터 로딩 중...</div>
    );
  }

  if (!data?.length) {
    return <div className="glass-panel p-4 text-white/60">데이터가 없습니다.</div>;
  }

  return (
    <div className="glass-panel p-4 space-y-3">
      <h3 className="text-lg font-semibold">종목별 1주일 언급량</h3>
      <div className="space-y-2">
        {data.map((item) => (
          <div
            key={item.code}
            className="border border-white/5 rounded-xl p-3 flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">
                {item.name} <span className="text-white/50">({item.code})</span>
              </p>
              <p className="text-xs text-white/50">
                최고 언급 시점: {new Date(item.peakTimestamp).toLocaleDateString("ko-KR")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-semibold">{item.weeklyMentions.toLocaleString()}건</p>
              <p className="text-sm text-emerald-400">
                긍정 {Math.round(item.positiveRatio * 100)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

