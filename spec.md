# LookLab V1 - Especificação Completa

## Visão Geral
LookLab é um totem digital para lojas de moda que transforma peças individuais em looks completos. O cliente filtra por gênero e categoria, escolhe uma peça específica e vê instantaneamente todas as combinações possíveis, facilitando a decisão de compra e aumentando o ticket médio.

**Objetivo V1**: Protótipo funcional rodando local, sem backend, demonstrando o valor da solução para piloto na Aéropostale.

## Stack Técnica
- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + Framer Motion (animações)
- **Data**: JSON local simulando estrutura de banco relacional
- **Images**: Flexível (local paths ou URLs)
- **Deploy**: Build estático para totem (kiosk mode)

## Arquitetura de Dados

### Estrutura JSON (Simula Banco Relacional)
```json
// /public/data/database.json - Estrutura completa
{
  "pecas": [
    {
      "id": 1,
      "codigo_looklab": 1,
      "codigo_aero": "555555",
      "nome_peca": "Polo Manga Curta",
      "departamento": "masculino", // "masculino" | "feminino"
      "categoria_interna": "Polo m/c",
      "classificacao": "POLO", // Para filtros de categoria
      "subcategoria": "Piquet",
      "cor": "Branca",
      "grade": "P AO GG",
      "tamanho": "M",
      "quantidade": 1,
      "tem_imagem": true,
      "nome_imagem": "imgpolo.png",
      "preco_pdv": 169.99,
      "status_looklab": "Ativo", // "Ativo" | "Inativo"
      "criado_em": "2024-01-15T10:30:00Z",
      "atualizado_em": "2024-01-15T10:30:00Z"
    }
  ],
  "looks": [
    {
      "id": 1,
      "look_id": "LOOK_001",
      "nome_look": "Casual Weekday",
      "estilo_tag": "casual", // "casual" | "trabalho" | "noite" | "básico" | "tendência"
      "descricao": "Perfeito para dia a dia na rua",
      "imagem_hero": "look_001_hero.jpg", // opcional
      "ativo": true,
      "criado_em": "2024-01-15T10:30:00Z",
      "atualizado_em": "2024-01-15T10:30:00Z"
    }
  ],
  "looks_pecas": [
    {
      "id": 1,
      "look_id": 1, // FK para looks.id
      "peca_id": 1, // FK para pecas.id
      "posicao": 1 // Ordem de apresentação
    }
  ],
  "configuracoes": {
    "marca": {
      "nome": "Aéropostale",
      "cores": {
        "navy": "#0B1F3B",
        "skyBlue": "#3AA7FF", 
        "offWhite": "#F7F8FA",
        "charcoal": "#111827"
      }
    },
    "ui": {
      "sessionTimeout": 120000,
      "enableFeedback": true
    },
    "categorias": {
      "masculino": [
        "CAMISETA", "POLO", "CAMISA", "CALÇA", "BERMUDA", 
        "MOLETOM", "JAQUETA", "CALÇADOS", "ACESSÓRIOS"
      ],
      "feminino": [
        "CAMISETA", "BLUSAS", "REGATA", "CALÇA", "VESTIDO", 
        "CAMISA", "SHORTS", "SAIA", "MOLETOM", "POLO", 
        "JAQUETA", "CALÇADOS"
      ]
    }
  }
}
```

## Fluxo Completo do Usuário

### 1. Seleção de Gênero
**Layout**: Dois botões grandes centralizados
**Componentes**:
- Header com logo Aéropostale
- Botão "MASCULINO" 
- Botão "FEMININO"
- Footer discreto com marca LookLab

**Comportamento**:
- Touch feedback nos botões
- Transição suave para próxima tela
- Auto-reset após timeout de inatividade

### 2. Seleção de Categoria
**Layout**: Grid horizontal de categorias
**Componentes**:
- Botão voltar (seta + "Voltar")
- Grid de cards de categoria com ícones
- Título: "Escolha uma categoria" 

