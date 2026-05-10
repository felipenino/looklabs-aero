"use client";

import { Caminhao } from "@/data/types";
import { Phone, MapPin, Gauge, Navigation2, X } from "lucide-react";
import { toast } from "sonner";

interface TruckDetailPanelProps {
  truck: Caminhao | null;
  onClose: () => void;
}

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

export function TruckDetailPanel({ truck, onClose }: TruckDetailPanelProps) {
  if (!truck) return null;

  const handleViewHistory = () => {
    toast("Ver histórico", {
      description: "Funcionalidade em desenvolvimento",
      duration: 3000,
    });
  };

  const handleContactDriver = () => {
    toast("Falar com motorista", {
      description: "Funcionalidade em desenvolvimento",
      duration: 3000,
    });
  };

  return (
    <div className="fixed right-0 top-16 w-80 h-[calc(100vh-4rem)] bg-white border-l border-slate-200 shadow-lg z-30 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">{truck.apelido}</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-100 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Truck Info */}
      <div className="p-4 space-y-4">
        {/* Status Badge */}
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColor[truck.status as keyof typeof statusColor]}`}>
          {statusLabel[truck.status as keyof typeof statusLabel]}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500 text-xs uppercase font-medium">Placa</p>
            <p className="text-slate-900 font-medium text-base">{truck.placa}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs uppercase font-medium">Marca</p>
            <p className="text-slate-900 font-medium text-base">{truck.marca}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs uppercase font-medium">Modelo</p>
            <p className="text-slate-900 font-medium text-base">{truck.modelo}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs uppercase font-medium">Ano</p>
            <p className="text-slate-900 font-medium text-base">{truck.ano}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200"></div>

        {/* Motorista */}
        {truck.motorista && (
          <div>
            <p className="text-slate-500 text-xs uppercase font-medium mb-2">Motorista</p>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-slate-900 font-medium text-sm">{truck.motorista.nome}</p>
              <div className="flex items-center gap-2 mt-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <p className="text-slate-600 text-sm">{truck.motorista.telefone}</p>
              </div>
            </div>
          </div>
        )}

        {/* Localização */}
        <div>
          <p className="text-slate-500 text-xs uppercase font-medium mb-2">Localização</p>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            <p className="text-slate-600 text-sm">
              {truck.latitude.toFixed(4)}, {truck.longitude.toFixed(4)}
            </p>
          </div>
        </div>

        {/* Performance */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Gauge className="w-4 h-4 text-slate-400" />
              <p className="text-sm text-slate-600">Velocidade</p>
            </div>
            <p className="text-lg font-semibold text-slate-900">{truck.velocidade} km/h</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Navigation2 className="w-4 h-4 text-slate-400" />
              <p className="text-sm text-slate-600">Distância percorrida</p>
            </div>
            <p className="text-lg font-semibold text-slate-900">{truck.kmPercorridos} km</p>
          </div>
          {truck.eta && (
            <div>
              <p className="text-sm text-slate-600 mb-1">ETA</p>
              <p className="text-lg font-semibold text-slate-900">{truck.eta}</p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="border-t border-slate-200 pt-4 space-y-2">
          <button
            onClick={handleViewHistory}
            className="w-full px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
          >
            Ver histórico
          </button>
          <button
            onClick={handleContactDriver}
            className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Falar com motorista
          </button>
        </div>
      </div>
    </div>
  );
}
