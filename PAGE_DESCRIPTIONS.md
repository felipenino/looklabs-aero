# Descrições das Páginas — Translife TMS/ERP

## 📊 Dashboard (/)
**Visão Executiva em Tempo Real**

Central de controle diária mostrando KPIs críticos: caminhões em operação, entregas do dia, SLA por cliente, faturamento mensal e ocupação de galpões. Os gráficos oferecem insights rápidos sobre o desempenho (SLA últimos 30 dias comparando clientes, faturamento por cliente com tendências) e distribuição de carga por região, permitindo tomar decisões operacionais imediatas.

Painel lateral de alertas destaca problemas críticos (SLA baixo em FarmaVida, problema operacional em 26-abr) em tempo real, facilitando priorização de ações corretivas. Ideal para gerentes operacionais que precisam de um snapshot completo da operação a cada manhã.

---

## 🗺️ Mapa da Frota (/mapa)
**Localização e Status de Todos os Caminhões**

Visualização geográfica de todos os 20 caminhões em operação com status codificado por cor: verde (em rota), azul (carregando), amarelo (parado), vermelho (ocorrência), cinza (manutenção) e roxo (disponível). Caminhões em rota se movem continuamente ao longo de 5 rotas principais reais (SP→Campinas, SP→RJ, SP→BH, SP→Linhares, SP→Ribeirão).

Clique em qualquer caminhão para ver detalhes completos: placa, motorista, origem, destino, status da carga. Essencial para rastreamento de frota, resolução de problemas operacionais e comunicação com clientes sobre ETA.

---

## 📦 Cargas (/cargas)
**Gestão de Todas as Entregas — Origem a Destino**

Lista completa de 30 cargas com filtros por cliente, status e data. Cada linha mostra: CTe, cliente, origem→destino, motorista/caminhão, valor, ETA e status atual. Clique em qualquer carga para ver timeline visual detalhado (coletada → galpão → rota → entrega → entregue) e histórico de ocorrências.

Oferece visibilidade total da operação de ponta a ponta, facilitando rastreamento de cargas específicas, resolução de problemas e comunicação com clientes. Útil para supervisores operacionais e atendimento ao cliente.

---

## 🚚 Frota (/frota)
**Status de Saúde e Manutenção dos 20 Caminhões**

Tabela de todos os 20 caminhões mostrando: apelido, cor/marca, placa, ano, status atual e motorista atribuído. Clique em qualquer caminhão para abrir checklist visual de manutenção com 12 itens codificados por semáforo (verde=ok, amarelo=atenção, vermelho=crítico): pastilhas, pneus, revisão, óleo, água, suspensão, lights, documentação, tacógrafo, etc.

Mantém rastreamento de saúde da frota, identifica necessidades de manutenção preventiva e corretiva. Crítico para evitar paradas inesperadas, acidentes e multas regulatórias.

---

## 👤 App Motorista (/motorista)
**Simulação de App Mobile para Entregadores**

Frame de iPhone mostrando 5 telas do app que motoristas usam diariamente: (1) **Hoje** — lista de 7 entregas pendentes com status visual; (2) **Detalhe** — endereço, contato, observações; (3) **Confirmar** — canvas de assinatura + foto da entrega; (4) **Ocorrência** — formulário rápido (avaria/recusa/ausente); (5) **Checklist** — saúde do veículo.

Demonstra experiência mobile intuitiva para campo, aumentando adoção entre motoristas. Foco em confirmação rápida de entregas, registro de problemas e checklist de segurança — reduzindo retrabalho e melhorando compliance.

---

## 👥 Clientes (/clientes)
**Performance e Histórico de Cada Cliente Principal**

5 abas, uma para cada cliente (NutriPlus, FarmaVida, Magazine Estrela, MetalSul, ShopExpress). Clique em qualquer cliente para ver: segmento, volume/mês, KPIs (SLA %, entregas no prazo, faturamento, ocorrências), gráfico de SLA últimos 30 dias e tabela de entregas do mês com status.

Permite vendedores e account managers monitorar saúde de cada relacionamento, identificar clientes em risco (SLA baixo), propor melhorias e comunicar valor agregado. Ideal para relatórios periódicos ao cliente.

---

## 🏢 Galpões (/galpoes)
**Ocupação e Produtividade dos 3 Centros de Distribuição**

3 cards grandes (um por galpão: Guarulhos, Embu das Artes, Campinas), mostrando: ocupação atual (%), docas em uso, cargas aguardando, produtividade do dia (entregas/hora), e mini-indicator visual de capacidade. Tudo em tempo real.

Ajuda planejadores de logística a evitar gargalos (galpão cheio), otimizar uso de docas, e antecipar necessidade de turnos extras. Crítico em operações de pico (festas, black friday).

---

## 💰 Financeiro (/financeiro)
**Receita, Custos e Lucratividade por Cliente e Rota**

Dashboard financeiro com 4 seções: (1) **Faturamento por Cliente** — ranking de receita dos últimos 6 meses; (2) **Contas a Receber** — CTes em aberto, vencimento, dias de atraso; (3) **Custo por Viagem** — top 7 rotas mais caras/lucrativas com km, custo médio, margem; (4) **Margem por Rota** — lucratividade detalhada.

Completa a visão operacional com análise financeira: identifica clientes e rotas mais lucrativos, monitora saúde de caixa (atrasos de clientes), e otimiza precificação. Essencial para diretores financeiros e gestores de operação.

---

## 📋 Resumo das 9 Telas

| Página | Público | Propósito | Ação Principal |
|--------|---------|----------|---|
| **Dashboard** | Gerentes/Diretores | Visão executiva diária | Exportar relatório |
| **Mapa** | Supervisores | Rastreamento de frota | Clicar caminhão para detalhe |
| **Cargas** | Operadores/Atend. Cliente | Rastreamento de entregas | Clicar carga para timeline |
| **Frota** | Manutenção/Supervisores | Saúde dos veículos | Clicar caminhão para checklist |
| **App Motorista** | Motoristas/Desenvolvedores | App mobile para campo | Navegar entre 5 telas |
| **Clientes** | Vendedores/Account Mgrs | Performance por cliente | Clicar cliente para detalhe |
| **Galpões** | Planejadores Logísticos | Ocupação de centros | Visualizar capacidade |
| **Financeiro** | Diretores/Controllers | Receita e margem | Analisar lucratividade |

