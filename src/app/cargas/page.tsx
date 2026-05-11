"use client";

import Link from "next/link";
import { cargas, clientes } from "@/data";
import { toast } from "sonner";

const statusLabel = {
  coletada: "Coletada",
  em_galpao: "Em galpão",
  em_rota: "Em rota",
  em_entrega: "Em entrega",
  entregue: "Entregue",
  ocorrencia: "Ocorrência",
};

const statusColor = {
  coletada: "bg-slate-100 text-slate-700",
  em_galpao: "bg-blue-100 text-blue-700",
  em_rota: "bg-green-100 text-green-700",
  em_entrega: "bg-yellow-100 text-yellow-700",
  entregue: "bg-green-100 text-green-700",
  ocorrencia: "bg-red-100 text-red-700",
};

export default function CargasPage() {
  const handleNovaCarga = () => {
    toast("Adicionando nova carga...", {
      description: "Funcionalidade em desenvolvimento",
      duration: 3000,
    });
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestão de Cargas</h1>
          <p className="text-slate-600 mt-2">{cargas.length} cargas no sistema</p>
        </div>
        <button
          onClick={handleNovaCarga}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          + Nova carga
        </button>
      </div>

      {/* Description */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Rastreamento de todas as 30 entregas</span> com filtros por cliente, status e data. Clique em qualquer carga para ver timeline visual detalhado (coletada → galpão → rota → entrega → entregue) e histórico de ocorrências. Oferece visibilidade total da operação ponta a ponta.
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">CTe</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">Cliente</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">Origem</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">Destino</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">Motorista</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">Status</th>
                <th className="px-6 py-3 text-right font-semibold text-slate-900">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {cargas.map((carga) => {
                const cliente = clientes.find((c) => c.id === carga.clienteId);
                return (
                  <tr key={carga.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <Link href={`/cargas/${carga.id}`} className="text-blue-600 hover:underline font-medium">
                        {carga.cte}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-slate-900">{cliente?.nome}</td>
                    <td className="px-6 py-4 text-slate-600">{carga.origin}</td>
                    <td className="px-6 py-4 text-slate-600">{carga.destination}</td>
                    <td className="px-6 py-4 text-slate-600">{carga.motorista?.nome || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColor[carga.status as keyof typeof statusColor]}`}>
                        {statusLabel[carga.status as keyof typeof statusLabel]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-900 font-medium">
                      R$ {carga.valor.toLocaleString("pt-BR")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
