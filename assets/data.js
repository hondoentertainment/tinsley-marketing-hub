/* =========================================================================
   Tinsley — Marketing & Analysis Data Layer
   All strategic content lives here so the site stays easy to maintain.
   Sources: tinsleymusic.com, EPK, Bandcamp discography, Atwood Magazine,
   Spokesman-Review, She Is The Music, KEXP.
   ========================================================================= */

const TINSLEY = {
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

  // ---- Career highlights / metrics for the hero band ----
  metrics: [
    { value: "19+", label: "Releases in catalog" },
    { value: "2025", label: "Self-titled debut LP" },
    { value: "3", label: "Seattle radio stations spinning her" },
    { value: "#1", label: "Seattle Times critics poll (2023 EP)" }
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

  // ---- SWOT-style catalog assessment ----
  assessment: {
    strengths: [
      "Distinct, 'smokey' vocal identity praised by American Songwriter.",
      "Genre range (indie, rock, country, folk, electro-pop) = multiple playlist lanes.",
      "Deep 19+ track catalog with a flagship self-titled LP anchor.",
      "Elite local validation: KEXP, 107.7 The End, C89.5, #1 Seattle Times critics poll."
    ],
    opportunities: [
      "Country-pop lane ('Bad Enough', 'Good Ride') is trending — pitch to country-crossover editors.",
      "Strong sync/TV potential for emotive, hook-forward songs.",
      "TikTok storytelling around lyrics + Seattle scene is underexploited.",
      "Vinyl / superfan merch narrative (John Richards funding) is a compelling press hook."
    ],
    watchouts: [
      "Mononym 'Tinsley' collides in search with Tinsley Ellis (blues) & 'tinsel' — SEO risk.",
      "Broad genre spread can blur positioning; anchor a hero lane per campaign.",
      "Catalog spans 2018–2026 with stylistic shifts; curate a clean 'start here' playlist.",
      "Streaming reach appears modest vs. critical acclaim — convert press into playlists."
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
  likeArtists: [
    { name: "Maisie Peters", match: 94, tag: "Witty confessional pop", why: "Sharp, diaristic breakup storytelling with big hooks — near-identical target listener." },
    { name: "Gracie Abrams", match: 92, tag: "Intimate sad-pop", why: "Vulnerable, whisper-to-anthem dynamics; strong TikTok-driven fanbase overlap." },
    { name: "Holly Humberstone", match: 89, tag: "Alt indie-pop", why: "Moody, textured indie-pop with emotional honesty; similar tastemaker/press path." },
    { name: "Kacey Musgraves", match: 88, tag: "Country-pop crossover", why: "Stated influence; the 'Bad Enough' / 'Good Ride' country-pop lane targets her audience." },
    { name: "Soccer Mommy", match: 85, tag: "Indie rock", why: "Guitar-forward indie with wry lyricism; shared indie-rock and PNW-adjacent scene." },
    { name: "Faye Webster", match: 83, tag: "Alt-country / indie", why: "Dreamy alt-country textures and understated wit align with her twangier songs." },
    { name: "Lizzy McAlpine", match: 82, tag: "Folk-pop", why: "Narrative folk-pop with viral moments; overlapping streaming + TikTok audience." },
    { name: "Samia", match: 80, tag: "Indie pop-rock", why: "Emotionally raw indie pop-rock; comparable rising-artist positioning and press." },
    { name: "Suki Waterhouse", match: 78, tag: "Dreamy indie-pop", why: "Nostalgia-tinted dream-pop mood matches 'Distract Me' era; strong sync presence." },
    { name: "The Cranberries", match: 74, tag: "90s alt legacy", why: "Direct critical comparison ('dreamy pop rock that evokes The Cranberries') — legacy fan bridge." }
  ],

  // ---- EDM remix potential ranking ----
  // Composite score (0-100) from 4 weighted factors:
  //   hook (topline/vocal chop-ability), dance (tempo/groove fit),
  //   dna (existing electronic production), drop (build & drop payoff).
  remixRanking: [
    { title: "Skin", score: 92, style: "Deep / Sexy House", factors: { hook: 88, dance: 90, dna: 96, drop: 92 },
      why: "Already a sensual electro-pop cut (prod. Justin Hartinger) — breathy topline sits perfectly over a deep-house groove with minimal rework." },
    { title: "Lovesick", score: 90, style: "Dance-Pop / Future House", factors: { hook: 86, dance: 93, dna: 94, drop: 88 },
      why: "Dance-pop-leaning electro original; the longing hook is tailor-made for a four-on-the-floor future-house lift." },
    { title: "Heart Attack", score: 88, style: "Melodic Techno / Synthwave", factors: { hook: 85, dance: 86, dna: 92, drop: 90 },
      why: "Anxious synth-pop energy and pulsing tension convert directly into a driving melodic-techno build-and-release." },
    { title: "Distract Me", score: 85, style: "Melodic / Chill House", factors: { hook: 84, dance: 80, dna: 78, drop: 86 },
      why: "'Dreamily caressing' textures are ideal for melodic/organic house — atmospheric verses into a euphoric filtered drop." },
    { title: "Bad Enough", score: 84, style: "Festival Future-Bass", factors: { hook: 94, dance: 78, dna: 58, drop: 92 },
      why: "Biggest singalong hook in the catalog; the 'choose yourself' payoff is a natural future-bass / big-room drop despite live-band DNA." },
    { title: "In Bloom", score: 81, style: "Tropical / Progressive House", factors: { hook: 82, dance: 84, dna: 88, drop: 74 },
      why: "Hopeful electro-pop (prod. Jake Crocker) with bright synths — plucky tropical-house treatment fits instantly." },
    { title: "Endless Summer", score: 79, style: "Tropical House", factors: { hook: 80, dance: 82, dna: 66, drop: 76 },
      why: "Nostalgic, seasonal warmth is a layup for a sun-soaked tropical-house flip with steel-pan/marimba leads." },
    { title: "Slow & Steady", score: 74, style: "Progressive House", factors: { hook: 72, dance: 74, dna: 86, drop: 68 },
      why: "Reflective electro original with room to build; extend into a slow-burn progressive arc." },
    { title: "Classic", score: 72, style: "Future-Bass / Nu-Disco", factors: { hook: 84, dance: 70, dna: 58, drop: 72 },
      why: "Radiant, romantic topline chops beautifully; needs more rhythmic rebuild but the vocal carries a nu-disco flip." },
    { title: "Tinsley - EP", score: 69, style: "Electro-Pop Edit", factors: { hook: 70, dance: 72, dna: 80, drop: 58 },
      why: "Formative electro-pop material (prod. Jake Crocker) with usable stems for a modern club edit." },
    { title: "Temporary Insanity", score: 64, style: "Indie Dance / Nu-Disco", factors: { hook: 72, dance: 66, dna: 46, drop: 62 },
      why: "Restless energy suits an indie-dance rework, though guitar-forward production needs reprogramming." },
    { title: "Hard to Love", score: 60, style: "Emotional Bass / Drum & Bass", factors: { hook: 74, dance: 58, dna: 44, drop: 66 },
      why: "Vulnerable vocal works as a liquid-DnB or emotional-bass topline over the acoustic bones." },
    { title: "Too Bad", score: 58, style: "Indie Dance", factors: { hook: 66, dance: 60, dna: 46, drop: 54 },
      why: "Bittersweet mid-tempo; moderate lift into indie-dance with added groove." },
    { title: "Hear My Love", score: 56, style: "Deep House Edit", factors: { hook: 62, dance: 58, dna: 52, drop: 50 },
      why: "Devotional pop topline suits a warm deep-house edit; limited built-in dynamics." },
    { title: "Good Ride (Mechanical Bullshit)", score: 52, style: "Country-Dance / Bass House", factors: { hook: 70, dance: 50, dna: 34, drop: 54 },
      why: "Alt-country cut riding the country-dance crossover wave — high novelty, but the biggest production overhaul." },
    { title: "Just Three Words", score: 44, style: "Downtempo / Chillstep", factors: { hook: 60, dance: 38, dna: 30, drop: 42 },
      why: "Tender folk-pop; best as an ambient downtempo/chillstep reimagining rather than a club track." },
    { title: "the end - demos", score: 36, style: "Ambient / Lo-fi", factors: { hook: 52, dance: 26, dna: 22, drop: 30 },
      why: "Raw acoustic demos — only suited to atmospheric lo-fi or ambient textures." }
  ],

  // ---- Actionable 90-day marketing roadmap ----
  roadmap: [
    { phase: "Days 1–30 — Foundation", items: [
      "Lock positioning: lead with 'Seattle indie pop-rock, country-pop edge.'",
      "Build 'Start Here' Spotify playlist + optimize Artist profile & Canvas.",
      "Set up TikTok posting cadence (4–5x/wk) around 'Bad Enough'.",
      "Compile press EPK one-pager with KEXP + American Songwriter quotes." ] },
    { phase: "Days 31–60 — Amplify", items: [
      "Pitch next single to editorial 4 weeks early via Spotify for Artists.",
      "Run low-budget IG/TikTok ads to lyric-hook video winners.",
      "Reach country-pop + indie playlist curators (independent + editorial).",
      "Announce a PNW show run; collect emails on-site." ] },
    { phase: "Days 61–90 — Convert", items: [
      "Bandcamp Friday drop + limited vinyl/merch bundle.",
      "Retarget video viewers with follow + save CTAs.",
      "Secure 2–3 blog/radio features off TikTok traction.",
      "Analyze top markets/songs; double down for next release." ] }
  ],

  press: [
    { quote: "Boasting a dreamy pop rock sound that evokes bands like The Cranberries, Tinsley has become one of the up-and-coming artists to watch in the Seattle music scene.", source: "Seth Sommerfield, Inlander" },
    { quote: "An earnest, endearing collection of infectious indie-pop and indie-rock, with occasional alt-country undertones… bright guitars, irresistible hooks and plenty of allure.", source: "Chris Sanley, KEXP Music Director" },
    { quote: "The smokey-voiced indie pop artist is as sticky in her lyrics as her music is in melody.", source: "American Songwriter" },
    { quote: "Tinsley's latest single is cathartic country-pop at its finest.", source: "Atwood Magazine" }
  ]
};
