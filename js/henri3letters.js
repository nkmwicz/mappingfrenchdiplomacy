/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
const mymap = L.map('mapid', {maxZoom: 6});
const lyrEsriWorldShadedRelief = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {attribution: 'Tiles &copy; Esri &mdash; Source: Esri', maxZoom: 13});
const filters = {
  text: '',
  text1: '',
  ranges: [],
};
const months = ['January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December'];
let popup;
const searchFilter = document.querySelector('#srchfilter');
const searchFilter1 = document.querySelector('#srchfilter1');

$(document).ready(function() {
  lyrEsriWorldShadedRelief.addTo(mymap);

  // *****loading data to the map******
  let lyrAllDates = false;

  fetch('data/henri3letters.geojson', {
    method: 'GET',
  }).then((Response) => Response.json()).then((json) => {
    let min = timestamp('1562');
    let max = timestamp('1590');

    const clusters = L.markerClusterGroup.layerSupport({
      iconCreateFunction: function(cluster) {
        const clusterWidth = 30 + cluster.getChildCount() * 0.5;
        if (
          (cluster._cLatLng.lat == '55.68', cluster._cLatLng.lng == '12.57')
        ) {
          clusterColor = 'rgba(193,184,78,0.8)';
        } else if (
          (cluster._cLatLng.lat == '51.51', cluster._cLatLng.lng == '-0.12')
        ) {
          clusterColor = 'rgba(20,234,52,0.8)';
        } else if (
          (cluster._cLatLng.lat == '44.84', cluster._cLatLng.lng == '11.62')
        ) {
          clusterColor = 'rgba(254,191,229,0.8)';
        } else if (
          (cluster._cLatLng.lat == '46.21', cluster._cLatLng.lng == '6.14')
        ) {
          clusterColor = 'rgba(194,243,253,0.8)';
        } else if (
          (cluster._cLatLng.lat == '46.66', cluster._cLatLng.lng == '9.63')
        ) {
          clusterColor = 'rgba(230,0,0,0.8)';
        } else if (
          (cluster._cLatLng.lat == '48.21', cluster._cLatLng.lng == '16.36')
        ) {
          clusterColor = 'rgba(255,255,0,0.8)';
        } else if (
          (cluster._cLatLng.lat == '52.37', cluster._cLatLng.lng == '4.89')
        ) {
          clusterColor = 'rgba(180,253,223,0.8)';
        } else if (
          (cluster._cLatLng.lat == '41.01', cluster._cLatLng.lng == '28.96')
        ) {
          clusterColor = 'rgba(0,0,0,0.8)';
        } else if (
          (cluster._cLatLng.lat == '52.23', cluster._cLatLng.lng == '21.02')
        ) {
          clusterColor = 'rgba(214,216,255,0.8)';
        } else if (
          (cluster._cLatLng.lat == '38.72', cluster._cLatLng.lng == '-9.13')
        ) {
          clusterColor = 'rgba(255,253,180,0.8)';
        } else if (
          (cluster._cLatLng.lat == '41.89', cluster._cLatLng.lng == '12.51')
        ) {
          clusterColor = 'rgba(239,202,253,0.8)';
        } else if (
          (cluster._cLatLng.lat == '45.06', cluster._cLatLng.lng == '7.68')
        ) {
          clusterColor = 'rgba(226,253,211,0.8)';
        } else if (
          (cluster._cLatLng.lat == '51.05', cluster._cLatLng.lng == '13.35')
        ) {
          clusterColor = 'rgba(253,217,198,0.8)';
        } else if (
          (cluster._cLatLng.lat == '55.95', cluster._cLatLng.lng == '-3.19')
        ) {
          clusterColor = 'rgba(255,255,190,0.8)';
        } else if (
          (cluster._cLatLng.lat == '40.43', cluster._cLatLng.lng == '-3.7')
        ) {
          clusterColor = 'rgba(234,234,234,0.8)';
        } else if (
          (cluster._cLatLng.lat == '46.94', cluster._cLatLng.lng == '7.45')
        ) {
          clusterColor = 'rgba(184,0,230,0.8)';
        } else if (
          (cluster._cLatLng.lat == '43.46', cluster._cLatLng.lng == '11.14')
        ) {
          clusterColor = 'rgba(187,223,254,0.8)';
        } else if (
          (cluster._cLatLng.lat == '45.44', cluster._cLatLng.lng == '12.33')
        ) {
          clusterColor = 'rgba(156,156,156,0.8)';
        } else {
          clusterColor = 'white';
        }
        if (
          (cluster._cLatLng.lat == '41.01', cluster._cLatLng.lng == '28.96')
        ) {
          (clusterTextColor = 'white'), (clusterBorder = 'solid white');
        } else {
          (clusterTextColor = 'black'), (clusterBorder = 'solid black');
        }
        const marginTop2 = (clusterWidth - 23) / 2;
        const marginLeft = (clusterWidth - 10) / 2;
        const marginTop = (clusterWidth - 15) / 2;
        return L.divIcon({
          html:
              `<div class = 'clusterdiv' 
              style = 'width: ${clusterWidth}px;
              height: ${clusterWidth}px;
              margin-top: -${marginTop}px;
              margin-left: -${marginLeft}px;
              background-color: ${clusterColor};
              color: ${clusterTextColor};
              border: ${clusterBorder}'>
              <div class = 'clustertext'
              style = 'margin-top: ${marginTop2}px';>
              <b> ${cluster.getChildCount()} </b>
              </div></div>`,
        });
      },
      maxClusterRadius: 0,
    });

    clusters.on('clusterclick', function(a) {
      // a.layer is actually a cluster
      // console.log('cluster ' + a.layer.getAllChildMarkers());
    });

    clusters.on('clustermouseover', function(a) {
      switch (a.layer._cLatLng.lat) {
        case 55.68:
          popupText = '<p><strong>Denmark</strong></p>';
          break;
        case 51.51:
          popupText = '<p><strong>England</strong></p>';
          break;
        case 44.84:
          popupText = '<p><strong>Ferrara</strong></p>';
          break;
        case 46.21:
          popupText = '<p><strong>Geneva</strong></p>';
          break;
        case 46.66:
          popupText = '<p><strong>Grisons</strong></p>';
          break;
        case 48.21:
          popupText = '<p><strong>Holy Roman Emperor</strong></p>';
          break;
        case 52.37:
          popupText = '<p><strong>Netherlands</strong></p>';
          break;
        case 41.01:
          popupText = '<p><strong>Ottoman Empire</strong></p>';
          break;
        case 52.23:
          popupText = '<p><strong>Poland<strong></p>';
          break;
        case 38.72:
          popupText = '<p><strong>Portugal</strong></p>';
          break;
        case 41.89:
          popupText = '<p><strong>Rome</strong></p>';
          break;
        case 45.06:
          popupText = '<p><strong>Savoy</strong></p>';
          break;
        case 51.05:
          popupText = '<p><strong>Saxony</strong></p>';
          break;
        case 55.95:
          popupText = '<p><strong>Scotland</strong></p>';
          break;
        case 40.43:
          popupText = '<p><strong>Spain</strong></p>';
          break;
        case 46.94:
          popupText = '<p><strong>The Swiss Cantons</strong></p>';
          break;
        case 43.46:
          popupText = '<p><strong>Tuscany</strong></p>';
          break;
        case 45.44:
          popupText = '<p><strong>Venice</strong></p>';
          break;
        case 43.72:
          popupText = '<p><strong>Urbino</strong></p>';
          break;
        case 52.39:
          popupText = '<p><strong>Brandenbourg</strong></p>';
          break;
        case 59.33:
          popupText = '<p><strong>Sweden</strong></p>';
          break;
        case 45.17:
          popupText = '<p><strong>Mantua</strong></p>';
          break;
        default:
          popupText = '<p></p>';
          break;
      }
      popup = L.popup()
          .setLatLng([a.layer._cLatLng.lat, a.layer._cLatLng.lng])
          .setContent(popupText)
          .openOn(mymap);
      a.layer.openPopup(popup);
    });

    clusters.on('clustermouseout', function() {
      mymap.closePopup(popup);
    });

    // *****Layer data for the layer group that goes into the clusters*****
    lyrAllDates = L.geoJson(json, {
      pointToLayer: function(feature, latlng) {
        // *****Popup HTML*****
        const letterDate = new Date(feature.properties.date);
        const str =
            `<p style = text-align:center>
                <strong>${feature.properties.author} to 
                ${feature.properties.recipient}</strong></p><hr>
            <p><strong>Date</strong>: 
                ${formatDate(new Date(letterDate))}</p>
            <p><strong>Recipient Location</strong>: 
                ${feature.properties.place}</p>
            <p><strong>Letter Summary</strong>: 
                ${feature.properties.summary}</p>
            <p><strong>Topics:</strong> ${feature.properties.topic1}<br>
                                        ${feature.properties.topic2}<br>
                                        ${feature.properties.topic3}<br>
                                        ${feature.properties.topic4}
            <p><strong>Recipient Info:</strong> 
                ${feature.properties.recipientInformation}
            <p><strong>Source</strong>: ${feature.properties.citation}</p>
            <p><strong>Link</strong>: ${feature.properties.link}</p>`;

        if (feature.properties.place == 'Swiss') {
          (fillCircle = 'purple'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Grisons') {
          (fillCircle = '#e60000'), (colorCircle = '#000000');
        } else if (feature.properties.place == 'Holy Roman Empire') {
          (fillCircle = '#ffff00'), (colorCircle = '#000000');
        } else if (feature.properties.place == 'England') {
          (fillCircle = '#4ce600'), (colorCircle = '#000000');
        } else if (feature.properties.place == 'Venice') {
          (fillCircle = '#9c9c9c'), (colorCircle = '#000000');
        } else if (feature.properties.place == 'Denmark') {
          (fillCircle = '#c1b8fe'), (colorCircle = '#000000');
        } else if (feature.properties.place == 'Ferrara') {
          (fillCircle = '#febfe5'), (colorCircle = '#000000');
        } else if (feature.properties.place == 'Geneva') {
          (fillCircle = '#c2f3fd'), (colorCircle = '#000000');
        } else if (feature.properties.place == 'Ottoman Empire') {
          (fillCircle = '#000000'), (colorCircle = 'white');
        } else if (feature.properties.place == 'Netherlands') {
          (fillCircle = '#b4fddf'), (colorCircle = '#000000');
        } else if (feature.properties.place == 'Poland') {
          (fillCircle = '#d6d8ff'), (colorCircle = '#000000');
        } else if (feature.properties.place == 'Portugal') {
          (fillCircle = '#fffdb4'), (colorCircle = '#000000');
        } else if (feature.properties.place == 'Rome') {
          (fillCircle = '#efcafd'), (colorCircle = '#000000');
        } else if (feature.properties.place == 'Savoy') {
          (fillCircle = '#e2fdd3'), (colorCircle = '#000000');
        } else if (feature.properties.place == 'Saxony') {
          (fillCircle = '#fdd9c6'), (colorCircle = '#000000');
        } else if (feature.properties.place == 'Scotland') {
          (fillCircle = '#ffffbe'), (colorCircle = '#000000');
        } else if (feature.properties.place == 'Spain') {
          (fillCircle = '#ffffff'), (colorCircle = '#000000');
        } else if (feature.properties.place == 'Tuscany') {
          (fillCircle = '#bbdffe'), (colorCircle = '#000000');
        } else {
          (fillCircle = 'blue'), (colorCircle = '#000000');
        }
        const circleMarker = L.circleMarker(latlng, {
          radius: '10',
          fillColor: fillCircle,
          color: colorCircle,
          fillOpacity: '1',
        });
        circleMarker.on('mouseover', function() {
          this.bindPopup(str).openPopup();
        });
        return circleMarker;
      },
    });

    // *****Console Logs for above data*****
    // lyrAllDates.on('click', function(e){
    //     console.log(e)
    // });

    // clusters.on('clusterclick', function(e){
    //     console.log(e);
    // });

    // mymap.on('click', function(e){
    //     console.log(e);
    // });

    // *****layer group and cluster*****
    const lyrGroup = L.featureGroup().addLayer(lyrAllDates);

    clusters.addTo(mymap);
    clusters.checkIn(lyrGroup);
    lyrGroup.addTo(mymap);

    //    *****gets the slider min/max*****
    lyrAllDates.eachLayer(function(layer) {
      if (layer.feature.properties.year < min) {
        min = layer.feature.properties.year;
      }
      if (layer.feature.properties.year >= max) {
        max = layer.feature.properties.year;
      }
    });

    filters.range = [min, max];

    // Create a new date from a string, return as a timestamp.
    function timestamp(str) {
      return new Date(str).getTime();
      // return new Date(Date.UTC(str));
    }
    const slider = document.getElementById('slider');
    noUiSlider.create(slider, {
      start: filters.range,
      behaviour: 'drag-hover',
      connect: [false, true, false],
      step: 1 * 24 * 60 * 60 * 1000,
      range: {
        min: min,
        max: max,
      },
    });

    function formatDate(date) {
      return `${date.getUTCDate()} 
${months[date.getUTCMonth()]} 
${date.getUTCFullYear()}`;
    };

    const dateValue1 = document.getElementById('dateValue1');
    const dateValue2 = document.getElementById('dateValue2');
    slider.noUiSlider.on('update', function(values) {
      dateValue1.value =
      new Date(Number(values[0])).toISOString().split('T')[0];
      dateValue2.value =
      new Date(Number(values[1])).toISOString().split('T')[0];
    });
    dateValue1.addEventListener('input', function(e) {
      slider.noUiSlider.set([timestamp(e.target.value), null]);
    });
    dateValue2.addEventListener('input', function(e) {
      slider.noUiSlider.set([null, timestamp(e.target.value)]);
    });

    // *****Engage slider and search filter together with data*****
    slider.noUiSlider.on('set', function(e) {
      filters.range =
        [Number(e[0]).toFixed(0),
          Number(e[1]).toFixed(0)];
      lyrAllDates.eachLayer(function(layer) {
        filterLyrAllDates(layer);
      });
    });

    searchFilter.addEventListener('input', function(e) {
      filters.text = e.target.value;
      lyrAllDates.eachLayer(function(layer) {
        filterLyrAllDates(layer);
      });
      mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
    });

    searchFilter1.addEventListener('input', function(e) {
      filters.text1 = e.target.value;
      lyrAllDates.eachLayer(function(layer) {
        filterLyrAllDates(layer);
      });
      mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
    });

    function filterLyrAllDates(layer) {
      let numberOfTrue = 0;
      const letterRecipient = layer.feature.properties.recipient;
      const letterTopic1 = layer.feature.properties.topic1;
      const letterTopic2 = layer.feature.properties.topic2;
      const letterTopic3 = layer.feature.properties.topic3;
      const letterTopic4 = layer.feature.properties.topic4;
      const letterDate = layer.feature.properties.date;
      if (
        letterRecipient
            .toLowerCase()
            .indexOf(filters.text.toLowerCase()) > -1
      ) {
        numberOfTrue += 1;
      }
      if (
        letterTopic1
            .toLowerCase()
            .indexOf(filters.text1.toLowerCase()) > -1 ||
        letterTopic2
            .toLowerCase()
            .indexOf(filters.text1.toLowerCase()) > -1 ||
        letterTopic3
            .toLowerCase()
            .indexOf(filters.text1.toLowerCase()) > -1 ||
        letterTopic4
            .toLowerCase()
            .indexOf(filters.text1.toLowerCase()) > -1
      ) {
        numberOfTrue += 1;
      }
      if (
        timestamp(letterDate) >= Number(filters.range[0]) &&
        timestamp(letterDate) <= Number(filters.range[1])
      ) {
        numberOfTrue += 1;
      }
      if (numberOfTrue == 3) {
        layer.addTo(mymap);
      } else {
        mymap.removeLayer(layer);
      }
    }

    mymap.fitBounds(lyrAllDates.getBounds(), {padding: [50, 50]});

    slider.noUiSlider.on('update', function(e) {
      if ((e[0]) == (e[1])) {
        mapdates = `Letters, 
        ${formatDate(new Date(Number(e[0])))}`;
      } else {
        mapdates =
            `Letters from <br>
            ${formatDate(new Date(Number(e[0])))}
                to ${formatDate(new Date(Number(e[1])))}`;
      }
      $('#map-title').html(mapdates);
      mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
    });

    // *****Event Buttons*****
    document.querySelector('.example')
        .addEventListener('click', function() {
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          searchFilter.value = 'Noailles';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          dateValue1.value = '1572-01-01';
          dateValue1.dispatchEvent(new KeyboardEvent('input'));
          dateValue2.value = '1574-01-01';
          dateValue2.dispatchEvent(new KeyboardEvent('input'));
          mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
          document.getElementById('map-title').innerHTML =
              `Example Event: Letters to the Noailles, 
              ${formatDate(new Date(dateValue1.value))} to 
              ${formatDate(new Date(dateValue2.value))}`;
        });

    document.querySelector('.homeview')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          searchFilter1.value = '';
          searchFilter1.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.reset();
          mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
        });

    mymap.scrollWheelZoom.disable();

    //* ****Shows coordinates of mouse in 'map_coords' section******
    mymap.addEventListener('mousemove', function(e) {
      const str = `Lat: ${e.latlng.lat.toFixed(2)}
      Long: ${e.latlng.lng.toFixed(2)} | Zoom: ${mymap.getZoom()}`;
      document.querySelector('#map_coords').innerHTML = str;
    });
  });
  // *****Data Toggles on links declaring inoperability and footnotes*****
  $('[data-toggle="popover"]').popover({trigger: 'hover'});
  $('[data-toggle="tooltip"]').tooltip();

  // *****creating the Layer control*****
  // objBasemap = {
  //     "Esri Shaded Relief": lyrEsri_WorldShadedRelief,
  // };

  // objOverlays = {
  //     "1515-1600": lyrAllDates,
  // };

  // ctlLayers = L.control.layers(objBasemap, objOverlays).addTo(mymap);
});