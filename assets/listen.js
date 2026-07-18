/* Public Listen page — fan-facing surface (not the ops hub) */
(function () {
  "use strict";
  if (typeof TINSLEY === "undefined") return;
  const D = TINSLEY;
  const A = D.artist || {};
  const L = D.listen || {};
  const links = A.links || {};
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  if ($("listenLoc")) $("listenLoc").textContent = A.location || "Seattle";
  if ($("listenBrand")) $("listenBrand").textContent = A.name || "Tinsley";
  if ($("listenHeadline")) $("listenHeadline").textContent = L.headline || "Start here.";
  if ($("listenSub")) $("listenSub").textContent = L.sub || A.tagline || "";
  if ($("joinTitle")) $("joinTitle").textContent = L.primaryCta || "Join the list";
  if ($("joinNote")) $("joinNote").textContent = L.primaryNote || "";
  if ($("showsNote")) $("showsNote").textContent = L.showsNote || "";
  if ($("year")) $("year").textContent = String(new Date().getFullYear());

  const emailHref = links.emailSignup || links.listen || "#join";
  const linktreeFallback = links.linktree || "";
  const spotifyHref = links.spotify || "#";
  const sp = $("ctaSpotify");
  if (sp) {
    sp.href = spotifyHref;
    if (L.secondaryCta) sp.textContent = L.secondaryCta;
  }
  const heroJoin = $("ctaEmail");
  if (heroJoin) {
    heroJoin.href = "#join";
    if (L.primaryCta) heroJoin.textContent = L.primaryCta;
    heroJoin.removeAttribute("target");
  }

  const sh = D.startHere;
  if (sh && $("startBlurb")) $("startBlurb").textContent = sh.blurb || "";
  if (sh && $("startTracks")) {
    $("startTracks").innerHTML = (sh.tracks || [])
      .map((t, i) => `<li><span class="n">${i + 1}</span><div><strong>${esc(t.title)}</strong><p>${esc(t.why)}</p></div></li>`)
      .join("");
  }

  const smart = [
    { label: "Spotify", href: links.spotify },
    { label: "Bandcamp", href: links.bandcamp },
    { label: "Instagram", href: links.instagram },
    { label: "TikTok", href: links.tiktok },
    { label: "Linktree", href: links.linktree },
    { label: "Official site", href: links.website },
    { label: "EPK", href: links.epk },
    { label: "YouTube", href: links.youtube }
  ].filter((x) => x.href);

  if ($("smartLinks")) {
    $("smartLinks").innerHTML = smart
      .map((x) => `<li><a href="${esc(x.href)}" target="_blank" rel="noopener">${esc(x.label)}</a></li>`)
      .join("");
  }

  const ld = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: A.name || "Tinsley",
    url: "https://tinsley-marketing-hub.vercel.app/listen",
    genre: A.genreTags || ["Indie Pop"],
    foundingLocation: A.location,
    sameAs: [links.spotify, links.instagram, links.tiktok, links.bandcamp, links.youtube, links.website].filter(Boolean)
  };
  const ldEl = $("jsonld");
  if (ldEl) ldEl.textContent = JSON.stringify(ld);

  /* ---- native email form → /api/subscribe (Linktree when unwired) ---- */
  const form = $("joinForm");
  const status = $("joinStatus");
  const fallback = $("joinFallback");
  const joinLive = $("joinLive");
  const joinUnwired = $("joinUnwired");
  const joinLt = $("joinLinktreePrimary");

  if (fallback) {
    fallback.href = linktreeFallback || emailHref;
    fallback.hidden = !fallback.href || fallback.href === "#";
  }
  if (joinLt && linktreeFallback) joinLt.href = linktreeFallback;

  function setUnwiredMode(unwired) {
    if (joinLive) joinLive.hidden = !!unwired;
    if (joinUnwired) joinUnwired.hidden = !unwired;
    if (heroJoin) {
      if (unwired && linktreeFallback) {
        heroJoin.href = linktreeFallback;
        heroJoin.setAttribute("target", "_blank");
        heroJoin.setAttribute("rel", "noopener");
        heroJoin.textContent = L.primaryCta || "Join the list";
      } else {
        heroJoin.href = "#join";
        heroJoin.removeAttribute("target");
        heroJoin.removeAttribute("rel");
        if (L.primaryCta) heroJoin.textContent = L.primaryCta;
      }
    }
  }

  /* Probe once — if Kit/webhook missing, demo Linktree as the live path */
  fetch("/api/subscribe", { method: "GET", headers: { accept: "application/json" } })
    .then((r) => r.json())
    .then((d) => {
      setUnwiredMode(!(d && d.configured));
    })
    .catch(() => {
      /* Keep form visible offline; submit handler still falls back */
      setUnwiredMode(false);
    });

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = (form.email && form.email.value || "").trim();
      const name = (form.name && form.name.value || "").trim();
      if (!email) return;
      if (status) {
        status.hidden = false;
        status.textContent = "Joining…";
        status.className = "join-status";
      }
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json", accept: "application/json" },
          body: JSON.stringify({ email: email, name: name, source: "listen" })
        });
        const data = await res.json().catch(() => ({}));
        if (data && data.ok) {
          if (status) {
            status.textContent = "You're on the list. Watch for demos and first dibs.";
            status.className = "join-status ok";
          }
          form.reset();
          try {
            const KEY = "tinsley.northstar.v1";
            const store = JSON.parse(localStorage.getItem(KEY) || "{}") || {};
            const rec = store.email || {};
            const cur = rec.current != null ? rec.current : (D.northStars && D.northStars.find((m) => m.key === "email") || {}).current || 0;
            rec.current = Math.max(0, Math.round(cur)) + 1;
            rec.history = (rec.history || []).concat([{ t: Date.now(), v: rec.current }]).slice(-24);
            store.email = rec;
            localStorage.setItem(KEY, JSON.stringify(store));
            window.dispatchEvent(new CustomEvent("tinsley:northstar"));
          } catch (err) {}
        } else if (data && data.reason === "not_configured") {
          setUnwiredMode(true);
          if (status) {
            status.hidden = false;
            status.textContent = "Opening Linktree signup — native list isn’t wired yet.";
            status.className = "join-status warn";
          }
          if (linktreeFallback) window.open(linktreeFallback, "_blank", "noopener");
        } else if (data && data.reason === "invalid_email") {
          if (status) {
            status.textContent = "That email doesn’t look right — try again.";
            status.className = "join-status err";
          }
        } else {
          if (status) {
            status.textContent = "Couldn’t reach the list — try Linktree below.";
            status.className = "join-status err";
          }
        }
      } catch (err) {
        if (status) {
          status.textContent = "Offline or blocked — try Linktree below.";
          status.className = "join-status err";
        }
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }

  const analytics = D.meta && D.meta.analytics;
  if (analytics && analytics.plausibleDomain) {
    const s = document.createElement("script");
    s.defer = true;
    s.setAttribute("data-domain", analytics.plausibleDomain);
    s.src = "https://plausible.io/js/script.js";
    document.head.appendChild(s);
  }
  if (analytics && analytics.vercelInsights !== false) {
    const v = document.createElement("script");
    v.defer = true;
    v.src = "/_vercel/insights/script.js";
    document.head.appendChild(v);
  }
})();
