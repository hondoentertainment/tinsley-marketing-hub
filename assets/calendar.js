/* Tinsley show calendar — month grid + full official date list */
(function () {
  "use strict";
  if (typeof TINSLEY === "undefined") return;

  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  function todayISO() {
    var d = new Date();
    return isoFromParts(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function isoFromParts(y, m, day) {
    return y + "-" + String(m + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");
  }

  function parseISO(iso) {
    var p = String(iso || "").split("-");
    if (p.length < 3) return null;
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function formatWhen(iso) {
    var d = parseISO(iso);
    if (!d) return iso || "";
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  }

  function weekdayLong(iso) {
    var d = parseISO(iso);
    if (!d) return "";
    return d.toLocaleDateString("en-US", { weekday: "long" });
  }

  function normalize(raw, official) {
    var today = todayISO();
    return (raw || [])
      .filter(function (g) { return g && /^\d{4}-\d{2}-\d{2}$/.test(g.date); })
      .map(function (g) {
        var upcoming = g.date >= today;
        return {
          date: g.date,
          venue: g.venue || "",
          city: g.city || "",
          note: g.note || "",
          href: g.href || (upcoming ? official : ""),
          status: upcoming ? "upcoming" : "past",
          when: g.when || formatWhen(g.date)
        };
      })
      .sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
  }

  function byDate(shows) {
    var map = {};
    shows.forEach(function (g) {
      if (!map[g.date]) map[g.date] = [];
      map[g.date].push(g);
    });
    return map;
  }

  function yearsFrom(shows) {
    var set = {};
    shows.forEach(function (g) { set[g.date.slice(0, 4)] = true; });
    return Object.keys(set).sort(function (a, b) { return Number(b) - Number(a); });
  }

  function firstUpcoming(shows) {
    var today = todayISO();
    var next = null;
    shows.forEach(function (g) {
      if (g.date >= today && (!next || g.date < next.date)) next = g;
    });
    return next;
  }

  function matchesFilter(show, filter) {
    if (filter === "upcoming") return show.status === "upcoming";
    if (filter === "past") return show.status === "past";
    return true;
  }

  function renderShowCard(g, official) {
    var href = g.href || official;
    var body =
      '<div class="tcal-card-when">' + esc(g.when) + '</div>' +
      '<div class="tcal-card-venue">' + esc(g.venue) + '</div>' +
      '<div class="tcal-card-city">' + esc(g.city) + (g.status === "upcoming" ? " · Upcoming" : "") + '</div>' +
      (g.note ? '<p>' + esc(g.note) + '</p>' : "");
    if (g.status === "upcoming" && href) {
      return '<li class="tcal-card upcoming" id="show-' + esc(g.date) + '"><a href="' + esc(href) + '" target="_blank" rel="noopener">' + body + '</a></li>';
    }
    return '<li class="tcal-card past" id="show-' + esc(g.date) + '">' + body + '</li>';
  }

  function mount(root, opts) {
    if (!root) return;
    opts = opts || {};
    var page = TINSLEY.showsPage || {};
    var official = opts.official || page.calendarUrl || "https://www.tinsleymusic.com/shows";
    var shows = normalize(opts.dates || page.dates, official);
    if (!shows.length) {
      root.innerHTML = '<p class="tcal-empty">No dates loaded.</p>';
      return;
    }

    var lookup = byDate(shows);
    var years = yearsFrom(shows);
    var upcomingN = shows.filter(function (g) { return g.status === "upcoming"; }).length;
    var next = firstUpcoming(shows);
    var today = todayISO();
    var start = next ? parseISO(next.date) : new Date();
    var view = { y: start.getFullYear(), m: start.getMonth() };
    var filter = upcomingN ? "upcoming" : "all";
    var selected = next ? next.date : today;

    function setViewFromISO(iso) {
      var d = parseISO(iso);
      if (!d) return;
      view.y = d.getFullYear();
      view.m = d.getMonth();
    }

    function jumpYear(year) {
      var inYear = shows.filter(function (g) { return g.date.slice(0, 4) === year && matchesFilter(g, filter); });
      if (!inYear.length) inYear = shows.filter(function (g) { return g.date.slice(0, 4) === year; });
      if (inYear.length) {
        selected = inYear[0].date;
        setViewFromISO(selected);
      } else {
        view.y = Number(year);
        view.m = 0;
      }
      draw();
    }

    function draw() {
      var monthShows = {};
      var prefix = view.y + "-" + String(view.m + 1).padStart(2, "0");
      Object.keys(lookup).forEach(function (iso) {
        if (iso.slice(0, 7) === prefix) monthShows[iso] = lookup[iso];
      });

      var first = new Date(view.y, view.m, 1);
      var startPad = first.getDay();
      var dim = new Date(view.y, view.m + 1, 0).getDate();
      var cells = "";
      var i;
      for (i = 0; i < startPad; i++) cells += '<span class="tcal-cell empty" aria-hidden="true"></span>';
      for (i = 1; i <= dim; i++) {
        var iso = isoFromParts(view.y, view.m, i);
        var dayShows = (lookup[iso] || []).filter(function (g) { return matchesFilter(g, filter); });
        var hiddenShows = (lookup[iso] || []).length && !dayShows.length;
        var isToday = iso === today;
        var isSel = iso === selected;
        var cls = "tcal-cell";
        if (dayShows.length) cls += " has-show " + dayShows[0].status;
        if (hiddenShows) cls += " muted-show";
        if (isToday) cls += " is-today";
        if (isSel) cls += " is-selected";
        var label = weekdayLong(iso) + ", " + formatWhen(iso);
        if (lookup[iso]) {
          label += ". " + lookup[iso].map(function (g) { return g.venue + ", " + g.city; }).join("; ");
        }
        cells +=
          '<button type="button" class="' + cls + '" data-iso="' + iso + '"' +
          (isToday ? ' aria-current="date"' : "") +
          (isSel ? ' aria-pressed="true"' : ' aria-pressed="false"') +
          ' aria-label="' + esc(label) + '">' +
          '<span class="tcal-num">' + i + "</span>" +
          (dayShows.length ? '<span class="tcal-dot" aria-hidden="true"></span>' : "") +
          "</button>";
      }

      var selShows = (lookup[selected] || []).filter(function (g) { return matchesFilter(g, filter); });
      if (!selShows.length && lookup[selected]) selShows = lookup[selected];
      var detail = selShows.length
        ? '<ul class="tcal-cards">' + selShows.map(function (g) { return renderShowCard(g, official); }).join("") + "</ul>"
        : '<p class="tcal-empty">No show on ' + esc(formatWhen(selected)) + ". Pick a marked day or jump a year.</p>";

      var listShows = shows.filter(function (g) { return matchesFilter(g, filter); });
      var grouped = "";
      var lastYear = "";
      listShows.forEach(function (g) {
        var y = g.date.slice(0, 4);
        if (y !== lastYear) {
          if (lastYear) grouped += "</ul>";
          grouped += '<h3 class="tcal-year-h" id="cal-year-' + y + '">' + y + "</h3><ul class=\"tcal-cards\">";
          lastYear = y;
        }
        grouped += renderShowCard(g, official);
      });
      if (lastYear) grouped += "</ul>";

      var yearChips = years.map(function (y) {
        return '<button type="button" class="tcal-chip' + (String(view.y) === y ? " is-on" : "") + '" data-year="' + y + '">' + y + "</button>";
      }).join("");

      var filters = [
        ["upcoming", "Upcoming (" + upcomingN + ")"],
        ["past", "Past (" + (shows.length - upcomingN) + ")"],
        ["all", "All (" + shows.length + ")"]
      ].map(function (f) {
        return '<button type="button" class="tcal-chip' + (filter === f[0] ? " is-on" : "") + '" data-filter="' + f[0] + '">' + esc(f[1]) + "</button>";
      }).join("");

      var range = years.length ? years[years.length - 1] + "–" + years[0] : "";

      root.innerHTML =
        '<div class="tcal-stats">' +
          '<strong>' + upcomingN + '</strong> upcoming · <strong>' + (shows.length - upcomingN) + '</strong> past · official archive ' + esc(range) +
        "</div>" +
        '<div class="tcal-toolbar">' +
          '<div class="tcal-nav">' +
            '<button type="button" class="tcal-icon" data-nav="-1" aria-label="Previous month">‹</button>' +
            '<h3 class="tcal-month">' + MONTHS[view.m] + " " + view.y + "</h3>" +
            '<button type="button" class="tcal-icon" data-nav="1" aria-label="Next month">›</button>' +
          "</div>" +
          '<div class="tcal-filters" role="group" aria-label="Show filter">' + filters +
            '<button type="button" class="tcal-chip" data-today="1">Today</button>' +
          "</div>" +
        "</div>" +
        '<div class="tcal-years" role="navigation" aria-label="Jump to year">' + yearChips + "</div>" +
        '<div class="tcal-body">' +
          '<div class="tcal-month-wrap">' +
            '<div class="tcal-dow">' + DAYS.map(function (d) { return "<span>" + d + "</span>"; }).join("") + "</div>" +
            '<div class="tcal-grid" role="grid" aria-label="' + esc(MONTHS[view.m] + " " + view.y) + '">' + cells + "</div>" +
          "</div>" +
          '<div class="tcal-detail">' +
            '<h3 class="tcal-detail-h">Selected day</h3>' +
            detail +
          "</div>" +
        "</div>" +
        '<div class="tcal-list-wrap">' +
          '<h3 class="tcal-list-h">' + (filter === "upcoming" ? "Upcoming dates" : filter === "past" ? "Past dates" : "All dates") + "</h3>" +
          '<div class="tcal-list">' + grouped + "</div>" +
        "</div>";

      root.querySelectorAll("[data-nav]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          view.m += Number(btn.getAttribute("data-nav"));
          if (view.m < 0) { view.m = 11; view.y -= 1; }
          if (view.m > 11) { view.m = 0; view.y += 1; }
          draw();
        });
      });
      root.querySelectorAll("[data-filter]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          filter = btn.getAttribute("data-filter");
          draw();
        });
      });
      root.querySelectorAll("[data-year]").forEach(function (btn) {
        btn.addEventListener("click", function () { jumpYear(btn.getAttribute("data-year")); });
      });
      var todayBtn = root.querySelector("[data-today]");
      if (todayBtn) {
        todayBtn.addEventListener("click", function () {
          selected = today;
          setViewFromISO(today);
          draw();
        });
      }
      root.querySelectorAll(".tcal-cell[data-iso]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          selected = btn.getAttribute("data-iso");
          draw();
          var card = root.querySelector("#show-" + selected);
          if (card) card.scrollIntoView({ block: "nearest", behavior: "smooth" });
        });
      });
    }

    var hash = (location.hash || "").replace("#show-", "").replace("#", "");
    if (/^\d{4}-\d{2}-\d{2}$/.test(hash) && lookup[hash]) {
      selected = hash;
      setViewFromISO(hash);
      filter = "all";
    }

    draw();
  }

  window.TinsleyCalendar = { mount: mount, formatWhen: formatWhen };

  document.querySelectorAll("[data-tcal]").forEach(function (el) {
    mount(el);
  });
})();
