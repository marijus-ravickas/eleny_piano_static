// Client-side handling of events that are over (data-end in the past —
// see layouts/partials/event-over-at.html):
// - events list: move them from the upcoming list into the collapsed
//   "Past events" block, newest first
// - single event page: hide the call-to-action button
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
  if (!upcoming || !past) return;
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
