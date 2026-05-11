"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Caminhao } from "@/data/types";
import { TruckDetailPanel } from "@/components/map/TruckDetailPanel";

const SimpleTruckMap = dynamic(() => import("@/components/map/SimpleTruckMap").then((mod) => ({ default: mod.SimpleTruckMap })), {
  ssr: false,
});

export default function MapaPage() {
  const [selectedTruck, setSelectedTruck] = useState<Caminhao | null>(null);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mapa da Frota</h1>
        <p className="text-gray-600 mt-2">20 caminhões em operação</p>
      </div>

      {/* Description */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Visualização geográfica</span> de todos os 20 caminhões com status codificado por cor (verde=rota, azul=carregando, amarelo=parado, vermelho=ocorrência, cinza=manutenção). Caminhões em rota se movem continuamente. Clique em qualquer caminhão para ver detalhes: placa, motorista, origem, destino e status da carga.
        </p>
      </div>
      <div style={{ width: "100%", height: "600px", borderRadius: "0.5rem", overflow: "hidden", border: "1px solid #e5e7eb" }}>
        <SimpleTruckMap onSelectTruck={setSelectedTruck} />
      </div>
      <TruckDetailPanel truck={selectedTruck} onClose={() => setSelectedTruck(null)} />
    </div>
  );
}
