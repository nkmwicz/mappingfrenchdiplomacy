/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
const mymap = L.map('mapid', {
  maxZoom: 6,
});
const lyrEsriWorldShadedRelief = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
  maxZoom: 13,
});
const filters = {
  text: '',
  text1: '',
  range: [],
};
const months = [
  'Jan.', 'Feb.', 'Mar.',
  'Apr.', 'May', 'Jun.', 'Jul.',
  'Aug.', 'Sept.', 'Oct.',
  'Nov.', 'Dec.',
];
let popup;
let jsonInfo;
const searchFilter = document.querySelector('#srchfilter');
const searchFilter1 = document.querySelector('#srchfilter1');
const letterTable = document.querySelector('#letter-table tbody');
const dateValue1 = document.getElementById('dateValue1');
const dateValue2 = document.getElementById('dateValue2');
let min = timestamp('1562');
let max = timestamp('1590');

lyrEsriWorldShadedRelief.addTo(mymap);

// *****loading data to the map******

const clusters = L.markerClusterGroup.layerSupport({
  iconCreateFunction: function(cluster) {
    const clusterWidth = 30 + cluster.getChildCount() * 0.5;
    // Denmark
    if (cluster._cLatLng.lat == '55.68' && cluster._cLatLng.lng == '12.57') {
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
      (cluster._cLatLng.lat == '41.01' && cluster._cLatLng.lng == '28.96')
    ) {
      (clusterTextColor = 'white'), (clusterBorder = 'solid white');
    } else {
      (clusterTextColor = 'black'), (clusterBorder = 'solid black');
    }
    const marginTop2 = (clusterWidth - 23) / 2;
    const marginLeft = (clusterWidth - 10) / 2;
    const marginTop = (clusterWidth - 15) / 2;
    return L.divIcon({
      html: `<div class = 'clusterdiv' 
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
    case 48.76:
      popupText = '<p><strong>Lorraine</strong></p>';
      break;
    case 49.91:
      popupText = '<p><strong>Palatine</strong></p>';
      break;
    case 48.55:
      popupText = '<p><strong>Wurttemburg</strong></p>';
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

const lyrGroup = L.featureGroup();
clusters.addTo(mymap);
clusters.checkIn(lyrGroup);
lyrGroup.addTo(mymap);

filters.range = [min, max];

// construct slider
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

// Instantiate slider
slider.noUiSlider.on('update', function(values) {
  // set first date value
  dateValue1.value =
    new Date(Number(values[0])).toISOString().split('T')[0];
  // set second date value
  dateValue2.value =
    new Date(Number(values[1])).toISOString().split('T')[0];
});
// create event listeners for both date values
dateValue1.addEventListener('input', function(e) {
  slider.noUiSlider.set([timestamp(e.target.value), null]);
});
dateValue2.addEventListener('input', function(e) {
  slider.noUiSlider.set([null, timestamp(e.target.value)]);
});

// Load lyrAllDates with AJAX
let lyrAllDates = false;
fetch('data/henri3letters.json', {
  method: 'GET',
}).then((Response) => Response.json()).then((json) => {
  // *****Layer data for the layer group that goes into the clusters*****
  lyrAllDates = L.geoJson(json, {
    pointToLayer: function(feature, latlng) {
      // *****Popup HTML*****
      const letterDate = new Date(feature.properties.date);
      const str =
        `<p style = text-align:center>
                <strong>${feature.properties.author} to 
                ${feature.properties.recipient}</strong></p><hr>
            <p><span class='popup-keys'>Date</span>: 
                ${formatDate(new Date(letterDate))}</p>
            <p><span class='popup-keys'>Recipient Location</span>: 
                ${feature.properties.place}</p>
            <p><span class='popup-keys'>Letter Summary</span>: 
                ${feature.properties.summary}</p>
            <p><span class='popup-keys'>Topics:</span>
                ${feature.properties.topics}
            <p><span class='popup-keys'>Recipient Info:</span> 
                ${feature.properties.recipientInformation}
            <p><span class='popup-keys'>Source</span>: 
                ${feature.properties.citation}</p>
            <p><span class='popup-keys'>Link</span>:
                ${feature.properties.link}</p>`;

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
      jsonInfo = L.popup()
          .setLatLng(latlng)
          .setContent(str)
          .openOn(mymap);
      circleMarker.bindPopup(jsonInfo);
      circleMarker.on('mouseover', function() {
        this.bindPopup(str).openPopup();
      });
      return circleMarker;
    },
  });
  // layer group and cluster
  lyrGroup.addLayer(lyrAllDates);

  // gets the slider min/max
  lyrAllDates.eachLayer(function(layer) {
    if (layer.feature.properties.year < min) {
      min = layer.feature.properties.year;
    }
    if (layer.feature.properties.year >= max) {
      max = layer.feature.properties.year;
    }
  });

  // *****Engage slider and search filter together with data*****
  slider.noUiSlider.on('set', function(e) {
    filters.range = [
      Number(e[0]).toFixed(0),
      Number(e[1]).toFixed(0),
    ];
    clearTable();
    lyrAllDates.eachLayer(function(layer) {
      filterLyrAllDates(layer);
    });
    // Set the dates of the map to the mapDates line.
    setMapDates();
    // Fit the bounds of the map to the clusters on map.
    mymap.fitBounds(clusters.getBounds(), {
      padding: [50, 50],
    });

    // change citation line to add dates
    if (timestamp(dateValue1.value) === min &&
    timestamp(dateValue2.value) === max) {
      citedates = '';
    } else if (dateValue1 == dateValue2) {
      citedates =
          ` Map date: "${formatDate(new Date(dateValue1.value))}."`;
    } else {
      citedates =
          ` Map dates: "${formatDate(new Date(dateValue1.value))}
                  to ${formatDate(new Date(dateValue2.value))}."`;
    }
    document.getElementById('cite-dates').innerHTML =
                citedates;

    // eventlistener to clear table and reload only row
    // that was deleted. This code must be added to each
    // filter and the document as a whole because the
    // eventListener has to reload each time it is used.

    // iterate through each of the table rows
    for (let i = 0; i < letterTable.children.length; i++) {
      // add eventListener
      document.getElementsByClassName('table-layer-button')[i]
          .style.cursor = 'pointer';
      document.getElementsByClassName('table-layer-button')[i]
          .addEventListener('click', function(e) {
          // clear the table
            clearTable();
            // iterate through each layer
            lyrAllDates.eachLayer(function(layer) {
            // load each variable related to the layer
              const layerLatLng = layer.feature.geometry.coordinates;
              const letterLink = layer.feature.properties.link;
              const letterID = layer.feature.properties.objectID;
              const letterRecipient = layer.feature.properties.recipient;
              const letterTopics = layer.feature.properties.topics;
              const letterDate = layer.feature.properties.date;
              // add new LayerInfo variable
              const layerInfo = new LayerInfo(
                  formatDate(new Date(letterDate)),
                  letterRecipient,
                  letterTopics,
                  letterLink,
                  letterID,
              );
              const tableOfLetters = new TableOfLetters();
              if (Number(e.target.id) !== letterID) {
                mymap.removeLayer(layer);
              } else if (Number(e.target.id) === letterID) {
                tableOfLetters.addLayerToList(layerInfo);
                layer.addTo(mymap);
                // pan to layer to center it in map.
                mymap.panTo([layerLatLng[1], layerLatLng[0]]);
                // change mapdates line.
                document.getElementById('map-title').innerHTML =
                `<p>Letter to ${letterRecipient}, on 
                      ${formatDate(new Date(letterDate))}</p>`;
              }
            });
            setTimeout(function() {
              simulateLayerClick();
            }, 300);
          });
    };
  });

  searchFilter.addEventListener('input', function(e) {
    filters.text = e.target.value;
    clearTable();
    lyrAllDates.eachLayer(function(layer) {
      filterLyrAllDates(layer);
    });
    // Set the dates to the MapDates line.
    setMapDates();
    // Fit the bounds of the map to clusters on map.
    mymap.fitBounds(clusters.getBounds(), {
      padding: [50, 50],
    });
    // change citation line to add name searchfilter
    if (searchFilter.value === '') {
      citeName = '';
    } else {
      citeName = ` Search name: "${e.target.value}."`;
    }
    document.getElementById('cite-name').innerHTML =
                citeName;

    // eventlistener to clear table and reload only row
    // that was deleted. This code must be added to each
    // filter and the document as a whole because the
    // eventListener is has to reload each time it is used.

    // iterate through each of the table rows
    for (let i = 0; i < letterTable.children.length; i++) {
      // add eventListener
      document.getElementsByClassName('table-layer-button')[i]
          .style.cursor = 'pointer';
      document.getElementsByClassName('table-layer-button')[i]
          .addEventListener('click', function(e) {
          // clear the table
            clearTable();
            // iterate through each layer
            lyrAllDates.eachLayer(function(layer) {
            // load each variable related to the layer
              const layerLatLng = layer.feature.geometry.coordinates;
              const letterLink = layer.feature.properties.link;
              const letterID = layer.feature.properties.objectID;
              const letterRecipient = layer.feature.properties.recipient;
              const letterTopics = layer.feature.properties.topics;
              const letterDate = layer.feature.properties.date;
              // add new LayerInfo variable
              const layerInfo = new LayerInfo(
                  formatDate(new Date(letterDate)),
                  letterRecipient,
                  letterTopics,
                  letterLink,
                  letterID,
              );
              const tableOfLetters = new TableOfLetters();
              if (Number(e.target.id) !== letterID) {
                mymap.removeLayer(layer);
              } else if (Number(e.target.id) === letterID) {
                tableOfLetters.addLayerToList(layerInfo);
                layer.addTo(mymap);
                // pan to layer to center it in map.
                mymap.panTo([layerLatLng[1], layerLatLng[0]]);
                // change mapdates line.
                document.getElementById('map-title').innerHTML =
                `<p>Letter to ${letterRecipient}, on 
                      ${formatDate(new Date(letterDate))}</p>`;
              }
            });
            setTimeout(function() {
              simulateLayerClick();
            }, 300);
          });
    };
  });

  searchFilter1.addEventListener('input', function(e) {
    filters.text1 = e.target.value;
    clearTable();
    lyrAllDates.eachLayer(function(layer) {
      filterLyrAllDates(layer);
    });
    // Set the Map Dates in the mapDates line.
    setMapDates();
    // fit the bounds of the map to clusters on map.
    mymap.fitBounds(clusters.getBounds(), {
      padding: [50, 50],
    });
    // change citation line to add searchfilter
    if (searchFilter1.value === '') {
      citeTopic = '';
    } else {
      citeTopic = ` Search topic: "${e.target.value}."`;
    }
    document.getElementById('cite-topic').innerHTML =
                citeTopic;

    // eventlistener to clear table and reload only row
    // that was deleted. This code must be added to each
    // filter and the document as a whole because the
    // eventListener is has to reload each time it is used.

    // iterate through each of the table rows
    for (let i = 0; i < letterTable.children.length; i++) {
      // add eventListener
      document.getElementsByClassName('table-layer-button')[i]
          .style.cursor = 'pointer';
      document.getElementsByClassName('table-layer-button')[i]
          .addEventListener('click', function(e) {
          // clear the table
            clearTable();
            // iterate through each layer
            lyrAllDates.eachLayer(function(layer) {
            // load each variable related to the layer
              const layerLatLng = layer.feature.geometry.coordinates;
              const letterLink = layer.feature.properties.link;
              const letterID = layer.feature.properties.objectID;
              const letterRecipient = layer.feature.properties.recipient;
              const letterTopics = layer.feature.properties.topics;
              const letterDate = layer.feature.properties.date;
              // add new LayerInfo variable
              const layerInfo = new LayerInfo(
                  formatDate(new Date(letterDate)),
                  letterRecipient,
                  letterTopics,
                  letterLink,
                  letterID,
              );
              const tableOfLetters = new TableOfLetters();
              if (Number(e.target.id) !== letterID) {
                mymap.removeLayer(layer);
              } else if (Number(e.target.id) === letterID) {
              // add layer to table.
                tableOfLetters.addLayerToList(layerInfo);
                // add layer to map.
                layer.addTo(mymap);
                // pan to layer to center it in map.
                mymap.panTo([layerLatLng[1], layerLatLng[0]]);
                // change mapdates line.
                document.getElementById('map-title').innerHTML =
                `<p>Letter to ${letterRecipient}, on 
                      ${formatDate(new Date(letterDate))}</p>`;
              }
            });
            setTimeout(function() {
              simulateLayerClick();
            }, 300);
          });
    };
  });

  // Set the map date to the mapDates line, getting
  // information from the initialized slider.
  setMapDates();

  // Simulates a click on a leaflet marker with the
  // path tag. Only works if only one leaflet marker is on
  // the map.
  function simulateLayerClick() {
    const layerClick = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    const layerCircleMarker = document.querySelector('path');
    layerCircleMarker.dispatchEvent(layerClick);
  };

  function filterLyrAllDates(layer) {
    const letterLink = layer.feature.properties.link;
    const letterID = layer.feature.properties.objectID;
    const letterRecipient = layer.feature.properties.recipient;
    const letterTopics = layer.feature.properties.topics;
    const letterDate = layer.feature.properties.date;

    const layerInfo = new LayerInfo(
        formatDate(new Date(letterDate)),
        letterRecipient,
        letterTopics,
        letterLink,
        letterID,
    );
    const tableOfLetters = new TableOfLetters();

    let numberOfTrue = 0;
    if (
      letterRecipient
          .toLowerCase()
          .indexOf(filters.text.toLowerCase()) > -1
    ) {
      numberOfTrue += 1;
    }
    if (
      letterTopics
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
      tableOfLetters.addLayerToList(layerInfo);
    } else {
      mymap.removeLayer(layer);
    }
  }
  class TableOfLetters {
    addLayerToList(layerInfo) {
      // const tr = document.createElement('tr');
      const tr = letterTable.insertRow(-1);
      let tableNumber;
      if (letterTable.children === 0) {
        tableNumber = 1;
      } else {
        tableNumber = letterTable.children.length;
      };
      tr.innerHTML = `
        <td class = "text-center table-layer-button" id="${layerInfo.id}">
          ${tableNumber}
        </td>
        <td>${layerInfo.date}</td>
        <td>${layerInfo.recipient}</td>
        <td>${layerInfo.topics}</td>
        <td>${layerInfo.link}</td>
        `;
    };
  }

  class LayerInfo {
    constructor(date, recipient, topics, link, id) {
      this.date = date;
      this.recipient = recipient;
      this.topics = topics;
      this.link = link;
      this.id = id;
    }
  }

  lyrAllDates.eachLayer(function(layer) {
    const letterID = layer.feature.properties.objectID;
    const letterRecipient = layer.feature.properties.recipient;
    const letterTopics = layer.feature.properties.topics;
    const letterDate = layer.feature.properties.date;
    const letterLink = layer.feature.properties.link;

    const layerInfo = new LayerInfo(
        formatDate(new Date(letterDate)),
        letterRecipient,
        letterTopics,
        letterLink,
        letterID,
    );
    const tableOfLetters = new TableOfLetters();
    tableOfLetters.addLayerToList(layerInfo);
  });

  function clearTable() {
    const letterTable = document.querySelector('#letter-table tbody');
    while (letterTable.firstChild) {
      letterTable.removeChild(letterTable.firstChild);
    }
  };

  // function to set the mapdates line with
  // "Letters from dateValue1 to dateValue2"
  function setMapDates() {
    if (dateValue1 == dateValue2) {
      mapdates =
        `Letters from ${formatDate(new Date(dateValue1.value))}`;
    } else {
      mapdates =
        `Letters from <br>
            ${formatDate(new Date(dateValue1.value))}
                to ${formatDate(new Date(dateValue2.value))}`;
    }
    document.getElementById('map-title').innerHTML = mapdates;
  };

  // make sure all popups are closed on map load.
  mymap.closePopup();

  // set the bounds of the map on load.
  mymap.fitBounds(lyrAllDates.getBounds(), {
    padding: [50, 50],
  });

  // *****Event Buttons*****

  // eventlistener to clear table and reload only row
  // that was deleted. This code must be added to each
  // filter and the document as a whole because the
  // eventListener is has to reload each time it is used.
  // ****************************************
  // iterate through each of the table rows
  for (let i = 0; i < letterTable.children.length; i++) {
    // add eventListener
    document.getElementsByClassName('table-layer-button')[i]
        .style.cursor = 'pointer';
    document.getElementsByClassName('table-layer-button')[i]
        .addEventListener('click', function(e) {
        // clear the table
          clearTable();
          // iterate through each layer
          lyrAllDates.eachLayer(function(layer) {
          // load each variable related to the layer
            const layerLatLng = layer.feature.geometry.coordinates;
            const letterLink = layer.feature.properties.link;
            const letterID = layer.feature.properties.objectID;
            const letterRecipient = layer.feature.properties.recipient;
            const letterTopics = layer.feature.properties.topics;
            const letterDate = layer.feature.properties.date;

            // add new LayerInfo variable
            const layerInfo = new LayerInfo(letterDate,
                letterRecipient,
                letterTopics,
                letterLink,
                letterID,
            );
            const tableOfLetters = new TableOfLetters();
            if (Number(e.target.id) !== letterID) {
              mymap.removeLayer(layer);
            } else if (Number(e.target.id) === letterID) {
              tableOfLetters.addLayerToList(layerInfo);
              layer.addTo(mymap);
              // pan to layer to center it in map.
              mymap.panTo([layerLatLng[1], layerLatLng[0]]);
              // change mapdates line.
              document.getElementById('map-title').innerHTML =
              `<p>Letter to ${letterRecipient}, on 
                    ${formatDate(new Date(letterDate))}</p>`;
            }
          });
          setTimeout(function() {
            simulateLayerClick();
          }, 300);
        });
  };

  document.querySelector('#table-button')
      .addEventListener('click', function() {
        if (document.querySelector('#letter-table')
            .style.display === 'block') {
          document.querySelector('#letter-table')
              .style.display = 'none',
          document.querySelector('#table-button')
              .innerHTML = 'Open Table';
        } else {
          document.querySelector('#letter-table')
              .style.display = 'block';
          document.querySelector('#table-button')
              .innerHTML = 'Close Table';
        }
      });

  document.querySelector('.example')
      .addEventListener('click', function() {
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        inputSearchName('Noailles');
        inputSearchTopic('polish election');
        inputDate1('1572-01-01');
        inputDate2('1574-01-01');
        mymap.fitBounds(clusters.getBounds(), {
          padding: [50, 50],
        });
        document.getElementById('map-title').innerHTML =
        `Example Event: Letters to the Noailles, 
            ${formatDate(new Date(dateValue1.value))} to 
            ${formatDate(new Date(dateValue2.value))}`;
      });

  mymap.scrollWheelZoom.disable();
});

