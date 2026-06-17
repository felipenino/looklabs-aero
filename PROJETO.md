# LookLab — Aéropostale (Piloto)

> Documento mestre do projeto. Escrito para que **qualquer pessoa ou IA** entenda do que se trata,
> onde está cada coisa e como tudo evoluiu. Última atualização: **15/06/2026**.

---

## 1. O que é

**LookLab** é um **totem digital touchscreen** para lojas da **Aéropostale**. O cliente, dentro da loja,
escolhe uma peça e vê instantaneamente **looks completos** montados com aquela peça — transformando peças
soltas em combinações prontas. Objetivo de negócio: facilitar a decisão de compra e **aumentar o ticket médio**.

- **Formato:** web app fullscreen, modo quiosque, pensado para **iPad / totem** (touch-first).
- **Produção:** https://looklabs-aero.netlify.app
- **Estado atual:** piloto **masculino + feminino** com dados reais — **1.193 looks** (909 masc + 284 fem).

### Fluxo do usuário (3 telas)
1. **`/`** — redireciona direto para `/pecas` (persona Masculino + 1ª categoria).
2. **`/pecas`** — catálogo: toggle Feminino/Masculino, régua de categorias (círculos), filtros (cor/preço),
   grade de peças. O cliente toca numa peça.
3. **`/looks`** — carrossel de looks reais que usam a peça escolhida. Cada look é um **flatlay em grade 2×2**
   (camiseta, camada de cima, calça/bermuda, calçado). Widget de "gostou?" no rodapé.

---

## 2. Stack técnica

| Camada | Tecnologia |
|--------|-----------|
| Framework | **Next.js 16.1.6** (App Router, Turbopack) |
| UI | **React 19**, **Tailwind CSS v4**, Radix UI / shadcn |
| Fonte | Geist Sans |
| Dados (atual) | **Arquivo estático gerado** `src/lib/real-data.ts` (sem backend em runtime) |
| Dados (legado) | Supabase (cliente ainda existe em `src/lib/supabase/`, não usado pelas telas) |
| Deploy | **Netlify** (auto-build no push pra `main`) |
| Geração de dados | Script Python `scripts/gen_real_data.py` |

### Identidade visual
- Navy `#0B1F3B` · Sky Blue `#3AA7FF` · Off-white `#F7F8FA` · Charcoal `#111827`
- Cards com cantos arredondados (16px+), sombras suaves, touch targets ≥ 44px, sem hover (usa `active:scale`).

---

## 3. Onde está o projeto

- **Projeto real (código + assets):** `/Users/jusbrasil/Documents/Drive/aero-looks-piloto`  ← **este aqui**
- **Pasta no Dropbox** (`/Users/jusbrasil/Dropbox/aero-looks-piloto`): resíduo antigo/quase vazio. **Ignorar.**

### Git / Deploy
- Repositório de produção: **`github.com/felipenino/looklabs-aero`** (branch `main`).
- ⚠️ O remote `origin` local aponta **errado** para `git@github.com:felipenino/translife.git` (resíduo).
  O deploy é feito pelo remote **`looklab`** (→ `felipenino/looklabs-aero`). Push em `looklab main` = deploy.
- Netlify site id: `e1c9be5d-e755-46dd-bb00-4ba3db6f8662` · usuário `go@felipenino.com`.

---

## 4. Estrutura de pastas

### 4.1 Código da aplicação — `src/`

```
src/
├── app/
│   ├── page.tsx              # Home: redireciona p/ /pecas (Masculino + Camiseta)
│   ├── pecas/page.tsx        # TELA 2 — catálogo: gênero, categorias, filtros, grade de peças
│   ├── looks/page.tsx        # TELA 3 — carrossel de looks reais da peça escolhida
│   ├── layout.tsx            # layout raiz, fonte, metadata
│   ├── globals.css           # Tailwind v4 (@theme), cores da marca, animação flatlay-enter
│   └── favicon.ico
│
├── components/
│   ├── gender-toggle.tsx     # toggle Feminino/Masculino
│   ├── category-circle.tsx   # círculo de categoria (imagem + nome)
│   ├── piece-card.tsx        # card de peça na grade (imagem responsiva)
│   ├── filter-bar.tsx        # barra de filtros (cores + faixas de preço) — derivada dos dados reais
│   ├── filter-chip.tsx       # chip individual (cor ou texto)
│   ├── focus-rail.tsx        # carrossel custom (item central grande, vizinhos com blur) p/ looks
│   ├── look-overlay.tsx      # composição do look em GRADE 2x2 (slots 1-4)
│   ├── feedback-widget.tsx   # "gostou desse look?" (like/dislike)
│   ├── category-card.tsx, persona-card.tsx, top-nav.tsx  # componentes legados/auxiliares
│   └── ui/                   # primitivos shadcn (button, card, dialog, skeleton, toggle, etc.)
│
├── lib/
│   ├── real-data.ts          # ★ DADOS REAIS gerados (peças + looks). Consumido pelas telas. NÃO editar à mão.
│   ├── mock-data.ts          # dados fake antigos (legado, não usado pelas telas atuais)
│   ├── constants/
│   │   ├── personas.ts       # Masculino/Feminino + UUIDs fixos
│   │   ├── categories.ts     # categorias + UUIDs + imagem do círculo por gênero
│   │   └── colors.ts         # ★ famílias de cor + colorFamilyKey() p/ filtro de cor real
│   ├── hooks/
│   │   ├── use-filters.ts    # estado dos filtros (cores[], precoRange)
│   │   ├── use-inactivity-timeout.ts  # reset por inatividade (modo quiosque)
│   │   └── use-session.ts    # tracking de sessão (legado/Supabase)
│   ├── supabase/client.ts    # cliente Supabase (LEGADO — telas não usam mais)
│   └── utils.ts              # cn() etc.
│
└── types/database.ts         # tipos (Piece, Look, LookDetailFull, ...)
```

