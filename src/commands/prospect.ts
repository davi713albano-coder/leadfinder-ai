import type { Lead, SearchParams } from "../types/lead.js"
import { COMMON_PLACE_TYPES } from "../types/lead.js"
import { getApiKey } from "../utils/config.js"
import { searchPlaces, type PlaceResult } from "../services/google-places.js"
import { exportCsv } from "../services/export.js"

function placeToLead(place: PlaceResult): Lead {
  return {
    nome: place.displayName?.text ?? "",
    telefone: place.nationalPhoneNumber ?? "",
    endereco: place.formattedAddress ?? "",
    avaliacao: place.rating ?? null,
    num_reviews: place.userRatingCount ?? 0,
    tem_site: Boolean(place.websiteUri),
  }
}

export async function prospect(params: SearchParams): Promise<{ leads: Lead[]; filepath: string; totalFound: number; comSite: number }> {
  const nicho = params.nicho.trim()
  const cidade = params.cidade.trim()

  if (!nicho) throw new Error("Nicho nao pode ser vazio.")
  if (!cidade) throw new Error("Cidade nao pode ser vazia.")
  if (nicho.length > 200 || cidade.length > 200) throw new Error("Nicho ou cidade demasiado longo.")

  const apiKey = getApiKey(params.apiKey)

  const includedType = params.includedType ?? COMMON_PLACE_TYPES[nicho.toLowerCase()] ?? undefined

  const places = await searchPlaces({ ...params, nicho, cidade, includedType }, apiKey)
  const totalFound = places.length

  const leadsWithoutSite = places
    .filter((p) => !p.websiteUri)
    .map(placeToLead)

  const comSite = totalFound - leadsWithoutSite.length

  const filepath = await exportCsv(leadsWithoutSite, nicho, cidade)

  return { leads: leadsWithoutSite, filepath, totalFound, comSite }
}
