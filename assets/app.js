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
  $("#heroTagline").textContent = D.artist.tagline;
  $("#heroBio").textContent = D.artist.bio;
  const metrics = $("#metrics");
  D.metrics.forEach((m) => {
    metrics.appendChild(el("div", "metric", `<div class="v">${m.value}</div><div class="l">${m.label}</div>`));
  });

  /* ---- catalog ---- */
  const grid = $("#trackGrid");
  const types = ["All", ...new Set(D.catalog.map((t) => t.type))];
  const filterWrap = $("#catalogFilters");
  let activeFilter = "All";

  function renderTracks() {
    grid.innerHTML = "";
    const list = D.catalog.filter((t) => activeFilter === "All" || t.type === activeFilter);
    list.forEach((t) => {
      const card = el("div", "track");
      card.innerHTML = `
        <div class="top"><h4>${t.title}</h4><span class="year">${t.year}</span></div>
        <div class="tags">
          <span class="pill type">${t.type}</span>
          <span class="pill">${t.genre}</span>
          <span class="pill mood">${t.mood}</span>
        </div>
        <p class="note">${t.note}</p>`;
      grid.appendChild(card);
    });
  }
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

  /* ---- genre bars ---- */
  const bars = $("#genreBars");
  D.genreMix.forEach((g) => {
    const row = el("div", "bar-row");
    row.innerHTML = `<div class="bl"><span>${g.label}</span><span>${g.value}%</span></div>
      <div class="bar-track"><div class="bar-fill" data-w="${g.value}"></div></div>`;
    bars.appendChild(row);
  });

  /* ---- press ---- */
  const pressList = $("#pressList");
  D.press.forEach((p) => {
    pressList.appendChild(el("div", "press-item", `<p>"${p.quote}"</p><div class="src">— ${p.source}</div>`));
  });

  /* ---- EDM remix potential ---- */
  const remixList = $("#remixList");
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
        <div class="mini-grid">${factors}</div>
      </div>
      <div class="rr-score"><span class="rr-num">${r.score}</span><span class="rr-max">/100</span></div>`;
    remixList.appendChild(row);
  });

  /* ---- SWOT ---- */
  const swot = $("#swot");
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

  /* ---- hashtags ---- */
  const htWrap = $("#hashtagGroups");
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
  $("#copyAll").addEventListener("click", () =>
    copy(allTags.join(" "), `Copied ${allTags.length} hashtags`)
  );

  /* ---- social ---- */
  const social = $("#socialGrid");
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

  /* ---- like artists ---- */
  const ag = $("#artistGrid");
  D.likeArtists.forEach((a) => {
    const card = el("div", "artist");
    card.innerHTML = `
      <div class="ah"><h3>${a.name}</h3><span class="match-num">${a.match}%</span></div>
      <div class="tag-line">${a.tag}</div>
      <p class="why">${a.why}</p>
      <div class="match-track"><div class="match-fill" data-w="${a.match}"></div></div>`;
    ag.appendChild(card);
  });

  /* ---- roadmap ---- */
  const rm = $("#roadmapGrid");
  D.roadmap.forEach((p) => {
    const items = p.items.map((i) => `<li>${i}</li>`).join("");
    rm.appendChild(el("div", "phase", `<h3>${p.phase}</h3><ul>${items}</ul>`));
  });

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
          e.target.querySelectorAll(".bar-fill, .match-fill, .mini-fill").forEach((b) => {
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
