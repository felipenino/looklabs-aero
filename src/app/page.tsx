"use client";

import { kpisDashboard, alertas } from "@/data";
import { KPICard } from "@/components/dashboard/KPICard";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { PieChart } from "@/components/charts/PieChart";
import {
  Truck,
  Package,
  BarChart3,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function Dashboard() {
  const handleExportarRelatorio = () => {
    toast("Gerando relatório...", {
      description: "Funcionalidade em desenvolvimento",
      duration: 3000,
    });
  };

  return (
    <div className="px-8 py-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-2">
            Visão executiva do dia — {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>
        <button
          onClick={handleExportarRelatorio}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Exportar relatório do mês
        </button>
      </div>

      {/* Description */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Central de controle diária</span> mostrando KPIs críticos: caminhões em operação, entregas do dia, SLA por cliente, faturamento mensal e ocupação de galpões. Os gráficos oferecem insights sobre desempenho e distribuição geográfica, permitindo decisões operacionais imediatas. Painel de alertas destaca problemas críticos em tempo real.
        </p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard
          title="Caminhões em rota"
          value={`${kpisDashboard.caminhoes_em_rota}/${kpisDashboard.caminhoes_total}`}
          icon={<Truck className="w-6 h-6" />}
          color="blue"
        />
        <KPICard
          title="Entregas hoje"
          value={kpisDashboard.entregas_hoje}
          icon={<Package className="w-6 h-6" />}
          color="green"
          subtitle={`${kpisDashboard.entregas_concluidas} concluídas, ${kpisDashboard.entregas_em_transito} em trânsito, ${kpisDashboard.entregas_com_ocorrencia} com ocorrência`}
        />
        <KPICard
          title="SLA NutriPlus Alimentos"
          value={`${kpisDashboard.sla_nutri.toFixed(1)}%`}
          icon={<BarChart3 className="w-6 h-6" />}
          color="green"
          subtitle="Acima do esperado ✅"
        />
        <KPICard
          title="SLA FarmaVida"
          value={`${kpisDashboard.sla_farma.toFixed(1)}%`}
          icon={<AlertCircle className="w-6 h-6" />}
          color="yellow"
          subtitle="Abaixo do esperado ⚠️"
        />
        <KPICard
          title="Faturamento do mês"
          value={`R$ ${(kpisDashboard.faturamento_mes / 1000000).toFixed(2)}M`}
          icon={<DollarSign className="w-6 h-6" />}
          color="blue"
          trend={kpisDashboard.faturamento_mes_percent}
          subtitle="vs mês anterior"
        />
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Ocupação de galpões</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Galpão 1</span>
                <span className="text-sm font-medium text-gray-900">
                  {kpisDashboard.ocupacao_galpao1}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${kpisDashboard.ocupacao_galpao1}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Galpão 2</span>
                <span className="text-sm font-medium text-gray-900">
                  {kpisDashboard.ocupacao_galpao2}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full"
                  style={{ width: `${kpisDashboard.ocupacao_galpao2}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Galpão 3</span>
                <span className="text-sm font-medium text-gray-900">
                  {kpisDashboard.ocupacao_galpao3}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${kpisDashboard.ocupacao_galpao3}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart />
        <BarChart />
      </div>

      {/* Pie + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart />
        <AlertsPanel />
      </div>
    </div>
  );
}
