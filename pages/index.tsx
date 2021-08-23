/*
  index.tsx
  The main page.
*/

import type { GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'
import fs from 'fs';
import ESRIMap, { ESRIMapProps } from '../components/ESRIMap';
import { FireAreaJSON } from '../types/fire-area';
import path from 'path'
import { FirePointJSON } from '../types/fire-point';

//Used to turn SSR off for the ESRIMap. Don't know if it's needed lol
const WebMapWithNoSSR = dynamic(() => import("../components/ESRIMap"), {
  ssr: false,
});

// Quick fetch func
const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface IndexProps extends ESRIMapProps{
  date: number
}

// The page. Pretty simple right now. 
const Index: NextPage<IndexProps>  = ({ date }) => {
  return (
    <div>
      <h1>Yes, it is. ️‍🔥️‍🔥️‍🔥 </h1>
      <p>Last updated at {(new Date(date)).toString()} </p>
      <WebMapWithNoSSR />
    </div>
  )
}

// Get static Map data downloaded only on build
export const getStaticProps: GetStaticProps = async () => {
  console.log("CWD: ", process.cwd())
  console.log(path.join(process.cwd(), 'public/firepoints.json'))
  const date = Date.now()
  await fetcher("https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Current_WildlandFire_Locations/FeatureServer/0/query?where=1%3D1&outFields=IncidentName,OBJECTID&outSR=4326&f=json")
    .then((fp) => { console.log("Successfully pulled point data"); fs.writeFile(path.join(process.cwd(), 'public/firepoints.json'), JSON.stringify(fp),
       err => console.error("fp fs failure")) } )
    .catch((e) => console.log("Error getting point data, ", e))
  const fireAreaJSON: FireAreaJSON = await fetcher("https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Current_WildlandFire_Perimeters/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID&outSR=4326&f=json")
    .then((fa) => { console.log("Successfully pulled area data"); return fa } )  
    .catch((e) => console.log("Error getting area data, ", e))
  try {
    fs.writeFileSync(path.join(process.cwd(), 'public/fireareas.json'), JSON.stringify(fireAreaJSON))
  } catch (err) {
    console.error("fs diden't work")
  }
  return {  
    props: {
      date
    },
    revalidate: 60 * 60 * 6
  }
}



export default Index