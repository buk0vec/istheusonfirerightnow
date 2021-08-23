/*
  index.tsx
  The main page.
*/

import type { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { ESRIMapProps } from "../components/ESRIMap";
import path from "path";
import { pullToFile } from "../util/pull-to-file";

//Used to turn SSR off for the ESRIMap. Don't know if it's needed lol
const WebMapWithNoSSR = dynamic(() => import("../components/ESRIMap"), {
  ssr: false,
});

// Hold refresh time
interface IndexProps extends ESRIMapProps {
  date: number;
}

// The page. Pretty simple right now.
const Index: NextPage<IndexProps> = ({ date }) => {
  return (
    <div>
      <h1>Yes, it is. ️‍🔥️‍🔥️‍🔥 </h1>
      <p>Last updated at {new Date(date).toString()} </p>
      <WebMapWithNoSSR />
    </div>
  );
};

// Get static Map data downloaded only on build
export const getStaticProps: GetStaticProps = async () => {
  // Get time of update
  const date = Date.now();
  // Pull map data to public folders (can't pass this data thru gSP due to size)
  await Promise.all([
    pullToFile(
      "https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Current_WildlandFire_Locations/FeatureServer/0/query?where=1%3D1&outFields=IncidentName,OBJECTID&outSR=4326&f=json",
      path.join(process.cwd(), "public/firepoints.json")
    ),
    pullToFile(
      "https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Current_WildlandFire_Perimeters/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID&outSR=4326&f=json",
      path.join(process.cwd(), "public/fireareas.json")
    ),
  ]);
  // Return update time
  return {
    props: {
      date,
    },
    revalidate: 60 * 60 * 6, // Refresh data every 6 hours
  };
};

export default Index;
