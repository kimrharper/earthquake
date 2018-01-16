console.log('Loaded JS');

import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import Style from 'ol/style/style';
import IconStyle from 'ol/style/icon';

let map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    })
  });

//
// const position = new VectorSource();
// const vector = new VectorLayer({
//     source: position
// });
//
// map.addLayer(vector);
//
// position.addFeature(new Feature(new Point(coords)));
//
// vector.setStyle(new Style({
//   image: new IconStyle({
//     src: './data/marker.png'
//   })
// }));