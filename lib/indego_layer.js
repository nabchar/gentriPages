import stationData from './data/indego_stations';


let geojsonMarkerOptions = {
    radius: 5,
    fillColor: "blue",
    color: "#000",
    weight: 1,
    opacity: 3,
    fillOpacity: 0.8
};


const stationLayer = L.geoJson(stationData, {
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup(feature.properties.name);
  }
});

export default stationLayer;
