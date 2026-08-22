/* =========================================================================
   Tinsley — Marketing & Analysis Data Layer
   All strategic content lives here so the site stays easy to maintain.
   Sources: tinsleymusic.com, EPK, Bandcamp discography, Atwood Magazine,
   Spokesman-Review, The Seattle Times, She Is The Music, KEXP.
   ========================================================================= */

const TINSLEY = {
  // ---- Site metadata: provenance, freshness & methodology ----
  // Credibility layer. `updated` drives the "Last updated" badge; `sources`
  // renders the Methodology block; `spotifyArtistId` powers the live data fetch.
  meta: {
    updated: "2026-08-22",
    spotifyArtistId: "1encEkVjZ4iqby8BXZc8Pa",
    canonicalUrl: "https://tinsley-marketing-hub.vercel.app/",
    publicListenPath: "/listen",
    methodology:
      "This deck blends verifiable public data with clearly-labeled analytical estimates. Figures marked LIVE (Spotify followers, popularity, top tracks, artwork) are fetched on page load from the Spotify Web API and reflect the moment you loaded the page. Catalog facts, press quotes and career milestones are sourced from the artist's official channels and published press. Remix scores, like-artist match percentages, and the True-Fans revenue model are the author's analytical estimates for planning purposes — not measured metrics.",
    sources: [
      { label: "Official site & EPK", url: "https://www.tinsleymusic.com/", kind: "Primary" },
      { label: "Spotify artist profile (live)", url: "https://open.spotify.com/artist/1encEkVjZ4iqby8BXZc8Pa", kind: "Live data" },
      { label: "Bandcamp discography", url: "https://musicbytinsley.bandcamp.com/", kind: "Primary" },
      { label: "KEXP", url: "https://www.kexp.org/", kind: "Press" },
      { label: "The Seattle Times (Aug 2026 feature — Lee syndicate reprint)", url: "https://www.yakimaherald.com/news/nation_and_world/entertainment/with-help-from-kexp-dj-seattle-musician-releases-vinyl-album/article_f15d942f-345c-5186-b5a2-780782157ea3.html", kind: "Press" },
      { label: "Atwood Magazine", url: "https://atwoodmagazine.com/tybe-tinsley-bad-enough-song-premiere/", kind: "Press" },
      { label: "The Spokesman-Review", url: "https://www.spokesman.com/stories/2025/mar/20/west-side-indie-pop-rocker-tinsley-brings-new-albu/", kind: "Press" },
      { label: "Kevin Kelly — 1,000 True Fans (2008)", url: "https://kk.org/thetechnium/1000-true-fans/", kind: "Framework" }
    ],
    analytics: {
      // Register this host in Plausible (Settings → Sites). Script loads when non-empty.
      plausibleDomain: "tinsley-marketing-hub.vercel.app",
      vercelInsights: true,
      // Draft Listen URL for artist review — do not send fans or QR here.
      utmDefaults: { source: "bio", medium: "social", campaign: "listen" },
      // One-click UTM presets for field + platform plays (Ops #utm).
      utmPresets: [
        { id: "tiktok-bio", label: "TikTok bio", source: "tiktok", medium: "bio", campaign: "listen", content: "bio" },
        { id: "ig-bio", label: "IG bio", source: "instagram", medium: "bio", campaign: "listen", content: "bio" },
        { id: "ig-story", label: "IG Stories", source: "instagram", medium: "story", campaign: "listen", content: "story" },
        { id: "kexp-qr", label: "KEXP / radio QR", source: "kexp", medium: "qr", campaign: "seattle", content: "radio" },
        { id: "record-shop", label: "Record-shop trail", source: "recordshop", medium: "qr", campaign: "seattle", content: "trail" },
        { id: "chbp-flyer", label: "Capitol Hill Block Party", source: "chbp", medium: "flyer", campaign: "seattle", content: "flyer" },
        { id: "show-poster", label: "Show poster", source: "live", medium: "poster", campaign: "listen", content: "door" },
        { id: "hook-a", label: "Hook A creative", source: "tiktok", medium: "social", campaign: "listen", content: "hook-a" }
      ]
    }
  },

  artist: {
    name: "Tinsley",
    realName: "Olivia Tinsley",
    location: "Seattle, Washington",
    tagline: "Indie pop-rock that's equal parts heartfelt and playful.",
    activeSince: 2018,
    genrePrimary: "Indie Pop-Rock",
    genreTags: ["Indie Pop", "Indie Rock", "Alt-Country", "Folk-Pop", "Bedroom Pop"],
    influences: ["Taylor Swift", "Kacey Musgraves", "Feist", "Sharon Van Etten", "The Cranberries"],
    bio: "Seattle-based singer-songwriter Tinsley makes indie pop-rock that's equal parts heartfelt and playful, blending breezy melodies with sharp lyrical self-awareness. Releasing mononymously since 2018, she blends indie, rock, country and folk textures with emotionally honest, diary-like storytelling. Her 2023 EP \"Love Songs\" was named the #1 pick in The Seattle Times Washington music critics poll, and in January 2025 she released her self-titled debut album with vinyl funded by KEXP DJ John Richards. In August 2026, The Seattle Times featured that vinyl story and the next chapter: new songs in Los Angeles and at Bear Creek Studio in Woodinville, with at least two singles planned before year's end.",
    links: {
      website: "https://www.tinsleymusic.com/",
      linktree: "https://tr.ee/h6fNd7BTOw",
      spotify: "https://open.spotify.com/artist/1encEkVjZ4iqby8BXZc8Pa",
      bandcamp: "https://musicbytinsley.bandcamp.com/",
      instagram: "https://instagram.com/tinsleymusic",
      tiktok: "https://tiktok.com/@tinsleymusic",
      epk: "https://www.tinsleymusic.com/epk",
      shows: "https://www.tinsleymusic.com/shows",
      // Draft Listen surface for review (form posts to /api/subscribe when Kit/webhook env is set).
      listen: "https://tinsley-marketing-hub.vercel.app/listen",
      emailSignup: "https://tinsley-marketing-hub.vercel.app/listen#join",
      youtube: "https://www.youtube.com/@tinsleymusic"
    }
  },

  // ---- Per-deck hero copy (song vs social pages share artist data, not the same job) ----
  decks: {
    song: {
      job: "Catalog & positioning",
      lede: "A music-first read of your catalog: what each era does well, which songs pitch, and who sits next to you on the map — before you write a caption or a press email."
    },
    social: {
      job: "Reach & revenue",
      lede: "Your weekly show-up: social music trends, Instagram desk, posting week, per-song recipes, and the growth roadmap — how listeners become an owned audience."
    },
    ops: {
      job: "Execute & measure",
      lede: "Where you ship: this-week command, ritual, press follow-ups, and a backup so your checks survive browsers."
    },
    tour: {
      job: "Book, advance, settle",
      lede: "Your booking desk: Friday’s day sheet, the advance list, holds, rooms to ask, settlement math, and a run planner — so touring is a system, not a one-off gig."
    }
  },

  // ---- Artist-facing clarity: today, labels, 20-minute jobs ----
  artistGuide: {
    howTo: [
      "This site is for you. Fans stay on tinsleymusic.com.",
      "Pink This week opens your Friday sheet — what to do now.",
      "The numbered path is how you think when you have an hour to plan.",
      "Anything marked Draft is not for QR codes, bios, or tickets."
    ],
    labels: {
      do: { short: "Do", blurb: "A working tool — check things off, copy, ship." },
      review: { short: "Review", blurb: "Read this before you post or email." },
      draft: { short: "Draft", blurb: "Looks public. It isn’t. Don’t send fans here." },
      official: { short: "Official", blurb: "The only place fans, tickets, and the EPK belong." }
    },
    today: {
      kicker: "Do this week",
      title: "Hidden Hall · Friday Aug 28",
      lede: "Advance the show. Official tickets only. Don’t send anyone to this hub.",
      when: "Fri Aug 28, 2026",
      venue: "Hidden Hall",
      bill: "Femme Friday with Girl Parallel and Veronica North",
      doors: "Doors 8:00pm · 21+",
      tickets: "https://www.tinsleymusic.com/shows"
    },
    minutes: {
      song: {
        here: "You’re deciding what to stand on.",
        next: "Next: Marketing — what you post this week.",
        nextHref: "tinsley-social.html",
        steps: [
          "Read the differentiators — one wedge, not ten.",
          "Open Pitch Kit and copy the line you’ll actually say.",
          "Then go to Marketing and pick this week’s song."
        ]
      },
      social: {
        here: "You’re deciding what to post.",
        next: "Next: PR — what you send out.",
        nextHref: "press.html",
        steps: [
          "Scan social music trends — pick one Ride format, skip the costume.",
          "Open the Instagram desk and run the Hidden Hall show week.",
          "Copy this week’s bio. Official tickets only in Stories."
        ]
      },
      ops: {
        here: "You’re shipping the week.",
        next: "Need the night itself? Open the Friday sheet.",
        nextHref: "today.html",
        steps: [
          "Do the This week strip — one command, not the whole OS.",
          "Log a press follow-up if something is overdue.",
          "Export backup after you check things off."
        ]
      },
      tour: {
        here: "You’re advancing Friday.",
        next: "Need the one-page night sheet? Open Today.",
        nextHref: "today.html",
        steps: [
          "Open the show calendar only if you’re checking a date.",
          "Run the Hidden Hall day sheet and advance list.",
          "Stories stickers go to tinsleymusic.com/shows — never this hub."
        ]
      },
      today: {
        here: "This is the only page you need tonight.",
        next: "When the show is advanced, walk the path.",
        nextHref: "index.html#path",
        steps: [
          "Copy the day sheet into Notes.",
          "Post today’s Instagram beat — official ticket sticker.",
          "After the set: thank-yous, not a full-set video."
        ]
      }
    }
  },

  // ---- Listen draft copy (proposed fan landing, for artist review) ----
  listen: {
    headline: "Start here.",
    sub: "Seattle indie pop-rock — honest, playful, and built for people who keep the vinyl close. Next date: Fri Aug 28 at Hidden Hall.",
    primaryCta: "Join the list",
    primaryNote: "Drops, demos, and first dibs — never spam.",
    secondaryCta: "Listen on Spotify",
    showsNote: "Next date: Fri Aug 28 — Femme Friday at Hidden Hall (Seattle) with Girl Parallel and Veronica North. Official tickets live on tinsleymusic.com/shows."
  },

  // ---- "Start Here" playlist pitch (curated entry points for new listeners) ----
  startHere: {
    title: "Start Here — Tinsley",
    blurb: "Five tracks that map the whole artist in under 20 minutes: the country-pop lead, the critics-poll yearning, the dream-pop mood piece, the alt-country wink, and the vulnerable confessional. Pin this as Artist Pick and hand it to editors, sync agents, and first-time listeners.",
    tracks: [
      { title: "Bad Enough", why: "Current chapter — cathartic country-pop hook; strongest sync + playlist candidate." },
      { title: "Classic", why: "Love Songs–era radiance; the romance entry point and wedding/first-dance lane." },
      { title: "Distract Me", why: "Dreamy situationship mood — Obscure Sound praise; soft-playlist and sync bed." },
      { title: "Good Ride (Mechanical Bullshit)", why: "Alt-country wit; proves the lane beyond straight indie-pop." },
      { title: "Hard to Love", why: "Raw confessional — the honesty critics keep naming; Close Friends / acoustic path." }
    ]
  },

  // ---- Career highlights / metrics for the hero band ----
  // confidence: "verified" (sourced fact) | "estimate" (author's analysis).
  // Live Spotify metrics (followers, popularity) are injected at runtime.
  metrics: [
    { value: "19+", label: "Releases in catalog", source: "Bandcamp + streaming discography", confidence: "verified" },
    { value: "2025", label: "Self-titled debut LP", source: "Official EPK", confidence: "verified" },
    { value: "3", label: "Seattle radio stations spinning her", source: "KEXP · 107.7 The End · C89.5", confidence: "verified" },
    { value: "#1", label: "Seattle Times critics poll (2023 EP)", source: "The Seattle Times WA critics poll", confidence: "verified" }
  ],

  // ---- Catalog: chronological-ish assessment of the discography ----
  catalog: [
    { title: "Bad Enough", year: 2026, type: "Single", mood: "Empowered", genre: "Pop-Rock",
      note: "Released Feb 12, 2026; official video premiered Mar 13 at Hotel Crocodile (Lobby Session) and published Mar 21. Atwood: 'cathartic country-pop at its finest.' Strongest sync + playlist candidate." },
    { title: "Temporary Insanity", year: 2025, type: "Single", mood: "Restless", genre: "Indie Pop",
      note: "Recent release extending the debut-era momentum." },
    { title: "Tinsley (Debut LP)", year: 2025, type: "Album", mood: "Coming-of-age", genre: "Indie Pop-Rock",
      note: "Nine-track self-titled debut on grief, relationships and growing up. Vinyl funded by KEXP's John Richards. Featured in The Seattle Times (Aug 2026). The flagship catalog asset." },
    { title: "Hard to Love", year: 2025, type: "Single", mood: "Vulnerable", genre: "Indie Pop",
      note: "Debut-album era track leaning into emotional exposure." },
    { title: "Good Ride (Mechanical Bullshit)", year: 2024, type: "Single", mood: "Wry", genre: "Alt-Country",
      note: "Tender indie twang with 'emotional whiplash' — showcases her country-pop lane and lyrical wit." },
    { title: "Distract Me", year: 2024, type: "Single", mood: "Dreamy", genre: "Dream-Pop",
      note: "'A dreamily caressing pop success' (Obscure Sound). Great mood-playlist fit." },
    { title: "Classic", year: 2023, type: "Single", mood: "Romantic", genre: "Indie Pop",
      note: "Radiant, romance-driven yearning; a fan-favorite from the Love Songs era." },
    { title: "Just Three Words", year: 2023, type: "Single", mood: "Tender", genre: "Folk-Pop",
      note: "Intimate storytelling in the singer-songwriter tradition." },
    { title: "Love Songs (EP)", year: 2023, type: "EP", mood: "Yearning", genre: "Indie Pop",
      note: "Breakthrough EP — #1 in The Seattle Times WA critics poll (DJ Marco Collins). Cemented her as a tastemaker favorite." },
    { title: "Too Bad", year: 2022, type: "Single", mood: "Bittersweet", genre: "Indie Pop", note: "Early-era single." },
    { title: "Heart Attack", year: 2021, type: "Single", mood: "Anxious", genre: "Synth-Pop", note: "Electronic-leaning collaboration era." },
    { title: "Endless Summer", year: 2021, type: "Single", mood: "Nostalgic", genre: "Pop", note: "Warm, seasonal pop." },
    { title: "Skin", year: 2020, type: "Single", mood: "Sensual", genre: "Electro-Pop", note: "With producer Justin Hartinger." },
    { title: "Lovesick", year: 2020, type: "Single", mood: "Longing", genre: "Electro-Pop", note: "With Justin Hartinger — dance-pop leaning." },
    { title: "Slow & Steady", year: 2019, type: "Single", mood: "Reflective", genre: "Electro-Pop", note: "With Justin Hartinger." },
    { title: "In Bloom", year: 2019, type: "Single", mood: "Hopeful", genre: "Electro-Pop", note: "With Jake Crocker (Sony)." },
    { title: "Hear My Love", year: 2019, type: "Single", mood: "Devotional", genre: "Pop", note: "Early collaborative pop." },
    { title: "Tinsley - EP", year: 2018, type: "EP", mood: "Formative", genre: "Electro-Pop", note: "With Jake Crocker — earliest EP as Tinsley." },
    { title: "the end - demos", year: 2023, type: "Demos", mood: "Raw", genre: "Acoustic", note: "Stripped, demo-format release for superfans." }
  ],

  // ---- Genre / era distribution for the chart ----
  genreMix: [
    { label: "Indie Pop", value: 32 },
    { label: "Indie / Pop-Rock", value: 24 },
    { label: "Electro-Pop (early)", value: 22 },
    { label: "Alt-Country / Folk", value: 14 },
    { label: "Dream / Synth-Pop", value: 8 }
  ],

  // ---- SWOT-style catalog assessment (music / catalog lens — social tactics live on the social deck) ----
  assessment: {
    strengths: [
      "Distinct, 'smokey' vocal identity praised by American Songwriter — a recognizable instrument across eras.",
      "Genre range (indie, rock, country, folk, electro-pop) = multiple playlist and sync lanes without changing the voice.",
      "Deep 19+ track catalog with a flagship self-titled LP and a clear country-pop lead single ('Bad Enough').",
      "Elite local validation: KEXP, 107.7 The End, C89.5, an August 2026 Seattle Times feature, and a #1 Seattle Times critics poll — press that playlist editors trust."
    ],
    opportunities: [
      "Country-pop lane ('Bad Enough', 'Good Ride') is trending — pitch to country-crossover editors and Americana curators.",
      "Sync / TV: hook-forward, diary-clear songs ('Bad Enough', 'Classic', 'Hard to Love') fit teen / YA / coming-of-age cues.",
      "Early electro-pop stems ('Skin', 'Lovesick', 'Heart Attack') are remix-ready — highest dance-floor conversion with least production overhaul.",
      "Vinyl / KEXP funding story now has an August 2026 Seattle Times feature — use it for press, bookers, and merch."
    ],
    watchouts: [
      "Mononym 'Tinsley' collides in search with Tinsley Ellis (blues) & 'tinsel' — title tracks and 'TinsleyMusic' matter for SEO.",
      "Broad genre spread can blur positioning; pick one hero lane per release cycle, not one forever sound.",
      "2018–2026 stylistic shifts need a curated 'Start Here' playlist so new listeners don't land on formative electro first.",
      "Critical acclaim outruns streaming reach — convert press into editorial playlist pitches, not more catalog sprawl."
    ]
  },

  // ---- Market differentiators (how not to be interchangeable with diary-pop peers) ----
  differentiators: {
    enemy: "The crowded diary-pop / sad-girl confessional lane — Maisie Peters, Gracie Abrams, Lizzy McAlpine peers.",
    wedge: "Win on assets they can’t copy: Seattle country-pop, KEXP-funded vinyl provenance, and a smokey vocal identity.",
    oneLiner: "Seattle indie pop-rock with a country-pop edge.",
    thisMonth: [
      "Lock the one-liner everywhere (bios, Press Kit, Bad Enough creatives).",
      "Ship a KEXP-vinyl myth series (unboxing, needle-drop, John Richards lore).",
      "Run only Bad Enough country-Seattle creatives this cycle.",
      "Harden TinsleyMusic SEO — mononym collisions are brand risk."
    ],
    groups: [
      {
        id: "wedges",
        title: "Own the wedges",
        blurb: "Levers peers in the confessional lane cannot manufacture.",
        items: [
          { title: "Lead with Seattle country-pop", action: "Use one hero line this cycle — kill competing descriptors in bios and creatives.", why: "“Indie girl with feelings” is a commodity; Seattle + country-pop is scarce." },
          { title: "KEXP-funded vinyl as brand myth", action: "Monthly content + merch that only works because the pressing story is true.", why: "Provenance is a moat — algorithm peers can’t buy this narrative." },
          { title: "Weaponize the smokey vocal", action: "Close-mic, imperfect takes as the default visual signature.", why: "A recognizable instrument beats another polished lip-sync clone." },
          { title: "“Country but make it Seattle”", action: "Recurring format: twang + rain / ferry / Capitol Hill — never Nashville cosplay.", why: "Alt-country without the costume is an empty competitive space." },
          { title: "Own the mononym", action: "Standardize TinsleyMusic; clear title tracks; SEO against Tinsley Ellis / tinsel collisions.", why: "Brand defense is differentiation when search is contested." }
        ]
      },
      {
        id: "path",
        title: "Compete on path",
        blurb: "How she enters the market should not look like a pure TikTok peer.",
        items: [
          { title: "Tastemaker-first, TikTok-second", action: "Lead pitches with the Aug 2026 Seattle Times feature + #1 poll + KEXP / The End / C89.5 — then short-form.", why: "She’s critic-born; most confessional peers are algorithm-born." },
          { title: "Pin Start Here hard", action: "Never let discovery land on formative electro first.", why: "Coherence is the product when the catalog spans eras." },
          { title: "One hero lane per release", action: "Bad Enough = country-pop glow-up. Next single ≠ also dream-pop.", why: "Range is a strength only when cycles are sequential." }
        ]
      },
      {
        id: "products",
        title: "Products only she can sell",
        blurb: "Offers that lean on honesty, hometown, and owned audience.",
        items: [
          { title: "Superfan demos / Close Friends", action: "Raw scraps + vinyl lore as the product, not another polished reel.", why: "Intimacy scales when the feed is full of polish." },
          { title: "Sync with scene language", action: "Pitch Bad Enough / Classic / Hard to Love as choose-yourself / YA / coming-of-age — not “available for sync.”", why: "Mood specificity beats generic indie availability." },
          { title: "Hometown flywheel as moat", action: "Record-shop days, KEXP-adjacent bills, Block Party path before national openers.", why: "PNW inevitability is the story national bookers buy." }
        ]
      },
      {
        id: "avoid",
        title: "Don’t look like everyone else",
        blurb: "Borrow the audience; don’t borrow the aesthetic.",
        items: [
          { title: "Skip pure whisper-core / pure sad-girl cosplay", action: "Wit + twang + Seattle over Gracie-adjacent whisper aesthetics.", why: "Copying the category leader collapses positioning." },
          { title: "Collab sideways, not up-copy", action: "Remix early electro (Skin / Lovesick) or PNW peers — not a soundalike feature.", why: "Sideways moves expand the map without erasing the wedge." }
        ]
      }
    ]
  },

  // ---- Hashtag strategy (grouped) ----
  hashtags: {
    Brand: ["#Tinsley", "#TinsleyMusic", "#TinsleyTheAlbum", "#BadEnough"],
    Genre: ["#IndiePop", "#IndieRock", "#IndiePopRock", "#CountryPop", "#FolkPop", "#SingerSongwriter", "#BedroomPop", "#DreamPop", "#NewMusic", "#NewMusicFriday", "#IndieArtist", "#UnsignedArtist"],
    Location: ["#SeattleMusic", "#PNWMusic", "#SeattleArtist", "#PacificNorthwest", "#206Music", "#EmeraldCity", "#KEXP", "#CapitolHillBlockParty"],
    Community: ["#WomenInMusic", "#FemaleSingerSongwriter", "#WomenOfIndie", "#SupportIndieMusic", "#IndieMusicScene", "#DiscoverIndie", "#FreshFinds", "#ForTheGirls"],
    Discovery: ["#NewMusicAlert", "#OnRepeat", "#SadGirlMusic", "#Heartbreak", "#BreakupSong", "#LyricsThatHit", "#MusicTok", "#IndieTok", "#SongwritersOfInstagram"]
  },

  // ---- Per-song hashtag targeting for TikTok & Instagram ----
  // TikTok: lean, discovery/FYP + trend + niche-community tags (5-8 per post).
  // Instagram: layered by reach tier — Broad (>500k), Mid (50-500k), Niche (<50k)
  // weekPlan: a 3-beat weekly content recipe tied to the growth roadmap's short-form cadence.
  songHashtags: [
    { title: "Bad Enough", angle: "Post-breakup glow-up / 'choose yourself' anthem — lip-sync the hook with a revenge-glow-up transition.",
      weekPlan: [
        "Mon — Hook lip-sync + text: 'choosing me' (FYP test).",
        "Wed — 15s story-behind: one line about writing the chorus.",
        "Fri — Stitch/duet ask: 'show your glow-up to this hook.'"
      ],
      igPlan: [
        "Reel — Glow-up transition. Hook in 1.2s, on-screen text ‘choosing me,’ save prompt in caption.",
        "Carousel — 5 slides: the lyric / the Atwood quote / the story / Start Here / Hidden Hall.",
        "Stories — 3 frames of the Reel + official ticket sticker (tinsleymusic.com/shows)."
      ],
      roadmapHook: "0–30 days · Short-form",
      tiktok: ["#BadEnough", "#breakuptok", "#glowup", "#revengeglowup", "#choosingme", "#countrypop", "#indiepop", "#sadgirlmusic"],
      igBroad: ["#breakupsong", "#countrypop", "#newmusicfriday", "#selflove"],
      igMid: ["#indiepop", "#femalesingersongwriter", "#womeninmusic", "#glowup"],
      igNiche: ["#BadEnough", "#TinsleyMusic", "#seattlemusic", "#pnwmusic", "#indieartist"] },

    { title: "Temporary Insanity", angle: "Chaotic-era / overthinking spiral — POV text overlay of intrusive thoughts over the beat.",
      weekPlan: [
        "Mon — POV overthinking captions timed to the beat drop.",
        "Wed — 'Green flag / red flag' list set to the chorus.",
        "Fri — Relatable comment reply stitch from a fan DM."
      ],
      igPlan: [
        "Reel — Green-flag / red-flag list timed to the chorus. Last slide: ‘comment your color.’",
        "Carousel — Intrusive-thought cards (6 slides) ending on a listen sticker.",
        "Stories — Add Yours: ‘a thought you wish had a chorus.’"
      ],
      roadmapHook: "31–60 days · Social",
      tiktok: ["#TemporaryInsanity", "#chaoticera", "#overthinking", "#indiepop", "#relatable", "#indietok", "#newmusic"],
      igBroad: ["#newmusicfriday", "#indiepop", "#alternativemusic"],
      igMid: ["#indierock", "#femalesingersongwriter", "#womeninmusic"],
      igNiche: ["#TemporaryInsanity", "#TinsleyMusic", "#seattlemusic", "#pnwmusic", "#newsingle"] },

    { title: "Tinsley (Debut LP)", angle: "Album era + vinyl story (KEXP-funded pressing) — vinyl unboxing / 'coming of age' montage.",
      weekPlan: [
        "Mon — Vinyl unboxing / needle-drop of a deep cut.",
        "Wed — Track-by-track carousel: one lyric that defined the era.",
        "Fri — 'If you only listen to 3 songs…' Start Here clip."
      ],
      igPlan: [
        "Reel — Needle-drop + one line: vinyl funded by KEXP’s John Richards.",
        "Carousel — Track-by-track: one lyric that defined growing up.",
        "Stories — Close Friends: packing / signing a copy, then invite to Highlights → Vinyl."
      ],
      roadmapHook: "0–30 days · Streaming + D2C",
      tiktok: ["#Tinsley", "#debutalbum", "#vinyltok", "#vinylrecords", "#comingofage", "#indiepop", "#albumrelease"],
      igBroad: ["#vinylcommunity", "#vinylrecords", "#recordcollection"],
      igMid: ["#indiepop", "#indierock", "#kexp"],
      igNiche: ["#TinsleyTheAlbum", "#TinsleyMusic", "#seattlemusic", "#pnwmusic", "#comingofage"] },

    { title: "Distract Me", angle: "Dreamy situationship / crush-core — soft-focus b-roll with lyric captions.",
      weekPlan: [
        "Mon — Soft b-roll + lyric caption on the dreamiest line.",
        "Wed — 'Songs for your situationship' stitch bait.",
        "Fri — Aesthetic Seattle night-walk edit to the chorus."
      ],
      igPlan: [
        "Reel — Rainy Seattle walk, lyric on the dreamiest line, no talking.",
        "Carousel — ‘Songs for your situationship’ 4-slide stack (Distract Me last).",
        "Stories — Poll: crush / almost / rewind — then link Start Here."
      ],
      roadmapHook: "31–60 days · Paid Ads (boost winners)",
      tiktok: ["#DistractMe", "#dreampop", "#situationship", "#crushcore", "#bedroompop", "#softgirl", "#musictok"],
      igBroad: ["#dreampop", "#bedroompop", "#chillmusic"],
      igMid: ["#indiepop", "#softpop", "#femaleartist"],
      igNiche: ["#DistractMe", "#TinsleyMusic", "#seattlemusic", "#dreamy", "#indieartist"] },

    { title: "Good Ride (Mechanical Bullshit)", angle: "Wry alt-country / coastal-cowgirl — boots + truck b-roll, lean into the funny title bleep.",
      weekPlan: [
        "Mon — Title bleep gag + boots / truck b-roll.",
        "Wed — Coastal-cowgirl trend with the twang hook.",
        "Fri — 'Country but make it Seattle' positioning clip."
      ],
      igPlan: [
        "Reel — Title bleep + boots. Caption: ‘country, but make it Seattle.’",
        "Carousel — Coastal-cowgirl starter pack (song / look / like-artists Faye + Kacey).",
        "Stories — Add Yours: ‘your most country moment in a city.’"
      ],
      roadmapHook: "31–60 days · Playlists + Sync",
      tiktok: ["#GoodRide", "#countrytok", "#coastalcowgirl", "#altcountry", "#indiecountry", "#cowgirl", "#newmusic"],
      igBroad: ["#countrymusic", "#americana", "#countrypop"],
      igMid: ["#altcountry", "#indiecountry", "#femalesingersongwriter"],
      igNiche: ["#GoodRide", "#TinsleyMusic", "#seattlemusic", "#twang", "#indieartist"] },

    { title: "Classic", angle: "Romantic / first-dance energy — couple montages, wedding & anniversary use.",
      weekPlan: [
        "Mon — Couple montage / first-dance aspirational clip.",
        "Wed — 'Put this on your wedding playlist' soft CTA.",
        "Fri — Fan-submitted anniversary stitch request."
      ],
      igPlan: [
        "Reel — First-dance energy, save CTA: ‘wedding playlist.’",
        "Carousel — When to use Classic (ceremony / drive home / anniversary).",
        "Stories — Ask for anniversary clips; add the best to Highlights → Love."
      ],
      roadmapHook: "61–90 days · PR (sync + wedding blogs)",
      tiktok: ["#Classic", "#lovesong", "#couplegoals", "#weddingsong", "#inlove", "#indiepop", "#romantic"],
      igBroad: ["#lovesong", "#weddingmusic", "#firstdancesong"],
      igMid: ["#indiepop", "#couplegoals", "#romantic"],
      igNiche: ["#ClassicSong", "#TinsleyMusic", "#seattlemusic", "#femalesingersongwriter", "#indieartist"] },

    { title: "Love Songs (EP)", angle: "Yearning + tastemaker cred (#1 Seattle Times critics poll) — 'songs for the hopeless romantics' carousel.",
      weekPlan: [
        "Mon — Critics-poll flex as a 3-slide carousel.",
        "Wed — 'Hopeless romantic starter pack' EP medley.",
        "Fri — Comment prompt: which Love Songs track are you?"
      ],
      igPlan: [
        "Reel — Seattle Times #1 screenshot → needle-drop of the yearning cut.",
        "Carousel — Hopeless-romantic starter pack + ‘which track are you?’ last slide.",
        "Stories — Poll the three EP moods; DM the winner a Start Here link."
      ],
      roadmapHook: "0–30 days · Positioning + PR",
      tiktok: ["#LoveSongs", "#yearning", "#indiepop", "#sadgirlmusic", "#indietok", "#singersongwriter", "#feelings"],
      igBroad: ["#lovesongs", "#indiepop", "#newmusic"],
      igMid: ["#indierock", "#femalesingersongwriter", "#kexp"],
      igNiche: ["#LoveSongsEP", "#TinsleyMusic", "#seattlemusic", "#pnwmusic", "#marcocollins"] },

    { title: "Hard to Love", angle: "Vulnerable confessional — raw acoustic clip or 'the version I don't post' intimacy.",
      weekPlan: [
        "Mon — Close-mic acoustic, no polish — intimacy bait.",
        "Wed — Lyric-that-hits caption on the most exposed line.",
        "Fri — 'Songs I almost didn't release' framing."
      ],
      igPlan: [
        "Reel — Close-mic, lamp light, no polish. First line on screen.",
        "Carousel — ‘The version I almost didn’t release’ + the lyric that stays.",
        "Close Friends — Voice note of the exposed line, then invite to the public Reel next day."
      ],
      roadmapHook: "61–90 days · Superfans (Close Friends)",
      tiktok: ["#HardToLove", "#vulnerable", "#sadgirlmusic", "#indiepop", "#feelings", "#musictok", "#lyricsthathit"],
      igBroad: ["#sadsongs", "#indiepop", "#newmusic"],
      igMid: ["#indierock", "#femalesingersongwriter", "#womeninmusic"],
      igNiche: ["#HardToLove", "#TinsleyMusic", "#seattlemusic", "#pnwmusic", "#indieartist"] }
  ],

  // ---- Daily content calendar (reusable Mon–Sun cadence) ----
  // Aligns with the 0–30 day Short-form lever (4–5×/week TikTok + Reels).
  // Mon / Wed / Fri pull the featured song's weekPlan beats; other days are
  // create, amplify, community, or bank — so publishing never starves the work.
  contentCalendar: {
    cadence: "4–5 publish days per week on TikTok + Reels. This is the posting week — show dates live on the show calendar.",
    principle: "Make every day. Publish on a schedule that never starves the work.",
    roadmapHook: "0–30 days · Short-form",
    days: [
      {
        key: "mon", label: "Mon", role: "publish", focus: "Discovery — FYP test",
        songBeat: 0,
        slots: [
          { platform: "TikTok", format: "15–30s", kind: "publish", idea: "Lead with the week's hook. Ship the featured song's Monday beat." },
          { platform: "IG Stories", format: "Teaser", kind: "amplify", idea: "3 frames: hook clip, one lyric, then a sticker — official tickets if a show is up, otherwise Start Here." }
        ]
      },
      {
        key: "tue", label: "Tue", role: "create", focus: "Batch + engage",
        slots: [
          { platform: "Studio", format: "Batch", kind: "create", idea: "Film 2–3 clips for Wed / Fri / next Mon while the take is hot. Shoot a vertical cover frame for Reels — don’t reuse the TikTok crop." },
          { platform: "TikTok", format: "Replies", kind: "engage", idea: "Reply to 5–10 comments with a clip or stitch — feed the algorithm without a new post." },
          { platform: "Instagram", format: "Replies + saves", kind: "engage", idea: "Reply to Reel comments by name; ask one save question in the thread (‘which line hit?’)." }
        ]
      },
      {
        key: "wed", label: "Wed", role: "publish", focus: "Depth — story / carousel",
        songBeat: 1,
        slots: [
          { platform: "TikTok", format: "15–45s", kind: "publish", idea: "Ship the featured song's Wednesday beat (story-behind or listicle)." },
          { platform: "Instagram", format: "Reel / carousel", kind: "publish", idea: "Ship the song’s Instagram recipe — recut the first 1.2s, Broad + Mid + Niche tags, one CTA (save, comment, or official link)." }
        ]
      },
      {
        key: "thu", label: "Thu", role: "amplify", focus: "Repurpose winners",
        slots: [
          { platform: "IG Reels", format: "Recut", kind: "amplify", idea: "Repurpose Mon/Wed winners within 24–48h. New cover frame, rewritten first line, same hook — never a raw TikTok dump." },
          { platform: "YouTube Shorts", format: "Cut", kind: "amplify", idea: "Drop the best-performing clip as a Short for long-tail SEO." }
        ]
      },
      {
        key: "fri", label: "Fri", role: "publish", focus: "Community bait",
        songBeat: 2,
        slots: [
          { platform: "TikTok", format: "Stitch / duet / ask", kind: "publish", idea: "Ship the featured song's Friday beat — invite fan participation." },
          { platform: "IG Close Friends", format: "Demo / BTS", kind: "superfan", idea: "Unpolished clip, voice note, or lyric scrap — then a public Reel tomorrow so CF feels first." }
        ]
      },
      {
        key: "sat", label: "Sat", role: "community", focus: "Scene + conversation",
        slots: [
          { platform: "Threads / X", format: "Replies", kind: "engage", idea: "Jump into KEXP / Seattle music threads; lyric micro-post if there's a natural hook." },
          { platform: "IG Stories", format: "Poll / Q&A", kind: "engage", idea: "One real ask (deep cut, show city, lyric guess). Screenshot the winning reply into Monday’s Reel." }
        ]
      },
      {
        key: "sun", label: "Sun", role: "bank", focus: "Protect the practice",
        slots: [
          { platform: "Studio", format: "Bank", kind: "create", idea: "Fill next week's content bank — aim 3 clips ahead. No algorithmic post required." },
          { platform: "Email / Bandcamp", format: "Optional", kind: "owned", idea: "Only if there's a drop, show, or vinyl story — otherwise rest the channels." }
        ]
      }
    ]
  },

  // ---- Guerrilla street picks applied to Tinsley (from the Top 100 field guide) ----
  streetPicks: [
    { rank: 1, title: "3D Sidewalk Chalk Art", category: "Chalk & Pavement", cost: "$$$",
      angle: "Anamorphic 'Bad Enough' lyric / choose-yourself hole-in-the-ground on Capitol Hill — photo bait for TikTok." },
    { rank: 35, title: "QR Treasure Hunt", category: "Stickers & Posters", cost: "$",
      angle: "QR trail from KEXP / record shops to a Bandcamp demo unlock — converts street curiosity to owned email." },
    { rank: 23, title: "Roaming Brand Mascot", category: "Wearable & Human", cost: "$$$",
      angle: "Coastal-cowgirl / diary-girl character at Block Party or UW campus weekend — lean into Good Ride twang." },
    { rank: 45, title: "Photo Booth Portal", category: "Interactive & Experiential", cost: "$$$",
      angle: "Vinyl-unboxing / 'Start Here' listening booth at a merch pop-up — prints a Start Here tracklist card." },
    { rank: 62, title: "Drone Light Show", category: "Transit & Vehicles", cost: "$$$$",
      angle: "Only for a festival headline moment — Tinsley monogram over the waterfront as a once-a-year spectacle." },
    { rank: 100, title: "Golden Ticket Street Hunt", category: "Freebies & Sampling", cost: "$$",
      angle: "Hide signed vinyl inserts / show tickets around Seattle; social clues drive True Fan conversion." }
  ],

  // ---- Social media opportunities per platform ----
  social: [
    { platform: "TikTok", handle: "@tinsleymusic", priority: "Highest",
      why: "Best discovery engine for sad-girl / breakup indie-pop; short lyric-hook clips scale fast.",
      plays: ["Lyric POV videos on 'Bad Enough' hook ('choose yourself' angle).", "'Story behind the song' series for the debut LP.", "Duet/stitch with fans covering her songs.", "Behind-the-scenes Seattle studio + vinyl unboxing."] },
    { platform: "Instagram", handle: "@tinsleymusic", priority: "High",
      why: "Home base. TikTok finds strangers; Instagram keeps them — grid, Stories, Close Friends, and official ticket stickers.",
      desk: "tinsley-social.html#instagram",
      plays: [
        "Open the Instagram desk for Reels, carousels, Stories, Close Friends, and Hidden Hall week.",
        "Recut TikTok winners for Reels (new 1.2s cover — never a raw dump).",
        "Carousels do the work Reels can’t: press stack, Start Here, track-by-track.",
        "Stories convert: official tickets only, polls that become Monday’s Reel.",
        "Close Friends first, public next day — that’s how superfans stay."
      ] },
    { platform: "Spotify", handle: "Artist profile", priority: "High",
      why: "Conversion + retention layer; where press and TikTok interest turns into streams.",
      plays: ["Pitch every release via Spotify for Artists 4+ weeks early.", "Maintain an Artist Pick + 'Start Here' playlist.", "Canvas loops for each single.", "Target editorial: Fresh Finds, Indie Pop, New Music Friday PNW."] },
    { platform: "YouTube", handle: "Channel", priority: "Medium",
      why: "Long-tail SEO + live performance credibility (KING 5, Capitol Hill Block Party footage).",
      plays: ["Live session / acoustic versions.", "Lyric videos for catalog SEO.", "Shorts cut from TikTok winners."] },
    { platform: "Bandcamp", handle: "musicbytinsley", priority: "Medium",
      why: "Highest-margin superfan revenue + vinyl/merch storytelling.",
      plays: ["Bandcamp Fridays drops.", "Exclusive demos ('the end - demos').", "Limited vinyl + bundle merch."] },
    { platform: "Threads / X", handle: "@tinsleymusic", priority: "Low-Med",
      why: "Real-time scene engagement with KEXP, journalists and PNW music community.",
      plays: ["Reply-guy into KEXP + Seattle music threads.", "Lyric micro-posts.", "Press-win reshares for credibility."] }
  ],

  // ---- Instagram desk (home-base marketing, not a second TikTok) ----
  instagramPlaybook: {
    handle: "@tinsleymusic",
    job: "TikTok finds strangers. Instagram turns them into ticket-buyers, Close Friends, and email.",
    principle: "Reels can hunt. The grid, Stories, and Close Friends convert. Official tickets only — tinsleymusic.com/shows.",
    rules: [
      "Recut the first 1.2s for Reels. A raw TikTok dump dies on the cover frame.",
      "Every caption has one job: save, comment, Close Friends, or an official link.",
      "Hashtags: 2 Broad + 2 Mid + 2 Niche from the song’s Instagram tiers.",
      "Stories stickers beat ‘link in bio’ on show weeks.",
      "Close Friends first, public the next day — so superfans stay first."
    ],
    profile: {
      bio: "Seattle indie pop-rock · Bad Enough out now\nFri Aug 28 · Hidden Hall · Femme Friday\nStart here + official tickets ↓",
      highlights: [
        { name: "Start Here", use: "5-track entry + Bandcamp / Spotify stickers" },
        { name: "Shows", use: "Official calendar only — next date pinned" },
        { name: "Press", use: "Seattle Times 2026, Atwood, KEXP vinyl" },
        { name: "Vinyl", use: "John Richards / KEXP pressing story" },
        { name: "Close Friends", use: "How to get added + what they get" }
      ],
      grid: "Alternate performance stills, lyric cards, and one press/proof tile every third post. Warm rose–sand, not generic sad-girl blue."
    },
    thisWeek: {
      title: "Hidden Hall week · Aug 21–28",
      lede: "Femme Friday with Girl Parallel and Veronica North. Doors 8:00pm, 21+. Every Story sticker goes to tinsleymusic.com/shows.",
      beats: [
        { day: "Fri 21", format: "Stories", idea: "Soft announce: ‘one week.’ Tag the bill. Countdown sticker." },
        { day: "Sat 22", format: "Reel", idea: "15s: last time at Hidden Hall (80s prom) → this Friday. Save = reminder." },
        { day: "Sun 23", format: "Carousel", idea: "What to expect: doors, bill, merch, official tickets. No third-party links." },
        { day: "Mon 24", format: "Reel", idea: "Bad Enough glow-up — caption ends on the date." },
        { day: "Tue 25", format: "Stories", idea: "Q&A: setlist guesses. Screenshot the funniest for Wednesday." },
        { day: "Wed 26", format: "Reel + CF", idea: "Public: one lyric from the support set. CF: voice-note nerves." },
        { day: "Thu 27", format: "Stories", idea: "Load-in kit, outfit poll, last ticket sticker." },
        { day: "Fri 28", format: "Stories live", idea: "Doors → one clip (audio ok) → merch table. Thank-you DMs after — never post the full set." }
      ]
    },
    pillars: [
      { id: "reels", label: "Reels" },
      { id: "carousel", label: "Carousels" },
      { id: "stories", label: "Stories" },
      { id: "closefriends", label: "Close Friends" },
      { id: "collab", label: "Collabs" },
      { id: "show", label: "Show week" }
    ],
    ideas: [
      { id: "glowup", pillar: "reels", title: "Choosing me glow-up", format: "Reel · 12–20s", song: "Bad Enough", hook: "Hook in 1.2s. On-screen: ‘choosing me.’", do: "Outfit / hair / room flip on the chorus. End on her face, not a logo.", caption: "Choosing me was the plot twist.", cta: "Save for the next time you need it." },
      { id: "needledrop", pillar: "reels", title: "KEXP vinyl needle-drop", format: "Reel · 15–25s", song: "Tinsley (Debut LP)", hook: "Needle hits the groove, then one line of lore.", do: "Close-up vinyl + card: funded by KEXP’s John Richards.", caption: "The record that still introduces people to her.", cta: "Start Here is in Highlights." },
      { id: "flags", pillar: "reels", title: "Green flag / red flag", format: "Reel · list", song: "Temporary Insanity", hook: "First card on beat. Last card asks for a color.", do: "6 flags timed to the chorus. No talking required.", caption: "Intrusive thoughts, but make it a chorus.", cta: "Comment your color." },
      { id: "seattle-country", pillar: "reels", title: "Country, but make it Seattle", format: "Reel · 12–18s", song: "Good Ride", hook: "Title bleep + boots in frame one.", do: "Dashboard night-drive or Pike/Capitol Hill contrast, not a costume.", caption: "Alt-country wit. City rain.", cta: "Save if this is your lane." },
      { id: "starthere3", pillar: "reels", title: "If you only listen to three", format: "Reel · 20s", song: "Tinsley (Debut LP)", hook: "Text: Start Here. Three title cards, one hook each.", do: "Bad Enough / Distract Me / Classic — or swap Hard to Love for intimacy weeks.", caption: "The door, not the discography.", cta: "Highlights → Start Here." },
      { id: "ifyoulike", pillar: "reels", title: "If you like Maisie / Gracie / Samia", format: "Reel · 15s", song: "Bad Enough", hook: "Name the like-artist in the first line, then her hook.", do: "One honest overlap, not a pile-on. End on Tinsley, not the comparison.", caption: "Same diary. Different rain.", cta: "Follow for the Seattle version." },
      { id: "whisper", pillar: "reels", title: "The version I don’t usually post", format: "Reel · close-mic", song: "Hard to Love", hook: "First sung line on screen. Lamp light only.", do: "No polish, no jump cuts. Let a breath stay in.", caption: "Honesty made audible.", cta: "Close Friends get the take before anyone else." },
      { id: "putthison", pillar: "reels", title: "Put this on when you leave the party", format: "Reel · mood", song: "Distract Me", hook: "Rain / window / headphones. Lyric on the dreamiest line.", do: "No talking. Let the song sell the situationship.", caption: "For the almosts.", cta: "Save to the late-night playlist." },
      { id: "press-stack", pillar: "carousel", title: "Proof stack", format: "Carousel · 5", song: "Bad Enough", hook: "Slide 1 is the Seattle Times Richards line, not a selfie.", do: "Seattle Times 2026 → Atwood → KEXP vinyl → Spokesman → listen.", caption: "The quotes that already exist. Use them.", cta: "Save for editors / bookers you DM later." },
      { id: "trackbytrack", pillar: "carousel", title: "Track-by-track growing up", format: "Carousel · 9+", song: "Tinsley (Debut LP)", hook: "One lyric per track. No essay.", do: "Last slide is Start Here, not ‘stream now.’", caption: "Nine tracks on growing up.", cta: "Comment the track that still stings." },
      { id: "starthere5", pillar: "carousel", title: "Start Here cards", format: "Carousel · 6", song: "Tinsley (Debut LP)", hook: "Cover + five songs + why each.", do: "Match the Listen draft order. Warm rose–sand tiles.", caption: "New here? This is the door.", cta: "Highlights → Start Here." },
      { id: "wrotechorus", pillar: "carousel", title: "How the chorus showed up", format: "Carousel · 6", song: "Bad Enough", hook: "Slide 1: one true sentence about writing it.", do: "Phone-note photo, then the finished hook, then the listen.", caption: "Diary-clear. Then a chorus.", cta: "Share with someone in their glow-up." },
      { id: "hopeless", pillar: "carousel", title: "Hopeless romantic starter pack", format: "Carousel · 5", song: "Love Songs (EP)", hook: "Seattle Times #1 as social proof, not a humblebrag.", do: "Mood → track → lyric → ‘which are you?’", caption: "Still the yearning blueprint.", cta: "Comment your track." },
      { id: "rooms", pillar: "carousel", title: "Rooms already played", format: "Carousel · 6", song: "", hook: "2026 proof for bookers scrolling the grid.", do: "Hidden Hall / Barboza / Spanish Ballroom / Wild Buffalo / Town Hall / Suzzallo run.", caption: "PNW first. Then the map.", cta: "Bookers: EPK in bio. Fans: official calendar." },
      { id: "ticket-sticker", pillar: "stories", title: "Official ticket sticker", format: "Stories · 3", song: "", hook: "Frame 1 is the date. Frame 3 is the sticker.", do: "Link only tinsleymusic.com/shows. Tag Girl Parallel + Veronica North this week.", caption: "", cta: "Sticker, not ‘link in bio.’" },
      { id: "addyours", pillar: "stories", title: "Add Yours — a lyric that chose you", format: "Stories · Add Yours", song: "Hard to Love", hook: "Her lyric first, then the template.", do: "Repost the best three to the grid Stories; screenshot for Monday.", caption: "", cta: "Use Add Yours, then reply to every one." },
      { id: "poll-cut", pillar: "stories", title: "Deep-cut poll → Monday Reel", format: "Stories · poll", song: "Love Songs (EP)", hook: "Two real options, not engagement bait.", do: "Winner becomes Wednesday’s carousel or Monday’s Reel cover.", caption: "", cta: "DM the winner a Start Here link." },
      { id: "qa-dm", pillar: "stories", title: "Q&A that becomes a DM", format: "Stories · Q&A", song: "", hook: "Ask something she will actually answer.", do: "Public answers for fun; private DMs get Start Here or the list.", caption: "", cta: "Soft CTA: ‘want the door? I’ll send Start Here.’" },
      { id: "merch-after", pillar: "stories", title: "After-show merch table", format: "Stories · night-of", song: "", hook: "One clip, then the table, then thank-you.", do: "Never the full set. QR to official list / next date only.", caption: "", cta: "Thank-you DMs within 24h." },
      { id: "voicenote", pillar: "closefriends", title: "Voice note before the Reel", format: "Close Friends", song: "Bad Enough", hook: "Unmixed chorus or the line she almost cut.", do: "Post CF tonight; public Reel tomorrow with ‘you heard it first.’", caption: "", cta: "Highlight: how to get added." },
      { id: "daynerves", pillar: "closefriends", title: "Day-of-show nerves", format: "Close Friends", song: "", hook: "Honest, short, no polish.", do: "Hidden Hall morning. Public Stories stay useful (doors, tickets).", caption: "", cta: "Makes CF feel like a room, not a broadcast." },
      { id: "packing", pillar: "closefriends", title: "Packing / signing vinyl", format: "Close Friends", song: "Tinsley (Debut LP)", hook: "Hands + needle + a thank-you.", do: "Invite CF to Highlights → Vinyl after.", caption: "", cta: "True Fan fuel without a store link dump." },
      { id: "tagbill", pillar: "collab", title: "Tag the bill", format: "Reel + Stories", song: "", hook: "Name Girl Parallel and Veronica North in frame one.", do: "Ask for a collab Reel or at least a shared Story. Cross-tags compound local reach.", caption: "Femme Friday. Three names.", cta: "Official tickets in the sticker." },
      { id: "fancovers", pillar: "collab", title: "Fan cover Stories", format: "Stories", song: "Bad Enough", hook: "Their face first, her song second.", do: "Repost covers the same day. DM a thank-you + Close Friends add.", caption: "", cta: "Turns renters into superfans." },
      { id: "peerduet", pillar: "collab", title: "PNW peer duet", format: "Reel · collab", song: "Distract Me", hook: "Two voices, one Seattle night.", do: "Ask a warm peer (not a stretch like-artist) for a 15s split-screen.", caption: "Hometown stack.", cta: "Both accounts share the same night." },
      { id: "countdown7", pillar: "show", title: "7-day Hidden Hall countdown", format: "Stories daily", song: "", hook: "Same visual system all week so it reads as a series.", do: "Follow thisWeek beats. Official URL only.", caption: "", cta: "Countdown sticker every day." },
      { id: "expect", pillar: "show", title: "What to expect Friday", format: "Carousel", song: "", hook: "Doors 8 · 21+ · bill · merch · tickets.", do: "Ship Sunday 23. Bookers can steal the proof later.", caption: "Femme Friday at Hidden Hall.", cta: "Official tickets — no third-party dumps." },
      { id: "setcrumb", pillar: "show", title: "One set crumb, not the set", format: "Reel or Stories", song: "Bad Enough", hook: "One chorus, crowd audio ok, then cut.", do: "Night-of or Saturday. Full-set leaks kill the next room.", caption: "See you next time.", cta: "Next official date in sticker." }
    ]
  },

  // ---- Social music trends (late-2026 formats, mapped to this catalog) ----
  // Planning layer, not a live feed. Heat = Ride / Watch / Skip for this artist.
  socialTrends: {
    asOf: "2026-08",
    job: "Ride a format. Don’t wear a costume.",
    principle: "TikTok still finds strangers. Reels keep the ones who save. Shorts feed YouTube. A trend only earns a post if one of your songs already sounds like it.",
    rules: [
      "One song per trend post. If you can’t name the track in the first line, skip it.",
      "Native edit per platform. A TikTok watermark on Reels is a dead post.",
      "Identity in 1.2s. Talking-head essays lose to a lyric, a needle, or a room flip.",
      "You win when other people use your sound — name the audio, then seed two duets.",
      "Official tickets only. Trends do not get a third-party link."
    ],
    lanes: [
      { id: "tiktok", label: "TikTok" },
      { id: "reels", label: "Reels" },
      { id: "shorts", label: "Shorts" },
      { id: "sound", label: "Sounds" },
      { id: "skip", label: "Skip" }
    ],
    platforms: [
      { id: "tiktok", name: "TikTok", job: "Find strangers", heat: "High", note: "Volume + own-audio. Raw, 15–30s, first frame is the hook. Success is other creators using the sound." },
      { id: "reels", name: "Instagram Reels", job: "Keep savers", heat: "High", note: "Indie converts here. Recut last week’s TikTok winner 1–2 weeks later — Reels lag TikTok. Optimize for saves, not views." },
      { id: "shorts", name: "YouTube Shorts", job: "Feed the channel", heat: "Med", note: "Same hook, then a card to the live session / lyric video. Don’t start a third posting habit unless a Short already works." },
      { id: "stories", name: "Stories + CF", job: "Sell the room", heat: "High", note: "Show week lives here. Close Friends tonight, public tomorrow. Stickers beat ‘link in bio.’" }
    ],
    thisCycle: {
      title: "This cycle · late August 2026",
      lede: "Three rides while the Times story is still warm and Hidden Hall is this Friday. Everything else can wait.",
      items: [
        { title: "Times vinyl clip", song: "Tinsley (Debut LP)", do: "Needle-drop + Richards line. Screenshot the feature. Don’t narrate the whole article." },
        { title: "Hidden Hall crumb", song: "Bad Enough", do: "One chorus, crowd audio ok, then cut. Stories sticker to tinsleymusic.com/shows." },
        { title: "Own-audio seed", song: "Bad Enough", do: "Name the sound ‘choosing me chorus.’ Post the original, then ask two peers to duet within 48h." }
      ]
    },
    items: [
      {
        id: "own-audio",
        lane: "sound",
        heat: "Ride",
        title: "Own-audio first",
        format: "15–25s · named sound",
        platforms: ["TikTok", "Reels"],
        song: "Bad Enough",
        why: "In 2026 a music post wins when other people use the sound — not when you hit a view count.",
        do: "Post the chorus on your audio. Name it something people will search. DM two PNW peers the same day.",
        skip: "Don’t bury the hook under a talking intro.",
        caption: "Use this sound if choosing you is the plot twist."
      },
      {
        id: "hook-12",
        lane: "tiktok",
        heat: "Ride",
        title: "Identity in 1.2 seconds",
        format: "7–20s clip",
        platforms: ["TikTok", "Reels", "Shorts"],
        song: "Bad Enough",
        why: "The scroll dies in the first frames. Lyric on screen, room flip, or needle — not a logo.",
        do: "On-screen: ‘choosing me.’ Outfit / hair / room on the chorus. End on her face.",
        skip: "Don’t open with ‘hey guys new song.’",
        caption: "Choosing me was the plot twist."
      },
      {
        id: "native-recut",
        lane: "reels",
        heat: "Ride",
        title: "Native recut, not a dump",
        format: "Reel · new cover frame",
        platforms: ["Reels"],
        song: "Any TikTok winner",
        why: "Reels trail TikTok by about a week. A watermarked crosspost gets buried.",
        do: "New 1.2s cover. Slightly longer if the save is the job. Caption asks for a save, not a follow.",
        skip: "Don’t post the TikTok file as-is.",
        caption: "The version I recut so it actually lives here."
      },
      {
        id: "save-carousel",
        lane: "reels",
        heat: "Ride",
        title: "Save-bait carousel",
        format: "Carousel · 5–6",
        platforms: ["Instagram"],
        song: "Tinsley (Debut LP)",
        why: "Indie still wins on Instagram saves — Start Here, press stack, ‘put this on when…’ — not dances.",
        do: "Slide 1 is the Richards Times line or Start Here. Last slide is a save prompt, not ‘stream now.’",
        skip: "Don’t make slide 1 a selfie.",
        caption: "Save this for the next editor or late-night playlist."
      },
      {
        id: "glowup",
        lane: "tiktok",
        heat: "Ride",
        title: "Choosing-me glow-up",
        format: "12–20s transition",
        platforms: ["TikTok", "Reels"],
        song: "Bad Enough",
        why: "Glow-up / revenge-soft is still a durable lifestyle bed. You already have the chorus.",
        do: "Before → after on the hook. Warm rose–sand, not generic sad-girl blue.",
        skip: "Don’t costume a trend that needs a dance you didn’t start.",
        caption: "Choosing me was the plot twist."
      },
      {
        id: "flags",
        lane: "tiktok",
        heat: "Ride",
        title: "Green flag / red flag",
        format: "List · on-beat cards",
        platforms: ["TikTok", "Reels"],
        song: "Temporary Insanity",
        why: "Listicles still travel. Comment-trigger is the point.",
        do: "Six flags timed to the chorus. Last card asks for a color. No talking required.",
        skip: "Don’t write a paragraph between cards.",
        caption: "Intrusive thoughts, but make it a chorus."
      },
      {
        id: "almosts",
        lane: "reels",
        heat: "Ride",
        title: "For the almosts",
        format: "Mood Reel · no talk",
        platforms: ["Reels", "TikTok"],
        song: "Distract Me",
        why: "Situationship / late-night save culture is still the dream-pop lane.",
        do: "Rain, window, headphones. Lyric on the dreamiest line. Let the song sell it.",
        skip: "Don’t explain the lore over the hook.",
        caption: "Put this on when you leave the party."
      },
      {
        id: "seattle-country",
        lane: "tiktok",
        heat: "Watch",
        title: "Country, but make it Seattle",
        format: "12–18s contrast",
        platforms: ["TikTok", "Reels"],
        song: "Good Ride",
        why: "Coastal-cowgirl is crowded. City-rain twang is still your wedge.",
        do: "Dashboard night-drive or Pike / Capitol Hill. Boots in frame one, not a costume.",
        skip: "Don’t play dress-up Nashville.",
        caption: "Alt-country wit. City rain."
      },
      {
        id: "vinyl-times",
        lane: "reels",
        heat: "Ride",
        title: "Times needle-drop",
        format: "15–25s lore",
        platforms: ["Reels", "TikTok", "Shorts"],
        song: "Tinsley (Debut LP)",
        why: "The August 2026 Seattle Times feature is a live news cycle. Vinyl ASMR plus a critic line is the proof stack.",
        do: "Needle hits the groove, then the Richards line. One screenshot. Then Start Here.",
        skip: "Don’t read the article to camera.",
        caption: "The Seattle Times told the vinyl story. The record still introduces people."
      },
      {
        id: "cf-first",
        lane: "reels",
        heat: "Ride",
        title: "Close Friends, then public",
        format: "CF tonight → Reel tomorrow",
        platforms: ["Instagram"],
        song: "Hard to Love",
        why: "Superfan platforms still reward the people who heard it first.",
        do: "Unmixed chorus or the line you almost cut on CF. Public the next day: ‘you heard it first.’",
        skip: "Don’t dump the same file to everyone at once.",
        caption: "Honesty made audible — Close Friends got it last night."
      },
      {
        id: "show-sticker",
        lane: "reels",
        heat: "Ride",
        title: "Show-week sticker",
        format: "Stories · 3 frames",
        platforms: ["Instagram"],
        song: "Hidden Hall · Aug 28",
        why: "Stories convert rooms. Reels find strangers. Don’t mix the jobs.",
        do: "Date → bill → official sticker. Tag Girl Parallel and Veronica North.",
        skip: "Don’t send anyone to this hub.",
        caption: ""
      },
      {
        id: "shorts-funnel",
        lane: "shorts",
        heat: "Watch",
        title: "Shorts that point to a session",
        format: "Short → live / lyric",
        platforms: ["Shorts"],
        song: "Hard to Love",
        why: "Shorts only pay if they feed a longer YouTube asset. You already have live and session footage.",
        do: "Same 15s hook, end card to the acoustic or KING 5 / CHBP clip. One Shorts habit, not a third calendar.",
        skip: "Don’t start daily Shorts from scratch this week.",
        caption: "Full take is on the channel."
      },
      {
        id: "comment-card",
        lane: "tiktok",
        heat: "Ride",
        title: "Which-track comment card",
        format: "Carousel or last-frame ask",
        platforms: ["TikTok", "Reels"],
        song: "Love Songs (EP)",
        why: "Comments are still the cheapest distribution. A real binary beats a vague ‘thoughts?’",
        do: "Two real options. Winner becomes Wednesday’s Reel cover.",
        skip: "Don’t ask ‘what should I post.’",
        caption: "Comment the Love Songs track that still stings."
      },
      {
        id: "skip-dance",
        lane: "skip",
        heat: "Skip",
        title: "Dance you didn’t start",
        format: "Challenge chase",
        platforms: ["TikTok"],
        song: "",
        why: "You’re critic-born. Borrowed choreography reads as costume and burns a posting slot.",
        do: "If a dance uses your audio, duet the dancer. Don’t learn the routine to keep up.",
        skip: "Don’t invent a dance for Bad Enough this week.",
        caption: ""
      },
      {
        id: "skip-sadblue",
        lane: "skip",
        heat: "Skip",
        title: "Generic sad-girl blue",
        format: "Mood dump",
        platforms: ["TikTok", "Reels"],
        song: "",
        why: "That’s the interchangeable diary-pop pile. Your wedge is Seattle rain + country-pop edge + Times proof.",
        do: "Warm rose–sand. Press tile every third grid post.",
        skip: "Don’t post another teal-bedroom whisper with no song title.",
        caption: ""
      },
      {
        id: "skip-dayinthelife",
        lane: "skip",
        heat: "Skip",
        title: "Day-in-the-life vlog",
        format: "60–90s talk",
        platforms: ["TikTok", "Reels"],
        song: "",
        why: "Artist-vlog volume is high and conversion is low unless a hook is already playing.",
        do: "If you film the day, drop the chorus in the first 1.2s or keep it Close Friends.",
        skip: "Don’t open with coffee and a calendar.",
        caption: ""
      }
    ]
  },

  // ---- 10 like artists (fan-overlap targeting for playlists, ads, tour pitches) ----
  // match = estimated fan-overlap / sonic similarity (0-100).
  // reach = estimated realism of actually reaching them (collab, support slot,
  //         playlist adjacency) given their current scale (0-100, higher = easier).
  //         Both are author estimates used for the positioning map.
  likeArtists: [
    { name: "Maisie Peters", match: 94, reach: 44, tag: "Witty confessional pop", why: "Sharp, diaristic breakup storytelling with big hooks — near-identical target listener." },
    { name: "Gracie Abrams", match: 92, reach: 32, tag: "Intimate sad-pop", why: "Vulnerable, whisper-to-anthem dynamics; strong TikTok-driven fanbase overlap." },
    { name: "Holly Humberstone", match: 89, reach: 60, tag: "Alt indie-pop", why: "Moody, textured indie-pop with emotional honesty; similar tastemaker/press path." },
    { name: "Kacey Musgraves", match: 88, reach: 18, tag: "Country-pop crossover", why: "Stated influence; the 'Bad Enough' / 'Good Ride' country-pop lane targets her audience." },
    { name: "Soccer Mommy", match: 85, reach: 70, tag: "Indie rock", why: "Guitar-forward indie with wry lyricism; shared indie-rock and PNW-adjacent scene." },
    { name: "Faye Webster", match: 83, reach: 64, tag: "Alt-country / indie", why: "Dreamy alt-country textures and understated wit align with her twangier songs." },
    { name: "Lizzy McAlpine", match: 82, reach: 46, tag: "Folk-pop", why: "Narrative folk-pop with viral moments; overlapping streaming + TikTok audience." },
    { name: "Samia", match: 80, reach: 82, tag: "Indie pop-rock", why: "Emotionally raw indie pop-rock; comparable rising-artist positioning and press." },
    { name: "Suki Waterhouse", match: 78, reach: 54, tag: "Dreamy indie-pop", why: "Nostalgia-tinted dream-pop mood matches 'Distract Me' era; strong sync presence." },
    { name: "The Cranberries", match: 74, reach: 12, tag: "90s alt legacy", why: "Direct critical comparison ('dreamy pop rock that evokes The Cranberries') — legacy fan bridge." }
  ],

  // ---- EDM remix potential ranking ----
  // Composite score (0-100) from 4 weighted factors:
  //   hook (topline/vocal chop-ability), dance (tempo/groove fit),
  //   dna (existing electronic production), drop (build & drop payoff).
  remixRanking: [
    { title: "Skin", score: 92, style: "Deep / Sexy House", factors: { hook: 88, dance: 90, dna: 96, drop: 92 },
      sync: "Late-night / intimate drama cues; sensual underscore without lyric spoilers.",
      why: "Already a sensual electro-pop cut (prod. Justin Hartinger) — breathy topline sits perfectly over a deep-house groove with minimal rework." },
    { title: "Lovesick", score: 90, style: "Dance-Pop / Future House", factors: { hook: 86, dance: 93, dna: 94, drop: 88 },
      sync: "Montage / nightlife / 'can't quit you' montage beds.",
      why: "Dance-pop-leaning electro original; the longing hook is tailor-made for a four-on-the-floor future-house lift." },
    { title: "Heart Attack", score: 88, style: "Melodic Techno / Synthwave", factors: { hook: 85, dance: 86, dna: 92, drop: 90 },
      sync: "Anxiety / spiral sequences; thriller-adjacent teen drama.",
      why: "Anxious synth-pop energy and pulsing tension convert directly into a driving melodic-techno build-and-release." },
    { title: "Distract Me", score: 85, style: "Melodic / Chill House", factors: { hook: 84, dance: 80, dna: 78, drop: 86 },
      sync: "Dreamy travel / crush montages; soft lifestyle brand beds.",
      why: "'Dreamily caressing' textures are ideal for melodic/organic house — atmospheric verses into a euphoric filtered drop." },
    { title: "Bad Enough", score: 84, style: "Festival Future-Bass", factors: { hook: 94, dance: 78, dna: 58, drop: 92 },
      sync: "Highest sync priority — glow-up / revenge / 'choose yourself' end-credit moments.",
      why: "Biggest singalong hook in the catalog; the 'choose yourself' payoff is a natural future-bass / big-room drop despite live-band DNA." },
    { title: "In Bloom", score: 81, style: "Tropical / Progressive House", factors: { hook: 82, dance: 84, dna: 88, drop: 74 },
      sync: "Spring / renewal / coming-of-age sunlit cues.",
      why: "Hopeful electro-pop (prod. Jake Crocker) with bright synths — plucky tropical-house treatment fits instantly." },
    { title: "Endless Summer", score: 79, style: "Tropical House", factors: { hook: 80, dance: 82, dna: 66, drop: 76 },
      sync: "Seasonal / vacation / nostalgia opens.",
      why: "Nostalgic, seasonal warmth is a layup for a sun-soaked tropical-house flip with steel-pan/marimba leads." },
    { title: "Slow & Steady", score: 74, style: "Progressive House", factors: { hook: 72, dance: 74, dna: 86, drop: 68 },
      sync: "Slow-burn resolve scenes; montage under dialogue.",
      why: "Reflective electro original with room to build; extend into a slow-burn progressive arc." },
    { title: "Classic", score: 72, style: "Future-Bass / Nu-Disco", factors: { hook: 84, dance: 70, dna: 58, drop: 72 },
      sync: "Wedding / anniversary / first-dance adjacent — strong non-film sync path.",
      why: "Radiant, romantic topline chops beautifully; needs more rhythmic rebuild but the vocal carries a nu-disco flip." },
    { title: "Tinsley - EP", score: 69, style: "Electro-Pop Edit", factors: { hook: 70, dance: 72, dna: 80, drop: 58 },
      sync: "Period / formative-era flashbacks if a club edit exists.",
      why: "Formative electro-pop material (prod. Jake Crocker) with usable stems for a modern club edit." },
    { title: "Temporary Insanity", score: 64, style: "Indie Dance / Nu-Disco", factors: { hook: 72, dance: 66, dna: 46, drop: 62 },
      sync: "Chaotic-era comedy-drama; lower sync priority than acoustic-forward cuts.",
      why: "Restless energy suits an indie-dance rework, though guitar-forward production needs reprogramming." },
    { title: "Hard to Love", score: 60, style: "Emotional Bass / Drum & Bass", factors: { hook: 74, dance: 58, dna: 44, drop: 66 },
      sync: "Confessional / vulnerability scenes — often stronger as acoustic sync than remix.",
      why: "Vulnerable vocal works as a liquid-DnB or emotional-bass topline over the acoustic bones." },
    { title: "Too Bad", score: 58, style: "Indie Dance", factors: { hook: 66, dance: 60, dna: 46, drop: 54 },
      sync: "Bittersweet mid-tempo underscore; secondary catalog.",
      why: "Bittersweet mid-tempo; moderate lift into indie-dance with added groove." },
    { title: "Hear My Love", score: 56, style: "Deep House Edit", factors: { hook: 62, dance: 58, dna: 52, drop: 50 },
      sync: "Devotional / quiet intimacy cues.",
      why: "Devotional pop topline suits a warm deep-house edit; limited built-in dynamics." },
    { title: "Good Ride (Mechanical Bullshit)", score: 52, style: "Country-Dance / Bass House", factors: { hook: 70, dance: 50, dna: 34, drop: 54 },
      sync: "Country-crossover novelty; pitch as alt-country first, dance second.",
      why: "Alt-country cut riding the country-dance crossover wave — high novelty, but the biggest production overhaul." },
    { title: "Just Three Words", score: 44, style: "Downtempo / Chillstep", factors: { hook: 60, dance: 38, dna: 30, drop: 42 },
      sync: "Intimate dialogue beds; folk-pop more than club.",
      why: "Tender folk-pop; best as an ambient downtempo/chillstep reimagining rather than a club track." },
    { title: "the end - demos", score: 36, style: "Ambient / Lo-fi", factors: { hook: 52, dance: 26, dna: 22, drop: 30 },
      sync: "Superfan / behind-the-scenes only — not a primary sync ask.",
      why: "Raw acoustic demos — only suited to atmospheric lo-fi or ambient textures." }
  ],

  // ---- 1,000 True Fans (Kevin Kelly framework applied to Tinsley) ----
  // Source essay: Kevin Kelly, "1,000 True Fans" (2008) — kk.org/thetechnium/1000-true-fans/
  trueFans: {
    source: {
      author: "Kevin Kelly",
      title: "1,000 True Fans",
      year: 2008,
      url: "https://kk.org/thetechnium/1000-true-fans/",
      quote: "A creator… needs to acquire only 1,000 True Fans to make a living. A True Fan is defined as a fan that will buy anything you produce. These diehard fans will drive 200 miles to see you sing; they will buy the hardback and paperback and audible versions of your book; they will purchase your next figurine sight unseen; they will pay for the 'best-of' DVD version of your free YouTube channel; they will come to your chef's table once a month.",
      premise: "The idea: an artist doesn't need a hit or millions of passive streams to sustain a career — just ~1,000 True Fans who each spend ~$100/year buying directly. That's ~$100,000/year, mostly high-margin. For Tinsley, the raw materials already exist: KEXP-funded vinyl, a demo-hungry Bandcamp, a devoted PNW scene, and press credibility. The job is to convert acclaim into a direct, ownable fan relationship."
    },

    // Interactive calculator defaults + ranges
    model: { fans: 1000, spend: 100, fansMax: 2500, fansStep: 50, spendMax: 300, spendStep: 5 },

    // How ~$100/fan/year is realistically assembled for an indie musician (high-margin, direct)
    streams: [
      { label: "Limited vinyl LP", detail: "Signed / colored pressing — the KEXP-funded flagship object.", amount: 32 },
      { label: "Merch (tee, tote, poster)", detail: "One item a year at a show or Bandcamp drop.", amount: 28 },
      { label: "Live show ticket", detail: "One PNW headline or support date per year.", amount: 22 },
      { label: "Bandcamp digital + demos", detail: "Album + exclusive 'the end - demos' on Bandcamp Fridays.", amount: 13 },
      { label: "Superfan extra", detail: "Tip, bundle add-on, or one-off exclusive.", amount: 5 }
    ],

    // The conversion funnel: turning passive listeners into True Fans
    ladder: [
      { stage: "Passive Listener", worth: "~$0.003 / stream", pct: 100,
        goal: "Get the follow + Spotify save.", how: "Algorithmic reach, playlist adds, TikTok discovery. Volume, but you don't own them." },
      { stage: "Follower", worth: "Attention, not $", pct: 22,
        goal: "Capture an email or DM.", how: "Follows on Spotify/IG/TikTok. Show-goers, story-viewers — reachable but rented on someone else's platform." },
      { stage: "Engaged Fan", worth: "First $ soon", pct: 8,
        goal: "Trigger the first purchase.", how: "Repeat listeners who comment, share, and pre-save. Warm enough to buy a ticket or a tee." },
      { stage: "Paying Fan", worth: "$20–40 / yr", pct: 3,
        goal: "Turn one purchase into a habit.", how: "Bought a ticket, tee, or Bandcamp download once. Knows the catalog, follows the story." },
      { stage: "True Fan", worth: "$100+ / yr", pct: 1,
        goal: "Give them everything to buy.", how: "Buys the vinyl, the merch, the show, the demos. Drives to gigs, gifts your music, defends you online." }
    ],

    // Playbook to actually build toward 1,000 True Fans
    playbook: [
      { title: "Own the relationship", text: "Move fans off rented platforms. Email list + Bandcamp are yours; Spotify followers aren't. Every touchpoint should offer a reason to hand over an email." },
      { title: "Always have something to buy", text: "True Fans want to spend. Keep a steady shelf: vinyl, signed inserts, tees, demos, bundles. No 'sold out with nothing to replace it.'" },
      { title: "Sell direct, keep the margin", text: "A $30 Bandcamp/vinyl sale ≈ 10,000 streams. Route superfans to Bandcamp Fridays and D2C merch instead of streaming-only." },
      { title: "Give real access", text: "Close Friends demos, handwritten vinyl notes, a small Discord, early ticket links. Intimacy is the product True Fans pay for." },
      { title: "Convert at the point of passion", text: "At shows and viral moments: QR to the email list, merch table front-and-center, post-show thank-you DMs. Capture fans while they're hot." },
      { title: "Reward loyalty, publicly", text: "Name-check superfans, feature fan covers, first dibs on limited runs. Recognition compounds — True Fans recruit the next True Fans." }
    ]
  },

  // ---- North-star metrics (editable current-vs-target with saved trend) ----
  // Starting values are planning estimates; the site lets you edit `current`
  // live and logs a trend history to localStorage. `fmt`: int | usd.
  northStars: [
    { key: "listeners", label: "Monthly listeners", track: "reach", current: 8000, target: 50000, fmt: "int", note: "Spotify monthly listeners — the top of the funnel (manual from Spotify for Artists)." },
    { key: "followers", label: "Spotify followers", track: "reach", current: 3500, target: 25000, fmt: "int", note: "Owned-ish audience that gets Release Radar reach. Pullable from /api/spotify when env is set." },
    { key: "tiktok", label: "TikTok followers", track: "reach", current: 1200, target: 25000, fmt: "int", note: "Short-form discovery engine — update every Sunday from TikTok analytics." },
    { key: "igReach", label: "IG reach (7d)", track: "reach", current: 4500, target: 40000, fmt: "int", note: "Weekly Instagram reach — pair with saves on winning Reels." },
    { key: "igSaves", label: "IG saves (7d)", track: "reach", current: 180, target: 2000, fmt: "int", note: "Save rate is the organic bar before paid boost." },
    { key: "listenClicks", label: "Listen UTM clicks (7d)", track: "foundation", current: 40, target: 500, fmt: "int", note: "Clicks to /listen from attributed links — Plausible or link tool." },
    { key: "emailWeek", label: "Email signups (7d)", track: "foundation", current: 8, target: 80, fmt: "int", note: "Weekly list growth — the conversion that matters." },
    { key: "email", label: "Email subscribers", track: "foundation", current: 400, target: 5000, fmt: "int", note: "Truly owned audience — the most valuable list." },
    { key: "truefans", label: "True fans", track: "revenue", current: 80, target: 1000, fmt: "int", note: "Superfans spending ~$100/yr direct. The endgame." },
    { key: "sync", label: "Sync placements", track: "revenue", current: 1, target: 12, fmt: "int", note: "TV / film / ad / game placements landed." },
    { key: "d2c", label: "Monthly D2C revenue", track: "revenue", current: 700, target: 8000, fmt: "usd", note: "High-margin direct income (Bandcamp, merch, vinyl)." }
  ],

  // Engagement queue seeds — Ops #engage clears these into Tue/Sat reply slots.
  engagementQueue: [
    { id: "eq1", platform: "TikTok", target: "Reply to top 5 comments on this week’s hook with a clip or stitch", lane: "algorithm" },
    { id: "eq2", platform: "TikTok", target: "Stitch one fan duet / glow-up from Bad Enough comments", lane: "community" },
    { id: "eq3", platform: "Instagram", target: "Answer Story Q&A + DM soft CTA to /listen", lane: "owned" },
    { id: "eq4", platform: "Threads", target: "Jump into one KEXP / Seattle music thread with a lyric or vinyl note", lane: "scene" },
    { id: "eq5", platform: "TikTok", target: "Leave thoughtful comments on 3 PNW peer posts (no spam links)", lane: "scene" }
  ],

  // ---- Full income / scenario model defaults (streaming + D2C + sync + live) ----
  incomeModel: {
    perStream: 0.003,
    sources: {
      listeners: { label: "Monthly listeners", value: 8000, min: 0, max: 200000, step: 1000 },
      streamsPer: { label: "Streams / listener / mo", value: 2.4, min: 1, max: 6, step: 0.1 },
      trueFans: { label: "True fans", value: 300, min: 0, max: 2000, step: 25 },
      spendPerFan: { label: "Spend / fan / yr", value: 100, min: 10, max: 300, step: 5 },
      syncPlacements: { label: "Sync placements / yr", value: 3, min: 0, max: 40, step: 1 },
      syncAvg: { label: "Avg sync fee", value: 1200, min: 100, max: 10000, step: 100 },
      shows: { label: "Live shows / yr", value: 20, min: 0, max: 120, step: 1 },
      netPerShow: { label: "Net / show", value: 450, min: 0, max: 5000, step: 50 }
    }
  },

  // ---- Growth roadmap: 30 → 720 days ----
  // Every action is tagged with a `track` for color-coding:
  //   reach       = audience & discovery (streaming, social, PR, ads, playlists)
  //   revenue     = money & superfans (D2C, sync, merch, touring, publishing)
  //   product     = music & releases (catalog, cadence, collabs, remixes)
  //   foundation  = brand, data, CRM, team, international infrastructure
  roadmap: [
    {
      window: "0–30 days", phase: "Foundation",
      focus: "Sharpen positioning, own the audience, and stand up the content + data engine.",
      items: [
        { track: "foundation", lever: "Positioning", text: "Lock a one-line story — 'Seattle indie pop-rock with a country-pop edge' — and choose one hero lane for this cycle." },
        { track: "foundation", lever: "Analytics", text: "Set up Spotify for Artists, Meta Business & TikTok analytics into one KPI dashboard: saves, followers, email sign-ups, D2C sales." },
        { track: "foundation", lever: "Owned CRM", text: "Make /listen the primary bio + QR destination; wire Kit/webhook on /api/subscribe so every show and post captures email." },
        { track: "reach", lever: "Streaming", text: "Build & pin a 'Start Here' playlist; refresh Artist Pick, bio, and add a Canvas to every top track." },
        { track: "reach", lever: "Short-form", text: "Commit to a 4–5×/week TikTok + Reels cadence around 'Bad Enough' (lyric POV, revenge-glow-up transitions)." },
        { track: "product", lever: "Catalog", text: "Audit the 19-track catalog; pick the next single and map a 6-week rollout with a content bank." },
        { track: "revenue", lever: "D2C", text: "Optimize Bandcamp: list vinyl, add a superfan 'demos' tier, and schedule the first Bandcamp Friday." }
      ]
    },
    {
      window: "31–60 days", phase: "Amplify",
      focus: "Turn on discovery — pitch, advertise into winners, and earn press.",
      items: [
        { track: "reach", lever: "Playlists", text: "Pitch the next single to Spotify editorial 4 weeks early; submit to 30+ independent indie / country-pop curators + SubmitHub." },
        { track: "reach", lever: "Paid Ads", text: "Put low-budget spend behind the 2–3 best-performing clips; retarget viewers with follow / save CTAs." },
        { track: "reach", lever: "PR & Radio", text: "Send an EPK one-pager to PNW + indie outlets (KEXP, 107.7 The End, C89.5), leveraging the #1 critics-poll cred." },
        { track: "reach", lever: "Social", text: "Repurpose TikTok winners to Reels / Shorts within 24h; engage the Seattle scene on Threads / X." },
        { track: "product", lever: "Collab / Remix", text: "Line up an EDM remix or feature — 'Skin' and 'Lovesick' are remix-ready and open a new dance-floor audience." },
        { track: "revenue", lever: "Sync", text: "Register with a sync agency / library; tag 'Bad Enough' and 'Good Ride' for TV / film / ad placements." },
        { track: "foundation", lever: "Data", text: "Identify the top 5 cities and top 3 tracks from Spotify + TikTok to focus targeting and touring." }
      ]
    },
    {
      window: "61–90 days", phase: "Convert",
      focus: "Monetize attention — first superfan revenue and a repeatable direct-to-fan motion.",
      items: [
        { track: "revenue", lever: "D2C Drop", text: "Run a Bandcamp Friday drop + limited vinyl / merch bundle timed to the single." },
        { track: "revenue", lever: "Superfans", text: "Launch Close Friends + a small Discord and the first true-fan offer (signed insert, early ticket access)." },
        { track: "reach", lever: "Retargeting", text: "Retarget all video viewers and site visitors with save / follow + merch CTAs." },
        { track: "revenue", lever: "Live", text: "Advance Hidden Hall (Aug 28), then book the next 3 PNW holds from the Tour desk — QR + merch table + thank-you DMs every night." },
        { track: "reach", lever: "PR", text: "Convert TikTok traction into 2–3 blog / radio feature placements." },
        { track: "product", lever: "Release", text: "Ship the single, read the data, and start teasing the next release immediately." },
        { track: "foundation", lever: "Review", text: "Review 90-day KPIs; double down on the top market and top song for the next cycle." }
      ]
    },
    {
      window: "91–180 days", phase: "Scale",
      focus: "Compound it — consistent releases, a real touring footprint, and sync income.",
      items: [
        { track: "product", lever: "Cadence", text: "Release every 6–8 weeks (singles building toward a themed EP); keep the content bank 3 weeks ahead." },
        { track: "revenue", lever: "Touring", text: "Book a 6–10 date regional run and pursue support slots opening for like-artists (Samia, Soccer Mommy, Holly Humberstone tier)." },
        { track: "revenue", lever: "Sync", text: "Actively pitch the catalog to music supervisors; target 1–2 confirmed placements." },
        { track: "reach", lever: "Playlists", text: "Convert momentum into recurring editorial / algorithmic support (Release Radar, Discover Weekly, genre editorial)." },
        { track: "revenue", lever: "D2C", text: "Grow the email list past 2,500; run a monthly D2C offer and a second vinyl variant." },
        { track: "product", lever: "EDM Remix", text: "Release the remix / collab to open a dance lane and reach new playlists and producer audiences." },
        { track: "foundation", lever: "International", text: "Begin targeting UK / Ireland & Canada indie-pop (the Cranberries-legacy and like-artist audiences)." }
      ]
    },
    {
      window: "181–360 days", phase: "Establish",
      focus: "Become a headliner-in-waiting — album cycle, festivals, and a real superfan business.",
      items: [
        { track: "product", lever: "Album", text: "Plan and begin the next album / EP campaign with a pre-save + vinyl pre-order engine." },
        { track: "revenue", lever: "Festivals", text: "Apply to Capitol Hill Block Party, Treefort & Bumbershoot; step up to headline club shows." },
        { track: "revenue", lever: "Superfans", text: "Cross ~250–400 true fans; launch a membership tier / annual superfan bundle." },
        { track: "revenue", lever: "Publishing", text: "Secure publishing admin + sync rep; confirm all royalties are collected (MLC, SoundExchange, PROs)." },
        { track: "reach", lever: "Brand Deals", text: "Land 1–2 brand partnerships (PNW, gear, or lifestyle brands) that fit her story." },
        { track: "reach", lever: "National PR", text: "Push for national indie press — an Atwood feature, a KEXP / NPR session, and playlist cover art." },
        { track: "foundation", lever: "Team", text: "Add booking + part-time marketing help; formalize a rolling 12-month release calendar." }
      ]
    },
    {
      window: "361–720 days", phase: "Expand",
      focus: "Turn momentum into a durable career — national reach, owned economics, and a full team.",
      items: [
        { track: "product", lever: "Album Launch", text: "Release the album across multiple singles and formats (vinyl / cassette) with a national press push." },
        { track: "revenue", lever: "Touring", text: "Mount a first national headline tour plus festival slots; scout initial international dates." },
        { track: "revenue", lever: "Business", text: "Reach 1,000 true fans (~$100k+ direct) — a sustainable income base beyond streaming." },
        { track: "revenue", lever: "Sync Pipeline", text: "Build a recurring sync pipeline; evaluate a publishing deal only on favorable, data-backed terms." },
        { track: "reach", lever: "Distribution", text: "Leverage the traction to negotiate a strong distribution / label-services or label deal from a position of data." },
        { track: "reach", lever: "International", text: "Full international rollout (EU / UK / AU) with localized playlists and touring." },
        { track: "foundation", lever: "Team & Ops", text: "Stand up the full team (manager, booking, PR, marketing) and reinvest into content, touring, and annual planning." }
      ]
    }
  ],

  press: [
    { quote: "If given a chance, this is an artist who could be a very, very big deal to a lot of people.", source: "John Richards, in The Seattle Times", url: "https://www.yakimaherald.com/news/nation_and_world/entertainment/with-help-from-kexp-dj-seattle-musician-releases-vinyl-album/article_f15d942f-345c-5186-b5a2-780782157ea3.html" },
    { quote: "Boasting a dreamy pop rock sound that evokes bands like The Cranberries, Tinsley has become one of the up-and-coming artists to watch in the Seattle music scene.", source: "Seth Sommerfield, Inlander" },
    { quote: "An earnest, endearing collection of infectious indie-pop and indie-rock, with occasional alt-country undertones… bright guitars, irresistible hooks and plenty of allure.", source: "Chris Sanley, KEXP Music Director" },
    { quote: "The smokey-voiced indie pop artist is as sticky in her lyrics as her music is in melody.", source: "American Songwriter" },
    { quote: "Tinsley's latest single is cathartic country-pop at its finest.", source: "Atwood Magazine" }
  ],

  // ---- Analysis vs. Rick Rubin, "The Creative Act: A Way of Being" (2023) ----
  // A deliberate counterpoint to the rest of this deck: everything else here is
  // market-first (hashtags, funnels, conversion). Rubin's book is art-first.
  // We (1) score how well Tinsley already embodies his core principles, and
  // (2) stage the tension between the marketing playbook and the creative act.
  creativeAct: {
    source: {
      author: "Rick Rubin",
      title: "The Creative Act: A Way of Being",
      year: 2023,
      quote: "When it comes to the process of creation, the audience comes last. Creating and consuming are two different acts. Making the work for yourself first, honestly, is what gives it a chance to matter to anyone else.",
      premise: "Every other section of this deck is market-first — hashtags, funnels, conversion ladders. Rubin's book argues the opposite: the work comes first, the audience comes last, and honesty is the only strategy that lasts. So this is the deliberate counterpoint. First we score how much Tinsley already lives the book's principles (spoiler: a lot). Then we stage the tension between the growth playbook and the creative act — and where the two can actually coexist."
    },

    // How strongly Tinsley's work + career already embody each core principle (0-100)
    principles: [
      { name: "Tune In — the artist as antenna", score: 90,
        idea: "Rubin: we're antennae, collecting seeds from the world through pure awareness. The art is noticing, then transcribing what's already there.",
        tinsley: "Her diaristic, 'sharp lyrical self-awareness' is exactly this — songs that read like caught observations. 'Good Ride (Mechanical Bullshit)' turns an overheard phrase into a whole mood." },
      { name: "The mirror — great art is honest", score: 94,
        idea: "Rubin: a work of art is a self-portrait of the maker. The more honestly you show yourself, the more universal it becomes.",
        tinsley: "Her strongest asset. The self-titled debut on grief and growing up, and 'Hard to Love' leaning into raw exposure, are honesty made audible — the trait critics keep naming." },
      { name: "Experiment — beginner's mind", score: 86,
        idea: "Rubin: follow curiosity, stay a perpetual beginner, refuse to be caged by a genre or a past success.",
        tinsley: "Electro-pop collabs → #1-poll indie-pop → country-pop pivot → indie rock. Rubin would applaud the roaming; the marketing side of this very deck flags it as a 'positioning risk.'" },
      { name: "The practice — show up daily", score: 88,
        idea: "Rubin: creativity is a way of being, not an event. Consistency and volume matter more than any single hit.",
        tinsley: "19+ releases since 2018, from formative EPs to demos to a debut LP. The catalog depth is the practice — proof the habit, not the outcome, drives her." },
      { name: "The audience comes last", score: 62,
        idea: "Rubin: don't create for the market. Serve the work; let reception be a byproduct, never the target.",
        tinsley: "Half-embodied. The music itself is emotionally uncompromised (acclaim outruns streams). But the career instinct — and this deck — is audience-first. The honest tension." },
      { name: "Completion — finish and let go", score: 78,
        idea: "Rubin: at some point you release the work and detach from the result. The 'end' is a choice, not a verdict.",
        tinsley: "Steady shipping and a raw 'the end - demos' release show a willingness to let imperfect things go. Room to grow: trusting release without over-polishing for the algorithm." }
    ],

    // The core "versus": the growth playbook vs. the creative act — and the reconciliation
    tension: {
      intro: "Where the rest of this deck and Rubin's book openly disagree — and the move that honors both.",
      rows: [
        { topic: "Who comes first",
          deck: "Optimize for the audience: FYP hooks, reach tiers, save/follow CTAs.",
          rubin: "The audience comes last. Make it true to you; reception is a byproduct.",
          reconcile: "Create art-first, market second. The honesty is the exact thing the hashtags are selling anyway — so protect it upstream." },
        { topic: "Positioning & genre",
          deck: "Pick one hero lane per campaign; genre spread blurs the brand.",
          rubin: "Follow curiosity. Don't let the market cage the work into a single sound.",
          reconcile: "Let the art roam freely; use positioning only to frame each release for a listener — market the song, don't shrink the artist." },
        { topic: "Metrics & numbers",
          deck: "Streams, conversion rates, and cost-per-follow are the scoreboard.",
          rubin: "Numbers aren't the point. The work is the point; data can quietly distort it.",
          reconcile: "Treat metrics as feedback, never as the goal. Ship on conviction, then read the data — not the other way around." },
        { topic: "Cadence & the feed",
          deck: "Post 4–5×/week; feed the algorithm to stay discoverable.",
          rubin: "The practice is daily creation — not daily posting. Protect the making.",
          reconcile: "Separate the creative practice from the content calendar. Make every day; publish on a schedule that never starves the work." }
      ]
    }
  },

  // =====================================================================
  // OPS COMMAND — world-class execution layer (tiers 1–3)
  // =====================================================================

  weeklyOps: {
    title: "Weekly ops ritual",
    cadence: "Mon plan → mid-week ship → Sun review → north-star touch",
    days: [
      { day: "Mon", title: "Plan", actions: ["Open the content calendar and pick this week’s featured song", "Set 1 press or playlist outreach target", "Copy UTMs for any QR / bio / ad links you’re shipping"] },
      { day: "Tue–Thu", title: "Ship", actions: ["Hit 4–5 short-form slots (skip a day only if needed)", "Log any press replies in Press CRM", "Bank one B-roll / lyric clip for the content factory"] },
      { day: "Fri", title: "Amplify", actions: ["Repost TikTok winners to Reels / Shorts within 24h", "Check paid-winners threshold before boosting anything", "Optional Bandcamp / email touch if there’s a real drop"] },
      { day: "Sun", title: "Review", actions: ["Copy week-in-review from the calendar", "Update north-stars (followers, email, D2C)", "Mark release-OS and CRM tasks done"] }
    ]
  },

  releaseOs: {
    title: "Release operating system",
    blurb: "A reusable 6-week checklist. Pick a single — progress saves in this browser.",
    releases: ["Bad Enough", "Temporary Insanity", "Hard to Love", "Distract Me", "Good Ride (Mechanical Bullshit)"],
    weeks: [
      {
        week: 1, label: "Lock & bank",
        tasks: [
          { id: "w1-story", text: "Lock one-line story + hero visual for this single" },
          { id: "w1-bank", text: "Film / cut 8–12 short assets (hooks, B-roll, lyric cards)" },
          { id: "w1-start", text: "Refresh Start Here + Artist Pick to feature this track" },
          { id: "w1-canvas", text: "Deliver Canvas loop + cover art to distro" }
        ]
      },
      {
        week: 2, label: "Pitch early",
        tasks: [
          { id: "w2-s4a", text: "Submit to Spotify for Artists editorial (4+ weeks out)" },
          { id: "w2-indies", text: "Build indie curator shortlist (see Playlist desk)" },
          { id: "w2-press", text: "Draft EPK one-pager + cold email for this release" },
          { id: "w2-utm", text: "Create UTM pack: bio, TikTok, QR, press" }
        ]
      },
      {
        week: 3, label: "Seed content",
        tasks: [
          { id: "w3-tiktok", text: "Start soft content (no announcement) — test 2 hooks" },
          { id: "w3-radio", text: "Warm Seattle flywheel contacts (KEXP / The End / C89.5)" },
          { id: "w3-sync", text: "Tag sync cues + register with library / agent if new" },
          { id: "w3-email", text: "Tease list with a Close Friends / demo crumb" }
        ]
      },
      {
        week: 4, label: "Announce",
        tasks: [
          { id: "w4-ann", text: "Public announce + smart link on Listen / Linktree" },
          { id: "w4-press", text: "Send press pitches; log in Press CRM" },
          { id: "w4-play", text: "Submit to 20–30 indie playlists / SubmitHub" },
          { id: "w4-ads", text: "Hold paid until organic clears Paid Winners bar" }
        ]
      },
      {
        week: 5, label: "Release week",
        tasks: [
          { id: "w5-drop", text: "Release day: Stories, email, Bandcamp, pin Start Here" },
          { id: "w5-boost", text: "Boost only clips that hit save/share threshold" },
          { id: "w5-radio", text: "Follow up radio + Seattle press" },
          { id: "w5-live", text: "Tie to a show / listening party if scheduled" }
        ]
      },
      {
        week: 6, label: "Extend & learn",
        tasks: [
          { id: "w6-remix", text: "Ship or tease remix / acoustic if planned" },
          { id: "w6-data", text: "Log city / track insights; update north-stars" },
          { id: "w6-next", text: "Pick next single and reset this checklist" },
          { id: "w6-thank", text: "Thank True Fans + playlist adds publicly" }
        ]
      }
    ]
  },

  pressOutlets: [
    { id: "kexp", name: "KEXP", lane: "Radio / Seattle", contact: "kexp.org · in-studio / local music", priority: "A" },
    { id: "theend", name: "107.7 The End", lane: "Radio / Seattle", contact: "Local specialty / new music", priority: "A" },
    { id: "c895", name: "C89.5", lane: "Radio / Seattle", contact: "College / community radio", priority: "A" },
    { id: "seatimes", name: "The Seattle Times", lane: "Press / Seattle", contact: "Aug 2026 feature (KEXP vinyl / next chapter) — thank-you + next-single follow, not only poll alumni", priority: "A" },
    { id: "atwood", name: "Atwood Magazine", lane: "Press / National indie", contact: "Premiere history (Bad Enough)", priority: "A" },
    { id: "obscure", name: "Obscure Sound", lane: "Press / Blog", contact: "Distract Me praise — soft follow-up", priority: "B" },
    { id: "spokesman", name: "The Spokesman-Review", lane: "Press / PNW", contact: "West-side feature history", priority: "B" },
    { id: "asit", name: "American Songwriter", lane: "Press / National", contact: "Songcraft / lyric features", priority: "B" },
    { id: "flood", name: "FLOOD Magazine", lane: "Press / National indie", contact: "Album / live features", priority: "B" },
    { id: "onesheet", name: "Ones to Watch / indie blogs", lane: "Press / Discovery", contact: "Rising artist lists", priority: "C" }
  ],

  playlistTargets: [
    { id: "s4a-indie", name: "Spotify editorial — Indie Pop / Fresh Finds", lane: "Editorial", fit: "Bad Enough, Distract Me, Classic", tip: "Pitch via Spotify for Artists 4+ weeks early with Start Here context." },
    { id: "s4a-country", name: "Spotify editorial — Country-pop / Americana edge", lane: "Editorial", fit: "Bad Enough, Good Ride", tip: "Lead with Atwood ‘cathartic country-pop’ quote." },
    { id: "pnw-indie", name: "PNW indie curator lists", lane: "Indie", fit: "Debut LP cuts, Love Songs era", tip: "Seattle Times Aug 2026 feature + #1 poll + KEXP vinyl as social proof." },
    { id: "sadgirl", name: "Sad-girl / diary-pop user lists", lane: "User", fit: "Hard to Love, Classic, Distract Me", tip: "SubmitHub + manual outreach; lyric screenshots convert." },
    { id: "sync-lib", name: "Sync libraries / supervisors", lane: "Sync", fit: "Bad Enough, Skin, Lovesick, Distract Me", tip: "Use Pitch Kit sync cues; one ask per track." },
    { id: "college", name: "College radio charts", lane: "Radio", fit: "Debut LP, Love Songs", tip: "Pair with C89.5 relationship; ship physical if possible." }
  ],

  // Content factory packs — Start Here tracks + Temporary Insanity (next-single lane).
  contentFactory: [
    {
      song: "Bad Enough",
      hooks: ["choose yourself lip-sync", "revenge glow-up transition", "lyric card: ‘bad enough’ hook"],
      shots: ["15s hook close-up", "30s story cutdown", "vinyl / mirror B-roll", "caption: ‘for the version of you that stayed’"],
      captions: ["Choosing me was the plot twist.", "Post-breakup energy, country-pop edition.", "If this finds you — keep it."]
    },
    {
      song: "Temporary Insanity",
      hooks: ["overthinking POV text overlay", "green flag / red flag listicle", "chaotic-era stitch bait"],
      shots: ["beat-timed caption cuts", "mirror spiral / hallway walk", "fan DM reply stitch"],
      captions: ["Intrusive thoughts, but make it a chorus.", "Chaotic era — documented.", "If your brain won’t shut up, press play."]
    },
    {
      song: "Classic",
      hooks: ["first-dance aspirational", "couple montage / anniversary", "wedding playlist soft CTA"],
      shots: ["golden-hour couple B-roll", "lyric card on the yearning line", "fan stitch: ‘our song’ ask"],
      captions: ["Put this on the wedding playlist.", "Romance, indie-pop edition.", "For the ones who still mean it."]
    },
    {
      song: "Distract Me",
      hooks: ["dreamy situationship POV", "soft filter walk", "‘put this on while…’"],
      shots: ["window light static take", "lyric overlay slow zoom", "headphones / rainy Seattle B-roll"],
      captions: ["A dreamily caressing pop success — and a mood.", "For the almosts.", "Soft playlist bait."]
    },
    {
      song: "Good Ride (Mechanical Bullshit)",
      hooks: ["alt-country wink", "mechanical bull / fairground metaphor", "lyric wit punchline"],
      shots: ["cowboy-boot detail", "car dashboard night drive", "live acoustic clip"],
      captions: ["Emotional whiplash, but make it twang.", "The lane beyond straight indie-pop.", "Wit first, heartbreak second."]
    },
    {
      song: "Hard to Love",
      hooks: ["confessional whisper", "Close Friends teaser", "acoustic bedroom take"],
      shots: ["single lamp performance", "handwritten lyric page", "fan-comment stitch"],
      captions: ["Honesty made audible.", "For the ones who stay anyway.", "Demo energy → True Fan fuel."]
    },
    {
      song: "Love Songs (EP)",
      hooks: ["critics-poll flex carousel", "hopeless romantic starter pack", "which track are you?"],
      shots: ["3-slide poll graphic", "EP medley cutdowns", "Seattle Times #1 screenshot + needle drop"],
      captions: ["#1 Seattle Times critics poll — still the yearning blueprint.", "Hopeless romantic starter pack.", "Comment your Love Songs track."]
    },
    {
      song: "Tinsley (Debut LP)",
      hooks: ["vinyl unboxing / KEXP story", "coming-of-age montage", "Start Here deep-cut tease"],
      shots: ["needle-drop close-up", "Seattle Times feature screenshot", "John Richards vinyl lore card"],
      captions: ["The Seattle Times told the vinyl story in August 2026.", "Nine tracks on growing up.", "If you only listen to three… Start Here."]
    }
  ],

  paidWinners: {
    blurb: "Never boost a loser. Organic clears the bar first — then small paid amplifies.",
    thresholds: [
      { metric: "TikTok saves rate", bar: "≥ 3% of views OR clear save spike vs your 7-day median", action: "Eligible for $5–15/day test" },
      { metric: "Shares / comments", bar: "Comment thread or stitch velocity in first 6h", action: "Duplicate to Reels; consider spark ads" },
      { metric: "Profile visits → follows", bar: "Follow conversion above your account baseline", action: "Retarget viewers with follow/save CTA" },
      { metric: "Link clicks (UTM)", bar: "Listen page or email CTR beating bio average", action: "Scale only the winning creative" }
    ],
    rules: [
      "Cap first tests at $50 total until a creative repeats wins twice.",
      "Kill losers at 24–48h — don’t ‘give it more budget.’",
      "Always attach UTMs (campaign = release or week id).",
      "Retarget: video viewers → follow/save; site visitors → email / Bandcamp."
    ]
  },

  seattleFlywheel: [
    { id: "kexp-spin", outlet: "KEXP", cadence: "Ongoing", asset: "In-studio ready: 3-song set + vinyl story one-pager + Seattle Times clip", next: "Thank Richards; offer new single + Start Here for local music desk" },
    { id: "end-spin", outlet: "107.7 The End", cadence: "Per release", asset: "Clean WAV + short artist letter + Atwood quote", next: "Follow up within 10 days of send" },
    { id: "c895-spin", outlet: "C89.5", cadence: "Per release", asset: "College radio package + optional physical", next: "Ask for specialty show spin" },
    { id: "chbp", outlet: "Capitol Hill Block Party", cadence: "Seasonal", asset: "Support-slot one-pager + live routing kit", next: "Apply / network previous performers" },
    { id: "hidden-hall", outlet: "Hidden Hall (Femme Friday)", cadence: "Aug 28, 2026", asset: "QR to official tickets + list capture at door", next: "This Friday — merch table + thank-you DMs after" },
    { id: "record-shops", outlet: "Easy Street / Sonic Boom / independent shops", cadence: "Monthly", asset: "QR treasure hunt + listening booth card", next: "Schedule one vinyl day per quarter" },
    { id: "uw-campus", outlet: "UW / campus weekenders", cadence: "Quarterly", asset: "Mascot / cowgirl character + flyer QR to Listen", next: "Student radio crossover" }
  ],

  trueFanLadder: [
    { tier: 1, name: "Listener", price: "Free", offer: "Start Here playlist + social follows", cta: "Smart link on Listen page" },
    { tier: 2, name: "Subscriber", price: "$0 list", offer: "Email / SMS — demos, dates, first dibs", cta: "Join the list" },
    { tier: 3, name: "Close Friend", price: "IG Close Friends", offer: "Unreleased snippets, voice notes, early covers", cta: "Add from Stories CTA" },
    { tier: 4, name: "Bandcamp buyer", price: "$5–40", offer: "Demos, name-your-price, merch bundles", cta: "Bandcamp Friday drops" },
    { tier: 5, name: "Vinyl / merch", price: "$30–60", offer: "KEXP-funded vinyl lore + signed inserts", cta: "Limited runs with email unlock" },
    { tier: 6, name: "Ticket priority", price: "Show+", offer: "Presale codes + merch bundle at door", cta: "List-only presale" },
    { tier: 7, name: "True Fan patron", price: "~$100/yr", offer: "House-show lottery, patron credit, annual zine/demo pack", cta: "Invite after 2+ purchases or 1 show" }
  ],

  liveRouting: {
    blurb: "2026 proof is already on the books — Hidden Hall this week, plus Cailin Russo support, a Tacoma headline, and last fall’s Suzzallo West Coast run. PNW first, then the map.",
    onePager: [
      "Seattle indie pop-rock with a country-pop edge — Atwood, Seattle Times feature (2026), #1 EP (2023), KEXP vinyl story.",
      "Next date: Fri Aug 28, 2026 — Femme Friday at Hidden Hall with Girl Parallel and Veronica North.",
      "2026 live: Spanish Ballroom headline (Feb 12), Bad Enough video premiere at Hotel Crocodile (Mar 13), Cailin Russo support at Barboza (Mar 17), Wild Buffalo, Belltown Yacht Club, Yonder Cider acoustic, Add-a-Ball (Jun 18).",
      "2025 routing already opened the West: Suzzallo support (Spokane → San Diego) plus KEXP Town Hall with John Richards.",
      "Set length: 30–45 min support / 60+ headline small rooms. Acoustic duo option for taprooms / radio.",
      "Contact: official EPK on tinsleymusic.com + Pitch Kit from the Song deck."
    ],
    legs: [
      { region: "PNW", markets: ["Seattle", "Portland", "Bellingham", "Spokane", "Vancouver BC"], targets: "College rooms, in-stores, KEXP-adjacent bills" },
      { region: "West Coast", markets: ["SF / Oakland", "LA (echo / residency)", "Sacramento", "Eugene"], targets: "Support for Samia / Soccer Mommy–adjacent bills; songwriter nights" },
      { region: "National openers", markets: ["NYC", "Chicago", "Austin", "Nashville (country-pop lane)"], targets: "Pitch like-artists with highest reach scores first (Samia, Soccer Mommy, Holly Humberstone)" }
    ]
  },

  // ---- Tour desk (self-booking OS for an aspiring touring musician) ----
  tourDesk: {
    nextShow: {
      date: "2026-08-28",
      when: "Fri Aug 28, 2026",
      title: "Femme Friday",
      venue: "Hidden Hall",
      address: "400 N 35th St, Seattle, WA",
      city: "Seattle, WA",
      doors: "8:00pm",
      show: "8:30pm",
      age: "21+",
      bill: ["Tinsley", "Veronica North", "Girl Parallel"],
      tickets: "https://www.tinsleymusic.com/shows",
      notes: "Hometown 3-band bill. Merch + list QR before doors. Settlement and thank-yous before you leave.",
      daySheet: [
        { t: "5:30pm", item: "Load-in, park, find house manager" },
        { t: "6:15pm", item: "Soundcheck — Bad Enough + one mid-set song" },
        { t: "7:15pm", item: "Merch table + ticket/list QR live before doors" },
        { t: "8:00pm", item: "Doors / guest list at the door" },
        { t: "Set", item: "Confirm slot length with the house — typically 30–40 on a 3-band night" },
        { t: "After", item: "Count merch, settle, thank venue + bill, log the night" }
      ]
    },
    advance: [
      {
        id: "t14",
        label: "T–14",
        items: [
          { id: "hold", text: "Hold or offer in writing — date, guarantee or door %, set length" },
          { id: "rider", text: "Send tech rider + hospitality + stage plot / input list" },
          { id: "travel", text: "Travel, parking, and load-in window confirmed" },
          { id: "announce", text: "Announce on list + Stories; official tickets only (tinsleymusic.com/shows)" },
          { id: "merch", text: "Count merch, restock, pack float + Square/reader + QR stand" },
          { id: "guest", text: "Guest-list names + plus-one policy to the house" }
        ]
      },
      {
        id: "t7",
        label: "T–7",
        items: [
          { id: "times", text: "Reconfirm load-in, soundcheck, set time, curfew" },
          { id: "deal", text: "Settlement terms in writing (guarantee, vs door, merch cut)" },
          { id: "table", text: "Merch table location and who staffs it during the set" },
          { id: "content", text: "Plan one recap clip + one still; assign the phone" },
          { id: "set", text: "Lock a 30–40 support set or 60+ headline set — print two copies" }
        ]
      },
      {
        id: "day",
        label: "Day of",
        items: [
          { id: "in", text: "Load-in on time; water and setlists on stage" },
          { id: "qr", text: "QR + merch live before first person walks in" },
          { id: "door", text: "Guest list at the door; no late adds after soundcheck" },
          { id: "video", text: "Film the hook song from the room, not the stage" },
          { id: "settle", text: "Settle before you leave — cash or check, written count" }
        ]
      },
      {
        id: "after",
        label: "After",
        items: [
          { id: "thanks", text: "Thank venue + bill (text/email same night)" },
          { id: "dms", text: "Thank-you DMs to new follows and people who bought merch" },
          { id: "recap", text: "Recap post within 24 hours — one clip, one still, next-date CTA" },
          { id: "log", text: "Log settlement, merch, emails captured, and one booking intro to ask" },
          { id: "ask", text: "Ask the booker for one intro or a return hold this season" }
        ]
      }
    ],
    venues: [
      { id: "hidden-hall", name: "Hidden Hall", city: "Seattle", cap: 200, fit: "This Friday — treat as a home room", priority: "A" },
      { id: "barboza", name: "Barboza", city: "Seattle", cap: 190, fit: "Already supported Cailin Russo here — ask for a headline or co-bill", priority: "A" },
      { id: "tractor", name: "Tractor Tavern", city: "Seattle", cap: 300, fit: "KEXP-adjacent bills; NYE + Jaws of Brooklyn history", priority: "A" },
      { id: "sunset", name: "Sunset Tavern", city: "Seattle", cap: 180, fit: "Sold-out headline history — return date", priority: "A" },
      { id: "lou", name: "Madame Lou’s", city: "Seattle", cap: 250, fit: "Support room that already put her in front of Sheppard / Sam Fischer", priority: "B" },
      { id: "croc", name: "The Crocodile / Hotel Crocodile", city: "Seattle", cap: 400, fit: "Lobby Session + video premiere — stay in the building", priority: "A" },
      { id: "wild-buffalo", name: "Wild Buffalo", city: "Bellingham", cap: 400, fit: "Two 2026 visits already — make it a circuit stop", priority: "A" },
      { id: "spanish", name: "Spanish Ballroom", city: "Tacoma", cap: 300, fit: "Feb 12 headline — ask for a fall return", priority: "A" },
      { id: "white-eagle", name: "White Eagle", city: "Portland", cap: 200, fit: "Album-release room — first PDX hold of the next run", priority: "A" },
      { id: "miss-studios", name: "Mississippi Studios", city: "Portland", cap: 400, fit: "Step-up PDX room once White Eagle repeats", priority: "B" },
      { id: "cobalt", name: "The Cobalt", city: "Vancouver BC", cap: 350, fit: "Album-release room — passport routing for a 4-date PNW", priority: "B" },
      { id: "district", name: "The District", city: "Spokane", cap: 200, fit: "Suzzallo support already opened this market", priority: "B" }
    ],
    supportAsks: [
      { id: "veronica", name: "Veronica North", lane: "PNW peer", ask: "Keep sharing bills; trade Seattle / Bellingham holds", reach: "Now" },
      { id: "girl-p", name: "Girl Parallel", lane: "PNW peer", ask: "Aug 28 bill — ask for a fall co-headline", reach: "Now" },
      { id: "fiona", name: "Fiona Grey", lane: "PNW peer", ask: "BYC bill already happened — pitch a PDX / Tacoma swap", reach: "Now" },
      { id: "cailin", name: "Cailin Russo", lane: "National-adjacent", ask: "Thank-you + ‘any West Coast leftovers’ after Barboza support", reach: "Warm" },
      { id: "suzzallo", name: "Suzzallo", lane: "West Coast", ask: "Stay in orbit after the Sept 2025 run — first call for another support", reach: "Warm" },
      { id: "samia", name: "Samia", lane: "Like-artist", ask: "Support-slot one-pager when a PNW or West date lands", reach: "Stretch" },
      { id: "soccer", name: "Soccer Mommy", lane: "Like-artist", ask: "Same kit — guitar-forward bills, highest reach score on the map", reach: "Stretch" },
      { id: "holly", name: "Holly Humberstone", lane: "Like-artist", ask: "UK/US routing; only pitch when a West Coast hold is real", reach: "Stretch" }
    ],
    festivals: [
      { id: "chbp", name: "Capitol Hill Block Party", when: "July · Seattle", next: "Apply / network alumni when the form opens", window: "Winter–spring" },
      { id: "bumber", name: "Bumbershoot", when: "Labor Day · Seattle", next: "Local showcase path + one-pager", window: "Winter" },
      { id: "treefort", name: "Treefort", when: "March · Boise", next: "Boise already on the Suzzallo run — apply as a showcase", window: "Fall" },
      { id: "bite", name: "Bite of Seattle", when: "July · Mural Stage", next: "Played 2024 — ask for a return", window: "Spring" },
      { id: "cloudbreak", name: "Cloudbreak", when: "Fall · Seattle", next: "Headlined Barboza 2024 — stay in the family", window: "Summer" },
      { id: "kexp-show", name: "KEXP / Town Hall bills", when: "Rolling", next: "Death & Music already happened — offer an in-studio + vinyl story", window: "Ongoing" },
      { id: "sxsw", name: "SXSW", when: "March · Austin", next: "Only after a 6–10 date run exists to justify the cost", window: "Fall" },
      { id: "treefort-satellite", name: "Pickathon / country-pop showcases", when: "Summer · OR", next: "Good Ride / Bad Enough lane — one targeted submit", window: "Winter" }
    ],
    kit: {
      tech: [
        "Standard indie backline — drums, bass amp, guitar amp if the house has them; we can travel light.",
        "Inputs: vocal (SM58 or house), acoustic DI, electric DI or amp mic, optional keys DI.",
        "30–45 min support / 60+ headline. Acoustic duo option for taprooms, radio, and in-stores.",
        "No playback required. Click optional. In-ears optional — wedges are fine."
      ],
      hospitality: [
        "Water on stage. A quiet corner to put cases is enough.",
        "One parking / load-in note is more useful than a full rider.",
        "Guest list: 6 unless the house says otherwise. Cutoff at soundcheck.",
        "Merch: we staff our own table; 0% house cut preferred, 10–15% if that’s the room policy — confirm in the offer."
      ],
      merch: [
        { item: "Vinyl (KEXP-funded story)", price: 30, pack: 12 },
        { item: "Tee", price: 28, pack: 18 },
        { item: "Tote", price: 18, pack: 10 },
        { item: "Poster", price: 12, pack: 20 },
        { item: "Sticker pack", price: 3, pack: 40 }
      ],
      sets: {
        support: ["Distract Me", "Classic", "Good Ride (Mechanical Bullshit)", "Hard to Love", "Bad Enough"],
        headline: ["Distract Me", "Temporary Insanity", "Classic", "Good Ride (Mechanical Bullshit)", "Skin", "Heart Attack", "Hard to Love", "the end — acoustic", "Bad Enough"]
      }
    },
    deal: {
      guarantee: 300,
      doorSplit: 70,
      tickets: 80,
      ticketPrice: 17,
      merch: 220,
      merchCogs: 70,
      travel: 40,
      lodging: 0,
      other: 25
    },
    run: {
      dates: 6,
      guarantee: 350,
      merch: 180,
      gas: 90,
      lodging: 110,
      food: 40,
      merchCogs: 55,
      miles: 220
    },
    advanceEmail:
      "Hi {name},\n\nConfirming Tinsley for {date} at {venue}.\n\nSet: 30–45 support / 60+ headline. Standard indie backline; acoustic duo available.\nTech rider + hospitality attached. Guest list of 6 unless you prefer otherwise.\n\nDraw: Seattle indie pop-rock with a country-pop edge — Atwood on Bad Enough, KEXP vinyl story, Seattle Times feature (Aug 2026), #1 critics-poll EP. Next hometown date is Fri Aug 28 at Hidden Hall (Femme Friday).\n\nEPK + photos: https://www.tinsleymusic.com/epk\nOfficial calendar: https://www.tinsleymusic.com/shows\n\nPlease reply with load-in, set time, settlement (guarantee / door / merch), and parking.\n\nThank you,\nTinsley"
  },

  // ---- Public marketing surfaces (press / sync / shows / single campaign) ----
  pressKit: {
    eyebrow: "Electronic Press Kit",
    headline: "For editors, radio, and playlist desks.",
    lede: "Seattle indie pop-rock with a country-pop edge — diary-clear hooks, KEXP-backed vinyl, an August 2026 Seattle Times feature, and a #1 Seattle Times critics-poll EP.",
    oneLiner: "Seattle indie pop-rock with a country-pop edge.",
    contactNote: "Booking & press: use the official EPK form on tinsleymusic.com, or reply via the channels below.",
    assets: [
      { label: "Official EPK", hrefKey: "epk", note: "Photos, bio, and booking from the artist site" },
      { label: "Spotify", hrefKey: "spotify", note: "Artist profile + Start Here playlist" },
      { label: "Bandcamp", hrefKey: "bandcamp", note: "Vinyl, demos, high-margin catalog" },
      { label: "Listen page", href: "listen.html", note: "Fan Start Here + email list" }
    ],
    facts: [
      { k: "Based in", v: "Seattle, WA" },
      { k: "Active since", v: "2018" },
      { k: "Flagship", v: "Self-titled debut LP (2025)" },
      { k: "Lead single", v: "Bad Enough (Feb 12, 2026) + video" },
      { k: "Next date", v: "Aug 28, 2026 · Hidden Hall, Seattle" },
      { k: "Radio", v: "KEXP · 107.7 The End · C89.5" },
      { k: "Featured", v: "The Seattle Times (Aug 2026) — KEXP vinyl / next chapter" },
      { k: "Milestone", v: "#1 Seattle Times WA critics poll (Love Songs EP)" }
    ]
  },

  syncPage: {
    eyebrow: "Sync & licensing",
    headline: "Clear stories. Sticky hooks. Sync-ready moods.",
    lede: "Pitch-ready cues for supervisors — diary-forward toplines with country-pop, dream-pop, and electro catalog depth.",
    contactNote: "For sync inquiries, start with the official EPK / management contact. Tag cues below when submitting.",
    moods: [
      { mood: "Choose yourself / glow-up", tracks: ["Bad Enough"], use: "End credits, revenge arcs, YA empowerment" },
      { mood: "Coming of age / grief", tracks: ["Tinsley (Debut LP)", "Hard to Love"], use: "Intimate drama, montage under dialogue" },
      { mood: "Dreamy situationship", tracks: ["Distract Me"], use: "Travel, crush, soft lifestyle beds" },
      { mood: "Alt-country wit", tracks: ["Good Ride (Mechanical Bullshit)"], use: "Road trip, wry romance, coastal-cowgirl" },
      { mood: "Wedding / first dance", tracks: ["Classic"], use: "Ceremony, anniversary, romance spots" },
      { mood: "Anxious / spiral", tracks: ["Heart Attack", "Temporary Insanity"], use: "Thriller-adjacent teen drama, comedy chaos" }
    ]
  },

  showsPage: {
    eyebrow: "Live & booking",
    headline: "Next: Hidden Hall, Aug 28.",
    lede: "Femme Friday at Hidden Hall with Girl Parallel and Veronica North — doors 8:00pm, 21+. Official tickets on tinsleymusic.com/shows.",
    bookingNote: "For offers and holds, use the official EPK booking channel. Include market, capacity, and date windows. Official calendar: tinsleymusic.com/shows.",
    draw: [
      "This Friday: Femme Friday at Hidden Hall with Girl Parallel and Veronica North",
      "2026 already includes a Tacoma headline, Cailin Russo support at Barboza, and the Bad Enough video premiere",
      "Hometown radio (KEXP, 107.7 The End, C89.5) plus John Richards / Town Hall",
      "West Coast proof: Sept 2025 Suzzallo support run (Spokane → San Diego)"
    ],
    set: [
      { label: "Support", detail: "30–45 min" },
      { label: "Headline (small)", detail: "60+ min" },
      { label: "Tech", detail: "Standard indie backline" },
      { label: "Alt format", detail: "Acoustic duo for in-stores / radio" }
    ],
    calendarUrl: "https://www.tinsleymusic.com/shows",
    dates: [
      { date: "2026-08-28", venue: "Hidden Hall", city: "Seattle, WA", note: "Femme Friday with Girl Parallel and Veronica North. Doors 8:00pm, 21+.", href: "https://www.tinsleymusic.com/shows" },
      { date: "2026-06-18", venue: "Add-a-Ball", city: "Seattle, WA", note: "With Great Comet and Moving in Slow." },
      { date: "2026-05-01", venue: "Yonder Cider × Bale Breaker", city: "Seattle, WA", note: "Acoustic set — first Summer Music Nights." },
      { date: "2026-04-22", venue: "Belltown Yacht Club", city: "Seattle, WA", note: "With Fiona Grey." },
      { date: "2026-03-27", venue: "Wild Buffalo", city: "Bellingham, WA", note: "With Veronica North." },
      { date: "2026-03-17", venue: "Barboza", city: "Seattle, WA", note: "Supporting Cailin Russo." },
      { date: "2026-03-13", venue: "Hotel Crocodile", city: "Seattle, WA", note: "Lobby Session + Bad Enough music video premiere." },
      { date: "2026-02-12", venue: "Spanish Ballroom", city: "Tacoma, WA", note: "Headline with Michael the Band and Joyla Red. Same day as the Bad Enough release." },
      { date: "2025-12-31", venue: "Tractor Tavern", city: "Seattle, WA", note: "Artist Home New Year’s Eve." },
      { date: "2025-12-06", venue: "Hidden Hall", city: "Seattle, WA", note: "80s prom show with Joyla Red and Henry Mansfield." },
      { date: "2025-11-20", venue: "Wild Buffalo", city: "Bellingham, WA", note: "Supporting Babes in Canyon with Lovely Colours." },
      { date: "2025-11-16", venue: "Town Hall", city: "Seattle, WA", note: "Death & Music — KEXP, hosted by John Richards." },
      { date: "2025-11-14", venue: "Tractor Tavern", city: "Seattle, WA", note: "Co-headline with Jaws of Brooklyn. Presented by KEXP, KBCS, and Cloudbreak." },
      { date: "2025-09-23", venue: "Soda Bar", city: "San Diego, CA", note: "Supporting Suzzallo." },
      { date: "2025-09-22", venue: "The Rebel Lounge", city: "Phoenix, AZ", note: "Supporting Suzzallo." },
      { date: "2025-09-21", venue: "Backstage at Revel", city: "Albuquerque, NM", note: "Supporting Suzzallo." },
      { date: "2025-09-20", venue: "Lost Lake Lounge", city: "Denver, CO", note: "Supporting Suzzallo." },
      { date: "2025-09-18", venue: "Velour Live Music Gallery", city: "Provo, UT", note: "Supporting Suzzallo." },
      { date: "2025-09-17", venue: "Neurolux", city: "Boise, ID", note: "Supporting Suzzallo." },
      { date: "2025-09-16", venue: "The District Bar", city: "Spokane, WA", note: "Supporting Suzzallo." },
      { date: "2025-09-13", venue: "Jazzbones", city: "Tacoma, WA", note: "Direct support for Smokey Brights’ album release." },
      { date: "2025-08-21", venue: "Chop Suey", city: "Seattle, WA", note: "Support for City of Pines." },
      { date: "2025-08-08", venue: "Kulshan Trackside Beer Garden", city: "Bellingham, WA", note: "Trackside Summer Music series with Veronica North." },
      { date: "2025-05-17", venue: "Madame Lou’s", city: "Seattle, WA", note: "Support for Suzzallo (Rocky Votolato) album release." },
      { date: "2025-03-22", venue: "The Chameleon", city: "Spokane, WA", note: "Album release with Austen and Water Monster." },
      { date: "2025-03-15", venue: "Tractor Tavern", city: "Seattle, WA", note: "Support for Aaron Crawford." },
      { date: "2025-03-07", venue: "The Cobalt", city: "Vancouver, BC", note: "Album release with Annika Catharina and Tess Anderson." },
      { date: "2025-03-01", venue: "The Shakedown", city: "Bellingham, WA", note: "Album release with Cat Valley and Cat Positive." },
      { date: "2025-02-28", venue: "Lucky Dime", city: "Everett, WA", note: "Album release with Thavoron and Clothing Optional. $10 cash at the door." },
      { date: "2025-02-15", venue: "White Eagle Saloon", city: "Portland, OR", note: "Album release with Andrew Ash and Jacqueline Hyde." },
      { date: "2025-02-14", venue: "Spanish Ballroom", city: "Tacoma, WA", note: "Album release with Stella Mar and Hot Stepmom." },
      { date: "2025-01-09", venue: "Neumos", city: "Seattle, WA", note: "Seattle album release with Lovely Colours, Midnight High, and waltzerr." },
      { date: "2024-12-07", venue: "Sunset Tavern", city: "Seattle, WA", note: "Sold-out headline with Jaws of Brooklyn and Annie J." },
      { date: "2024-11-20", venue: "Barboza — Cloudbreak", city: "Seattle, WA", note: "Festival headline with Kazmyn and Mia Day. Presented by Visit Seattle / King County." },
      { date: "2024-11-13", venue: "High Dive", city: "Seattle, WA", note: "Opened for New Constellations." },
      { date: "2024-10-11", venue: "Conor Byrne Pub", city: "Seattle, WA", note: "With Babes in Canyon and Liv Victorino." },
      { date: "2024-08-24", venue: "Madame Lou’s", city: "Seattle, WA", note: "Direct support for Sheppard." },
      { date: "2024-08-16", venue: "Sunset Tavern", city: "Seattle, WA", note: "With Waltzerr, Pallettes, and Balcony Bridge." },
      { date: "2024-07-20", venue: "Capitol Hill Block Party", city: "Seattle, WA", note: "Festival set." },
      { date: "2024-07-19", venue: "Bite of Seattle — Mural Stage", city: "Seattle, WA", note: "Festival set." },
      { date: "2024-06-22", venue: "Madame Lou’s", city: "Seattle, WA", note: "Direct support for Sam Fischer." },
      { date: "2024-05-06", venue: "Madame Lou’s", city: "Seattle, WA", note: "Direct support for Salt Cathedral." },
      { date: "2024-01-20", venue: "Barboza", city: "Seattle, WA", note: "Headline with AUSTEN and sister swimmer." },
      { date: "2023-11-18", venue: "Tractor Tavern", city: "Seattle, WA", note: "Sold-out support for Kuinka with Kate Dinsmore." },
      { date: "2023-10-30", venue: "Barboza", city: "Seattle, WA", note: "Direct support for Girl Ray." },
      { date: "2023-08-18", venue: "Barboza", city: "Seattle, WA", note: "EP release show." },
      { date: "2023-06-20", venue: "High Dive", city: "Seattle, WA", note: "Opened for Glassio with Mount Planet." },
      { date: "2023-05-07", venue: "Breaking Sound: Unpublished", city: "Los Angeles, CA", note: "Adults Only." },
      { date: "2023-05-02", venue: "Sunset Tavern", city: "Seattle, WA", note: "With Puck and Liv Victorino." },
      { date: "2023-03-31", venue: "Emerald City Trapeze Arts", city: "Seattle, WA", note: "Sessions in Place with Byland." },
      { date: "2023-01-14", venue: "Neumos", city: "Seattle, WA", note: "Taylor Swift night — sold-out crowd." },
      { date: "2023-01-06", venue: "Barboza", city: "Seattle, WA", note: "Co-headline with Lovely Colours. Support from Modern Daze." },
      { date: "2022-10-27", venue: "Bad Bar", city: "Seattle, WA", note: "Halloween with Seiichi, Gallaway, and Justin Hartinger." },
      { date: "2022-07-28", venue: "Neumos", city: "Seattle, WA", note: "My Body, My Choice Abortion Fundraiser." },
      { date: "2022-07-23", venue: "Capitol Hill Block Party", city: "Seattle, WA", note: "Neumos stage." },
      { date: "2022-06-24", venue: "ALMA", city: "Tacoma, WA", note: "Rooftop — direct support for harley." },
      { date: "2022-05-07", venue: "Belltown Bloom — The Crocodile", city: "Seattle, WA", note: "Festival set." },
      { date: "2022-02-22", venue: "The Crocodile", city: "Seattle, WA", note: "Writer’s Block songwriter showcase." },
      { date: "2021-07-17", venue: "Barboza", city: "Seattle, WA", note: "Headline with Justin Hartinger and ALLA." },
      { date: "2020-11-20", venue: "The Vera Project livestream", city: "Seattle, WA", note: "VTV on YouTube and Facebook." },
      { date: "2020-09-27", venue: "AFSP WA Out of the Darkness", city: "Washington", note: "American Foundation for Suicide Prevention event." },
      { date: "2020-05-02", venue: "Capitol Hill Arts District stream", city: "Seattle, WA", note: "Capitol Hill Block Party curated local lineup." },
      { date: "2020-01-23", venue: "Sofar Sounds", city: "Seattle, WA", note: "The Shop with Jake Crocker." },
      { date: "2020-01-18", venue: "Barboza", city: "Seattle, WA", note: "EP release with Jake Crocker and ALKI." },
      { date: "2019-12-06", venue: "Barboza", city: "Seattle, WA", note: "With The Environment and Like Lions." },
      { date: "2019-12-05", venue: "The Crocodile", city: "Seattle, WA", note: "With Jake Crocker, Bodies on the Beach, Nacho Picasso." },
      { date: "2019-11-14", venue: "Portland State University", city: "Portland, OR", note: "Live @ Lunch Series." },
      { date: "2019-09-29", venue: "Sunset Tavern", city: "Seattle, WA", note: "Opened for ViVii with Jake Crocker. Presented by The Crocodile." },
      { date: "2019-09-22", venue: "The Rendezvous", city: "Seattle, WA", note: "Local showcase with Jake Crocker, Mariah Belgrod, and Abby Brown." },
      { date: "2019-09-14", venue: "Fremont Abbey Arts Center", city: "Seattle, WA", note: "Supported ZAHARA’s EP release with Jake Crocker and Sharmaine." },
      { date: "2019-09-11", venue: "Sofar Sounds", city: "Seattle, WA", note: "Sold out at The Ruins." },
      { date: "2019-09-03", venue: "Sunset Tavern", city: "Seattle, WA", note: "Headline with Jake Crocker. Support from MariGo and Neon Bloom." },
      { date: "2019-08-24", venue: "Seward Park Amphitheater", city: "Seattle, WA", note: "Summer SMASH charity concert." },
      { date: "2019-08-07", venue: "Sofar Sounds", city: "Seattle, WA", note: "Secret location." },
      { date: "2019-06-29", venue: "Sofar Sounds", city: "Seattle, WA", note: "Sold-out set." },
      { date: "2019-04-30", venue: "Funhouse", city: "Seattle, WA", note: "Singer/songwriter showcase." },
      { date: "2019-04-24", venue: "Barboza", city: "Seattle, WA", note: "Do206 × Pabst Blue Ribbon Sound Society Showcase." },
      { date: "2019-01-31", venue: "Funhouse", city: "Seattle, WA", note: "Opened for the Wild Moccasins with Jake Crocker." },
      { date: "2019-01-26", venue: "Piranha Shop", city: "Seattle, WA", note: "Parke Ave anniversary party." },
      { date: "2018-12-08", venue: "Furion Cellars", city: "Snohomish, WA", note: "Holiday open house." },
      { date: "2018-08-31", venue: "Bumbershoot", city: "Seattle, WA", note: "Joined Jake Crocker at Ex Hall." },
      { date: "2018-07-20", venue: "Capitol Hill Block Party", city: "Seattle, WA", note: "Festival debut with Jake Crocker at Neumos." },
      { date: "2018-02-23", venue: "Neptune Theatre", city: "Seattle, WA", note: "Opened for Ryan Caraveo with Jake Crocker." },
      { date: "2017-12-15", venue: "Grumpy D’s", city: "Seattle, WA", note: "Songwriters in the Round." },
      { date: "2017-10-27", venue: "El Corazon", city: "Seattle, WA", note: "Opened for Secondhand Serenade with Brandon Parker." },
      { date: "2017-09-10", venue: "Funhouse", city: "Seattle, WA", note: "Opened for The Icarus Account with Brandon Parker." },
      { date: "2017-05-04", venue: "20 Corners Brewing", city: "Woodinville, WA", note: "Acoustic set with Brandon Parker." }
    ]
  },

  campaignBadEnough: {
    song: "Bad Enough",
    slug: "bad-enough",
    eyebrow: "Single · Feb 12, 2026",
    headline: "Cathartic country-pop at its finest.",
    lede: "Released Feb 12; video premiered Mar 13 at Hotel Crocodile. Post-breakup. Choose yourself. Atwood-praised and built for glow-up lip-syncs.",
    quote: { text: "Tinsley's latest single is cathartic country-pop at its finest.", source: "Atwood Magazine" },
    ctas: [
      { label: "Stream on Spotify", hrefKey: "spotify", primary: true },
      { label: "Aug 28 tickets", href: "https://www.tinsleymusic.com/shows" },
      { label: "Bandcamp", hrefKey: "bandcamp" }
    ],
    angles: [
      { title: "The hook", text: "Lip-sync the chorus with a revenge-glow-up transition — FYP bait that still sounds like her." },
      { title: "The story", text: "Diary-clear ‘choosing me’ energy after the debut LP era — same honesty, sharper edge." },
      { title: "The lane", text: "Country-pop crossover without abandoning Seattle indie DNA — playlist and sync dual threat." }
    ],
    weekBeats: [
      "Mon — Hook lip-sync + text: ‘choosing me’",
      "Wed — 15s story-behind: one line about writing the chorus",
      "Fri — Stitch/duet ask: show your glow-up to this hook"
    ]
  },

  // Named campaign pages — Bad Enough + next-single template (Temporary Insanity).
  // campaign.html?id=<slug> and dedicated HTML files both read from here.
  campaigns: {
    "bad-enough": null, // filled below after campaignBadEnough
    "temporary-insanity": {
      song: "Temporary Insanity",
      slug: "temporary-insanity",
      eyebrow: "Single · next chapter",
      headline: "Intrusive thoughts, but make it a chorus.",
      lede: "Chaotic-era overthinking — POV spiral energy for the fans who live in their heads. Built for stitch bait and green-flag / red-flag listicles.",
      quote: { text: "Honest, playful, and built for people who keep the vinyl close.", source: "Tinsley positioning" },
      ctas: [
        { label: "Stream on Spotify", hrefKey: "spotify", primary: true },
        { label: "Join the list", href: "listen.html#join" },
        { label: "Start Here", href: "listen.html#start" }
      ],
      angles: [
        { title: "The hook", text: "Beat-timed POV captions of intrusive thoughts — relatable without whisper-core cosplay." },
        { title: "The format", text: "Green flag / red flag listicles set to the chorus; fan DM reply stitches on Friday." },
        { title: "The lane", text: "Chaotic-era indie pop that still points back to Seattle honesty — not interchangeable diary-pop." }
      ],
      weekBeats: [
        "Mon — POV overthinking captions timed to the beat drop",
        "Wed — Green flag / red flag list set to the chorus",
        "Fri — Relatable comment reply stitch from a fan DM"
      ]
    }
  }
};

// Alias Bad Enough into the campaigns map for the generic campaign template.
TINSLEY.campaigns["bad-enough"] = TINSLEY.campaignBadEnough;