### 4.2 Imagens servidas — `public/`

```
public/images/
├── pecas-real/      # ★ 248 PNGs das peças usadas nos looks. Nome = <SKU>.<hash>.png (cache-busting)
├── categorias/      # ícones dos círculos de categoria (masc/ e fem/)
└── personas/        # imagens de persona
```

### 4.3 Geração de dados — `scripts/`

```
scripts/
├── gen_real_data.py     # ★ PIPELINE: planilha + CSVs -> src/lib/real-data.ts + copia imagens
├── schema.sql           # schema Supabase (legado)
├── seed.sql             # seed Supabase (legado)
└── migrations/001_add_piece_columns.sql
```

### 4.4 Fontes de dados (entrada do pipeline — NÃO vão pro deploy)

| Caminho | O que é |
|---------|---------|
| `Planilha Looklab + Aero - v1 Piloto-15-junho.xlsx` | **Planilha mestre** (15/jun). Abas MASCULINO/FEMININO/PLUS SIZE. Por SKU: nome, cor, preço (PDV), classificação/categoria, departamento, imagem. |
| `CSV-APROVADOS/looklab_aeropostale-parte1.csv` | 119 looks masculinos (anchor, nome, tag de estilo, peças). |
| `CSV-APROVADOS/looklab_aeropostale-parte2.csv` | 815 looks masculinos (mesmo formato). |
| `CSV-APROVADOS/looklab_aeropostale-feminino.csv` | 317 looks femininos (mesmo formato). |
| `RELATORIO-IMAGENS-FALTANTES.md` | **Gerado pelo pipeline.** Peças sem imagem (masc + fem) p/ cobrar a Aéropostale. |
| `pecas-final-piloto/` | **432 PNGs originais** das peças (recortadas, transparentes), nomeados por SKU. Fonte das imagens. **~280 MB — fora do git.** |
| `pecas-final-piloto-original/` | versões originais (backup). Fora do git. |
| Planilhas v1/v2, `categorias masc/`, `imgs-pre/`, `pecas-*` | materiais de trabalho / versões anteriores. |
| `looklab_*.py`, `pre_approve.py` (raiz) | scripts auxiliares antigos de exportação/geração. |
| `spec.md` | especificação original do produto (visão V1). |

---

## 5. Modelo de dados e regras (como o look é montado)

Cada **look** = peça **âncora** (a que o cliente escolheu) + complementos. A **posição da peça no look NÃO vem
da ordem do CSV** — vem da **categoria** da peça. Grade 2×2:

| Slot | Posição na grade | Categorias |
|------|------------------|-----------|
| **1** | topo-esquerda | CAMISETA, POLO (base) |
| **2** | topo-direita | MOLETOM, JAQUETA, e CAMISA *(quando há base no look)* |
| **3** | baixo-direita | CALÇADOS |
| **4** | baixo-esquerda | CALÇA, BERMUDA, SHORTS, SAIA |

> Regra da camisa: se o look tem camiseta/polo, a **camisa** é camada de cima (slot 2); se a camisa é a âncora
> sem base, ela vira a base (slot 1). Com essa regra: **0 colisões** nos 936 looks.

### Mapeamento Classificação (planilha) → Categoria do app
- CAMISETA → Camiseta · POLO/CAMISA → Top/Blusa · CALÇA → Calça/Jeans · BERMUDA → Bermuda
- MOLETOM **e** JAQUETA → **Moletom / Jaqueta** (categoria unificada, ícone de jaqueta) · CALÇADOS → Acessório
- **SHORTS** (feminino) → categoria **Bermuda** · **SAIA** → categoria **Saia**

### Filtros (derivados dos dados reais, por categoria)
- **Cor:** famílias (`colors.ts`) inferidas dos valores reais ("Azul marinho", "Blue jeans" → família *azul*). Só
  mostra as cores presentes na categoria.
- **Preço:** faixas até R$100 / R$100–200 / +R$200 — só mostra faixas que têm peça.

---

## 6. O pipeline de dados (como regenerar)

```bash
cd /Users/jusbrasil/Documents/Drive/aero-looks-piloto
python3 scripts/gen_real_data.py
```

