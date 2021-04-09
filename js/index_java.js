var mymap = L.map('mapid').setView([45,26], 5);
var popup;
var lyrAllDatesCluster;
var lyrAllDates;
var lyr1516;
var lyr1517To1525;
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
    fetch('data/diplomats_data.geojson', {
        method: 'GET'
    })
    .then(Response => Response.json())
    .then(json => {
        console.log(json)

    //    mymap.setView([45,25]);

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