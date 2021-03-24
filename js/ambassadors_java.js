var mymap = L.map('mapid').setView([44.95, 21.56], 5);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoibmttd2ljeiIsImEiOiJja2x6ZHdvNGoxaHBpMnZwYnA5YjJpc2U2In0.-uuGSUrEXhzzdIunjYD72w',
}).addTo(mymap);

var geojsonLayer = new L.GeoJSON.AJAX('data/diplomats_data.geojson', {pointToLayer: function(feature,latlng){
    var str = "<p style= text-align:center> "+feature.properties.name +"</p><hr>";
    str += "<p>Place: "+feature.properties.place +"</p>";
    str += "<p>Year: "+feature.properties.year +"</p>";
    str += "<p>Information: "+feature.properties.ambInfo +"</p>";
// delete the objectID string before publication
    str += "<p>Object ID: "+feature.properties.objectID +"</p>";
    return L.circleMarker(latlng).bindPopup(str);
}});
geojsonLayer.addTo(mymap);

mymap.scrollWheelZoom.disable()

// This is a clone of above to try and create separeate colored circleMarkers by making new 
// var geojsonLayer = new L.GeoJSON.AJAX('data/diplomats_data.geojson', {pointToLayer: function(feature,latlng){
//     var str = "<p style= text-align:center> "+feature.properties.name +"</p><hr>";
//     str += "<p>Place: "+feature.properties.place +"</p>";
//     str += "<p>Year: "+feature.properties.year +"</p>";
//     str += "<p>Information: "+feature.properties.ambInfo +"</p>";
//     str += "<p>Object ID: "+feature.properties.objectID +"</p>";
//     geojsonLayer.then(function(data) {
//         var ottomanempire = L.geoJson(data);
//                 var holyromanempire = L.geoJson(data, {
//             filter: function(feature, layer) {
//                 return feature.properties.place == [ "Ottoman Empire" ];
//             },
//             pointToLayer: function(feature, latlng) {
//                 return L.marker(latlng, {
//                     icon: cafeIcon
//                 }).on('mouseover', function() {
//                     this.bindPopup(feature.properties.Name).openPopup();
//                 });
//             }
//         });
//         var others = L.geoJson(data, {
//             filter: function(feature, layer) {
//                 return feature.properties.BusType != "Cafe";
//             },
//             pointToLayer: function(feature, latlng) {
//                 return L.marker(latlng, {
//                 }).on('mouseover', function() {
//                     this.bindPopup(feature.properties.Name).openPopup();
//                 });
//             }
//     return L.circleMarker(latlng).bindPopup(str);
// }});
// geojsonLayer.addTo(mymap);

// // adding new information and mouseover and filters to above geojsonLayer
// var geojsonLayer = new L.GeoJSON.AJAX('data/ambassadors_data.geojson');
// geojsonLayer.then(function(data){
//     var allbusinesses = L.geoJson(data);
//     var cafes = L.geoJson(data, {
//     filter: function(feature, layer) {
//         return feature.properties.BusType == "Cafe";
// },
// pointToLayer: function(feature, latlng) {
//     return L.marker(latlng, {
//         icon: cafeIcon
//     }).on('mouseover', function() {
//         this.bindPopup(feature.properties.Name).openPopup();
//     });
// }
// });
// })

// {pointToLayer: function(feature,latlng){
//     var str = "<p> "+feature.properties.Place +"</p><hr>";
//     str += "<p>Place: "+feature.properties.Place +"</p>";
//     str += "<p>Year: "+feature.properties.Year +"</p>";
//     return L.circleMarker(latlng).bindPopup(str);
// }});
// geojsonLayer.addTo(mymap);

// var markers = L.markerClusterGroup();
// geojsonLayer.feature.forEach(function(){
//     markers.addLayer(L.circleMarker(latlng));
// })
// mymap.addLayer(markers);

// trying to make popup of Place on mouseover
// circleMarker.on('mouseover', function(e){
//     var str = "<p> "+feature.properties.Place +"</p>";
//     e.openPopup(str);
// });

$("#back-button").click(function(){
    mymap.setView([44.95, 21.56], 5);
    mymap.closePopup();
});

//Zooms to Paris, France on click text-button "zoomto"
$("#zoomto").click(function(){
    mymap.setView([48.85, 2.35], 7)
    
});

//Shows coordinates of mouse in "map_coords" section.
mymap.on('mousemove', function(e){
    var str = "Latitude: "+e.latlng.lat.toFixed(2)+" Longitude: "+e.latlng.lng.toFixed(2)+" Zoom level: "+mymap.getZoom(); 
    $("#map_coords").html(str);
});