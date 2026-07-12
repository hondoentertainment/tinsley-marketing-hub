/* ============ Tinsley HQ — app logic ============ */
(function () {
  "use strict";
  const D = TINSLEY;
  const $ = (sel) => document.querySelector(sel);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* ---- wire external links ---- */
  document.querySelectorAll("[data-link]").forEach((a) => {
    const key = a.getAttribute("data-link");
    if (D.artist.links[key]) a.href = D.artist.links[key];
  });

  /* ---- hero ---- */
  const deckKey = document.body.getAttribute("data-deck");
  const deck = (D.decks && deckKey && D.decks[deckKey]) || null;
  const heroJob = $("#heroJob");
  if (heroJob && deck) heroJob.textContent = deck.job;
  const heroTagline = $("#heroTagline");
  if (heroTagline) heroTagline.textContent = D.artist.tagline;
  const heroBio = $("#heroBio");
  if (heroBio) heroBio.textContent = deck ? deck.lede : D.artist.bio;
  const metrics = $("#metrics");
  function metricEl(m) {
    const conf = m.confidence || (m.live ? "live" : "estimate");
    const chip = `<span class="conf ${conf}">${conf}</span>`;
    const src = m.source ? `<div class="metric-src">${chip}${m.source}</div>` : `<div class="metric-src">${chip}</div>`;
    return el("div", "metric" + (m.live ? " live" : ""), `<div class="v">${m.value}</div><div class="l">${m.label}</div>${src}`);
  }
  if (metrics) D.metrics.forEach((m) => metrics.appendChild(metricEl(m)));

  /* ---- catalog ---- */
  const grid = $("#trackGrid");
  const filterWrap = $("#catalogFilters");
  if (grid && filterWrap) {
    const types = ["All", ...new Set(D.catalog.map((t) => t.type))];
    let activeFilter = "All";

    const renderTracks = () => {
      grid.innerHTML = "";
      const list = D.catalog.filter((t) => activeFilter === "All" || t.type === activeFilter);
      list.forEach((t) => {
        const card = el("div", "track");
        card.setAttribute("data-title", t.title);
        card.innerHTML = `
          <div class="top"><div class="track-media"></div><h4>${t.title}</h4><span class="year">${t.year}</span></div>
          <div class="tags">
            <span class="pill type">${t.type}</span>
            <span class="pill">${t.genre}</span>
            <span class="pill mood">${t.mood}</span>
          </div>
          <p class="note">${t.note}</p>`;
        grid.appendChild(card);
      });
    };
    types.forEach((tp) => {
      const chip = el("button", "chip" + (tp === "All" ? " active" : ""), tp);
      chip.addEventListener("click", () => {
        activeFilter = tp;
        filterWrap.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        renderTracks();
      });
      filterWrap.appendChild(chip);
    });
    renderTracks();
  }

  /* ---- genre bars ---- */
  const bars = $("#genreBars");
  if (bars) {
    D.genreMix.forEach((g) => {
      const row = el("div", "bar-row");
      row.innerHTML = `<div class="bl"><span>${g.label}</span><span>${g.value}%</span></div>
        <div class="bar-track"><div class="bar-fill" data-w="${g.value}"></div></div>`;
      bars.appendChild(row);
    });
  }

  /* ---- press ---- */
  const pressList = $("#pressList");
  if (pressList) {
    D.press.forEach((p) => {
      pressList.appendChild(el("div", "press-item", `<p>"${p.quote}"</p><div class="src">— ${p.source}</div>`));
    });
  }

  /* ---- EDM remix potential ---- */
  const remixList = $("#remixList");
  if (remixList) {
    const factorMeta = [
      { key: "hook", cls: "hook", label: "Hook" },
      { key: "dance", cls: "dance", label: "Dance" },
      { key: "dna", cls: "dna", label: "DNA" },
      { key: "drop", cls: "drop", label: "Drop" }
    ];
    D.remixRanking.forEach((r, i) => {
      const row = el("div", "remix-row");
      const factors = factorMeta
        .map(
          (f) => `<div class="mini">
              <div class="mini-track"><div class="mini-fill ${f.cls}" data-w="${r.factors[f.key]}"></div></div>
              <span class="mini-l">${f.label}</span>
            </div>`
        )
        .join("");
      row.innerHTML = `
        <div class="rr-rank">${i + 1}</div>
        <div class="rr-body">
          <div class="rr-head">
            <h4>${r.title}</h4>
            <span class="rr-style">${r.style}</span>
          </div>
          <p class="rr-why">${r.why}</p>
          ${r.sync ? `<p class="rr-sync"><span class="rr-sync-l">Sync</span>${r.sync}</p>` : ""}
          <div class="mini-grid">${factors}</div>
        </div>
        <div class="rr-score"><span class="rr-num">${r.score}</span><span class="rr-max">/100</span></div>`;
      remixList.appendChild(row);
    });
  }

  /* ---- SWOT ---- */
  const swot = $("#swot");
  if (swot) {
    const swotCfg = [
      { key: "strengths", title: "Strengths", dot: "s" },
      { key: "opportunities", title: "Opportunities", dot: "o" },
      { key: "watchouts", title: "Watch-outs", dot: "w" }
    ];
    swotCfg.forEach((c) => {
      const card = el("div", "card");
      const items = D.assessment[c.key].map((i) => `<li>${i}</li>`).join("");
      card.innerHTML = `<h3><span class="dot ${c.dot}"></span>${c.title}</h3><ul>${items}</ul>`;
      swot.appendChild(card);
    });
  }

  /* ---- hashtags ---- */
  const htWrap = $("#hashtagGroups");
  if (htWrap) {
    const allTags = [];
    Object.entries(D.hashtags).forEach(([group, tags]) => {
      allTags.push(...tags);
      const box = el("div", "htg");
      const inner = el("div", "tags-wrap");
      tags.forEach((t) => {
        const tag = el("span", "tag", t);
        tag.addEventListener("click", () => copy(t, `Copied ${t}`));
        inner.appendChild(tag);
      });
      box.appendChild(el("h3", null, group));
      box.appendChild(inner);
      htWrap.appendChild(box);
    });
    const copyAllBtn = $("#copyAll");
    if (copyAllBtn)
      copyAllBtn.addEventListener("click", () =>
        copy(allTags.join(" "), `Copied ${allTags.length} hashtags`)
      );
  }

  /* ---- per-song hashtags ---- */
  const bsTabs = $("#bysongTabs");
  const bsPanel = $("#bysongPanel");
  if (bsTabs && bsPanel) {
    let activeSong = 0;

    const tagChips = (tags) =>
      tags.map((t) => `<span class="tag" data-copy="${t}">${t}</span>`).join("");

    const renderSong = () => {
      const s = D.songHashtags[activeSong];
      const igAll = [...s.igBroad, ...s.igMid, ...s.igNiche];
      const week = (s.weekPlan || [])
        .map((line) => `<li>${line}</li>`)
        .join("");
      const weekBlock = week
        ? `<div class="bs-week">
            <div class="bs-week-h">
              <span class="bs-angle-l">This week's recipe</span>
              ${s.roadmapHook ? `<span class="bs-roadmap">${s.roadmapHook}</span>` : ""}
            </div>
            <ol>${week}</ol>
          </div>`
        : "";
      bsPanel.innerHTML = `
        <div class="bs-angle"><span class="bs-angle-l">Content angle</span><p>${s.angle}</p></div>
        ${weekBlock}
        <div class="bs-cols">
          <div class="bs-card tiktok">
            <div class="bs-ch"><h3>TikTok</h3><button class="mini-copy" data-set="tt">Copy set</button></div>
            <div class="tags-wrap">${tagChips(s.tiktok)}</div>
          </div>
          <div class="bs-card insta">
            <div class="bs-ch"><h3>Instagram</h3><button class="mini-copy" data-set="ig">Copy set</button></div>
            <div class="tier"><span class="tier-l">Broad &gt;500k</span><div class="tags-wrap">${tagChips(s.igBroad)}</div></div>
            <div class="tier"><span class="tier-l">Mid 50–500k</span><div class="tags-wrap">${tagChips(s.igMid)}</div></div>
            <div class="tier"><span class="tier-l">Niche &lt;50k</span><div class="tags-wrap">${tagChips(s.igNiche)}</div></div>
          </div>
        </div>`;

      bsPanel.querySelectorAll(".tag").forEach((t) => {
        t.addEventListener("click", () => {
          const v = t.getAttribute("data-copy");
          copy(v, `Copied ${v}`);
        });
      });
      bsPanel.querySelector('[data-set="tt"]').addEventListener("click", () =>
        copy(s.tiktok.join(" "), `Copied ${s.tiktok.length} TikTok tags`)
      );
      bsPanel.querySelector('[data-set="ig"]').addEventListener("click", () =>
        copy(igAll.join(" "), `Copied ${igAll.length} Instagram tags`)
      );
    };

    D.songHashtags.forEach((s, i) => {
      const tab = el("button", "bs-tab" + (i === 0 ? " active" : ""), s.title);
      tab.addEventListener("click", () => {
        activeSong = i;
        bsTabs.querySelectorAll(".bs-tab").forEach((b) => b.classList.remove("active"));
        tab.classList.add("active");
        renderSong();
      });
      bsTabs.appendChild(tab);
    });
    renderSong();
  }

  /* ---- daily content calendar ---- */
  (function initCalendar() {
    const shell = $("#calendarShell");
    const cal = D.contentCalendar;
    if (!shell || !cal || !cal.days) return;

    const songs = D.songHashtags || [];
    let songIdx = 0;
    let filter = "all";

    const STORE_KEY = "tinsley.calendar.week.v1";
    const dowKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    function isoWeekId(d) {
      const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      const dayNum = date.getUTCDay() || 7;
      date.setUTCDate(date.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
      const week = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
      return date.getUTCFullYear() + "-W" + String(week).padStart(2, "0");
    }

    const weekId = isoWeekId(new Date());
    const todayKey = dowKeys[new Date().getDay()];

    let store = { week: weekId, done: {}, skipped: {}, song: 0 };
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY));
      if (raw && raw.week === weekId) {
        store = { week: weekId, done: raw.done || {}, skipped: raw.skipped || {}, song: raw.song || 0 };
      }
    } catch (e) { /* fresh week */ }

    /* Restore from share link ?c= */
    try {
      const shared = new URLSearchParams(location.search).get("c");
      if (shared) {
        const decoded = decodeCalShare(shared);
        if (decoded) {
          store.done = decoded.done;
          store.skipped = decoded.skipped;
          store.song = decoded.song;
          store.week = weekId;
        }
      }
    } catch (e) {}

    if (typeof store.song === "number" && store.song >= 0 && store.song < songs.length) {
      songIdx = store.song;
    }
    const save = () => {
      store.week = weekId;
      store.song = songIdx;
      try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) {}
    };

    const stripBeatPrefix = (line) =>
      String(line || "").replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s*[—–-]\s*/i, "");

    const slotIdea = (day, slot) => {
      if (typeof day.songBeat === "number" && songs[songIdx]) {
        const beat = (songs[songIdx].weekPlan || [])[day.songBeat];
        if (beat && slot.kind === "publish" && slot.platform === "TikTok") {
          return stripBeatPrefix(beat);
        }
      }
      return slot.idea;
    };

    const slotId = (dayKey, si) => dayKey + ":" + si;

    const allSlots = () => {
      const list = [];
      cal.days.forEach((day) => {
        day.slots.forEach((slot, si) => {
          list.push({ day, slot, si, id: slotId(day.key, si) });
        });
      });
      return list;
    };

    function encodeCalShare() {
      const slots = allSlots();
      const bytes = [];
      for (let i = 0; i < slots.length; i += 8) {
        let b = 0;
        for (let j = 0; j < 8; j++) if (slots[i + j] && store.done[slots[i + j].id]) b |= 1 << (7 - j);
        bytes.push(b);
      }
      let skipByte = 0;
      cal.days.forEach((day, i) => {
        if (store.skipped[day.key]) skipByte |= 1 << i;
      });
      bytes.push(skipByte, songIdx & 255);
      let bin = "";
      bytes.forEach((b) => (bin += String.fromCharCode(b)));
      return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }

    function decodeCalShare(str) {
      try {
        let b = str.replace(/-/g, "+").replace(/_/g, "/");
        while (b.length % 4) b += "=";
        const bin = atob(b);
        const slots = allSlots();
        const done = {};
        for (let i = 0; i < slots.length; i++) {
          const byte = bin.charCodeAt(i >> 3) || 0;
          if (byte & (1 << (7 - (i % 8)))) done[slots[i].id] = true;
        }
        const skipIdx = Math.ceil(slots.length / 8);
        const skipByte = bin.charCodeAt(skipIdx) || 0;
        const skipped = {};
        cal.days.forEach((day, i) => {
          if (skipByte & (1 << i)) skipped[day.key] = true;
        });
        const song = bin.charCodeAt(skipIdx + 1) || 0;
        return { done, skipped, song: Math.min(song, Math.max(0, songs.length - 1)) };
      } catch (e) {
        return null;
      }
    }

    const platforms = ["all", ...new Set(cal.days.flatMap((d) => d.slots.map((s) => s.platform)))];

    const roleLabel = {
      publish: "Publish",
      create: "Create",
      amplify: "Amplify",
      community: "Community",
      bank: "Bank"
    };

    function weekPlanText() {
      const song = songs[songIdx];
      const lines = ["Tinsley · Daily Content Calendar · " + weekId];
      if (song) lines.push("Featured song: " + song.title);
      lines.push(cal.cadence, "");
      cal.days.forEach((day) => {
        const skip = !!store.skipped[day.key];
        lines.push(day.label + " — " + day.focus + (skip ? " [SKIPPED]" : ""));
        day.slots.forEach((slot, si) => {
          const id = slotId(day.key, si);
          const mark = store.done[id] || skip ? "✓" : "○";
          lines.push("  " + mark + " [" + slot.platform + " / " + slot.format + "] " + slotIdea(day, slot));
        });
        lines.push("");
      });
      return lines.join("\n").trim();
    }

    function weekReviewText() {
      const song = songs[songIdx];
      const slots = allSlots();
      const doneCount = slots.filter((s) => store.done[s.id] || store.skipped[s.day.key]).length;
      const skippedDays = cal.days.filter((d) => store.skipped[d.key]).map((d) => d.label);
      const remaining = slots.filter((s) => !store.done[s.id] && !store.skipped[s.day.key]);
      const lines = [
        "TINSLEY · WEEK IN REVIEW · " + weekId,
        song ? "Featured song: " + song.title : "",
        "Progress: " + doneCount + "/" + slots.length + " slots (" + (slots.length ? Math.round((doneCount / slots.length) * 100) : 0) + "%)",
        skippedDays.length ? "Skipped days: " + skippedDays.join(", ") : "Skipped days: none",
        "",
        "Shipped / complete:"
      ];
      slots.filter((s) => store.done[s.id] || store.skipped[s.day.key]).forEach((s) => {
        lines.push("  ✓ " + s.day.label + " · " + s.slot.platform + " — " + slotIdea(s.day, s.slot) + (store.skipped[s.day.key] && !store.done[s.id] ? " (day skipped)" : ""));
      });
      lines.push("", "Still open:");
      if (!remaining.length) lines.push("  (none — week complete)");
      remaining.forEach((s) => {
        lines.push("  ○ " + s.day.label + " · " + s.slot.platform + " — " + slotIdea(s.day, s.slot));
      });
      return lines.filter((l, i) => l !== "" || i === 0).join("\n");
    }

    function downloadBlob(filename, text) {
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }

    function render() {
      const song = songs[songIdx];
      const slots = allSlots();
      const effectiveDone = slots.filter((s) => store.done[s.id] || store.skipped[s.day.key]).length;
      const pct = slots.length ? Math.round((effectiveDone / slots.length) * 100) : 0;

      const songTabs = songs
        .map((s, i) =>
          `<button type="button" class="cal-song${i === songIdx ? " active" : ""}" data-song="${i}">${s.title}</button>`
        )
        .join("");

      const filters = platforms
        .map((p) =>
          `<button type="button" class="cal-filter${filter === p ? " active" : ""}" data-filter="${p}">${p === "all" ? "All platforms" : p}</button>`
        )
        .join("");

      const daysHtml = cal.days
        .map((day) => {
          const isToday = day.key === todayKey;
          const skipped = !!store.skipped[day.key];
          const daySlots = day.slots
            .map((slot, si) => {
              if (filter !== "all" && slot.platform !== filter) return "";
              const id = slotId(day.key, si);
              const checked = !!store.done[id] || skipped;
              return `<li class="cal-slot${checked ? " done" : ""}${skipped ? " skipped" : ""}" data-id="${id}">
                <button type="button" class="cal-check" aria-pressed="${checked}" aria-label="Mark done: ${slot.platform} on ${day.label}" ${skipped ? "disabled" : ""}></button>
                <div class="cal-slot-body">
                  <div class="cal-slot-meta">
                    <span class="cal-plat">${slot.platform}</span>
                    <span class="cal-fmt">${slot.format}</span>
                    <span class="cal-kind ${slot.kind}">${slot.kind}</span>
                  </div>
                  <p>${slotIdea(day, slot)}</p>
                </div>
              </li>`;
            })
            .join("");

          if (filter !== "all" && !daySlots) return "";

          return `<article class="cal-day role-${day.role}${isToday ? " today" : ""}${skipped ? " skipped" : ""}" data-day="${day.key}">
            <header class="cal-day-h">
              <div>
                <span class="cal-dow">${day.label}${isToday ? " · Today" : ""}${skipped ? " · Skipped" : ""}</span>
                <span class="cal-role">${roleLabel[day.role] || day.role}</span>
              </div>
              <p class="cal-focus">${day.focus}</p>
              <button type="button" class="cal-skip-day" data-day="${day.key}" aria-pressed="${skipped}">${skipped ? "Unskip day" : "Skip day"}</button>
            </header>
            <ul class="cal-slots">${daySlots || `<li class="cal-empty">No ${filter} slots today</li>`}</ul>
          </article>`;
        })
        .join("");

      shell.innerHTML = `
        <div class="cal-intro">
          <div class="cal-intro-copy">
            <p class="cal-principle">${cal.principle}</p>
            <p class="cal-cadence">${cal.cadence}</p>
            ${cal.roadmapHook ? `<span class="bs-roadmap">${cal.roadmapHook}</span>` : ""}
          </div>
          <div class="cal-progress">
            <div class="cal-ring" style="--p:${pct}">
              <span class="cal-ring-pct">${pct}%</span>
            </div>
            <div>
              <strong>${effectiveDone}/${slots.length}</strong> slots this week
              <div class="cal-week-id">${weekId}</div>
            </div>
          </div>
        </div>
        ${song ? `<div class="cal-featured">
          <span class="bs-angle-l">Featured song this week</span>
          <p class="cal-angle">${song.angle}</p>
          <div class="cal-songs">${songTabs}</div>
        </div>` : ""}
        <div class="cal-toolbar">
          <div class="cal-filters">${filters}</div>
          <div class="cal-actions">
            <button type="button" class="btn btn-primary" id="calReview">Copy week review</button>
            <button type="button" class="btn" id="calShare">Copy share link</button>
            <button type="button" class="btn" id="calDownload">Download .txt</button>
            <button type="button" class="btn" id="calCopy">Copy plan</button>
            <button type="button" class="btn" id="calReset">Reset week</button>
          </div>
        </div>
        <div class="cal-grid">${daysHtml}</div>`;

      shell.querySelectorAll(".cal-song").forEach((btn) => {
        btn.addEventListener("click", () => {
          songIdx = +btn.getAttribute("data-song");
          save();
          render();
        });
      });
      shell.querySelectorAll(".cal-filter").forEach((btn) => {
        btn.addEventListener("click", () => {
          filter = btn.getAttribute("data-filter");
          render();
        });
      });
      shell.querySelectorAll(".cal-check").forEach((btn) => {
        btn.addEventListener("click", () => {
          const li = btn.closest(".cal-slot");
          const id = li.getAttribute("data-id");
          if (store.done[id]) delete store.done[id];
          else store.done[id] = true;
          save();
          render();
        });
      });
      shell.querySelectorAll(".cal-skip-day").forEach((btn) => {
        btn.addEventListener("click", () => {
          const key = btn.getAttribute("data-day");
          if (store.skipped[key]) delete store.skipped[key];
          else store.skipped[key] = true;
          save();
          render();
        });
      });
      const copyBtn = shell.querySelector("#calCopy");
      if (copyBtn) copyBtn.addEventListener("click", () => copy(weekPlanText(), "Copied this week's plan"));
      const reviewBtn = shell.querySelector("#calReview");
      if (reviewBtn) reviewBtn.addEventListener("click", () => copy(weekReviewText(), "Copied week in review"));
      const shareBtn = shell.querySelector("#calShare");
      if (shareBtn) {
        shareBtn.addEventListener("click", () => {
          const url = location.origin + location.pathname + "?c=" + encodeCalShare() + "#calendar";
          copy(url, "Calendar share link copied");
        });
      }
      const dlBtn = shell.querySelector("#calDownload");
      if (dlBtn) {
        dlBtn.addEventListener("click", () => {
          downloadBlob("tinsley-week-review-" + weekId + ".txt", weekReviewText());
          showToast("Downloaded week review");
        });
      }
      const resetBtn = shell.querySelector("#calReset");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          store.done = {};
          store.skipped = {};
          save();
          render();
          showToast("Week checkoffs cleared");
        });
      }
    }

    render();
  })();

  /* ---- social ---- */
  const social = $("#socialGrid");
  if (social) {
    D.social.forEach((s) => {
      const card = el("div", "social-card");
      const prioClass = s.priority.replace(/[^A-Za-z]/g, "") || "Medium";
      const plays = s.plays.map((p) => `<li>${p}</li>`).join("");
      card.innerHTML = `
        <div class="sh"><h3>${s.platform}</h3><span class="prio ${prioClass}">${s.priority}</span></div>
        <div class="handle">${s.handle}</div>
        <p class="why">${s.why}</p>
        <ul>${plays}</ul>`;
      social.appendChild(card);
    });
  }

  /* ---- like artists ---- */
  const ag = $("#artistGrid");
  if (ag) {
    D.likeArtists.forEach((a) => {
      const card = el("div", "artist");
      card.innerHTML = `
        <div class="ah"><h3>${a.name}</h3><span class="match-num">${a.match}%</span></div>
        <div class="tag-line">${a.tag}</div>
        <p class="why">${a.why}</p>
        <div class="match-track"><div class="match-fill" data-w="${a.match}"></div></div>`;
      ag.appendChild(card);
    });
  }

  /* ---- roadmap (30 → 720 day growth timeline) + milestone tracker ---- */
  (function initRoadmap() {
    const rm = $("#roadmapGrid");
    if (!rm) return;
    const trackerEl = $("#rmTracker");

    const STORE_KEY = "tinsley.roadmap.progress.v1";
    const trackMeta = [
      { key: "reach", label: "Reach" },
      { key: "revenue", label: "Revenue" },
      { key: "product", label: "Product" },
      { key: "foundation", label: "Foundation" }
    ];

    const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const idFor = (p, it) => `r_${slug(p.window)}__${slug(it.lever)}`;

    let done = {};
    try { done = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { done = {}; }
    const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(done)); } catch (e) {} };
    const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);

    const all = [];
    D.roadmap.forEach((p) =>
      p.items.forEach((it) =>
        all.push({ id: idFor(p, it), track: it.track, window: p.window, lever: it.lever, text: it.text })
      )
    );

    /* render horizons */
    D.roadmap.forEach((p, pi) => {
      const items = p.items
        .map((it) => {
          const id = idFor(p, it);
          return `<li class="rm-item" data-id="${id}" data-track="${it.track}">
            <button type="button" class="rm-check" aria-pressed="false" aria-label="Toggle: ${it.lever} — ${p.window}"></button>
            <span class="lever ${it.track}">${it.lever}</span>
            <span class="lever-text">${it.text}</span>
          </li>`;
        })
        .join("");
      const phase = el("div", "rm-phase");
      phase.innerHTML = `
        <div class="rm-rail">
          <span class="rm-dot"></span>
          <span class="rm-window">${p.window}</span>
        </div>
        <div class="rm-body" data-phase="${pi}">
          <div class="rm-head">
            <div class="rm-head-top"><h3>${p.phase}</h3><span class="rm-count" data-phase="${pi}"></span></div>
            <p class="rm-focus">${p.focus}</p>
            <div class="rm-bar"><span class="rm-bar-fill" data-phase="${pi}"></span></div>
          </div>
          <ul class="rm-items">${items}</ul>
        </div>`;
      rm.appendChild(phase);
    });

    /* restore shared progress from URL (?p=...) */
    function bitEncode() {
      const bytes = [];
      for (let i = 0; i < all.length; i += 8) {
        let b = 0;
        for (let j = 0; j < 8; j++) if (all[i + j] && done[all[i + j].id]) b |= 1 << (7 - j);
        bytes.push(b);
      }
      let bin = "";
      bytes.forEach((b) => (bin += String.fromCharCode(b)));
      return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }
    function bitDecode(str) {
      try {
        let b = str.replace(/-/g, "+").replace(/_/g, "/");
        while (b.length % 4) b += "=";
        const bin = atob(b);
        const map = {};
        for (let i = 0; i < all.length; i++) {
          const byte = bin.charCodeAt(i >> 3) || 0;
          if (byte & (1 << (7 - (i % 8)))) map[all[i].id] = true;
        }
        return map;
      } catch (e) { return null; }
    }
    try {
      const shared = new URLSearchParams(location.search).get("p");
      if (shared) {
        const decoded = bitDecode(shared);
        if (decoded) { done = decoded; save(); }
      }
    } catch (e) {}

    /* render tracker summary */
    if (trackerEl) {
      trackerEl.innerHTML = `
        <div class="rm-tracker-head">
          <div>
            <h3>Milestone tracker</h3>
            <p class="rm-tracker-sub">Check off each action as it ships — progress saves to this browser.</p>
          </div>
          <div class="rm-tracker-actions">
            <button type="button" class="rm-btn" id="rmShare">Copy progress link</button>
            <button type="button" class="rm-reset" id="rmReset">Reset</button>
          </div>
        </div>
        <div class="rm-tracker-main">
          <div class="rm-ring" id="rmRing">
            <span class="rm-ring-pct" id="rmRingPct">0%</span>
            <span class="rm-ring-l">complete</span>
          </div>
          <div class="rm-tracker-meta">
            <div class="rm-total" id="rmTotal"></div>
            <div class="rm-tracks" id="rmTracks"></div>
          </div>
        </div>
        <div class="rm-next" id="rmNext"></div>
        <div class="rm-filter" id="rmFilter"></div>`;

      const filterEl = $("#rmFilter");
      const chips = [{ key: "all", label: "All" }].concat(trackMeta);
      filterEl.innerHTML = chips
        .map((c, i) => `<button type="button" class="rm-chip${i === 0 ? " active" : ""}" data-track="${c.key}">${c.label}</button>`)
        .join("");
      filterEl.addEventListener("click", (e) => {
        const chip = e.target.closest(".rm-chip");
        if (!chip) return;
        activeFilter = chip.getAttribute("data-track");
        filterEl.querySelectorAll(".rm-chip").forEach((c) => c.classList.toggle("active", c === chip));
        applyFilter();
      });
    }

    let activeFilter = "all";
    function applyFilter() {
      rm.querySelectorAll(".rm-item").forEach((li) => {
        const t = li.getAttribute("data-track");
        li.classList.toggle("dimmed", activeFilter !== "all" && t !== activeFilter);
      });
    }

    function update() {
      D.roadmap.forEach((p, pi) => {
        const ids = p.items.map((it) => idFor(p, it));
        const d = ids.filter((id) => done[id]).length;
        const countEl = rm.querySelector(`.rm-count[data-phase="${pi}"]`);
        const fillEl = rm.querySelector(`.rm-bar-fill[data-phase="${pi}"]`);
        const body = rm.querySelector(`.rm-body[data-phase="${pi}"]`);
        if (countEl) countEl.textContent = `${d}/${ids.length}`;
        if (fillEl) fillEl.style.width = pct(d, ids.length) + "%";
        if (body) body.classList.toggle("complete", ids.length > 0 && d === ids.length);
      });
      rm.querySelectorAll(".rm-item").forEach((li) => {
        const on = !!done[li.getAttribute("data-id")];
        li.classList.toggle("done", on);
        const btn = li.querySelector(".rm-check");
        if (btn) btn.setAttribute("aria-pressed", on ? "true" : "false");
      });
      const total = all.length;
      const d = all.filter((x) => done[x.id]).length;
      const overall = pct(d, total);
      const ring = $("#rmRing"), ringPct = $("#rmRingPct"), totalEl = $("#rmTotal"), tracksEl = $("#rmTracks");
      if (ringPct) ringPct.textContent = overall + "%";
      if (ring) ring.style.setProperty("--p", overall);
      if (totalEl) totalEl.innerHTML = `<b>${d}</b> of <b>${total}</b> actions complete`;
      if (tracksEl) {
        tracksEl.innerHTML = trackMeta
          .map((t) => {
            const items = all.filter((x) => x.track === t.key);
            const dd = items.filter((x) => done[x.id]).length;
            return `<div class="rm-track-row">
              <span class="rm-track-l"><i class="rm-sw ${t.key}"></i>${t.label}</span>
              <div class="rm-track-bar"><span class="rm-track-fill ${t.key}" style="width:${pct(dd, items.length)}%"></span></div>
              <span class="rm-track-n">${dd}/${items.length}</span>
            </div>`;
          })
          .join("");
      }
      const nextEl = $("#rmNext");
      if (nextEl) {
        const next = all.filter((x) => !done[x.id]).slice(0, 3);
        nextEl.innerHTML = next.length
          ? `<span class="rm-next-l">Do next</span>` +
            next
              .map(
                (x) =>
                  `<div class="rm-next-item" data-id="${x.id}"><span class="rm-next-check"></span><span class="lever ${x.track}">${x.lever}</span><span class="rm-next-text">${x.text}</span><span class="rm-next-win">${x.window}</span></div>`
              )
              .join("")
          : `<span class="rm-next-l done">All actions complete — time to expand the roadmap.</span>`;
      }
      applyFilter();
    }

    rm.addEventListener("click", (e) => {
      const li = e.target.closest(".rm-item");
      if (!li) return;
      const id = li.getAttribute("data-id");
      if (done[id]) delete done[id]; else done[id] = true;
      save();
      update();
    });
    if (trackerEl) {
      trackerEl.addEventListener("click", (e) => {
        const ni = e.target.closest(".rm-next-item");
        if (!ni) return;
        done[ni.getAttribute("data-id")] = true;
        save();
        update();
      });
    }
    const resetBtn = $("#rmReset");
    if (resetBtn) resetBtn.addEventListener("click", () => { done = {}; save(); update(); });
    const shareBtn = $("#rmShare");
    if (shareBtn)
      shareBtn.addEventListener("click", () => {
        const url = location.origin + location.pathname + "?p=" + bitEncode();
        copy(url, "Progress link copied");
      });

    update();
  })();

  /* True Fans (Kevin Kelly) & The Creative Act (Rick Rubin) now live on their
     own page — see reference.html + assets/reference.js. */

  /* ---- shared formatting helpers ---- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  const nfInt = (n) => Math.round(n).toLocaleString("en-US");
  const nfCompact = (n) =>
    n >= 1e6 ? (n / 1e6).toFixed(n >= 1e7 ? 0 : 1) + "M" : n >= 1e3 ? (Math.round(n / 100) / 10).toFixed(1).replace(/\.0$/, "") + "K" : String(Math.round(n));

  /* ---- provenance: last-updated badge + methodology block ---- */
  (function provenance() {
    if (!D.meta) return;
    const badge = $("#updatedBadge");
    if (badge && D.meta.updated) {
      const updated = D.meta.updated;
      let ageNote = "";
      let stale = false;
      try {
        const then = new Date(updated + "T12:00:00");
        const days = Math.floor((Date.now() - then.getTime()) / 86400000);
        if (!isNaN(days)) {
          if (days <= 0) ageNote = " · updated today";
          else if (days === 1) ageNote = " · 1 day ago";
          else ageNote = " · " + days + " days ago";
          stale = days > 30;
        }
      } catch (e) {}
      badge.innerHTML = `<span class="fresh-deck">Deck data · ${esc(updated)}${esc(ageNote)}</span><span class="fresh-live" id="freshLive">Spotify · checking…</span>`;
      if (stale) badge.classList.add("stale");
    }
    const meth = $("#methodology");
    if (meth) {
      const sources = (D.meta.sources || [])
        .map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)}${s.kind ? ` <em>(${esc(s.kind)})</em>` : ""}</a>`)
        .join("");
      meth.innerHTML = `<h3>Methodology &amp; sources</h3><p class="meth-body">${esc(D.meta.methodology || "")}</p><div class="meth-sources">${sources}</div>`;
    }
  })();

  /* ---- live Spotify hydration (cache + visible failure) ---- */
  (function live() {
    const liveChip = () => $("#freshLive");
    const CACHE_KEY = "tinsley.spotify.cache.v1";
    const applyPayload = (d, fromCache) => {
      if (!d || !d.artist) return false;
      const a = d.artist;
      const liveMetrics = [];
      if (a.popularity != null) liveMetrics.push({ value: a.popularity + "/100", label: "Spotify popularity", live: true, confidence: "live", source: fromCache ? "Cached Spotify" : "Spotify Web API" });
      if (a.followers != null) liveMetrics.push({ value: nfCompact(a.followers), label: "Spotify followers", live: true, confidence: "live", source: fromCache ? "Cached Spotify" : "Spotify Web API" });
      if (metrics) {
        metrics.querySelectorAll(".metric.live").forEach((n) => n.remove());
        liveMetrics.forEach((m) => metrics.insertBefore(metricEl(m), metrics.firstChild));
      }
      const artMap = d.albumArt || {};
      document.querySelectorAll(".track[data-title]").forEach((card) => {
        const title = card.getAttribute("data-title").toLowerCase();
        let url = artMap[title];
        if (!url) {
          const base = title.split(" (")[0];
          const key = Object.keys(artMap).find((k) => k.startsWith(base) || base.startsWith(k));
          if (key) url = artMap[key];
        }
        const media = card.querySelector(".track-media");
        if (url && media) media.innerHTML = `<img src="${url}" alt="" loading="lazy" />`;
      });
      const badge = $("#updatedBadge");
      const chip = liveChip();
      if (chip && d.updatedAt) {
        const when = new Date(d.updatedAt).toLocaleString();
        chip.textContent = (fromCache ? "Spotify cached · " : "Spotify live · ") + when;
        chip.classList.add("on");
        chip.classList.toggle("cached", !!fromCache);
      }
      if (badge) badge.classList.add("islive");
      return true;
    };

    const fail = (reason) => {
      let cached = null;
      try { cached = JSON.parse(sessionStorage.getItem(CACHE_KEY)); } catch (e) {}
      if (cached && cached.artist && applyPayload(cached, true)) {
        const chip = liveChip();
        if (chip) {
          chip.title = reason || "Using last successful fetch";
          chip.classList.add("cached");
        }
        return;
      }
      const chip = liveChip();
      if (chip) {
        const label =
          reason === "missing_credentials"
            ? "Spotify · not configured"
            : reason
              ? "Spotify · offline (" + reason.replace(/_/g, " ") + ")"
              : "Spotify · offline";
        chip.textContent = label;
        chip.classList.add("off");
        chip.title = "Live metrics unavailable — curated deck data still works.";
      }
    };

    fetch("/api/spotify", { headers: { accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d || d.error || !d.artist) {
          fail(d && d.reason);
          return;
        }
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(d)); } catch (e) {}
        applyPayload(d, !!d.stale);
        // Auto-sync Spotify followers into north-star store when live data arrives.
        if (d.artist && d.artist.followers != null) {
          try {
            const KEY = "tinsley.northstar.v1";
            const store = JSON.parse(localStorage.getItem(KEY) || "{}") || {};
            const rec = store.followers || {};
            const v = Math.round(d.artist.followers);
            if (rec.current !== v) {
              rec.current = v;
              rec.history = (rec.history || []).concat([{ t: Date.now(), v: v }]).slice(-24);
              store.followers = rec;
              localStorage.setItem(KEY, JSON.stringify(store));
            }
          } catch (e) {}
        }
      })
      .catch(() => fail("network"));
  })();

  /* ---- SVG analytics charts ---- */
  (function charts() {
    const svg = (inner, w, h, label) =>
      `<svg viewBox="0 0 ${w} ${h}" class="viz-svg" role="img" aria-label="${esc(label)}" preserveAspectRatio="xMidYMid meet">${inner}</svg>`;

    /* release cadence timeline */
    (function timeline() {
      const wrap = $("#catalogTimeline");
      if (!wrap) return;
      const items = D.catalog.filter((t) => t.year);
      const years = items.map((t) => t.year);
      const minY = Math.min(...years), maxY = Math.max(...years);
      const W = 1000, H = 210, padX = 40, padB = 42, padT = 26;
      const span = Math.max(1, maxY - minY);
      const x = (y) => padX + ((y - minY) / span) * (W - padX * 2);
      const typeColor = { Album: "#ff6f91", EP: "#b98cff", Single: "#ffb27a", Demos: "#7ce0c3" };
      const byYear = {};
      items.forEach((t) => (byYear[t.year] = byYear[t.year] || []).push(t));
      let dots = "";
      Object.keys(byYear).forEach((yr) => {
        byYear[yr].forEach((t, idx) => {
          const cx = x(+yr), cy = H - padB - idx * 22 - 12;
          dots += `<circle class="viz-dot" cx="${cx}" cy="${cy}" r="6.5" fill="${typeColor[t.type] || "#a99fb5"}"><title>${esc(t.title)} · ${t.year} · ${t.type}</title></circle>`;
        });
      });
      let axis = `<line x1="${padX}" y1="${H - padB}" x2="${W - padX}" y2="${H - padB}" stroke="rgba(255,255,255,.14)"/>`;
      for (let yr = minY; yr <= maxY; yr++) {
        const cx = x(yr);
        axis += `<line x1="${cx}" y1="${H - padB}" x2="${cx}" y2="${H - padB + 5}" stroke="rgba(255,255,255,.2)"/>`;
        axis += `<text x="${cx}" y="${H - padB + 20}" text-anchor="middle" class="viz-axl">${yr}</text>`;
      }
      wrap.innerHTML = svg(axis + dots, W, H, `Release cadence from ${minY} to ${maxY}`);
    })();

    /* remix score distribution */
    (function dist() {
      const wrap = $("#remixDist");
      if (!wrap) return;
      const buckets = [[30, 39], [40, 49], [50, 59], [60, 69], [70, 79], [80, 89], [90, 100]];
      const counts = buckets.map(([lo, hi]) => D.remixRanking.filter((r) => r.score >= lo && r.score <= hi).length);
      const max = Math.max.apply(null, counts.concat([1]));
      const W = 1000, H = 220, padX = 44, padB = 42, padT = 24;
      const bw = (W - padX * 2) / buckets.length;
      let bars = "";
      buckets.forEach(([lo, hi], i) => {
        const c = counts[i], h = (H - padB - padT) * (c / max), bx = padX + i * bw + 9, by = H - padB - h;
        bars += `<rect class="viz-bar" x="${bx}" y="${by}" width="${bw - 18}" height="${Math.max(h, 0)}" rx="6"><title>Score ${lo}–${hi}: ${c} track(s)</title></rect>`;
        if (c) bars += `<text x="${bx + (bw - 18) / 2}" y="${by - 7}" text-anchor="middle" class="viz-barn">${c}</text>`;
        bars += `<text x="${bx + (bw - 18) / 2}" y="${H - padB + 20}" text-anchor="middle" class="viz-axl">${lo}+</text>`;
      });
      const axis = `<line x1="${padX}" y1="${H - padB}" x2="${W - padX}" y2="${H - padB}" stroke="rgba(255,255,255,.14)"/>`;
      wrap.innerHTML = svg(axis + bars, W, H, "Distribution of EDM remix scores");
    })();

    /* like-artist positioning map */
    (function positionMap() {
      const wrap = $("#artistMap");
      if (!wrap) return;
      const W = 1000, H = 520, padL = 62, padR = 30, padT = 30, padB = 58;
      const xmin = 70, xmax = 100, ymin = 0, ymax = 100;
      const px = (m) => padL + ((Math.max(xmin, Math.min(xmax, m)) - xmin) / (xmax - xmin)) * (W - padL - padR);
      const py = (r) => H - padB - ((Math.max(ymin, Math.min(ymax, r)) - ymin) / (ymax - ymin)) * (H - padT - padB);
      const midX = px(85), midY = py(50);
      let g = `<rect x="${padL}" y="${padT}" width="${W - padL - padR}" height="${H - padT - padB}" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.08)"/>`;
      g += `<line x1="${midX}" y1="${padT}" x2="${midX}" y2="${H - padB}" stroke="rgba(255,255,255,.08)" stroke-dasharray="4 5"/>`;
      g += `<line x1="${padL}" y1="${midY}" x2="${W - padR}" y2="${midY}" stroke="rgba(255,255,255,.08)" stroke-dasharray="4 5"/>`;
      g += `<text x="${(padL + W - padR) / 2}" y="${H - 14}" text-anchor="middle" class="viz-axl">Fan overlap / similarity &#8594;</text>`;
      g += `<text x="16" y="${(padT + H - padB) / 2}" text-anchor="middle" class="viz-axl" transform="rotate(-90 16 ${(padT + H - padB) / 2})">Reachability &#8594;</text>`;
      g += `<text x="${W - padR - 8}" y="${padT + 18}" text-anchor="end" class="viz-quad">Best targets</text>`;
      let pts = "";
      D.likeArtists.forEach((a) => {
        const cx = px(a.match), cy = py(a.reach != null ? a.reach : 50);
        pts += `<circle class="viz-bubble" cx="${cx}" cy="${cy}" r="8"><title>${esc(a.name)} — ${a.match}% overlap · reachability ${a.reach}</title></circle>`;
        pts += `<text x="${cx + 12}" y="${cy + 4}" class="viz-lbl">${esc(a.name)}</text>`;
      });
      wrap.innerHTML = svg(g + pts, W, H, "Like-artist positioning: fan overlap versus reachability");
    })();
  })();

  /* ---- north-star metric tracker (editable, saved, with trend + stale flag) ---- */
  (function northStar() {
    const wrap = $("#northStars");
    if (!wrap || !D.northStars) return;
    const KEY = "tinsley.northstar.v1";
    const STALE_MS = 14 * 86400000;
    let store = {};
    try { store = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { store = {}; }
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} };
    const fmt = (v, f) => (f === "usd" ? "$" + nfInt(v) : nfInt(v));
    const cur = (m) => (store[m.key] && store[m.key].current != null ? store[m.key].current : m.current);
    const hist = (m) => (store[m.key] && store[m.key].history) || [];
    const lastTouch = (m) => {
      const h = hist(m);
      return h.length ? h[h.length - 1].t : null;
    };
    const isStale = (m) => {
      const t = lastTouch(m);
      if (t == null) return true;
      return Date.now() - t > STALE_MS;
    };
    const staleLabel = (m) => {
      const t = lastTouch(m);
      if (t == null) return "Never updated";
      const days = Math.floor((Date.now() - t) / 86400000);
      return days === 1 ? "1 day stale" : days + " days stale";
    };

    function spark(h) {
      if (!h || h.length < 2) return `<span class="ns-nohist">Update to log a trend</span>`;
      const vals = h.map((p) => p.v), min = Math.min(...vals), max = Math.max(...vals), span = Math.max(1, max - min);
      const W = 116, H = 28, pad = 3, step = (W - pad * 2) / (h.length - 1);
      const pts = h.map((p, i) => `${(pad + i * step).toFixed(1)},${(H - pad - ((p.v - min) / span) * (H - pad * 2)).toFixed(1)}`).join(" ");
      const up = vals[vals.length - 1] >= vals[0];
      return `<svg viewBox="0 0 ${W} ${H}" class="ns-spark ${up ? "up" : "down"}" preserveAspectRatio="none"><polyline points="${pts}" fill="none" stroke-width="2"/></svg>`;
    }

    function render() {
      const staleCount = D.northStars.filter(isStale).length;
      const banner = staleCount
        ? `<div class="ns-stale-banner" role="status">${staleCount} north-star metric${staleCount === 1 ? "" : "s"} need${staleCount === 1 ? "s" : ""} a refresh (no edit in 14+ days). Update the number to log a trend.</div>`
        : `<div class="ns-fresh-banner" role="status">All north-stars touched within the last 14 days.</div>`;

      wrap.innerHTML = banner + D.northStars
        .map((m) => {
          const c = cur(m), p = Math.min(100, Math.round((c / m.target) * 100));
          const stale = isStale(m);
          return `<div class="ns-card${stale ? " stale" : ""}" data-key="${m.key}">
            <div class="ns-top">
              <span class="ns-label">${esc(m.label)}</span>
              <span class="ns-pct ${m.track}">${p}%</span>
            </div>
            ${stale ? `<span class="ns-stale-chip">${esc(staleLabel(m))}</span>` : ""}
            <div class="ns-nums"><input class="ns-input" type="number" inputmode="numeric" min="0" value="${c}" aria-label="Current ${esc(m.label)}" /><span class="ns-target">/ ${fmt(m.target, m.fmt)}</span></div>
            <div class="ns-bar"><span class="ns-fill ${m.track}" style="width:${p}%"></span></div>
            <div class="ns-foot"><span class="ns-note">${esc(m.note || "")}</span>${spark(hist(m))}</div>
          </div>`;
        })
        .join("");
      wrap.querySelectorAll(".ns-card").forEach((card) => {
        const key = card.getAttribute("data-key");
        const input = card.querySelector(".ns-input");
        input.addEventListener("change", () => {
          const v = Math.max(0, Math.round(+input.value || 0));
          const rec = store[key] || {};
          rec.current = v;
          rec.history = (rec.history || []).concat([{ t: Date.now(), v: v }]).slice(-24);
          store[key] = rec;
          save();
          render();
        });
      });
    }
    render();
  })();

  /* The full income / scenario model moved to the Reference page with the
     1,000 True Fans framework — see assets/reference.js. */

  /* ---- copy helper + toast ---- */
  const toast = $("#toast");
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  }
  function copy(text, msg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast(msg)).catch(() => fallbackCopy(text, msg));
    } else {
      fallbackCopy(text, msg);
    }
  }
  function fallbackCopy(text, msg) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); showToast(msg); } catch (e) { showToast("Copy failed"); }
    document.body.removeChild(ta);
  }

  /* ---- Pitch kit: remix/sync one-pager + Start Here + EPK cold-email block ---- */
  (function pitchKit() {
    const wrap = $("#pitchKit");
    if (!wrap) return;
    const top = (D.remixRanking || []).slice(0, 5);
    const sh = D.startHere;
    const artist = D.artist || {};
    const press = (D.press || []).slice(0, 3);

    const remixLines = top
      .map((r, i) => `${i + 1}. ${r.title} (${r.score}/100 · ${r.style})\n   Sync: ${r.sync || "—"}\n   Why: ${r.why}`)
      .join("\n\n");
    const startLines = sh
      ? [sh.title, "", sh.blurb, "", ...(sh.tracks || []).map((t, i) => `${i + 1}. ${t.title} — ${t.why}`)].join("\n")
      : "";
    const pressLines = press.map((p) => `"${p.quote}"\n— ${p.source}`).join("\n\n");
    const epkBlock = [
      "TINSLEY — SHORT EPK / COLD EMAIL BLOCK",
      "",
      artist.name + (artist.location ? " · " + artist.location : ""),
      artist.tagline || "",
      "",
      artist.bio || "",
      "",
      "Links:",
      artist.links && artist.links.spotify ? "Spotify: " + artist.links.spotify : "",
      artist.links && artist.links.website ? "Site: " + artist.links.website : "",
      artist.links && artist.links.epk ? "EPK: " + artist.links.epk : "",
      "",
      "Press:",
      pressLines,
      "",
      "Start Here playlist:",
      startLines
    ]
      .filter((l) => l !== undefined)
      .join("\n");

    const fullOnePager = [
      "TINSLEY — PITCH ONE-PAGER",
      "Seattle indie pop-rock · Catalog & sync brief",
      D.meta && D.meta.updated ? "Data as of " + D.meta.updated : "",
      "",
      "=== TOP 5 REMIX / SYNC ASKS ===",
      remixLines,
      "",
      "=== START HERE PLAYLIST ===",
      startLines,
      "",
      "=== SHORT EPK ===",
      epkBlock
    ].join("\n");

    const mdOnePager = [
      "# Tinsley — Pitch one-pager",
      "",
      "_Seattle indie pop-rock · Catalog & sync brief_",
      D.meta && D.meta.updated ? "_Data as of " + D.meta.updated + "_" : "",
      "",
      "## Top 5 remix & sync asks",
      "",
      ...top.map((r, i) => `### ${i + 1}. ${r.title} (${r.score}/100)\n**Style:** ${r.style}\n\n**Sync:** ${r.sync || "—"}\n\n${r.why}\n`),
      "## Start Here playlist",
      "",
      sh ? sh.blurb : "",
      "",
      ...(sh && sh.tracks ? sh.tracks.map((t, i) => `${i + 1}. **${t.title}** — ${t.why}`) : []),
      "",
      "## Short EPK",
      "",
      artist.bio || "",
      "",
      "### Press",
      "",
      ...press.map((p) => `> ${p.quote}\n>\n> — ${p.source}\n`)
    ].join("\n");

    const remixRows = top
      .map(
        (r, i) => `<li class="pitch-row">
          <span class="pitch-rank">${i + 1}</span>
          <div>
            <div class="pitch-title-row"><strong>${esc(r.title)}</strong><span class="pitch-score">${r.score}</span></div>
            <div class="pitch-style">${esc(r.style)}</div>
            ${r.sync ? `<p class="pitch-sync"><span class="rr-sync-l">Sync</span>${esc(r.sync)}</p>` : ""}
            <p class="pitch-why">${esc(r.why)}</p>
          </div>
        </li>`
      )
      .join("");

    const trackList = ((sh && sh.tracks) || [])
      .map((t, i) => `<li><span class="pitch-track-n">${i + 1}</span><div><strong>${esc(t.title)}</strong><p>${esc(t.why)}</p></div></li>`)
      .join("");

    const pressHtml = press
      .map((p) => `<blockquote class="pitch-quote"><p>“${esc(p.quote)}”</p><cite>— ${esc(p.source)}</cite></blockquote>`)
      .join("");

    const download = (filename, text) => {
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    };

    wrap.innerHTML = `
      <div class="pitch-actions">
        <button type="button" class="btn btn-primary" id="pitchCopyAll">Copy full one-pager</button>
        <button type="button" class="btn" id="pitchCopyEpk">Copy EPK / cold email</button>
        <button type="button" class="btn" id="pitchCopyRemix">Copy remix / sync</button>
        <button type="button" class="btn" id="pitchDlTxt">Download .txt</button>
        <button type="button" class="btn" id="pitchDlMd">Download .md</button>
      </div>
      <div class="pitch-grid">
        <div class="pitch-card">
          <h3>Top 5 remix &amp; sync asks</h3>
          <p class="pitch-sub">Highest dance-floor conversion with sync cues for supervisors and remix partners.</p>
          <ol class="pitch-list">${remixRows}</ol>
        </div>
        <div class="pitch-card">
          <h3>${esc((sh && sh.title) || "Start Here")}</h3>
          <p class="pitch-sub">${esc((sh && sh.blurb) || "")}</p>
          <ol class="pitch-tracks">${trackList}</ol>
        </div>
        <div class="pitch-card pitch-epk">
          <h3>Short EPK / cold email</h3>
          <p class="pitch-sub">Bio + press + Start Here — one paste for editors, supervisors, and support-slot asks.</p>
          <p class="pitch-bio">${esc(artist.bio || "")}</p>
          <div class="pitch-press">${pressHtml}</div>
          <div class="pitch-links">
            ${artist.links && artist.links.spotify ? `<a href="${esc(artist.links.spotify)}" target="_blank" rel="noopener">Spotify</a>` : ""}
            ${artist.links && artist.links.epk ? `<a href="${esc(artist.links.epk)}" target="_blank" rel="noopener">Official EPK</a>` : ""}
            ${artist.links && artist.links.website ? `<a href="${esc(artist.links.website)}" target="_blank" rel="noopener">Site</a>` : ""}
          </div>
        </div>
      </div>`;

    const bind = (id, text, msg) => {
      const btn = $("#" + id);
      if (btn) btn.addEventListener("click", () => copy(text, msg));
    };
    bind("pitchCopyAll", fullOnePager, "Copied full one-pager");
    bind("pitchCopyEpk", epkBlock, "Copied EPK / cold email block");
    bind("pitchCopyRemix", "TOP 5 REMIX / SYNC ASKS\n\n" + remixLines, "Copied remix / sync brief");
    const dlTxt = $("#pitchDlTxt");
    if (dlTxt) dlTxt.addEventListener("click", () => { download("tinsley-pitch-one-pager.txt", fullOnePager); showToast("Downloaded .txt"); });
    const dlMd = $("#pitchDlMd");
    if (dlMd) dlMd.addEventListener("click", () => { download("tinsley-pitch-one-pager.md", mdOnePager); showToast("Downloaded .md"); });
  })();

  /* ---- street picks for Tinsley ---- */
  (function streetPicks() {
    const wrap = $("#streetPicks");
    if (!wrap || !D.streetPicks) return;
    wrap.innerHTML = D.streetPicks
      .map((p) => {
        const catUrl = "street-marketing.html?cat=" + encodeURIComponent(p.category);
        return `<a class="spick" href="${catUrl}">
          <span class="spick-rank">#${p.rank}</span>
          <div>
            <div class="spick-top"><strong>${esc(p.title)}</strong><span class="spick-cat">${esc(p.category)}</span></div>
            <p>${esc(p.angle)}</p>
          </div>
        </a>`;
      })
      .join("");
  })();

  /* ---- scroll reveal + animate bars ---- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          e.target.querySelectorAll(".bar-fill, .match-fill, .mini-fill, .tf-rung-fill, .ca-fill").forEach((b) => {
            b.style.width = b.getAttribute("data-w") + "%";
          });
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".section, .catalog-side .card").forEach((s) => {
    s.classList.add("reveal");
    io.observe(s);
  });

  /* ---- optional Plausible analytics ---- */
  (function analytics() {
    const domain = D.meta && D.meta.analytics && D.meta.analytics.plausibleDomain;
    if (!domain) return;
    const s = document.createElement("script");
    s.defer = true;
    s.setAttribute("data-domain", domain);
    s.src = "https://plausible.io/js/script.js";
    document.head.appendChild(s);
  })();
})();
