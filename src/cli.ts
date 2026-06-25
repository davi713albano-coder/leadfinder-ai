import { Command } from "commander"
import "dotenv/config"
import { prospect } from "./commands/prospect.js"
import { displayResults } from "./utils/display.js"
import { COMMON_PLACE_TYPES } from "./types/lead.js"
import { ApiError } from "./services/google-places.js"

const program = new Command()

program
  .name("leadfinder-ai")
  .description("Encontre negocios locais sem website - prospeccao para freelancers")
  .version("0.1.0")

program
  .command("prospect")
  .description("Buscar negocios sem website em uma cidade")
  .argument("<nicho>", "Nicho ou tipo de negocio (ex: barbearias, restaurantes)")
  .argument("<cidade>", "Cidade para buscar (ex: Curitiba, Sao Paulo)")
  .option("--pages <num>", "Numero de paginas de resultados (1-3)", "1")
  .option("--type <type>", "Google Place Type (sobrepoe o mapeamento automatico)")
  .option("--open-now", "Filtrar apenas negocios abertos agora")
  .option("--dry-run", "Buscar apenas 1 resultado para testar a API")
  .option("--api-key <key>", "Google Places API key (sobrepoe env var)")
  .action(async (nicho: string, cidade: string, opts: Record<string, any>) => {
    try {
      const pages = Math.min(Math.max(parseInt(opts.pages, 10) || 1, 1), 3)

      const result = await prospect({
        nicho,
        cidade,
        maxPages: pages,
        includedType: opts.type,
        openNow: opts.openNow,
        dryRun: opts.dryRun,
        apiKey: opts.apiKey,
      })

      displayResults(result.leads, result.filepath, result.totalFound, result.comSite)
    } catch (err: any) {
      if (err instanceof ApiError || err?.name === "MissingApiKeyError") {
        console.error(`\n  ${err.message}\n`)
      } else {
        console.error(`\n  Erro: ${err?.message ?? err}\n`)
      }
      process.exit(1)
    }
  })

program
  .command("list-types")
  .description("Listar tipos de negocio com mapeamento automatico")
  .action(() => {
    console.log()
    console.log("  Tipos de negocio suportados (pt-BR -> Google Place Type):")
    console.log()
    for (const [key, value] of Object.entries(COMMON_PLACE_TYPES)) {
      console.log(`  ${key.padEnd(28)} -> ${value}`)
    }
    console.log()
    console.log("  Voce tambem pode usar --type com qualquer Google Place Type direto.")
    console.log("  Lista completa: https://developers.google.com/maps/documentation/places/web-service/place-types")
    console.log()
  })

program.parse()
