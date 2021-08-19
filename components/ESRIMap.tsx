/*
  ESRIMap.tsx
  Contains component for wrapped ArcGIS JS map.
*/
import React, { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";
import styles from "./ESRIMap.module.css";
import Extent from "@arcgis/core/geometry/Extent";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import Basemap from "@arcgis/core/Basemap";
import { ESRI_KEY } from "../api-keys"

// TODO: Finish typing the data that will be passed to the Map
interface ESRIMapProps {
  data: any,
}

// Wrapped map component
const ESRIMap = (props: ESRIMapProps) => {
  // For ref'ing div to MapView
  const mapDiv = useRef(null);

  // TODO: Figure out if this is needed. Probably not. Just limits map extent
  const limitMapExtent = (view: MapView) => {
    var initialExtent = view.extent;
    view.watch("stationary", (event) => {
      if (!event) {
        return;
      }
      var currentCenter = view.extent.center;
      if (!initialExtent.contains(currentCenter)) {
        view.goTo([-103.852, 44.674]);
      }
    });
  };
  // On startup
  useEffect(() => {
    // Connect to API
    esriConfig.apiKey = ESRI_KEY;
    // Limits to MapView
    // TODO: Math out how big this must be
    const boundingBox: Extent = new Extent({
      xmin: -125.36,
      xmax: -66.54,
      ymin: 25.47,
      ymax: 49.84,
    });
    // Custom ESRI Basemap
    const vtl: VectorTileLayer = new VectorTileLayer({
      portalItem: {
        id: "165332e450a8495faa8503fd95d312a0",
      },
    });
    const bm: Basemap = new Basemap({
      baseLayers: [vtl],
    });
    // Map object w/ Basemap
    const myMap = new Map({
      basemap: bm,
    });
    // MapView
    const view: MapView | null = new MapView({
      map: myMap,
      container: mapDiv.current, // Set to div
      extent: boundingBox,
      center: [-95.95, 37.655],
      zoom: 3.8,
      constraints: { minZoom: 3, geometry: boundingBox, snapToZoom: false }, // Limited to box
    });
    view.when(() => limitMapExtent(view)); // Attempt to limit view (idk if i need this)
    view.when(
      () => {
        // All the resources in the MapView and the map have loaded. Now execute additional processes
        console.log("Map loaded in successfully");
      },
      (error: string) => {
        // Use the errback function to handle when the view doesn't load properly
        console.log("The view's resources failed to load: ", error);
      }
    );
    return () => {
      view && view.destroy(); // Cleanup
    };
  }, []);
  // Div wrapper
  return <div>
    <div className={styles.mapDiv} ref={mapDiv}></div> 
    </div>
};

export default ESRIMap;