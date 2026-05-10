"use client";

import { useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { Icon } from "leaflet";
import { caminhoes } from "@/data";
import { Caminhao } from "@/data/types";

const getMarkerColor = (status: string) => {
  switch (status) {
    case "em_rota":
      return "#10B981";
    case "carregando":
      return "#3AA7FF";
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

export function TruckMap({
  onSelectTruck,
}: {
  onSelectTruck: (truck: Caminhao) => void;
}) {
  const markers = useMemo(() => {
    return caminhoes.map((truck) => {
      const color = getMarkerColor(truck.status);
      return (
        <Marker
          key={truck.id}
          position={[truck.latitude, truck.longitude]}
          icon={
            new Icon({
              iconUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${encodeURIComponent(color)}'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z'/%3E%3C/svg%3E`,
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            })
          }
          eventHandlers={{
            click: () => onSelectTruck(truck),
          }}
        >
          <Popup>{truck.apelido} ({truck.placa})</Popup>
        </Marker>
      );
    });
  }, [onSelectTruck]);

  return (
    <MapContainer
      center={[-23.5504, -46.6361]}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers}
    </MapContainer>
  );
}
