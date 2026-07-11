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

  // ---- Per-song hashtag targeting for TikTok & Instagram ----
  // TikTok: lean, discovery/FYP + trend + niche-community tags (5-8 per post).
  // Instagram: layered by reach tier — Broad (>500k), Mid (50-500k), Niche (<50k)
  // so posts surface on both large feeds and reachable niche tabs (8-15 per post).
  songHashtags: [
    { title: "Bad Enough", angle: "Post-breakup glow-up / 'choose yourself' anthem — lip-sync the hook with a revenge-glow-up transition.",
      tiktok: ["#BadEnough", "#breakuptok", "#glowup", "#revengeglowup", "#choosingme", "#countrypop", "#indiepop", "#sadgirlmusic"],
      igBroad: ["#breakupsong", "#countrypop", "#newmusicfriday", "#selflove"],
      igMid: ["#indiepop", "#femalesingersongwriter", "#womeninmusic", "#glowup"],
      igNiche: ["#BadEnough", "#TinsleyMusic", "#seattlemusic", "#pnwmusic", "#indieartist"] },

    { title: "Temporary Insanity", angle: "Chaotic-era / overthinking spiral — POV text overlay of intrusive thoughts over the beat.",
      tiktok: ["#TemporaryInsanity", "#chaoticera", "#overthinking", "#indiepop", "#relatable", "#indietok", "#newmusic"],
      igBroad: ["#newmusicfriday", "#indiepop", "#alternativemusic"],
      igMid: ["#indierock", "#femalesingersongwriter", "#womeninmusic"],
      igNiche: ["#TemporaryInsanity", "#TinsleyMusic", "#seattlemusic", "#pnwmusic", "#newsingle"] },

    { title: "Tinsley (Debut LP)", angle: "Album era + vinyl story (KEXP-funded pressing) — vinyl unboxing / 'coming of age' montage.",
      tiktok: ["#Tinsley", "#debutalbum", "#vinyltok", "#vinylrecords", "#comingofage", "#indiepop", "#albumrelease"],
      igBroad: ["#vinylcommunity", "#vinylrecords", "#recordcollection"],
      igMid: ["#indiepop", "#indierock", "#kexp"],
      igNiche: ["#TinsleyTheAlbum", "#TinsleyMusic", "#seattlemusic", "#pnwmusic", "#comingofage"] },

    { title: "Distract Me", angle: "Dreamy situationship / crush-core — soft-focus b-roll with lyric captions.",
      tiktok: ["#DistractMe", "#dreampop", "#situationship", "#crushcore", "#bedroompop", "#softgirl", "#musictok"],
      igBroad: ["#dreampop", "#bedroompop", "#chillmusic"],
      igMid: ["#indiepop", "#softpop", "#femaleartist"],
      igNiche: ["#DistractMe", "#TinsleyMusic", "#seattlemusic", "#dreamy", "#indieartist"] },

    { title: "Good Ride (Mechanical Bullshit)", angle: "Wry alt-country / coastal-cowgirl — boots + truck b-roll, lean into the funny title bleep.",
      tiktok: ["#GoodRide", "#countrytok", "#coastalcowgirl", "#altcountry", "#indiecountry", "#cowgirl", "#newmusic"],
      igBroad: ["#countrymusic", "#americana", "#countrypop"],
      igMid: ["#altcountry", "#indiecountry", "#femalesingersongwriter"],
      igNiche: ["#GoodRide", "#TinsleyMusic", "#seattlemusic", "#twang", "#indieartist"] },

    { title: "Classic", angle: "Romantic / first-dance energy — couple montages, wedding & anniversary use.",
      tiktok: ["#Classic", "#lovesong", "#couplegoals", "#weddingsong", "#inlove", "#indiepop", "#romantic"],
      igBroad: ["#lovesong", "#weddingmusic", "#firstdancesong"],
      igMid: ["#indiepop", "#couplegoals", "#romantic"],
      igNiche: ["#ClassicSong", "#TinsleyMusic", "#seattlemusic", "#femalesingersongwriter", "#indieartist"] },

    { title: "Love Songs (EP)", angle: "Yearning + tastemaker cred (#1 Seattle Times critics poll) — 'songs for the hopeless romantics' carousel.",
      tiktok: ["#LoveSongs", "#yearning", "#indiepop", "#sadgirlmusic", "#indietok", "#singersongwriter", "#feelings"],
      igBroad: ["#lovesongs", "#indiepop", "#newmusic"],
      igMid: ["#indierock", "#femalesingersongwriter", "#kexp"],
      igNiche: ["#LoveSongsEP", "#TinsleyMusic", "#seattlemusic", "#pnwmusic", "#marcocollins"] },

    { title: "Hard to Love", angle: "Vulnerable confessional — raw acoustic clip or 'the version I don't post' intimacy.",
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
