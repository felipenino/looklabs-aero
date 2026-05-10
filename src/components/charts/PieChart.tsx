"use client";

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { distribuicaoRegional } from "@/data";

const COLORS = ["#0A2540", "#3AA7FF", "#10B981", "#F59E0B", "#EF4444"];

export function PieChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Distribuição por Região
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={distribuicaoRegional}
            dataKey="valor"
            nameKey="regiao"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ regiao, valor }) => `${regiao}: ${valor}%`}
          >
            {distribuicaoRegional.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value}%`} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
