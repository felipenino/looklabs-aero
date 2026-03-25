import type { Piece } from "@/types/database";
import type { LookDetailFull } from "@/types/database";

// ============================================
// PERSONA & CATEGORY IDs
// ============================================
const MASC_PERSONA = "a1b2c3d4-0001-4000-8000-000000000001";
const FEM_PERSONA = "a1b2c3d4-0001-4000-8000-000000000004";

const CAT_CAMISETA = "b2c3d4e5-0001-4000-8000-000000000001";
const CAT_BLUSA = "b2c3d4e5-0001-4000-8000-000000000002";
const CAT_CALCA = "b2c3d4e5-0001-4000-8000-000000000003";
const CAT_BERMUDA = "b2c3d4e5-0001-4000-8000-000000000004";
const CAT_SAIA = "b2c3d4e5-0001-4000-8000-000000000005";
const CAT_VESTIDO = "b2c3d4e5-0001-4000-8000-000000000006";
const CAT_JAQUETA = "b2c3d4e5-0001-4000-8000-000000000008";
const CAT_MOLETOM = "b2c3d4e5-0001-4000-8000-000000000009";
const CAT_ACESSORIO = "b2c3d4e5-0001-4000-8000-000000000010";

const IMG = "/images/pecas/masc";

// Helper to create a piece
function piece(
  id: string,
  personaId: string,
  categoryId: string,
  imageUrl: string,
  name: string,
  sku: string
): Piece {
  return {
    id,
    persona_id: personaId,
    category_id: categoryId,
    image_url: imageUrl,
    sku,
    name,
    is_active: true,
    cor: null,
    preco_pdv: null,
    tamanho: null,
    grade: null,
    subcategoria: null,
    codigo_aero: null,
    quantidade: null,
    status_looklab: "Ativo",
  };
}

