import { PlacesClient } from "@googlemaps/places"
import type { SearchParams } from "../types/lead.js"

const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.nationalPhoneNumber",
  "places.websiteUri",
  "places.rating",
  "places.userRatingCount",
  "nextPageToken",
].join(",")

export interface PlaceResult {
  id?: string | null
  displayName?: { text?: string | null } | null
  formattedAddress?: string | null
  nationalPhoneNumber?: string | null
  websiteUri?: string | null
  rating?: number | null
  userRatingCount?: number | null
}

interface SearchTextResponse {
  places?: PlaceResult[] | null
  nextPageToken?: string | null
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export class ApiError extends Error {
  override readonly name = "ApiError"
  constructor(message: string, public override readonly cause?: unknown) {
    super(message)
  }
}

export async function searchPlaces(
  params: SearchParams,
  apiKey: string
): Promise<PlaceResult[]> {
  const client = new PlacesClient({ apiKey, fallback: true })

  const allPlaces: PlaceResult[] = []
  let nextPageToken: string | undefined
  const maxPages = params.dryRun ? 1 : (params.maxPages ?? 1)
  const textQuery = `${params.nicho} em ${params.cidade}`

  for (let page = 0; page < maxPages; page++) {
    if (page > 0 && nextPageToken) {
      await sleep(2000)
    }

    const request = {
      textQuery,
      languageCode: "pt-BR" as const,
      regionCode: "BR" as const,
      maxResultCount: params.dryRun ? 1 : 20,
      rankPreference: "RELEVANCE" as const,
    }

    type RequestOptions = typeof request & Partial<{
      includedType: string
      openNow: boolean
      pageToken: string
      strictTypeFiltering: boolean
    }>

    const fullRequest: RequestOptions = { ...request }

    if (params.includedType) {
      fullRequest.includedType = params.includedType
      fullRequest.strictTypeFiltering = true
    }
    if (params.openNow) {
      fullRequest.openNow = true
    }
    if (nextPageToken) {
      fullRequest.pageToken = nextPageToken
    }

    let response: unknown
    try {
      ;[response] = await client.searchText(fullRequest as any, {
        otherArgs: {
          headers: { "X-Goog-FieldMask": FIELD_MASK },
        },
      })
    } catch (err: any) {
      const msg = err?.message ?? String(err)
      if (msg.includes("INVALID_ARGUMENT")) {
        throw new ApiError(`Requisicao invalida: ${msg}`, err)
      }
      if (msg.includes("RESOURCE_EXHAUSTED") || msg.includes("quota")) {
        throw new ApiError("Cota da API excedida. Tente novamente mais tarde ou use --pages 1.", err)
      }
      if (msg.includes("PERMISSION_DENIED") || msg.includes("API key")) {
        throw new ApiError("API key invalida ou sem permissao. Verifique sua LEADFINDER_GOOGLE_API_KEY.", err)
      }
      throw new ApiError(`Erro ao buscar lugares: ${msg}`, err)
    }

    const typed = response as unknown as SearchTextResponse

    if (typed.places && typed.places.length > 0) {
      allPlaces.push(...typed.places)
    }

    nextPageToken = typed.nextPageToken ?? undefined
    if (!nextPageToken) break
    if (params.dryRun) break
  }

  return allPlaces
}