O script:
1. Lê a planilha (aba MASCULINO) → SKU → {nome, cor, preço, classificação}.
2. Lê os 2 CSVs → looks (anchor, nome, tag, peças).
3. **Resolver de imagem:** acha `<SKU>.png` em `pecas-final-piloto/`; se não houver, usa a 1ª variante de cor
   (`<SKU>-*.png`). Recupera ~97% dos looks.
4. Atribui **slots por categoria** (regra acima); descarta looks com peça sem imagem.
5. Copia as imagens p/ `public/images/pecas-real/` com **hash de conteúdo no nome** (`<SKU>.<hash>.png`) e
   **remove variantes antigas** (evita imagem velha "grudada" em cache).
6. Emite `src/lib/real-data.ts` com `getRealPieces()`, `getRealCategoryIds()`, `getRealLooksForPiece()`.

**Resultado atual:** 1.193 looks (909 masc + 284 fem) · 316 peças-âncora · 336 imagens.
O pipeline processa as 3 fontes (2 CSVs masc + 1 fem) e gera o `RELATORIO-IMAGENS-FALTANTES.md`.

### Pendências conhecidas (deixadas para depois)
- **2 peças sem imagem** (ver relatório): masc `8780911-4` (jaqueta, 27 looks) e fem `9841219` (calça, 33 looks)
  → looks descartados. Aéropostale precisa enviar as imagens.
- Alguns PNGs de origem vêm como **placeholder "TESTE PEÇA"** (peças e 2 ícones de categoria feminina:
  Saia e Moletom/Jaqueta). É conteúdo a substituir, não bug.
- **Cor oficial:** o resolver usa a 1ª variante de cor quando o SKU base não tem arquivo exato. Idealmente
  receber um mapa de "cor oficial" por peça.
- Gravação de **feedback** está stubada (só avança o look) — religar a um backend depois.

---

## 7. Histórico de evolução

| Data | Commit | O que mudou |
|------|--------|-------------|
| 2026-02-17 | `00cf29a` | Initial commit (Create Next App). |
| 2026-02-18 | `6a4a431` | Primeira versão do piloto. |
| 2026-02-18 | `26ab92c` | Remove rodapé, corrige overflow no iPad. |
| 2026-03-25 | `63782c4` | **Redesign completo de UX**: peças com fotos reais, filtros, gender toggle. |
| 2026-03-25 | `638122b` | 4 looks com peças reais, correção de z-index, novas peças. |
| 2026-03-28 | `c510b07` | Atualiza imagens das categorias masculinas. |
| 2026-03-28 | `abeae4c` | Filtros de cor (fake) na camiseta masculina. *(versão que rodou em produção até jun/26)* |
| 2026-06-15 | `71b1380` | **Dados reais masculinos (planilha + CSV):** 909 looks / 236 peças. Look em grade 2×2 (fim da sobreposição). Grade responsiva (máx. 6 col). Categorias Moletom+Jaqueta unificadas. Filtros de cor/preço com dados reais. Imagens com hash. |
| **2026-06-15** | _(este deploy)_ | **Feminino populado:** +317 looks femininos (shorts→Bermuda, saia→Saia). Pipeline multi-gênero (persona por aba). Relatório de imagens faltantes (masc+fem). Total **1.193 looks / 316 peças**. → **deploy atual em produção**. |

### Marcos da sessão de 15/06/2026 (detalhe)
- Localização do projeto real (estava no Drive, não no Dropbox).
- Decodificação dos CSVs + planilha; definição da regra de slots por categoria.
- Geração dos dados reais e troca da fonte Supabase → `real-data.ts`.
- Ajustes de UX: grade 2×2 do look; grade de peças responsiva máx. 6 colunas.
- Unificação Moletom + Jaqueta (com correção: 1ª tentativa unificou errado Top/Blusa).
- Filtros de cor/preço passaram a funcionar com dados reais.
- Atualização de imagem + introdução do **cache-busting por hash no nome do arquivo**.
- Build validado e **deploy em produção** (Netlify).

---

## 8. Rodar localmente

```bash
cd /Users/jusbrasil/Documents/Drive/aero-looks-piloto
npm install          # primeira vez
npm run dev          # http://localhost:3000
npm run build        # validar build de produção
```

> O `.claude/launch.json` (preview do Claude Code) aponta para este diretório.

## 9. Deploy

```bash
cd /Users/jusbrasil/Documents/Drive/aero-looks-piloto
# remote correto já configurado como "looklab"
git add src public/images/pecas-real scripts/gen_real_data.py
git commit -m "..."
git push looklab main      # Netlify builda automaticamente
```

Acompanhar: `netlify api listSiteDeploys --data '{"site_id":"e1c9be5d-e755-46dd-bb00-4ba3db6f8662","per_page":1}'`

> **Não commitar** `pecas-final-piloto/`, `pecas-final-piloto-original/`, planilhas `.xlsx` (fontes pesadas).
> O app em runtime só precisa de `src/lib/real-data.ts` + `public/images/pecas-real/`.
