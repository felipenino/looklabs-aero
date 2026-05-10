export type CaminhaoStatus = "em_rota" | "carregando" | "parado" | "ocorrencia" | "manutencao" | "disponivel";
export type CargaStatus = "coletada" | "em_galpao" | "em_rota" | "em_entrega" | "entregue" | "ocorrencia";
export type MaintenanceStatus = "ok" | "atencao" | "critico";

export interface Cliente {
  id: string;
  nome: string;
  segmento: string;
  volumeMensal: number;
  cargasPorMes: number;
  color: string;
}

export interface Galpao {
  id: string;
  nome: string;
  localizacao: string;
  latitude: number;
  longitude: number;
  ocupacao: number;
  docasEmUso: number;
  cargasAguardando: number;
  produtividadeHoje: number;
}

export interface Motorista {
  id: string;
  nome: string;
  cnh: string;
  telefone: string;
  status: "ativo" | "inativo";
}

export interface MaintenanceItem {
  nome: string;
  status: MaintenanceStatus;
  proximaTroca?: string;
  observacao: string;
}

export interface Caminhao {
  id: string;
  placa: string;
  apelido: string;
  cor: string;
  marca: string;
  modelo: string;
  ano: number;
  status: CaminhaoStatus;
  motorista?: Motorista;
  latitude: number;
  longitude: number;
  velocidade: number;
  kmPercorridos: number;
  eta?: string;
  checklist: MaintenanceItem[];
}

export interface Carga {
  id: string;
  cte: string;
  clienteId: string;
  origin: string;
  originCoords: { lat: number; lng: number };
  destination: string;
  destinationCoords: { lat: number; lng: number };
  motorista?: Motorista;
  caminhao?: Caminhao;
  status: CargaStatus;
  valor: number;
  peso: number;
  dataCarga: string;
  dataEntrega?: string;
  eta: string;
  ocorrencias: Ocorrencia[];
}

export interface Ocorrencia {
  id: string;
  tipo: "avaria" | "recusa" | "ausente" | "atraso" | "outros";
  descricao: string;
  data: string;
  latitude?: number;
  longitude?: number;
}

export interface Alerta {
  id: string;
  titulo: string;
  descricao: string;
  tipo: "critico" | "atencao" | "info";
  timestamp: string;
}

export interface SerieHistorica {
  data: string;
  valor: number;
}

export interface KPISData {
  caminhoes_em_rota: number;
  caminhoes_total: number;
  entregas_hoje: number;
  entregas_concluidas: number;
  entregas_em_transito: number;
  entregas_com_ocorrencia: number;
  sla_nutri: number;
  sla_farma: number;
  faturamento_mes: number;
  faturamento_mes_percent: number;
  ocupacao_galpao1: number;
  ocupacao_galpao2: number;
  ocupacao_galpao3: number;
}

export interface EntregaMotorista {
  id: string;
  numero: number;
  cliente: string;
  endereco: string;
  status: "pendente" | "iniciada" | "concluida" | "ocorrencia";
  horario: string;
}
