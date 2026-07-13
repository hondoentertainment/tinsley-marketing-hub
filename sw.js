/* Service worker — cache-first for static assets, network-first for pages
   and the live API. Bump CACHE version to invalidate old caches. */
const CACHE = "marketing-hub-v13";
const CORE = [
  "/",
  "/index.html",
  "/tinsley.html",
  "/tinsley-song.html",
  "/tinsley-social.html",
  "/tinsley-ops.html",
  "/listen.html",
  "/press.html",
  "/sync.html",
  "/shows.html",
  "/bad-enough.html",
  "/reference.html",
  "/street-marketing.html",
  "/assets/styles.css",
  "/assets/app.js",
  "/assets/ops.js",
  "/assets/listen.js",
  "/assets/listen.css",
  "/assets/public.js",
  "/assets/public.css",
  "/assets/reference.js",
  "/assets/data.js",
  "/assets/icon-512.png",
  "/sitemap.xml",
  "/robots.txt",
  "/site.webmanifest"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // let cross-origin (fonts, Spotify art) pass through

  // Never cache the live API — always go to network, fail soft.
  if (url.pathname.startsWith("/api/")) {
    e.respondWith(fetch(req).catch(() => new Response(JSON.stringify({ error: true, reason: "offline" }), { headers: { "Content-Type": "application/json" } })));
    return;
  }

  // Navigations: network-first, fall back to cache.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then((r) => { cachePut(req, r.clone()); return r; }).catch(() => caches.match(req).then((m) => m || caches.match("/index.html"))));
    return;
  }

  // Static: cache-first, then update in background.
  e.respondWith(
    caches.match(req).then((cached) => {
      const net = fetch(req).then((r) => { cachePut(req, r.clone()); return r; }).catch(() => cached);
      return cached || net;
    })
  );
});

function cachePut(req, res) {
  if (res && res.ok) caches.open(CACHE).then((c) => c.put(req, res)).catch(() => {});
}
