const grayscaleMap = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  maxZoom: 18 });

let geojsonMarkerOptions = {
    radius: 5,
    fillColor: "blue",
    color: "#000",
    weight: 1,
    opacity: 3,
    fillOpacity: 0.8
};

// function seedStations(feature, layer) {
//   // does this feature have a property named popupContent?
//   if (feature.properties && feature.properties.name) {
//     pointToLayer: function(feature, layer.latlng) {
//       return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup(feature.properties.name);
//     }
//   }
// }

const stationLayer = L.geoJson(stations, {
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup(feature.properties.name);
  }
});

const mymap = L.map('map', {
  center: [39.9526, -75.1652],
  zoom: 13,
  layers: [grayscaleMap, stationLayer]
});


$("#stationButton").click(() => {
  if(mymap.hasLayer(stationLayer)) {
    mymap.removeLayer(stationLayer);
  } else {
    mymap.addLayer(stationLayer);
  }
});
