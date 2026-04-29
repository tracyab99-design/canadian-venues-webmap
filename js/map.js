// Create the map inside the div with id="map"
var map = L.map('map').setView([43.6532, -79.3832], 8);

// Create the sidebar control
var sidebar = L.control.sidebar({
  container: 'sidebar',
  position: 'right'
});
sidebar.addTo(map);

// Open it on load
setTimeout(function () {
  sidebar.open('home');
}, 500);

// Add OpenStreetMap basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '\u00A9 OpenStreetMap contributors'
}).addTo(map);

// Layer group for venues
var venuesLayer = L.layerGroup();
venuesLayer.addTo(map);

// Load GeoJSON
fetch('./data/venues.geojson')
  .then(function (response) {
    if (!response.ok) {
      throw new Error('GeoJSON load failed: ' + response.status);
    }
    return response.json();
  })
  .then(function (data) {

    var geojsonLayer = L.geoJSON(data, {
      onEachFeature: function (feature, layer) {

        var name = '(Unnamed venue)';
        if (feature &&
            feature.properties &&
            feature.properties.venue_name) {
          name = feature.properties.venue_name;
        }

        layer.bindPopup('<strong>' + name + '</strong>');

        // Add to sidebar
        var homePane = document.getElementById('home');
        if (homePane) {
          var item = document.createElement('div');
          item.textContent = name;
          item.style.cursor = 'pointer';
          item.style.marginBottom = '6px';

          item.onclick = function () {
            map.setView(layer.getLatLng(), 15);
            layer.openPopup();
          };

          homePane.appendChild(item);
        }

        venuesLayer.addLayer(layer);
      }
    });

    // Search control (venue_name only)
    var searchControl = new L.Control.Search({
      layer: venuesLayer,
      propertyName: 'venue_name',
      marker: false,
      collapsed: false,
      position: 'topright',
      moveToLocation: function (latlng, title, mapRef) {
        mapRef.setView(latlng, 15);
      }
    });

    map.addControl(searchControl);

  })
  .catch(function (err) {
    console.error(err);
    alert(
      'ERROR loading map data.\n\n' +
      err.message +
      '\n\nOpen DevTools > Console for details.'
    );
  });
