"use client";

import { galpoes } from "@/data";
import { Warehouse, Dock, Box } from "lucide-react";

export default function GalpoesPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Galpões</h1>
        <p className="text-slate-600 mt-2">Visão de ocupação e atividades</p>
      </div>

      {/* Description */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Ocupação e produtividade dos 3 centros de distribuição</span> (Guarulhos, Embu das Artes, Campinas). Mostra: ocupação atual (%), docas em uso, cargas aguardando e produtividade do dia. Ajuda a evitar gargalos, otimizar uso de docas e antecipar necessidade de turnos extras.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {galpoes.map((galpao) => {
          const ocupacaoColor =
            galpao.ocupacao > 85
              ? "bg-red-100 text-red-700"
              : galpao.ocupacao > 70
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700";

          return (
            <div key={galpao.id} className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{galpao.nome}</h3>
                  <p className="text-sm text-slate-600 mt-1">{galpao.localizacao}</p>
                </div>
                <Warehouse className="w-6 h-6 text-slate-400" />
              </div>

              {/* Ocupação */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">Ocupação</span>
                  <span className={`text-lg font-bold px-3 py-1 rounded-full ${ocupacaoColor}`}>
                    {galpao.ocupacao}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      galpao.ocupacao > 85
                        ? "bg-red-500"
                        : galpao.ocupacao > 70
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                    style={{ width: `${galpao.ocupacao}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-lg p-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Dock className="w-4 h-4 text-slate-400" />
                    <p className="text-xs text-slate-600">Docas em uso</p>
                  </div>
                  <p className="text-xl font-bold text-slate-900">{galpao.docasEmUso}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Box className="w-4 h-4 text-slate-400" />
                    <p className="text-xs text-slate-600">Cargas aguardando</p>
                  </div>
                  <p className="text-xl font-bold text-slate-900">{galpao.cargasAguardando}</p>
                </div>
              </div>

              {/* Produtividade */}
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-600 mb-2">Produtividade (hoje)</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-900">{galpao.produtividadeHoje}</span>
                  <span className="text-sm text-slate-600">operações</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
