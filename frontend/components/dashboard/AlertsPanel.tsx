"use client";

import type { AlertItem } from "@/types/stock";
import dayjs from "dayjs";

type Props = {
  alerts?: AlertItem[];
  loading?: boolean;
};

const alertLabels = {
  spike: "언급 급증",
  sentiment: "감정 급변",
  theme: "테마 모멘텀"
} as const;

export default function AlertsPanel({ alerts, loading }: Props) {
  if (loading) {
    return (
      <div className="glass-panel p-4 animate-pulse text-white/40">
        알림 데이터를 가져오는 중...
      </div>
    );
  }

  if (!alerts?.length) {
    return (
      <div className="glass-panel p-4 text-white/60">현재 활성화된 알림이 없습니다.</div>
    );
  }

  return (
    <div className="glass-panel p-4 h-full">
      <h3 className="text-lg font-semibold mb-3">실시간 알림</h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="border border-white/10 rounded-xl p-3 bg-white/5"
          >
            <div className="flex items-center justify-between text-sm text-white/60">
              <span>{alertLabels[alert.type]}</span>
              <time>{dayjs(alert.detectedAt).format("HH:mm:ss")}</time>
            </div>
            <p className="font-medium mt-1">
              {alert.name} ({alert.code})
            </p>
            <p className="text-sm text-white/70 mt-1">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

