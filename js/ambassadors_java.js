var mymap = L.map('mapid').setView([44.95, 13.56], 5);
var lyrAllDatesCluster;
var lyrAllDates;
var lyr1515To1525;
var lyr1515To1525Cluster;
var lyrEsri_WorldShadedRelief;
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

    lyrAllDatesCluster = L.markerClusterGroup({
        maxClusterRadius: 1,
        });

    // *****loading All dates data to the map******
    var lyrAllDates = new L.GeoJSON.AJAX('data/diplomats_data.geojson',{pointToLayer: function(feature,latlng){
        var str = "<p style= text-align:center> "+feature.properties.name +"</p><hr>";
            str += "<p>Place: "+feature.properties.place +"</p>";
            str += "<p>Year: "+feature.properties.year +"</p>";
            str += "<p>Information: "+feature.properties.ambInfo +"</p>";
        // *******delete the objectID string before publication********
            str += "<p>Object ID: "+feature.properties.objectID +"</p>";
            if (feature.properties.place == 'Ottoman Empire'){
                fillCircle='red'
            } else {
                fillCircle='green'
            };
            var circleMarker = L.circleMarker(latlng, {radius: '10', fillColor:fillCircle})
            .on('mouseover',function(){this.bindPopup(str).openPopup()})
            .on('mouseout', function(){this.closePopup()});
            return circleMarker;
        }
    });
    mymap.addLayer(lyrAllDates);

    lyr1515To1525Cluster = L.markerClusterGroup({
        maxClusterRadius: 5,
        });

    var lyr1515To1525 = new L.GeoJSON.AJAX('data/diplomats_data.geojson',
        {filter: function(feature, layer){
            return feature.properties.year>="1515" && feature.properties.year<="1525"
        },
        pointToLayer: function(feature,latlng){
            var str = "<p style= text-align:center> "+feature.properties.name +"</p><hr>";
            str += "<p>Place: "+feature.properties.place +"</p>";
            str += "<p>Year: "+feature.properties.year +"</p>";
            str += "<p>Information: "+feature.properties.ambInfo +"</p>";
    // delete the objectID string before publication
            str += "<p>Object ID: "+feature.properties.objectID +"</p>";
            if (feature.properties.place == 'Ottoman Empire'){
                fillCircle='red'
                } else {
                fillCircle='green'
            };
            var circleMarker1 = L.circleMarker(latlng, {radius: '10', fillColor:fillCircle})
                .on('mouseover',function(){this.bindPopup(str).openPopup()})
                .on('mouseout', function(){this.closePopup()});
                return circleMarker1;
        }
    });

    // creating the Layer control
    objBasemap = {
        "Esri Shaded Relief": lyrEsri_WorldShadedRelief,
    };

    objOverlays = {
        "1515-1600": lyrAllDates,  
    };

    ctlLayers = L.control.layers(objBasemap, objOverlays).addTo(mymap);

        // clustering--trying to make it show (feature.properties.place) on hover.
    
    // lyrAllDatesCluster.addLayer(circleMarker);
    // mymap.addLayer(lyrAllDatesCluster);
    
    
    lyrAllDates.on('data:loaded', function(){
        lyrAllDatesCluster.addLayer(lyrAllDates);
        });
    mymap.addLayer(lyrAllDatesCluster);

    // lyr1515To1525.on('data:loaded', function(){
    //     lyr1515To1525Cluster.removeLayer(lyrAllDatesCluster);
    //     lyr1515To1525Cluster.addLayer(lyr1515To1525Cluster);
    //     // lyr1515To1525Cluster.addTo(mymap);            
    //                 // .bindpopup(feature.properties.place).openPopup())
    //     });
    //     mymap.addLayer(lyr1515To1525Cluster);
        


    mymap.scrollWheelZoom.disable()

    // ************Action Buttions**************
    $("#back-button").click(function(){
        $("#map-title").text("French Ambassadors Abroad, 1515 to 1600");
        mymap.setView([44.95, 13.56], 5);
        mymap.closePopup();
        mymap.addLayer(lyrAllDates);
        mymap.refreshCluster(lyrAllDates);
        mymap.removeLayer(lyr1515To1525);
    });

    //Zooms to Paris, France on click text-button "zoomto"
    $("#zoomto").click(function(){
        $("#map-title").text("French Ambassadors Abroad, 1515 to 1525");
        mymap.removeLayer(lyrAllDates);
        mymap.addLayer(lyr1515To1525);
        mymap.addLayer(lyrAllDatesCluster);
        lyrAllDatesCluster.refreshCluster(lyrAllDates);
    });

    //********Shows coordinates of mouse in "map_coords" section******
    mymap.on('mousemove', function(e){
        var str = "Latitude: "+e.latlng.lat.toFixed(2)+" Longitude: "+e.latlng.lng.toFixed(2)+" Zoom level: "+mymap.getZoom(); 
        $("#map_coords").html(str);
    });
})