**Comportamento**:
- Categorias ordenadas por importância (Camiseta, Polo, Camisa...)
- Cards responsivos com hover effects
- Transição slide para listagem de peças

### 3. Listagem de Peças (NOVA TELA PRINCIPAL)
**Layout**: Grid com filtros laterais/superiores
**Componentes**:
- **Header fixo**:
  - Botão voltar
  - Categorias horizontais (troca rápida)
  - Botão filtros (ícone funil)
- **Área de filtros** (expansível):
  - Filtro de cor (chips coloridos)
  - Filtro de preço (faixas: Até R$100, R$100-200, R$200+)
  - Filtro de tamanho (P, M, G, GG)
  - Filtro de subcategoria (se aplicável)
- **Grid de peças**: 
  - Cards 3-4 colunas
  - Imagem + nome + cor + preço
  - Counter: "X peças encontradas"

**Comportamento**:
- Loading skeleton durante filtros
- Filtros aplicados em tempo real
- Empty state se nenhuma peça
- Scroll infinito ou paginação se >50 peças

### 4. Lista de Looks (Resultado da Peça)
**Layout**: Lista vertical de looks
**Componentes**:
- Botão voltar fixo
- Header: "Looks com [Nome da Peça]"
- Filtros por estilo (casual, trabalho, noite)
- Cards de looks com preview das peças
- Counter: "X looks encontrados"

**Comportamento**:
- Cards mostram 2-3 peças principais do look
- Transição slide-in vindo da direita
- Filtros por estilo_tag persistem

### 5. Modal de Detalhe do Look
**Layout**: Modal sobreposto (não fullscreen)
**Componentes**:
- Overlay escuro
- Modal centralizado (80% da tela)
- Header: nome do look + botão fechar (X)
- Imagem hero do look (se disponível)
- Lista horizontal das peças com scroll
- Preço total calculado
- CTA "Complete o Look" (placeholder V1)

**Comportamento**:
- Fade + scale animation
- Swipe para fechar (opcional)
- Touch outside para fechar
- Carrossel das peças com dots indicator

### 6. Feedback Modal
**Layout**: Modal simples sobreposto
**Componentes**:
- "Isso te ajudou a decidir?"
- Rating 1-5 estrelas 
- Campo comentário (opcional)
- Botões: "Enviar" / "Pular"

**Comportamento**:
- Aparece após 2min de inatividade OU ao tentar sair
- Salva no localStorage
- Auto-dismiss após submit
- Agradecimento + volta para início

## Especificações de UX (Nível iPhone)

