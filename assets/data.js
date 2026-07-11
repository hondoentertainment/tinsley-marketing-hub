/* =========================================================================
   Tinsley — Marketing & Analysis Data Layer
   All strategic content lives here so the site stays easy to maintain.
   Sources: tinsleymusic.com, EPK, Bandcamp discography, Atwood Magazine,
   Spokesman-Review, She Is The Music, KEXP.
   ========================================================================= */

const TINSLEY = {
  // ---- Site metadata: provenance, freshness & methodology ----
  // Credibility layer. `updated` drives the "Last updated" badge; `sources`
  // renders the Methodology block; `spotifyArtistId` powers the live data fetch.
  meta: {
    updated: "2026-07-11",
    spotifyArtistId: "1encEkVjZ4iqby8BXZc8Pa",
    canonicalUrl: "https://tinsley-hq.vercel.app/",
    methodology:
      "This deck blends verifiable public data with clearly-labeled analytical estimates. Figures marked LIVE (Spotify followers, popularity, top tracks, artwork) are fetched on page load from the Spotify Web API and reflect the moment you loaded the page. Catalog facts, press quotes and career milestones are sourced from the artist's official channels and published press. Remix scores, like-artist match percentages, and the True-Fans revenue model are the author's analytical estimates for planning purposes — not measured metrics.",
    sources: [
      { label: "Official site & EPK", url: "https://www.tinsleymusic.com/", kind: "Primary" },
      { label: "Spotify artist profile (live)", url: "https://open.spotify.com/artist/1encEkVjZ4iqby8BXZc8Pa", kind: "Live data" },
      { label: "Bandcamp discography", url: "https://musicbytinsley.bandcamp.com/", kind: "Primary" },
      { label: "KEXP", url: "https://www.kexp.org/", kind: "Press" },
      { label: "Atwood Magazine", url: "https://atwoodmagazine.com/tybe-tinsley-bad-enough-song-premiere/", kind: "Press" },
      { label: "The Spokesman-Review", url: "https://www.spokesman.com/stories/2025/mar/20/west-side-indie-pop-rocker-tinsley-brings-new-albu/", kind: "Press" },
      { label: "Kevin Kelly — 1,000 True Fans (2008)", url: "https://kk.org/thetechnium/1000-true-fans/", kind: "Framework" }
    ]
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
    bio: "Seattle-based singer-songwriter Tinsley makes indie pop-rock that's equal parts heartfelt and playful, blending breezy melodies with sharp lyrical self-awareness. Releasing mononymously since 2018, she blends indie, rock, country and folk textures with emotionally honest, diary-like storytelling. Her 2023 EP \"Love Songs\" was named the #1 pick in The Seattle Times Washington music critics poll, and in January 2025 she released her self-titled debut album with vinyl funded by KEXP DJ John Richards.",
    links: {
      website: "https://www.tinsleymusic.com/",
      linktree: "https://tr.ee/h6fNd7BTOw",
      spotify: "https://open.spotify.com/artist/1encEkVjZ4iqby8BXZc8Pa",
      bandcamp: "https://musicbytinsley.bandcamp.com/",
      instagram: "https://instagram.com/tinsleymusic",
      tiktok: "https://tiktok.com/@tinsleymusic",
      epk: "https://www.tinsleymusic.com/epk"
    }
  },

  // ---- Per-deck hero copy (song vs social pages share artist data, not the same job) ----
  decks: {
    song: {
      job: "Catalog & positioning",
      lede: "A music-first read of the catalog: what each era does well, which songs convert to remixes or sync, and which artists sit next to her on the map — not the content calendar."
    },
    social: {
      job: "Reach & revenue",
      lede: "A marketing-first playbook: hashtag tiers, per-song posting recipes, platform priorities, and a sequenced growth roadmap — the work of turning listeners into an owned audience."
    }
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
      note: "Lead single of her next chapter — 'cathartic country-pop at its finest' (Atwood). Post-breakup, choose-yourself anthem. Strongest sync + playlist candidate." },
    { title: "Temporary Insanity", year: 2025, type: "Single", mood: "Restless", genre: "Indie Pop",
      note: "Recent release extending the debut-era momentum." },
    { title: "Tinsley (Debut LP)", year: 2025, type: "Album", mood: "Coming-of-age", genre: "Indie Pop-Rock",
      note: "Nine-track self-titled debut on grief, relationships and growing up. Vinyl funded by KEXP's John Richards. The flagship catalog asset." },
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
      "Elite local validation: KEXP, 107.7 The End, C89.5, #1 Seattle Times critics poll — press that playlist editors trust."
    ],
    opportunities: [
      "Country-pop lane ('Bad Enough', 'Good Ride') is trending — pitch to country-crossover editors and Americana curators.",
      "Sync / TV: hook-forward, diary-clear songs ('Bad Enough', 'Classic', 'Hard to Love') fit teen / YA / coming-of-age cues.",
      "Early electro-pop stems ('Skin', 'Lovesick', 'Heart Attack') are remix-ready — highest dance-floor conversion with least production overhaul.",
      "Vinyl / KEXP funding story is a press + merch narrative that elevates the catalog beyond streams."
    ],
    watchouts: [
      "Mononym 'Tinsley' collides in search with Tinsley Ellis (blues) & 'tinsel' — title tracks and 'TinsleyMusic' matter for SEO.",
      "Broad genre spread can blur positioning; pick one hero lane per release cycle, not one forever sound.",
      "2018–2026 stylistic shifts need a curated 'Start Here' playlist so new listeners don't land on formative electro first.",
      "Critical acclaim outruns streaming reach — convert press into editorial playlist pitches, not more catalog sprawl."
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
      roadmapHook: "61–90 days · Superfans (Close Friends)",
      tiktok: ["#HardToLove", "#vulnerable", "#sadgirlmusic", "#indiepop", "#feelings", "#musictok", "#lyricsthathit"],
      igBroad: ["#sadsongs", "#indiepop", "#newmusic"],
      igMid: ["#indierock", "#femalesingersongwriter", "#womeninmusic"],
      igNiche: ["#HardToLove", "#TinsleyMusic", "#seattlemusic", "#pnwmusic", "#indieartist"] }
  ],

  // ---- Social media opportunities per platform ----
  social: [
    { platform: "TikTok", handle: "@tinsleymusic", priority: "Highest",
      why: "Best discovery engine for sad-girl / breakup indie-pop; short lyric-hook clips scale fast.",
      plays: ["Lyric POV videos on 'Bad Enough' hook ('choose yourself' angle).", "'Story behind the song' series for the debut LP.", "Duet/stitch with fans covering her songs.", "Behind-the-scenes Seattle studio + vinyl unboxing."] },
    { platform: "Instagram", handle: "@tinsleymusic", priority: "High",
      why: "Home base for brand, press, tour and superfan community; Reels mirror TikTok.",
      plays: ["Reels repurposed from TikTok within 24h.", "Carousel: press quotes (KEXP, American Songwriter).", "Show announcements + ticket-link stories.", "Close Friends demos to reward superfans."] },
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
    { key: "listeners", label: "Monthly listeners", track: "reach", current: 8000, target: 50000, fmt: "int", note: "Spotify monthly listeners — the top of the funnel." },
    { key: "followers", label: "Spotify followers", track: "reach", current: 3500, target: 25000, fmt: "int", note: "Owned-ish audience that gets Release Radar reach." },
    { key: "email", label: "Email subscribers", track: "foundation", current: 400, target: 5000, fmt: "int", note: "Truly owned audience — the most valuable list." },
    { key: "truefans", label: "True fans", track: "revenue", current: 80, target: 1000, fmt: "int", note: "Superfans spending ~$100/yr direct. The endgame." },
    { key: "sync", label: "Sync placements", track: "revenue", current: 1, target: 12, fmt: "int", note: "TV / film / ad / game placements landed." },
    { key: "d2c", label: "Monthly D2C revenue", track: "revenue", current: 700, target: 8000, fmt: "usd", note: "High-margin direct income (Bandcamp, merch, vinyl)." }
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
        { track: "foundation", lever: "Owned CRM", text: "Launch an email list + one smart link (Feature.fm/Linktree); add email capture to every bio, post, and show." },
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
        { track: "revenue", lever: "Live", text: "Book 1–2 PNW shows; run QR email capture, a front-and-center merch table, and post-show thank-you DMs." },
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
  }
};
