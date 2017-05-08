import incomeData from './data/income_data';

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
           median_income > 70000    ? '#e95d59' :
           median_income > 60000    ? '#fd8165' :
           median_income > 40000    ? '#fbac70' :
           median_income > 20000    ? '#fde299' :
                                      '#fdefb5';
};

// --------- Interactivity ------------- //
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
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }
}

export default incomeLayer;
