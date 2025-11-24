"use client";

import clsx from "clsx";
import type { TrendingStock } from "@/types/stock";

type Props = {
  stocks?: TrendingStock[];
  selectedCode?: string;
  onSelect: (code: string) => void;
  loading?: boolean;
};

export default function StockTable({ stocks, selectedCode, onSelect, loading }: Props) {
  if (loading) {
    return (
      <div className="glass-panel p-4 animate-pulse text-white/40">
        실시간 인기 종목을 불러오는 중...
      </div>
    );
  }

  if (!stocks?.length) {
    return (
      <div className="glass-panel p-4 text-white/60">
        노출할 종목이 없습니다. 백엔드 크롤러를 먼저 실행해주세요.
      </div>
    );
  }

  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">실시간 인기 종목 TOP 10</h3>
        <span className="text-xs text-white/40">언급량 기준</span>
      </div>
      <div className="space-y-2">
        {stocks.map((stock) => (
          <button
            key={stock.code}
            onClick={() => onSelect(stock.code)}
            className={clsx(
              "w-full p-3 rounded-xl flex items-center justify-between transition border border-transparent",
              selectedCode === stock.code
                ? "bg-brand-500/20 border-brand-400/40"
                : "hover:bg-white/5"
            )}
          >
            <div>
              <p className="font-medium">
                {stock.name} <span className="text-white/50">({stock.code})</span>
              </p>
              <p className="text-xs text-white/50">
                마지막 갱신 {new Date(stock.lastUpdated).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{stock.mentionDelta.toLocaleString()}건</p>
              <p
                className={clsx("text-sm", {
                  "text-emerald-400": (stock.changeRate ?? 0) >= 0,
                  "text-rose-400": (stock.changeRate ?? 0) < 0
                })}
              >
                {(stock.changeRate ?? 0).toFixed(2)}%
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

