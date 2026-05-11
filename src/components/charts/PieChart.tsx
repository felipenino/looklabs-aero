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

const COLORS = ["#2563EB", "#3AA7FF", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export function PieChart() {
  const total = distribuicaoRegional.reduce((sum, item) => sum + item.valor, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="space-y-2 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Distribuição de Cargas por Região
        </h3>
        <p className="text-xs text-gray-500">
          Concentração de operações: {distribuicaoRegional[0].valor}% em SP Capital
        </p>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <RechartsPieChart>
          <Pie
            data={distribuicaoRegional}
            dataKey="valor"
            nameKey="regiao"
            cx="45%"
            cy="50%"
            outerRadius={90}
            label={({ regiao, valor }) => `${regiao}\n${valor}%`}
            labelLine={true}
          >
            {distribuicaoRegional.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `${value}%`}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              padding: "8px 12px",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ paddingTop: "16px" }}
            formatter={(value, entry: any) => `${entry.payload.regiao} (${entry.payload.valor}%)`}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div className="p-2 bg-gray-50 rounded">
          <p className="text-gray-600">Maior concentração</p>
          <p className="font-semibold text-gray-900">{distribuicaoRegional[0].regiao}</p>
        </div>
        <div className="p-2 bg-gray-50 rounded">
          <p className="text-gray-600">Segunda maior</p>
          <p className="font-semibold text-gray-900">{distribuicaoRegional[1].regiao}</p>
        </div>
      </div>
    </div>
  );
}
