document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('contact-map');
  if (!el) return;
  var lat = parseFloat(el.dataset.lat);
  var lng = parseFloat(el.dataset.lng);
  var map = L.map('contact-map', { scrollWheelZoom: false }).setView([lat, lng], 16);
  // Leaflet's default attribution prefix includes a 🇺🇦 flag emoji (added in
  // solidarity with Ukraine since v1.9) — keep the Leaflet credit, drop the flag.
  map.attributionControl.setPrefix('<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 20,
    subdomains: 'abcd'
  }).addTo(map);
  L.marker([lat, lng]).addTo(map).bindPopup(el.dataset.address);
});
