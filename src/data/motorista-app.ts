import { EntregaMotorista } from "./types";

export const entregasDoMotoristaHoje: EntregaMotorista[] = [
  {
    id: "entrega_001",
    numero: 1,
    cliente: "Magazine Estrela - Guarulhos",
    endereco: "Rua das Flores, 123 - Guarulhos, SP",
    status: "concluida",
    horario: "08:15",
  },
  {
    id: "entrega_002",
    numero: 2,
    cliente: "NutriPlus Alimentos",
    endereco: "Av. Industrial, 456 - São Paulo, SP",
    status: "concluida",
    horario: "09:45",
  },
  {
    id: "entrega_003",
    numero: 3,
    cliente: "FarmaVida Distribuidora",
    endereco: "Rua do Comércio, 789 - Taboão da Serra, SP",
    status: "iniciada",
    horario: "11:30",
  },
  {
    id: "entrega_004",
    numero: 4,
    cliente: "ShopExpress - Centro",
    endereco: "Av. Paulista, 2000 - São Paulo, SP",
    status: "pendente",
    horario: "13:00",
  },
  {
    id: "entrega_005",
    numero: 5,
    cliente: "MetalSul Indústria",
    endereco: "Estrada de Ferro, 999 - Diadema, SP",
    status: "pendente",
    horario: "15:00",
  },
  {
    id: "entrega_006",
    numero: 6,
    cliente: "Magazine Estrela - Diadema",
    endereco: "Rodovia Anchieta, 500 - Diadema, SP",
    status: "pendente",
    horario: "16:30",
  },
  {
    id: "entrega_007",
    numero: 7,
    cliente: "NutriPlus Alimentos - Filial",
    endereco: "Avenida Brasil, 3000 - Santo André, SP",
    status: "pendente",
    horario: "18:00",
  },
];

export const getEntregasMotoristaHoje = (): EntregaMotorista[] => {
  return entregasDoMotoristaHoje;
};

export const getEntregaById = (id: string): EntregaMotorista | undefined => {
  return entregasDoMotoristaHoje.find((e) => e.id === id);
};
