// Types
export * from "./types";

// Data
export {
  clientes,
  getClienteById,
  getClienteByNome,
} from "./clientes";

export {
  galpoes,
  getGalpaoById,
} from "./galpoes";

export {
  motoristas,
  getMotoristaById,
  getRandomMotorista,
} from "./motoristas";

export {
  caminhoes,
  getCaminhaoByPlaca,
  getCaminhaoById,
  getCaminhoesEmRota,
  getCaminhoesDisponiveis,
} from "./caminhoes";

export {
  cargas,
  getCargasByCliente,
  getCargaById,
  getCargasByCte,
  getCargasEmRota,
  getCargasComOcorrencia,
} from "./cargas";

export {
  alertas,
} from "./alertas";

export {
  slaLast30Days,
  faturamentoLast6Months,
  distribuicaoRegional,
  contasAReceber,
  topRotasMaisCaras,
} from "./series";

export {
  entregasDoMotoristaHoje,
  getEntregasMotoristaHoje,
  getEntregaById,
} from "./motorista-app";

// KPIs
import { caminhoes } from "./caminhoes";
import { cargas } from "./cargas";
import { galpoes } from "./galpoes";
import { slaLast30Days, faturamentoLast6Months } from "./series";
import { KPISData } from "./types";

// Calcular SLA do último dia para cada cliente
const ultimoDiaSLA = slaLast30Days.map(
  (cliente) => cliente.data[cliente.data.length - 1].valor
);

export const kpisDashboard: KPISData = {
  caminhoes_em_rota: caminhoes.filter((c) => c.status === "em_rota").length,
  caminhoes_total: caminhoes.length,
  entregas_hoje: cargas.filter((c) => c.dataCarga === "2026-05-10").length,
  entregas_concluidas: cargas.filter((c) => c.status === "entregue").length,
  entregas_em_transito: cargas.filter((c) => c.status === "em_rota").length,
  entregas_com_ocorrencia: cargas.filter((c) => c.status === "ocorrencia").length,
  sla_nutri: ultimoDiaSLA[0], // NutriPlus Alimentos - dados reais
  sla_farma: ultimoDiaSLA[1], // FarmaVida Distribuidora - dados reais
  faturamento_mes: faturamentoLast6Months.reduce((sum, c) => sum + c.valor, 0),
  faturamento_mes_percent: 18, // Crescimento YoY realista
  ocupacao_galpao1: galpoes[0].ocupacao,
  ocupacao_galpao2: galpoes[1].ocupacao,
  ocupacao_galpao3: galpoes[2].ocupacao,
};
