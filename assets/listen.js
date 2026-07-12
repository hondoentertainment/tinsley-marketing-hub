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

  const emailHref = links.emailSignup || links.linktree || "#";
  const spotifyHref = links.spotify || "#";
  ["ctaEmail", "ctaEmail2"].forEach((id) => {
    const a = $(id);
    if (a) {
      a.href = emailHref;
      if (L.primaryCta && id === "ctaEmail") a.textContent = L.primaryCta;
    }
  });
  const sp = $("ctaSpotify");
  if (sp) {
    sp.href = spotifyHref;
    if (L.secondaryCta) sp.textContent = L.secondaryCta;
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
    url: links.website || "https://tinsley-marketing-hub.vercel.app/listen",
    genre: A.genreTags || ["Indie Pop"],
    foundingLocation: A.location,
    sameAs: [links.spotify, links.instagram, links.tiktok, links.bandcamp, links.youtube].filter(Boolean)
  };
  const ldEl = $("jsonld");
  if (ldEl) ldEl.textContent = JSON.stringify(ld);

  const domain = D.meta && D.meta.analytics && D.meta.analytics.plausibleDomain;
  if (domain) {
    const s = document.createElement("script");
    s.defer = true;
    s.setAttribute("data-domain", domain);
    s.src = "https://plausible.io/js/script.js";
    document.head.appendChild(s);
  }
})();
