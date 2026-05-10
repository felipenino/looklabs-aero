import { Galpao } from "./types";

export const galpoes: Galpao[] = [
  {
    id: "gal_001",
    nome: "Galpão 1 — Guarulhos/SP",
    localizacao: "Guarulhos, SP",
    latitude: -23.4555,
    longitude: -46.5031,
    ocupacao: 78,
    docasEmUso: 5,
    cargasAguardando: 12,
    produtividadeHoje: 45,
  },
  {
    id: "gal_002",
    nome: "Galpão 2 — Embu das Artes/SP",
    localizacao: "Embu das Artes, SP",
    latitude: -23.6452,
    longitude: -46.8582,
    ocupacao: 92,
    docasEmUso: 7,
    cargasAguardando: 8,
    produtividadeHoje: 38,
  },
  {
    id: "gal_003",
    nome: "Galpão 3 — Campinas/SP",
    localizacao: "Campinas, SP",
    latitude: -22.9068,
    longitude: -47.0616,
    ocupacao: 64,
    docasEmUso: 4,
    cargasAguardando: 5,
    produtividadeHoje: 52,
  },
];

export const getGalpaoById = (id: string): Galpao | undefined => {
  return galpoes.find((g) => g.id === id);
};
