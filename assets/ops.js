/* ============ Tinsley Ops Command — execution layer ============ */
(function () {
  "use strict";
  if (typeof TINSLEY === "undefined") return;
  const D = TINSLEY;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  const toast = $("#toast");
  let toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  }
  function copy(text, msg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast(msg)).catch(() => fallbackCopy(text, msg));
    } else fallbackCopy(text, msg);
  }
  function fallbackCopy(text, msg) {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast(msg);
    } catch (e) {
      showToast("Copy failed");
    }
    document.body.removeChild(ta);
  }
  function load(key, fallback) {
    try {
      const raw = JSON.parse(localStorage.getItem(key));
      return raw != null ? raw : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function save(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }

  /* ---- Production setup / connector status ---- */
  (function setup() {
    const wrap = $("#opsSetup");
    if (!wrap) return;
    const items = [
      { id: "spotify", label: "Spotify live metrics", hint: "SPOTIFY_CLIENT_ID + SPOTIFY_CLIENT_SECRET", check: "/api/spotify" },
      { id: "email", label: "Email subscribe API", hint: "KIT_API_KEY + KIT_FORM_ID  — or EMAIL_WEBHOOK_URL", check: "/api/subscribe" },
      { id: "plausible", label: "Plausible analytics", hint: "Set meta.analytics.plausibleDomain in data.js", local: true },
      { id: "vercel", label: "Vercel Web Analytics", hint: "Enable in Vercel project → Analytics; script already injected", local: true },
      { id: "listen", label: "Public Listen page", hint: "/listen — Start Here + join form", href: "listen.html" },
      { id: "seo", label: "Sitemap & robots", hint: "/sitemap.xml · /robots.txt", href: "sitemap.xml" }
    ];

    wrap.innerHTML = `<div class="ops-setup-grid">${items
      .map(
        (it) => `<article class="ops-setup-card" data-id="${esc(it.id)}">
        <div class="ops-setup-top"><strong>${esc(it.label)}</strong><span class="ops-setup-chip pending">Checking…</span></div>
        <p class="ops-muted">${esc(it.hint)}</p>
        ${it.href ? `<a class="btn" href="${esc(it.href)}">Open</a>` : ""}
      </article>`
      )
      .join("")}</div>
      <p class="ops-hint">Copy <code>.env.example</code> → Vercel env for Kit (<code>KIT_API_KEY</code> + <code>KIT_FORM_ID</code>) or <code>EMAIL_WEBHOOK_URL</code>, plus Spotify client credentials. Listen form posts to <code>/api/subscribe</code>; bio/QR defaults to <code>/listen</code>. For artist demos, keep this panel collapsed and use <a href="index.html?present=1">present mode</a>.</p>`;

    const details = $("#opsSetupDetails");
    if (details && document.body.classList.contains("present-mode")) {
      details.open = false;
    }

    const setChip = (id, state, label) => {
      const card = wrap.querySelector('[data-id="' + id + '"]');
      if (!card) return;
      const chip = card.querySelector(".ops-setup-chip");
      chip.className = "ops-setup-chip " + state;
      chip.textContent = label;
    };

    const analytics = D.meta && D.meta.analytics;
    setChip("plausible", analytics && analytics.plausibleDomain ? "ok" : "warn", analytics && analytics.plausibleDomain ? "Domain set" : "Not set");
    setChip("vercel", analytics && analytics.vercelInsights !== false ? "ok" : "warn", analytics && analytics.vercelInsights !== false ? "Script on" : "Off");
    setChip("listen", "ok", "Live");
    setChip("seo", "ok", "Shipped");

    fetch("/api/spotify", { headers: { accept: "application/json" } })
      .then((r) => r.json())
      .then((d) => {
        if (d && d.artist) setChip("spotify", d.stale ? "warn" : "ok", d.stale ? "Stale cache" : "Live");
        else if (d && d.reason === "missing_credentials") setChip("spotify", "warn", "Env missing");
        else setChip("spotify", "err", "Offline");
      })
      .catch(() => setChip("spotify", "err", "Offline"));

    fetch("/api/subscribe", { method: "GET", headers: { accept: "application/json" } })
      .then((r) => r.json())
      .then((d) => {
        if (d && d.configured) {
          const who = (d.providers && d.providers.length) ? d.providers.join("+") : "Configured";
          setChip("email", "ok", who);
        } else setChip("email", "warn", "Not configured");
      })
      .catch(() => setChip("email", "err", "Unreachable"));
  })();

  /* ---- Shared helpers: ISO week + storage keys ---- */
  const OPS_STORE_KEYS = [
    "tinsley.ops.ritual.v1",
    "tinsley.ops.release.v1",
    "tinsley.ops.press.v1",
    "tinsley.ops.playlists.v1",
    "tinsley.ops.paid.v1",
    "tinsley.ops.creatives.v1",
    "tinsley.ops.engage.v1",
    "tinsley.ops.street.v1",
    "tinsley.ops.seattle.v1",
    "tinsley.ops.kpiNote.v1",
    "tinsley.calendar.week.v1",
    "tinsley.roadmap.progress.v1",
    "tinsley.northstar.v1"
  ];

  function factorySlug(title) {
    return String(title || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function matchFactory(title) {
    const packs = D.contentFactory || [];
    if (!title) return { idx: -1, pack: null };
    const exact = packs.findIndex((p) => p.song === title);
    if (exact >= 0) return { idx: exact, pack: packs[exact] };
    const soft = packs.findIndex(
      (p) => title.indexOf(p.song) === 0 || p.song.indexOf(title.split(" (")[0]) === 0
    );
    return soft >= 0 ? { idx: soft, pack: packs[soft] } : { idx: -1, pack: null };
  }

  function writeNorthStar(key, value) {
    const KEY = "tinsley.northstar.v1";
    let store = load(KEY, {});
    const rec = store[key] || {};
    const v = Math.max(0, Math.round(Number(value) || 0));
    rec.current = v;
    rec.history = (rec.history || []).concat([{ t: Date.now(), v: v }]).slice(-24);
    store[key] = rec;
    save(KEY, store);
    try {
      window.dispatchEvent(new CustomEvent("tinsley:northstar"));
    } catch (e) {}
  }

  function isoWeekId(d) {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const week = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
    return date.getUTCFullYear() + "-W" + String(week).padStart(2, "0");
  }

  function listenUrl() {
    const base = (D.meta && D.meta.canonicalUrl) || (location.origin + "/");
    try {
      return new URL("listen", base).toString().replace(/\/$/, "") || location.origin + "/listen";
    } catch (e) {
      return location.origin + "/listen";
    }
  }

  /* ---- This week command strip ---- */
  (function thisWeek() {
    const wrap = $("#opsThisWeek");
    if (!wrap) return;

    function packText(pack) {
      if (!pack) return "";
      return [
        "CONTENT PACK — " + pack.song,
        "",
        "HOOKS",
        ...pack.hooks.map((h) => "• " + h),
        "",
        "SHOT LIST",
        ...pack.shots.map((h) => "• " + h),
        "",
        "CAPTIONS",
        ...pack.captions.map((h) => "• " + h)
      ].join("\n");
    }

    function todayISO() {
      return new Date().toISOString().slice(0, 10);
    }

    function pressRows() {
      const press = load("tinsley.ops.press.v1", {});
      const today = todayISO();
      return (D.pressOutlets || [])
        .map((o) => {
          const r = press[o.id] || { status: "todo", note: "", date: "" };
          const open = r.status === "sent" || r.status === "followup" || r.status === "drafted";
          const overdue = !!(open && r.date && r.date < today);
          return { outlet: o, rec: r, open: open, overdue: overdue };
        })
        .filter((x) => x.open)
        .sort((a, b) => {
          if (a.overdue !== b.overdue) return a.overdue ? -1 : 1;
          return String(a.rec.date || "9999").localeCompare(String(b.rec.date || "9999"));
        });
    }

    function topCreative() {
      const log = load("tinsley.ops.creatives.v1", []);
      const boost = log.find((e) => e.verdict === "boost");
      const repost = log.find((e) => e.verdict === "repost");
      return boost || repost || log[0] || null;
    }

    function render() {
      const week = isoWeekId(new Date());
      const dow = new Date().getDay();
      const habit =
        dow === 0
          ? { label: "Sunday — Review", text: "Pull Spotify followers, fill the Sunday review fields, kill one hook, download a JSON backup." }
          : dow === 1
            ? { label: "Monday — Plan", text: "Pick the featured song on the calendar, then run this strip top to bottom." }
            : { label: "Ship days", text: "Hit calendar slots, log creatives, clear 3 engagement queue items." };

      const cal = load("tinsley.calendar.week.v1", {});
      let calDone = 0;
      let calTotal = 0;
      if (D.contentCalendar && D.contentCalendar.days) {
        D.contentCalendar.days.forEach((day) => {
          (day.slots || []).forEach((_, si) => {
            calTotal += 1;
            if (cal.week === week && cal.done && cal.done[day.key + ":" + si]) calDone += 1;
          });
        });
      }
      const calPct = calTotal ? Math.round((calDone / calTotal) * 100) : 0;
      const songIdx = cal.week === week && typeof cal.song === "number" ? cal.song : 0;
      const featured =
        (D.songHashtags && D.songHashtags[songIdx] && D.songHashtags[songIdx].title) ||
        (D.songHashtags && D.songHashtags[0] && D.songHashtags[0].title) ||
        "—";
      const fac = matchFactory(featured);
      const facHref = fac.pack ? "#factory-" + factorySlug(fac.pack.song) : "#content-factory";
      const winner = topCreative();

      const ritual = load("tinsley.ops.ritual.v1", {});
      let ritualDone = 0;
      let ritualTotal = 0;
      if (D.weeklyOps && D.weeklyOps.days) {
        D.weeklyOps.days.forEach((block, bi) => {
          (block.actions || []).forEach((_, ai) => {
            ritualTotal += 1;
            if (ritual.week === week && ritual.checks && ritual.checks[bi + "-" + ai]) ritualDone += 1;
          });
        });
      }
      const ritualPct = ritualTotal ? Math.round((ritualDone / ritualTotal) * 100) : 0;

      const rel = load("tinsley.ops.release.v1", {
        release: (D.releaseOs && D.releaseOs.releases[0]) || "",
        done: {}
      });
      let relDone = 0;
      let relTotal = 0;
      if (D.releaseOs && D.releaseOs.weeks) {
        D.releaseOs.weeks.forEach((w) => {
          (w.tasks || []).forEach((t) => {
            const id = rel.release + "::" + t.id;
            relTotal += 1;
            if (rel.done && rel.done[id]) relDone += 1;
          });
        });
      }
      const relPct = relTotal ? Math.round((relDone / relTotal) * 100) : 0;

      const pressList = pressRows();
      const overdueN = pressList.filter((x) => x.overdue).length;
      const pressShow = pressList.slice(0, 4);

      const play = load("tinsley.ops.playlists.v1", {});
      const playTodo = (D.playlistTargets || [])
        .filter((p) => ((play[p.id] && play[p.id].status) || "todo") === "todo")
        .slice(0, 3);

      const nsStore = load("tinsley.northstar.v1", {});
      const nsQuick = (D.northStars || []).slice(0, 4).map((m) => {
        const cur = nsStore[m.key] && nsStore[m.key].current != null ? nsStore[m.key].current : m.current;
        return { label: m.label, cur: cur, target: m.target, fmt: m.fmt };
      });

      const fmtN = (v, fmt) => {
        if (fmt === "usd") return "$" + Number(v || 0).toLocaleString("en-US");
        return Number(v || 0).toLocaleString("en-US");
      };

      let listenUtm = listenUrl();
      try {
        const u = new URL(listenUrl());
        u.searchParams.set("utm_source", "bio");
        u.searchParams.set("utm_medium", "social");
        u.searchParams.set("utm_campaign", "listen");
        listenUtm = u.toString();
      } catch (e) {}

      wrap.innerHTML = `
        <div class="ops-habit">
          <span class="ops-habit-l">${esc(habit.label)}</span>
          <p>${esc(habit.text)}</p>
        </div>
        <p class="ops-cadence">ISO week <span class="ops-week">${esc(week)}</span> · Featured song: <strong>${esc(featured)}</strong>
          ${overdueN ? ` · <span class="ops-overdue-n">${overdueN} press overdue</span>` : ""}
        </p>
        <div class="ops-featured-pack">
          <div>
            <span class="ops-strip-h">This week’s factory pack</span>
            <p>${fac.pack ? esc(fac.pack.song) + " — hooks, shots, captions ready to film." : "No factory pack matched — open the factory and add one."}</p>
          </div>
          <div class="ops-row-actions" style="margin-top:0">
            ${fac.pack ? `<button type="button" class="btn btn-primary" id="twCopyPack">Copy pack</button>` : ""}
            <a class="btn" href="${esc(facHref)}">Jump to factory</a>
            <a class="btn" href="tinsley-social.html#calendar">Pick song on calendar</a>
          </div>
        </div>
        <div class="ops-featured-pack ops-winner-pack">
          <div>
            <span class="ops-strip-h">Organic creative winner</span>
            <p>${
              winner
                ? `<strong>${esc(winner.hook || winner.creative || "Untitled")}</strong> · ${esc(winner.platform || "—")} · ${esc(winner.verdict || "logged")} · ${esc(winner.metric || winner.result || "")}`
                : "No creatives logged yet — ship a clip, then mark boost / repost / kill."
            }</p>
          </div>
          <div class="ops-row-actions" style="margin-top:0">
            <a class="btn btn-primary" href="#creatives">Open creative log</a>
            <a class="btn" href="#engage">Engagement queue</a>
            <a class="btn" href="#paid">Paid (winners only)</a>
          </div>
        </div>
        <div class="ops-week-strip">
          <article class="ops-strip-card">
            <div class="ops-strip-h">Calendar</div>
            <div class="cal-ring" style="--p:${calPct}"><span class="cal-ring-pct">${calPct}%</span></div>
            <p>${calDone}/${calTotal} slots</p>
            <a class="btn" href="tinsley-social.html#calendar">Open</a>
          </article>
          <article class="ops-strip-card">
            <div class="ops-strip-h">Ritual</div>
            <div class="cal-ring" style="--p:${ritualPct}"><span class="cal-ring-pct">${ritualPct}%</span></div>
            <p>${ritualDone}/${ritualTotal} checks</p>
            <a class="btn" href="#ritual">Open</a>
          </article>
          <article class="ops-strip-card">
            <div class="ops-strip-h">Release OS</div>
            <div class="cal-ring" style="--p:${relPct}"><span class="cal-ring-pct">${relPct}%</span></div>
            <p><strong>${esc(rel.release || "—")}</strong> · ${relDone}/${relTotal}</p>
            <a class="btn" href="#release-os">Open</a>
          </article>
          <article class="ops-strip-card ops-strip-wide">
            <div class="ops-strip-h">Follow-ups ${overdueN ? `<span class="ops-overdue-chip">${overdueN} overdue</span>` : ""}</div>
            <div class="ops-strip-cols">
              <div>
                <h4>Press</h4>
                <ul class="ops-plain">${
                  pressShow.length
                    ? pressShow
                        .map((x) => {
                          const r = x.rec;
                          return `<li class="${x.overdue ? "ops-overdue-row" : ""}"><strong>${esc(x.outlet.name)}</strong> · ${esc(r.status || "todo")}${r.date ? " · " + esc(r.date) : " · <em>no date</em>"}${x.overdue ? ' <span class="ops-overdue-chip">Overdue</span>' : ""}</li>`;
                        })
                        .join("")
                    : "<li class=\"ops-muted\">No open pitches — pick one on Mon.</li>"
                }</ul>
                <a class="btn" href="#press-crm">Press CRM</a>
              </div>
              <div>
                <h4>Playlists</h4>
                <ul class="ops-plain">${
                  playTodo.length
                    ? playTodo.map((p) => `<li>${esc(p.name)}</li>`).join("")
                    : "<li class=\"ops-muted\">All targets pitched or placed.</li>"
                }</ul>
                <a class="btn" href="#playlist-sync">Playlist desk</a>
              </div>
            </div>
          </article>
        </div>
        <div class="ops-strip-ns">
          ${nsQuick
            .map(
              (m) => `<div class="ops-ns-chip"><span class="ops-muted">${esc(m.label)}</span><strong>${esc(fmtN(m.cur, m.fmt))}</strong><span class="ops-muted">/ ${esc(fmtN(m.target, m.fmt))}</span></div>`
            )
            .join("")}
          <a class="btn" href="#kpis">KPI snapshot</a>
          <a class="btn" href="tinsley-social.html#north-stars">Edit north-stars</a>
          <button type="button" class="btn" id="twCopyBio" title="Copy Listen URL with bio UTMs">Copy bio link</button>
        </div>`;

      const copyPackBtn = $("#twCopyPack");
      if (copyPackBtn && fac.pack) {
        copyPackBtn.addEventListener("click", () => copy(packText(fac.pack), "This week’s pack copied"));
      }
      const bioBtn = $("#twCopyBio");
      if (bioBtn) bioBtn.addEventListener("click", () => copy(listenUtm, "Bio /listen UTM copied"));
    }

    render();
    window.addEventListener("tinsley:northstar", render);
    window.addEventListener("tinsley:ops-refresh", render);
  })();

  /* ---- KPI snapshot + structured Sunday review ---- */
  (function kpis() {
    const wrap = $("#opsKpis");
    if (!wrap) return;
    const NOTE_KEY = "tinsley.ops.kpiNote.v1";
    const week = isoWeekId(new Date());
    let noteStore = load(NOTE_KEY, {});
    if (noteStore.week !== week) {
      noteStore = {
        week: week,
        note: noteStore.note || "",
        topHook: noteStore.topHook || "",
        topPost: noteStore.topPost || "",
        listGrowth: noteStore.listGrowth || "",
        kill: noteStore.kill || "",
        history: noteStore.history || []
      };
    }

    function spark(history) {
      const pts = (history || []).slice(-12).map((h) => Number(h.v) || 0);
      if (pts.length < 2) return "";
      const max = Math.max.apply(null, pts.concat([1]));
      const min = Math.min.apply(null, pts);
      const span = Math.max(max - min, 1);
      const w = 72;
      const h = 28;
      const path = pts
        .map((v, i) => {
          const x = (i / (pts.length - 1)) * w;
          const y = h - ((v - min) / span) * (h - 4) - 2;
          return (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
        })
        .join(" ");
      return `<svg class="ops-spark" viewBox="0 0 ${w} ${h}" aria-hidden="true"><path d="${path}" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
    }

    function render() {
      const store = load("tinsley.northstar.v1", {});
      const cards = (D.northStars || [])
        .map((m) => {
          const rec = store[m.key] || {};
          const cur = rec.current != null ? rec.current : m.current;
          const pct = m.target ? Math.min(100, Math.round((cur / m.target) * 100)) : 0;
          const fmt = (v) => (m.fmt === "usd" ? "$" + Number(v).toLocaleString("en-US") : Number(v).toLocaleString("en-US"));
          return `<article class="ops-kpi-card">
            <div class="ops-kpi-top"><span class="ops-lane">${esc(m.track || "")}</span>${spark(rec.history)}</div>
            <h3>${esc(m.label)}</h3>
            <p class="ops-kpi-val"><strong>${esc(fmt(cur))}</strong> <span class="ops-muted">/ ${esc(fmt(m.target))}</span></p>
            <div class="rm-bar"><span class="rm-bar-fill" style="width:${pct}%"></span></div>
            <p class="ops-muted">${esc(m.note || "")}</p>
          </article>`;
        })
        .join("");

      wrap.innerHTML = `
        <div class="ops-row-actions" style="margin-bottom:16px">
          <button type="button" class="btn btn-primary" id="kpiPullSpotify">Pull Spotify followers</button>
          <button type="button" class="btn" id="opsDemoSeed">Load demo week</button>
          <a class="btn" href="tinsley-social.html#north-stars">Edit all on Social</a>
          <a class="btn" href="tinsley-social.html#calendar">Calendar week review</a>
        </div>
        <div class="ops-kpi-grid">${cards}</div>
        <div class="ops-kpi-note">
          <h3 class="ops-subh" style="margin-top:0">Sunday review</h3>
          <p class="ops-hint">Fill these four fields before you close the week — they replace a blank note with decisions.</p>
          <div class="ops-review-grid">
            <label>Top hook <input class="ops-input" id="kpiTopHook" type="text" placeholder="e.g. choose yourself lip-sync" value="${esc(noteStore.topHook || "")}" /></label>
            <label>Top post URL <input class="ops-input" id="kpiTopPost" type="url" placeholder="https://…" value="${esc(noteStore.topPost || "")}" /></label>
            <label>List growth this week <input class="ops-input" id="kpiListGrowth" type="text" placeholder="+12 emails · 40 Listen clicks" value="${esc(noteStore.listGrowth || "")}" /></label>
            <label>One kill decision <input class="ops-input" id="kpiKill" type="text" placeholder="Kill: whisper-core test #3" value="${esc(noteStore.kill || "")}" /></label>
          </div>
          <label for="kpiNote"><strong>Extra note</strong> <span class="ops-muted">(${esc(week)})</span></label>
          <textarea id="kpiNote" class="ops-textarea" rows="2" placeholder="Anything else for next Monday?">${esc(noteStore.note || "")}</textarea>
          <div class="ops-row-actions">
            <button type="button" class="btn btn-primary" id="kpiSave">Save Sunday review</button>
            <button type="button" class="btn" id="kpiCopy">Copy snapshot</button>
            <a class="btn" href="#backup">Download backup</a>
            <a class="btn" href="#creatives">Log creative verdict</a>
          </div>
          <p class="ops-hint" style="margin-bottom:0;margin-top:12px">Sunday ritual: Pull Spotify followers → update TikTok/IG/email north-stars → save this review → Export JSON.</p>
        </div>`;

      const pull = $("#kpiPullSpotify");
      if (pull) {
        if (document.body.classList.contains("present-mode")) pull.hidden = true;
        pull.addEventListener("click", () => {
          pull.disabled = true;
          pull.textContent = "Pulling…";
          fetch("/api/spotify", { headers: { accept: "application/json" } })
            .then((r) => r.json())
            .then((d) => {
              if (d && d.artist && d.artist.followers != null) {
                writeNorthStar("followers", d.artist.followers);
                showToast("Spotify followers → " + Number(d.artist.followers).toLocaleString("en-US"));
              } else if (d && d.reason === "missing_credentials") {
                showToast("Spotify env not configured");
              } else {
                showToast("Spotify pull failed");
              }
            })
            .catch(() => showToast("Spotify unreachable"))
            .finally(() => {
              pull.disabled = false;
              pull.textContent = "Pull Spotify followers";
              render();
            });
        });
      }

      const demoSeed = $("#opsDemoSeed");
      if (demoSeed) {
        demoSeed.addEventListener("click", () => {
          const today = new Date().toISOString().slice(0, 10);
          const creatives = [
            {
              date: today,
              hook: "choose yourself lip-sync",
              platform: "TikTok",
              url: "",
              metric: "4.8% save · 18k views",
              verdict: "boost"
            },
            {
              date: today,
              hook: "glow-up mirror cut",
              platform: "Instagram",
              url: "",
              metric: "2.1% save · 6.4k reach",
              verdict: "repost"
            },
            {
              date: today,
              hook: "whisper-core test #3",
              platform: "TikTok",
              url: "",
              metric: "0.6% save · 1.2k views",
              verdict: "kill"
            }
          ];
          save("tinsley.ops.creatives.v1", creatives);
          noteStore.week = week;
          noteStore.topHook = "choose yourself lip-sync";
          noteStore.topPost = "";
          noteStore.listGrowth = "+14 emails · 52 Listen clicks";
          noteStore.kill = "Kill: whisper-core test #3";
          noteStore.note = "Demo week seeded for presentation — replace with real Sunday numbers.";
          save(NOTE_KEY, noteStore);
          showToast("Demo week loaded");
          render();
          try { window.dispatchEvent(new CustomEvent("tinsley:demo-seed")); } catch (e) {}
        });
      }

      $("#kpiSave").addEventListener("click", () => {
        noteStore.week = week;
        noteStore.topHook = ($("#kpiTopHook").value || "").trim();
        noteStore.topPost = ($("#kpiTopPost").value || "").trim();
        noteStore.listGrowth = ($("#kpiListGrowth").value || "").trim();
        noteStore.kill = ($("#kpiKill").value || "").trim();
        noteStore.note = ($("#kpiNote").value || "").trim();
        noteStore.history = (noteStore.history || [])
          .concat([{
            t: Date.now(),
            note: noteStore.note,
            topHook: noteStore.topHook,
            kill: noteStore.kill
          }])
          .slice(-20);
        save(NOTE_KEY, noteStore);
        showToast("Sunday review saved");
      });
      $("#kpiCopy").addEventListener("click", () => {
        const store2 = load("tinsley.northstar.v1", {});
        const lines = ["TINSLEY — KPI SNAPSHOT · " + week, ""];
        (D.northStars || []).forEach((m) => {
          const rec = store2[m.key] || {};
          const cur = rec.current != null ? rec.current : m.current;
          lines.push(`${m.label}: ${cur} / ${m.target}`);
        });
        lines.push("", "SUNDAY REVIEW");
        if (noteStore.topHook) lines.push("Top hook: " + noteStore.topHook);
        if (noteStore.topPost) lines.push("Top post: " + noteStore.topPost);
        if (noteStore.listGrowth) lines.push("List growth: " + noteStore.listGrowth);
        if (noteStore.kill) lines.push("Kill: " + noteStore.kill);
        if (noteStore.note) lines.push("Note: " + noteStore.note);
        copy(lines.join("\n"), "KPI snapshot copied");
      });
    }
    render();
    window.addEventListener("tinsley:northstar", render);
  })();

  /* ---- Export / import ---- */
  (function backup() {
    const wrap = $("#opsBackup");
    if (!wrap) return;
    wrap.innerHTML = `
      <p class="ops-hint">Exports include Ops modules plus calendar, roadmap progress, and north-stars from this browser. Import merges keys into localStorage (does not clear unrelated keys).</p>
      <div class="ops-row-actions">
        <button type="button" class="btn btn-primary" id="opsExport">Download JSON backup</button>
        <button type="button" class="btn" id="opsCopyJson">Copy JSON</button>
        <label class="btn ops-file-label">Import JSON<input type="file" id="opsImport" accept="application/json,.json" hidden /></label>
      </div>
      <p class="ops-muted" id="opsBackupStatus"></p>`;

    function bundle() {
      const data = {};
      OPS_STORE_KEYS.forEach((k) => {
        try {
          const raw = localStorage.getItem(k);
          if (raw != null) data[k] = JSON.parse(raw);
        } catch (e) {
          data[k] = null;
        }
      });
      return {
        version: 1,
        exportedAt: new Date().toISOString(),
        site: (D.meta && D.meta.canonicalUrl) || "",
        week: isoWeekId(new Date()),
        data: data
      };
    }

    function applyBundle(obj) {
      if (!obj || !obj.data || typeof obj.data !== "object") throw new Error("Invalid backup file");
      Object.keys(obj.data).forEach((k) => {
        if (!OPS_STORE_KEYS.includes(k)) return;
        try {
          localStorage.setItem(k, JSON.stringify(obj.data[k]));
        } catch (e) {}
      });
    }

    $("#opsExport").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(bundle(), null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "tinsley-ops-backup-" + isoWeekId(new Date()) + ".json";
      a.click();
      URL.revokeObjectURL(a.href);
      showToast("Backup downloaded");
      $("#opsBackupStatus").textContent = "Downloaded " + a.download;
    });
    $("#opsCopyJson").addEventListener("click", () => {
      copy(JSON.stringify(bundle(), null, 2), "Ops JSON copied");
    });
    $("#opsImport").addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const obj = JSON.parse(String(reader.result || ""));
          applyBundle(obj);
          showToast("Import complete — reloading");
          $("#opsBackupStatus").textContent = "Imported from " + file.name + " · reloading…";
          setTimeout(() => location.reload(), 600);
        } catch (err) {
          showToast("Import failed");
          $("#opsBackupStatus").textContent = "Import failed: " + (err && err.message ? err.message : "bad JSON");
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    });
  })();

  /* ---- Weekly ops ritual ---- */
  (function ritual() {
    const wrap = $("#opsRitual");
    if (!wrap || !D.weeklyOps) return;
    const KEY = "tinsley.ops.ritual.v1";
    let done = load(KEY, {});
    const week = (() => {
      const d = new Date();
      const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
      const y = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
      const w = Math.ceil(((t - y) / 86400000 + 1) / 7);
      return t.getUTCFullYear() + "-W" + String(w).padStart(2, "0");
    })();
    if (done.week !== week) done = { week: week, checks: {} };

    function render() {
      const blocks = D.weeklyOps.days
        .map((block, bi) => {
          const items = block.actions
            .map((a, ai) => {
              const id = bi + "-" + ai;
              const on = !!done.checks[id];
              return `<li class="ops-check${on ? " on" : ""}" data-id="${id}">
                <button type="button" class="ops-tick" aria-pressed="${on}"></button>
                <span>${esc(a)}</span>
              </li>`;
            })
            .join("");
          return `<article class="ops-ritual-card">
            <div class="ops-ritual-h"><span class="ops-day">${esc(block.day)}</span><strong>${esc(block.title)}</strong></div>
            <ul class="ops-check-list">${items}</ul>
          </article>`;
        })
        .join("");
      wrap.innerHTML = `
        <p class="ops-cadence">${esc(D.weeklyOps.cadence)} · <span class="ops-week">${esc(week)}</span></p>
        <div class="ops-ritual-grid">${blocks}</div>
        <div class="ops-row-actions">
          <a class="btn" href="tinsley-social.html#calendar">Open calendar</a>
          <a class="btn" href="tinsley-social.html#north-stars">Update north-stars</a>
          <button type="button" class="btn" id="ritualReset">Reset this week</button>
        </div>`;
      wrap.querySelectorAll(".ops-check").forEach((li) => {
        li.querySelector("button").addEventListener("click", () => {
          const id = li.getAttribute("data-id");
          if (done.checks[id]) delete done.checks[id];
          else done.checks[id] = true;
          save(KEY, done);
          render();
        });
      });
      const reset = $("#ritualReset");
      if (reset)
        reset.addEventListener("click", () => {
          done = { week: week, checks: {} };
          save(KEY, done);
          render();
          showToast("Ritual reset");
        });
    }
    render();
  })();

  /* ---- UTM builder ---- */
  (function utm() {
    const wrap = $("#utmBuilder");
    if (!wrap) return;
    const defs = (D.meta && D.meta.analytics && D.meta.analytics.utmDefaults) || {};
    const presets = (D.meta && D.meta.analytics && D.meta.analytics.utmPresets) || [];
    const baseDefault = listenUrl();
    const presetBtns = presets
      .map((p) => `<button type="button" class="btn utm-preset" data-id="${esc(p.id)}">${esc(p.label)}</button>`)
      .join("");
    wrap.innerHTML = `
      <div class="utm-presets">
        <span class="ops-strip-h">Presets</span>
        <div class="ops-row-actions">${presetBtns || '<span class="ops-muted">No presets in data.js</span>'}</div>
      </div>
      <div class="utm-form">
        <label>Base URL<input id="utmBase" type="url" value="${esc(baseDefault)}" /></label>
        <label>utm_source<input id="utmSource" type="text" value="${esc(defs.source || "bio")}" /></label>
        <label>utm_medium<input id="utmMedium" type="text" value="${esc(defs.medium || "social")}" /></label>
        <label>utm_campaign<input id="utmCampaign" type="text" value="${esc(defs.campaign || "listen")}" /></label>
        <label>utm_content <em>(optional)</em><input id="utmContent" type="text" placeholder="hook-a" /></label>
      </div>
      <div class="utm-out">
        <code id="utmResult"></code>
        <div class="ops-row-actions">
          <button type="button" class="btn btn-primary" id="utmCopy">Copy link</button>
          <button type="button" class="btn" id="utmQr">Download QR PNG</button>
          <button type="button" class="btn" id="utmListen">Reset to Listen</button>
          <button type="button" class="btn" id="utmLinktree">Linktree fallback</button>
        </div>
        <p class="ops-hint">Default every bio, QR, ad, and press link to <code>/listen</code>. Keep Linktree as a secondary fallback only.</p>
      </div>`;
    const fields = ["utmBase", "utmSource", "utmMedium", "utmCampaign", "utmContent"].map((id) => $("#" + id));
    function build() {
      const base = ($("#utmBase").value || "").trim();
      try {
        const u = new URL(base);
        [["utm_source", "utmSource"], ["utm_medium", "utmMedium"], ["utm_campaign", "utmCampaign"], ["utm_content", "utmContent"]].forEach(([param, id]) => {
          const v = ($("#" + id).value || "").trim();
          if (v) u.searchParams.set(param, v);
          else u.searchParams.delete(param);
        });
        $("#utmResult").textContent = u.toString();
      } catch (e) {
        $("#utmResult").textContent = "Enter a valid URL (include https://)";
      }
    }
    fields.forEach((f) => f && f.addEventListener("input", build));
    build();
    $("#utmCopy").addEventListener("click", () => copy($("#utmResult").textContent, "UTM link copied"));
    $("#utmQr").addEventListener("click", () => {
      const url = ($("#utmResult").textContent || "").trim();
      if (!url || url.indexOf("http") !== 0) return showToast("Build a valid UTM link first");
      const qrApi =
        "https://api.qrserver.com/v1/create-qr-code/?size=480x480&margin=16&format=png&data=" +
        encodeURIComponent(url);
      const btn = $("#utmQr");
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Preparing…";
      }
      fetch(qrApi)
        .then((r) => {
          if (!r.ok) throw new Error("qr_fail");
          return r.blob();
        })
        .then((blob) => {
          const a = document.createElement("a");
          const obj = URL.createObjectURL(blob);
          a.href = obj;
          a.download = "tinsley-utm-qr.png";
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(obj);
          showToast("QR PNG downloaded");
        })
        .catch(() => {
          window.open(qrApi, "_blank", "noopener");
          showToast("Opened QR — save the image");
        })
        .finally(() => {
          if (btn) {
            btn.disabled = false;
            btn.textContent = "Download QR PNG";
          }
        });
    });
    $("#utmListen").addEventListener("click", () => {
      $("#utmBase").value = listenUrl();
      build();
    });
    $("#utmLinktree").addEventListener("click", () => {
      $("#utmBase").value = (D.artist.links && D.artist.links.linktree) || "";
      build();
    });
    wrap.querySelectorAll(".utm-preset").forEach((btn) => {
      btn.addEventListener("click", () => {
        const p = presets.find((x) => x.id === btn.getAttribute("data-id"));
        if (!p) return;
        $("#utmBase").value = listenUrl();
        $("#utmSource").value = p.source || "";
        $("#utmMedium").value = p.medium || "";
        $("#utmCampaign").value = p.campaign || "";
        $("#utmContent").value = p.content || "";
        build();
        showToast(p.label + " preset applied");
      });
    });
  })();

  /* ---- Creative / hook log ---- */
  (function creatives() {
    const wrap = $("#creativeLog");
    if (!wrap) return;
    const KEY = "tinsley.ops.creatives.v1";
    let log = load(KEY, []);
    const verdicts = ["boost", "repost", "kill", "hold"];

    function render() {
      const rows = log
        .map(
          (e, i) => `<tr>
          <td>${esc(e.date)}</td>
          <td><strong>${esc(e.hook)}</strong><div class="ops-muted">${esc(e.platform)}${e.url ? ` · <a href="${esc(e.url)}" target="_blank" rel="noopener">link</a>` : ""}</div></td>
          <td>${esc(e.metric || "—")}</td>
          <td><span class="ops-verdict ${esc(e.verdict || "")}">${esc(e.verdict || "—")}</span></td>
          <td><button type="button" class="btn cre-del" data-i="${i}">Remove</button></td>
        </tr>`
        )
        .join("");
      wrap.innerHTML = `
        <p class="ops-blurb">Organic inventory lives here. Mark <strong>boost</strong> only after saves/views clear your bar — then consider Paid.</p>
        <div class="cre-form">
          <input class="ops-input" id="creHook" placeholder="Hook name (e.g. choose yourself lip-sync)" />
          <select class="ops-select" id="crePlatform">
            <option>TikTok</option><option>Instagram</option><option>YouTube Shorts</option><option>Other</option>
          </select>
          <input class="ops-input" id="creUrl" type="url" placeholder="Post URL" />
          <input class="ops-input" id="creMetric" placeholder="Saves / views (e.g. 4.2% save · 12k views)" />
          <select class="ops-select" id="creVerdict">
            ${verdicts.map((v) => `<option value="${v}">${v}</option>`).join("")}
          </select>
          <button type="button" class="btn btn-primary" id="creAdd">Log creative</button>
        </div>
        <div class="ops-table-wrap"><table class="ops-table">
          <thead><tr><th>Date</th><th>Hook</th><th>Metric</th><th>Verdict</th><th></th></tr></thead>
          <tbody>${rows || '<tr><td colspan="5" class="ops-muted">No creatives logged yet.</td></tr>'}</tbody>
        </table></div>
        <div class="ops-row-actions">
          <button type="button" class="btn" id="creCopy">Copy log</button>
          <a class="btn" href="#this-week">See winner on This week</a>
        </div>`;
      $("#creAdd").addEventListener("click", () => {
        const hook = ($("#creHook").value || "").trim();
        if (!hook) return showToast("Add a hook name");
        log.unshift({
          date: new Date().toISOString().slice(0, 10),
          hook: hook,
          platform: $("#crePlatform").value,
          url: ($("#creUrl").value || "").trim(),
          metric: ($("#creMetric").value || "").trim(),
          verdict: $("#creVerdict").value
        });
        save(KEY, log);
        try { window.dispatchEvent(new CustomEvent("tinsley:ops-refresh")); } catch (e) {}
        render();
        showToast("Creative logged");
      });
      wrap.querySelectorAll(".cre-del").forEach((btn) => {
        btn.addEventListener("click", () => {
          log.splice(+btn.getAttribute("data-i"), 1);
          save(KEY, log);
          try { window.dispatchEvent(new CustomEvent("tinsley:ops-refresh")); } catch (e) {}
          render();
        });
      });
      $("#creCopy").addEventListener("click", () => {
        const lines = ["TINSLEY — CREATIVE LOG", ""].concat(
          log.map((e) => `${e.date} · ${e.platform} · ${e.hook} · ${e.metric || "—"} · ${e.verdict}${e.url ? " · " + e.url : ""}`)
        );
        copy(lines.join("\n"), "Creative log copied");
      });
    }
    window.addEventListener("tinsley:demo-seed", () => {
      log = load(KEY, []);
      render();
    });
    render();
  })();

  /* ---- Engagement queue ---- */
  (function engage() {
    const wrap = $("#engageQueue");
    if (!wrap) return;
    const KEY = "tinsley.ops.engage.v1";
    const week = isoWeekId(new Date());
    let store = load(KEY, { week: week, done: {}, custom: [] });
    if (store.week !== week) store = { week: week, done: {}, custom: store.custom || [] };

    function items() {
      const seeds = (D.engagementQueue || []).map((e) => ({ ...e, seed: true }));
      const custom = (store.custom || []).map((e) => ({ ...e, seed: false }));
      return seeds.concat(custom);
    }

    function render() {
      const list = items();
      const doneN = list.filter((e) => store.done[e.id]).length;
      const rows = list
        .map((e) => {
          const on = !!store.done[e.id];
          return `<li class="ops-check${on ? " on" : ""}" data-id="${esc(e.id)}">
            <button type="button" class="ops-tick" aria-pressed="${on}"></button>
            <div>
              <strong>${esc(e.platform)}</strong>
              <span class="ops-muted"> · ${esc(e.lane || "queue")}</span>
              <p>${esc(e.target)}</p>
            </div>
            ${e.seed ? "" : `<button type="button" class="btn eng-del" data-id="${esc(e.id)}">Remove</button>`}
          </li>`;
        })
        .join("");
      wrap.innerHTML = `
        <p class="ops-blurb">Clear <strong>${doneN}/${list.length}</strong> this week (${esc(week)}). Ties to calendar Tue replies + Sat scene slots.</p>
        <ul class="ops-check-list ops-engage-list">${rows}</ul>
        <div class="eng-form">
          <select class="ops-select" id="engPlatform"><option>TikTok</option><option>Instagram</option><option>Threads</option><option>Other</option></select>
          <input class="ops-input" id="engTarget" placeholder="Add a reply / stitch / DM target" />
          <button type="button" class="btn btn-primary" id="engAdd">Add</button>
          <button type="button" class="btn" id="engReset">Reset week checks</button>
        </div>
        <div class="ops-row-actions">
          <a class="btn" href="tinsley-social.html#calendar">Open calendar</a>
        </div>`;
      wrap.querySelectorAll(".ops-check").forEach((li) => {
        const id = li.getAttribute("data-id");
        li.querySelector(".ops-tick").addEventListener("click", () => {
          if (store.done[id]) delete store.done[id];
          else store.done[id] = true;
          save(KEY, store);
          render();
        });
      });
      wrap.querySelectorAll(".eng-del").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          store.custom = (store.custom || []).filter((c) => c.id !== id);
          delete store.done[id];
          save(KEY, store);
          render();
        });
      });
      $("#engAdd").addEventListener("click", () => {
        const target = ($("#engTarget").value || "").trim();
        if (!target) return showToast("Add a target");
        store.custom.push({
          id: "c" + Date.now(),
          platform: $("#engPlatform").value,
          target: target,
          lane: "custom"
        });
        save(KEY, store);
        render();
        showToast("Engagement item added");
      });
      $("#engReset").addEventListener("click", () => {
        store.done = {};
        save(KEY, store);
        render();
        showToast("Week checks cleared");
      });
    }
    render();
  })();

  /* ---- Release OS ---- */
  (function releaseOs() {
    const wrap = $("#releaseOs");
    if (!wrap || !D.releaseOs) return;
    const KEY = "tinsley.ops.release.v1";
    let store = load(KEY, { release: D.releaseOs.releases[0], done: {} });
    if (!D.releaseOs.releases.includes(store.release)) store.release = D.releaseOs.releases[0];

    function render() {
      const tabs = D.releaseOs.releases
        .map((r) => `<button type="button" class="cal-song${r === store.release ? " active" : ""}" data-r="${esc(r)}">${esc(r)}</button>`)
        .join("");
      const allIds = [];
      const weeks = D.releaseOs.weeks
        .map((w) => {
          const tasks = w.tasks
            .map((t) => {
              const id = store.release + "::" + t.id;
              allIds.push(id);
              const on = !!store.done[id];
              return `<li class="ops-check${on ? " on" : ""}" data-id="${esc(id)}">
                <button type="button" class="ops-tick" aria-pressed="${on}"></button>
                <span>${esc(t.text)}</span>
              </li>`;
            })
            .join("");
          const doneN = w.tasks.filter((t) => store.done[store.release + "::" + t.id]).length;
          return `<article class="ops-week-card">
            <div class="ops-week-h"><span class="ops-week-n">W${w.week}</span><strong>${esc(w.label)}</strong><span class="ops-week-pct">${doneN}/${w.tasks.length}</span></div>
            <ul class="ops-check-list">${tasks}</ul>
          </article>`;
        })
        .join("");
      const totalDone = allIds.filter((id) => store.done[id]).length;
      const pct = allIds.length ? Math.round((totalDone / allIds.length) * 100) : 0;
      wrap.innerHTML = `
        <p class="ops-blurb">${esc(D.releaseOs.blurb)}</p>
        <div class="cal-songs">${tabs}</div>
        <div class="cal-progress ops-release-progress">
          <div class="cal-ring" style="--p:${pct}"><span class="cal-ring-pct">${pct}%</span></div>
          <div><strong>${totalDone}/${allIds.length}</strong> tasks for <em>${esc(store.release)}</em></div>
        </div>
        <div class="ops-weeks">${weeks}</div>
        <div class="ops-row-actions">
          <button type="button" class="btn" id="relReset">Reset this release</button>
        </div>`;
      wrap.querySelectorAll("[data-r]").forEach((btn) => {
        btn.addEventListener("click", () => {
          store.release = btn.getAttribute("data-r");
          save(KEY, store);
          render();
        });
      });
      wrap.querySelectorAll(".ops-check").forEach((li) => {
        li.querySelector("button").addEventListener("click", () => {
          const id = li.getAttribute("data-id");
          if (store.done[id]) delete store.done[id];
          else store.done[id] = true;
          save(KEY, store);
          render();
        });
      });
      const reset = $("#relReset");
      if (reset)
        reset.addEventListener("click", () => {
          Object.keys(store.done).forEach((k) => {
            if (k.startsWith(store.release + "::")) delete store.done[k];
          });
          save(KEY, store);
          render();
          showToast("Release checklist cleared");
        });
    }
    render();
  })();

  /* ---- Press CRM ---- */
  (function pressCrm() {
    const wrap = $("#pressCrm");
    if (!wrap || !D.pressOutlets) return;
    const KEY = "tinsley.ops.press.v1";
    let store = load(KEY, {});
    const statuses = ["todo", "drafted", "sent", "followup", "placed", "pass"];

    function render() {
      const today = new Date().toISOString().slice(0, 10);
      const rows = D.pressOutlets
        .map((o) => {
          const rec = store[o.id] || { status: "todo", note: "", date: "" };
          const open = rec.status === "sent" || rec.status === "followup" || rec.status === "drafted";
          const overdue = open && rec.date && rec.date < today;
          const opts = statuses
            .map((s) => `<option value="${s}"${rec.status === s ? " selected" : ""}>${s}</option>`)
            .join("");
          return `<tr data-id="${esc(o.id)}" class="${overdue ? "ops-overdue-row" : ""}">
            <td><strong>${esc(o.name)}</strong><div class="ops-muted">${esc(o.lane)} · Priority ${esc(o.priority)}${overdue ? ' · <span class="ops-overdue-chip">Overdue</span>' : ""}</div></td>
            <td class="ops-muted">${esc(o.contact)}</td>
            <td><select class="ops-select press-status">${opts}</select></td>
            <td><input class="ops-input press-date" type="date" value="${esc(rec.date || "")}" /></td>
            <td><input class="ops-input press-note" type="text" placeholder="Note" value="${esc(rec.note || "")}" /></td>
          </tr>`;
        })
        .join("");
      wrap.innerHTML = `
        <p class="ops-hint">Set a follow-up <strong>date</strong> when you pitch. Rows past that date stay open until marked placed/pass — they surface as overdue on This Week.</p>
        <div class="ops-table-wrap"><table class="ops-table">
          <thead><tr><th>Outlet</th><th>Angle</th><th>Status</th><th>Date</th><th>Note</th></tr></thead>
          <tbody>${rows}</tbody>
        </table></div>
        <div class="ops-row-actions">
          <button type="button" class="btn btn-primary" id="pressExport">Copy CRM snapshot</button>
          <a class="btn" href="tinsley-song.html#pitch">Open Pitch Kit</a>
        </div>`;
      wrap.querySelectorAll("tbody tr").forEach((tr) => {
        const id = tr.getAttribute("data-id");
        const sync = () => {
          store[id] = {
            status: tr.querySelector(".press-status").value,
            date: tr.querySelector(".press-date").value,
            note: tr.querySelector(".press-note").value
          };
          save(KEY, store);
          try {
            window.dispatchEvent(new CustomEvent("tinsley:ops-refresh"));
          } catch (e) {}
        };
        tr.querySelectorAll("select, input").forEach((el) => el.addEventListener("change", () => {
          sync();
          render();
        }));
        tr.querySelector(".press-note").addEventListener("input", sync);
      });
      $("#pressExport").addEventListener("click", () => {
        const lines = ["TINSLEY — PRESS CRM", ""].concat(
          D.pressOutlets.map((o) => {
            const r = store[o.id] || { status: "todo", note: "", date: "" };
            return `${o.name} [${r.status}] ${r.date || "—"} — ${r.note || o.contact}`;
          })
        );
        copy(lines.join("\n"), "Press CRM copied");
      });
    }
    render();
  })();

  /* ---- Playlist + sync desk ---- */
  (function playlistDesk() {
    const wrap = $("#playlistDesk");
    if (!wrap || !D.playlistTargets) return;
    const KEY = "tinsley.ops.playlists.v1";
    let store = load(KEY, {});
    const statuses = ["todo", "pitched", "added", "pass"];

    function render() {
      wrap.innerHTML = D.playlistTargets
        .map((p) => {
          const st = (store[p.id] && store[p.id].status) || "todo";
          const opts = statuses.map((s) => `<option value="${s}"${st === s ? " selected" : ""}>${s}</option>`).join("");
          return `<article class="ops-desk-card" data-id="${esc(p.id)}">
            <div class="ops-desk-top">
              <span class="ops-lane">${esc(p.lane)}</span>
              <select class="ops-select desk-status">${opts}</select>
            </div>
            <h3>${esc(p.name)}</h3>
            <p class="ops-fit"><strong>Fit:</strong> ${esc(p.fit)}</p>
            <p class="ops-muted">${esc(p.tip)}</p>
          </article>`;
        })
        .join("");
      wrap.querySelectorAll(".ops-desk-card").forEach((card) => {
        const id = card.getAttribute("data-id");
        card.querySelector("select").addEventListener("change", (e) => {
          store[id] = { status: e.target.value };
          save(KEY, store);
          showToast("Playlist status saved");
        });
      });
    }
    render();
  })();

  /* ---- Content factory ---- */
  (function contentFactory() {
    const wrap = $("#contentFactory");
    if (!wrap || !D.contentFactory) return;

    function slug(title) {
      return String(title || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    const cal = load("tinsley.calendar.week.v1", {});
    const week = isoWeekId(new Date());
    const songIdx = cal.week === week && typeof cal.song === "number" ? cal.song : 0;
    const featuredTitle =
      (D.songHashtags && D.songHashtags[songIdx] && D.songHashtags[songIdx].title) || "";

    const packs = D.contentFactory.map((c) =>
      ["CONTENT PACK — " + c.song, "", "HOOKS", ...c.hooks.map((h) => "• " + h), "", "SHOT LIST", ...c.shots.map((h) => "• " + h), "", "CAPTIONS", ...c.captions.map((h) => "• " + h)].join("\n")
    );

    wrap.innerHTML =
      (featuredTitle
        ? `<p class="ops-hint">Calendar featured song this week: <strong>${esc(featuredTitle)}</strong> — matching pack is highlighted.</p>`
        : "") +
      D.contentFactory
        .map((c, i) => {
          const id = "factory-" + slug(c.song);
          const featured =
            featuredTitle &&
            (c.song === featuredTitle ||
              featuredTitle.indexOf(c.song) === 0 ||
              c.song.indexOf(featuredTitle.split(" (")[0]) === 0);
          return `<article class="ops-factory-card${featured ? " featured" : ""}" id="${esc(id)}">
          <div class="ops-factory-h">
            <h3>${esc(c.song)}${featured ? ' <span class="ops-overdue-chip">This week</span>' : ""}</h3>
            <button type="button" class="btn factory-copy" data-i="${i}">Copy pack</button>
          </div>
          <div class="ops-factory-cols">
            <div><h4>Hooks</h4><ul>${c.hooks.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div>
            <div><h4>Shot list</h4><ul>${c.shots.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div>
            <div><h4>Captions</h4><ul>${c.captions.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div>
          </div>
        </article>`;
        })
        .join("");

    wrap.querySelectorAll(".factory-copy").forEach((btn) => {
      btn.addEventListener("click", () => copy(packs[+btn.getAttribute("data-i")], "Content pack copied"));
    });

    if (location.hash && location.hash.indexOf("#factory-") === 0) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  })();

  /* ---- Paid winners ---- */
  (function paid() {
    const wrap = $("#paidWinners");
    if (!wrap || !D.paidWinners) return;
    const KEY = "tinsley.ops.paid.v1";
    let log = load(KEY, []);

    function render() {
      const thresh = D.paidWinners.thresholds
        .map((t) => `<li><strong>${esc(t.metric)}</strong> — ${esc(t.bar)} <span class="ops-muted">→ ${esc(t.action)}</span></li>`)
        .join("");
      const rules = D.paidWinners.rules.map((r) => `<li>${esc(r)}</li>`).join("");
      const rows = log
        .map(
          (e, i) => `<tr>
          <td>${esc(e.date)}</td><td>${esc(e.creative)}</td><td>${esc(e.spend)}</td>
          <td>${esc(e.result)}</td>
          <td><button type="button" class="btn paid-del" data-i="${i}">Remove</button></td>
        </tr>`
        )
        .join("");
      wrap.innerHTML = `
        <p class="ops-blurb">${esc(D.paidWinners.blurb)}</p>
        <div class="ops-two">
          <div><h3>Organic bars</h3><ul class="ops-plain">${thresh}</ul></div>
          <div><h3>Rules</h3><ul class="ops-plain">${rules}</ul></div>
        </div>
        <h3 class="ops-subh">Campaign log</h3>
        <div class="paid-form">
          <input class="ops-input" id="paidCreative" placeholder="Creative / clip name" />
          <input class="ops-input" id="paidSpend" placeholder="Spend ($)" />
          <input class="ops-input" id="paidResult" placeholder="Result (e.g. 2.1% save · kill / scale)" />
          <button type="button" class="btn btn-primary" id="paidAdd">Log test</button>
        </div>
        <div class="ops-table-wrap"><table class="ops-table">
          <thead><tr><th>Date</th><th>Creative</th><th>Spend</th><th>Result</th><th></th></tr></thead>
          <tbody>${rows || '<tr><td colspan="5" class="ops-muted">No tests logged yet.</td></tr>'}</tbody>
        </table></div>`;
      $("#paidAdd").addEventListener("click", () => {
        const creative = ($("#paidCreative").value || "").trim();
        if (!creative) return showToast("Add a creative name");
        log.unshift({
          date: new Date().toISOString().slice(0, 10),
          creative: creative,
          spend: ($("#paidSpend").value || "").trim() || "—",
          result: ($("#paidResult").value || "").trim() || "—"
        });
        save(KEY, log);
        render();
        showToast("Paid test logged");
      });
      wrap.querySelectorAll(".paid-del").forEach((btn) => {
        btn.addEventListener("click", () => {
          log.splice(+btn.getAttribute("data-i"), 1);
          save(KEY, log);
          render();
        });
      });
    }
    render();
  })();

  /* ---- Seattle flywheel ---- */
  (function seattle() {
    const wrap = $("#seattleFlywheel");
    if (!wrap || !D.seattleFlywheel) return;
    const KEY = "tinsley.ops.seattle.v1";
    let store = load(KEY, {});
    function render() {
      wrap.innerHTML = D.seattleFlywheel
        .map((s) => {
          const on = !!store[s.id];
          return `<article class="ops-fly-card${on ? " on" : ""}" data-id="${esc(s.id)}">
            <div class="ops-fly-top">
              <strong>${esc(s.outlet)}</strong>
              <button type="button" class="cal-skip-day fly-toggle" aria-pressed="${on}">${on ? "Done" : "Mark done"}</button>
            </div>
            <div class="ops-muted">${esc(s.cadence)}</div>
            <p><strong>Asset pack:</strong> ${esc(s.asset)}</p>
            <p class="ops-muted">Next: ${esc(s.next)}</p>
          </article>`;
        })
        .join("");
      wrap.querySelectorAll(".ops-fly-card").forEach((card) => {
        card.querySelector("button").addEventListener("click", () => {
          const id = card.getAttribute("data-id");
          if (store[id]) delete store[id];
          else store[id] = true;
          save(KEY, store);
          render();
        });
      });
    }
    render();
  })();

  /* ---- Street tactic tracker ---- */
  (function streetOps() {
    const wrap = $("#streetOps");
    if (!wrap || !D.streetPicks) return;
    const KEY = "tinsley.ops.street.v1";
    let store = load(KEY, {});

    function render() {
      wrap.innerHTML =
        D.streetPicks
          .map((p) => {
            const id = "sp-" + p.rank;
            const rec = store[id] || { done: false, lastRun: "", note: "" };
            return `<article class="ops-street-card${rec.done ? " on" : ""}" data-id="${esc(id)}">
              <div class="ops-fly-top">
                <div>
                  <span class="ops-muted">#${p.rank} · ${esc(p.category)}</span>
                  <strong>${esc(p.title)}</strong>
                </div>
                <button type="button" class="cal-skip-day street-toggle" aria-pressed="${!!rec.done}">${rec.done ? "Shipped" : "Mark shipped"}</button>
              </div>
              <p>${esc(p.angle)}</p>
              <div class="ops-street-meta">
                <label>Last run <input class="ops-input street-date" type="date" value="${esc(rec.lastRun || "")}" /></label>
                <label>Note <input class="ops-input street-note" type="text" placeholder="Where / what happened" value="${esc(rec.note || "")}" /></label>
              </div>
            </article>`;
          })
          .join("") +
        `<div class="ops-row-actions">
          <a class="btn" href="tinsley-social.html#street-picks">Social street picks</a>
          <a class="btn" href="street-marketing.html">All 100 ideas</a>
        </div>`;

      wrap.querySelectorAll(".ops-street-card").forEach((card) => {
        const id = card.getAttribute("data-id");
        const sync = () => {
          const prev = store[id] || {};
          store[id] = {
            done: !!prev.done,
            lastRun: card.querySelector(".street-date").value,
            note: card.querySelector(".street-note").value
          };
          save(KEY, store);
        };
        card.querySelector(".street-toggle").addEventListener("click", () => {
          const prev = store[id] || {};
          const done = !prev.done;
          store[id] = {
            done: done,
            lastRun: done && !prev.lastRun ? new Date().toISOString().slice(0, 10) : card.querySelector(".street-date").value,
            note: card.querySelector(".street-note").value
          };
          save(KEY, store);
          render();
        });
        card.querySelector(".street-date").addEventListener("change", sync);
        card.querySelector(".street-note").addEventListener("input", sync);
      });
    }
    render();
  })();

  /* ---- True Fan ladder ---- */
  (function ladder() {
    const wrap = $("#fanLadder");
    if (!wrap || !D.trueFanLadder) return;
    wrap.innerHTML = `<ol class="ops-ladder">${D.trueFanLadder
      .map(
        (t) => `<li>
        <span class="ops-ladder-n">${t.tier}</span>
        <div>
          <div class="ops-ladder-top"><strong>${esc(t.name)}</strong><span class="ops-price">${esc(t.price)}</span></div>
          <p>${esc(t.offer)}</p>
          <span class="ops-muted">CTA: ${esc(t.cta)}</span>
        </div>
      </li>`
      )
      .join("")}</ol>
      <div class="ops-row-actions">
        <a class="btn btn-primary" href="listen.html">Open Listen / capture page</a>
        <a class="btn" href="reference.html#truefans">True Fans calculator</a>
      </div>`;
  })();

  /* ---- Live routing ---- */
  (function live() {
    const wrap = $("#liveRouting");
    if (!wrap || !D.liveRouting) return;
    const text = ["TINSLEY — SUPPORT-SLOT ONE-PAGER", "", ...D.liveRouting.onePager.map((l) => "• " + l), "", "ROUTING", ...D.liveRouting.legs.map((leg) => `${leg.region}: ${leg.markets.join(", ")} — ${leg.targets}`)].join("\n");
    wrap.innerHTML = `
      <p class="ops-blurb">${esc(D.liveRouting.blurb)}</p>
      <div class="ops-two">
        <div class="ops-onepager">
          <h3>Support-slot one-pager</h3>
          <ul class="ops-plain">${D.liveRouting.onePager.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
          <button type="button" class="btn btn-primary" id="liveCopy">Copy one-pager</button>
        </div>
        <div>
          <h3>Routing legs</h3>
          <div class="ops-legs">${D.liveRouting.legs
            .map(
              (leg) => `<article class="ops-leg">
              <strong>${esc(leg.region)}</strong>
              <p>${esc(leg.markets.join(" · "))}</p>
              <p class="ops-muted">${esc(leg.targets)}</p>
            </article>`
            )
            .join("")}</div>
        </div>
      </div>
      <div class="ops-row-actions">
        <a class="btn" href="tinsley-song.html#artists">Like-artist map</a>
        <a class="btn" href="tinsley-song.html#pitch">Pitch Kit</a>
      </div>`;
    $("#liveCopy").addEventListener("click", () => copy(text, "Live one-pager copied"));
  })();

  /* ---- scroll reveal ---- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".section").forEach((s) => {
    s.classList.add("reveal");
    io.observe(s);
  });
})();
