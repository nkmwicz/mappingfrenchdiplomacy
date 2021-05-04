const mymap = L.map('mapid').setView([45, 26], 5);
const lyrEsriWorldShadedRelief = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
  maxZoom: 13,
});

$(document).ready(function() {
  lyrEsriWorldShadedRelief.addTo(mymap);

  // *****loading data to the map******
  fetch('data/diplomats_data.geojson', {
    method: 'GET',
  })
      .then((Response) => Response.json())
      .then((json) => {
        console.log(json);

        //    mymap.setView([45,25]);

        mymap.scrollWheelZoom.disable();

        //* *******Shows coordinates of mouse in "map_coords" section******
        mymap.on('mousemove', function(e) {
          const str = 'Lat: ' +e.latlng.lat.toFixed(2)+
          ' Long: '+e.latlng.lng.toFixed(2)+' | Zoom: '+mymap.getZoom();
          $('#map_coords').html(str);
        });
      });
  // *****Data Toggles on links declaring inoperability and footnotes*****
  $('[data-toggle="popover"]').popover({trigger: 'hover'});


  // *****creating the Layer control*****
  // objBasemap = {
  //     "Esri Shaded Relief": lyrEsri_WorldShadedRelief,
  // };

  // objOverlays = {
  //     "1515-1600": lyrAllDates,
  // };

  // ctlLayers = L.control.layers(objBasemap, objOverlays).addTo(mymap);
});
