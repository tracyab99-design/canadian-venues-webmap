// Create the map inside the div with id="map"
const map = L.map('map').setView([43.6532, -79.3832], 8);

// Create the sidebar control
const sidebar = L.control.sidebar({
  container: 'sidebar',
  position: 'right'
}).addTo(map);

// Open it on load (optional)
setTimeout(() => {
  sidebar.open('home');
}, 500);

// Add an OpenStreetMap basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// LayerGroup that will hold GeoJSON features
const venuesLayer = L.layerGroup().addTo(map);

// Load GeoJSON
fetch('./data/venues.geojson')
  .then(response => response.json())
  .then(data => {

    const geojson = L.geoJSON(data, {
      onEachFeature: function (feature, layer) {

        // Popup (simple for now)
        layer.bindPopup(
          `<strong>${feature.properties.venue_name}</strong>`
        );

        // Add venue to sidebar list
        const listItem = document.createElement('div');
        listItem.textContent = feature.properties.venue_name;
        listItem.style.cursor = 'pointer';
        listItem.style.marginBottom = '6px';

        listItem.onclick = () => {
          map.setView(layer.getLatLng(), 15);
          layer.openPopup();
        };

        document
          .querySelector('#home')
          .appendChild(listItem);
      }
    });

    // Add features to the shared layer
    geojson.eachLayer(layer => {
      venuesLayer.addLayer(layer);
    });

