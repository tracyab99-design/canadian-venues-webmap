```js
// Create the map inside the div with id="map"
const map = L.map('map').setView([56.1304, -106.3468], 4);

// Add an OpenStreetMap basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '\u00A9 OpenStreetMap contributors'
}).addTo(map);

// Optional test marker
L.marker([51.0447, -114.0719]).addTo(map)
  .bindPopup('Hello from Calgary 👋');
