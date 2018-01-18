console.log('Loaded JS');

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

$('#popup').css(
    'background-color','blue'
);

/**
* Create an overlay to anchor the popup to the map.
*/
var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
});


/**
* Add a click handler to hide the popup.
* @return {boolean} Don't follow the href.
*/
closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};


// Old Styles
// var styles = [
// /* We are using two different styles for the polygons:
//  *  - The first style is for the polygons themselves.
//  *  - The second style is to draw the vertices of the polygons.
//  *    In a custom `geometry` function the vertices of a polygon are
//  *    returned as `MultiPoint` geometry, which will be used to render
//  *    the style.
//  */
// new ol.style.Style({
//   stroke: new ol.style.Stroke({
//     color: [255, 255, 255, 0.0],
//     width: 0
//   }),
//   fill: new ol.style.Fill({
//     color: 'rgba(0, 0, 255, 1)',
//       width: 5
//   })
// }),
// new ol.style.Style({
//   image: new ol.style.Circle({
//     radius: 5,
//     fill: new ol.style.Fill({
//       color: 'orange'
//     })
//   }),
//   geometry: function(feature) {
//     // return the coordinates of the first ring of the polygon
//     var coordinates = feature.getGeometry().getCoordinates()[0];
//     return new ol.geom.MultiPoint(coordinates);
//   }
// })
// ];

var vector = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson',
    format: new ol.format.GeoJSON()
  })
});

var map = new ol.Map({
  layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
  ],
  overlays: [overlay],
  target: 'map',
  view: new ol.View({
    center: [-11000000, 4600000],
    zoom: 3
  })
});

map.addLayer(vector);

// var feature = new ol.Feature([
//     new ol.geom.Point([0, 0]),
//     new ol.geom.Point([10, 10])]
// );

// var circle = new ol.style.Style({
//     image: new ol.style.Circle({
//         radius: 5,
//         fill: null,
//         stroke: new ol.style.Stroke({
//             color: 'rgba(255,0,0,0.9)',
//             width: 3
//         })
//     })
// });

// vector.setStyle(circle);
// vector.addFeatures(feature);

// Popup showing the position the user clicked

// map.on('singleclick', function(evt) {
//         var coordinate = evt.coordinate;
//         var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
//             coordinate, 'EPSG:3857', 'EPSG:4326'));
//
//         content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
//             '</code>';
//         overlay.setPosition(coordinate);
//       });

var select_interaction = new ol.interaction.Select();

select_interaction.getFeatures().on("add", function (e) {
     var feature_s = e.element; //the feature selected
     var basicLocation = feature_s.getGeometry().getCoordinates();
     overlay.setPosition(basicLocation);
     basicLocation.pop();
     basicLocation = ol.proj.transform(basicLocation,'EPSG:3857','EPSG:4326');
     print_dic = feature_s.getProperties();
    console.log(print_dic);
     content.innerHTML = '<p>You clicked here:</p><code>' + basicLocation +
            '</code>'
});

map.addInteraction(select_interaction);





