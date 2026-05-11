"use client";

import { clientes, getCargasByCliente, slaLast30Days } from "@/data";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ClientesPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Painel de Clientes</h1>
        <p className="text-slate-600 mt-2">Visão por cliente</p>
      </div>

      {/* Description */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Performance e histórico de cada cliente</span>. Cards com segmento, volume/mês, KPIs (SLA %, entregas no prazo, faturamento, ocorrências) e gráfico de SLA últimos 30 dias. Permite monitorar saúde de relacionamento, identificar clientes em risco e comunicar valor agregado.
        </p>
      </div>

      {/* Cards por Cliente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clientes.map((cliente) => {
          const cargas = getCargasByCliente(cliente.id);
          const slaData = slaLast30Days.find((s) => s.cliente === cliente.nome);
          const latestSLA = slaData?.data[slaData.data.length - 1]?.valor ?? 0;

          return (
            <div key={cliente.id} className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{cliente.nome}</h3>
                  <p className="text-sm text-slate-600">{cliente.segmento}</p>
                </div>
                <div
                  className="w-12 h-12 rounded-full opacity-20"
                  style={{ backgroundColor: cliente.color }}
                ></div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-3 gap-3 bg-slate-50 rounded-lg p-3">
                <div>
                  <p className="text-xs text-slate-600">SLA</p>
                  <p className="text-lg font-bold text-slate-900">{latestSLA.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Cargas/mês</p>
                  <p className="text-lg font-bold text-slate-900">{cargas.length}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Faturamento</p>
                  <p className="text-lg font-bold text-slate-900">
                    R$ {(cargas.reduce((sum, c) => sum + c.valor, 0) / 1000).toFixed(0)}k
                  </p>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={slaData?.data.slice(-7) ?? []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="data" tick={{ fontSize: 10 }} />
                    <YAxis domain={[80, 100]} tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.5rem",
                        fontSize: "12px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="valor"
                      stroke={cliente.color}
                      strokeWidth={2}
                      dot={false}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
