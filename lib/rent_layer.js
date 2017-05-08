import rentData from './data/rent_percentage_income';

const rentLayer = L.geoJson(rentData, {
  style: function(feature) {
    // pir ~ percentage income that goes to rent
    let median_pir = feature.properties.B25071001;
    return {
        fillColor: getColor(median_pir),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.3
    };
  },
  onEachFeature: seedListeners
});

function getColor(median_pir) {
  return   median_pir > 100   ? '#a54960' :
           median_pir > 80    ? '#d14a61' :
           median_pir > 70    ? '#e95d59' :
           median_pir > 60    ? '#fd8165' :
           median_pir > 40    ? '#fbac70' :
           median_pir > 20    ? '#fde299' :
                                '#fdefb5';
};


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
    rentLayer.resetStyle(e.target);
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

export default rentLayer;
