document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('contact-map');
  if (!el) return;
  var lat = parseFloat(el.dataset.lat);
  var lng = parseFloat(el.dataset.lng);
  var map = L.map('contact-map', { scrollWheelZoom: false }).setView([lat, lng], 16);
  // Leaflet's default attribution prefix includes a 🇺🇦 flag emoji (added in
  // solidarity with Ukraine since v1.9) — keep the Leaflet credit, drop the flag.
  map.attributionControl.setPrefix('<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');
  // CARTO's free anonymous basemap CDN (basemaps.cartocdn.com) started
  // requiring an API key -- it now serves a 200 response whose image
  // content is just a watermark saying so, not a real tile. Standard
  // OSM tiles stay genuinely free/keyless, matching the original
  // no-API-key decision (CLAUDE.md Section 6).
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    subdomains: 'abc'
  }).addTo(map);
  L.marker([lat, lng]).addTo(map).bindPopup(el.dataset.address);
});
