# Marketing Hub

A centralized, static site that links every marketing page in this workspace together. The landing page (`index.html`) is a hub that routes to each self-contained marketing project.

## Pages

| Page | File | What it is |
| --- | --- | --- |
| **Marketing Hub** | `index.html` | Central landing page. Project cards + searchable section index. |
| **Listen** | `listen.html` | **Public fan surface** — Start Here playlist, email capture (`/api/subscribe`), smart links. Primary bio/QR destination. |
| **Tinsley chooser** | `tinsley.html` | Legacy `/tinsley` URL — pick Song, Social, Ops, Listen, or Reference. |
| **Tinsley — Song & Catalog Analysis** | `tinsley-song.html` | Music-first deck: catalog, EDM remix + sync notes, pitch kit, SWOT, like artists. Internal (`noindex`). |
| **Tinsley — Social & Marketing Analysis** | `tinsley-social.html` | Marketing deck: hashtags, daily content calendar, street picks, roadmap. Internal (`noindex`). |
| **Tinsley — Ops Command** | `tinsley-ops.html` | Execution OS: this-week strip, KPIs, ritual, UTMs, release OS, press CRM, playlists, content factory, paid log, Seattle flywheel, True Fan ladder, live routing, JSON backup. Internal (`noindex`). |
| **Reference — Frameworks & Philosophy** | `reference.html` | Shared frameworks: 1,000 True Fans + *The Creative Act*. Internal (`noindex`). |
| **Street Marketing — Top 100 Ideas** | `street-marketing.html` | Searchable guerrilla tactics field guide. Public. |

Public SEO surfaces: `/`, `/listen`, `/street-marketing` (see `sitemap.xml` + `robots.txt`). Strategy decks are `noindex`.

## Run it

```bash
npx serve .
# or
python -m http.server 8080
# or (with API routes)
npx vercel dev
```

## Production connectors (Vercel env)

Copy `.env.example` and set in **Vercel → Project → Settings → Environment Variables**:

| Variable | Purpose |
| --- | --- |
| `SPOTIFY_CLIENT_ID` + `SPOTIFY_CLIENT_SECRET` | Live followers / popularity on Song & Social |
| `KIT_API_KEY` + `KIT_FORM_ID` | Kit/ConvertKit list via `POST /api/subscribe` |
| `EMAIL_WEBHOOK_URL` | Alternate webhook for `{ email, name?, source }` |

Without email env vars, the Listen form stays visible and falls back to `#join` / Linktree. Ops → Setup shows connector status.

Plausible: `meta.analytics.plausibleDomain` in `assets/data.js` (already set to the Vercel host — register that site in Plausible).

## Add a new marketing page

1. Drop your new self-contained `your-page.html` in this folder.
2. Add a "← Hub" backlink pointing to `index.html`.
3. Append one entry to the `PAGES` array in `index.html` and (optionally) `SECTION_INDEX`.

## Files

```
index.html            # hub + section index
listen.html           # public fan page
tinsley.html          # chooser for legacy /tinsley links
tinsley-song.html     # song & catalog (internal)
tinsley-social.html   # social & marketing (internal)
tinsley-ops.html      # ops command (internal)
reference.html        # True Fans + Creative Act
street-marketing.html # Top 100 guerrilla ideas
assets/
  styles.css, data.js, app.js, ops.js, listen.js, listen.css, reference.js
api/spotify.js        # live Spotify metrics
api/subscribe.js      # email list subscribe
.env.example          # required Vercel env vars
sitemap.xml / robots.txt
sw.js                 # service worker (bump CACHE to invalidate)
vercel.json
```

## Sources

Tinsley artist facts, quotes, and catalog compiled from [tinsleymusic.com](https://www.tinsleymusic.com/), the official [EPK](https://www.tinsleymusic.com/epk), [Bandcamp](https://musicbytinsley.bandcamp.com/), [Atwood Magazine](https://atwoodmagazine.com/tybe-tinsley-bad-enough-song-premiere/), [The Spokesman-Review](https://www.spokesman.com/stories/2025/mar/20/west-side-indie-pop-rocker-tinsley-brings-new-albu/), She Is The Music, and KEXP. The superfan framework is drawn from Kevin Kelly's essay [“1,000 True Fans”](https://kk.org/thetechnium/1000-true-fans/) (2008).

> Unofficial fan/strategy project for analysis and marketing planning purposes.
