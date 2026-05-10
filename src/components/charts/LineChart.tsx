"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { slaLast30Days } from "@/data";

export function LineChart() {
  const nutriData = slaLast30Days[0].data;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        SLA — Últimos 30 dias
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart
          data={nutriData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="data"
            tick={{ fontSize: 12 }}
            tickFormatter={(value: string) => value.split("-")[2]}
          />
          <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
            }}
            formatter={(value: number) => `${value.toFixed(1)}%`}
          />
          <Line
            type="monotone"
            dataKey="valor"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ fill: "#10B981", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
