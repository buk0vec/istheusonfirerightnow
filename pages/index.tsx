/*
  index.tsx
  The main page.
*/

import type { NextPage } from 'next'
import React from 'react'
import ESRIMap from '../components/ESRIMap';

// Used to turn SSR off for the ESRIMap. Don't know if it's needed lol
// const WebMapWithNoSSR = dynamic(() => import("../components/ESRIMap") as any, {
//   ssr: false,
// });

// The page. Pretty simple right now. 
const Index: NextPage = () => {
  return (
    <div>
      <h1>Yes it is ️‍🔥️‍🔥️‍🔥 </h1>
      <ESRIMap data={null} />
    </div>
  )
}



export default Index