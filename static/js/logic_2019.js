// Creating map object
var myMap = L.map("map", {
    center: [35.5204, -22],
    zoom: 3
  });
  
  const API_KEY = "pk.eyJ1IjoiY29sbGlubXBhZ2UiLCJhIjoiY2tucDh4aG9wMWRwbzJ1cHUzbndudG9nayJ9.ZT_9--wXlrj4sWpWepLTiQ"
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  console.log('test1')
  
  // Load in geojson data
  var geoData = "static/json_2019.geojson";
  
  var geojson;
  
  // Grab data with d3
  d3.json(geoData).then(function(data) {
  
    console.log(data);
    // Create a new choropleth layer
    geojson = L.choropleth(data, {
  
      // Define what property in the features to use
      valueProperty: "happiness_score",
  
      // Set color scale
      scale: ["#ff0000", "#0000ff"],
  
      // Number of breaks in step range
      steps: 10,
  
      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
  
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup('<b>Country Name: </b>' + feature.properties.name + "<br><b>Overall Rank 2019: </b>" + feature.properties.overall_rank + "<br><b>Happiness Score 2019: </b><br>" +
           + feature.properties.happiness_score);
      }
    }).addTo(myMap);
  
    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];
  
      // Add min & max
      var legendInfo = "<h1>Happiness Level</h1>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";
  
      div.innerHTML = legendInfo;
  
      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });
  
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
  
    // Adding legend to the map
    legend.addTo(myMap);
  
  });
  