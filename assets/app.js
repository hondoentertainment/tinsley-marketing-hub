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
    if (badge && D.meta.updated) badge.textContent = "Data current as of " + D.meta.updated;
    const meth = $("#methodology");
    if (meth) {
      const sources = (D.meta.sources || [])
        .map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)}${s.kind ? ` <em>(${esc(s.kind)})</em>` : ""}</a>`)
        .join("");
      meth.innerHTML = `<h3>Methodology &amp; sources</h3><p class="meth-body">${esc(D.meta.methodology || "")}</p><div class="meth-sources">${sources}</div>`;
    }
  })();

  /* ---- live Spotify hydration (graceful fallback) ---- */
  (function live() {
    fetch("/api/spotify", { headers: { accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d || d.error || !d.artist) return;
        const a = d.artist;
        const liveMetrics = [];
        if (a.popularity != null) liveMetrics.push({ value: a.popularity + "/100", label: "Spotify popularity", live: true });
        if (a.followers != null) liveMetrics.push({ value: nfCompact(a.followers), label: "Spotify followers", live: true });
        if (metrics) liveMetrics.forEach((m) => metrics.insertBefore(metricEl(m), metrics.firstChild));
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
        if (badge && d.updatedAt) {
          badge.textContent = "Live Spotify data · fetched " + new Date(d.updatedAt).toLocaleDateString();
          badge.classList.add("islive");
        }
      })
      .catch(() => {});
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

  /* ---- north-star metric tracker (editable, saved, with trend) ---- */
  (function northStar() {
    const wrap = $("#northStars");
    if (!wrap || !D.northStars) return;
    const KEY = "tinsley.northstar.v1";
    let store = {};
    try { store = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { store = {}; }
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} };
    const fmt = (v, f) => (f === "usd" ? "$" + nfInt(v) : nfInt(v));
    const cur = (m) => (store[m.key] && store[m.key].current != null ? store[m.key].current : m.current);
    const hist = (m) => (store[m.key] && store[m.key].history) || [];

    function spark(h) {
      if (!h || h.length < 2) return `<span class="ns-nohist">Update to log a trend</span>`;
      const vals = h.map((p) => p.v), min = Math.min(...vals), max = Math.max(...vals), span = Math.max(1, max - min);
      const W = 116, H = 28, pad = 3, step = (W - pad * 2) / (h.length - 1);
      const pts = h.map((p, i) => `${(pad + i * step).toFixed(1)},${(H - pad - ((p.v - min) / span) * (H - pad * 2)).toFixed(1)}`).join(" ");
      const up = vals[vals.length - 1] >= vals[0];
      return `<svg viewBox="0 0 ${W} ${H}" class="ns-spark ${up ? "up" : "down"}" preserveAspectRatio="none"><polyline points="${pts}" fill="none" stroke-width="2"/></svg>`;
    }

    function render() {
      wrap.innerHTML = D.northStars
        .map((m) => {
          const c = cur(m), p = Math.min(100, Math.round((c / m.target) * 100));
          return `<div class="ns-card" data-key="${m.key}">
            <div class="ns-top"><span class="ns-label">${esc(m.label)}</span><span class="ns-pct ${m.track}">${p}%</span></div>
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
})();
