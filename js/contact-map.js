document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('contact-map');
  if (!el) return;
  var lat = parseFloat(el.dataset.lat);
  var lng = parseFloat(el.dataset.lng);
  var map = L.map('contact-map', { scrollWheelZoom: false }).setView([lat, lng], 16);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);
  L.marker([lat, lng]).addTo(map).bindPopup(el.dataset.address);
});
