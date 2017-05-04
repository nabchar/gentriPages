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

const stationLayer = L.geoJson(stations, {
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup(feature.properties.name);
  }
});

const incomeLayer = L.geoJson(income_data, {
  style: function(feature) {
    let median_income = feature.properties.B19013001;
    return {
        fillColor: getColor(median_income),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.3
    };
  },
  onEachFeature: seedListeners
});

function getColor(median_income) {
  return   median_income > 100000   ? '#a54960' :
           median_income > 80000    ? '#d14a61' :
           median_income > 70000    ? '#e95d59' :
           median_income > 60000    ? '#fd8165' :
           median_income > 40000    ? '#fbac70' :
           median_income > 20000    ? '#fde299' :
                                      '#fdefb5';
};

const mymap = L.map('map', {
  center: [39.9526, -75.1652],
  zoom: 13,
  layers: [grayscaleMap, stationLayer, incomeLayer]
});


// INTERACTIVE LAYERS

// --------- 1. INCOME -------------
function highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    incomeLayer.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

function seedListeners(feature, layer) {
  if (feature.properties.geoid === "16000US4260000") {
    return;
  } else {
    debugger
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }
}

// Set up hover info control;
var info = L.control();

info.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Median Income</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + '$' + Number(props.B19013001.toFixed(1)).toLocaleString()
        : 'Hover over a census tract');
};

info.addTo(mymap);

// Setup Custom Legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (mymap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 20000, 40000, 50000, 60000, 70000, 80000, 1000000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            (grades[i] / 1000) + 'K' + (grades[i + 1] ? '&ndash;' + (grades[i + 1] / 1000) + 'K' + '<br>' : '+');
    }

    return div;
};

legend.addTo(mymap);


// ON-OFF Handlers
$("#stationButton").click(() => {
  if(mymap.hasLayer(stationLayer)) {
    mymap.removeLayer(stationLayer);
  } else {
    mymap.addLayer(stationLayer);
  }
});

$("#incomeButton").click(() => {
  if(mymap.hasLayer(incomeLayer)) {
    mymap.removeLayer(incomeLayer);
  } else {
    mymap.addLayer(incomeLayer);
  }
});
