/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
const mymap = L.map('mapid', {maxZoom: 6});
const lyrEsriWorldShadedRelief = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {attribution: 'Tiles &copy; Esri &mdash; Source: Esri', maxZoom: 13});
const filters = {
  text: '',
  ranges: [],
};
let popup;
const searchFilter = document.querySelector('#srchfilter');

$(document).ready(function() {
  lyrEsriWorldShadedRelief.addTo(mymap);

  // *****loading data to the map******
  let lyrAllDates = false;

  fetch('data/16c-diplomats_data.geojson', {
    method: 'GET',
  }).then((Response) => Response.json()).then((json) => {
    let min = 1515;
    let max = 1600;
    console.log(json.features);
    const jsonData = json.features;
    // Making Charts
    // filter the data
    const data1515To1525 = jsonData.filter((e) =>
      e.properties.year >= 1515 &&
      e.properties.year <= 1525);
    const data1525To1535 = jsonData.filter((e) =>
      e.properties.year >= 1525 &&
      e.properties.year <= 1535);
    const data1535To1560 = jsonData.filter((e) =>
      e.properties.year >= 1535 &&
      e.properties.year <= 1560);

    // Format and Group the Data
    const grouped1515To1525 = Array.from(d3.group(data1515To1525,
        (d) => d.properties.place), ([place, value]) => ({place, value}));
    const grouped1525To1535 = Array.from(d3.group(data1525To1535,
        (d) => d.properties.place), ([place, value]) => ({place, value}));
    const groupedUniqueName1535To1560 = Array.from(d3.group(data1535To1560,
        (d) => d.properties.place,
        (d)=>d.properties.name), ([place, value])=>({place, value}),
    );
    console.log(groupedUniqueName1535To1560);

    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    };

    // Call the function to make the charts
    makeBasicBarChart(grouped1515To1525, '.barChart1', '#chart1');
    makeBasicBarChart(grouped1525To1535, '.barChart2', '#chart2');
    window.addEventListener('resize', function() {
      d3.select('.barChart1').remove();
      d3.select('#chart1')
          .append('svg')
          .classed('barChart1', true);
      makeBasicBarChart(grouped1515To1525, '.barChart1', '#chart1');
    }, true);
    window.addEventListener('resize', function() {
      d3.select('.barChart2').remove();
      d3.select('#chart2')
          .append('svg')
          .classed('barChart2', true);
      makeBasicBarChart(grouped1525To1535, '.barChart2', '#chart2');
    }, true);

    const clusters = L.markerClusterGroup.layerSupport({
      iconCreateFunction: function(cluster) {
        const clusterWidth = 30 + cluster.getChildCount() * 0.5;
        // Denmark
        if
        (cluster._cLatLng.lat == '55.68' && cluster._cLatLng.lng == '12.57') {
          clusterColor = 'rgba(189,183,107,0.8)'; // darkkhaki
        } else if
        // England
        (cluster._cLatLng.lat == '51.51' && cluster._cLatLng.lng == '-0.12') {
          clusterColor = 'rgba(124,252,0,0.8)'; // lawngreen
        } else if
        // Ferrara
        (cluster._cLatLng.lat == '44.84' && cluster._cLatLng.lng == '11.62') {
          clusterColor = 'rgba(255,182,193,0.8)'; // lightpink
        } else if
        // Geneva
        (cluster._cLatLng.lat == '46.21' && cluster._cLatLng.lng == '6.14') {
          clusterColor = 'rgba(173,216,230,0.8)'; // lightblue
        } else if
        // Grisons
        (cluster._cLatLng.lat == '46.66' && cluster._cLatLng.lng == '9.63') {
          clusterColor = 'rgba(139,0,0,0.8)'; // darkred
        } else if
        // Holy Roman Emperor
        (cluster._cLatLng.lat == '48.21' && cluster._cLatLng.lng == '16.36') {
          clusterColor = 'rgba(255,255,0,0.8)'; // yellow
        } else if
        // Netherlands
        (cluster._cLatLng.lat == '52.37' && cluster._cLatLng.lng == '4.89') {
          clusterColor = 'rgba(143,188,143,0.8)'; // darkseagreen
        } else if
        // Ottoman Empire
        (cluster._cLatLng.lat == '41.01' && cluster._cLatLng.lng == '28.96') {
          clusterColor = 'rgba(0,0,0,0.8)'; // black
        } else if
        // Poland
        (cluster._cLatLng.lat == '52.23' && cluster._cLatLng.lng == '21.02') {
          clusterColor = 'rgba(0,255,255,0.8)'; // cyan
        } else if
        // Portugal
        (cluster._cLatLng.lat == '38.72' && cluster._cLatLng.lng == '-9.13') {
          clusterColor = 'rgba(255,250,205,0.8)'; // lemonchiffon
        } else if
        // Rome
        (cluster._cLatLng.lat == '41.89' && cluster._cLatLng.lng == '12.51') {
          clusterColor = 'rgba(255,0,255,0.8)'; // magenta
        } else if
        // Savoy
        (cluster._cLatLng.lat == '45.06' && cluster._cLatLng.lng == '7.68') {
          clusterColor = 'rgba(244,164,96,0.8)'; // sandybrown
        } else if
        // Saxony
        (cluster._cLatLng.lat == '51.05' && cluster._cLatLng.lng == '13.35') {
          clusterColor = 'rgba(245,245,220,0.8)'; // beige
        } else if
        // Scotland
        (cluster._cLatLng.lat == '55.95' && cluster._cLatLng.lng == '-3.19') {
          clusterColor = 'rgba(255,127,80,0.8)'; // coral
        } else if
        // Spain
        (cluster._cLatLng.lat == '40.43' && cluster._cLatLng.lng == '-3.7') {
          clusterColor = 'rgba(255,105,180,0.8)'; // hotpink
        } else if
        // Swiss Cantons
        (cluster._cLatLng.lat == '46.94' && cluster._cLatLng.lng == '7.45') {
          clusterColor = 'rgba(147,112,219,0.8)'; // mediumpurple
        } else if
        // Tuscany
        (cluster._cLatLng.lat == '43.46' && cluster._cLatLng.lng == '11.14') {
          clusterColor = 'rgba(72,209,204,0.8)'; // mediumturquoise
        } else if
        // Venice
        (cluster._cLatLng.lat == '45.44' && cluster._cLatLng.lng == '12.33') {
          clusterColor = 'rgba(169,169,169,0.8)'; // darkgrey
        } else if
        // Lorraine
        (cluster._cLatLng.lat == '48.76' && cluster._cLatLng.lng == '6.14') {
          clusterColor = 'rgba(0,191,255,0.8)'; // deepskyblue
        } else if
        // Urbino
        (cluster._cLatLng.lat == '43.72' && cluster._cLatLng.lng == '12.63') {
          clusterColor = 'rgba(0,128,128,0.8)'; // teal
        } else if
        // Wurttemburg
        (cluster._cLatLng.lat == '48.55' && cluster._cLatLng.lng == '9.04') {
          clusterColor = 'rgba(255,0,0,0.8)'; // red
        } else if
        // Brandenbourg
        (cluster._cLatLng.lat == '52.39' && cluster._cLatLng.lng == '13.06') {
          clusterColor = 'rgba(255,140,0,0.8)'; // darkorange
        } else if
        // Elector of the Palatine
        (cluster._cLatLng.lat == '49.91' && cluster._cLatLng.lng == '7.45') {
          clusterColor = 'rgba(95,158,160)'; // cadetblue
        } else if
        // Mantua
        (cluster._cLatLng.lat == '45.17' && cluster._cLatLng.lng == '10.79') {
          clusterColor = 'rgba(65,105,225,0.8)'; // royalblue
        } else if
        // Hamburg
        (cluster._cLatLng.lat == '52.55' && cluster._cLatLng.lng == '9.99') {
          clusterColor = 'rgba(128,128,0,0.8)'; // olive
        } else if
        // Spanish Netherlands
        (cluster._cLatLng.lat == '50.84' && cluster._cLatLng.lng == '4.36') {
          clusterColor = 'rgba(255,255,240,0.8)'; // ivory
        } else if
        // Santa-Fiore
        (cluster._cLatLng.lat == '43.77' && cluster._cLatLng.lng == '11.26') {
          clusterColor = 'rgba(255,222,173,0.8)'; // navajowhite
        } else if
        // Sweden
        (cluster._cLatLng.lat == '59.33' && cluster._cLatLng.lng == '18.07') {
          clusterColor = 'rgba(219,112,147,0.8)'; // palevioletred
        } else if
        // Fribourg
        (cluster._cLatLng.lat == '46.8' && cluster._cLatLng.lng == '7.15') {
          clusterColor = 'rgba(255,218,185,0.8)'; // peachpuff
        } else {
          clusterColor = 'white';
        };
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
      // console.log(a);
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
        const str =
            `<p style = text-align:center>
            <strong>${feature.properties.name}</strong></p><hr>
            <p><strong>Place</strong>: ${feature.properties.place}</p>
            <p><strong>Year</strong>: ${feature.properties.year}</p>
            <p><strong>Information</strong>: ${feature.properties.ambInfo}</p>
            <p><strong>Source</strong>: ${feature.properties.source}</p>
            <p><strong>Link</strong>: ${feature.properties.link}</p>`;

        if (feature.properties.place == 'Swiss Cantons') {
          (fillCircle = 'mediumpurple'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Grisons') {
          (fillCircle = 'darkred'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Holy Roman Empire') {
          (fillCircle = 'yellow'), (colorCircle = 'black');
        } else if (feature.properties.place == 'England') {
          (fillCircle = 'lawngreen'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Venice') {
          (fillCircle = 'darkgrey'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Denmark') {
          (fillCircle = 'darkkhaki'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Ferrara') {
          (fillCircle = 'lightpink'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Geneva') {
          (fillCircle = 'lightblue'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Ottoman Empire') {
          (fillCircle = 'black'), (colorCircle = 'white');
        } else if (feature.properties.place == 'Netherlands') {
          (fillCircle = 'darkseagreen'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Poland') {
          (fillCircle = 'cyan'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Portugal') {
          (fillCircle = 'lemonchiffon'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Rome') {
          (fillCircle = 'magenta'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Savoy') {
          (fillCircle = 'sandybrown'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Saxony') {
          (fillCircle = 'beige'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Scotland') {
          (fillCircle = 'coral'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Spain') {
          (fillCircle = 'hotpink'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Tuscany') {
          (fillCircle = 'mediumturquoise'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Santa-Fiore') {
          (fillCircle = 'navajowhite'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Lorraine') {
          (fillCircle = 'deepskyblue'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Urbino') {
          (fillCircle = 'teal'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Electorate of the Palatine') {
          (fillCircle = 'cadetblue'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Brandenbourg') {
          (fillCircle = 'darkorange'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Sweden') {
          (fillCircle = 'palevioletred'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Mantua') {
          (fillCircle = 'royalblue'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Wurttemburg') {
          (fillCircle = 'red'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Spanish Netherlands') {
          (fillCircle = 'ivory'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Fribourg') {
          (fillCircle = 'peachpuff'), (colorCircle = 'black');
        } else if (feature.properties.place == 'Hamburg') {
          (fillCircle = 'olive'), (colorCircle = 'black');
        } else {
          (fillCircle = 'blue'), (colorCircle = 'black');
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
    const slider = document.getElementById('slider');
    noUiSlider.create(slider, {
      start: filters.range,
      behaviour: 'drag-hover',
      connect: [false, true, false],
      step: 1,
      tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})],
      range: {
        min: min,
        max: max,
      },
    });

    // *****Engage slider and search filter together with data*****
    slider.noUiSlider.on('set', function(e) {
      filters.range = [parseFloat(e[0]), parseFloat(e[1])];
      lyrAllDates.eachLayer(function(layer) {
        filterLyrAllDates(layer);
      });
      // change citation line to add dates
      if (parseFloat(e[0]) === min &&
        parseFloat(e[1]) === max) {
        citedates = '';
      } else if (parseFloat(e[0]) === parseFloat(e[1])) {
        citedates =
          ` Map date: "${parseFloat(e[0])}."`;
      } else {
        citedates =
          ` Map dates: "${parseFloat(e[0])}
                  to ${parseFloat(e[1])}."`;
      }
      document.getElementById('cite-dates').innerHTML =
                citedates;
    });

    searchFilter.addEventListener('input', function(e) {
      filters.text = e.target.value;
      lyrAllDates.eachLayer(function(layer) {
        filterLyrAllDates(layer);
      });
      // change citation line to add name searchfilter
      if (searchFilter.value === '') {
        citeName = '';
      } else {
        citeName = ` Search name: "${e.target.value}."`;
      }
      document.getElementById('cite-name').innerHTML =
                citeName;
    });

    function filterLyrAllDates(layer) {
      let numberOfTrue = 0;
      const ambName = layer.feature.properties.name;
      const ambYear = layer.feature.properties.year;
      if (
        ambName
            .toLowerCase()
            .indexOf(filters.text.toLowerCase()) > -1
      ) {
        numberOfTrue += 1;
      }
      if (
        ambYear >= filters.range[0] &&
        ambYear <= filters.range[1]
      ) {
        numberOfTrue += 1;
      }
      if (numberOfTrue == 2) {
        layer.addTo(mymap);
      } else {
        mymap.removeLayer(layer);
      }
    }

    mymap.fitBounds(lyrAllDates.getBounds(), {padding: [50, 50]});

    slider.noUiSlider.on('set', function(e) {
      if (parseFloat(e[0]).toFixed(0) == parseFloat(e[1]).toFixed(0)) {
        mapdates = `French Residential Ambassadors, 
        ${parseFloat(e[0]).toFixed(0)}`;
      } else {
        mapdates =
            `French Residential Ambassadors, 
            ${parseFloat(e[0]).toFixed(0)}-${parseFloat(e[1]).toFixed(0)}`;
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
          slider.noUiSlider.set([1545, 1580]);
          mymap.fitBounds(clusters.getBounds());
          document.getElementById('map-title').innerHTML =
              'Example Event: the Noailles Family Ambassadors, 1545-1555';
        });

    document.querySelector('.homeview')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.fitBounds(lyrAllDates.getBounds());
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1515, 1600]);
          mymap.fitBounds(clusters.getBounds());
        });

    document.querySelector('.poland1570s')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1570, 1580]);
          lyrAllDates.eachLayer(function(layer) {
            if (layer.feature.properties.place == 'Poland') {
              layer.addTo(mymap);
            } else {
              mymap.removeLayer(layer);
            }
          });
          document.getElementById('map-title').innerHTML = 'Poland, 1570-1580';
          mymap.setView([52.21, 21.01]);
        });

    document.querySelector('.a1516')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1516, 1516]);
          mymap.fitBounds(clusters.getBounds(), {padding: [100, 100]});
        });

    document.querySelector('.a1547')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1547, 1547]);
          mymap.fitBounds(clusters.getBounds());
        });

    const button1515to1520 = document.querySelectorAll('.a1515-1520');
    for (button of button1515to1520) {
      button.addEventListener('click', function() {
        searchFilter.value = '';
        searchFilter.dispatchEvent(new KeyboardEvent('input'));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1515, 1520]);
        mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
      });
    };

    document.querySelector('.Bonnivet1518')
        .addEventListener('click', function() {
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          slider.noUiSlider.set([1518, 1518]);
          lyrAllDates.eachLayer(function(layer) {
            if (layer.feature.properties.objectID == '859') {
              layer.addTo(mymap).fire('mouseover');
            } else {
              mymap.removeLayer(layer);
            }
          });
          mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
          document.querySelector('#map-title')
              .innerHTML = 'Gouffier de Bonnivet in England, 1518';
        });

    document.querySelector('.HRE1519')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1519, 1519]);
          lyrAllDates.eachLayer(function(layer) {
            if (
              layer.feature.properties.place == 'Holy Roman Empire' &&
                layer.feature.properties.year == '1519'
            ) {
              layer.addTo(mymap);
            } else {
              mymap.removeLayer(layer);
            }
          });
          $('#map-title')
              .text('French Amabassadors in the Holy Roman Empire, 1519');
        });

    document.querySelector('.a1520-1525')
        .addEventListener('click', function() {
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          slider.noUiSlider.set([1520, 1525]);
          mymap.fitBounds(clusters.getBounds());
        });

    document.querySelector('.daugerant1520-1525')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1520, 1525]);
          lyrAllDates.eachLayer(function(layer) {
            if (
              layer.feature.properties.place == 'Swiss Cantons' &&
                layer.feature.properties.year >= '1520' &&
                layer.feature.properties.year <= '1525'
            ) {
              layer.addTo(mymap);
            } else {
              mymap.removeLayer(layer);
            }
          });
          // mymap.fitBounds(clusters.getBounds());
          document.querySelector('#map-title')
              .innerHTML = 'Louis Daugerant in the Swiss Cantons, 1520-1525';
        });

    document.querySelector('.portugal1520-1525')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1520, 1525]);
          lyrAllDates.eachLayer(function(layer) {
            if (
              layer.feature.properties.place == 'Portugal' &&
                layer.feature.properties.year >= '1520' &&
                layer.feature.properties.year <= '1525'
            ) {
              layer.addTo(mymap);
            } else {
              mymap.removeLayer(layer);
            }
          });
          document.querySelector('#map-title')
              .innerHTML = 'French Ambassadors in Portugal, 1520-1525';
          mymap.setView([38.74, -9.1]);
        });

    document.querySelector('.a1515-1525')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1515, 1525]);
          mymap.fitBounds(clusters.getBounds());
        });

    document.querySelector('.a1525-1535')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1525, 1535]);
          mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
        });

    document.querySelector('.a1515-1535')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1515, 1535]);
          mymap.fitBounds(clusters.getBounds());
        });

    document.querySelector('.a1535-1555')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1535, 1555]);
          mymap.fitBounds(clusters.getBounds(), {padding: [150, 150]});
        });

    document.querySelector('.a1535-1540')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1535, 1540]);
          mymap.fitBounds(clusters.getBounds(), {padding: [150, 150]});
        });

    document.querySelector('.a1540-1545')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1540, 1545]);
          mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
        });

    document.querySelector('.a1545-1550')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1545, 1550]);
          mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
        });

    document.querySelector('.a1550-1555')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1550, 1555]);
          mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
        });

    document.querySelector('.a1555-1560')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1555, 1560]);
          mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
        });

    document.querySelector('.a1535-1560')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1535, 1560]);
          mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
        });

    document.querySelector('.a1559-1600')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1559, 1600]);
          mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
        });

    document.querySelector('.a1550-1560')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1550, 1560]);
          mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
        });

    document.querySelector('.a1560-1570')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1560, 1570]);
          mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
        });

    document.querySelector('.a1570-1600')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1570, 1600]);
          mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
        });

    document.querySelector('.a1535-1547')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1535, 1547]);
          mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
        });

    document.querySelector('.a1588-1600')
        .addEventListener('click', function() {
          searchFilter.value = '';
          searchFilter.dispatchEvent(new KeyboardEvent('input'));
          mymap.closePopup();
          lyrGroup.clearLayers();
          lyrGroup.addLayer(lyrAllDates);
          slider.noUiSlider.set([1588, 1600]);
          mymap.fitBounds(clusters.getBounds(), {padding: [50, 50]});
        });

    mymap.scrollWheelZoom.disable();

    //* *******Shows coordinates of mouse in 'map_coords' section******
    mymap.addEventListener('mousemove', function(e) {
      const str = `Lat: ${e.latlng.lat.toFixed(2)}
      Long: ${e.latlng.lng.toFixed(2)} | Zoom: ${mymap.getZoom()}`;
      document.querySelector('#map_coords').innerHTML = str;
    });
  });
  // *****Data Toggles on links declaring inoperability and footnotes*****
  $('[data-toggle="popover"]').popover({
    trigger: 'hover',
    container: 'body',
  });
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
