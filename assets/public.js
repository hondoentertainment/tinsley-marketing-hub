/* Shared renderer for public marketing surfaces */
(function () {
  "use strict";
  if (typeof TINSLEY === "undefined") return;
  const D = TINSLEY;
  const A = D.artist || {};
  const links = A.links || {};
  const page = document.body.getAttribute("data-page");
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  function hrefOf(item) {
    if (!item) return "#";
    if (item.href) return item.href;
    if (item.hrefKey && links[item.hrefKey]) return links[item.hrefKey];
    return "#";
  }

  function wireYear() {
    const y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function analytics() {
    const a = D.meta && D.meta.analytics;
    if (a && a.plausibleDomain) {
      const s = document.createElement("script");
      s.defer = true;
      s.setAttribute("data-domain", a.plausibleDomain);
      s.src = "https://plausible.io/js/script.js";
      document.head.appendChild(s);
    }
    if (a && a.vercelInsights !== false) {
      const v = document.createElement("script");
      v.defer = true;
      v.src = "/_vercel/insights/script.js";
      document.head.appendChild(v);
    }
  }

  /* ---- Press Kit ---- */
  if (page === "press") {
    const P = D.pressKit || {};
    const set = (id, text) => {
      const el = document.getElementById(id);
      if (el && text != null) el.textContent = text;
    };
    set("pkHeadline", P.headline);
    set("pkLede", P.lede);
    set("pkOneLiner", P.oneLiner);
    set("pkContact", P.contactNote);
    set("pkBio", A.bio);

    const quotes = $("#pkQuotes");
    if (quotes && D.press) {
      quotes.innerHTML = D.press
        .map((q) => `<blockquote class="pub-quote"><p>“${esc(q.quote)}”</p><cite>${esc(q.source)}</cite></blockquote>`)
        .join("");
    }

    const facts = $("#pkFacts");
    if (facts && P.facts) {
      facts.innerHTML = P.facts
        .map((f) => `<div class="pub-fact"><div class="k">${esc(f.k)}</div><div class="v">${esc(f.v)}</div></div>`)
        .join("");
    }

    const start = $("#pkStart");
    if (start && D.startHere) {
      start.innerHTML = (D.startHere.tracks || [])
        .map((t, i) => `<li><span class="n">${i + 1}</span><div><strong>${esc(t.title)}</strong><p>${esc(t.why)}</p></div></li>`)
        .join("");
    }

    const assets = $("#pkAssets");
    if (assets && P.assets) {
      assets.innerHTML = P.assets
        .map((a) => {
          const href = hrefOf(a);
          const ext = href.indexOf("http") === 0;
          return `<li><a href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ""}>${esc(a.label)}<span class="note">${esc(a.note || "")}</span></a></li>`;
        })
        .join("");
    }

    const epk = $("#ctaEpk");
    if (epk && links.epk) epk.href = links.epk;
    const sp = $("#ctaSpotify");
    if (sp && links.spotify) sp.href = links.spotify;
  }

  /* ---- Sync ---- */
  if (page === "sync") {
    const S = D.syncPage || {};
    const set = (id, text) => {
      const el = document.getElementById(id);
      if (el && text != null) el.textContent = text;
    };
    set("syHeadline", S.headline);
    set("syLede", S.lede);
    set("syContact", S.contactNote);

    const moods = $("#syMoods");
    if (moods && S.moods) {
      moods.innerHTML = S.moods
        .map(
          (m) => `<article class="pub-mood">
          <h3>${esc(m.mood)}</h3>
          <div class="tracks">${esc((m.tracks || []).join(" · "))}</div>
          <p>${esc(m.use)}</p>
        </article>`
        )
        .join("");
    }

    const list = $("#syTracks");
    if (list && D.remixRanking) {
      const top = D.remixRanking
        .slice()
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .filter((t) => t.sync && t.score >= 60)
        .slice(0, 10);
      list.innerHTML = top
        .map(
          (t) => `<li>
          <div class="pub-score">${esc(t.score)}</div>
          <div>
            <strong>${esc(t.title)}</strong>
            <div class="style">${esc(t.style || "")}</div>
            <p>${esc(t.sync)}</p>
          </div>
        </li>`
        )
        .join("");
    }

    const epk = $("#ctaEpk");
    if (epk && links.epk) epk.href = links.epk;
    const listen = $("#ctaListen");
    if (listen) listen.href = "listen.html";
  }

  /* ---- Shows ---- */
  if (page === "shows") {
    const S = D.showsPage || {};
    const Lr = D.liveRouting || {};
    const set = (id, text) => {
      const el = document.getElementById(id);
      if (el && text != null) el.textContent = text;
    };
    set("shHeadline", S.headline);
    set("shLede", S.lede);
    set("shBooking", S.bookingNote);
    set("shBlurb", Lr.blurb);

    const draw = $("#shDraw");
    if (draw && S.draw) {
      draw.innerHTML = S.draw.map((d) => `<li>${esc(d)}</li>`).join("");
    }

    const setEl = $("#shSet");
    if (setEl && S.set) {
      setEl.innerHTML = S.set
        .map((x) => `<div class="pub-set-item"><div class="k">${esc(x.label)}</div><div class="v">${esc(x.detail)}</div></div>`)
        .join("");
    }

    const one = $("#shOnePager");
    if (one && Lr.onePager) {
      one.innerHTML = Lr.onePager.map((l) => `<li>${esc(l)}</li>`).join("");
    }

    const legs = $("#shLegs");
    if (legs && Lr.legs) {
      legs.innerHTML = Lr.legs
        .map(
          (leg) => `<article class="pub-leg">
          <h3>${esc(leg.region)}</h3>
          <div class="markets">${esc((leg.markets || []).join(" · "))}</div>
          <p>${esc(leg.targets)}</p>
        </article>`
        )
        .join("");
    }

    const dates = $("#shDates");
    if (dates && S.dates) {
      dates.innerHTML = S.dates
        .map((g) => {
          const head = `${esc(g.when)} · ${esc(g.venue)}`;
          const meta = `${esc(g.city)}${g.status === "upcoming" ? " · Upcoming" : ""}`;
          const body = `<div class="when">${head}</div><div class="venue">${meta}</div><p>${esc(g.note || "")}</p>`;
          if (g.href) {
            return `<li class="${g.status || "past"}"><a href="${esc(g.href)}" target="_blank" rel="noopener">${body}</a></li>`;
          }
          return `<li class="${g.status || "past"}">${body}</li>`;
        })
        .join("");
    }

    const epk = $("#ctaEpk");
    if (epk && links.epk) epk.href = links.epk;
    const listen = $("#ctaListen");
    if (listen) listen.href = "listen.html#join";
  }

  /* ---- Bad Enough campaign (legacy ids) ---- */
  if (page === "bad-enough") {
    const C = D.campaignBadEnough || (D.campaigns && D.campaigns["bad-enough"]) || {};
    const set = (id, text) => {
      const el = document.getElementById(id);
      if (el && text != null) el.textContent = text;
    };
    set("beHeadline", C.headline);
    set("beLede", C.lede);
    if (C.quote) {
      set("beQuote", C.quote.text);
      set("beQuoteSrc", C.quote.source);
    }

    const ctas = $("#beCtas");
    if (ctas && C.ctas) {
      ctas.innerHTML = C.ctas
        .map((c) => {
          const href = hrefOf(c);
          const ext = href.indexOf("http") === 0;
          return `<a class="pub-btn${c.primary ? " primary" : ""}" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ""}>${esc(c.label)}</a>`;
        })
        .join("");
    }

    const angles = $("#beAngles");
    if (angles && C.angles) {
      angles.innerHTML = C.angles
        .map((a) => `<article class="pub-angle"><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></article>`)
        .join("");
    }

    const beats = $("#beBeats");
    if (beats && C.weekBeats) {
      beats.innerHTML = C.weekBeats.map((b) => `<li>${esc(b)}</li>`).join("");
    }

    const tags = $("#beTags");
    const song = (D.songHashtags || []).find((s) => s.title === (C.song || "Bad Enough"));
    if (tags && song) {
      const all = [].concat(song.tiktok || [], song.igBroad || [], song.igMid || []).slice(0, 14);
      tags.innerHTML = all.map((t) => `<li>${esc(t)}</li>`).join("");
    }
  }

  /* ---- Generic campaign pages (temporary-insanity.html, campaign.html?id=) ---- */
  if (page === "campaign") {
    const params = new URLSearchParams(location.search);
    const slug =
      document.body.getAttribute("data-campaign") ||
      params.get("id") ||
      "";
    const map = D.campaigns || {};
    let C = slug && map[slug] ? map[slug] : null;

    if (!C) {
      const pickerWrap = $("#campPickerWrap");
      const picker = $("#campPicker");
      if (pickerWrap) pickerWrap.hidden = false;
      document.querySelectorAll(".camp-body").forEach((n) => { n.hidden = true; });
      if (picker) {
        picker.innerHTML = Object.keys(map)
          .filter((k) => map[k])
          .map((k) => {
            const c = map[k];
            return `<a class="pub-btn${k === "bad-enough" ? " primary" : ""}" href="campaign.html?id=${esc(k)}">${esc(c.song || k)}</a>`;
          })
          .join("");
      }
      const set = (id, text) => {
        const el = document.getElementById(id);
        if (el && text != null) el.textContent = text;
      };
      set("campTitle", "Campaigns");
      set("campEyebrow", "Pick a single");
      set("campHeadline", "One draft surface per release cycle.");
      set("campLede", "Clone this template for the next hero single — recipe, angles, hashtags, list CTA. Not live for fans.");
    } else {
      const set = (id, text) => {
        const el = document.getElementById(id);
        if (el && text != null) el.textContent = text;
      };
      set("campEyebrow", C.eyebrow || "Single");
      set("campTitle", C.song || "Campaign");
      set("campHeadline", C.headline);
      set("campLede", C.lede);
      if (C.quote) {
        set("campQuote", C.quote.text);
        set("campQuoteSrc", C.quote.source);
      }
      document.title = "Tinsley — " + (C.song || "Campaign");

      const ctas = $("#campCtas");
      if (ctas && C.ctas) {
        ctas.innerHTML = C.ctas
          .map((c) => {
            const href = hrefOf(c);
            const ext = href.indexOf("http") === 0;
            return `<a class="pub-btn${c.primary ? " primary" : ""}" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ""}>${esc(c.label)}</a>`;
          })
          .join("");
      }

      const angles = $("#campAngles");
      if (angles && C.angles) {
        angles.innerHTML = C.angles
          .map((a) => `<article class="pub-angle"><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></article>`)
          .join("");
      }

      const beats = $("#campBeats");
      if (beats && C.weekBeats) {
        beats.innerHTML = C.weekBeats.map((b) => `<li>${esc(b)}</li>`).join("");
      }

      const tags = $("#campTags");
      const song = (D.songHashtags || []).find((s) => s.title === C.song);
      if (tags && song) {
        const all = [].concat(song.tiktok || [], song.igBroad || [], song.igMid || []).slice(0, 14);
        tags.innerHTML = all.map((t) => `<li>${esc(t)}</li>`).join("");
      }
    }
  }

  wireYear();
  analytics();
  enhancePublicNav();
})();

function enhancePublicNav() {
  const header = document.querySelector(".pub-nav");
  if (!header) return;
  const nav = header.querySelector("nav");
  if (!nav) return;
  if (!nav.id) nav.id = "pubNavLinks";
  nav.setAttribute("aria-label", "Public pages");

  nav.querySelectorAll("a").forEach((a) => {
    if (a.classList.contains("active")) a.setAttribute("aria-current", "page");
  });

  let btn = header.querySelector(".pub-nav-toggle");
  if (!btn) {
    btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pub-nav-toggle";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", nav.id);
    btn.setAttribute("aria-label", "Open menu");
    btn.innerHTML = '<span class="nav-toggle-bars" aria-hidden="true"></span><span>Menu</span>';
    const listen = header.querySelector(".pub-nav-listen");
    header.insertBefore(btn, listen || nav);
  }

  const setOpen = (open) => {
    document.body.classList.toggle("pub-nav-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) {
      const first = nav.querySelector("a");
      if (first) first.focus();
    }
  };

  btn.addEventListener("click", () => setOpen(!document.body.classList.contains("pub-nav-open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  const onScroll = () => header.classList.toggle("is-solid", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
