var mymap = L.map("mapid", {
  maxZoom: 6,
});
var popup;
var lyrAllDates;
var lyrGroup;
var clusters;
var lyrEsri_WorldShadedRelief;
var ambassadorgeojson;
var circleMarker;
var circleMarker1;
var ctlLayers;
var objBasemap;
var objOverlays;
var mrkCircles;
var slider;
var mapdates;
var clusterWidth;
var clusterColor;
var clusterBorder;
var clusterTextColor;
var clusterMaxWidth;
var marginTop;
var marginTop2;
var marginLeft;
var min;
var max;
var filters = {
  text: "",
  ranges: [],
};

$(document).ready(function () {
  var lyrEsri_WorldShadedRelief = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles &copy; Esri &mdash; Source: Esri",
      maxZoom: 13,
    }
  ).addTo(mymap);

  // *****loading data to the map******
  var ambassadorgeojson = false;

  fetch("data/16c-diplomats_data.geojson", {
    method: "GET",
  })
    .then((Response) => Response.json())
    .then((json) => {
      min = 1515;
      max = 1555;
      // console.log(json)

      clusters = L.markerClusterGroup.layerSupport({
        iconCreateFunction: function (cluster) {
          clusterWidth = 30 + cluster.getChildCount() * 0.5;

          if (
            (cluster._cLatLng.lat == "55.68", cluster._cLatLng.lng == "12.57")
          ) {
            clusterColor = "rgba(193,184,78,0.8)";
          } else if (
            (cluster._cLatLng.lat == "51.51", cluster._cLatLng.lng == "-0.12")
          ) {
            clusterColor = "rgba(20,234,52,0.8)";
          } else if (
            (cluster._cLatLng.lat == "44.84", cluster._cLatLng.lng == "11.62")
          ) {
            clusterColor = "rgba(254,191,229.0.8)";
          } else if (
            (cluster._cLatLng.lat == "46.21", cluster._cLatLng.lng == "6.14")
          ) {
            clusterColor = "rgba(194,243,253,0.8)";
          } else if (
            (cluster._cLatLng.lat == "46.66", cluster._cLatLng.lng == "9.63")
          ) {
            clusterColor = "rgba(230,0,0,0.8)";
          } else if (
            (cluster._cLatLng.lat == "48.21", cluster._cLatLng.lng == "16.36")
          ) {
            clusterColor = "rgba(255,255,0,0.8)";
          } else if (
            (cluster._cLatLng.lat == "52.37", cluster._cLatLng.lng == "4.89")
          ) {
            clusterColor = "rgba(180,253,223,0.8)";
          } else if (
            (cluster._cLatLng.lat == "41.01", cluster._cLatLng.lng == "28.96")
          ) {
            clusterColor = "rgba(0,0,0,0.8)";
          } else if (
            (cluster._cLatLng.lat == "52.23", cluster._cLatLng.lng == "21.02")
          ) {
            clusterColor = "rgba(214,216,255,0.8)";
          } else if (
            (cluster._cLatLng.lat == "38.72", cluster._cLatLng.lng == "-9.13")
          ) {
            clusterColor = "rgba(255,253,180,0.8)";
          } else if (
            (cluster._cLatLng.lat == "41.89", cluster._cLatLng.lng == "12.51")
          ) {
            clusterColor = "rgba(239,202,253,0.8)";
          } else if (
            (cluster._cLatLng.lat == "45.06", cluster._cLatLng.lng == "7.68")
          ) {
            clusterColor = "rgba(226,253,211,0.8)";
          } else if (
            (cluster._cLatLng.lat == "51.05", cluster._cLatLng.lng == "13.35")
          ) {
            clusterColor = "rgba(253,217,198,0.8)";
          } else if (
            (cluster._cLatLng.lat == "55.95", cluster._cLatLng.lng == "-3.19")
          ) {
            clusterColor = "rgba(255,255,190,0.8)";
          } else if (
            (cluster._cLatLng.lat == "40.43", cluster._cLatLng.lng == "-3.7")
          ) {
            clusterColor = "rgba(234,234,234,0.8)";
          } else if (
            (cluster._cLatLng.lat == "46.94", cluster._cLatLng.lng == "7.45")
          ) {
            clusterColor = "rgba(184,0,230,0.8)";
          } else if (
            (cluster._cLatLng.lat == "43.46", cluster._cLatLng.lng == "11.14")
          ) {
            clusterColor = "rgba(187,223,254,0.8)";
          } else if (
            (cluster._cLatLng.lat == "45.44", cluster._cLatLng.lng == "12.33")
          ) {
            clusterColor = "rgba(156,156,156,0.8)";
          } else {
            clusterColor = "white";
          }
          if (
            (cluster._cLatLng.lat == "41.01", cluster._cLatLng.lng == "28.96")
          ) {
            (clusterTextColor = "white"), (clusterBorder = "solid white");
          } else {
            (clusterTextColor = "black"), (clusterBorder = "solid black");
          }
          marginTop = (clusterWidth - 23) / 2;
          marginLeft = (clusterWidth - 10) / 2;
          marginTop2 = (clusterWidth - 15) / 2;
          return L.divIcon({
            html:
              '<div class="clusterdiv" style="width:' +
              clusterWidth +
              "px; height: " +
              clusterWidth +
              "px; max-height:" +
              clusterMaxWidth +
              "px; max-width:" +
              clusterMaxWidth +
              "px; margin-top:-" +
              marginTop2 +
              "px; margin-left:-" +
              marginLeft +
              "px; background-color:" +
              clusterColor +
              "; color:" +
              clusterTextColor +
              "; border:" +
              clusterBorder +
              '"><div class="clustertext" style="margin-top:' +
              marginTop +
              'px"><b>' +
              cluster.getChildCount() +
              "</b></div></div>",
            // className: 'clusterdiv',
            // iconSize: new L.Point(width, width)
          });
        },
        maxClusterRadius: 0,
      });

      clusters.on("clusterclick", function (a) {
        // a.layer is actually a cluster
        // console.log('cluster ' + a.layer.getAllChildMarkers());
      });

      clusters.on("clustermouseover", function (a) {
        if (
          (a.layer._cLatLng.lat == "55.68", a.layer._cLatLng.lng == "12.57")
        ) {
          popupText = "<p>Denmark</>";
        } else if (
          (a.layer._cLatLng.lat == "51.51", a.layer._cLatLng.lng == "-0.12")
        ) {
          popupText = "<p>England</p>";
        } else if (
          (a.layer._cLatLng.lat == "44.84", a.layer._cLatLng.lng == "11.62")
        ) {
          popupText = "<p>Ferrara</p>";
        } else if (
          (a.layer._cLatLng.lat == "46.21", a.layer._cLatLng.lng == "6.14")
        ) {
          popupText = "<p>Geneva</p>";
        } else if (
          (a.layer._cLatLng.lat == "46.66", a.layer._cLatLng.lng == "9.63")
        ) {
          popupText = "<p>Grisons</p>";
        } else if (
          (a.layer._cLatLng.lat == "48.21", a.layer._cLatLng.lng == "16.36")
        ) {
          popupText = "<p>Holy Roman Empire</p>";
        } else if (
          (a.layer._cLatLng.lat == "52.37", a.layer._cLatLng.lng == "4.89")
        ) {
          popupText = "<p>The Netherlands</p>";
        } else if (
          (a.layer._cLatLng.lat == "41.01", a.layer._cLatLng.lng == "28.96")
        ) {
          popupText = "<p>Ottoman Empire</p>";
        } else if (
          (a.layer._cLatLng.lat == "52.23", a.layer._cLatLng.lng == "21.02")
        ) {
          popupText = "<p>Poland</p>";
        } else if (
          (a.layer._cLatLng.lat == "38.72", a.layer._cLatLng.lng == "-9.13")
        ) {
          popupText = "<p>Portugal</p>";
        } else if (
          (a.layer._cLatLng.lat == "41.89", a.layer._cLatLng.lng == "12.51")
        ) {
          popupText = "<p>Rome</p>";
        } else if (
          (a.layer._cLatLng.lat == "45.06", a.layer._cLatLng.lng == "7.68")
        ) {
          popupText = "<p>Savoy</p>";
        } else if (
          (a.layer._cLatLng.lat == "51.05", a.layer._cLatLng.lng == "13.35")
        ) {
          popupText = "<p>Saxony</p>";
        } else if (
          (a.layer._cLatLng.lat == "55.95", a.layer._cLatLng.lng == "-3.19")
        ) {
          popupText = "<p>Scotland</p>";
        } else if (
          (a.layer._cLatLng.lat == "40.43", a.layer._cLatLng.lng == "-3.7")
        ) {
          popupText = "<p>Spain</p>";
        } else if (
          (a.layer._cLatLng.lat == "46.94", a.layer._cLatLng.lng == "7.45")
        ) {
          popupText = "<p>The Swiss Cantons</p>";
        } else if (
          (a.layer._cLatLng.lat == "43.46", a.layer._cLatLng.lng == "11.14")
        ) {
          popupText = "<p>Tuscany</p>";
        } else if (
          (a.layer._cLatLng.lat == "45.44", a.layer._cLatLng.lng == "12.33")
        ) {
          popupText = "<p>Venice</p>";
        } else {
          popupText = "<p></p>";
        }
        var popup = L.popup()
          .setLatLng([a.layer._cLatLng.lat, a.layer._cLatLng.lng])
          .setContent(popupText)
          .openOn(mymap);
        a.layer.openPopup(popup);
      });

      clusters.on("clustermouseout", function () {
        mymap.closePopup(popup);
      });

      // *****Layer data for the layer group that goes into the clusters*****
      lyrAllDates = L.geoJson(json, {
        pointToLayer: function (feature, latlng) {
          // *****Popup HTML*****
          var str =
            "<p style=text-align:center><span style=font-weight:bold> " +
            feature.properties.name +
            "</span></p><hr>";
          str +=
            "<p><span style= font-weight:bold>Place:</span> " +
            feature.properties.place +
            "</p>";
          str +=
            "<p><span style=font-weight:bold>Year:</span> " +
            feature.properties.year +
            "</p>";
          str +=
            "<p><span style=font-weight:bold>Information:</span> " +
            feature.properties.ambInfo +
            "</p>";
          str +=
            "<p><span style=font-weight:bold>Source:</span> " +
            feature.properties.source +
            "</p>";
          str +=
            "<p><span style=font-weight:bold>Link:</span> " +
            feature.properties.link +
            "</p>";
          // *******delete the objectID string before publication********
          // str += "<p><span style=font-weight:bold>Object ID:</span>: "+feature.properties.objectID +"</p>";
          if (feature.properties.place == "Swiss") {
            (fillCircle = "purple"), (colorCircle = "black");
          } else if (feature.properties.place == "Grisons") {
            (fillCircle = "#e60000"), (colorCircle = "#000000");
          } else if (feature.properties.place == "Holy Roman Empire") {
            (fillCircle = "#ffff00"), (colorCircle = "#000000");
          } else if (feature.properties.place == "England") {
            (fillCircle = "#4ce600"), (colorCircle = "#000000");
          } else if (feature.properties.place == "Venice") {
            (fillCircle = "#9c9c9c"), (colorCircle = "#000000");
          } else if (feature.properties.place == "Denmark") {
            (fillCircle = "#c1b8fe"), (colorCircle = "#000000");
          } else if (feature.properties.place == "Ferrara") {
            (fillCircle = "#febfe5"), (colorCircle = "#000000");
          } else if (feature.properties.place == "Geneva") {
            (fillCircle = "#c2f3fd"), (colorCircle = "#000000");
          } else if (feature.properties.place == "Ottoman Empire") {
            (fillCircle = "#000000"), (colorCircle = "white");
          } else if (feature.properties.place == "Netherlands") {
            (fillCircle = "#b4fddf"), (colorCircle = "#000000");
          } else if (feature.properties.place == "Poland") {
            (fillCircle = "#d6d8ff"), (colorCircle = "#000000");
          } else if (feature.properties.place == "Portugal") {
            (fillCircle = "#fffdb4"), (colorCircle = "#000000");
          } else if (feature.properties.place == "Rome") {
            (fillCircle = "#efcafd"), (colorCircle = "#000000");
          } else if (feature.properties.place == "Savoy") {
            (fillCircle = "#e2fdd3"), (colorCircle = "#000000");
          } else if (feature.properties.place == "Saxe") {
            (fillCircle = "#fdd9c6"), (colorCircle = "#000000");
          } else if (feature.properties.place == "Scotland") {
            (fillCircle = "#ffffbe"), (colorCircle = "#000000");
          } else if (feature.properties.place == "Spain") {
            (fillCircle = "#ffffff"), (colorCircle = "#000000");
          } else if (feature.properties.place == "Tuscany") {
            (fillCircle = "#bbdffe"), (colorCircle = "#000000");
          } else {
            (fillCircle = "blue"), (colorCircle = "000000");
          }
          var circleMarker = L.circleMarker(latlng, {
            radius: "10",
            fillColor: fillCircle,
            color: colorCircle,
            fillOpacity: "1",
          }).on("mouseover", function () {
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
      lyrGroup = L.featureGroup().addLayer(lyrAllDates);

      clusters.addTo(mymap);
      clusters.checkIn(lyrGroup);
      lyrGroup.addTo(mymap);

      //    *****gets the slider min/max*****
      lyrAllDates.eachLayer(function (layer) {
        if (layer.feature.properties.year < min) {
          min = layer.feature.properties.year;
        }
        if (layer.feature.properties.year >= max) {
          max = layer.feature.properties.year;
        }
      });

      filters.range = [min, max];
      slider = document.getElementById("slider");
      noUiSlider.create(slider, {
        start: filters.range,
        behaviour: "drag-hover",
        connect: [false, true, false],
        step: 1,
        tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
        range: {
          min: min,
          max: max,
        },
      });

      // *****Engage slider and search filter together with data*****
      slider.noUiSlider.on("set", function (e) {
        filters.range = [parseFloat(e[0]), parseFloat(e[1])];
        lyrAllDates.eachLayer(function (layer) {
          filterLyrAllDates(layer);
        });
      });

      $(document).on("keyup", "#srchfilter", function (e) {
        filters.text = e.target.value;
        lyrAllDates.eachLayer(function (layer) {
          filterLyrAllDates(layer);
        });
      });

      function filterLyrAllDates(layer) {
        let numberOfTrue = 0;
        if (
          layer.feature.properties.name
            .toLowerCase()
            .indexOf(filters.text.toLowerCase()) > -1
        ) {
          numberOfTrue += 1;
        }
        if (
          layer.feature.properties.year >= filters.range[0] &&
          layer.feature.properties.year <= filters.range[1]
        ) {
          numberOfTrue += 1;
        }
        if (numberOfTrue == 2) {
          layer.addTo(mymap);
        } else {
          mymap.removeLayer(layer);
        }
      }

      mymap.fitBounds(lyrAllDates.getBounds(), { padding: [50, 50] });

      slider.noUiSlider.on("set", function (e) {
        if (parseFloat(e[0]).toFixed(0) == parseFloat(e[1]).toFixed(0)) {
          mapdates = "French Diplomats, " + parseFloat(e[0]).toFixed(0);
        } else {
          mapdates =
            "French Diplomats, " +
            parseFloat(e[0]).toFixed(0) +
            "-" +
            parseFloat(e[1]).toFixed(0);
        }
        $("#map-title").html(mapdates);
        mymap.fitBounds(clusters.getBounds(), { padding: [50, 50] });
      });

      // *****Event Buttons*****
      $(".example").click(function () {
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        $("#srchfilter").val("Noailles");
        $("#srchfilter").trigger($.Event("keyup"));
        slider.noUiSlider.set([1545, 1580]);
        mymap.fitBounds(clusters.getBounds());
        document.getElementById("map-title").innerHTML =
          "Example Event: the Noailles Family Ambassadors, 1545-1555";
      });

      $(".homeview").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.fitBounds(lyrAllDates.getBounds());
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1515, 1600]);
        mymap.fitBounds(clusters.getBounds());
      });

      $(".poland1570s").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1570, 1580]);
        lyrAllDates.eachLayer(function (layer) {
          if (layer.feature.properties.place == "Poland") {
            layer.addTo(mymap);
          } else {
            mymap.removeLayer(layer);
          }
        });
        document.getElementById("map-title").innerHTML = "Poland, 1570-1580";
        mymap.setView([52.21, 21.01]);
      });

      $(".1516").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1516, 1516]);
        mymap.fitBounds(clusters.getBounds(), { padding: [100, 100] });
      });

      $(".1547").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1547, 1547]);
        mymap.fitBounds(clusters.getBounds());
      });

      $(".1515-1520").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1515, 1520]);
        mymap.fitBounds(clusters.getBounds(), { padding: [50, 50] });
      });

      $(".Bonnivet1518").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1518, 1518]);
        lyrAllDates.eachLayer(function (layer) {
          if (layer.feature.properties.objectID == "859") {
            layer.addTo(mymap).fire("mouseover");
          } else {
            mymap.removeLayer(layer);
          }
        });
        $("#map-title").text("Gouffier de Bonnivet in England, 1518");
      });

      $(".HRE1519").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1519, 1519]);
        lyrAllDates.eachLayer(function (layer) {
          if (
            layer.feature.properties.place == "Holy Roman Empire" &&
            layer.feature.properties.year == "1519"
          ) {
            layer.addTo(mymap).fire("mouseover");
          } else {
            mymap.removeLayer(layer);
          }
        });
        $("#map-title").text("French Diplomats in the Holy Roman Empire, 1519");
      });

      $(".daugerant1520-1525").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1520, 1525]);
        lyrAllDates.eachLayer(function (layer) {
          if (
            layer.feature.properties.place == "Swiss" &&
            layer.feature.properties.year >= "1520" &&
            layer.feature.properties.year <= "1525"
          ) {
            layer.addTo(mymap);
          } else {
            mymap.removeLayer(layer);
          }
        });
        $("#map-title").text("Louis Daugerant in the Swiss Cantons, 1520-1525");
        mymap.setView([46.92, 7.47]);
      });

      $(".portugal1520-1525").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1520, 1525]);
        lyrAllDates.eachLayer(function (layer) {
          if (
            layer.feature.properties.place == "Portugal" &&
            layer.feature.properties.year >= "1520" &&
            layer.feature.properties.year <= "1525"
          ) {
            layer.addTo(mymap);
          } else {
            mymap.removeLayer(layer);
          }
        });
        $("#map-title").text("French Diplomats in Portugal, 1520-1525");
        mymap.setView([38.74, -9.1]);
      });

      $(".1520-1525").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1520, 1525]);
        mymap.fitBounds(clusters.getBounds(), { padding: [50, 50] });
      });

      $(".1515-1525").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1515, 1525]);
        mymap.fitBounds(clusters.getBounds(), { padding: [50, 50] });
      });

      $(".1525-1535").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1525, 1535]);
        mymap.fitBounds(clusters.getBounds(), { padding: [50, 50] });
      });

      $(".1515-1535").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1515, 1535]);
        mymap.fitBounds(clusters.getBounds(), { padding: [150, 150] });
      });

      $(".1535-1555").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1535, 1555]);
        mymap.fitBounds(clusters.getBounds(), { padding: [150, 150] });
      });

      $(".1535-1540").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1535, 1540]);
        mymap.fitBounds(clusters.getBounds(), { padding: [150, 150] });
      });

      $(".1540-1545").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1540, 1545]);
        mymap.fitBounds(clusters.getBounds(), { padding: [50, 50] });
      });

      $(".1545-1550").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1545, 1550]);
        mymap.fitBounds(clusters.getBounds(), { padding: [50, 50] });
      });
      $(".1550-1555").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1550, 1555]);
        mymap.fitBounds(clusters.getBounds(), { padding: [50, 50] });
      });

      $(".1555-1560").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1555, 1560]);
        mymap.fitBounds(clusters.getBounds(), { padding: [50, 50] });
      });

      $(".1535-1560").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1535, 1560]);
        mymap.fitBounds(clusters.getBounds(), { padding: [50, 50] });
      });

      $(".1559-1600").click(function () {
        $("#srchfilter").val("");
        $("#srchfilter").trigger($.Event("keyup"));
        mymap.closePopup();
        lyrGroup.clearLayers();
        lyrGroup.addLayer(lyrAllDates);
        slider.noUiSlider.set([1559, 1600]);
        mymap.fitBounds(clusters.getBounds(), { padding: [50, 50] });
      });

      mymap.scrollWheelZoom.disable();

      //********Shows coordinates of mouse in "map_coords" section******
      mymap.on("mousemove", function (e) {
        var str =
          "Lat: " +
          e.latlng.lat.toFixed(2) +
          " Long: " +
          e.latlng.lng.toFixed(2) +
          " | Zoom: " +
          mymap.getZoom();
        $("#map_coords").html(str);
      });
    });
  // *****Data Toggles on links declaring inoperability and footnotes*****
  $('[data-toggle="popover"]').popover({ trigger: "hover" });
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
