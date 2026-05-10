"use client";

import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: number;
  icon: ReactNode;
  color: "blue" | "green" | "red" | "yellow" | "purple";
  subtitle?: string;
}

const colorMap = {
  blue: "bg-white border-gray-200",
  green: "bg-white border-gray-200",
  red: "bg-white border-gray-200",
  yellow: "bg-white border-gray-200",
  purple: "bg-white border-gray-200",
};

const iconColorMap = {
  blue: "text-blue-600",
  green: "text-green-600",
  red: "text-red-600",
  yellow: "text-yellow-600",
  purple: "text-purple-600",
};

export function KPICard({
  title,
  value,
  unit,
  trend,
  icon,
  color,
  subtitle,
}: KPICardProps) {
  return (
    <div className={`rounded-lg border ${colorMap[color]} p-6`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-slate-900">{value}</span>
            {unit && <span className="text-sm text-slate-500">{unit}</span>}
          </div>
          {subtitle && <p className="text-xs text-slate-500 mt-2">{subtitle}</p>}
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-3">
              {trend > 0 ? (
                <>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    ↑ {trend}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-600">
                    ↓ {Math.abs(trend)}%
                  </span>
                </>
              )}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconColorMap[color]} opacity-20 bg-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
