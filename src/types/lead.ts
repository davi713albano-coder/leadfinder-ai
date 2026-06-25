export interface Lead {
  nome: string
  telefone: string
  endereco: string
  avaliacao: number | null
  num_reviews: number
  tem_site: boolean
}

export interface SearchParams {
  nicho: string
  cidade: string
  maxPages?: number
  includedType?: string
  openNow?: boolean
  dryRun?: boolean
  apiKey?: string
}

export const COMMON_PLACE_TYPES: Record<string, string> = {
  barbearias: "barber_shop",
  restaurantes: "restaurant",
  "saloes de beleza": "beauty_salon",
  padarias: "bakery",
  academias: "gym",
  clinicas: "doctor",
  dentistas: "dentist",
  "pet shops": "pet_store",
  floriculturas: "flower_shop",
  lavanderias: "laundry",
  farmacias: "pharmacy",
  "lojas de roupa": "clothing_store",
  supermercados: "supermarket",
  "lojas de conveniencia": "convenience_store",
  "auto pecas": "car_parts",
  oficinas: "car_repair",
  pizzarias: "restaurant",
  lanchonetes: "restaurant",
  "lojas de moveis": "furniture_store",
  "lojas de eletronicos": "electronics_store",
}
