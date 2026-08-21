/* ============ Tinsley Tour Desk — self-booking OS ============ */
(function () {
  "use strict";
  if (typeof TINSLEY === "undefined") return;
  const D = TINSLEY;
  const T = D.tourDesk || {};
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
  function money(n) {
    const v = Number(n) || 0;
    const sign = v < 0 ? "−" : "";
    return sign + "$" + Math.abs(Math.round(v)).toLocaleString("en-US");
  }
  function num(el) {
    return Number(el && el.value) || 0;
  }

  /* ---- Next show ---- */
  (function nextShow() {
    const wrap = $("#tourNext");
    const S = T.nextShow;
    if (!wrap || !S) return;
    const sheet = (S.daySheet || [])
      .map((row) => `<li><span class="tour-time">${esc(row.t)}</span><span>${esc(row.item)}</span></li>`)
      .join("");
    const bill = (S.bill || []).join(" · ");
    const dayText = [
      "TINSLEY — DAY SHEET",
      S.when + " · " + S.title,
      S.venue + " — " + S.address,
      "Doors " + S.doors + " · Show " + S.show + " · " + S.age,
      "Bill: " + bill,
      "",
      "RUN OF SHOW",
      ...(S.daySheet || []).map((row) => row.t + " — " + row.item),
      "",
      S.notes || "",
      "Tickets: " + (S.tickets || "")
    ].join("\n");

    wrap.innerHTML = `
      <article class="tour-next">
        <div class="tour-next-top">
          <div>
            <p class="ops-day">${esc(S.when)}</p>
            <h3>${esc(S.title)} · ${esc(S.venue)}</h3>
            <p class="ops-muted">${esc(S.address)}</p>
            <p>Doors ${esc(S.doors)} · Show ${esc(S.show)} · ${esc(S.age)}</p>
            <p class="tour-bill">${esc(bill)}</p>
          </div>
          <div class="tour-next-meta">
            <span class="ops-price">Upcoming</span>
            <p>${esc(S.notes || "")}</p>
          </div>
        </div>
        <ol class="tour-sheet">${sheet}</ol>
        <div class="ops-row-actions">
          <button type="button" class="btn btn-primary" id="copyDaySheet">Copy day sheet</button>
          <a class="btn" href="${esc(S.tickets)}" target="_blank" rel="noopener">Official tickets ↗</a>
          <a class="btn" href="today.html">Friday sheet</a>
          <a class="btn" href="#calendar">Show calendar</a>
          <a class="btn" href="#advance">Run advance list</a>
        </div>
      </article>`;
    $("#copyDaySheet").addEventListener("click", () => copy(dayText, "Day sheet copied"));
  })();

  /* ---- Advance checklist ---- */
  (function advance() {
    const wrap = $("#tourAdvance");
    if (!wrap || !T.advance) return;
    const KEY = "tinsley.tour.advance.v1";
    let store = load(KEY, {});

    function render() {
      let done = 0;
      let total = 0;
      const cols = T.advance
        .map((phase) => {
          const items = (phase.items || [])
            .map((it) => {
              const id = phase.id + "::" + it.id;
              total += 1;
              const on = !!store[id];
              if (on) done += 1;
              return `<li class="ops-check${on ? " on" : ""}" data-id="${esc(id)}">
                <button type="button" class="ops-tick" aria-pressed="${on}"></button>
                <span>${esc(it.text)}</span>
              </li>`;
            })
            .join("");
          return `<article class="ops-ritual-card">
            <div class="ops-ritual-h"><span class="ops-day">${esc(phase.label)}</span></div>
            <ul class="ops-check-list">${items}</ul>
          </article>`;
        })
        .join("");
      const pct = total ? Math.round((done / total) * 100) : 0;
      wrap.innerHTML = `
        <p class="ops-cadence">${done}/${total} advance tasks · ${pct}%</p>
        <div class="ops-ritual-grid">${cols}</div>
        <div class="ops-row-actions">
          <button type="button" class="btn btn-primary" id="copyAdvanceEmail">Copy advance email</button>
          <button type="button" class="btn" id="resetAdvance">Clear checks</button>
        </div>
        <p class="ops-hint">Paste the email into a hold reply. Swap {name}, {date}, and {venue}.</p>`;
      wrap.querySelectorAll(".ops-check").forEach((li) => {
        li.querySelector("button").addEventListener("click", () => {
          const id = li.getAttribute("data-id");
          if (store[id]) delete store[id];
          else store[id] = true;
          save(KEY, store);
          render();
        });
      });
      $("#copyAdvanceEmail").addEventListener("click", () => {
        const ns = T.nextShow || {};
        const text = String(T.advanceEmail || "")
          .replace("{name}", "there")
          .replace("{date}", ns.when || "DATE")
          .replace("{venue}", ns.venue || "VENUE");
        copy(text, "Advance email copied");
      });
      $("#resetAdvance").addEventListener("click", () => {
        store = {};
        save(KEY, store);
        render();
        showToast("Advance list cleared");
      });
    }
    render();
  })();

  /* ---- Settlement ---- */
  (function settle() {
    const wrap = $("#tourSettle");
    if (!wrap) return;
    const KEY = "tinsley.tour.deal.v1";
    const defaults = Object.assign({}, T.deal || {}, load(KEY, {}));

    function field(id, label, val) {
      return `<label>${esc(label)}<input class="ops-input" id="${id}" type="number" min="0" step="1" value="${esc(val)}" /></label>`;
    }

    wrap.innerHTML = `
      <div class="ops-review-grid tour-deal-grid">
        ${field("dealG", "Guarantee ($)", defaults.guarantee)}
        ${field("dealSplit", "Door split to you (%)", defaults.doorSplit)}
        ${field("dealTix", "Tickets sold", defaults.tickets)}
        ${field("dealPrice", "Ticket price ($)", defaults.ticketPrice)}
        ${field("dealMerch", "Merch gross ($)", defaults.merch)}
        ${field("dealCogs", "Merch cost ($)", defaults.merchCogs)}
        ${field("dealTravel", "Travel / gas ($)", defaults.travel)}
        ${field("dealLodge", "Lodging ($)", defaults.lodging)}
        ${field("dealOther", "Other costs ($)", defaults.other)}
      </div>
      <div class="tour-math" id="dealMath"></div>
      <div class="ops-row-actions">
        <button type="button" class="btn btn-primary" id="copyDeal">Copy settlement</button>
      </div>`;

    function read() {
      return {
        guarantee: num($("#dealG")),
        doorSplit: num($("#dealSplit")),
        tickets: num($("#dealTix")),
        ticketPrice: num($("#dealPrice")),
        merch: num($("#dealMerch")),
        merchCogs: num($("#dealCogs")),
        travel: num($("#dealTravel")),
        lodging: num($("#dealLodge")),
        other: num($("#dealOther"))
      };
    }
    function calc(d) {
      const doorGross = d.tickets * d.ticketPrice;
      const doorPay = doorGross * (d.doorSplit / 100);
      const livePay = Math.max(d.guarantee, doorPay);
      const dealKind = doorPay > d.guarantee ? "vs door wins" : "guarantee holds";
      const merchNet = d.merch - d.merchCogs;
      const costs = d.travel + d.lodging + d.other;
      const night = livePay + merchNet - costs;
      return { doorGross, doorPay, livePay, dealKind, merchNet, costs, night };
    }
    function renderMath() {
      const d = read();
      save(KEY, d);
      const m = calc(d);
      $("#dealMath").innerHTML = `
        <article class="ops-desk-card">
          <span class="ops-strip-h">Door gross</span>
          <h3>${money(m.doorGross)}</h3>
          <p class="ops-muted">${d.tickets} × ${money(d.ticketPrice)}</p>
        </article>
        <article class="ops-desk-card">
          <span class="ops-strip-h">Live pay · ${esc(m.dealKind)}</span>
          <h3>${money(m.livePay)}</h3>
          <p class="ops-muted">Guarantee ${money(d.guarantee)} vs ${d.doorSplit}% of door (${money(m.doorPay)})</p>
        </article>
        <article class="ops-desk-card">
          <span class="ops-strip-h">Merch net</span>
          <h3>${money(m.merchNet)}</h3>
          <p class="ops-muted">${money(d.merch)} gross − ${money(d.merchCogs)} cost</p>
        </article>
        <article class="ops-desk-card ${m.night >= 0 ? "tour-win" : "tour-loss"}">
          <span class="ops-strip-h">Night net</span>
          <h3>${money(m.night)}</h3>
          <p class="ops-muted">Live + merch − ${money(m.costs)} costs</p>
        </article>`;
    }
    wrap.querySelectorAll("input").forEach((inp) => inp.addEventListener("input", renderMath));
    $("#copyDeal").addEventListener("click", () => {
      const d = read();
      const m = calc(d);
      copy(
        [
          "TINSLEY — SETTLEMENT",
          "Door gross: " + money(m.doorGross),
          "Live pay (" + m.dealKind + "): " + money(m.livePay),
          "Merch net: " + money(m.merchNet),
          "Costs: " + money(m.costs),
          "Night net: " + money(m.night)
        ].join("\n"),
        "Settlement copied"
      );
    });
    renderMath();
  })();

  /* ---- Holds CRM ---- */
  (function holds() {
    const wrap = $("#tourHolds");
    if (!wrap) return;
    const KEY = "tinsley.tour.holds.v1";
    const seed = [
      {
        id: "hh-aug28",
        venue: "Hidden Hall",
        market: "Seattle",
        window: "2026-08-28",
        status: "confirm",
        note: "Femme Friday — Girl Parallel, Veronica North"
      }
    ];
    let rows = load(KEY, seed);
    const statuses = ["research", "hold", "offer", "confirm", "pass"];

    function render() {
      const body = rows
        .map((r, i) => {
          const opts = statuses
            .map((s) => `<option value="${s}"${r.status === s ? " selected" : ""}>${s}</option>`)
            .join("");
          return `<tr data-i="${i}">
            <td><input class="ops-input hold-venue" value="${esc(r.venue)}" /></td>
            <td><input class="ops-input hold-market" value="${esc(r.market)}" /></td>
            <td><input class="ops-input hold-window" type="text" value="${esc(r.window)}" placeholder="2026-10 or date" /></td>
            <td><select class="ops-select hold-status">${opts}</select></td>
            <td><input class="ops-input hold-note" value="${esc(r.note || "")}" /></td>
            <td><button type="button" class="btn hold-del">Remove</button></td>
          </tr>`;
        })
        .join("");
      wrap.innerHTML = `
        <p class="ops-hint">A <strong>hold</strong> is a penciled date. An <strong>offer</strong> has money or a door deal. Confirm only when it’s in writing.</p>
        <div class="ops-table-wrap"><table class="ops-table">
          <thead><tr><th>Venue</th><th>Market</th><th>Window</th><th>Status</th><th>Note</th><th></th></tr></thead>
          <tbody>${body}</tbody>
        </table></div>
        <div class="hold-add">
          <input class="ops-input" id="holdVenue" placeholder="Venue" />
          <input class="ops-input" id="holdMarket" placeholder="Market" />
          <input class="ops-input" id="holdWindow" placeholder="Date window" />
          <button type="button" class="btn btn-primary" id="holdAdd">Add hold</button>
        </div>`;
      wrap.querySelectorAll("tbody tr").forEach((tr) => {
        const i = Number(tr.getAttribute("data-i"));
        const sync = () => {
          rows[i] = {
            id: rows[i].id || "hold-" + Date.now(),
            venue: tr.querySelector(".hold-venue").value,
            market: tr.querySelector(".hold-market").value,
            window: tr.querySelector(".hold-window").value,
            status: tr.querySelector(".hold-status").value,
            note: tr.querySelector(".hold-note").value
          };
          save(KEY, rows);
        };
        tr.querySelectorAll("input, select").forEach((el) => el.addEventListener("change", sync));
        tr.querySelectorAll("input").forEach((el) => el.addEventListener("blur", sync));
        tr.querySelector(".hold-del").addEventListener("click", () => {
          rows.splice(i, 1);
          save(KEY, rows);
          render();
        });
      });
      $("#holdAdd").addEventListener("click", () => {
        const venue = ($("#holdVenue").value || "").trim();
        if (!venue) return showToast("Add a venue name");
        rows.push({
          id: "hold-" + Date.now(),
          venue: venue,
          market: ($("#holdMarket").value || "").trim(),
          window: ($("#holdWindow").value || "").trim(),
          status: "research",
          note: ""
        });
        save(KEY, rows);
        render();
      });
    }
    render();
  })();

  /* ---- Shared status table ---- */
  function statusTable(wrapId, list, key, cols) {
    const wrap = $(wrapId);
    if (!wrap || !list) return;
    let store = load(key, {});
    const statuses = cols.statuses;

    function render() {
      const rows = list
        .map((row) => {
          const rec = store[row.id] || { status: cols.defaultStatus, note: "" };
          const opts = statuses
            .map((s) => `<option value="${s}"${rec.status === s ? " selected" : ""}>${s}</option>`)
            .join("");
          return `<tr data-id="${esc(row.id)}">
            <td><strong>${esc(row.name)}</strong><div class="ops-muted">${esc(row.sub)}</div></td>
            <td class="ops-muted">${esc(row.detail)}</td>
            <td><select class="ops-select tour-status">${opts}</select></td>
            <td><input class="ops-input tour-note" type="text" placeholder="Next move" value="${esc(rec.note || "")}" /></td>
          </tr>`;
        })
        .join("");
      wrap.innerHTML = `
        <p class="ops-hint">${esc(cols.hint)}</p>
        <div class="ops-table-wrap"><table class="ops-table">
          <thead><tr><th>${esc(cols.h1)}</th><th>${esc(cols.h2)}</th><th>Status</th><th>Next</th></tr></thead>
          <tbody>${rows}</tbody>
        </table></div>`;
      wrap.querySelectorAll("tbody tr").forEach((tr) => {
        const id = tr.getAttribute("data-id");
        const sync = () => {
          store[id] = {
            status: tr.querySelector(".tour-status").value,
            note: tr.querySelector(".tour-note").value
          };
          save(key, store);
        };
        tr.querySelector(".tour-status").addEventListener("change", sync);
        tr.querySelector(".tour-note").addEventListener("change", sync);
      });
    }
    render();
  }

  statusTable(
    "#tourVenues",
    (T.venues || []).map((v) => ({
      id: v.id,
      name: v.name,
      sub: v.city + " · ~" + v.cap + " cap · Priority " + v.priority,
      detail: v.fit
    })),
    "tinsley.tour.venues.v1",
    {
      hint: "Start with rooms that already have proof. A cold 400-cap ask without a 200-cap return is how holds die.",
      h1: "Room",
      h2: "Why this room",
      statuses: ["watch", "asked", "hold", "played", "pass"],
      defaultStatus: "watch"
    }
  );

  statusTable(
    "#tourAsks",
    (T.supportAsks || []).map((v) => ({
      id: v.id,
      name: v.name,
      sub: v.lane + " · " + v.reach,
      detail: v.ask
    })),
    "tinsley.tour.asks.v1",
    {
      hint: "Now / Warm first. Stretch asks need a real date on the hold board — attach the one-pager, don’t send a vibe.",
      h1: "Artist",
      h2: "The ask",
      statuses: ["next", "drafted", "sent", "warm", "pass"],
      defaultStatus: "next"
    }
  );

  statusTable(
    "#tourFests",
    (T.festivals || []).map((v) => ({
      id: v.id,
      name: v.name,
      sub: v.when + " · Apply " + v.window,
      detail: v.next
    })),
    "tinsley.tour.fests.v1",
    {
      hint: "Hometown and alumni rooms first. A festival is a routing tool, not a personality.",
      h1: "Festival",
      h2: "This year’s move",
      statuses: ["later", "prep", "submitted", "wait", "pass"],
      defaultStatus: "later"
    }
  );

  /* ---- Show kit ---- */
  (function kit() {
    const wrap = $("#tourKit");
    const K = T.kit;
    if (!wrap || !K) return;
    const merch = (K.merch || [])
      .map((m) => `<li><strong>${esc(m.item)}</strong> · ${money(m.price)} · pack ${m.pack}</li>`)
      .join("");
    const support = (K.sets.support || []).map((s, i) => `<li>${i + 1}. ${esc(s)}</li>`).join("");
    const headline = (K.sets.headline || []).map((s, i) => `<li>${i + 1}. ${esc(s)}</li>`).join("");
    const kitText = [
      "TINSLEY — SHOW KIT",
      "",
      "TECH",
      ...(K.tech || []).map((l) => "• " + l),
      "",
      "HOSPITALITY",
      ...(K.hospitality || []).map((l) => "• " + l),
      "",
      "MERCH PACK",
      ...(K.merch || []).map((m) => "• " + m.item + " · $" + m.price + " · pack " + m.pack),
      "",
      "SUPPORT SET",
      ...(K.sets.support || []).map((s, i) => i + 1 + ". " + s),
      "",
      "HEADLINE SET",
      ...(K.sets.headline || []).map((s, i) => i + 1 + ". " + s)
    ].join("\n");

    wrap.innerHTML = `
      <div class="ops-two">
        <article class="ops-onepager">
          <h3>Tech rider</h3>
          <ul class="ops-plain">${(K.tech || []).map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
        </article>
        <article class="ops-onepager">
          <h3>Hospitality</h3>
          <ul class="ops-plain">${(K.hospitality || []).map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
        </article>
      </div>
      <div class="ops-two" style="margin-top:18px">
        <article class="ops-onepager">
          <h3>Merch pack</h3>
          <ul class="ops-plain">${merch}</ul>
        </article>
        <article class="ops-onepager">
          <h3>Setlists</h3>
          <h4 class="ops-subh" style="margin-top:0">Support · 30–40</h4>
          <ol class="ops-plain">${support}</ol>
          <h4 class="ops-subh">Headline · 60+</h4>
          <ol class="ops-plain">${headline}</ol>
        </article>
      </div>
      <div class="ops-row-actions">
        <button type="button" class="btn btn-primary" id="copyKit">Copy show kit</button>
        <a class="btn" href="tinsley-ops.html#live-routing">Support one-pager</a>
      </div>`;
    $("#copyKit").addEventListener("click", () => copy(kitText, "Show kit copied"));
  })();

  /* ---- Regional run ---- */
  (function run() {
    const wrap = $("#tourRun");
    if (!wrap) return;
    const KEY = "tinsley.tour.run.v1";
    const defaults = Object.assign({}, T.run || {}, load(KEY, {}));
    const field = (id, label, val) =>
      `<label>${esc(label)}<input class="ops-input" id="${id}" type="number" min="0" step="1" value="${esc(val)}" /></label>`;

    wrap.innerHTML = `
      <div class="ops-review-grid tour-deal-grid">
        ${field("runDates", "Dates on the run", defaults.dates)}
        ${field("runG", "Avg guarantee / night ($)", defaults.guarantee)}
        ${field("runMerch", "Avg merch / night ($)", defaults.merch)}
        ${field("runCogs", "Merch cost / night ($)", defaults.merchCogs)}
        ${field("runGas", "Gas / night ($)", defaults.gas)}
        ${field("runLodge", "Lodging / night ($)", defaults.lodging)}
        ${field("runFood", "Food / night ($)", defaults.food)}
        ${field("runMiles", "Miles / night (note)", defaults.miles)}
      </div>
      <div class="tour-math" id="runMath"></div>
      <p class="ops-hint">A run is worth leaving town when night net stays positive after beds and gas — or when a support slot clearly buys the next room. Otherwise stay hometown and stack Hidden Hall / Barboza / Tractor.</p>
      <div class="ops-row-actions">
        <button type="button" class="btn btn-primary" id="copyRun">Copy run sketch</button>
        <a class="btn" href="shows.html">Shows draft</a>
      </div>`;

    function read() {
      return {
        dates: num($("#runDates")),
        guarantee: num($("#runG")),
        merch: num($("#runMerch")),
        merchCogs: num($("#runCogs")),
        gas: num($("#runGas")),
        lodging: num($("#runLodge")),
        food: num($("#runFood")),
        miles: num($("#runMiles"))
      };
    }
    function calc(d) {
      const nightIn = d.guarantee + d.merch - d.merchCogs;
      const nightOut = d.gas + d.lodging + d.food;
      const night = nightIn - nightOut;
      return { nightIn, nightOut, night, run: night * d.dates };
    }
    function renderMath() {
      const d = read();
      save(KEY, d);
      const m = calc(d);
      $("#runMath").innerHTML = `
        <article class="ops-desk-card">
          <span class="ops-strip-h">In / night</span>
          <h3>${money(m.nightIn)}</h3>
          <p class="ops-muted">Guarantee + merch net</p>
        </article>
        <article class="ops-desk-card">
          <span class="ops-strip-h">Out / night</span>
          <h3>${money(m.nightOut)}</h3>
          <p class="ops-muted">Gas + bed + food · ${d.miles} mi note</p>
        </article>
        <article class="ops-desk-card ${m.night >= 0 ? "tour-win" : "tour-loss"}">
          <span class="ops-strip-h">Net / night</span>
          <h3>${money(m.night)}</h3>
          <p class="ops-muted">${d.dates} dates</p>
        </article>
        <article class="ops-desk-card ${m.run >= 0 ? "tour-win" : "tour-loss"}">
          <span class="ops-strip-h">Run net</span>
          <h3>${money(m.run)}</h3>
          <p class="ops-muted">${d.dates} × ${money(m.night)}</p>
        </article>`;
    }
    wrap.querySelectorAll("input").forEach((inp) => inp.addEventListener("input", renderMath));
    $("#copyRun").addEventListener("click", () => {
      const d = read();
      const m = calc(d);
      copy(
        [
          "TINSLEY — REGIONAL RUN",
          d.dates + " dates",
          "In / night: " + money(m.nightIn),
          "Out / night: " + money(m.nightOut),
          "Net / night: " + money(m.night),
          "Run net: " + money(m.run)
        ].join("\n"),
        "Run sketch copied"
      );
    });
    renderMath();
  })();

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
