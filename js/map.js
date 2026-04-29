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

// Add search control (UI only for now)
const searchControl = new L.Control.Search({
  layer: searchLayer,
  propertyName: 'name',  // placeholder for future data
  marker: false,
  moveToLocation: null,
  collapsed: false,
  position: 'topright'
});

map.addControl(searchControl);

// Add an OpenStreetMap basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '\u00A9 OpenStreetMap contributors'
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
        listItem.innerHTML = feature.properties.venue_name;
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

    // ---- SEARCH CONTROL ----
    const searchControl = new L.Control.Search({
      layer: venuesLayer,
      propertyName: 'venue_name',   // ✅ ONLY searches venue name
      marker: false,
      moveToLocation: function (latlng, title, map) {
        map.setView(latlng, 15);
      },
      collapsed: false,
      position: 'topright'
    });

    map.addControl(searchControl);
  });
// Optional test marker
L.marker([43.6532, -79.3832]).addTo(map)
  .bindPopup('Toronto');
