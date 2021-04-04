var mymap = L.map('mapid').setView([44.95, 13.56], 5);
var lyrAllDatesCluster;
var lyrAllDates;
var lyr1516;
var lyr1517To1525;
var lyr1526To1535;
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
    fetch('data/diplomats_data.geojson', {
        method: 'GET'
    })
    .then(Response => Response.json())
    .then(json => {
        console.log(json)

        clusters = L.markerClusterGroup.layerSupport({
            maxClusterRadius: 0,
        });
        clusters.on('click', function(e){
            console.log(e);
        });
        
    // *****Layer data for the layer group that goes into the clusters*****
        lyrAllDates = L.geoJson(json, {
            pointToLayer: function (feature, latlng) {
                var str = "<p style= text-align:center> "+feature.properties.name +"</p><hr>";
                str += "<p>Place: "+feature.properties.place +"</p>";
                str += "<p>Year: "+feature.properties.year +"</p>";
                str += "<p>Information: "+feature.properties.ambInfo +"</p>";
        // *******delete the objectID string before publication********
                str += "<p>Object ID: "+feature.properties.objectID +"</p>";
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
                .on('mouseout', function(){this.closePopup()})
                return circleMarker;
            },
        });


        lyr1516 = L.geoJSON(json, {
            filter: function(feature, layer){
                return feature.properties.year=="1516" 
            },
            pointToLayer: function (feature, latlng) {
                var str = "<p style= text-align:center> "+feature.properties.name +"</p><hr>";
                str += "<p>Place: "+feature.properties.place +"</p>";
                str += "<p>Year: "+feature.properties.year +"</p>";
                str += "<p>Information: "+feature.properties.ambInfo +"</p>";
        // *******delete the objectID string before publication********
                str += "<p>Object ID: "+feature.properties.objectID +"</p>";
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
                .on('mouseout', function(){this.closePopup()})
                return circleMarker;
            },
        });

        lyr1517To1525 = L.geoJSON(json, {
            filter: function(feature, layer){
                return feature.properties.year>="1517" && feature.properties.year<="1525"
            },
            pointToLayer: function (feature, latlng) {
                var str = "<p style= text-align:center> "+feature.properties.name +"</p><hr>";
                str += "<p>Place: "+feature.properties.place +"</p>";
                str += "<p>Year: "+feature.properties.year +"</p>";
                str += "<p>Information: "+feature.properties.ambInfo +"</p>";
        // *******delete the objectID string before publication********
                str += "<p>Object ID: "+feature.properties.objectID +"</p>";
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
                .on('mouseout', function(){this.closePopup()})
                return circleMarker;
            },
        });

        lyr1526To1535 = L.geoJSON(json, {
            filter: function(feature, layer){
                return feature.properties.year>="1526" && feature.properties.year<="1535"
            },
            pointToLayer: function(feature,latlng){
                var str = "<p style= text-align:center> "+feature.properties.name +"</p><hr>";
                str += "<p>Place: "+feature.properties.place +"</p>";
                str += "<p>Year: "+feature.properties.year +"</p>";
                str += "<p>Information: "+feature.properties.ambInfo +"</p>";
        // *******delete the objectID string before publication********
                str += "<p>Object ID: "+feature.properties.objectID +"</p>";
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
                .on('mouseout', function(){this.closePopup()})
                return circleMarker;
                }
        });

        lyr1536To1545 = L.geoJSON(json, {
            filter: function(feature, layer){
                return feature.properties.year>="1536" && feature.properties.year<="1546"
            },
            pointToLayer: function(feature,latlng){
                var str = "<p style= text-align:center> "+feature.properties.name +"</p><hr>";
                str += "<p>Place: "+feature.properties.place +"</p>";
                str += "<p>Year: "+feature.properties.year +"</p>";
                str += "<p>Information: "+feature.properties.ambInfo +"</p>";
        // *******delete the objectID string before publication********
                str += "<p>Object ID: "+feature.properties.objectID +"</p>";
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
                .on('mouseout', function(){this.closePopup()})
                return circleMarker;
                }
        });

        lyr1546 = L.geoJSON(json, {
            filter: function(feature, layer){
                return feature.properties.year=="1546"
            },
            pointToLayer: function(feature,latlng){
                var str = "<p style= text-align:center> "+feature.properties.name +"</p><hr>";
                str += "<p>Place: "+feature.properties.place +"</p>";
                str += "<p>Year: "+feature.properties.year +"</p>";
                str += "<p>Information: "+feature.properties.ambInfo +"</p>";
        // *******delete the objectID string before publication********
                str += "<p>Object ID: "+feature.properties.objectID +"</p>";
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
                .on('mouseout', function(){this.closePopup()})
                return circleMarker;
                }
        });

        lyr1547 = L.geoJSON(json, {
            filter: function(feature, layer){
                return feature.properties.year=="1547"
            },
            pointToLayer: function(feature,latlng){
                var str = "<p style= text-align:center> "+feature.properties.name +"</p><hr>";
                str += "<p>Place: "+feature.properties.place +"</p>";
                str += "<p>Year: "+feature.properties.year +"</p>";
                str += "<p>Information: "+feature.properties.ambInfo +"</p>";
        // *******delete the objectID string before publication********
                str += "<p>Object ID: "+feature.properties.objectID +"</p>";
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
                .on('mouseout', function(){this.closePopup()})
                return circleMarker;
                }
        });

        lyr1548To1555 = L.geoJSON(json, {
            filter: function(feature, layer){
                return feature.properties.year>="1548" && feature.properties.year<="1555"
            },
            pointToLayer: function(feature,latlng){
                var str = "<p style= text-align:center> "+feature.properties.name +"</p><hr>";
                str += "<p>Place: "+feature.properties.place +"</p>";
                str += "<p>Year: "+feature.properties.year +"</p>";
                str += "<p>Information: "+feature.properties.ambInfo +"</p>";
        // *******delete the objectID string before publication********
                str += "<p>Object ID: "+feature.properties.objectID +"</p>";
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
                .on('mouseout', function(){this.closePopup()})
                return circleMarker;
                }
        });

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
            mymap.fitBounds(lyr1516.getBounds(), {padding:[100,100]});
        });

        $("#1547").click(function(){
            $("#map-title").text("French Ambassadors Abroad, 1547");
            lyrGroup.clearLayers();
            lyrGroup.addLayer(lyr1547);
            mymap.fitBounds(lyr1547.getBounds(), {padding:[50,50]});
        });

        $("#1515-1525").click(function(){
            $("#map-title").text("French Ambassadors Abroad, 1515 to 1525");
            lyrGroup.clearLayers();
            lyrGroup.addLayer(lyr1516);
            lyrGroup.addLayer(lyr1517To1525);
            mymap.fitBounds(lyr1517To1525.getBounds(), {padding:[100,100]} );
        });

        mymap.scrollWheelZoom.disable()

        //********Shows coordinates of mouse in "map_coords" section******
        mymap.on('mousemove', function(e){
            var str = "Latitude: "+e.latlng.lat.toFixed(2)+" Longitude: "+e.latlng.lng.toFixed(2)+" Zoom level: "+mymap.getZoom(); 
            $("#map_coords").html(str);
        });
    });
    // *****Data Toggles on links declaring inoperability and footnotes*****
    $('[data-toggle="popover"]').popover({trigger:'hover'});
    

    // *****creating the Layer control*****
    objBasemap = {
        "Esri Shaded Relief": lyrEsri_WorldShadedRelief,
    };

    objOverlays = {
        "1515-1600": lyrAllDates,  
    };

    ctlLayers = L.control.layers(objBasemap, objOverlays).addTo(mymap);
    
})