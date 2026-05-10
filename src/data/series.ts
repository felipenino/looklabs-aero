import { SerieHistorica } from "./types";

export const slaLast30Days: { cliente: string; data: SerieHistorica[] }[] = [
  {
    cliente: "NutriPlus Alimentos",
    data: [
      { data: "2026-04-11", valor: 92 },
      { data: "2026-04-12", valor: 94 },
      { data: "2026-04-13", valor: 91 },
      { data: "2026-04-14", valor: 93 },
      { data: "2026-04-15", valor: 95 },
      { data: "2026-04-16", valor: 94 },
      { data: "2026-04-17", valor: 96 },
      { data: "2026-04-18", valor: 95 },
      { data: "2026-04-19", valor: 97 },
      { data: "2026-04-20", valor: 94 },
      { data: "2026-04-21", valor: 95 },
      { data: "2026-04-22", valor: 96 },
      { data: "2026-04-23", valor: 93 },
      { data: "2026-04-24", valor: 94 },
      { data: "2026-04-25", valor: 95 },
      { data: "2026-04-26", valor: 96 },
      { data: "2026-04-27", valor: 94 },
      { data: "2026-04-28", valor: 97 },
      { data: "2026-04-29", valor: 96 },
      { data: "2026-04-30", valor: 95 },
      { data: "2026-05-01", valor: 96 },
      { data: "2026-05-02", valor: 94 },
      { data: "2026-05-03", valor: 95 },
      { data: "2026-05-04", valor: 96 },
      { data: "2026-05-05", valor: 97 },
      { data: "2026-05-06", valor: 95 },
      { data: "2026-05-07", valor: 96 },
      { data: "2026-05-08", valor: 94 },
      { data: "2026-05-09", valor: 96 },
      { data: "2026-05-10", valor: 96.2 },
    ],
  },
  {
    cliente: "FarmaVida Distribuidora",
    data: [
      { data: "2026-04-11", valor: 85 },
      { data: "2026-04-12", valor: 87 },
      { data: "2026-04-13", valor: 84 },
      { data: "2026-04-14", valor: 86 },
      { data: "2026-04-15", valor: 88 },
      { data: "2026-04-16", valor: 87 },
      { data: "2026-04-17", valor: 89 },
      { data: "2026-04-18", valor: 86 },
      { data: "2026-04-19", valor: 88 },
      { data: "2026-04-20", valor: 85 },
      { data: "2026-04-21", valor: 87 },
      { data: "2026-04-22", valor: 89 },
      { data: "2026-04-23", valor: 88 },
      { data: "2026-04-24", valor: 86 },
      { data: "2026-04-25", valor: 87 },
      { data: "2026-04-26", valor: 85 },
      { data: "2026-04-27", valor: 88 },
      { data: "2026-04-28", valor: 89 },
      { data: "2026-04-29", valor: 87 },
      { data: "2026-04-30", valor: 86 },
      { data: "2026-05-01", valor: 88 },
      { data: "2026-05-02", valor: 87 },
      { data: "2026-05-03", valor: 85 },
      { data: "2026-05-04", valor: 86 },
      { data: "2026-05-05", valor: 88 },
      { data: "2026-05-06", valor: 89 },
      { data: "2026-05-07", valor: 87 },
      { data: "2026-05-08", valor: 86 },
      { data: "2026-05-09", valor: 88 },
      { data: "2026-05-10", valor: 91.8 },
    ],
  },
];

export const faturamentoLast6Months: { cliente: string; valor: number }[] = [
  { cliente: "ShopExpress", valor: 287600 },
  { cliente: "Magazine Estrela", valor: 256400 },
  { cliente: "NutriPlus Alimentos", valor: 198700 },
  { cliente: "FarmaVida Distribuidora", valor: 156800 },
  { cliente: "MetalSul Indústria", valor: 89200 },
];

export const distribuicaoRegional: { regiao: string; valor: number }[] = [
  { regiao: "SP Capital", valor: 35 },
  { regiao: "SP Interior", valor: 28 },
  { regiao: "RJ", valor: 18 },
  { regiao: "MG", valor: 12 },
  { regiao: "ES", valor: 7 },
];

export const contasAReceber: {
  cte: string;
  cliente: string;
  valor: number;
  vencimento: string;
  diasAtraso: number;
}[] = [
  { cte: "CTe-2026-001", cliente: "NutriPlus Alimentos", valor: 2500, vencimento: "2026-04-30", diasAtraso: 10 },
  { cte: "CTe-2026-005", cliente: "MetalSul Indústria", valor: 4500, vencimento: "2026-05-05", diasAtraso: 5 },
  { cte: "CTe-2026-008", cliente: "Magazine Estrela", valor: 2800, vencimento: "2026-05-10", diasAtraso: 0 },
  { cte: "CTe-2026-012", cliente: "FarmaVida Distribuidora", valor: 3800, vencimento: "2026-05-08", diasAtraso: 2 },
  { cte: "CTe-2026-020", cliente: "ShopExpress", valor: 3100, vencimento: "2026-05-15", diasAtraso: -5 },
];

export const topRotasMaisCaras: {
  rota: string;
  kmTotais: number;
  custoMedio: number;
  lucratividade: number;
}[] = [
  { rota: "SP - Linhares/ES", kmTotais: 1150, custoMedio: 2450, lucratividade: 2.8 },
  { rota: "SP - Rio de Janeiro/RJ", kmTotais: 430, custoMedio: 1850, lucratividade: 2.4 },
  { rota: "SP - Belo Horizonte/MG", kmTotais: 580, custoMedio: 1620, lucratividade: 2.2 },
  { rota: "SP - Ribeirão Preto/SP", kmTotais: 320, custoMedio: 980, lucratividade: 3.1 },
  { rota: "SP - Campinas/SP", kmTotais: 100, custoMedio: 450, lucratividade: 4.2 },
];
