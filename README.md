# OFN — Omnifield Network

Digital Energy That Connects the World.

This repository contains the full-stack OFN platform:
- Backend: Node.js (Express) + MySQL
- Frontend: React + Vite + TailwindCSS
- Monochrome scientific UI, SVG item previews
- Internal economy: FEU (production) + OCU (marketplace)
- Marketplace (OCU only), tasks/levels, creation engine
- 32-character unique user addresses (uppercase hex)
- Wallet export stub (placeholder only, no real cash logic)

## Quick Start

Prerequisites:
- Node.js 18+
- MySQL 8+

1) Create MySQL database and user (example):

```powershell
# Launch MySQL shell and run:
CREATE DATABASE ofn CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE USER 'ofn_user'@'localhost' IDENTIFIED BY 'ofn_password';
GRANT ALL PRIVILEGES ON ofn.* TO 'ofn_user'@'localhost';
FLUSH PRIVILEGES;
```

2) Configure backend env:

```powershell
Copy-Item backend\.env.example backend\.env
# Edit backend\.env as needed (DB credentials, admin key, origin)
```

3) Install dependencies:

```powershell
cd backend; npm install; cd ..
cd frontend; npm install; cd ..
```

4) Initialize schema:

```powershell
cd backend; npm run db:init; cd ..
```

5) Run in dev:

```powershell
# Terminal 1 (backend)
cd backend; npm run dev

# Terminal 2 (frontend)
cd frontend; npm run dev
```

Open: http://localhost:5173

Backend health: http://localhost:4000/api/health

## Economy

- Units:
  - FEU: Field Energy Units — earned from mining/tasks; used for item creation
  - OCU: Omnifield Currency Units — marketplace currency; stays internal here

- Energy flow:
  - FEU → spent → create item
  - Item → sold → get OCU
  - OCU → accumulate (internal) → future export to OFN Wallet (separate)

- FEU gain formula:
  - FEU_Gain = BaseRate + (GeneratorOutput × Level) + (TaskReward × Difficulty)
  - With level efficiency bonus (up to +25%).
  - BaseRate clamped [5,20]; GeneratorOutput [0,10]; Difficulty [1,5]; TaskReward [0,300]

- Creation costs (before level discount):
  - Common: 200, Rare: 600, Epic: 1500, Legendary: 4000, Mythic: 12000
  - Level discount up to 20% (1% per level)

- Rarity probabilities (base): 60/25/10/4/1 with slight level-based bias toward higher tiers.

- Marketplace:
  - OCU only, fee = price × 0.10, transferred to platform (retained implicitly)

## User Identity

- On registration, each user receives a 32-character uppercase hex code (e.g. A93F22CC019ABF2281D992EFA77100DE)
- This is the internal OFN identity and future wallet address reference.

## Endpoints (selected)

- POST `/api/register` → { code }
- GET `/api/profile` (header `x-user-id`) → user, balances, items
- POST `/api/energy/mine` (header `x-user-id`) → earn FEU + XP
- POST `/api/items/create` (header `x-user-id`) → create item, returns SVG preview
- GET `/api/items/:id` → item and SVG preview
- GET `/api/marketplace` → list active listings
- POST `/api/marketplace/list` (header `x-user-id`) → { item_id, price }
- POST `/api/marketplace/buy` (header `x-user-id`) → { listing_id }
- GET `/api/tasks` (header `x-user-id`) → tasks + progress
- POST `/api/tasks/claim` (header `x-user-id`) → claim rewards
- POST `/api/wallet/export-ocu` (header `x-user-id`) → placeholder only
- Admin (header `x-admin-key`):
  - GET `/api/admin/users`
  - POST `/api/admin/tasks`

## UI / UX

- Monochrome only: #000 background, #FFF text, thin #222 borders
- No images except SVG lines/patterns
- Pages: Dashboard, Mining, Creation Lab, Marketplace, Item Detail, Tasks, Profile, Admin

## Database Schema

See `backend/sql/schema.sql` for full definitions (users, balances, energy_logs, items, marketplace_listings, transactions, tasks, task_progress).

## Branding

- ASCII logo: `LOGO_ASCII.txt`
- SVG logo concept: `frontend/public/assets/logo.svg`

## Notes on Security

- Demo auth: header `x-user-id` with your 32-char code
- Admin: header `x-admin-key` from backend `.env`
- Production should add robust auth (JWT/OAuth), rate-limiting, and stricter validation.

## Future Wallet Integration

- Placeholder endpoint only logs `ready_for_wallet_transfer` transaction
- No balance movement or real-money logic is performed here
- Real conversion will happen in the separate OFN Wallet project

Internal demo project for OFN platform prototype.