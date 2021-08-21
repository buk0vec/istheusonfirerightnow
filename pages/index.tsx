/*
  index.tsx
  The main page.
*/

import type { GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'
import ESRIMap from '../components/ESRIMap';
import { FirePoint } from '../types/fire-points';
import { FireArea } from '../types/fire-areas'
import { http } from "../util/http"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Used to turn SSR off for the ESRIMap. Don't know if it's needed lol
// const WebMapWithNoSSR = dynamic(() => import("../components/ESRIMap") as any, {
//   // ssr: false,
// });

interface IndexProps {
  firePoints: FirePoint[],
  fireAreas: FireArea[]
}

// The page. Pretty simple right now. 
const Index: NextPage<IndexProps>  = ({ firePoints, fireAreas }) => {
  return (
    <div>
      <h1>Yes, it is. ️‍🔥️‍🔥️‍🔥 </h1>
      <ESRIMap firePoints={firePoints} fireAreas={fireAreas} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const firePoints = await fetcher("http://localhost:3000/api/get-fire-points")
  //const firePoints = await fpreq.json()
  const fanumreq = await fetch("http://localhost:3000/api/get-fire-areas")
  const faNumS = await fanumreq.json()
  console.log("There are", faNumS.length, "perimeters")
  const faNum = parseInt(faNumS.length)
  const fireAreaPromises: Promise<Response>[] = Array.from({ length: faNum }, (x, i) => i ).map(key => fetch("http://localhost:3000/api/fire-areas/" + key))
  console.log(fireAreaPromises)
  console.log("Waiting for promises...")
  const promiseResponse = await Promise.all(fireAreaPromises)
    .catch(() => { throw 'Something went wrong. Dang.' })
  console.log("Done.")  
  const fireAreas: FireArea[] = await Promise.all(promiseResponse.map(r => r.json()))
    .catch(() => { throw 'Something went super duper wrong. Dang.' })
  console.log(fireAreas[0])
  console.log("^^^ fireAreas from func")
  return {  
    props: {
      firePoints,
      fireAreas
    }
  }
}

export default Index