import { SerieHistorica } from "./types";

// SLA com padrões mais realistas: variações por dia da semana, picos e quedas
export const slaLast30Days: { cliente: string; data: SerieHistorica[] }[] = [
  {
    cliente: "NutriPlus Alimentos",
    data: [
      // Semana 1: Segunda-feira com queda (fim de semana)
      { data: "2026-04-11", valor: 88.2 }, // Sábado - menor volume
      { data: "2026-04-12", valor: 92.1 }, // Domingo
      { data: "2026-04-13", valor: 89.5 }, // Segunda - recuperação
      { data: "2026-04-14", valor: 94.3 }, // Terça - pico
      { data: "2026-04-15", valor: 96.1 }, // Quarta
      { data: "2026-04-16", valor: 93.8 }, // Quinta
      { data: "2026-04-17", valor: 91.2 }, // Sexta - queda antes do fim de semana
      // Semana 2
      { data: "2026-04-18", valor: 87.9 }, // Sábado
      { data: "2026-04-19", valor: 93.4 }, // Domingo
      { data: "2026-04-20", valor: 95.7 }, // Segunda - forte
      { data: "2026-04-21", valor: 94.2 }, // Terça
      { data: "2026-04-22", valor: 98.1 }, // Quarta - máximo
      { data: "2026-04-23", valor: 96.3 }, // Quinta
      { data: "2026-04-24", valor: 91.8 }, // Sexta - redução
      // Semana 3: Período com problema (queda em 25-26)
      { data: "2026-04-25", valor: 88.2 }, // Sábado
      { data: "2026-04-26", valor: 84.5 }, // Domingo - queda maior
      { data: "2026-04-27", valor: 82.1 }, // Segunda - BAIXO (problema?)
      { data: "2026-04-28", valor: 85.9 }, // Terça - recuperação
      { data: "2026-04-29", valor: 90.4 }, // Quarta
      { data: "2026-04-30", valor: 93.2 }, // Quinta
      // Semana 4
      { data: "2026-05-01", valor: 89.1 }, // Sexta - feriado
      { data: "2026-05-02", valor: 88.5 }, // Sábado
      { data: "2026-05-03", valor: 91.8 }, // Domingo
      { data: "2026-05-04", valor: 96.5 }, // Segunda - recuperação
      { data: "2026-05-05", valor: 97.3 }, // Terça - pico
      { data: "2026-05-06", valor: 98.2 }, // Quarta - máximo
      { data: "2026-05-07", valor: 95.8 }, // Quinta
      { data: "2026-05-08", valor: 93.5 }, // Sexta
      { data: "2026-05-09", valor: 89.7 }, // Sábado
      { data: "2026-05-10", valor: 94.8 }, // Domingo - hoje
    ],
  },
  {
    cliente: "FarmaVida Distribuidora",
    data: [
      // Padrão mais conservador, SLA menor
      { data: "2026-04-11", valor: 82.1 },
      { data: "2026-04-12", valor: 84.5 },
      { data: "2026-04-13", valor: 81.2 },
      { data: "2026-04-14", valor: 85.8 },
      { data: "2026-04-15", valor: 88.3 },
      { data: "2026-04-16", valor: 86.9 },
      { data: "2026-04-17", valor: 83.5 },
      { data: "2026-04-18", valor: 80.2 },
      { data: "2026-04-19", valor: 85.7 },
      { data: "2026-04-20", valor: 89.1 },
      { data: "2026-04-21", valor: 87.4 },
      { data: "2026-04-22", valor: 91.2 },
      { data: "2026-04-23", valor: 88.6 },
      { data: "2026-04-24", valor: 84.3 },
      { data: "2026-04-25", valor: 79.8 },
      { data: "2026-04-26", valor: 76.5 }, // CRÍTICO - problema operacional
      { data: "2026-04-27", valor: 78.9 },
      { data: "2026-04-28", valor: 82.3 },
      { data: "2026-04-29", valor: 85.7 },
      { data: "2026-04-30", valor: 88.2 },
      { data: "2026-05-01", valor: 85.1 },
      { data: "2026-05-02", valor: 82.8 },
      { data: "2026-05-03", valor: 86.4 },
      { data: "2026-05-04", valor: 89.5 },
      { data: "2026-05-05", valor: 91.8 },
      { data: "2026-05-06", valor: 93.2 },
      { data: "2026-05-07", valor: 90.6 },
      { data: "2026-05-08", valor: 88.3 },
      { data: "2026-05-09", valor: 85.9 },
      { data: "2026-05-10", valor: 87.4 },
    ],
  },
  {
    cliente: "Magazine Estrela",
    data: [
      // Alto SLA, cliente premium
      { data: "2026-04-11", valor: 95.2 },
      { data: "2026-04-12", valor: 96.8 },
      { data: "2026-04-13", valor: 94.5 },
      { data: "2026-04-14", valor: 97.3 },
      { data: "2026-04-15", valor: 98.9 },
      { data: "2026-04-16", valor: 97.1 },
      { data: "2026-04-17", valor: 95.6 },
      { data: "2026-04-18", valor: 93.2 },
      { data: "2026-04-19", valor: 96.7 },
      { data: "2026-04-20", valor: 98.2 },
      { data: "2026-04-21", valor: 97.5 },
      { data: "2026-04-22", valor: 99.1 },
      { data: "2026-04-23", valor: 98.4 },
      { data: "2026-04-24", valor: 96.1 },
      { data: "2026-04-25", valor: 94.3 },
      { data: "2026-04-26", valor: 92.8 },
      { data: "2026-04-27", valor: 94.9 },
      { data: "2026-04-28", valor: 96.5 },
      { data: "2026-04-29", valor: 97.8 },
      { data: "2026-04-30", valor: 99.0 },
      { data: "2026-05-01", valor: 96.2 },
      { data: "2026-05-02", valor: 94.7 },
      { data: "2026-05-03", valor: 97.1 },
      { data: "2026-05-04", valor: 98.3 },
      { data: "2026-05-05", valor: 99.2 },
      { data: "2026-05-06", valor: 98.8 },
      { data: "2026-05-07", valor: 97.6 },
      { data: "2026-05-08", valor: 96.4 },
      { data: "2026-05-09", valor: 95.2 },
      { data: "2026-05-10", valor: 97.3 },
    ],
  },
];

