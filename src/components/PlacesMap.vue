<template>
<mgl-map id="places-map"
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    :minZoom="options.minZoom"
    :center="options.center"
    :zoom.sync="options.zoom"
    :pitch="options.pitch"
    :bearing="options.bearing"
    @load="load"
>
  <!-- <mgl-marker v-for="(marker, i) in markers" :coordinates="marker.coords" :color="marker.color" :key="i"></mgl-marker> -->
</mgl-map>
</template>

<script>
import { MglMap, MglMarker } from "vue-mapbox";

import config from "@/config.json";

export default {
  name: "PlacesMap",
  components: {
    MglMap,
    MglMarker
  },
  data() {
    return {
      accessToken: config.mapbox.accessToken,
      mapStyle: config.mapbox.mapStyle,
      options: {
        minZoom: 13,
        center: [13.449081 - 0.01, 52.50504],
        zoom: 16.0,
        pitch: 45,
        bearing: 0
      },
      markers: [
        {
          coords: [13.449081, 52.50504],
          color: "red"
        }
      ]
    };
  },
  methods: {
    load: function(payload) {
      let map = payload.map;
      //let component = payload.component;

      // Insert the layer beneath any symbol layer.
      var layers = map.getStyle().layers;

      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      // 3d buildings
      map.addLayer(
        {
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"]
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"]
            ],
            "fill-extrusion-opacity": 0.6
          }
        },
        labelLayerId
      );

      // point overlay
      map.addSource("point", {
        type: "geojson",
        data: {
          type: "Point",
          coordinates: [13.449081, 52.50504]
        }
      });
      map.addLayer(
        {
          id: "point",
          source: "point",
          type: "circle",
          paint: {
            "circle-radius": 20,
            "circle-color": "#007cbf"
          }
        },
        labelLayerId
      );
    }
  }
};
</script>

<style lang="scss">
#places-map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
