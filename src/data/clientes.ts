import { Cliente } from "./types";

export const clientes: Cliente[] = [
  {
    id: "cli_001",
    nome: "NutriPlus Alimentos",
    segmento: "Indústria de alimentos",
    volumeMensal: 180,
    cargasPorMes: 180,
    color: "#10B981",
  },
  {
    id: "cli_002",
    nome: "FarmaVida Distribuidora",
    segmento: "Farmacêutica",
    volumeMensal: 95,
    cargasPorMes: 95,
    color: "#3B82F6",
  },
  {
    id: "cli_003",
    nome: "Magazine Estrela",
    segmento: "Varejo",
    volumeMensal: 220,
    cargasPorMes: 220,
    color: "#F59E0B",
  },
  {
    id: "cli_004",
    nome: "MetalSul Indústria",
    segmento: "Indústria metalúrgica",
    volumeMensal: 60,
    cargasPorMes: 60,
    color: "#8B5CF6",
  },
  {
    id: "cli_005",
    nome: "ShopExpress",
    segmento: "E-commerce",
    volumeMensal: 340,
    cargasPorMes: 340,
    color: "#EC4899",
  },
];

export const getClienteById = (id: string): Cliente | undefined => {
  return clientes.find((c) => c.id === id);
};

export const getClienteByNome = (nome: string): Cliente | undefined => {
  return clientes.find((c) => c.nome === nome);
};
