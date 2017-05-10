import incomeData from './data/income_data';
import rentData from './data/rent_percentage_income';


// ------ SET UP MAP --------- //
const grayscaleMap = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  maxZoom: 18 });

const incomeLayer = L.geoJson(incomeData, {
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
           median_income > 60000    ? '#e95d59' :
           median_income > 40000    ? '#fd8165' :
           median_income > 20000    ? '#fbac70' :
           median_income > 10000    ? '#fde299' :
                                      '#fdefb5';
};

const rentLayer = L.geoJson(rentData, {
  style: function(feature) {
    // pir ~ percentage income that goes to rent
    let median_pir = feature.properties.B25071001;
    return {
        fillColor: getRentColor(median_pir),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.3
    };
  },
  onEachFeature: seedListeners
});

  function getRentColor(median_pir) {
    return   median_pir >= 50   ? '#a54960' :
             median_pir > 42    ? '#d14a61' :
             median_pir > 35    ? '#e95d59' :
             median_pir > 27    ? '#fd8165' :
             median_pir > 19    ? '#fbac70' :
             median_pir > 12    ? '#fde299' :
                                  '#fdefb5';
  };

const mymap = L.map('map', {
  center: [39.9526, -75.1652],
  zoom: 13,
  layers: [grayscaleMap, incomeLayer]
});

// --------- Income Interactivity ------------- //
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

    if (layer.feature.properties.B19013001) {
      incomeInfo.update(layer.feature.properties);
    } else {
      rentInfo.update(layer.feature.properties)
    }
}

function resetHighlight(e) {
    const layer = e.target;
    if (layer.feature.properties.B19013001) {
      incomeLayer.resetStyle(e.target);
      incomeInfo.update();
    } else {
      rentLayer.resetStyle(e.target);
      rentInfo.update();
    }
}

function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

function seedListeners(feature, layer) {
  if (feature.properties.geoid === "16000US4260000") {
    return;
  } else {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }
}

// 1. Set incomeInfo control;
var incomeInfo = L.control();

incomeInfo.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
incomeInfo.update = function (props) {
    this._div.innerHTML = '<h4>Median Income</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + '$' + Number(props.B19013001.toFixed(1)).toLocaleString()
        : 'Hover over a census tract');
};

incomeInfo.addTo(mymap);

// 2. Setup Custom Legend
var incomeLegend = L.control({position: 'bottomright'});

incomeLegend.onAdd = function (mymap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10000, 20000, 40000, 60000, 80000, 1000000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            (grades[i] / 1000) + 'K' + (grades[i + 1] ? '&ndash;' + (grades[i + 1] / 1000) + 'K' + '<br>' : '+');
    }

    return div;
};

incomeLegend.addTo(mymap);


// 1. Set rentInfo control;
var rentInfo = L.control();

rentInfo.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
rentInfo.update = function (props) {
    this._div.innerHTML = '<h4>Median Rent as Percentage of Income</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + Number(props.B25071001) + '%'
        : 'Hover over a census tract');
};

// 2. Setup Custom Legend
var rentLegend = L.control({position: 'bottomright'});

rentLegend.onAdd = function (mymap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 12, 19, 27, 35, 42, 50],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getRentColor(grades[i] + 1) + '"></i> ' +
            (grades[i]) + '%' + (grades[i + 1] ? '&ndash;' + (grades[i + 1]) + '%' + '<br>' : '+');
    }

    return div;
};


// ------- ON-OFF Handlers --------- //


$("#incomeButton").click(() => {
  if(mymap.hasLayer(incomeLayer)) {
    mymap.removeLayer(incomeLayer);
    incomeInfo.remove();
    incomeLegend.remove();
  } else {

    if (mymap.hasLayer(rentLayer)) {
      mymap.removeLayer(rentLayer);
      rentInfo.remove();
      rentLegend.remove();
    }

    mymap.addLayer(incomeLayer);
    incomeInfo.addTo(mymap);
    incomeLegend.addTo(mymap);
  }
});

$("#rentButton").click(() => {
  if(mymap.hasLayer(rentLayer)) {
    mymap.removeLayer(rentLayer);
    rentInfo.remove();
    rentLegend.remove();
  } else {

    if (mymap.hasLayer(incomeLayer)) {
      mymap.removeLayer(incomeLayer);
      incomeInfo.remove();
      incomeLegend.remove();
    }

    mymap.addLayer(rentLayer);
    rentLegend.addTo(mymap);
    rentInfo.addTo(mymap);
  }
});
