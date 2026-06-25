# LeadFinder AI

Find local businesses without websites — prospecting CLI tool for freelance web developers.

Uses the Google Places API to search businesses by niche and city, filters out the ones that already have a website, and exports the rest as a ready-to-use CSV. No scraping. No auto-messaging. Just clean public data and your outreach hustle.

---

## Quick Start

```bash
# Install
npm install

# Build
npm run build

# Run
npx leadfinder-ai prospect barbearias Curitiba
```

## Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a project (or select an existing one)
3. Click **Create Credentials > API Key**
4. Enable the **Places API (New)** at [this link](https://console.cloud.google.com/apis/library/places.googleapis.com)
5. Set your key:

```bash
# Option A: .env file (recommended)
echo "LEADFINDER_GOOGLE_API_KEY=your_key_here" > .env

# Option B: Environment variable (Linux/macOS)
export LEADFINDER_GOOGLE_API_KEY=your_key_here

# Option C: Pass via flag
npx leadfinder-ai prospect barbearias Curitiba --api-key YOUR_KEY
```

---

## Usage

### CLI

```bash
# Find barbershops without websites in Curitiba
npx leadfinder-ai prospect barbearias Curitiba

# Find dentists in Belo Horizonte (up to 60 results)
npx leadfinder-ai prospect dentistas "Belo Horizonte" --pages 3

# Test your API key with 1 result
npx leadfinder-ai prospect restaurantes "Sao Paulo" --dry-run

# List all supported business niches
npx leadfinder-ai list-types
```

### Flags

| Flag | Description | Default |
|------|-------------|---------|
| `--pages <1-3>` | Number of result pages (20 per page) | `1` |
| `--type <type>` | Override auto-mapped Google Place Type | auto |
| `--open-now` | Only businesses currently open | off |
| `--dry-run` | Test API with 1 result only | off |
| `--api-key <key>` | Pass API key directly | env var |

### Programmatic

```ts
import { prospect } from "leadfinder-ai"

const { leads, filepath, totalFound, comSite } = await prospect({
  nicho: "barbearias",
  cidade: "Curitiba",
  maxPages: 1,
})
```

---

## Output

Generates a UTF-8 BOM CSV (Excel-compatible with Portuguese accents) containing only businesses **without** a website.

**File:** `leads-barbearias-curitiba-2026-06-24.csv`

| Column | Description |
|--------|-------------|
| `nome` | Business name |
| `telefone` | National phone number |
| `endereco` | Formatted address |
| `avaliacao` | Google rating (1-5) |
| `num_reviews` | Total review count |
| `tem_site` | Always `nao` (filtered) |

**Terminal output:**

```
  Busca concluida: 18 negocios encontrados
  12 sem website (6 com site filtrados)
  Salvo: leads-barbearias-curitiba-2026-06-24.csv

  nome                          telefone            avaliacao   reviews
  ----------------------------------------------------------------------
  Barbearia Vintage             (41)99999-0001      4.8         127
  Barber Shop Premium           (41)99999-0002      4.2         34
```

---

## Supported Niches

| Portuguese | Google Place Type |
|---|---|
| barbearias | barber_shop |
| restaurantes | restaurant |
| saloes de beleza | beauty_salon |
| padarias | bakery |
| academias | gym |
| clinicas | doctor |
| dentistas | dentist |
| pet shops | pet_store |
| floriculturas | flower_shop |
| lavanderias | laundry |
| farmacias | pharmacy |
| lojas de roupa | clothing_store |
| supermercados | supermarket |
| lojas de conveniencia | convenience_store |
| auto pecas | car_parts |
| oficinas | car_repair |
| pizzarias | restaurant |
| lanchonetes | restaurant |
| lojas de moveis | furniture_store |
| lojas de eletronicos | electronics_store |

Run `npx leadfinder-ai list-types` for the full list, or pass any [Google Place Type](https://developers.google.com/maps/documentation/places/web-service/place-types) directly with `--type`.

---

## API Cost

Google Places API (New) Text Search: **$17 per 1,000 calls**.

Free tier includes **$200/month credit** (~555 prospects/month free). Each call returns up to 20 results.

---

## How It Works

1. Calls Google Places **Text Search API (New)** — the official, legit way
2. Fetches all fields (name, phone, address, rating, website) in a single call per page
3. Filters out businesses that already have a website
4. Exports the remaining leads to CSV with UTF-8 BOM
5. You reach out manually — the tool organizes data, you make the human connection

---

## Ethical Use

- Uses only the **official Google Places API**. No scraping.
- Data is **public business information** (LGPD compliant — art. 7, III).
- **No automated messaging.** Every outreach message is sent manually by you.
- The tool organizes data; **you** make the human connection.

---

## Roadmap

| Version | Feature |
|---------|---------|
| v0.2 | Lead ranking (OURO/PRATA/BRONZE), Excel export |
| v0.3 | AI skill integration (OpenCode, Claude Code) |
| v1.0 | PDF reports, multi-city batching, lead tracking |

---

## License

[MIT](LICENSE)
