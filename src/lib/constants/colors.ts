// Famílias de cor derivadas dos valores reais da planilha.
// Cada peça tem um `cor` em texto livre ("Azul marinho", "Blue jeans", "Mescla preto"...).
// Agrupamos em poucas famílias para os chips de filtro funcionarem.

export interface ColorFamily {
  key: string;
  label: string;
  hex: string;
  /** palavras-chave (minúsculas) procuradas dentro do `cor`, em ordem de prioridade */
  keywords: string[];
}

// Ordem importa: a 1ª família cujo keyword aparece no texto vence.
export const COLOR_FAMILIES: ColorFamily[] = [
  { key: "azul", label: "Azul", hex: "#2f4a73", keywords: ["azul", "blue", "marinho", "turquesa", "jeans", "royal"] },
  { key: "verde", label: "Verde", hex: "#3f7a4f", keywords: ["verde"] },
  { key: "rosa", label: "Rosa", hex: "#e3a0b6", keywords: ["rosa", "rose"] },
  { key: "vermelho", label: "Vermelho", hex: "#b23b3b", keywords: ["vermelho", "terracota"] },
  { key: "amarelo", label: "Amarelo", hex: "#e3c455", keywords: ["amarelo"] },
  { key: "laranja", label: "Laranja", hex: "#d4763a", keywords: ["laranja"] },
  { key: "marrom", label: "Marrom / Bege", hex: "#a9835a", keywords: ["marrom", "caqui", "bege", "areia", "creme", "folhagem", "natural"] },
  { key: "cinza", label: "Cinza", hex: "#8a8d91", keywords: ["cinza", "chumbo", "mescla"] },
  { key: "preto", label: "Preto", hex: "#1d1d1f", keywords: ["preto"] },
  { key: "branco", label: "Branco", hex: "#f4f4f4", keywords: ["branco", "off white", "off-white"] },
];

const FAMILY_BY_KEY = new Map(COLOR_FAMILIES.map((f) => [f.key, f]));

/** Retorna a chave da família de cor para um valor `cor`, ou null. */
export function colorFamilyKey(cor: string | null | undefined): string | null {
  if (!cor) return null;
  const c = cor.toLowerCase();
  for (const fam of COLOR_FAMILIES) {
    if (fam.keywords.some((k) => c.includes(k))) return fam.key;
  }
  return null;
}

export function colorFamily(key: string): ColorFamily | undefined {
  return FAMILY_BY_KEY.get(key);
}
