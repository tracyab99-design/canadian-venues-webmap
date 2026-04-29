// Create the map inside the div with id="map"
const map = L.map('map').setView([43.6532, -79.3832], 8);

// Create the sidebar control
const sidebar = L.control.sidebar({
  container: 'sidebar',
  position: 'left'
}).addTo(map);

// Open it on load (optional)
setTimeout(() => {
  sidebar.open('home');
}, 500);
// Empty layer group for future searchable features
const searchLayer = L.layerGroup().addTo(map);

// Add search control (UI only for now)
const searchControl = new L.Control.Search({
  layer: searchLayer,
  propertyName: 'name',  // placeholder for future data
  marker: false,
  moveToLocation: null,
  collapsed: false
});

map.addControl(searchControl);

// Add an OpenStreetMap basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '\u00A9 OpenStreetMap contributors'
}).addTo(map);

// Optional test marker
L.marker([43.6532, -79.3832]).addTo(map)
  .bindPopup('Toronto');
