"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { slaLast30Days } from "@/data";

export function LineChart() {
  // Transformar dados para mostrar múltiplos clientes
  const transformedData = slaLast30Days[0].data.map((item, idx) => {
    const dataObj: any = {
      data: item.data.split("-")[2], // Apenas o dia
      dataFull: item.data,
    };

    // Adicionar valor de cada cliente
    slaLast30Days.forEach((cliente, clienteIdx) => {
      dataObj[`cliente${clienteIdx}`] = cliente.data[idx].valor;
    });

    return dataObj;
  });

  const colors = ["#10B981", "#F59E0B", "#3AA7FF"]; // Verde, Amarelo, Azul
  const clienteNames = ["NutriPlus", "FarmaVida", "Magazine"];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="space-y-2 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          SLA por Cliente — Últimos 30 dias
        </h3>
        <p className="text-xs text-gray-500">
          Comparativo de desempenho entre clientes com variações diárias realistas
        </p>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <RechartsLineChart
          data={transformedData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="data"
            tick={{ fontSize: 11 }}
            stroke="#9CA3AF"
          />
          <YAxis
            domain={[75, 100]}
            tick={{ fontSize: 11 }}
            stroke="#9CA3AF"
            label={{ value: "SLA %", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              padding: "8px 12px",
            }}
            formatter={(value: number) => `${value.toFixed(1)}%`}
            labelFormatter={(label) => `Dia ${label}`}
          />
          <Legend
            wrapperStyle={{ paddingTop: "16px" }}
            formatter={(_, entry: any) => clienteNames[entry.dataKey.replace("cliente", "")]}
          />
          {[0, 1, 2].map((idx) => (
            <Line
              key={`cliente${idx}`}
              type="monotone"
              dataKey={`cliente${idx}`}
              stroke={colors[idx]}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
              name={`Cliente ${idx}`}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
