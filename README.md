# Tinsley — Marketing & Analysis Hub

An unofficial, single-page marketing and catalog-analysis site for Seattle indie pop-rock artist **Tinsley** (Olivia Tinsley). Built as a strategy deck: catalog assessment, hashtag strategy, social-media opportunities, 10 like artists, and a 90-day marketing roadmap.

## What's inside

| Section | Purpose |
| --- | --- |
| **Catalog Assessment** | Filterable 19+ release discography with genre/mood tagging + a genre/era mix chart and press quotes. |
| **Strengths / Opportunities / Watch-outs** | SWOT-style diagnosis of the artist's position. |
| **Hashtag Strategy** | 45+ hashtags grouped by function (Brand, Genre, Location, Community, Discovery). Click any tag to copy; "Copy full set" grabs them all. |
| **Social Media Opportunities** | Platform-by-platform priorities and concrete content plays (TikTok, Instagram, Spotify, YouTube, Bandcamp, Threads/X). |
| **10 Like Artists** | Fan-overlap targets with match scores for playlist pitching, ad look-alikes, and tour asks. |
| **1,000 True Fans** | Kevin Kelly's framework applied to Tinsley: an interactive revenue calculator, per-fan revenue breakdown, a fan-conversion ladder, and a build playbook. |
| **90-Day Roadmap** | A sequenced Foundation → Amplify → Convert execution plan. |

## Run it

It's a static site — no build step required.

```bash
# From this folder, any static server works. For example:
npx serve .
# or
python -m http.server 8080
```

Then open the printed URL (e.g. http://localhost:8080). You can also just open `index.html` directly in a browser.

## Editing the strategy

All content is data-driven. Edit **`assets/data.js`** — the `TINSLEY` object holds the artist info, catalog, hashtags, social plan, like artists, and roadmap. The UI re-renders from that data automatically.

## Files

```
index.html          # page structure
assets/styles.css   # design system + layout
assets/data.js      # ALL strategy content (edit here)
assets/app.js       # rendering + interactivity (filters, copy, charts)
```

## Sources

Artist facts, quotes, and catalog compiled from [tinsleymusic.com](https://www.tinsleymusic.com/), the official [EPK](https://www.tinsleymusic.com/epk), [Bandcamp](https://musicbytinsley.bandcamp.com/), [Atwood Magazine](https://atwoodmagazine.com/tybe-tinsley-bad-enough-song-premiere/), [The Spokesman-Review](https://www.spokesman.com/stories/2025/mar/20/west-side-indie-pop-rocker-tinsley-brings-new-albu/), She Is The Music, and KEXP. The superfan framework is drawn from Kevin Kelly's essay [“1,000 True Fans”](https://kk.org/thetechnium/1000-true-fans/) (2008).

> Unofficial fan/strategy project for analysis and marketing planning purposes.
