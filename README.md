# Marketing Hub

A centralized, static site that links every marketing page in this workspace together. The landing page (`index.html`) is a hub that routes to each self-contained marketing project.

## Pages

| Page | File | What it is |
| --- | --- | --- |
| **Marketing Hub** | `index.html` | Central landing page. Groups projects by suite (Tinsley suite + field guides). |
| **Tinsley chooser** | `tinsley.html` | Legacy `/tinsley` URL — pick Song, Social, or Reference. |
| **Tinsley — Song & Catalog Analysis** | `tinsley-song.html` | Music-first deck: catalog, EDM remix + sync notes, SWOT, like artists. |
| **Tinsley — Social & Marketing Analysis** | `tinsley-social.html` | Marketing-first deck: hashtags, per-song weekly recipes, platform plays, roadmap. |
| **Reference — Frameworks & Philosophy** | `reference.html` | Shared frameworks: 1,000 True Fans + *The Creative Act* (not duplicated in the decks). |
| **Street Marketing — Top 100 Ideas** | `street-marketing.html` | Searchable guerrilla tactics field guide. Fully self-contained. |

Every sub-page has a "← Hub" link back to `index.html`, so the pages are linked together in both directions.

## Run it

It's a static site — no build step required.

```bash
# From this folder, any static server works. For example:
npx serve .
# or
python -m http.server 8080
```

Then open the printed URL (e.g. http://localhost:8080). You can also open `index.html` directly in a browser.

## Add a new marketing page

1. Drop your new self-contained `your-page.html` in this folder.
2. Add a "← Hub" backlink in it pointing to `index.html`.
3. Append one entry to the `PAGES` array in `index.html` (set `suite` to `"tinsley"` or `"field"`, or add a new suite in `SUITES`):

```js
{
  suite: "field",
  title: "Your Campaign Title",
  kind: "Campaign Type",
  href: "your-page.html",
  desc: "One-line description shown on the hub card.",
  tags: ["Tag A", "Tag B"],
  accent: "linear-gradient(120deg, #ff6f91, #b98cff)"
}
```

The hub re-renders automatically. Entries without an `href` render as a "Coming soon" card.

## Files

```
index.html            # the central hub (links all pages)
tinsley.html          # chooser for legacy /tinsley links
tinsley-song.html     # song & catalog analysis (uses assets/)
tinsley-social.html   # social & marketing analysis (uses assets/)
reference.html        # True Fans + Creative Act frameworks
street-marketing.html # Street marketing Top 100 ideas (self-contained)
assets/
  styles.css          # Tinsley design system + layout
  data.js             # ALL Tinsley strategy content (edit here)
  app.js              # Song + Social rendering + interactivity
  reference.js        # Reference page renderer
  og-image.png        # shared social share card
  icon-512.png        # shared favicon / app icon
api/spotify.js        # live Spotify metrics (Vercel serverless)
sw.js                 # service worker (bump CACHE to invalidate)
vercel.json           # clean URLs + redirects
```

## Sources

Tinsley artist facts, quotes, and catalog compiled from [tinsleymusic.com](https://www.tinsleymusic.com/), the official [EPK](https://www.tinsleymusic.com/epk), [Bandcamp](https://musicbytinsley.bandcamp.com/), [Atwood Magazine](https://atwoodmagazine.com/tybe-tinsley-bad-enough-song-premiere/), [The Spokesman-Review](https://www.spokesman.com/stories/2025/mar/20/west-side-indie-pop-rocker-tinsley-brings-new-albu/), She Is The Music, and KEXP. The superfan framework is drawn from Kevin Kelly's essay [“1,000 True Fans”](https://kk.org/thetechnium/1000-true-fans/) (2008).

> Unofficial fan/strategy project for analysis and marketing planning purposes.
