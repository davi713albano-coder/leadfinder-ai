<div align="center">

# 🔍 leadfinder-ai

```
 ██╗     ███████╗ █████╗ ██████╗ ███████╗██╗███╗   ██╗██████╗ ███████╗██████╗        █████╗ ██╗
 ██║     ██╔════╝██╔══██╗██╔══██╗██╔════╝██║████╗  ██║██╔══██╗██╔════╝██╔══██╗      ██╔══██╗██║
 ██║     █████╗  ███████║██║  ██║█████╗  ██║██╔██╗ ██║██║  ██║█████╗  ██████╔╝█████╗███████║██║
 ██║     ██╔══╝  ██╔══██║██║  ██║██╔══╝  ██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗╚════╝██╔══██║██║
███████╗███████╗██║  ██║██████╔╝██║     ██║██║ ╚████║██████╔╝███████╗██║  ██║      ██║  ██║██║
╚══════╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝      ╚═╝  ╚═╝╚═╝
```

**Find local businesses without websites. 10 seconds. One command.**

[![npm version](https://img.shields.io/npm/v/leadfinder-ai?color=cb3837&label=npm&logo=npm)](https://www.npmjs.com/package/leadfinder-ai)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-contributing)
[![Made in Brazil](https://img.shields.io/badge/made%20in-Brazil-009c3b?logoColor=white)](#)

_Prospecting tool for freelance web developers who want clients, not busywork._<br>
_PT-BR first_ — all output and defaults are in Brazilian Portuguese. English README for global reach.

</div>

---

## 🎯 The Problem

It's 9 PM. You want clients. You open Google Maps and search "barbearias Curitiba". You click the first result — they have a website. The second — website. The third — no website. You copy the name, phone, address into a spreadsheet. Then the fourth, fifth, sixth... After 45 minutes you have 6 leads and tired fingers.

**You did 3 hours of data entry just to find 10 businesses that need you.**

That's not prospecting. That's suffering.

---

## 💡 The Solution

**leadfinder-ai** does in 10 seconds what takes you 3 hours manually:

```bash
npx leadfinder-ai prospect barbearias Curitiba
```

One command. 20 businesses without websites. CSV ready. Go sell.

---

## 🎬 Demo

```
$ npx leadfinder-ai prospect barbearias Curitiba

  Busca concluida: 18 negocios encontrados
  12 sem website (6 com site filtrados)
  Salvo: leads-barbearias-curitiba-2026-06-24.csv

  nome                           telefone              avaliacao   reviews
  -----------------------------------------------------------------------------
  Barbearia Vintage              (41) 99999-0001       4.8         127
  Barber Shop Premium            (41) 99999-0002       4.2         34
  Cortes & Cia                   (41) 99999-0003       4.6         89
  Barba &.Bigode                 (41) 99999-0004       4.9         201
  Navalha de Ouro                (41) 99999-0005       3.9         12
  ...
```

---

## ⏱️ Time Saved

| Task | Manual | leadfinder-ai | Saved |
|------|--------|---------------|-------|
| Find 20 leads in a city | 2-3 hours | 10 seconds | ~99% |
| Check which have websites | Click each one | Automatic | 100% |
| Copy name, phone, address | Line by line | CSV exported | 100% |
| Sort by rating/reviews | Manual guesswork | Data in columns | 100% |
| Repeat for another city | Start from zero | Change one word | ~99% |

> **3 hours → 10 seconds.** That's not an optimization. That's a superpower.

---

## 📦 Install

Three ways to use it — pick your favorite:

### ⚡ Option 1: npx (no install required)

```bash
npx leadfinder-ai prospect barbearias Curitiba
```

### 🌐 Option 2: npm global install

```bash
npm install -g leadfinder-ai
leadfinder-ai prospect barbearias Curitiba
```

### 🤖 Option 3: AI Agent (OpenCode / Claude Code / Cursor)

Just tell your AI agent what you need:

> "Find barbershops in Curitiba without websites"

See [OpenCode Skill](#-opencode-skill) and [Claude Code](#-claude-code) sections below.

---

## 🔑 Setup

You need a Google Places API key. It's free to start:

| Step | Action | Link |
|------|--------|------|
| 1️⃣ | Go to Google Cloud Console | [console.cloud.google.com](https://console.cloud.google.com/apis/credentials) |
| 2️⃣ | Create a project → Create Credentials → **API Key** | Same page |
| 3️⃣ | Enable **Places API (New)** | [Enable here](https://console.cloud.google.com/apis/library/places.googleapis.com) |

Then set your key:

```bash
# Option A: .env file (recommended)
echo "LEADFINDER_GOOGLE_API_KEY=your_key_here" > .env

# Option B: Environment variable
export LEADFINDER_GOOGLE_API_KEY=your_key_here    # Linux/macOS
set LEADFINDER_GOOGLE_API_KEY=your_key_here        # Windows CMD
$env:LEADFINDER_GOOGLE_API_KEY="your_key_here"    # Windows PowerShell

# Option C: Pass via flag
npx leadfinder-ai prospect barbearias Curitiba --api-key YOUR_KEY
```

> 💡 **Tip:** Use `--dry-run` to test your API key with just 1 result before a full search.

---

## 🚀 Usage

### Commands

| Command | Description |
|---------|-------------|
| `prospect <nicho> <cidade>` | Find businesses without websites |
| `list-types` | Show all supported business niches |

### Examples

```bash
# Find barbershops without websites in Curitiba
npx leadfinder-ai prospect barbearias Curitiba

# Find dentists in Belo Horizonte (up to 60 results)
npx leadfinder-ai prospect dentistas "Belo Horizonte" --pages 3

# Test your API key with 1 result
npx leadfinder-ai prospect restaurantes "Sao Paulo" --dry-run

# Only businesses currently open
npx leadfinder-ai prospect padarias Curitiba --open-now

# Use a custom Google Place Type
npx leadfinder-ai prospect "loja de roupas" Curitiba --type clothing_store

# List all supported business niches
npx leadfinder-ai list-types
```

### Flags

| Flag | Description | Default |
|------|-------------|---------|
| `--pages <1-3>` | Number of result pages (20 per page, max 60 total) | `1` |
| `--type <type>` | Override auto-mapped Google Place Type | auto |
| `--open-now` | Only businesses currently open | off |
| `--dry-run` | Test API with 1 result only | off |
| `--api-key <key>` | Pass API key directly (overrides env var) | env var |

### Programmatic API

```ts
import { prospect } from "leadfinder-ai"

const { leads, filepath, totalFound, comSite } = await prospect({
  nicho: "barbearias",
  cidade: "Curitiba",
  maxPages: 1,
})

console.log(`Found ${leads.length} leads without websites`)
// Found 12 leads without websites
```

---

## 🤖 OpenCode Skill

Use leadfinder-ai as an AI skill inside [OpenCode](https://opencode.ai):

```
You: "Find barbershops in Curitiba without websites"
AI:  Running: npx leadfinder-ai prospect barbearias Curitiba
     → Found 12 businesses without websites
     → Saved to leads-barbearias-curitiba-2026-06-24.csv
     → Want me to craft outreach messages for the top leads?
```

Just say what you need in natural language — the AI handles the rest.

---

## 🧠 Claude Code

Use inside [Claude Code](https://docs.anthropic.com/en/docs/claude-code):

```
You: /prospect barbearias Curitiba
AI:  Found 12 businesses without websites in Curitiba.
     Here are the top leads...
```

Works the same way in **Cursor**, **Windsurf**, or any AI agent that can run CLI commands.

---

## 📄 Output Format

Generates a **UTF-8 BOM CSV** — opens perfectly in Excel with Portuguese accents (ã, ç, é, õ, etc).

**File:** `leads-barbearias-curitiba-2026-06-24.csv`

### Columns

| Column | Type | Description |
|--------|------|-------------|
| `nome` | string | Business name |
| `telefone` | string | National phone number |
| `endereco` | string | Formatted address |
| `avaliacao` | number | Google rating (1.0–5.0) |
| `num_reviews` | number | Total review count |
| `tem_site` | boolean | Always `nao` (filtered) |

### Example CSV

```csv
nome,telefone,endereco,avaliacao,num_reviews,tem_site
Barbearia Vintage,(41) 99999-0001,"Rua XV de Novembro 123, Curitiba",4.8,127,nao
Barber Shop Premium,(41) 99999-0002,"Av. Marechal Deodoro 456, Curitiba",4.2,34,nao
```

> Only businesses **without** a website are included. The ones with sites are filtered out and counted in the summary.

---

## 💰 Pricing

Google Places API (New) pricing — you use **your own** API key:

| Item | Value |
|------|-------|
| Text Search cost | **$17 / 1,000 calls** |
| Free monthly credit | **$200/month** |
| Free searches/month | **~555** |
| Results per call | Up to **20** |
| Results with `--pages 3` | Up to **60** |

> **Bottom line:** ~555 free prospect searches per month. That's more than enough for a solo freelancer.

---

## 🏗️ How It Works

```
  ┌─────────────────────────────────────────────────────────┐
  │                   leadfinder-ai                         │
  │                                                         │
  │  ┌──────────┐    ┌──────────────┐    ┌──────────────┐  │
  │  │  You     │───>│  Google      │───>│  Filter      │  │
  │  │  type    │    │  Places API  │    │  no website  │  │
  │  │  niche + │    │  (official)  │    │  = hot leads │  │
  │  │  city    │    │              │    │              │  │
  │  └──────────┘    └──────────────┘    └──────┬───────┘  │
  │                                              │          │
  │                                         ┌────▼─────┐   │
  │                                         │   CSV    │   │
  │                                         │  export  │   │
  │                                         │ UTF-8    │   │
  │                                         │ BOM      │   │
  │                                         └──────────┘   │
  └─────────────────────────────────────────────────────────┘

  1. Search   → "barbearias em Curitiba" via Google Places Text Search
  2. Fetch    → name, phone, address, rating, website — all fields in 1 call
  3. Filter   → remove businesses that already have a website
  4. Export   → CSV with UTF-8 BOM (Excel-ready with Portuguese accents)
  5. Outreach → YOU reach out manually. Tool organizes. You connect.
```

---

## 🗺️ Supported Niches

| Portuguese | Google Place Type |
|---|---|
| barbearias | `barber_shop` |
| restaurantes | `restaurant` |
| saloes de beleza | `beauty_salon` |
| padarias | `bakery` |
| academias | `gym` |
| clinicas | `doctor` |
| dentistas | `dentist` |
| pet shops | `pet_store` |
| floriculturas | `flower_shop` |
| lavanderias | `laundry` |
| farmacias | `pharmacy` |
| lojas de roupa | `clothing_store` |
| supermercados | `supermarket` |
| lojas de conveniencia | `convenience_store` |
| auto pecas | `car_parts` |
| oficinas | `car_repair` |
| pizzarias | `restaurant` |
| lanchonetes | `restaurant` |
| lojas de moveis | `furniture_store` |
| lojas de eletronicos | `electronics_store` |

Run `npx leadfinder-ai list-types` for the full list, or pass any [Google Place Type](https://developers.google.com/maps/documentation/places/web-service/place-types) directly with `--type`.

---

## 🛣️ Roadmap

| Version | Feature | Status |
|---------|---------|--------|
| v0.1 | `prospect` command + CSV export | ✅ Shipped |
| v0.2 | Lead ranking (OURO / PRATA / BRONZE) + Excel export | 🔄 In progress |
| v0.3 | AI skill integration (OpenCode / Claude Code) | 🔄 In progress |
| v1.0 | PDF reports, multi-city batching, lead tracking | 🔮 Planned |

---

## ⚖️ Ethical Use

| Principle | Commitment |
|-----------|------------|
| 🔑 **Official API only** | Uses Google Places API. No scraping. Ever. |
| 📋 **Public data only** | Business name, phone, address — all public (LGPD art. 7, III). |
| ✉️ **No auto-messaging** | You send every message. The tool organizes, you connect. |
| 🇧🇷 **LGPD compliant** | No consumer personal data collected or stored. |
| 💾 **Local-only data** | CSV stays on your machine. No cloud. No tracking. |

> _This tool organizes public business data from Google Maps. It does not scrape, does not send automatic messages, and does not store consumer personal data. Ethical use is your responsibility._

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feat/my-feature`
5. Open a Pull Request

PRs are welcome — whether it's a new niche, a bug fix, or a feature from the roadmap.

---

## 📜 License

[MIT](LICENSE) — use it, fork it, sell with it. Just don't spam people.

---

<div align="center">

**Made with ❤️ in Brazil** 🇧🇷

_Your next client is one command away._

</div>
