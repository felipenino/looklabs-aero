"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { faturamentoLast6Months } from "@/data";

const data = faturamentoLast6Months.map((item) => ({
  nome: item.cliente.split(" ")[0],
  cliente: item.cliente,
  valor: item.valor / 1000,
  valueFull: item.valor,
}));

// Cores variadas por cliente
const colors = ["#3AA7FF", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export function BarChart() {
  const totalFaturamento = data.reduce((sum, item) => sum + item.valor, 0);
  const mediaFaturamento = (totalFaturamento / data.length).toFixed(0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="space-y-2 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Faturamento por Cliente — Últimos 6 meses
        </h3>
        <div className="flex gap-4 text-sm">
          <div>
            <p className="text-gray-500">Total</p>
            <p className="text-lg font-semibold text-gray-900">R$ {(totalFaturamento * 1000).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
          </div>
          <div>
            <p className="text-gray-500">Média</p>
            <p className="text-lg font-semibold text-gray-900">R$ {(parseFloat(mediaFaturamento) * 1000).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <RechartsBarChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 45 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="nome"
            tick={{ fontSize: 11 }}
            stroke="#9CA3AF"
            angle={-15}
            textAnchor="end"
            height={80}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            stroke="#9CA3AF"
            label={{ value: "R$ mil", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              padding: "8px 12px",
            }}
            formatter={(value: number, name, props) => [
              `R$ ${(value * 1000).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
              props.payload.cliente,
            ]}
            labelFormatter={(label) => `Cliente: ${label}`}
          />
          <Bar
            dataKey="valor"
            radius={[8, 8, 0, 0]}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
