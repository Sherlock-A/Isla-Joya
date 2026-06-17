/**
 * Multilingual synonym map for the Isla Joya jewelry store.
 * Keys are user input terms (lowercased), values are expanded search terms.
 */
const synonymMap: Record<string, string[]> = {
  // FR → EN jewelry categories
  bague:     ["ring", "rings"],
  bagues:    ["ring", "rings"],
  anneau:    ["ring", "rings"],
  anneaux:   ["ring", "rings"],
  chevaliere:["ring", "rings"],
  collier:   ["necklace", "necklaces"],
  colliers:  ["necklace", "necklaces"],
  pendentif: ["necklace", "necklaces"],
  pendentifs:["necklace", "necklaces"],
  sautoir:   ["necklace", "necklaces"],
  bracelet:  ["bracelet", "bracelets"],
  bracelets: ["bracelet", "bracelets"],
  manchette: ["bracelet", "bracelets"],
  boucle:    ["earring", "earrings"],
  boucles:   ["earring", "earrings"],
  creoles:   ["earring", "earrings"],
  creolesf:  ["earring", "earrings"],
  pendant:   ["earring", "earrings"],

  // Tones / materials FR → EN
  or:        ["gold"],
  dore:      ["gold"],
  doree:     ["gold"],
  doré:      ["gold"],
  dorée:     ["gold"],
  argent:    ["silver"],
  perle:     ["pearl", "freshwater"],
  perles:    ["pearl", "freshwater"],
  rose:      ["rose", "rose gold"],
  champagne: ["champagne"],
  ivoire:    ["ivory"],
  nude:      ["nude"],
  noir:      ["noir", "black"],

  // Material shortcuts
  zircon:    ["zircon", "zirconia", "sparkle"],
  diamant:   ["diamond", "zircon"],
  vermeil:   ["vermeil", "gold"],
  acier:     ["steel", "stainless"],

  // ES → EN
  anillo:    ["ring", "rings"],
  anillos:   ["ring", "rings"],
  pulsera:   ["bracelet", "bracelets"],
  collar:    ["necklace", "necklaces"],
  pendiente: ["earring", "earrings"],
  pendientes:["earring", "earrings"],
  oro:       ["gold"],

  // AR approximate
  خاتم:     ["ring"],
  سوار:     ["bracelet"],
  عقد:      ["necklace"],

  // Adjectives / occasions
  luxe:      ["gold", "vermeil", "premium"],
  luxury:    ["gold", "vermeil", "premium"],
  cadeau:    ["gift", "bestseller"],
  gift:      ["bestseller"],
  mariage:   ["gold", "pearl", "bestseller"],
  wedding:   ["gold", "pearl", "bestseller"],
  quotidien: ["nude", "ivory", "minimalist"],
  everyday:  ["nude", "ivory"],
};

/**
 * Parses a price constraint from query strings like:
 * "moins de 80€" | "moins de 80" | "under 100" | "max 60" | "< 60"
 * Returns { maxPrice } or null.
 */
export function parsePriceConstraint(query: string): { maxPrice?: number; minPrice?: number } | null {
  const lower = query.toLowerCase();
  const patterns = [
    /(?:moins de|under|max|maximum|<|≤)\s*(\d+)/i,
    /(\d+)\s*€?\s*(?:max|maximum|ou moins)/i,
    /jusqu[''']à\s*(\d+)/i,
  ];
  const minPatterns = [
    /(?:plus de|over|min|minimum|>|≥)\s*(\d+)/i,
    /(\d+)\s*€?\s*(?:min|minimum|ou plus)/i,
    /à partir de\s*(\d+)/i,
  ];
  for (const p of patterns) {
    const m = lower.match(p);
    if (m) return { maxPrice: parseInt(m[1], 10) };
  }
  for (const p of minPatterns) {
    const m = lower.match(p);
    if (m) return { minPrice: parseInt(m[1], 10) };
  }
  return null;
}

/**
 * Strips price constraints from the query for cleaner search.
 */
export function stripPriceConstraint(query: string): string {
  return query
    .replace(/(?:moins de|under|max|maximum|plus de|over|min|minimum|jusqu[''']à|à partir de|<|>|≤|≥)\s*\d+\s*€?/gi, "")
    .replace(/\d+\s*€?\s*(?:max|maximum|min|minimum|ou moins|ou plus)/gi, "")
    .trim();
}

/**
 * Expands a query term to include synonyms.
 * Returns an array of distinct terms to search for.
 */
export function expandQuery(query: string): string[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const terms = new Set<string>();
  terms.add(query); // always include the original

  for (const word of words) {
    // Remove accents for matching
    const normalized = word.normalize("NFD").replace(/[̀-ͯ]/g, "");
    const matches = synonymMap[word] ?? synonymMap[normalized] ?? [];
    for (const m of matches) terms.add(m);
  }

  return Array.from(terms);
}

/**
 * Highlights matching terms in a text string.
 * Returns the string with <mark> wrappers around matched substrings.
 */
export function highlightMatches(text: string, query: string): string {
  if (!query.trim()) return text;
  const stripped = stripPriceConstraint(query);
  const terms = expandQuery(stripped)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  if (!terms) return text;
  const re = new RegExp(`(${terms})`, "gi");
  return text.replace(re, "<mark>$1</mark>");
}
