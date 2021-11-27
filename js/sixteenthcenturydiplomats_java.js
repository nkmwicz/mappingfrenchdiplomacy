/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import { 
  makeBasicBarChart,
  makeUniqueAmbBarChart,
  styleCircles,
} from "./ambs-d3-viz.js";
const mymap = L.map('mapid', {maxZoom: 6});
const lyrEsriWorldShadedRelief = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {attribution: 'Tiles &copy; Esri &mdash; Source: Esri', maxZoom: 13});
const filters = {
  text: '',
  range: [],
};
let popup;
const searchFilter = document.querySelector('#srchfilter');

$(document).ready(function() {
  lyrEsriWorldShadedRelief.addTo(mymap);

  // *****loading data to the map******
  let lyrAllDates = false;

  fetch('data/16c-diplomats_data.json', {
    method: 'GET',
  }).then((Response) => Response.json()).then((json) => {
    let min = 1515;
    let max = 1600;
    const jsonData = json;
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
        (d) => d.properties.name),
    ([place, value])=>({place, value}),
    );

    // get unique values
    // const unique = (value, index, self) => {
    //   return self.indexOf(value) === index;
    // };

    // Call the function to make the charts
    makeBasicBarChart(grouped1515To1525, '#bar-chart1');
    makeBasicBarChart(grouped1525To1535, '#bar-chart2');
    makeUniqueAmbBarChart(groupedUniqueName1535To1560, '#bar-chart3');
    window.addEventListener('resize', function() {
      d3.select('#bar-chart1').remove();
      d3.select('#chart1')
          .append('svg')
          .attr('id', 'bar-chart1');
      makeBasicBarChart(grouped1515To1525, '#bar-chart1', '#chart1');
    }, true);
    window.addEventListener('resize', function() {
      d3.select('#bar-chart2').remove();
      d3.select('#chart2')
          .append('svg')
          .attr('id', 'bar-chart2');
      makeBasicBarChart(grouped1525To1535, '#bar-chart2', '#chart2');
    }, true);
    window.addEventListener('resize', function() {
      d3.select('#bar-chart3').remove();
      d3.select('#chart3')
          .append('svg')
          .attr('id', 'bar-chart3');
      makeBasicBarChart(grouped1525To1535, '#bar-chart3', '#chart3');
    }, true);

    const clusters = L.markerClusterGroup.layerSupport({
      iconCreateFunction: function(cluster) {

        const clusterWidth = 30 + cluster.getChildCount() * 0.5;
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
              background-color: ${styleCircles(null, cluster._cLatLng.lat).fillCircle};
              color: ${styleCircles(null, cluster._cLatLng.lat).colorCircle};
              border-color: ${styleCircles(null, cluster._cLatLng.lat).colorCircle}';>
                <div class = 'clustertext'
                style = 'margin-top: ${marginTop2}px';>
                <b> ${cluster.getChildCount()} </b>
                </div>
              </div>`,
        });
      },
      maxClusterRadius: 0,
    });

    clusters.on('clusterclick', function(a) {
      // a.layer is actually a cluster
      // console.log('cluster ' + a.layer.getAllChildMarkers());
    });

    clusters.on('clustermouseover', function(a) {
      popup = L.popup()
          .setLatLng([a.layer._cLatLng.lat, a.layer._cLatLng.lng])
          .setContent(styleCircles(null, a.layer._cLatLng.lat).clusterPopText)
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
        const circleMarker = L.circleMarker(latlng, {
          radius: '10',
          fillColor: styleCircles(feature.properties).fillCircle,
          color: styleCircles(feature.properties).colorCircle,
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
      let citedates;
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
      let citeName;
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

    let arrayOfLayers = [];
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
        // if (!(arrayOfLayers.indexOf(layer.feature.properties) > -1)) {
        //   arrayOfLayers.push(layer.feature.properties);
        // }
      } else {
        mymap.removeLayer(layer);
        // removeItemAll(arrayOfLayers, layer.feature.properties);
      }
    }

    function removeItemAll(arr, value) {
      let i = 0;
      while (i < arr.length) {
        if (arr[i] === value) {
          arr.splice(i, 1);
        } else {
          ++i;
        }
      }
      return arr;
    }

    mymap.fitBounds(lyrAllDates.getBounds(), {padding: [50, 50]});

    slider.noUiSlider.on('set', function(e) {
      let mapdates;
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
    for (let button of button1515to1520) {
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
    placement: 'top'
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
