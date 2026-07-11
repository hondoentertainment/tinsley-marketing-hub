/* ============ Reference Hub — frameworks logic ============
   Standalone renderer for the two reference frameworks that used to live
   inside the Tinsley deck: the 1,000 True Fans model (Kevin Kelly) and
   Analysis vs. Rick Rubin's "The Creative Act". Data comes from data.js
   (the shared TINSLEY global); styling is shared via assets/styles.css. */
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

  const nfInt = (n) => Math.round(n).toLocaleString("en-US");

  /* ---- copy helper + toast ---- */
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

  /* ---- full income / scenario model ---- */
  (function income() {
    const wrap = $("#incomeModel");
    if (!wrap || !D.incomeModel) return;
    const S = D.incomeModel.sources, per = D.incomeModel.perStream;
    const state = {};
    Object.keys(S).forEach((k) => (state[k] = S[k].value));
    const money = { spendPerFan: 1, syncAvg: 1, netPerShow: 1 };
    const controls = Object.keys(S)
      .map((k) => {
        const s = S[k];
        return `<label class="im-ctrl"><span class="im-l">${s.label} <b id="imv-${k}"></b></span><input type="range" id="im-${k}" min="${s.min}" max="${s.max}" step="${s.step}" value="${s.value}" aria-label="${s.label}" /></label>`;
      })
      .join("");
    wrap.innerHTML = `<div class="im-controls">${controls}</div>
      <div class="im-out">
        <div class="im-big"><span class="im-big-num" id="imTotal"></span><span class="im-big-l">projected annual income · all sources combined</span></div>
        <div class="im-stack" id="imStack"></div>
        <div class="im-rows" id="imRows"></div>
      </div>`;
    const seg = [
      { k: "streaming", label: "Streaming", cls: "reach" },
      { k: "d2c", label: "Direct-to-fan", cls: "revenue" },
      { k: "sync", label: "Sync / licensing", cls: "product" },
      { k: "live", label: "Live", cls: "foundation" }
    ];
    const calc = () => {
      const streaming = state.listeners * state.streamsPer * 12 * per;
      const d2c = state.trueFans * state.spendPerFan;
      const sync = state.syncPlacements * state.syncAvg;
      const live = state.shows * state.netPerShow;
      return { streaming: streaming, d2c: d2c, sync: sync, live: live, total: streaming + d2c + sync + live };
    };
    function render() {
      Object.keys(S).forEach((k) => {
        const b = $("#imv-" + k);
        if (!b) return;
        b.textContent = money[k] ? "$" + nfInt(state[k]) : k === "streamsPer" ? state[k].toFixed(1) : nfInt(state[k]);
      });
      const r = calc();
      $("#imTotal").textContent = "$" + nfInt(r.total);
      $("#imStack").innerHTML = seg
        .map((s) => {
          const pct = r.total ? (r[s.k] / r.total) * 100 : 0;
          return `<span class="im-seg ${s.cls}" style="width:${pct}%" title="${s.label}: $${nfInt(r[s.k])}"></span>`;
        })
        .join("");
      $("#imRows").innerHTML = seg
        .map((s) => {
          const pct = r.total ? Math.round((r[s.k] / r.total) * 100) : 0;
          return `<div class="im-row"><span class="im-sw ${s.cls}"></span><span class="im-row-l">${s.label}</span><span class="im-row-v">$${nfInt(r[s.k])}</span><span class="im-row-p">${pct}%</span></div>`;
        })
        .join("");
    }
    Object.keys(S).forEach((k) => $("#im-" + k).addEventListener("input", (e) => { state[k] = +e.target.value; render(); }));
    render();
  })();

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
  document.querySelectorAll(".section").forEach((s) => {
    s.classList.add("reveal");
    io.observe(s);
  });
})();
