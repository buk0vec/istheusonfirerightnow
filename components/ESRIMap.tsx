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
import { ESRI_KEY } from "../api-keys"
import useSWR from 'swr' 
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import Graphic from "@arcgis/core/Graphic"
import Point from "@arcgis/core/geometry/Point"
import Polygon from "@arcgis/core/geometry/Polygon"
import { FirePoint } from "../types/fire-points"
import { FireArea } from "../types/fire-areas"

// TODO: Finish typing the data that will be passed to the Map
interface ESRIMapProps {
  firePoints: FirePoint[],
  fireAreas: FireArea[]
}

// Fetcher for useSWR
const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Wrapped map component
const ESRIMap = ({ firePoints, fireAreas }: ESRIMapProps) => {
  // For ref'ing div to MapView
  console.log("Component loading...")
  const mapDiv = useRef(null);
  const [graphLayer, setGraphLayer] = useState<GraphicsLayer>(null)
  // For fire point data
  // const { data: firePoints, error: fperror} = useSWR('/api/get-fire-points', fetcher)
  // const { data: fireAreas, error: faerror} = useSWR('/api/get-fire-areas', fetcher)
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
    const myMap = new Map({
      basemap: bm,
    });
    // MapView
    const view: MapView | null = new MapView({
      map: myMap,
      container: mapDiv.current, // Set to div
      extent: boundingBox,
      center: [-95.95, 37.655],
      zoom: 4,
      constraints: { minZoom: 4, 
        geometry: baricadeBox, 
        snapToZoom: false }, // Limited to box
    });
    const graphicsLayer = new GraphicsLayer();
    myMap.add(graphicsLayer);
    setGraphLayer(graphicsLayer)
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
  useEffect(() => {
    if (firePoints && graphLayer) {
      console.log("Marking down points...")
      console.log("Here are the firepoints from ESRIMap:")
      console.log(firePoints)
      console.log("================")
      const simpleMarkerSymbol: PictureMarkerSymbol = {
        type: "picture-marker",
        url: "/fireicon.png",
        width: "20px",
        height: "20px"
       } as unknown as PictureMarkerSymbol;
      const popupTemplate = {
        title: "{Name}"
      }
      firePoints.forEach((point: FirePoint) => {
        const tPoint: Point = new Point({
          longitude: point.geometry.x,
          latitude: point.geometry.y
        })
        const attr = {
          Name: point.attributes.IncedentName
        }
        const graph: Graphic = new Graphic({
          geometry: tPoint,
          symbol: simpleMarkerSymbol,
          attributes: attr,
          popupTemplate: popupTemplate
        })
        graphLayer.add(graph)
      })
    }
  }, [firePoints, graphLayer])

  useEffect(() => {
    if (fireAreas && graphLayer) {
      console.log(fireAreas)
      console.log("^^^ triggered fireAreas render")
      const simpleFillSymbol = {
        type: "simple-fill",
        color: [255, 0, 0, 0.2],  // Red, opacity 80%
        outline: {
            color: [255, 255, 255],
            width: 0
        }
     };
     for (let i = 0; i < fireAreas.length; i++)
     {
      const polygon = new Polygon({ rings: fireAreas[i].geometry.rings })
      const graph: Graphic = new Graphic({
        geometry: polygon,
        symbol: simpleFillSymbol
      })
      graphLayer.add(graph)
     }
    }
  }, [fireAreas, graphLayer])
  return <div className={styles.mapDiv} ref={mapDiv}></div> 
};

export default ESRIMap;