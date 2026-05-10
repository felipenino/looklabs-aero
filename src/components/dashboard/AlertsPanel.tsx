"use client";

import { alertas } from "@/data";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";

export function AlertsPanel() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertas</h3>
      <div className="space-y-3">
        {alertas.map((alerta) => {
          const iconColor =
            alerta.tipo === "critico"
              ? "text-red-600 bg-red-50"
              : alerta.tipo === "atencao"
                ? "text-amber-600 bg-amber-50"
                : "text-blue-600 bg-blue-50";

          const Icon =
            alerta.tipo === "critico"
              ? AlertCircle
              : alerta.tipo === "atencao"
                ? AlertTriangle
                : Info;

          return (
            <div key={alerta.id} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`p-2 rounded ${iconColor} flex-shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{alerta.titulo}</p>
                <p className="text-xs text-gray-500 mt-0.5">{alerta.descricao}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
