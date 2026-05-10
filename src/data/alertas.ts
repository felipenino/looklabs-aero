import { Alerta } from "./types";

export const alertas: Alerta[] = [
  {
    id: "alerta_001",
    titulo: "Caminhão parado fora de rota",
    descricao: "Caminhão BRA-2E47 parado há 1h20 fora de rota",
    tipo: "critico",
    timestamp: "2026-05-10T08:30:00Z",
  },
  {
    id: "alerta_002",
    titulo: "Manutenção preventiva próxima",
    descricao: "Manutenção preventiva: BRA-7K12 vence em 2 dias",
    tipo: "atencao",
    timestamp: "2026-05-10T07:15:00Z",
  },
  {
    id: "alerta_003",
    titulo: "Galpão 2 em capacidade máxima",
    descricao: "Galpão 2 atingiu 92% de ocupação",
    tipo: "atencao",
    timestamp: "2026-05-10T06:45:00Z",
  },
  {
    id: "alerta_004",
    titulo: "Nova carga FarmaVida disponível",
    descricao: "Nova carga FarmaVida disponível para alocação",
    tipo: "info",
    timestamp: "2026-05-10T09:00:00Z",
  },
  {
    id: "alerta_005",
    titulo: "SLA em risco",
    descricao: "FarmaVida: SLA em risco — 3 entregas com atraso",
    tipo: "critico",
    timestamp: "2026-05-10T08:00:00Z",
  },
  {
    id: "alerta_006",
    titulo: "Ocorrência registrada",
    descricao: "Ocorrência na carga CTe-2026-008 (avaria mecânica)",
    tipo: "atencao",
    timestamp: "2026-05-10T07:30:00Z",
  },
  {
    id: "alerta_007",
    titulo: "Documentação vencida",
    descricao: "CRLV de BRA-0W88 vence em 5 dias",
    tipo: "atencao",
    timestamp: "2026-05-10T05:00:00Z",
  },
];
