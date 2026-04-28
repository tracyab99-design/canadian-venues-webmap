// Create the map inside the div with id="map"
const map = L.map('map').setView([43.6532, -79.3832], 8);

// Add an OpenStreetMap basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '\u00A9 OpenStreetMap contributors'
}).addTo(map);

// Optional test marker
L.marker([43.6532, -79.3832]).addTo(map)
  .bindPopup('Toronto');
