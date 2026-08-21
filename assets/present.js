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

  /* Present bar: walkthrough chrome for the artist. Invite only on pages that opt in. */
  const host = document.getElementById("presentBar");
  if (host) {
    const invite = host.getAttribute("data-invite") === "1";
    if (on) {
      host.hidden = false;
      host.innerHTML = `<div class="present-bar-inner">
          <span><strong>Focus mode</strong> — Review Listen → Press → Bad Enough. Skip Ops Setup. These are drafts, not live fan pages.</span>
          <a class="present-bar-btn" href="?present=0">Exit</a>
        </div>`;
    } else if (invite) {
      host.hidden = false;
      host.innerHTML = `<div class="present-bar-inner">
          <span>Focus mode hides unfinished connectors so you can review the draft surfaces in order.</span>
          <a class="present-bar-btn" href="?present=1">Enter focus mode</a>
        </div>`;
    } else {
      host.hidden = true;
      host.innerHTML = "";
    }
  }

  window.TinsleyPresent = { on: on, withPresent: withPresent };
})();
