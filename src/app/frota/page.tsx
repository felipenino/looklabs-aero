"use client";

import Link from "next/link";
import { caminhoes } from "@/data";

const statusLabel = {
  em_rota: "Em rota",
  carregando: "Carregando",
  parado: "Parado",
  ocorrencia: "Ocorrência",
  manutencao: "Manutenção",
  disponivel: "Disponível",
};

const statusColor = {
  em_rota: "bg-green-100 text-green-700",
  carregando: "bg-blue-100 text-blue-700",
  parado: "bg-yellow-100 text-yellow-700",
  ocorrencia: "bg-red-100 text-red-700",
  manutencao: "bg-gray-100 text-gray-700",
  disponivel: "bg-purple-100 text-purple-700",
};

export default function FrotaPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Frota</h1>
        <p className="text-slate-600 mt-2">{caminhoes.length} caminhões no total</p>
      </div>

      {/* Description */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Status de saúde e manutenção</span> de todos os 20 caminhões. Clique em qualquer caminhão para abrir checklist visual com 12 itens codificados por semáforo (verde=ok, amarelo=atenção, vermelho=crítico). Identifica necessidades de manutenção preventiva e corretiva para evitar paradas inesperadas.
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">Apelido</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">Placa</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">Marca/Modelo</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">Ano</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">Motorista</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {caminhoes.map((caminhao) => (
                <tr key={caminhao.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <Link href={`/frota/${caminhao.placa}`} className="text-blue-600 hover:underline font-medium">
                      {caminhao.apelido}
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">{caminhao.placa}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {caminhao.marca} {caminhao.modelo}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{caminhao.ano}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColor[caminhao.status as keyof typeof statusColor]}`}>
                      {statusLabel[caminhao.status as keyof typeof statusLabel]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{caminhao.motorista?.nome || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
