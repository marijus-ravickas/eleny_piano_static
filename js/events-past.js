// Moves events that have already ended (data-end in the past) from the
// upcoming list into the collapsed "Past events" block, newest first.
// See layouts/events/list.html for how data-end is computed.
(function () {
  var upcoming = document.getElementById("events-upcoming");
  var past = document.getElementById("events-past");
  if (!upcoming || !past) return;
  var pastList = past.querySelector(".event-list");
  var now = Date.now();
  var rows = upcoming.querySelectorAll(".event-row[data-end]");
  // Rows are oldest-first; walk backwards so the past list ends up newest-first.
  for (var i = rows.length - 1; i >= 0; i--) {
    var end = Date.parse(rows[i].getAttribute("data-end"));
    if (!isNaN(end) && end < now) pastList.appendChild(rows[i]);
  }
  if (pastList.children.length) past.hidden = false;
  if (!upcoming.children.length) {
    upcoming.hidden = true;
    document.getElementById("events-none").hidden = false;
  }
})();
