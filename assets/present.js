/* Presentation mode — ?present=1 | localStorage tinsley.present=1
   Softens unfinished connectors and keeps the artist demo path clean. */
(function () {
  "use strict";
  const KEY = "tinsley.present.v1";
  const params = new URLSearchParams(location.search);
  if (params.has("present")) {
    const on = params.get("present") !== "0" && params.get("present") !== "false";
    try {
      localStorage.setItem(KEY, on ? "1" : "0");
    } catch (e) {}
    if (on) document.body.classList.add("present-mode");
    else document.body.classList.remove("present-mode");
  } else {
    try {
      if (localStorage.getItem(KEY) === "1") document.body.classList.add("present-mode");
    } catch (e) {}
  }

  const on = document.body.classList.contains("present-mode");

  function withPresent(href) {
    if (!on || !href || href.indexOf("http") === 0 || href.charAt(0) === "#") return href;
    try {
      const u = new URL(href, location.href);
      if (u.origin !== location.origin) return href;
      u.searchParams.set("present", "1");
      return u.pathname + u.search + u.hash;
    } catch (e) {
      return href;
    }
  }

  /* Soft-rewrite same-origin links so the mode sticks through the demo */
  if (on) {
    document.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#" || href.indexOf("mailto:") === 0) return;
      if (/^(https?:)?\/\//i.test(href) && href.indexOf(location.host) === -1) return;
      a.setAttribute("href", withPresent(href));
    });
  }

  /* Optional host for a present bar */
  const host = document.getElementById("presentBar");
  if (host) {
    host.hidden = false;
    host.innerHTML = on
      ? `<div class="present-bar-inner">
          <span><strong>Present mode</strong> — Lead with Listen → Press → Bad Enough. Skip Ops Setup. Frame as a working prototype, not the official site.</span>
          <a class="present-bar-btn" href="?present=0">Exit</a>
        </div>`
      : `<div class="present-bar-inner">
          <span>Ready for the artist? Turn on present mode to hide unfinished connectors and keep the demo path clean.</span>
          <a class="present-bar-btn" href="?present=1">Enter present mode</a>
        </div>`;
  }

  window.TinsleyPresent = { on: on, withPresent: withPresent };
})();
