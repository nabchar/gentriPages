import rentLayer from './rent_layer';
import incomeLayer from './income_layer';
import stationLayer from './stationLayer';

// ------ SET UP MAP --------- //
const grayscaleMap = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  maxZoom: 18 });


const mymap = L.map('map', {
  center: [39.9526, -75.1652],
  zoom: 13,
  layers: [grayscaleMap, stationLayer, incomeLayer]
});

// --- Set up data layers --- //
const dataLayers = {
  "Income": incomeLayer,
  "Housing Affordability": rentLayer
}

const layerControl = L.control({position: 'topright'})

layerControl.layers(dataLayers).addTo(mymap);


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
            '<i style="background:' + getIncomeColor(grades[i] + 1) + '"></i> ' +
            (grades[i] / 1000) + 'K' + (grades[i + 1] ? '&ndash;' + (grades[i + 1] / 1000) + 'K' + '<br>' : '+');
    }

    return div;
};

legend.addTo(mymap);


// ------- ON-OFF Handlers ---------
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
