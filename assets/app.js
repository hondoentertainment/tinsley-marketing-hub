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

  /* ---- per-song hashtags ---- */
  const bsTabs = $("#bysongTabs");
  const bsPanel = $("#bysongPanel");
  let activeSong = 0;

  function tagChips(tags) {
    return tags
      .map((t) => `<span class="tag" data-copy="${t}">${t}</span>`)
      .join("");
  }

  function renderSong() {
    const s = D.songHashtags[activeSong];
    const igAll = [...s.igBroad, ...s.igMid, ...s.igNiche];
    bsPanel.innerHTML = `
      <div class="bs-angle"><span class="bs-angle-l">Content angle</span><p>${s.angle}</p></div>
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
  }

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

  /* ---- 1,000 True Fans ---- */
  const TF = D.trueFans;
  if (TF) {
    $("#tfLead").textContent = TF.source.premise;

    $("#tfQuote").innerHTML = `
      <blockquote>“${TF.source.quote}”</blockquote>
      <figcaption>— <a href="${TF.source.url}" target="_blank" rel="noopener">${TF.source.author}, “${TF.source.title}”</a> (${TF.source.year})</figcaption>`;

    /* revenue streams breakdown */
    const tfStreams = $("#tfStreams");
    let streamSum = 0;
    TF.streams.forEach((s) => {
      streamSum += s.amount;
      tfStreams.appendChild(
        el(
          "div",
          "tf-stream",
          `<div class="tf-stream-top"><span class="tf-stream-l">${s.label}</span><b class="tf-stream-amt">$${s.amount}</b></div>
           <p class="tf-stream-d">${s.detail}</p>`
        )
      );
    });
    $("#tfStreamTotal").textContent = "$" + streamSum;

    /* conversion ladder */
    const tfLadder = $("#tfLadder");
    TF.ladder.forEach((r, i) => {
      const row = el("div", "tf-rung");
      row.innerHTML = `
        <div class="tf-rung-bar" style="--pct:${r.pct}%">
          <span class="tf-rung-fill" data-w="${r.pct}"></span>
          <span class="tf-rung-pct">${r.pct}%</span>
        </div>
        <div class="tf-rung-body">
          <div class="tf-rung-head"><span class="tf-rung-n">${i + 1}</span><h4>${r.stage}</h4><span class="tf-rung-worth">${r.worth}</span></div>
          <p class="tf-rung-goal"><b>Goal:</b> ${r.goal}</p>
          <p class="tf-rung-how">${r.how}</p>
        </div>`;
      tfLadder.appendChild(row);
    });

    /* playbook */
    const tfPlaybook = $("#tfPlaybook");
    TF.playbook.forEach((p, i) => {
      tfPlaybook.appendChild(
        el(
          "div",
          "tf-play",
          `<span class="tf-play-n">${String(i + 1).padStart(2, "0")}</span><h4>${p.title}</h4><p>${p.text}</p>`
        )
      );
    });

    /* interactive calculator */
    const m = TF.model;
    const fansEl = $("#tfFans");
    const spendEl = $("#tfSpend");
    fansEl.min = 0; fansEl.max = m.fansMax; fansEl.step = m.fansStep; fansEl.value = m.fans;
    spendEl.min = 10; spendEl.max = m.spendMax; spendEl.step = m.spendStep; spendEl.value = m.spend;

    const usd0 = (n) => "$" + Math.round(n).toLocaleString("en-US");
    const compact = (n) =>
      n >= 1e6 ? (n / 1e6).toFixed(n >= 1e7 ? 0 : 1) + "M" : n >= 1e3 ? Math.round(n / 1e3) + "K" : String(Math.round(n));

    function renderCalc() {
      const fans = +fansEl.value;
      const spend = +spendEl.value;
      const annual = fans * spend;
      $("#tfFansVal").textContent = fans.toLocaleString("en-US");
      $("#tfSpendVal").textContent = "$" + spend + "/yr";
      $("#tfAnnual").textContent = usd0(annual);
      $("#tfMonthly").textContent = usd0(annual / 12);
      $("#tfPerFan").textContent = fans ? "$" + (spend / 12).toFixed(2) : "$0";
      $("#tfStreamsEq").textContent = compact(annual / 0.003);
    }
    fansEl.addEventListener("input", renderCalc);
    spendEl.addEventListener("input", renderCalc);
    renderCalc();
  }

  /* ---- Analysis vs. The Creative Act ---- */
  const CA = D.creativeAct;
  if (CA) {
    $("#caQuote").innerHTML = `
      <blockquote>“${CA.source.quote}”</blockquote>
      <figcaption>— ${CA.source.author}, <cite>${CA.source.title}</cite> (${CA.source.year})</figcaption>
      <p class="ca-premise">${CA.source.premise}</p>`;

    /* principle alignment cards with animated score bars */
    const caPrinciples = $("#caPrinciples");
    CA.principles.forEach((p) => {
      const card = el("div", "ca-principle");
      card.innerHTML = `
        <div class="ca-p-head">
          <h4>${p.name}</h4>
          <span class="ca-p-score">${p.score}</span>
        </div>
        <div class="ca-p-track"><div class="ca-fill" data-w="${p.score}"></div></div>
        <p class="ca-p-idea"><span class="ca-p-tag rubin">Rubin</span>${p.idea}</p>
        <p class="ca-p-tinsley"><span class="ca-p-tag tinsley">Tinsley</span>${p.tinsley}</p>`;
      caPrinciples.appendChild(card);
    });

    /* tension: playbook vs. the creative act */
    $("#caTensionIntro").textContent = CA.tension.intro;
    const caTension = $("#caTension");
    CA.tension.rows.forEach((r) => {
      const row = el("div", "ca-tension-row");
      row.innerHTML = `
        <div class="ca-t-topic">${r.topic}</div>
        <div class="ca-t-cols">
          <div class="ca-t-side deck">
            <span class="ca-t-l">The playbook</span>
            <p>${r.deck}</p>
          </div>
          <div class="ca-t-vs">vs</div>
          <div class="ca-t-side rubin">
            <span class="ca-t-l">The creative act</span>
            <p>${r.rubin}</p>
          </div>
        </div>
        <div class="ca-t-reconcile"><span class="ca-t-r-l">Reconcile</span><p>${r.reconcile}</p></div>`;
      caTension.appendChild(row);
    });
  }

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
