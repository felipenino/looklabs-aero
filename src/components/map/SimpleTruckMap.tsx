"use client";

import { useMemo, useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import { Truck } from "lucide-react";
import L from "leaflet";
import { caminhoes } from "@/data";
import { Caminhao } from "@/data/types";

// Criar ícone SVG de caminhão
const createTruckIcon = (color: string) => {
  const html = `
    <div style="
      width: 24px;
      height: 24px;
      background: ${color};
      border-radius: 3px;
      border: 2px solid ${color};
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    ">🚚</div>
  `;

  return L.divIcon({
    html,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
    className: "truck-icon",
  });
};

const getMarkerColor = (status: string) => {
  switch (status) {
    case "em_rota":
      return "#10B981"; // Verde
    case "carregando":
      return "#3B82F6"; // Azul
    case "parado":
      return "#F59E0B"; // Amber
    case "ocorrencia":
      return "#EF4444"; // Vermelho
    case "manutencao":
      return "#9CA3AF"; // Cinza
    case "disponivel":
      return "#8B5CF6"; // Roxo
    default:
      return "#6B7280";
  }
};

const statusLabel: Record<string, string> = {
  em_rota: "Em rota",
  carregando: "Carregando",
  parado: "Parado",
  ocorrencia: "Ocorrência",
  manutencao: "Manutenção",
  disponivel: "Disponível",
};

export function SimpleTruckMap({
  onSelectTruck,
}: {
  onSelectTruck: (truck: Caminhao) => void;
}) {
  const [animatedTrucks, setAnimatedTrucks] = useState<Caminhao[]>([]);

  useEffect(() => {
    // Inicializar caminhões
    setAnimatedTrucks(caminhoes);

    // Animar caminhões em rota
    const interval = setInterval(() => {
      setAnimatedTrucks((prev) =>
        prev.map((truck) => {
          if (truck.status !== "em_rota") {
            return truck;
          }

          // Movimento suave
          const offset = (Date.now() % 30000) / 30000; // Ciclo de 30s
          const routes = [
            { start: [-23.5504, -46.6361], end: [-22.9068, -47.0616] }, // SP-Campinas
            { start: [-23.5504, -46.6361], end: [-21.1789, -47.8101] }, // SP-RP
            { start: [-23.5504, -46.6361], end: [-22.9068, -43.1729] }, // SP-RJ
            { start: [-23.5504, -46.6361], end: [-19.9167, -43.9345] }, // SP-BH
            { start: [-23.5504, -46.6361], end: [-19.2535, -40.2554] }, // SP-Linhares
          ];

          const routeIdx = (truck.motorista?.id.charCodeAt(truck.motorista.id.length - 1) || 0) % routes.length;
          const route = routes[routeIdx];

          return {
            ...truck,
            latitude:
              route.start[0] + (route.end[0] - route.start[0]) * offset,
            longitude:
              route.start[1] + (route.end[1] - route.start[1]) * offset,
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={[-23.5504, -46.6361]}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
      className="z-0 w-full h-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {animatedTrucks.map((truck) => (
        <Marker
          key={truck.id}
          position={[truck.latitude, truck.longitude]}
          icon={createTruckIcon(getMarkerColor(truck.status))}
          eventHandlers={{
            click: () => onSelectTruck(truck),
          }}
        >
          <Popup className="text-sm">
            <div className="font-semibold">{truck.apelido}</div>
            <div className="text-gray-600">{truck.placa}</div>
            <div className="text-xs text-gray-500 mt-1">
              {statusLabel[truck.status as keyof typeof statusLabel]}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
