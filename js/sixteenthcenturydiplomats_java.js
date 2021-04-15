var mymap = L.map('mapid');
var popup;
var lyrAllDatesCluster;
var lyrAllDates;
var lyr1516;
var lyr1517To1525;
var lyr1520To1525;
var lyr1515To1535;
var lyr1525To1535;
var lyr1536To1545;
var lyr1546;
var lyr1547;
var lyr1548To1555;
var lyrGroup;
var lyrGeoJson;
var clusters;
var popup;
var lyrEsri_WorldShadedRelief;
var ambassadorgeojson;
var circleMarker;
var circleMarker1;
var ctlLayers;
var objBasemap;
var objOverlays;
var mrkCircles;

$(document).ready(function(){
    var lyrEsri_WorldShadedRelief = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
	maxZoom: 13
    }).addTo(mymap);

    // *****loading data to the map******
    var ambassadorgeojson = false;
    fetch('data/16c-diplomats_data.geojson', {
        method: 'GET'
    })
    .then(Response => Response.json())
    .then(json => {
        console.log(json)

        clusters = L.markerClusterGroup.layerSupport({
            maxClusterRadius: 0,
        });
        clusters.on('clustermouseover', function(a){
            if (a.layer._cLatLng.lat == '55.68', a.layer._cLatLng.lng == '12.57'){
                popupText = "<p>Denmark</p>"
            } else if (a.layer._cLatLng.lat == '51.51', a.layer._cLatLng.lng == '-0.12'){
                    popupText = "<p>England</p>"
            } else if (a.layer._cLatLng.lat == '44.84', a.layer._cLatLng.lng == '11.62'){
                popupText = "<p>Ferrara</p>"
            } else if (a.layer._cLatLng.lat == '46.21', a.layer._cLatLng.lng == '6.14'){
                popupText = "<p>Geneva</p>"
            } else if (a.layer._cLatLng.lat == '46.66', a.layer._cLatLng.lng == '9.63'){
                popupText = "<p>Grisons</p>"
            } else if (a.layer._cLatLng.lat == '48.21', a.layer._cLatLng.lng == '16.36'){
                popupText = "<p>Holy Roman Empire</p>"
            } else if (a.layer._cLatLng.lat == '52.37', a.layer._cLatLng.lng == '4.89'){
                popupText = "<p>The Netherlands</p>"
            } else if (a.layer._cLatLng.lat == '41.01', a.layer._cLatLng.lng == '28.96'){
                popupText = "<p>Ottoman Empire</p>"
            } else if (a.layer._cLatLng.lat == '52.23', a.layer._cLatLng.lng == '21.02'){
                popupText = "<p>Poland</p>"
            } else if (a.layer._cLatLng.lat == '38.72', a.layer._cLatLng.lng == '-9.13'){
                popupText = "<p>Portugal</p>"
            } else if (a.layer._cLatLng.lat == '41.89', a.layer._cLatLng.lng == '12.51'){
                popupText = "<p>Rome</p>"
            } else if (a.layer._cLatLng.lat == '45.06', a.layer._cLatLng.lng == '7.68'){
                popupText = "<p>Savoy</p>"
            } else if (a.layer._cLatLng.lat == '51.05', a.layer._cLatLng.lng == '13.35'){
                popupText = "<p>Saxony</p>"
            } else if (a.layer._cLatLng.lat == '55.95', a.layer._cLatLng.lng == '-3.19'){
                popupText = "<p>Scotland</p>"
            } else if (a.layer._cLatLng.lat == '40.43', a.layer._cLatLng.lng == '-3.7'){
                popupText = "<p>Spain</p>"
            } else if (a.layer._cLatLng.lat == '46.94', a.layer._cLatLng.lng == '7.45'){
                popupText = "<p>The Swiss Cantons</p>"
            } else if (a.layer._cLatLng.lat == '43.46', a.layer._cLatLng.lng == '11.14'){
                popupText = "<p>Tuscany</p>"
            } else if (a.layer._cLatLng.lat == '45.44', a.layer._cLatLng.lng == '12.33'){
                popupText = "<p>Venice</p>"
            } else {
                popupText = "<p></p>"
            };
            var popup = L.popup()
                .setLatLng([a.layer._cLatLng.lat, a.layer._cLatLng.lng])
                .setContent(popupText)
                .openOn(mymap);
            a.layer.openPopup(popup)
        });

        clusters.on('clustermouseout', function(){
            mymap.closePopup(popup);
        });

        
    // *****Layer data for the layer group that goes into the clusters*****
        lyrAllDates = L.geoJson(json, {
            pointToLayer: function (feature, latlng) {
                var str = "<p style=text-align:center><span style=font-weight:bold> "+feature.properties.name +"</span></p><hr>";
                str += "<p><span style= font-weight:bold>Place:</span> "+feature.properties.place +"</p>";
                str += "<p><span style=font-weight:bold>Year:</span> "+feature.properties.year +"</p>";
                str += "<p><span style=font-weight:bold>Information:</span> "+feature.properties.ambInfo +"</p>";
                str += "<p><span style=font-weight:bold>Source:</span> "+feature.properties.source +"</p>";
                str += "<p><span style=font-weight:bold>Link:</span> "+feature.properties.link +"</p>";
        // *******delete the objectID string before publication********
                str += "<p><span style=font-weight:bold>Object ID:</span>: "+feature.properties.objectID +"</p>";
                if (feature.properties.place == 'Swiss') {
                    fillCircle='purple',
                    colorCircle='black'
                } else if (feature.properties.place == 'Grisons') {
                    fillCircle='#e60000',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Holy Roman Empire') {
                    fillCircle='#ffff00',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'England') {
                    fillCircle='#4ce600',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Venice') {
                    fillCircle='#9c9c9c',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Denmark') {
                    fillCircle='#c1b8fe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ferrara') {
                    fillCircle='#febfe5',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Geneva') {
                    fillCircle='#c2f3fd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ottoman Empire') {
                    fillCircle='#000000',
                    colorCircle='white'
                } else if (feature.properties.place == 'Netherlands') {
                    fillCircle='#b4fddf',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Poland') {
                    fillCircle='#d6d8ff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Portugal') {
                    fillCircle='#fffdb4',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Rome') {
                    fillCircle='#efcafd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Savoy') {
                    fillCircle='#e2fdd3',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Saxe') {
                    fillCircle='#fdd9c6',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Scotland') {
                    fillCircle='#ffffbe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Spain') {
                    fillCircle='#ffffff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Tuscany') {
                    fillCircle='#bbdffe',
                    colorCircle='#000000'
                } else {
                    fillCircle='blue',
                    colorCircle='000000'
                };
                var circleMarker = L.circleMarker(latlng, {radius:'10', fillColor:fillCircle, color:colorCircle, fillOpacity:'1'})
                .on('mouseover', function(){this.bindPopup(str).openPopup()})
                return circleMarker;
            },
        });


        lyr1516 = L.geoJSON(json, {
            filter: function(feature, layer){
                return feature.properties.year=="1516" 
            },
            pointToLayer: function (feature, latlng) {
                var str = "<p style=text-align:center><span style=font-weight:bold> "+feature.properties.name +"</span></p><hr>";
                str += "<p><span style= font-weight:bold>Place:</span> "+feature.properties.place +"</p>";
                str += "<p><span style=font-weight:bold>Year:</span> "+feature.properties.year +"</p>";
                str += "<p><span style=font-weight:bold>Information:</span> "+feature.properties.ambInfo +"</p>";
                str += "<p><span style=font-weight:bold>Source:</span> "+feature.properties.source +"</p>";
                str += "<p><span style=font-weight:bold>Link:</span> "+feature.properties.link +"</p>";
        // *******delete the objectID string before publication********
                str += "<p><span style=font-weight:bold>Object ID:</span>: "+feature.properties.objectID +"</p>";       
                if (feature.properties.place == 'Swiss') {
                    fillCircle='purple',
                    colorCircle='black'
                } else if (feature.properties.place == 'Grisons') {
                    fillCircle='#e60000',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Holy Roman Empire') {
                    fillCircle='#ffff00',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'England') {
                    fillCircle='#4ce600',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Venice') {
                    fillCircle='#9c9c9c',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Denmark') {
                    fillCircle='#c1b8fe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ferrara') {
                    fillCircle='#febfe5',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Geneva') {
                    fillCircle='#c2f3fd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ottoman Empire') {
                    fillCircle='#000000',
                    colorCircle='white'
                } else if (feature.properties.place == 'Netherlands') {
                    fillCircle='#b4fddf',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Poland') {
                    fillCircle='#d6d8ff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Portugal') {
                    fillCircle='#fffdb4',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Rome') {
                    fillCircle='#efcafd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Savoy') {
                    fillCircle='#e2fdd3',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Saxe') {
                    fillCircle='#fdd9c6',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Scotland') {
                    fillCircle='#ffffbe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Spain') {
                    fillCircle='#ffffff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Tuscany') {
                    fillCircle='#bbdffe',
                    colorCircle='#000000'
                } else {
                    fillCircle='blue',
                    colorCircle='000000'
                };
                var circleMarker = L.circleMarker(latlng, {radius:'10', fillColor:fillCircle, color:colorCircle, fillOpacity:'1'})
                .on('mouseover', function(){this.bindPopup(str).openPopup()})
                return circleMarker;
            },
        });

        lyr1515To1520 = L.geoJSON(json, {
            filter: function(feature, layer){
                return feature.properties.year>="1515" && feature.properties.year<="1520"
            },
            pointToLayer: function (feature, latlng) {
                var str = "<p style=text-align:center><span style=font-weight:bold> "+feature.properties.name +"</span></p><hr>";
                str += "<p><span style= font-weight:bold>Place:</span> "+feature.properties.place +"</p>";
                str += "<p><span style=font-weight:bold>Year:</span> "+feature.properties.year +"</p>";
                str += "<p><span style=font-weight:bold>Information:</span> "+feature.properties.ambInfo +"</p>";
                str += "<p><span style=font-weight:bold>Source:</span> "+feature.properties.source +"</p>";
                str += "<p><span style=font-weight:bold>Link:</span> "+feature.properties.link +"</p>";
        // *******delete the objectID string before publication********
                str += "<p><span style=font-weight:bold>Object ID:</span>: "+feature.properties.objectID +"</p>";               
                 if (feature.properties.place == 'Swiss') {
                    fillCircle='purple',
                    colorCircle='black'
                } else if (feature.properties.place == 'Grisons') {
                    fillCircle='#e60000',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Holy Roman Empire') {
                    fillCircle='#ffff00',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'England') {
                    fillCircle='#4ce600',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Venice') {
                    fillCircle='#9c9c9c',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Denmark') {
                    fillCircle='#c1b8fe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ferrara') {
                    fillCircle='#febfe5',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Geneva') {
                    fillCircle='#c2f3fd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ottoman Empire') {
                    fillCircle='#000000',
                    colorCircle='white'
                } else if (feature.properties.place == 'Netherlands') {
                    fillCircle='#b4fddf',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Poland') {
                    fillCircle='#d6d8ff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Portugal') {
                    fillCircle='#fffdb4',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Rome') {
                    fillCircle='#efcafd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Savoy') {
                    fillCircle='#e2fdd3',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Saxe') {
                    fillCircle='#fdd9c6',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Scotland') {
                    fillCircle='#ffffbe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Spain') {
                    fillCircle='#ffffff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Tuscany') {
                    fillCircle='#bbdffe',
                    colorCircle='#000000'
                } else {
                    fillCircle='blue',
                    colorCircle='000000'
                };
                var circleMarker = L.circleMarker(latlng, {radius:'10', fillColor:fillCircle, color:colorCircle, fillOpacity:'1'})
                .on('mouseover', function(){this.bindPopup(str).openPopup()})
                return circleMarker;
            },
        });

        lyr1520To1525 = L.geoJSON(json, {
            filter: function(feature, layer){
                return feature.properties.year>="1520" && feature.properties.year<="1525"
            },
            pointToLayer: function (feature, latlng) {
                var str = "<p style=text-align:center><span style=font-weight:bold> "+feature.properties.name +"</span></p><hr>";
                str += "<p><span style= font-weight:bold>Place:</span> "+feature.properties.place +"</p>";
                str += "<p><span style=font-weight:bold>Year:</span> "+feature.properties.year +"</p>";
                str += "<p><span style=font-weight:bold>Information:</span> "+feature.properties.ambInfo +"</p>";
                str += "<p><span style=font-weight:bold>Source:</span> "+feature.properties.source +"</p>";
                str += "<p><span style=font-weight:bold>Link:</span> "+feature.properties.link +"</p>";
        // *******delete the objectID string before publication********
                str += "<p><span style=font-weight:bold>Object ID:</span>: "+feature.properties.objectID +"</p>";               
                 if (feature.properties.place == 'Swiss') {
                    fillCircle='purple',
                    colorCircle='black'
                } else if (feature.properties.place == 'Grisons') {
                    fillCircle='#e60000',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Holy Roman Empire') {
                    fillCircle='#ffff00',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'England') {
                    fillCircle='#4ce600',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Venice') {
                    fillCircle='#9c9c9c',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Denmark') {
                    fillCircle='#c1b8fe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ferrara') {
                    fillCircle='#febfe5',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Geneva') {
                    fillCircle='#c2f3fd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ottoman Empire') {
                    fillCircle='#000000',
                    colorCircle='white'
                } else if (feature.properties.place == 'Netherlands') {
                    fillCircle='#b4fddf',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Poland') {
                    fillCircle='#d6d8ff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Portugal') {
                    fillCircle='#fffdb4',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Rome') {
                    fillCircle='#efcafd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Savoy') {
                    fillCircle='#e2fdd3',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Saxe') {
                    fillCircle='#fdd9c6',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Scotland') {
                    fillCircle='#ffffbe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Spain') {
                    fillCircle='#ffffff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Tuscany') {
                    fillCircle='#bbdffe',
                    colorCircle='#000000'
                } else {
                    fillCircle='blue',
                    colorCircle='000000'
                };
                var circleMarker = L.circleMarker(latlng, {radius:'10', fillColor:fillCircle, color:colorCircle, fillOpacity:'1'})
                .on('mouseover', function(){this.bindPopup(str).openPopup()})
                return circleMarker;
            },
        });

        lyr1517To1525 = L.geoJSON(json, {
            filter: function(feature, layer){
                return feature.properties.year>="1517" && feature.properties.year<="1525"
            },
            pointToLayer: function (feature, latlng) {
                var str = "<p style=text-align:center><span style=font-weight:bold> "+feature.properties.name +"</span></p><hr>";
                str += "<p><span style= font-weight:bold>Place:</span> "+feature.properties.place +"</p>";
                str += "<p><span style=font-weight:bold>Year:</span> "+feature.properties.year +"</p>";
                str += "<p><span style=font-weight:bold>Information:</span> "+feature.properties.ambInfo +"</p>";
                str += "<p><span style=font-weight:bold>Source:</span> "+feature.properties.source +"</p>";
                str += "<p><span style=font-weight:bold>Link:</span> "+feature.properties.link +"</p>";
        // *******delete the objectID string before publication********
                str += "<p><span style=font-weight:bold>Object ID:</span>: "+feature.properties.objectID +"</p>";               
                 if (feature.properties.place == 'Swiss') {
                    fillCircle='purple',
                    colorCircle='black'
                } else if (feature.properties.place == 'Grisons') {
                    fillCircle='#e60000',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Holy Roman Empire') {
                    fillCircle='#ffff00',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'England') {
                    fillCircle='#4ce600',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Venice') {
                    fillCircle='#9c9c9c',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Denmark') {
                    fillCircle='#c1b8fe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ferrara') {
                    fillCircle='#febfe5',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Geneva') {
                    fillCircle='#c2f3fd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ottoman Empire') {
                    fillCircle='#000000',
                    colorCircle='white'
                } else if (feature.properties.place == 'Netherlands') {
                    fillCircle='#b4fddf',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Poland') {
                    fillCircle='#d6d8ff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Portugal') {
                    fillCircle='#fffdb4',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Rome') {
                    fillCircle='#efcafd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Savoy') {
                    fillCircle='#e2fdd3',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Saxe') {
                    fillCircle='#fdd9c6',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Scotland') {
                    fillCircle='#ffffbe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Spain') {
                    fillCircle='#ffffff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Tuscany') {
                    fillCircle='#bbdffe',
                    colorCircle='#000000'
                } else {
                    fillCircle='blue',
                    colorCircle='000000'
                };
                var circleMarker = L.circleMarker(latlng, {radius:'10', fillColor:fillCircle, color:colorCircle, fillOpacity:'1'})
                .on('mouseover', function(){this.bindPopup(str).openPopup()})
                return circleMarker;
            },
        });

        lyr1515To1535 = L.geoJSON(json, {
            filter: function(feature, layer){
                return feature.properties.year>="1515" && feature.properties.year<="1535"
            },
            pointToLayer: function(feature,latlng){
                var str = "<p style=text-align:center><span style=font-weight:bold> "+feature.properties.name +"</span></p><hr>";
                str += "<p><span style= font-weight:bold>Place:</span> "+feature.properties.place +"</p>";
                str += "<p><span style=font-weight:bold>Year:</span> "+feature.properties.year +"</p>";
                str += "<p><span style=font-weight:bold>Information:</span> "+feature.properties.ambInfo +"</p>";
                str += "<p><span style=font-weight:bold>Source:</span> "+feature.properties.source +"</p>";
                str += "<p><span style=font-weight:bold>Link:</span> "+feature.properties.link +"</p>";
        // *******delete the objectID string before publication********
                str += "<p><span style=font-weight:bold>Object ID:</span>: "+feature.properties.objectID +"</p>";              
                  if (feature.properties.place == 'Swiss') {
                    fillCircle='purple',
                    colorCircle='black'
                } else if (feature.properties.place == 'Grisons') {
                    fillCircle='#e60000',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Holy Roman Empire') {
                    fillCircle='#ffff00',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'England') {
                    fillCircle='#4ce600',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Venice') {
                    fillCircle='#9c9c9c',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Denmark') {
                    fillCircle='#c1b8fe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ferrara') {
                    fillCircle='#febfe5',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Geneva') {
                    fillCircle='#c2f3fd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ottoman Empire') {
                    fillCircle='#000000',
                    colorCircle='white'
                } else if (feature.properties.place == 'Netherlands') {
                    fillCircle='#b4fddf',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Poland') {
                    fillCircle='#d6d8ff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Portugal') {
                    fillCircle='#fffdb4',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Rome') {
                    fillCircle='#efcafd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Savoy') {
                    fillCircle='#e2fdd3',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Saxe') {
                    fillCircle='#fdd9c6',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Scotland') {
                    fillCircle='#ffffbe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Spain') {
                    fillCircle='#ffffff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Tuscany') {
                    fillCircle='#bbdffe',
                    colorCircle='#000000'
                } else {
                    fillCircle='blue',
                    colorCircle='000000'
                };
                var circleMarker = L.circleMarker(latlng, {radius:'10', fillColor:fillCircle, color:colorCircle, fillOpacity:'1'})
                .on('mouseover', function(){this.bindPopup(str).openPopup()})
                return circleMarker;
                }
        });

        lyr1525To1535 = L.geoJSON(json, {
            filter: function(feature, layer){
                return feature.properties.year>="1525" && feature.properties.year<="1535"
            },
            pointToLayer: function(feature,latlng){
                var str = "<p style=text-align:center><span style=font-weight:bold> "+feature.properties.name +"</span></p><hr>";
                str += "<p><span style= font-weight:bold>Place:</span> "+feature.properties.place +"</p>";
                str += "<p><span style=font-weight:bold>Year:</span> "+feature.properties.year +"</p>";
                str += "<p><span style=font-weight:bold>Information:</span> "+feature.properties.ambInfo +"</p>";
                str += "<p><span style=font-weight:bold>Source:</span> "+feature.properties.source +"</p>";
                str += "<p><span style=font-weight:bold>Link:</span> "+feature.properties.link +"</p>";
        // *******delete the objectID string before publication********
                str += "<p><span style=font-weight:bold>Object ID:</span>: "+feature.properties.objectID +"</p>";               
                 if (feature.properties.place == 'Swiss') {
                    fillCircle='purple',
                    colorCircle='black'
                } else if (feature.properties.place == 'Grisons') {
                    fillCircle='#e60000',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Holy Roman Empire') {
                    fillCircle='#ffff00',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'England') {
                    fillCircle='#4ce600',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Venice') {
                    fillCircle='#9c9c9c',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Denmark') {
                    fillCircle='#c1b8fe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ferrara') {
                    fillCircle='#febfe5',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Geneva') {
                    fillCircle='#c2f3fd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ottoman Empire') {
                    fillCircle='#000000',
                    colorCircle='white'
                } else if (feature.properties.place == 'Netherlands') {
                    fillCircle='#b4fddf',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Poland') {
                    fillCircle='#d6d8ff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Portugal') {
                    fillCircle='#fffdb4',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Rome') {
                    fillCircle='#efcafd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Savoy') {
                    fillCircle='#e2fdd3',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Saxe') {
                    fillCircle='#fdd9c6',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Scotland') {
                    fillCircle='#ffffbe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Spain') {
                    fillCircle='#ffffff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Tuscany') {
                    fillCircle='#bbdffe',
                    colorCircle='#000000'
                } else {
                    fillCircle='blue',
                    colorCircle='000000'
                };
                var circleMarker = L.circleMarker(latlng, {radius:'10', fillColor:fillCircle, color:colorCircle, fillOpacity:'1'})
                .on('mouseover', function(){this.bindPopup(str).openPopup()})
                return circleMarker;
                }
        });

        lyr1535To1555 = L.geoJSON(json, {
            filter: function(feature, layer){
                return feature.properties.year>="1535" && feature.properties.year<="1555"
            },
            pointToLayer: function(feature,latlng){
                var str = "<p style=text-align:center><span style=font-weight:bold> "+feature.properties.name +"</span></p><hr>";
                str += "<p><span style= font-weight:bold>Place:</span> "+feature.properties.place +"</p>";
                str += "<p><span style=font-weight:bold>Year:</span> "+feature.properties.year +"</p>";
                str += "<p><span style=font-weight:bold>Information:</span> "+feature.properties.ambInfo +"</p>";
                str += "<p><span style=font-weight:bold>Source:</span> "+feature.properties.source +"</p>";
                str += "<p><span style=font-weight:bold>Link:</span> "+feature.properties.link +"</p>";
        // *******delete the objectID string before publication********
                str += "<p><span style=font-weight:bold>Object ID:</span>: "+feature.properties.objectID +"</p>";
                if (feature.properties.place == 'Swiss') {
                    fillCircle='purple',
                    colorCircle='black'
                } else if (feature.properties.place == 'Grisons') {
                    fillCircle='#e60000',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Holy Roman Empire') {
                    fillCircle='#ffff00',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'England') {
                    fillCircle='#4ce600',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Venice') {
                    fillCircle='#9c9c9c',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Denmark') {
                    fillCircle='#c1b8fe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ferrara') {
                    fillCircle='#febfe5',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Geneva') {
                    fillCircle='#c2f3fd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ottoman Empire') {
                    fillCircle='#000000',
                    colorCircle='white'
                } else if (feature.properties.place == 'Netherlands') {
                    fillCircle='#b4fddf',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Poland') {
                    fillCircle='#d6d8ff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Portugal') {
                    fillCircle='#fffdb4',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Rome') {
                    fillCircle='#efcafd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Savoy') {
                    fillCircle='#e2fdd3',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Saxe') {
                    fillCircle='#fdd9c6',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Scotland') {
                    fillCircle='#ffffbe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Spain') {
                    fillCircle='#ffffff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Tuscany') {
                    fillCircle='#bbdffe',
                    colorCircle='#000000'
                } else {
                    fillCircle='blue',
                    colorCircle='000000'
                };
                var circleMarker = L.circleMarker(latlng, {radius:'10', fillColor:fillCircle, color:colorCircle, fillOpacity:'1'})
                .on('mouseover', function(){this.bindPopup(str).openPopup()})
                return circleMarker;
                }
        });

        lyr1546 = L.geoJSON(json, {
            filter: function(feature, layer){
                return feature.properties.year=="1546"
            },
            pointToLayer: function(feature,latlng){
                var str = "<p style=text-align:center><span style=font-weight:bold> "+feature.properties.name +"</span></p><hr>";
                str += "<p><span style= font-weight:bold>Place:</span> "+feature.properties.place +"</p>";
                str += "<p><span style=font-weight:bold>Year:</span> "+feature.properties.year +"</p>";
                str += "<p><span style=font-weight:bold>Information:</span> "+feature.properties.ambInfo +"</p>";
                str += "<p><span style=font-weight:bold>Source:</span> "+feature.properties.source +"</p>";
                str += "<p><span style=font-weight:bold>Link:</span> "+feature.properties.link +"</p>";
        // *******delete the objectID string before publication********
                str += "<p><span style=font-weight:bold>Object ID:</span>: "+feature.properties.objectID +"</p>";
                if (feature.properties.place == 'Swiss') {
                    fillCircle='purple',
                    colorCircle='black'
                } else if (feature.properties.place == 'Grisons') {
                    fillCircle='#e60000',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Holy Roman Empire') {
                    fillCircle='#ffff00',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'England') {
                    fillCircle='#4ce600',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Venice') {
                    fillCircle='#9c9c9c',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Denmark') {
                    fillCircle='#c1b8fe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ferrara') {
                    fillCircle='#febfe5',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Geneva') {
                    fillCircle='#c2f3fd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ottoman Empire') {
                    fillCircle='#000000',
                    colorCircle='white'
                } else if (feature.properties.place == 'Netherlands') {
                    fillCircle='#b4fddf',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Poland') {
                    fillCircle='#d6d8ff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Portugal') {
                    fillCircle='#fffdb4',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Rome') {
                    fillCircle='#efcafd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Savoy') {
                    fillCircle='#e2fdd3',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Saxe') {
                    fillCircle='#fdd9c6',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Scotland') {
                    fillCircle='#ffffbe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Spain') {
                    fillCircle='#ffffff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Tuscany') {
                    fillCircle='#bbdffe',
                    colorCircle='#000000'
                } else {
                    fillCircle='blue',
                    colorCircle='000000'
                };
                var circleMarker = L.circleMarker(latlng, {radius:'10', fillColor:fillCircle, color:colorCircle, fillOpacity:'1'})
                .on('mouseover', function(){this.bindPopup(str).openPopup()})
                return circleMarker;
                }
        });

        lyr1547 = L.geoJSON(json, {
            filter: function(feature, layer){
                return feature.properties.year=="1547"
            },
            pointToLayer: function(feature,latlng){
                var str = "<p style=text-align:center><span style=font-weight:bold> "+feature.properties.name +"</span></p><hr>";
                str += "<p><span style= font-weight:bold>Place:</span> "+feature.properties.place +"</p>";
                str += "<p><span style=font-weight:bold>Year:</span> "+feature.properties.year +"</p>";
                str += "<p><span style=font-weight:bold>Information:</span> "+feature.properties.ambInfo +"</p>";
                str += "<p><span style=font-weight:bold>Source:</span> "+feature.properties.source +"</p>";
                str += "<p><span style=font-weight:bold>Link:</span> "+feature.properties.link +"</p>";
        // *******delete the objectID string before publication********
                str += "<p><span style=font-weight:bold>Object ID:</span>: "+feature.properties.objectID +"</p>";
                if (feature.properties.place == 'Swiss') {
                    fillCircle='purple',
                    colorCircle='black'
                } else if (feature.properties.place == 'Grisons') {
                    fillCircle='#e60000',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Holy Roman Empire') {
                    fillCircle='#ffff00',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'England') {
                    fillCircle='#4ce600',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Venice') {
                    fillCircle='#9c9c9c',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Denmark') {
                    fillCircle='#c1b8fe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ferrara') {
                    fillCircle='#febfe5',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Geneva') {
                    fillCircle='#c2f3fd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ottoman Empire') {
                    fillCircle='#000000',
                    colorCircle='white'
                } else if (feature.properties.place == 'Netherlands') {
                    fillCircle='#b4fddf',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Poland') {
                    fillCircle='#d6d8ff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Portugal') {
                    fillCircle='#fffdb4',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Rome') {
                    fillCircle='#efcafd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Savoy') {
                    fillCircle='#e2fdd3',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Saxe') {
                    fillCircle='#fdd9c6',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Scotland') {
                    fillCircle='#ffffbe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Spain') {
                    fillCircle='#ffffff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Tuscany') {
                    fillCircle='#bbdffe',
                    colorCircle='#000000'
                } else {
                    fillCircle='blue',
                    colorCircle='000000'
                };
                var circleMarker = L.circleMarker(latlng, {radius:'10', fillColor:fillCircle, color:colorCircle, fillOpacity:'1'})
                .on('mouseover', function(){this.bindPopup(str).openPopup()})
                return circleMarker;
                }
        });

        lyr1548To1555 = L.geoJSON(json, {
            filter: function(feature, layer){
                return feature.properties.year>="1548" && feature.properties.year<="1555"
            },
            pointToLayer: function(feature,latlng){
                var str = "<p style=text-align:center><span style=font-weight:bold> "+feature.properties.name +"</span></p><hr>";
                str += "<p><span style= font-weight:bold>Place:</span> "+feature.properties.place +"</p>";
                str += "<p><span style=font-weight:bold>Year:</span> "+feature.properties.year +"</p>";
                str += "<p><span style=font-weight:bold>Information:</span> "+feature.properties.ambInfo +"</p>";
                str += "<p><span style=font-weight:bold>Source:</span> "+feature.properties.source +"</p>";
                str += "<p><span style=font-weight:bold>Link:</span> "+feature.properties.link +"</p>";
        // *******delete the objectID string before publication********
                str += "<p><span style=font-weight:bold>Object ID:</span>: "+feature.properties.objectID +"</p>";
                if (feature.properties.place == 'Swiss') {
                    fillCircle='purple',
                    colorCircle='black'
                } else if (feature.properties.place == 'Grisons') {
                    fillCircle='#e60000',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Holy Roman Empire') {
                    fillCircle='#ffff00',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'England') {
                    fillCircle='#4ce600',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Venice') {
                    fillCircle='#9c9c9c',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Denmark') {
                    fillCircle='#c1b8fe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ferrara') {
                    fillCircle='#febfe5',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Geneva') {
                    fillCircle='#c2f3fd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Ottoman Empire') {
                    fillCircle='#000000',
                    colorCircle='white'
                } else if (feature.properties.place == 'Netherlands') {
                    fillCircle='#b4fddf',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Poland') {
                    fillCircle='#d6d8ff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Portugal') {
                    fillCircle='#fffdb4',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Rome') {
                    fillCircle='#efcafd',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Savoy') {
                    fillCircle='#e2fdd3',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Saxe') {
                    fillCircle='#fdd9c6',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Scotland') {
                    fillCircle='#ffffbe',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Spain') {
                    fillCircle='#ffffff',
                    colorCircle='#000000'
                } else if (feature.properties.place == 'Tuscany') {
                    fillCircle='#bbdffe',
                    colorCircle='#000000'
                } else {
                    fillCircle='blue',
                    colorCircle='000000'
                };
                var circleMarker = L.circleMarker(latlng, {radius:'10', fillColor:fillCircle, color:colorCircle, fillOpacity:'1'})
                .on('mouseover', function(){this.bindPopup(str).openPopup()})
                return circleMarker;
                }
        });


        // *****Console Logs for above data*****
        lyr1515To1520.on('click', function(e){
            console.log(e)
        });

        // clusters.on('clustermouseover', function(e){
        //     console.log(e);
        // });

        // *****layer group and cluster*****
        lyrGroup = L.layerGroup()
            .addLayer(lyrAllDates);
        
        clusters.addTo(mymap); 
        clusters.checkIn(lyrGroup);
        lyrGroup.addTo(mymap); 

        mymap.fitBounds(lyr1547.getBounds());

        mymap.on('click', function(e){
            console.log(e);
        });
             
        
        // *****Event Buttons*****
        $("#back-button").click(function(){
            $("#map-title").text("French Ambassadors Abroad, 1515 to 1600");
            mymap.fitBounds(lyr1547.getBounds());
            mymap.closePopup();
            lyrGroup.clearLayers();
            lyrGroup.addLayer(lyrAllDates)
        });

        $("#1516").click(function(){
            $("#map-title").text("French Ambassadors Abroad, 1516");
            lyrGroup.clearLayers();
            lyrGroup.addLayer(lyr1516);
            mymap.fitBounds(lyr1516.getBounds(), {padding:[150,150]});
        });

        $("#1547").click(function(){
            $("#map-title").text("French Ambassadors Abroad, 1547");
            lyrGroup.clearLayers();
            lyrGroup.addLayer(lyr1547);
            mymap.fitBounds(lyr1547.getBounds(), {padding:[50,50]});
        });

        $("#1515-1520").click(function(){
            $("#map-title").text("French Ambassadors Abroad, 1515-1520");
            lyrGroup.clearLayers();
            lyrGroup.addLayer(lyr1515To1520);
            mymap.fitBounds(lyr1515To1520.getBounds(), {padding:[150,150]});
        });

        $("#1520-1525").click(function(){
            $("#map-title").text("French Ambassadors Abroad, 1520-1525");
            lyrGroup.clearLayers();
            lyrGroup.addLayer(lyr1520To1525);
            mymap.fitBounds(lyr1520To1525.getBounds(), {padding:[150,150]});
        });

        $("#1515-1525").click(function(){
            $("#map-title").text("French Ambassadors Abroad, 1515 to 1525");
            lyrGroup.clearLayers();
            lyrGroup.addLayer(lyr1516);
            lyrGroup.addLayer(lyr1517To1525);
            mymap.fitBounds(lyr1517To1525.getBounds(), {padding:[100,100]} );
        });

        $("#1525-1535").click(function(){
            $("#map-title").text("French Ambassadors Abroad, 1515 to 1525");
            lyrGroup.clearLayers();
            lyrGroup.addLayer(lyr1525To1535);
            mymap.fitBounds(lyr1525To1535.getBounds());
        });

        $("#1515-1535").click(function(){
            $("#map-title").text("French Ambassadors Abraod, 1515 to 1535");
            lyrGroup.clearLayers();
            lyrGroup.addLayer(lyr1515To1535);
            mymap.fitBounds(lyr1515To1535.getBounds());
        });

        $("#1535-1555").click(function(){
            $("#map-title").text("French Ambassadors Abraod, 1535 to 1555");
            lyrGroup.clearLayers();
            lyrGroup.addLayer(lyr1535To1555);
            mymap.fitBounds(lyr1535To1555.getBounds());
        });

        mymap.scrollWheelZoom.disable()

    //********Shows coordinates of mouse in "map_coords" section******
        mymap.on('mousemove', function(e){
            var str = "Lat: "+e.latlng.lat.toFixed(2)+" Long: "+e.latlng.lng.toFixed(2)+" | Zoom: "+mymap.getZoom(); 
            $("#map_coords").html(str);
        });
    });
    // *****Data Toggles on links declaring inoperability and footnotes*****
    $('[data-toggle="popover"]').popover({trigger:'hover'});
    

    // *****creating the Layer control*****
    // objBasemap = {
    //     "Esri Shaded Relief": lyrEsri_WorldShadedRelief,
    // };

    // objOverlays = {
    //     "1515-1600": lyrAllDates,  
    // };

    // ctlLayers = L.control.layers(objBasemap, objOverlays).addTo(mymap);
    
})