export const MOCK_PIECES: Piece[] = [
  // =============================================
  // MASCULINO — CAMISETAS (37 peças)
  // =============================================
  piece("m-cam-01", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/01-branca.png`, "Camiseta Básica Branca", "87130158-1"),
  piece("m-cam-02", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/02-preta.png`, "Camiseta Básica Preta", "87130158-2"),
  piece("m-cam-03", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/03-cinza.png`, "Camiseta Básica Cinza", "87130158-3"),
  piece("m-cam-04", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/04-branca-a87.png`, "Camiseta A87 Branca", "87130101-1"),
  piece("m-cam-05", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/05-preta-a87.png`, "Camiseta A87 Preta", "87130101-2"),
  piece("m-cam-06", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/06-cinza-a87.png`, "Camiseta A87 Cinza", "87130101-3"),
  piece("m-cam-07", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/07-azul-a87.png`, "Camiseta A87 Azul", "87130101-5"),
  piece("m-cam-08", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/08-verde-a87.png`, "Camiseta A87 Verde", "87130101-7"),
  piece("m-cam-09", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/09-vinho-a87.png`, "Camiseta A87 Vinho", "87130101-8"),
  piece("m-cam-10", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/10-branca-est.png`, "Camiseta Estampada Branca", "87130103-1"),
  piece("m-cam-11", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/11-cinza-est.png`, "Camiseta Estampada Cinza", "87130103-3"),
  piece("m-cam-12", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/12-branca-logo.png`, "Camiseta Logo Branca", "871301266"),
  piece("m-cam-13", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/13-azul-min.png`, "Camiseta Minimalista Azul", "87130140-1"),
  piece("m-cam-14", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/14-preta-min.png`, "Camiseta Minimalista Preta", "87130140-3"),
  piece("m-cam-15", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/15-branca-aero.png`, "Camiseta Aero Branca", "87130155-1"),
  piece("m-cam-16", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/16-preta-aero.png`, "Camiseta Aero Preta", "87130155-2"),
  piece("m-cam-17", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/17-cinza-aero.png`, "Camiseta Aero Cinza", "87130155-3"),
  piece("m-cam-18", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/18-branca-v.png`, "Camiseta V-Neck Branca", "87130161-1"),
  piece("m-cam-19", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/19-tie-dye.png`, "Camiseta Tie-Dye", "87130162-2"),
  piece("m-cam-20", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/20-verde-est.png`, "Camiseta Estampada Verde", "87130162-3"),
  piece("m-cam-21", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/21-bege-est.png`, "Camiseta Estampada Bege", "87130162-4"),
  piece("m-cam-22", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/22-bege.png`, "Camiseta Bege", "87130138-2"),
  piece("m-cam-23", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/23-marinho.png`, "Camiseta Marinho", "87130168"),
  piece("m-cam-24", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/24-laranja.png`, "Camiseta Laranja", "87130171-2"),
  piece("m-cam-25", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/25-preta-silk.png`, "Camiseta Silk Preta", "87130172-1"),
  piece("m-cam-26", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/26-azul-silk.png`, "Camiseta Silk Azul", "87130172-3"),
  piece("m-cam-27", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/27-branca-silk.png`, "Camiseta Silk Branca", "87130173-1"),
  piece("m-cam-28", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/28-azul-perf.png`, "Camiseta Performance Azul", "87130190-1"),
  piece("m-cam-29", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/29-vermelha.png`, "Camiseta Vermelha", "87130190-2"),
  piece("m-cam-30", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/30-branca-perf.png`, "Camiseta Performance Branca", "87130191-1"),
  piece("m-cam-31", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/31-preta-perf.png`, "Camiseta Performance Preta", "87130191-5"),
  piece("m-cam-32", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/32-preta-graf.png`, "Camiseta Gráfica Preta", "87130192"),
  piece("m-cam-33", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/33-cinza-vintage.png`, "Camiseta Vintage Cinza", "87120112-1"),
  piece("m-cam-34", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/34-lavanda.png`, "Camiseta Lavanda", "87120193LV"),
  piece("m-cam-35", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/35-branca-bordada.png`, "Camiseta Bordada Branca", "871301279-1"),
  piece("m-cam-36", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/36-azul-comfort.png`, "Camiseta Comfort Azul", "871101180"),
  piece("m-cam-37", MASC_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/37-branca-silkada.png`, "Camiseta Silkada Branca", "871101372LV"),

  // =============================================
  // MASCULINO — TOP / BLUSA (Polos + Camisa) (6 peças)
  // =============================================
  piece("m-pol-01", MASC_PERSONA, CAT_BLUSA, `${IMG}/polo/01-branca.png`, "Polo Branca", "87133223-200"),
  piece("m-pol-02", MASC_PERSONA, CAT_BLUSA, `${IMG}/polo/02-preta.png`, "Polo Preta", "87133223-400"),
  piece("m-pol-03", MASC_PERSONA, CAT_BLUSA, `${IMG}/polo/03-marinho.png`, "Polo Marinho", "87133223-018"),
  piece("m-pol-04", MASC_PERSONA, CAT_BLUSA, `${IMG}/polo/04-azul.png`, "Polo Azul", "87133223-060"),
  piece("m-pol-05", MASC_PERSONA, CAT_BLUSA, `${IMG}/polo/05-cinza.png`, "Polo Cinza", "87133223-669"),
  piece("m-pol-06", MASC_PERSONA, CAT_BLUSA, `${IMG}/polo/06-camisa-preta.png`, "Camisa Manga Curta Preta", "87110630-2"),

  // =============================================
  // MASCULINO — CALÇA (1 peça)
  // =============================================
  piece("m-cal-01", MASC_PERSONA, CAT_CALCA, `${IMG}/calca/01-chino-bege.png`, "Calça Chino Bege", "87131309-1"),

  // =============================================
  // MASCULINO — BERMUDA (19 peças: bermuda + shorts água)
  // =============================================
  piece("m-ber-01", MASC_PERSONA, CAT_BERMUDA, `${IMG}/bermuda/01-alfaiataria.png`, "Bermuda Alfaiataria", "87137703-1"),
  piece("m-ber-02", MASC_PERSONA, CAT_BERMUDA, `${IMG}/bermuda/02-moletom-azul.png`, "Bermuda Moletom Azul", "87138109"),
  piece("m-ber-03", MASC_PERSONA, CAT_BERMUDA, `${IMG}/bermuda/03-moletom-cinza.png`, "Bermuda Moletom Cinza", "87138111"),
  piece("m-ber-04", MASC_PERSONA, CAT_BERMUDA, `${IMG}/bermuda/04-moletom-branca.png`, "Bermuda Moletom Branca", "87138112"),
  piece("m-ber-05", MASC_PERSONA, CAT_BERMUDA, `${IMG}/bermuda/05-preta.png`, "Bermuda Preta", "87117801-1"),
  piece("m-ber-06", MASC_PERSONA, CAT_BERMUDA, `${IMG}/bermuda/06-caramelo.png`, "Bermuda Caramelo", "87137801-2"),
  piece("m-ber-07", MASC_PERSONA, CAT_BERMUDA, `${IMG}/bermuda/07-bege.png`, "Bermuda Bege", "87137801-3"),
  piece("m-ber-08", MASC_PERSONA, CAT_BERMUDA, `${IMG}/bermuda/08-cargo-verde.png`, "Bermuda Cargo Verde", "87137802-1"),
  piece("m-ber-09", MASC_PERSONA, CAT_BERMUDA, `${IMG}/bermuda/09-cargo-bege.png`, "Bermuda Cargo Bege", "87137802-2"),
  piece("m-ber-10", MASC_PERSONA, CAT_BERMUDA, `${IMG}/shorts/01-marinho.png`, "Shorts Água Marinho", "87112807-4"),
  piece("m-ber-11", MASC_PERSONA, CAT_BERMUDA, `${IMG}/shorts/02-cinza.png`, "Shorts Água Cinza", "87132801-2"),
  piece("m-ber-12", MASC_PERSONA, CAT_BERMUDA, `${IMG}/shorts/03-verde.png`, "Shorts Água Verde", "87132805"),
  piece("m-ber-13", MASC_PERSONA, CAT_BERMUDA, `${IMG}/shorts/04-turquesa.png`, "Shorts Água Turquesa", "87132801-3"),
  piece("m-ber-14", MASC_PERSONA, CAT_BERMUDA, `${IMG}/shorts/05-cinza-est.png`, "Shorts Água Cinza Estampado", "87132801-4"),
  piece("m-ber-15", MASC_PERSONA, CAT_BERMUDA, `${IMG}/shorts/06-preto.png`, "Shorts Água Preto", "87132801-7"),
  piece("m-ber-16", MASC_PERSONA, CAT_BERMUDA, `${IMG}/shorts/07-preto-aero.png`, "Shorts Água Preto Aero", "87132802-1"),
  piece("m-ber-17", MASC_PERSONA, CAT_BERMUDA, `${IMG}/shorts/08-turquesa-aero.png`, "Shorts Água Turquesa Aero", "87132802-3"),
  piece("m-ber-18", MASC_PERSONA, CAT_BERMUDA, `${IMG}/shorts/09-cinza-magic.png`, "Shorts Magic Cinza", "87132808-f1"),
  piece("m-ber-19", MASC_PERSONA, CAT_BERMUDA, `${IMG}/shorts/10-cinza-magic2.png`, "Shorts Magic Cinza II", "87132808-f2"),

  // =============================================
  // MASCULINO — MOLETOM (3 peças)
  // =============================================
  piece("m-mol-01", MASC_PERSONA, CAT_MOLETOM, `${IMG}/moletom/01-azul.png`, "Moletom Azul", "87106017"),
  piece("m-mol-02", MASC_PERSONA, CAT_MOLETOM, `${IMG}/moletom/02-azul-claro.png`, "Moletom Azul Claro", "8746048-AZ"),
  piece("m-mol-03", MASC_PERSONA, CAT_MOLETOM, `${IMG}/moletom/03-cereja.png`, "Moletom Cereja", "8746048-CR"),

  // =============================================
  // MASCULINO — ACESSÓRIO (5 peças)
  // =============================================
  piece("m-ace-01", MASC_PERSONA, CAT_ACESSORIO, `${IMG}/acessorio/01-chinelo-preto.png`, "Chinelo Preto", "84139754-1"),
  piece("m-ace-02", MASC_PERSONA, CAT_ACESSORIO, `${IMG}/acessorio/02-chinelo-azul.png`, "Chinelo Azul", "84139754-2"),
  piece("m-ace-03", MASC_PERSONA, CAT_ACESSORIO, `${IMG}/acessorio/03-slide-cinza.png`, "Slide Cinza", "84149750-1"),
  piece("m-ace-04", MASC_PERSONA, CAT_ACESSORIO, `${IMG}/acessorio/04-slide-preto.png`, "Slide Preto", "84149750-3"),
  piece("m-ace-05", MASC_PERSONA, CAT_ACESSORIO, `${IMG}/acessorio/05-slide-branco.png`, "Slide Branco", "84149750-4"),

  // =============================================
  // FEMININO — placeholder (kept minimal for now)
  // =============================================
  piece("f-cam-01", FEM_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/01-branca.png`, "Baby Look Branca", "CF001"),
  piece("f-cam-02", FEM_PERSONA, CAT_CAMISETA, `${IMG}/camiseta/02-preta.png`, "Baby Look Preta", "CF002"),
  piece("f-blu-01", FEM_PERSONA, CAT_BLUSA, `${IMG}/polo/01-branca.png`, "Blusa Cropped", "BL001"),
  piece("f-cal-01", FEM_PERSONA, CAT_CALCA, `${IMG}/calca/01-chino-bege.png`, "Calça Mom Jeans", "CLF001"),
  piece("f-ves-01", FEM_PERSONA, CAT_VESTIDO, `${IMG}/camiseta/34-lavanda.png`, "Vestido Floral", "VT001"),
  piece("f-sai-01", FEM_PERSONA, CAT_SAIA, `${IMG}/bermuda/01-alfaiataria.png`, "Saia Midi", "SA001"),
];

