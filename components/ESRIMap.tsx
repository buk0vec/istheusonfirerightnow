/*
  ESRIMap.tsx
  Contains component for wrapped ArcGIS JS map.
*/
import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";
import styles from "./ESRIMap.module.css";
import Extent from "@arcgis/core/geometry/Extent";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import Basemap from "@arcgis/core/Basemap";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import { FireObjectJSON } from "../types/fire-object";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import { FirePointJSON } from "../types/fire-point";
import useSWR from "swr";
import { FireAreaJSON } from "../types/fire-area";
import fetch from "unfetch";

export interface ESRIMapProps {
  // firePointJSON: FirePointJSON,
  // fireAreaJSON: FireAreaJSON
}

//Simple fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Wrapped map component
const ESRIMap = ({}: ESRIMapProps) => {
  // For ref'ing div to MapView
  const mapDiv = useRef(null);
  // Get JSON data from local storage
  const { data: firePointsJSON, error: fperror } = useSWR<FirePointJSON>(
    "/firepoints.json",
    fetcher
  );
  const { data: fireAreasJSON, error: faerror } = useSWR<FireAreaJSON>(
    "/fireareas.json",
    fetcher
  );
  const [mapR, setMap] = useState<Map>(null);
  // On startup
  useEffect(() => {
    // Connect to API
    console.log("Map loading...");
    esriConfig.apiKey = process.env.NEXT_PUBLIC_ESRI_KEY;
    // Limits to MapView
    // TODO: Math out how big this must be
    const boundingBox: Extent = new Extent({
      xmin: -125.36,
      xmax: -66.54,
      ymin: 25.47,
      ymax: 49.84,
    });
    const baricadeBox: Extent = new Extent({
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
    const map = new Map({
      basemap: bm,
    });
    // set map object for later addition
    setMap(map);
    // MapView
    const view: MapView = new MapView({
      map: map,
      container: mapDiv.current, // Set to div
      extent: boundingBox,
      center: [-95.95, 37.655],
      zoom: 4,
      constraints: {
        minZoom: 4,
        geometry: baricadeBox,
        snapToZoom: false,
      }, // Limited to box
    });
    // Hold until load
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
  // When the firePointsJSON is loaded...
  useEffect(() => {
    if (firePointsJSON && mapR) {
      console.log("Rendering points...");
      // Image marker renderer
      const firePointsRenderer = {
        type: "simple",
        symbol: {
          type: "picture-marker",
          url: "/fireicon.png", // Fire emoji (/public)
          width: "20px",
          height: "20px",
        },
      };
      // Popup for points
      // TODO: Link areas to points
      const popupTemplate: __esri.PopupTemplateProperties = {
        title: "{IncidentName}",
      };
      // Get FeatureSet from Local JSON
      const firePointsFS = getSetFromREST(firePointsJSON);
      // Construct FeatureLayer and add to map
      const firePointsFL = new FeatureLayer({
        source: firePointsFS.features,
        fields: firePointsFS.fields,
        renderer: firePointsRenderer as any as SimpleRenderer,
        popupTemplate: popupTemplate,
      });
      mapR.add(firePointsFL);
    }
  }, [firePointsJSON, mapR]);

  //When the fireAreasJSON is loaded...
  useEffect(() => {
    if (fireAreasJSON && mapR) {
      console.log("Rendering areas...");
      // Renderer using simple fill
      const fireAreasRenderer = {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: [255, 0, 0, 0.2], // Red, opacity 20%
          outline: {
            color: [255, 255, 255],
            width: 0,
          },
        },
      };
      // Create new FeatureSet
      const fireAreasFS = getSetFromREST(fireAreasJSON);
      // Make FeatureLayer from FSet and add to map
      const fireAreasFL = new FeatureLayer({
        source: fireAreasFS.features,
        fields: fireAreasFS.fields,
        renderer: fireAreasRenderer as any as SimpleRenderer,
      });
      mapR.add(fireAreasFL);
    }
  }, [fireAreasJSON, mapR]);
  // Simple div wrapper
  return <div className={styles.mapDiv} ref={mapDiv}></div>;
};

// getSetFromREST()
// Returns a usable FeatureSet from the output of the ARCGIS FeatureLayer
// REST endpoint
const getSetFromREST = (rest: FireObjectJSON): FeatureSet => {
  return FeatureSet.fromJSON({
    geometryType: rest.geometryType,
    spatialReference: rest.spatialReference, 
    fields: rest.fields,
    features: rest.features,
  });
};
export default ESRIMap;
