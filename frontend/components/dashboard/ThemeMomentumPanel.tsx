"use client";

import clsx from "clsx";
import type { ThemeMomentum } from "@/types/stock";

type Props = {
  themes?: ThemeMomentum[];
  loading?: boolean;
  onSelect?: (theme: string) => void;
};

export default function ThemeMomentumPanel({ themes, loading, onSelect }: Props) {
  if (loading) {
    return (
      <div className="glass-panel p-4 animate-pulse text-white/40">
        테마 데이터를 불러오는 중...
      </div>
    );
  }

  if (!themes?.length) {
    return (
      <div className="glass-panel p-4 text-white/60">
        테마 정보가 없습니다. 테마 집계 파이프라인을 확인하세요.
      </div>
    );
  }

  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">테마 모멘텀</h3>
        <span className="text-xs text-white/40">점수 기준</span>
      </div>
      <div className="space-y-2">
        {themes.map((theme) => (
          <button
            key={theme.theme}
            onClick={() => onSelect?.(theme.theme)}
            className="w-full text-left border border-white/5 hover:border-white/20 rounded-xl p-3 transition"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">{theme.theme}</p>
              <span
                className={clsx(
                  "text-sm font-semibold",
                  theme.momentumScore > 0 ? "text-emerald-400" : "text-rose-400"
                )}
              >
                {theme.momentumScore.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-white/60 mt-1">
              리더 종목: {theme.leaders.join(", ")}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

