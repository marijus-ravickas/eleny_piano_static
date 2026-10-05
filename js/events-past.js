// Client-side handling of events that are over (data-end in the past —
// see layouts/partials/event-over-at.html):
// - events list: move them from the upcoming list into the collapsed
//   "Past events" block, newest first
// - single event page: hide the call-to-action button
// - event thank-you page: short "also coming up" list, past rows dropped
(function () {
  var now = Date.now();
  function isOver(el) {
    var end = Date.parse(el.getAttribute("data-end"));
    return !isNaN(end) && end < now;
  }

  var cta = document.querySelector(".event-tickets[data-end]");
  if (cta && isOver(cta)) cta.hidden = true;

  var upcoming = document.getElementById("events-upcoming");
  var past = document.getElementById("events-past");
  if (!upcoming) return;

  // Short list with no Past block (event thank-you page): drop past rows,
  // keep the first data-limit, hide the whole section if none are left.
  if (!past) {
    var limit = parseInt(upcoming.getAttribute("data-limit"), 10) || Infinity;
    var shown = 0;
    upcoming.querySelectorAll(".event-row[data-end]").forEach(function (row) {
      if (isOver(row) || shown >= limit) row.remove(); else shown++;
    });
    if (!shown) {
      var heading = upcoming.previousElementSibling;
      if (heading && heading.tagName === "H2") heading.hidden = true;
      upcoming.hidden = true;
    }
    return;
  }

  var pastList = past.querySelector(".event-list");
  var rows = upcoming.querySelectorAll(".event-row[data-end]");
  // Rows are oldest-first; walk backwards so the past list ends up newest-first.
  for (var i = rows.length - 1; i >= 0; i--) {
    if (isOver(rows[i])) pastList.appendChild(rows[i]);
  }
  if (pastList.children.length) past.hidden = false;
  if (!upcoming.children.length) {
    upcoming.hidden = true;
    document.getElementById("events-none").hidden = false;
  }
})();
