// Create the map in the 'map' div
const map = L.map('map').setView([56.1304, -106.3468], 4);

// Add an OpenStreetMap tile layer (basemap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map
