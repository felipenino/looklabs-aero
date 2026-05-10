"use client";

import { use } from "react";
import { getCaminhaoByPlaca } from "@/data";
import { Circle } from "lucide-react";

const statusColorDot = {
  ok: "text-green-500",
  atencao: "text-yellow-500",
  critico: "text-red-500",
};

export default function FrotaDetailPage({ params }: { params: Promise<{ placa: string }> }) {
  const { placa } = use(params);
  const caminhao = getCaminhaoByPlaca(placa);
  if (!caminhao) return <div className="p-8">Caminhão não encontrado</div>;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{caminhao.apelido}</h1>
        <p className="text-slate-600 mt-2">{caminhao.placa}</p>
      </div>

      {/* Caminhão Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-slate-500 text-sm">Marca/Modelo</p>
          <p className="text-slate-900 font-medium text-lg">
            {caminhao.marca} {caminhao.modelo}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-slate-500 text-sm">Ano</p>
          <p className="text-slate-900 font-medium text-lg">{caminhao.ano}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-slate-500 text-sm">Cor</p>
          <p className="text-slate-900 font-medium text-lg">{caminhao.cor}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-slate-500 text-sm">Status</p>
          <p className="text-slate-900 font-medium text-lg capitalize">{caminhao.status.replace("_", " ")}</p>
        </div>
      </div>

      {/* Checklist de Manutenção */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-2xl font-semibold mb-6">Checklist de Manutenção</h3>
        <div className="space-y-3">
          {caminhao.checklist.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <Circle
                className={`w-6 h-6 mt-1 flex-shrink-0 ${statusColorDot[item.status as keyof typeof statusColorDot]}`}
                fill="currentColor"
              />
              <div className="flex-1">
                <p className="font-medium text-slate-900">{item.nome}</p>
                <p className="text-sm text-slate-600">{item.observacao}</p>
                {item.proximaTroca && (
                  <p className="text-xs text-slate-500 mt-1">Próxima troca: {item.proximaTroca}</p>
                )}
              </div>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  item.status === "ok"
                    ? "bg-green-100 text-green-700"
                    : item.status === "atencao"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {item.status === "ok" ? "OK" : item.status === "atencao" ? "Atenção" : "Crítico"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
