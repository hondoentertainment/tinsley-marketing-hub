# Marketing Hub

Private artist workspace — strategy decks, weekly ops, and draft surfaces to review. Not a fan site. Official home stays [tinsleymusic.com](https://www.tinsleymusic.com/).

## Pages

| Page | File | What it is |
| --- | --- | --- |
| **Marketing Hub** | `index.html` | Central landing page. Project cards + searchable section index. |
| **Listen** | `listen.html` | **Draft fan landing** — Start Here, email capture mock, smart links. Review only — do not send fans or QR codes here. |
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

**SEO:** The whole hub is `noindex` + `robots.txt` Disallow. Fans should not land here.

## Run it

```bash
npx serve .
# or
npx vercel dev
```

## Present to the artist

Open **https://tinsley-marketing-hub.vercel.app/?present=1** — focus mode hides unfinished connectors so you can review drafts in order.

Review order: Listen draft → Press draft → Bad Enough draft → Song/Social (optional).

## Production connectors (Vercel env)

See `.env.example` for `SPOTIFY_*`, `KIT_*` / `EMAIL_WEBHOOK_URL`.

## Add a new marketing page

1. Drop `your-page.html` in this folder with a Hub backlink.
2. Append an entry to `PAGES` (and optionally `SECTION_INDEX`) in `index.html`.
3. If it’s public, add it to `sitemap.xml` + `robots.txt` Allow.

## Sources

Compiled from [tinsleymusic.com](https://www.tinsleymusic.com/), EPK, Bandcamp, Atwood, Spokesman-Review, KEXP, and Kevin Kelly’s [1,000 True Fans](https://kk.org/thetechnium/1000-true-fans/).

> Unofficial fan/strategy project for analysis and marketing planning purposes.
