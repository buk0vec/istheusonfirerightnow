/*
  index.tsx
  The main page.
*/

import type { GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'
import ESRIMap, { ESRIMapProps } from '../components/ESRIMap';
import { FireAreaJSON } from '../types/fire-area';
import { FirePointJSON } from '../types/fire-point';

//Used to turn SSR off for the ESRIMap. Don't know if it's needed lol
const WebMapWithNoSSR = dynamic(() => import("../components/ESRIMap"), {
  ssr: false,
});

// Quick fetch func
const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface IndexProps extends ESRIMapProps{}

// The page. Pretty simple right now. 
const Index: NextPage<IndexProps>  = ({ firePointJSON, fireAreaJSON }) => {
  return (
    <div>
      <h1>Yes, it is. ️‍🔥️‍🔥️‍🔥 </h1>
      <WebMapWithNoSSR firePointJSON={firePointJSON} fireAreaJSON={fireAreaJSON} />
    </div>
  )
}

// Get static Map data downloaded only on build
export const getStaticProps: GetStaticProps = async () => {
  const firePointJSON: FirePointJSON = await fetcher("https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Current_WildlandFire_Locations/FeatureServer/0/query?where=1%3D1&outFields=IncidentName,OBJECTID&outSR=4326&f=json")
    .then((fp) => { console.log("Successfully pulled point data"); return fp } )
    .catch((e) => console.log("Error getting point data, ", e))
  const fireAreaJSON: FireAreaJSON = await fetcher("https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Current_WildlandFire_Perimeters/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID&outSR=4326&f=json")
    .then((fa) => { console.log("Successfully pulled area data"); return fa } )  
    .catch((e) => console.log("Error getting area data, ", e))
  return {  
    props: {
      firePointJSON,
      fireAreaJSON
    },
    revalidate: 60 * 60 * 6
  }
}



export default Index