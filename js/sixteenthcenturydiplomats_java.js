var mymap = L.map('mapid',{
    maxZoom: 7
});
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
var slider;
var mapdates;

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

       

        


        // *****Console Logs for above data*****
        lyrAllDates.on('click', function(e){
            console.log(e)
        });

        clusters.on('clustermouseover', function(e){
            console.log(e);
        });

        // *****layer group and cluster*****
        lyrGroup = L.layerGroup()
            .addLayer(lyrAllDates);
        
        clusters.addTo(mymap); 
        clusters.checkIn(lyrGroup);
        // clusters.checkIn(lyrAllDates);
        lyrGroup.addTo(mymap); 
        // lyrAllDates.addTo(mymap);

        // $(document).on('keyup', '#srchfilter', function(e){
        //     var userInput = e.target.value;
        //     lyrAllDates.eachLayer (function(layer){
        //         if (layer.feature.properties.name.toLowerCase().indexOf(userInput.toLowerCase())>-1){
        //             layer.addTo(mymap)
        //         } else {
        //             mymap.removeLayer(layer)
        //         }
        //     });
        // });

        slider = document.getElementById('slider');
        noUiSlider.create(slider, {
            start: [1515, 1600],
            behaviour: 'drag-hover',
            connect: [false, true, false],
            step: 1,
            tooltips: [wNumb({decimals:0}), wNumb({decimals:0})],
            range: {
                'min': 1515,
                'max': 1600
            }
        }).on('set', function(e){
            if (parseFloat(e[0]).toFixed(0)==parseFloat(e[1]).toFixed(0)){
                mapdates = "French Diplomats, "+parseFloat(e[0]).toFixed(0); 
            } else {
                mapdates = "French Diplomats, "+parseFloat(e[0]).toFixed(0)+"-"+parseFloat(e[1]).toFixed(0); 
            }
            $("#map-title").html(mapdates);
        lyrAllDates.eachLayer(function(layer){
            if(layer.feature.properties.year>=parseFloat(e[0])&&layer.feature.properties.year<=parseFloat(e[1])){
                layer.addTo(mymap);
            } else{
                mymap.removeLayer(layer);
            }   
        });
        });
        

        // slider.on('slide', function(e){
        //     console.log(e)
        // });
       

        

        mymap.fitBounds(lyrAllDates.getBounds(), {padding:[50,50]});

        mymap.on('click', function(e){
            console.log(e);
        });
             
        
        // *****Event Buttons*****
        $("#back-button").click(function(){
            mymap.fitBounds(lyrAllDates.getBounds());
            mymap.closePopup();
            slider.noUiSlider.set([1515,1600]);
            mymap.fitBounds(clusters.getBounds());
        });

        $(".1516").click(function(){
            mymap.closePopup();
            slider.noUiSlider.set([1516, 1516]);
            mymap.fitBounds(clusters.getBounds(), {padding:[100,100]});
        });

        $(".1547").click(function(){
            mymap.closePopup();
            slider.noUiSlider.set([1547, 1547]);
            mymap.fitBounds(clusters.getBounds());
        });

        $(".1515-1520").click(function(){
            mymap.closePopup();
            mymap.fitBounds(lyrAllDates.getBounds());
            slider.noUiSlider.set([1515, 1520]);
            mymap.fitBounds(clusters.getBounds(), {padding:[50,50]});
        });

        $(".Bonnivet1518").click(function(){
            mymap.closePopup();
            slider.noUiSlider.set([1518, 1518]);
            lyrAllDates.eachLayer(function(layer){
                if (layer.feature.properties.name=="Gouffier de Bonnivet, Guillaume"&&layer.feature.properties.year=="1518"){
                    layer.addTo(mymap).fire('mouseover');
                } else {
                    mymap.removeLayer(layer);
                }
            });
            $("#map-title").text("Gouffier de Bonnivet in England, 1518");
        });

        $(".HRE1519").click(function(){
            mymap.closePopup();
            slider.noUiSlider.set([1519, 1519]);
            lyrAllDates.eachLayer(function(layer){
                if (layer.feature.properties.place=="Holy Roman Empire"&&layer.feature.properties.year=="1519"){
                    layer.addTo(mymap).fire('mouseover');
                } else {
                    mymap.removeLayer(layer);
                }
            });
            $("#map-title").text("French Diplomats in the Holy Roman Empire, 1519");
            clusters.fire('mouseover');
        });

        $(".daugerant1520-1525").click(function(){
            mymap.closePopup();
            slider.noUiSlider.set([1520, 1525]);
            lyrAllDates.eachLayer(function(layer){
                if (layer.feature.properties.place=="Swiss"&&layer.feature.properties.year>="1520"&&layer.feature.properties.year<="1525"){
                    layer.addTo(mymap)
                } else {
                    mymap.removeLayer(layer);
                }
            });
            clusters.spiderfy();
            $("#map-title").text("Louis Daugerant in the Swiss Cantons, 1520-1525");
            mymap.setView([46.92,7.47]);
        });

        $(".portugal1520-1525").click(function(){
            mymap.closePopup();
            slider.noUiSlider.set([1520, 1525]);
            lyrAllDates.eachLayer(function(layer){
                if (layer.feature.properties.place=="Portugal"&&layer.feature.properties.year>="1520"&&layer.feature.properties.year<="1525"){
                    layer.addTo(mymap)
                } else {
                    mymap.removeLayer(layer);
                }
            });
            $("#map-title").text("French Diplomats in Portugal, 1520-1525");
            clusters.spiderfy();
            mymap.setView([38.74,-9.10]);
        });

        $(".1520-1525").click(function(){
            mymap.closePopup();
            slider.noUiSlider.set([1520, 1525]);
            mymap.fitBounds(clusters.getBounds(), {padding:[50,50]});
        });

        $(".1515-1525").click(function(){
            mymap.closePopup();
            slider.noUiSlider.set([1515, 1525]);
            mymap.fitBounds(clusters.getBounds(), {padding:[50,50]});

        });

        $(".1525-1535").click(function(){
            mymap.closePopup();
            slider.noUiSlider.set([1525, 1535]);
            mymap.fitBounds(clusters.getBounds(), {padding:[50,50]});

        });

        $(".1515-1535").click(function(){
            mymap.closePopup();
            slider.noUiSlider.set([1515, 1535]);
            mymap.fitBounds(clusters.getBounds(), {padding:[150,150]});

        });

        $(".1535-1555").click(function(){
            mymap.closePopup();
            slider.noUiSlider.set([1535, 1555]);
            mymap.fitBounds(clusters.getBounds(), {padding:[150,150]});

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