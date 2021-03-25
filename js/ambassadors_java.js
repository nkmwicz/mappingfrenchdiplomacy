var mymap = L.map('mapid').setView([44.95, 17.56], 5);
var lyrMarkerCluster;

 L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        mapBounds: ([28.96, -12.48], [57.47, 55.59]),
        minZoom: 3,
        accessToken: 'pk.eyJ1Ijoibmttd2ljeiIsImEiOiJja2x6ZHdvNGoxaHBpMnZwYnA5YjJpc2U2In0.-uuGSUrEXhzzdIunjYD72w',
    }).addTo(mymap);

    lyrMarkerCluster = L.markerClusterGroup({
        maxClusterRadius: 20,
    });

    var geojsonLayer = new L.GeoJSON.AJAX('data/diplomats_data.geojson', {pointToLayer: function(feature,latlng){
        var str = "<p style= text-align:center> "+feature.properties.name +"</p><hr>";
        str += "<p>Place: "+feature.properties.place +"</p>";
        str += "<p>Year: "+feature.properties.year +"</p>";
        str += "<p>Information: "+feature.properties.ambInfo +"</p>";
    // delete the objectID string before publication
        str += "<p>Object ID: "+feature.properties.objectID +"</p>";
        return L.circleMarker(latlng, {radius: '10'}).bindPopup(str);
    }});
    geojsonLayer.addTo(mymap);

    geojsonLayer.on('data:loaded', function(){
        lyrMarkerCluster.addLayer(geojsonLayer);
        lyrMarkerCluster.addTo(mymap)
    });

mymap.scrollWheelZoom.disable()

$("#back-button").click(function(){
    mymap.setView([44.95, 17.56], 5);
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