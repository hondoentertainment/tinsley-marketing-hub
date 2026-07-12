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
      <p class="ops-hint">After setting Kit/ConvertKit or a webhook, POST to <code>/api/subscribe</code> from the Listen form. Spotify credentials power the Song/Social hero chips.</p>`;

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
        if (d && d.configured) setChip("email", "ok", "Configured");
        else setChip("email", "warn", "Not configured");
      })
      .catch(() => setChip("email", "err", "Unreachable"));
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
    const baseDefault = (D.artist.links && (D.artist.links.website || D.artist.links.linktree)) || "https://tinsley-marketing-hub.vercel.app/listen";
    wrap.innerHTML = `
      <div class="utm-form">
        <label>Base URL<input id="utmBase" type="url" value="${esc(baseDefault)}" /></label>
        <label>utm_source<input id="utmSource" type="text" value="${esc(defs.source || "tiktok")}" /></label>
        <label>utm_medium<input id="utmMedium" type="text" value="${esc(defs.medium || "social")}" /></label>
        <label>utm_campaign<input id="utmCampaign" type="text" value="${esc(defs.campaign || "bad-enough")}" /></label>
        <label>utm_content <em>(optional)</em><input id="utmContent" type="text" placeholder="hook-a" /></label>
      </div>
      <div class="utm-out">
        <code id="utmResult"></code>
        <div class="ops-row-actions">
          <button type="button" class="btn btn-primary" id="utmCopy">Copy link</button>
          <button type="button" class="btn" id="utmListen">Use Listen page</button>
        </div>
        <p class="ops-hint">Paste into bios, QR codes, ads, and press kits. Pair with Plausible/GA4 when <code>meta.analytics.plausibleDomain</code> is set.</p>
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
    $("#utmListen").addEventListener("click", () => {
      $("#utmBase").value = location.origin + "/listen";
      build();
    });
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
      const rows = D.pressOutlets
        .map((o) => {
          const rec = store[o.id] || { status: "todo", note: "", date: "" };
          const opts = statuses
            .map((s) => `<option value="${s}"${rec.status === s ? " selected" : ""}>${s}</option>`)
            .join("");
          return `<tr data-id="${esc(o.id)}">
            <td><strong>${esc(o.name)}</strong><div class="ops-muted">${esc(o.lane)} · Priority ${esc(o.priority)}</div></td>
            <td class="ops-muted">${esc(o.contact)}</td>
            <td><select class="ops-select press-status">${opts}</select></td>
            <td><input class="ops-input press-date" type="date" value="${esc(rec.date || "")}" /></td>
            <td><input class="ops-input press-note" type="text" placeholder="Note" value="${esc(rec.note || "")}" /></td>
          </tr>`;
        })
        .join("");
      wrap.innerHTML = `
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
        };
        tr.querySelectorAll("select, input").forEach((el) => el.addEventListener("change", sync));
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
    const packs = D.contentFactory.map((c) =>
      ["CONTENT PACK — " + c.song, "", "HOOKS", ...c.hooks.map((h) => "• " + h), "", "SHOT LIST", ...c.shots.map((h) => "• " + h), "", "CAPTIONS", ...c.captions.map((h) => "• " + h)].join("\n")
    );
    wrap.innerHTML = D.contentFactory
      .map((c, i) => {
        return `<article class="ops-factory-card">
          <div class="ops-factory-h">
            <h3>${esc(c.song)}</h3>
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
