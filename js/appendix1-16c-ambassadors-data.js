fetch('data/16c-diplomats_data.geojson', {
  method: 'GET',
}).then((Response) => Response.json()).then((json) => {
  const data = json.features;
  console.log(data);
});
