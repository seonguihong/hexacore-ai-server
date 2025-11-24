"use client";

import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  title: string;
  value: string;
  delta?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "flat";
};

export default function MetricCard({
  title,
  value,
  delta,
  icon,
  trend = "flat"
}: Props) {
  return (
    <article className="glass-panel p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm text-white/60">
        <span>{title}</span>
        {icon}
      </div>
      <div className="text-3xl font-semibold">{value}</div>
      {delta && (
        <span
          className={clsx("text-sm", {
            "text-emerald-400": trend === "up",
            "text-rose-400": trend === "down",
            "text-white/60": trend === "flat"
          })}
        >
          {delta}
        </span>
      )}
    </article>
  );
}

