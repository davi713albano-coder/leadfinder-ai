import { writeFileSync } from "node:fs"
import type { Lead } from "../types/lead.js"

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

function escapeCsvField(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n") || value.includes("\r")) {
    return `"${value.replace(/\r?\n/g, " ").replace(/"/g, '""')}"`
  }
  return value
}

const CSV_HEADERS = ["nome", "telefone", "endereco", "avaliacao", "num_reviews", "tem_site"]
const BOM = "\uFEFF"

export async function exportCsv(
  leads: Lead[],
  nicho: string,
  cidade: string
): Promise<string> {
  const date = new Date().toISOString().split("T")[0]
  const filename = `leads-${slugify(nicho)}-${slugify(cidade)}-${date}.csv`

  const lines: string[] = [BOM + CSV_HEADERS.join(",")]

  for (const lead of leads) {
    const row = [
      escapeCsvField(lead.nome),
      escapeCsvField(lead.telefone),
      escapeCsvField(lead.endereco),
      lead.avaliacao != null ? String(lead.avaliacao) : "",
      String(lead.num_reviews),
      lead.tem_site ? "sim" : "nao",
    ].join(",")
    lines.push(row)
  }

  writeFileSync(filename, lines.join("\n") + "\n", "utf8")

  return filename
}
