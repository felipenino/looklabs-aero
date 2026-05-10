"use client";

import { cargas, clientes, getCargaById } from "@/data";
import { Package, Truck, User, MapPin, Calendar, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const statusLabel = {
  coletada: "Coletada",
  em_galpao: "Em galpão",
  em_rota: "Em rota",
  em_entrega: "Em entrega",
  entregue: "Entregue",
  ocorrencia: "Ocorrência",
};

const timelineSteps = [
  { label: "Coletada", status: "coletada" },
  { label: "Em galpão", status: "em_galpao" },
  { label: "Em rota", status: "em_rota" },
  { label: "Em entrega", status: "em_entrega" },
  { label: "Entregue", status: "entregue" },
];

const statusColors = {
  coletada: "bg-slate-300",
  em_galpao: "bg-blue-300",
  em_rota: "bg-green-300",
  em_entrega: "bg-yellow-300",
  entregue: "bg-green-500",
};

export default function CargaDetailPage({ params }: { params: { id: string } }) {
  const carga = getCargaById(params.id);
  if (!carga) return <div className="p-8">Carga não encontrada</div>;

  const cliente = clientes.find((c) => c.id === carga.clienteId);

  const handleDownloadDocumento = (tipo: string) => {
    toast(`Baixando ${tipo}...`, {
      description: "Funcionalidade em desenvolvimento",
      duration: 3000,
    });
  };

  const getTimelineIndex = (status: string) => {
    return timelineSteps.findIndex((step) => step.status === status);
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{carga.cte}</h1>
        <p className="text-slate-600 mt-2">{cliente?.nome}</p>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Timeline de Entrega</h3>
        <div className="flex items-center justify-between">
          {timelineSteps.map((step, idx) => {
            const isActive = getTimelineIndex(carga.status) >= idx;
            return (
              <div key={step.status} className="flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-white ${
                    isActive ? statusColors[step.status as keyof typeof statusColors] : "bg-slate-300"
                  }`}
                >
                  {idx + 1}
                </div>
                <p className="text-center text-sm mt-2 text-slate-600">{step.label}</p>
                {idx < timelineSteps.length - 1 && (
                  <div
                    className={`h-1 mt-2 ${isActive ? "bg-green-400" : "bg-slate-300"}`}
                    style={{ marginLeft: "-50%", marginRight: "-50%" }}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carga Info */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Informações da Carga</h3>
          <div>
            <p className="text-slate-500 text-sm">Peso</p>
            <p className="text-slate-900 font-medium text-lg">{carga.peso} kg</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm">Valor</p>
            <p className="text-slate-900 font-medium text-lg">R$ {carga.valor.toLocaleString("pt-BR")}</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm">Data da Carga</p>
            <p className="text-slate-900 font-medium">{new Date(carga.dataCarga).toLocaleDateString("pt-BR")}</p>
          </div>
          {carga.dataEntrega && (
            <div>
              <p className="text-slate-500 text-sm">Data de Entrega</p>
              <p className="text-slate-900 font-medium">{new Date(carga.dataEntrega).toLocaleDateString("pt-BR")}</p>
            </div>
          )}
        </div>

        {/* Rota Info */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Rota</h3>
          <div>
            <p className="text-slate-500 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Origem
            </p>
            <p className="text-slate-900 font-medium">{carga.origin}</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Destino
            </p>
            <p className="text-slate-900 font-medium">{carga.destination}</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm">ETA</p>
            <p className="text-slate-900 font-medium">{carga.eta}</p>
          </div>
        </div>

        {/* Motorista e Caminhão */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Motorista</h3>
          {carga.motorista ? (
            <>
              <div>
                <p className="text-slate-500 text-sm">Nome</p>
                <p className="text-slate-900 font-medium">{carga.motorista.nome}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm">Telefone</p>
                <p className="text-slate-900 font-medium">{carga.motorista.telefone}</p>
              </div>
            </>
          ) : (
            <p className="text-slate-600">Não atribuído</p>
          )}
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Caminhão</h3>
          {carga.caminhao ? (
            <>
              <div>
                <p className="text-slate-500 text-sm">Placa</p>
                <p className="text-slate-900 font-medium">{carga.caminhao.placa}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm">Modelo</p>
                <p className="text-slate-900 font-medium">{carga.caminhao.marca} {carga.caminhao.modelo}</p>
              </div>
            </>
          ) : (
            <p className="text-slate-600">Não atribuído</p>
          )}
        </div>
      </div>

      {/* Documentos */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Documentos</h3>
        <div className="space-y-2">
          <button
            onClick={() => handleDownloadDocumento("CTe")}
            className="w-full px-4 py-2 text-left border border-slate-300 rounded hover:bg-slate-50 transition-colors"
          >
            CTe
          </button>
          <button
            onClick={() => handleDownloadDocumento("Manifesto")}
            className="w-full px-4 py-2 text-left border border-slate-300 rounded hover:bg-slate-50 transition-colors"
          >
            Manifesto
          </button>
          <button
            onClick={() => handleDownloadDocumento("Canhoto")}
            className="w-full px-4 py-2 text-left border border-slate-300 rounded hover:bg-slate-50 transition-colors"
          >
            Canhoto
          </button>
        </div>
      </div>

      {/* Ocorrências */}
      {carga.ocorrencias.length > 0 && (
        <div className="bg-white rounded-lg border border-red-200 p-6 bg-red-50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Ocorrências
          </h3>
          <div className="space-y-3">
            {carga.ocorrencias.map((oc) => (
              <div key={oc.id} className="border-l-4 border-red-500 pl-4 py-2">
                <p className="font-medium text-slate-900">{oc.tipo.toUpperCase()}</p>
                <p className="text-slate-600 text-sm mt-1">{oc.descricao}</p>
                <p className="text-slate-500 text-xs mt-2">{new Date(oc.data).toLocaleString("pt-BR")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
