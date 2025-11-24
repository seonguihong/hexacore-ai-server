"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeeklyStockStats } from "@/lib/api";
import MetricCard from "../cards/MetricCard";
import WeeklyMentionsChart from "../charts/WeeklyMentionsChart";
import WeeklyMentionsList from "./WeeklyMentionsList";

export default function DashboardPage() {
  const weeklyQuery = useQuery({
    queryKey: ["weeklyStats"],
    queryFn: fetchWeeklyStockStats
  });

  const weeklyMetrics = useMemo(() => {
    if (!weeklyQuery.data?.length) {
      return {
        totalMentions: 0,
        topKeyword: "--",
        topMentions: "--",
        topPositive: "--%"
      };
    }

    const totalMentions = weeklyQuery.data.reduce(
      (sum, item) => sum + item.weeklyMentions,
      0
    );
    const sorted = [...weeklyQuery.data].sort(
      (a, b) => b.weeklyMentions - a.weeklyMentions
    );
    const top = sorted[0];

    return {
      totalMentions,
      topKeyword: `${top.name} (${top.code})`,
      topMentions: `${top.weeklyMentions.toLocaleString()}건`,
      topPositive: `${Math.round(top.positiveRatio * 100)}%`
    };
  }, [weeklyQuery.data]);

  return (
    <main className="px-6 py-8 max-w-5xl mx-auto space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-200">HexaCore</p>
        <h1 className="text-3xl font-bold">1주일 주식 언급량 인사이트</h1>
        <p className="text-white/60 text-sm">
          최근 7일간 커뮤니티 언급량과 긍정 비율을 간단히 확인하세요.
        </p>
      </header>

      <section className="grid-auto-fit">
        <MetricCard
          title="최근 1주 언급량"
          value={`${weeklyMetrics.totalMentions.toLocaleString()}건`}
        />
        <MetricCard title="최대 언급 키워드" value={weeklyMetrics.topKeyword} />
        <MetricCard
          title="최대 언급 건수"
          value={weeklyMetrics.topMentions}
          delta={`긍정 ${weeklyMetrics.topPositive}`}
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyMentionsChart data={weeklyQuery.data} loading={weeklyQuery.isLoading} />
        <WeeklyMentionsList data={weeklyQuery.data} loading={weeklyQuery.isLoading} />
      </section>
    </main>
  );
}

