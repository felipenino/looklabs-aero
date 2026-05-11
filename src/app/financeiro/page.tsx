"use client";

import { faturamentoLast6Months, contasAReceber, topRotasMaisCaras } from "@/data";
import { DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function FinanceiroPage() {
  const handleExportar = () => {
    toast("Exportando...", {
      description: "Funcionalidade em desenvolvimento",
      duration: 3000,
    });
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Financeiro</h1>
          <p className="text-slate-600 mt-2">Análise de faturamento, contas a receber e rotas</p>
        </div>
        <button
          onClick={handleExportar}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Exportar
        </button>
      </div>

      {/* Description */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Dashboard financeiro completo</span>: faturamento por cliente (ranking 6 meses), contas a receber (CTes em aberto, vencimento, atrasos), custo por viagem (top 7 rotas mais caras/lucrativas com km, custo médio, margem). Identifica clientes e rotas mais lucrativos, monitora saúde de caixa e otimiza precificação.
        </p>
      </div>

      {/* Faturamento por Cliente */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Faturamento por Cliente (últimos 6 meses)
        </h3>
        <div className="space-y-3">
          {faturamentoLast6Months.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <p className="font-medium text-slate-900">{item.cliente}</p>
                  <p className="font-bold text-slate-900">R$ {(item.valor / 1000).toFixed(0)}k</p>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${(item.valor / faturamentoLast6Months[0].valor) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contas a Receber */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-xl font-semibold mb-6">Contas a Receber</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left px-4 py-2 font-semibold">CTe</th>
                <th className="text-left px-4 py-2 font-semibold">Cliente</th>
                <th className="text-left px-4 py-2 font-semibold">Valor</th>
                <th className="text-left px-4 py-2 font-semibold">Vencimento</th>
                <th className="text-left px-4 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {contasAReceber.map((conta, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-4 py-2 font-medium text-blue-600">{conta.cte}</td>
                  <td className="px-4 py-2">{conta.cliente}</td>
                  <td className="px-4 py-2 font-bold">R$ {conta.valor.toLocaleString("pt-BR")}</td>
                  <td className="px-4 py-2">{new Date(conta.vencimento).toLocaleDateString("pt-BR")}</td>
                  <td className="px-4 py-2">
                    {conta.diasAtraso > 0 ? (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                        {conta.diasAtraso}d em atraso
                      </span>
                    ) : conta.diasAtraso < 0 ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                        {Math.abs(conta.diasAtraso)}d restante
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">
                        Vencendo hoje
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Rotas */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Top Rotas — Mais Lucrativas
        </h3>
        <div className="space-y-4">
          {topRotasMaisCaras
            .sort((a, b) => b.lucratividade - a.lucratividade)
            .map((rota, idx) => (
              <div key={idx} className="bg-gradient-to-r from-slate-50 to-transparent rounded-lg p-4 border border-slate-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-bold text-slate-900">{rota.rota}</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span className="text-slate-600">
                        <span className="font-medium text-slate-900">{rota.kmTotais}</span> km
                      </span>
                      <span className="text-slate-600">
                        Custo: <span className="font-medium text-slate-900">R$ {rota.custoMedio}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{rota.lucratividade.toFixed(1)}x</p>
                    <p className="text-xs text-slate-600">Margem</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
