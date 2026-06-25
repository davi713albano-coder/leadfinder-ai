import type { Lead } from "../types/lead.js"

function pad(str: string, len: number): string {
  if (str.length >= len) return str.slice(0, len - 3) + "..."
  return str.padEnd(len)
}

export function displayResults(leads: Lead[], filepath: string, totalFound: number, comSite: number): void {
  const semSite = leads.length

  console.log()
  console.log(`  Busca concluida: ${totalFound} negocios encontrados`)
  console.log(`  ${semSite} sem website (${comSite} com site filtrados)`)
  console.log(`  Salvo: ${filepath}`)
  console.log()

  if (leads.length === 0) {
    console.log("  Nenhum negocio sem website encontrado. Tente outro nicho ou cidade.")
    return
  }

  const col = { nome: 32, telefone: 22, avaliacao: 12, reviews: 10 }
  const header = [pad("nome", col.nome), pad("telefone", col.telefone), pad("avaliacao", col.avaliacao), pad("reviews", col.reviews)].join("")
  console.log("  " + header)
  console.log("  " + "-".repeat(header.length))

  const maxRows = 15
  const display = leads.slice(0, maxRows)

  for (const lead of display) {
    const line = [
      pad(lead.nome, col.nome),
      pad(lead.telefone || "-", col.telefone),
      pad(lead.avaliacao != null ? String(lead.avaliacao) : "-", col.avaliacao),
      pad(String(lead.num_reviews), col.reviews),
    ].join("")
    console.log("  " + line)
  }

  if (leads.length > maxRows) {
    console.log()
    console.log(`  ... e mais ${leads.length - maxRows} resultados no CSV`)
  }

  console.log()
}