// set the date for the cite-accessed-date
// for the citation
const citeAccessedDate = new Date();
document.querySelector('#cite-accessed-date')
    .innerHTML=`
    ${citeAccessedDate.getDate()} 
    ${months[citeAccessedDate.getMonth()]} 
    ${citeAccessedDate.getUTCFullYear()}
    `;

// set the bounds to the clusters since lyrAllDates.getBounds
// for some reason moves the map up for no reason.
// setTimeout(function() {
//   mymap.fitBounds(clusters.getBounds(), {
//     padding: [50, 50],
//   });
//   console.log(clusters.getCenter());
// }, 200);

// create Homeview action
document.querySelector('.homeview')
    .addEventListener('click', function() {
      revertMap();
      lyrGroup.clearLayers();
      lyrGroup.addLayer(lyrAllDates);
      mymap.fitBounds(clusters.getBounds(), {
        padding: [50, 50],
      });
    });

// Create a new date from a string, return as a timestamp.
function timestamp(str) {
  return new Date(str).getTime();
  // return new Date(Date.UTC(str));
}

function formatDate(date) {
  // eslint-disable-next-line max-len
  return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
};

// revert the map to its original state
function revertMap() {
  searchFilter.value = '';
  searchFilter.dispatchEvent(new KeyboardEvent('input'));
  searchFilter1.value = '';
  searchFilter1.dispatchEvent(new KeyboardEvent('input'));
  slider.noUiSlider.reset();
  mymap.closePopup();
};

// change the value of dateValue1
function inputDate1(date1) {
  dateValue1.value = date1;
  dateValue1.dispatchEvent(new KeyboardEvent('input'));
};

// change the value of dateValue2
function inputDate2(date2) {
  dateValue2.value = date2;
  dateValue2.dispatchEvent(new KeyboardEvent('input'));
};

function inputSearchName(name) {
  searchFilter.value = name;
  searchFilter.dispatchEvent(new KeyboardEvent('input'));
};

function inputSearchTopic(topic) {
  searchFilter1.value = topic;
  searchFilter1.dispatchEvent(new KeyboardEvent('input'));
};


//* ****Shows coordinates of mouse in 'map_coords' section******
mymap.addEventListener('mousemove', function(e) {
  const str = `Lat: ${e.latlng.lat.toFixed(2)}
    Long: ${e.latlng.lng.toFixed(2)} | Zoom: ${mymap.getZoom()}`;
  document.querySelector('#map_coords').innerHTML = str;
});
// *****Data Toggles on links declaring inoperability and footnotes*****
$('[data-toggle="popover"]').popover({
  trigger: 'hover',
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
