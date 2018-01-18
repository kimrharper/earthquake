console.log('Loaded JS');

// $.ajax({
//       url: "node_modules/ol/layer/vector.js",
//       dataType: "script",
//       success: function(response){
//                 console.log(success);}
//     });

// $.getScript( "node_modules/ol/layer/vector.js", function( data, textStatus, jqxhr ) {
//   console.log( data ); // Data returned
//   console.log( textStatus ); // Success
//   console.log( jqxhr.status ); // 200
//   console.log( "Load was performed." );
// });

// $.getScript("node_modules/ol/layer/vector.js");

// var vectorSource = new ol.source.Vector({
//   url: 'world.topo.json',
//   format: new ol.format.TopoJSON()
// });
//
//
// function load_map() {
//     var map = new ol.Map({
//     target: 'map',
//     layers: [
//       new ol.layer.Tile({
//         source: new ol.source.OSM()
//       })
//     ],
//     view: new ol.View({
//       center: ol.proj.fromLonLat([37.41, 8.82]),
//       zoom: 4
//     })
//   });
// }
//
//
// load_map();
//
// const vector = new VectorLayer({
//   source: position
// });
//
// map.addLayer(ol.vector);
//
//
// position.addFeature(new Feature(new Point(coords)));


var styles = [
/* We are using two different styles for the polygons:
 *  - The first style is for the polygons themselves.
 *  - The second style is to draw the vertices of the polygons.
 *    In a custom `geometry` function the vertices of a polygon are
 *    returned as `MultiPoint` geometry, which will be used to render
 *    the style.
 */
new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: [255, 255, 255, 0.0],
    width: 0
  }),
  fill: new ol.style.Fill({
    color: 'rgba(0, 0, 255, 1)',
      width: 5
  })
}),
new ol.style.Style({
  image: new ol.style.Circle({
    radius: 5,
    fill: new ol.style.Fill({
      color: 'orange'
    })
  }),
  geometry: function(feature) {
    // return the coordinates of the first ring of the polygon
    var coordinates = feature.getGeometry().getCoordinates()[0];
    return new ol.geom.MultiPoint(coordinates);
  }
})
];

var vectorSource = new ol.source.Vector({});
var map = new ol.Map({
  layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),

      new ol.layer.Vector({
          source: vectorSource,
          style: styles
      })
  ],
  target: 'map',
  view: new ol.View({
    center: [-11000000, 4600000],
    zoom: 3
  })
});

// Polygon
var thing = new ol.geom.Polygon( [[
    ol.proj.transform([-16,-22], 'EPSG:4326', 'EPSG:3857'),
    ol.proj.transform([0,0], 'EPSG:4326', 'EPSG:3857'),
    // ol.proj.transform([-5,2], 'EPSG:4326', 'EPSG:3857')
]]);

var thing2 = new ol.geom.Polygon( [[
    ol.proj.transform([-9,-22], 'EPSG:4326', 'EPSG:3857'),
]]);

var featurething = new ol.Feature({
    name: "Thing",
    geometry: thing
});

var featurething2 = new ol.Feature({
    name: "Thing2",
    geometry: thing2
});

vectorSource.addFeature(featurething);
vectorSource.addFeature(featurething2);

// var first_point = new ol.geom.Point(-20,-20);
// var first_point_add = new ol.Feature({
//     name: "Point 1",
//     geometry: first_point
// });
// vectorSource.addFeature(first_point_add);

// console.log(first_point);