// ============================================
// MOCK LOOKS — Only for first camiseta (m-cam-01)
// ============================================

interface MockLookData {
  id: string;
  name: string;
  pieces: { pieceId: string; slot: number }[];
}

const MOCK_LOOKS_DATA: MockLookData[] = [
  // Look 1: Camiseta Branca + Calça Chino + Chinelo Preto (3 peças, sem slot 2)
  {
    id: "look-001",
    name: "Casual Clean",
    pieces: [
      { pieceId: "m-cam-01", slot: 1 },  // camiseta → slot 1
      { pieceId: "m-cal-01", slot: 4 },  // calça → slot 4
      { pieceId: "m-ace-01", slot: 3 },  // chinelo → slot 3
    ],
  },
  // Look 2: Camiseta Branca + Bermuda Preta + Slide Cinza (3 peças, sem slot 2)
  {
    id: "look-002",
    name: "Street Básico",
    pieces: [
      { pieceId: "m-cam-01", slot: 1 },  // camiseta → slot 1
      { pieceId: "m-ber-05", slot: 4 },  // bermuda → slot 4
      { pieceId: "m-ace-03", slot: 3 },  // slide → slot 3
    ],
  },
  // Look 3: Camiseta Branca + Bermuda Caramelo + Chinelo Azul (3 peças, sem slot 2)
  {
    id: "look-003",
    name: "Verão Relax",
    pieces: [
      { pieceId: "m-cam-01", slot: 1 },  // camiseta → slot 1
      { pieceId: "m-ber-06", slot: 4 },  // bermuda → slot 4
      { pieceId: "m-ace-02", slot: 3 },  // chinelo → slot 3
    ],
  },
  // Look 4: Camiseta Branca + Shorts Água Turquesa + Slide Branco (3 peças, sem slot 2)
  {
    id: "look-004",
    name: "Beach Day",
    pieces: [
      { pieceId: "m-cam-01", slot: 1 },  // camiseta → slot 1
      { pieceId: "m-ber-13", slot: 4 },  // shorts → slot 4
      { pieceId: "m-ace-05", slot: 3 },  // slide → slot 3
    ],
  },
  // Look 5: Camiseta Branca + Bermuda Alfaiataria + Chinelo Preto (3 peças, sem slot 2)
  {
    id: "look-005",
    name: "Smart Casual",
    pieces: [
      { pieceId: "m-cam-01", slot: 1 },  // camiseta → slot 1
      { pieceId: "m-ber-01", slot: 4 },  // bermuda → slot 4
      { pieceId: "m-ace-01", slot: 3 },  // chinelo → slot 3
    ],
  },
  // Look 6: Camiseta Branca + Moletom Azul + Bermuda Moletom Cinza + Slide Preto (4 peças)
  {
    id: "look-006",
    name: "Cozy Urbano",
    pieces: [
      { pieceId: "m-cam-01", slot: 1 },  // camiseta → slot 1
      { pieceId: "m-mol-01", slot: 2 },  // moletom → slot 2
      { pieceId: "m-ber-03", slot: 4 },  // bermuda → slot 4
      { pieceId: "m-ace-04", slot: 3 },  // slide → slot 3
    ],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

const piecesMap = new Map(MOCK_PIECES.map((p) => [p.id, p]));

/** Get mock pieces by persona + category */
export function getMockPieces(personaId: string, categoryId: string): Piece[] {
  return MOCK_PIECES.filter(
    (p) =>
      p.persona_id === personaId &&
      p.category_id === categoryId &&
      p.is_active
  );
}

/** Get mock categories that have pieces for a persona */
export function getMockCategoryIds(personaId: string): string[] {
  const ids = new Set(
    MOCK_PIECES.filter((p) => p.persona_id === personaId && p.is_active).map(
      (p) => p.category_id
    )
  );
  return [...ids];
}

/** Get looks that contain a specific piece */
export function getMockLooksForPiece(pieceId: string): LookDetailFull[] {
  return MOCK_LOOKS_DATA.filter((look) =>
    look.pieces.some((lp) => lp.pieceId === pieceId)
  ).map((look) => ({
    id: look.id,
    name: look.name,
    pieces: look.pieces
      .map((lp) => {
        const p = piecesMap.get(lp.pieceId);
        if (!p) return null;
        return {
          slot: lp.slot,
          imageUrl: p.image_url,
          name: p.name,
          categoryName: null,
        };
      })
      .filter(Boolean) as LookDetailFull["pieces"],
  }));
}

/** Get a single look's full detail */
export function getMockLookDetail(lookId: string): LookDetailFull | null {
  const look = MOCK_LOOKS_DATA.find((l) => l.id === lookId);
  if (!look) return null;

  return {
    id: look.id,
    name: look.name,
    pieces: look.pieces
      .map((lp) => {
        const p = piecesMap.get(lp.pieceId);
        if (!p) return null;
        return {
          slot: lp.slot,
          imageUrl: p.image_url,
          name: p.name,
          categoryName: null,
        };
      })
      .filter(Boolean) as LookDetailFull["pieces"],
  };
}
