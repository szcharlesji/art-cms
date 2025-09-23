# Xuecong.art CMS

> Work-in-progress content platform tailored for <https://xuecong.art>. Self-hosting is technically possible, but the focus remains the official production deployment.

## Why It Matters

- Purpose-built CMS that highlights artworks with clean presentation and minimal latency.
- 100% Cloudflare footprint (Pages, Workers, KV, D1-ready) to deliver fast responses worldwide.
- Edge-aware routing, incremental static regeneration, and tuned image caching for galleries.

## Current Features

- Per-artwork SEO metadata, sitemap entries, and social card generation managed in-app.
- Rich text editor for essays and artwork notes with media embeds and formatting safeguards.
- Artwork, collection, and journal modules powered by shared UI primitives for cohesive styling.
- Bun-powered local dev on port 8787 with hot reload plus linting via `bun run lint`.

## Tech Stack

- Next.js App Router + React 19 with TypeScript and Tailwind utility styling.
- Bun toolchain, class-variance-authority for theme variants, and Drizzle ORM targeting libSQL / D1.
- Wrangler-managed environment secrets and OpenNext Cloudflare build, preview, and deploy flows.

## Future Roadmap

- Replace the current editor with Meta's Lexical and explore real-time collaboration.
- Improve loading states, streaming boundaries, and image delivery (responsive crops, AVIF/WebP).
- Expand admin panel UX for curators, audit logging, and draft approval workflows.
- Harden security around asset uploads, secret rotation, and role-based access control.
