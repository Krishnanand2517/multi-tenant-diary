# Diarist - Multi-Tenant Diary App

A full-stack, multi-tenant diary application built with **Next.js 16**, **Clerk**, **Drizzle ORM**, and **PostgreSQL**. Each organization gets its own isolated workspace and a publicly accessible subdomain to read its diary entries.

## ✨ Features

- **Multi-tenancy via Clerk Organizations**: Users create or join Spaces; each Space has its own isolated set of diary entries stored by `orgId`.
- **Subdomain-based public pages**: Each organization's diary is accessible at `<org-slug>.yourdomain.com`, powered by Next.js middleware that rewrites subdomain requests transparently.
- **Private writing dashboard**: Authenticated members write entries through a clean, distraction-free editor scoped to their active organization.
- **Server Actions**: Entry creation is handled with Next.js Server Actions for a seamless, type-safe full-stack experience.
- **Drizzle ORM + PostgreSQL**: Lightweight, type-safe database layer with schema push for rapid iteration.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Auth & Orgs | Clerk |
| Database ORM | Drizzle ORM |
| Database | PostgreSQL |
| UI Components | shadcn/ui + Tailwind CSS v4 |
| Runtime | Bun |
| Notifications | Sonner |

## Project Structure

```
├── app/
│   ├── (root)/                    # Main app (authenticated)
│   │   ├── page.tsx               # Landing / sign-in redirect
│   │   ├── layout.tsx             # Root layout with Clerk provider
│   │   └── org/[slug]/
│   │       ├── page.tsx           # Diary entry creation page
│   │       └── actions.ts         # Server Action: createEntry
│   ├── (subdomain)/
│   │   └── s/[subdomain]/
│   │       ├── page.tsx           # Public subdomain diary reader
│   │       └── layout.tsx         # Subdomain layout
│   ├── components/
│       └── navbar.tsx                 # Clerk-powered navigation bar
├── components/
│   └── ui/                        # shadcn/ui components
├── db/
│   ├── schema.ts                  # Drizzle schema (entries table)
│   └── index.ts                   # DB connection
├── proxy.ts                       # Next.js middleware (subdomain routing)
├── docker-compose.yml             # Local PostgreSQL setup
└── drizzle.config.ts              # Drizzle config
```

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- [Docker](https://www.docker.com/) for local PostgreSQL
- A [Clerk](https://clerk.com) account with **Organizations** enabled

### 1. Clone the repo

```bash
git clone https://github.com/Krishnanand2517/multi-tenant-diary.git
cd multi-tenant-diary
```

### 2. Install dependencies

```bash
bun install
```

### 3. Start the database

```bash
docker-compose up -d
```

### 4. Configure environment variables

Create a `.env` file at the root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres

# App
NEXT_PUBLIC_ROOT_DOMAIN=localhost:3000
```

> Make sure to enable **Organizations** in your Clerk dashboard.

### 5. Push the database schema

```bash
bun run db:push
```

### 6. Run the development server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🌐 Subdomain Routing (How It Works)

Subdomain routing is handled in `proxy.ts` (the Next.js middleware). When a request arrives at `<slug>.localhost:3000` (local) or `<slug>.yourdomain.com` (production), the middleware detects the subdomain and rewrites the request internally to `/s/<slug>`, without changing the visible URL.

The subdomain page then uses the Clerk backend API to resolve the org from the slug, fetches that org's entries from the database, and renders a public read-only diary.

## 📜 Available Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run db:push` | Push schema to database |
| `bun run db:studio` | Open Drizzle Studio (DB GUI) |

Happy Coding 🚀