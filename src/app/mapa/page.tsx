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
    <div className="absolute inset-0 -m-4">
      <SimpleTruckMap onSelectTruck={setSelectedTruck} />
      <TruckDetailPanel truck={selectedTruck} onClose={() => setSelectedTruck(null)} />
    </div>
  );
}
