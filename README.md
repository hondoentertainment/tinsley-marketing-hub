# Marketing Hub

A centralized, static site that links every marketing page in this workspace together. The landing page (`index.html`) is a hub that routes to each self-contained marketing project.

## Pages

| Page | File | What it is |
| --- | --- | --- |
| **Marketing Hub** | `index.html` | Central landing page. Project cards + searchable section index. |
| **Listen** | `listen.html` | **Public fan surface** — Start Here playlist, email capture (`/api/subscribe`), smart links. Primary bio/QR destination. |
| **Press Kit** | `press.html` | Shareable EPK for editors & radio — bio, quotes, facts, Start Here, assets. |
| **Sync & Licensing** | `sync.html` | Mood map + top sync-ready tracks for music supervisors. |
| **Shows & Booking** | `shows.html` | Support one-pager, routing legs, set/tech, booking CTA. |
| **Bad Enough** | `bad-enough.html` | Lead-single campaign page — stream, list, angles, recipe, hashtags. |
| **Temporary Insanity** | `temporary-insanity.html` | Next-single campaign page (same template). |
| **Campaign template** | `campaign.html` | Generic `?id=` campaign surface for future singles. |
| **Tinsley chooser** | `tinsley.html` | Legacy `/tinsley` URL — pick Song, Social, Ops, Listen, public surfaces, or Reference. |
| **Tinsley — Song & Catalog Analysis** | `tinsley-song.html` | Music-first deck (internal / `noindex`). |
| **Tinsley — Social & Marketing Analysis** | `tinsley-social.html` | Marketing deck (internal / `noindex`). |
| **Tinsley — Ops Command** | `tinsley-ops.html` | Execution OS (internal / `noindex`). |
| **Reference — Frameworks & Philosophy** | `reference.html` | True Fans + *The Creative Act* (internal / `noindex`). |
| **Street Marketing — Top 100 Ideas** | `street-marketing.html` | Guerrilla tactics field guide. Public. |

**Public SEO:** `/`, `/listen`, `/bad-enough`, `/temporary-insanity`, `/campaign`, `/press`, `/sync`, `/shows`, `/street-marketing` (see `sitemap.xml` + `robots.txt`). Strategy decks stay `noindex`.

## Run it

```bash
npx serve .
# or
npx vercel dev
```

## Production connectors (Vercel env)

See `.env.example` for `SPOTIFY_*`, `KIT_*` / `EMAIL_WEBHOOK_URL`.

## Add a new marketing page

1. Drop `your-page.html` in this folder with a Hub backlink.
2. Append an entry to `PAGES` (and optionally `SECTION_INDEX`) in `index.html`.
3. If it’s public, add it to `sitemap.xml` + `robots.txt` Allow.

## Sources

Compiled from [tinsleymusic.com](https://www.tinsleymusic.com/), EPK, Bandcamp, Atwood, Spokesman-Review, KEXP, and Kevin Kelly’s [1,000 True Fans](https://kk.org/thetechnium/1000-true-fans/).

> Unofficial fan/strategy project for analysis and marketing planning purposes.
