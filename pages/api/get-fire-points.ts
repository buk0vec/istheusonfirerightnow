/*
  get-fire-points.ts
  API endpoint that will return all used + relevant, formatted fire point data.
*/

/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next"
import { FPFeatures, FirePoint } from "../../types/fire-points"
// import 'unfetch/polyfill'

export default async (req: NextApiRequest, res: NextApiResponse<FirePoint[]>) => {

  //const f = fs.readFileSync("/firelocations.json")
  console.log("running...")
  // is this safe? i don't know, but I'm pretty sure it is
  const flj: FPFeatures[] = (await import("../../public/firelocations.json")).features
  const fp = filterJSON(flj)
  res.status(200)
  res.json(fp)
  console.log("Done")
}

// Filters what we want from the JSON
const filterJSON = (fps: FPFeatures[]): FirePoint[] =>  {
  const f: FirePoint[] = fps.map((point: FPFeatures): FirePoint => 
  {
    return {
      geometry: point.geometry,
      attributes: {
        IncedentName: point.attributes.IncidentName
      }
    }
  }
  )
  return f
}