### Visual Design
**Paleta da Aéropostale**: 
- Primária: Navy (#0B1F3B) + Sky Blue (#3AA7FF)
- Neutros: Off-white (#F7F8FA) + Charcoal (#111827)

**Typography**: 
- Display: Inter Bold (títulos e categorias)
- Body: Inter Regular (textos e labels)

**Cards & Components**:
- Border-radius: 16px (iOS-like)
- Shadows: soft, layered (0px 4px 20px rgba(0,0,0,0.1))
- Touch targets: mínimo 44px para conforto
- Spacing: 8px, 16px, 24px, 32px (scale consistente)

### Navegação Otimizada para Totem
**Botão Voltar**:
- Posição: Header esquerda, sempre visível
- Design: Seta + texto "Voltar" 
- Tamanho: 44px mínimo touch target
- Estado: Sempre habilitado (exceto tela inicial)

**Breadcrumbs**: NÃO usar - confunde em totem
**Gestos**: Swipe para voltar (opcional para V1)

### Animations (Framer Motion)
**Page Transitions**:
- Gênero → Categoria: slide left
- Categoria → Listagem: slide left  
- Listagem → Looks: slide left
- Look modal: fade + scale up from center
- Voltar: slide right (reverso)

**Micro-interactions**:
- Card hover: scale(1.02) + lift shadow
- Button press: scale(0.98) + haptic feedback
- Filter apply: subtle bounce
- Loading: skeleton shimmer

**Performance**:
- Todas animações 60fps
- Duração: 200-300ms (rápido mas suave)
- Easing: iOS-like (ease-out)

### Sistema de Filtros Avançado

**Filtros Disponíveis**:
1. **Cor**: 
   - Chips visuais com cor real
   - Multi-select permitido
   - Cores mais comuns primeiro
2. **Preço**:
   - Faixas predefinidas: "Até R$ 100", "R$ 100-200", "R$ 200+"
   - Single select
3. **Tamanho**:
   - Chips: P, M, G, GG
   - Multi-select permitido
4. **Subcategoria** (quando aplicável):
   - Ex: Camiseta → Básica, Estampada, Manga Longa
   - Definido por subcategoria no JSON

**UI dos Filtros**:
- Drawer expansível no topo (mobile-like)
- Aplicação em tempo real (sem botão "Aplicar")
- Counter de itens ativos: "Filtros (3)"
- Reset rápido: "Limpar filtros"
- Persistent state durante sessão

### Lógica de Dados e Relacionamentos

**Queries Principais** (em JavaScript, simulando SQL):

```javascript
// Q1: Peças por gênero e categoria
function getPecasByGeneroCategoria(genero, categoria) {
  return database.pecas.filter(peca => 
    peca.departamento === genero && 
    peca.classificacao === categoria &&
    peca.status_looklab === 'Ativo' &&
    peca.tem_imagem === true
  );
}

// Q2: Looks que contém uma peça específica  
function getLooksByPeca(pecaId) {
  const looksPecas = database.looks_pecas.filter(lp => lp.peca_id === pecaId);
  const lookIds = looksPecas.map(lp => lp.look_id);
  return database.looks.filter(look => 
    lookIds.includes(look.id) && 
    look.ativo === true
  );
}

// Q3: Detalhes completos de um look
function getLookDetalhes(lookId) {
  const look = database.looks.find(l => l.id === lookId);
  const looksPecas = database.looks_pecas
    .filter(lp => lp.look_id === lookId)
    .sort((a, b) => a.posicao - b.posicao);
  
  const pecas = looksPecas.map(lp => 
    database.pecas.find(p => p.id === lp.peca_id)
  );
  
  const precoTotal = pecas.reduce((sum, peca) => sum + peca.preco_pdv, 0);
  
  return { ...look, pecas, precoTotal };
}
```

### Estrutura de Componentes React

```
src/
├── components/
│   ├── ui/                     # Componentes base
│   │   ├── Button.jsx
│   │   ├── Card.jsx  
│   │   ├── Modal.jsx
│   │   ├── Filter.jsx
│   │   └── LoadingSkeleton.jsx
│   ├── navigation/
│   │   ├── Header.jsx
│   │   ├── BackButton.jsx
│   │   └── CategoryTabs.jsx
│   ├── filters/
│   │   ├── FilterDrawer.jsx
│   │   ├── ColorFilter.jsx
│   │   ├── PriceFilter.jsx
│   │   ├── SizeFilter.jsx
│   │   └── FilterChips.jsx
│   ├── pecas/
│   │   ├── PecaGrid.jsx
│   │   ├── PecaCard.jsx
│   │   └── PecaCounter.jsx
│   └── looks/
│       ├── LookList.jsx
│       ├── LookCard.jsx
│       ├── LookModal.jsx
│       └── LookPreview.jsx
├── pages/
│   ├── GeneroSelect.jsx        # Tela 1: Masc/Fem
│   ├── CategoriaSelect.jsx     # Tela 2: Grid categorias  
│   ├── PecaListagem.jsx       # Tela 3: Lista + filtros
│   ├── LookResults.jsx        # Tela 4: Looks da peça
│   └── FeedbackModal.jsx      # Tela 5: Rating
├── hooks/
│   ├── useDatabase.js         # Carrega JSON + queries
│   ├── useFilters.js          # Estado dos filtros
│   ├── useNavigation.js       # História de navegação
│   └── useAnalytics.js        # Tracking de eventos
└── utils/
    ├── dataHelpers.js         # Funções de query
    ├── analytics.js           # Eventos + localStorage
    └── constants.js           # Categorias, cores, etc
```

## Métricas e Analytics

### Tracking Local Expandido
```json
{
  "sessoes": [
    {
      "id": "session_uuid",
      "timestamp_inicio": "2024-01-15T10:30:00Z",
      "timestamp_fim": "2024-01-15T10:32:00Z", 
      "duracao_ms": 120000,
      "genero_selecionado": "masculino",
      "interacoes": [
        {
          "tipo": "genero_click",
          "valor": "masculino",
          "timestamp": "2024-01-15T10:30:05Z"
        },
        {
          "tipo": "categoria_click", 
          "valor": "CAMISETA",
          "timestamp": "2024-01-15T10:30:10Z"
        },
        {
          "tipo": "filtro_aplicado",
          "filtro": "cor",
          "valor": ["Branca", "Preta"],
          "timestamp": "2024-01-15T10:30:15Z"
        },
        {
          "tipo": "peca_click",
          "peca_id": 1,
          "timestamp": "2024-01-15T10:30:20Z"
        },
        {
          "tipo": "look_view",
          "look_id": "LOOK_001", 
          "timestamp": "2024-01-15T10:30:25Z"
        },
        {
          "tipo": "look_modal_open",
          "look_id": "LOOK_001",
          "timestamp": "2024-01-15T10:30:30Z"
        }
      ],
      "feedback": {
        "rating": 4,
        "comentario": "Muito útil!",
        "timestamp": "2024-01-15T10:31:45Z"
      }
    }
  ],
  "estatisticas": {
    "total_sessoes": 45,
    "duracao_media": 95000,
    "categoria_mais_vista": "CAMISETA", 
    "filtro_mais_usado": "cor",
    "rating_medio": 4.2
  }
}
```

### KPIs Específicos do Fluxo
- **Conversão por etapa**: Gênero → Categoria → Listagem → Peça → Look → Modal
- **Abandono por filtro**: Quantos saem após aplicar filtros
- **Peças mais clicadas**: Por categoria e por cor
- **Looks mais visualizados**: Efetividade da curadoria
- **Tempo por tela**: Identificar gargalos

## Comportamentos Especiais

### Error Handling Robusto
- **Peça sem looks**: "Ainda estamos criando looks para esta peça" + sugerir peças similares
- **Categoria vazia**: "Peças em breve" + redirecionar para categoria popular
- **Load failure**: Retry automático + offline message
- **Filtro sem resultado**: "Nenhuma peça encontrada" + sugerir remover filtros

### Performance e Otimizações
- **Images**: Lazy loading + WebP + placeholder
- **Virtual scrolling**: Se grid > 100 peças
- **Debounced filters**: 300ms delay para evitar spam
- **Preload estratégico**: Próxima categoria durante hover
- **Bundle splitting**: Lazy load modais e filtros

### Acessibilidade e Kiosk
- **Touch feedback**: Visual + haptic em todos botões
- **Focus management**: Tab navigation funcional
- **Auto-reset**: 2min inatividade → volta para gênero
- **Prevent interactions**: Right-click, F12, text selection
- **Screen reader**: ARIA labels completos

## Arquitectura V2+ (Preparação)

### Evolução para Backend Real
**V1 → V2 Migration Path**:
1. **Hook useDatabase**: Trocar JSON local por API calls
2. **Estrutura mantida**: Mesmos campos, mesma lógica
3. **Endpoint mapping**: 
   - `GET /api/pecas?genero=masculino&categoria=CAMISETA`
   - `GET /api/looks?peca_id=123`
   - `GET /api/looks/{look_id}/detalhes`

**Dados que ficam locais**:
- Configurações de marca (cores, logos)
- Cache de imagens e assets
- Analytics (até sincronização)

**Dados que migram para API**:
- Catálogo de peças (dinâmico)
- Looks curados (atualizações frequentes)
- Estoque real (integração ERP)

## Mock Data para Desenvolvimento

### Exemplo Completo de Peças (Aéropostale)
```json
{
  "pecas": [
    // Masculino - Camisetas
    {
      "id": 1, "codigo_looklab": 1, "codigo_aero": "CM001",
      "nome_peca": "Camiseta Básica Branca", "departamento": "masculino",
      "categoria_interna": "Básica", "classificacao": "CAMISETA",
      "subcategoria": "Algodão", "cor": "Branca", "tamanho": "M",
      "quantidade": 10, "preco_pdv": 49.99, "tem_imagem": true,
      "nome_imagem": "cm001_branca.jpg", "status_looklab": "Ativo"
    },
    {
      "id": 2, "codigo_looklab": 1, "codigo_aero": "CM001", 
      "nome_peca": "Camiseta Básica Branca", "departamento": "masculino",
      "categoria_interna": "Básica", "classificacao": "CAMISETA",
      "subcategoria": "Algodão", "cor": "Branca", "tamanho": "G",
      "quantidade": 8, "preco_pdv": 49.99, "tem_imagem": true,
      "nome_imagem": "cm001_branca.jpg", "status_looklab": "Ativo"
    },
    // Feminino - Vestidos
    {
      "id": 50, "codigo_looklab": 25, "codigo_aero": "VT001",
      "nome_peca": "Vestido Floral", "departamento": "feminino",
      "categoria_interna": "Casual", "classificacao": "VESTIDO", 
      "subcategoria": "Viscose", "cor": "Azul", "tamanho": "M",
      "quantidade": 5, "preco_pdv": 129.99, "tem_imagem": true,
      "nome_imagem": "vt001_azul.jpg", "status_looklab": "Ativo"
    }
  ],
  "looks": [
    {
      "id": 1, "look_id": "LOOK_001", "nome_look": "Casual Urbano",
      "estilo_tag": "casual", "descricao": "Perfeito para o dia a dia",
      "imagem_hero": "look001_hero.jpg", "ativo": true
    }
  ],
  "looks_pecas": [
    {"id": 1, "look_id": 1, "peca_id": 1, "posicao": 1},
    {"id": 2, "look_id": 1, "peca_id": 15, "posicao": 2},
    {"id": 3, "look_id": 1, "peca_id": 30, "posicao": 3}
  ]
}
```

## Critérios de Sucesso V1

### Funcionais
- [ ] Cliente navega Gênero → Categoria → Peça → Look em < 30s
- [ ] Filtros aplicam resultado em < 2s
- [ ] Modal do look carrega detalhes completos
- [ ] Botão voltar funciona em todas as telas
- [ ] Funciona offline (dados locais)

### Performance  
- [ ] Bundle otimizado < 1MB
- [ ] First paint < 1s
- [ ] Animações 60fps consistente
- [ ] Touch response < 100ms

### Experiência
- [ ] Qualquer pessoa entende fluxo em 15s
- [ ] Zero frustração em filtros
- [ ] Sensação nativa iOS-like
- [ ] Recuperação de erro intuitiva

### Analytics
- [ ] Tracking completo de todas interações
- [ ] Export de dados JSON funcional
- [ ] KPIs calculados automaticamente
- [ ] Feedback modal funcional

---

**Este spec serve como referência completa para implementação no Claude Code. Documenta tanto a estrutura V1 (JSON local) quanto a evolução para V2+ (backend real), garantindo que o protótipo seja rapidamente validável mas arquiteturalmente sólido para escalar.**