// Faturamento mensal com tendência de crescimento e variações sazonais
export const faturamentoLast6Months: { cliente: string; valor: number }[] = [
  { cliente: "ShopExpress", valor: 425800 }, // Crescimento (Black Friday, Cyber)
  { cliente: "Magazine Estrela", valor: 389200 }, // Premium, crescimento consistente
  { cliente: "NutriPlus Alimentos", valor: 287600 }, // Estável, volume
  { cliente: "FarmaVida Distribuidora", valor: 198400 }, // Crescimento pós-problema
  { cliente: "MetalSul Indústria", valor: 127900 }, // Crescimento industrial
];

// Distribuição regional detalhada com variações realistas
export const distribuicaoRegional: { regiao: string; valor: number }[] = [
  { regiao: "SP Capital", valor: 32 },       // Maior concentração
  { regiao: "SP Interior", valor: 25 },      // Campinas, Ribeirão, etc
  { regiao: "RJ", valor: 18 },               // Rio, segunda maior
  { regiao: "MG", valor: 15 },               // Crescimento BH
  { regiao: "ES", valor: 8 },                // Linhares
  { regiao: "Outros", valor: 2 },            // São Carlos, etc
];

// Contas a receber com padrão mais realista
export const contasAReceber: {
  cte: string;
  cliente: string;
  valor: number;
  vencimento: string;
  diasAtraso: number;
}[] = [
  { cte: "CTe-2026-0847", cliente: "NutriPlus Alimentos", valor: 12500, vencimento: "2026-04-25", diasAtraso: 16 },
  { cte: "CTe-2026-0923", cliente: "MetalSul Indústria", valor: 8500, vencimento: "2026-04-30", diasAtraso: 11 },
  { cte: "CTe-2026-1001", cliente: "Magazine Estrela", valor: 5800, vencimento: "2026-05-05", diasAtraso: 6 },
  { cte: "CTe-2026-1047", cliente: "FarmaVida Distribuidora", valor: 7200, vencimento: "2026-05-08", diasAtraso: 3 },
  { cte: "CTe-2026-1089", cliente: "ShopExpress", valor: 6500, vencimento: "2026-05-10", diasAtraso: 1 },
  { cte: "CTe-2026-1142", cliente: "NutriPlus Alimentos", valor: 9800, vencimento: "2026-05-15", diasAtraso: -4 },
  { cte: "CTe-2026-1201", cliente: "Magazine Estrela", valor: 4300, vencimento: "2026-05-18", diasAtraso: -7 },
  { cte: "CTe-2026-1256", cliente: "ShopExpress", valor: 11200, vencimento: "2026-05-20", diasAtraso: -10 },
];

// Rotas com dados mais realistas de custo variável
export const topRotasMaisCaras: {
  rota: string;
  kmTotais: number;
  custoMedio: number;
  lucratividade: number;
}[] = [
  { rota: "SP - Linhares/ES", kmTotais: 2845, custoMedio: 3250, lucratividade: 2.8 },  // Maior distância
  { rota: "SP - Rio de Janeiro/RJ", kmTotais: 1950, custoMedio: 2480, lucratividade: 2.1 },
  { rota: "SP - Belo Horizonte/MG", kmTotais: 1580, custoMedio: 2150, lucratividade: 2.5 },
  { rota: "SP - Ribeirão Preto/SP", kmTotais: 1320, custoMedio: 1680, lucratividade: 3.2 },  // Ótima margem
  { rota: "SP - Campinas/SP", kmTotais: 850, custoMedio: 980, lucratividade: 4.5 },  // Melhor lucratividade
  { rota: "SP - São José dos Campos/SP", kmTotais: 920, custoMedio: 1120, lucratividade: 3.8 },
  { rota: "SP - Sorocaba/SP", kmTotais: 780, custoMedio: 950, lucratividade: 3.9 },
];
