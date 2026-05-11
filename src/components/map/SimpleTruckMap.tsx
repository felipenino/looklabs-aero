"use client";

import { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import { Truck } from "lucide-react";
import { caminhoes } from "@/data";
import { Caminhao } from "@/data/types";

const getMarkerColor = (status: string) => {
  switch (status) {
    case "em_rota":
      return "#10B981";
    case "carregando":
      return "#3B82F6";
    case "parado":
      return "#F59E0B";
    case "ocorrencia":
      return "#EF4444";
    case "manutencao":
      return "#9CA3AF";
    case "disponivel":
      return "#8B5CF6";
    default:
      return "#6B7280";
  }
};

const statusLabel = {
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
  const [viewState, setViewState] = useState({
    longitude: -46.6361,
    latitude: -23.5504,
    zoom: 7,
  });

  useEffect(() => {
    setAnimatedTrucks(caminhoes);

    const interval = setInterval(() => {
      setAnimatedTrucks((prev) =>
        prev.map((truck) => {
          if (truck.status !== "em_rota") {
            return truck;
          }

          const offset = (Date.now() % 30000) / 30000;
          const routes = [
            { start: [-23.5504, -46.6361], end: [-22.9068, -47.0616] },
            { start: [-23.5504, -46.6361], end: [-21.1789, -47.8101] },
            { start: [-23.5504, -46.6361], end: [-22.9068, -43.1729] },
            { start: [-23.5504, -46.6361], end: [-19.9167, -43.9345] },
            { start: [-23.5504, -46.6361], end: [-19.2535, -40.2554] },
          ];

          const routeIdx = (truck.motorista?.id.charCodeAt(truck.motorista.id.length - 1) || 0) % routes.length;
          const route = routes[routeIdx];

          return {
            ...truck,
            latitude: route.start[0] + (route.end[0] - route.start[0]) * offset,
            longitude: route.start[1] + (route.end[1] - route.start[1]) * offset,
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ width: "100%", height: "100%" }}
    >
      {animatedTrucks.map((truck) => (
        <Marker
          key={truck.id}
          longitude={truck.longitude}
          latitude={truck.latitude}
          anchor="bottom"
          onClick={() => onSelectTruck(truck)}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: getMarkerColor(truck.status),
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              border: "2px solid white",
            }}
            title={truck.apelido}
          >
            <Truck size={18} color="white" />
          </div>
        </Marker>
      ))}

      {animatedTrucks.map((truck) => (
        <Popup
          key={`popup-${truck.id}`}
          longitude={truck.longitude}
          latitude={truck.latitude}
          anchor="top"
          closeButton={false}
          closeOnClick={false}
        >
          <div className="text-sm p-2">
            <div className="font-semibold">{truck.apelido}</div>
            <div className="text-gray-600">{truck.placa}</div>
            <div className="text-xs text-gray-500 mt-1">
              {statusLabel[truck.status as keyof typeof statusLabel]}
            </div>
          </div>
        </Popup>
      ))}
    </Map>
  );
}
