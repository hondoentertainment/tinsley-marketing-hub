# Marketing Hub

Private artist workspace — strategy decks, weekly ops, and draft surfaces to review. Not a fan site. Official home stays [tinsleymusic.com](https://www.tinsleymusic.com/).

## Pages

| Page | File | What it is |
| --- | --- | --- |
| **Marketing Hub** | `index.html` | Artist front door. Today card, plan path, Do/Review/Draft/Official cards. |
| **This week** | `today.html` | Friday sheet — Hidden Hall day sheet, Instagram show week, how-to print. |
| **Listen** | `listen.html` | **Draft fan landing** — Start Here, email capture mock, smart links. Review only — do not send fans or QR codes here. |
| **Press Kit** | `press.html` | Shareable EPK for editors & radio — bio, quotes, facts, Start Here, assets. |
| **Sync & Licensing** | `sync.html` | Mood map + top sync-ready tracks for music supervisors. |
| **Shows & Booking** | `shows.html` | Support one-pager, routing legs, set/tech, booking CTA. |
| **Bad Enough** | `bad-enough.html` | Lead-single campaign page — stream, list, angles, recipe, hashtags. |
| **Temporary Insanity** | `temporary-insanity.html` | Next-single campaign page (same template). |
| **Campaign template** | `campaign.html` | Generic `?id=` campaign surface for future singles. |
| **Tinsley chooser** | `tinsley.html` | Redirects to the hub. `/tinsley` is not a second front door. |
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

## Work path

Do this week first (`today.html`). When you have an hour: Song → Marketing → PR → Campaigns, then Ops and Tour. Cards are labeled Do, Review, Draft, or Official. Fans stay on tinsleymusic.com.

## Production connectors (Vercel env)

See `.env.example` for `SPOTIFY_*`, `KIT_*` / `EMAIL_WEBHOOK_URL`.

## Add a new marketing page

1. Drop `your-page.html` in this folder with a Hub backlink.
2. Append an entry to `PAGES` (and optionally `SECTION_INDEX`) in `index.html`.
3. If it’s public, add it to `sitemap.xml` + `robots.txt` Allow.

## Sources

Compiled from [tinsleymusic.com](https://www.tinsleymusic.com/), EPK, Bandcamp, Atwood, Spokesman-Review, KEXP, and Kevin Kelly’s [1,000 True Fans](https://kk.org/thetechnium/1000-true-fans/).

> Unofficial fan/strategy project for analysis and marketing planning purposes.
