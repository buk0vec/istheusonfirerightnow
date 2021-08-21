/*
  get-fire-areas.ts
  API endpoint that will return the number of fire areas
*/

/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next"
import { FireAreasJSON } from "../../types/fire-areas"

export default async (req: NextApiRequest, res: NextApiResponse) => {

  //const f = fs.readFileSync("/firelocations.json")
  console.log("running...")
  // is this safe? i don't know, but I'm pretty sure it is
  const faj = (await import("../../public/fireperimeters.json") as unknown as FireAreasJSON).features
  // const fa = filterJSON(faj)
  res.status(200)
  res.json({ length: faj.length})
  console.log("Done")
}

// Filters what we want from the JSON
// const filterJSON = (fps: Features[]): FirePoint[] =>  {
//   const f: FirePoint[] = fps.map((point: Features): FirePoint => 
//   {
//     return {
//       geometry: point.geometry,
//       attributes: {
//         IncedentName: point.attributes.IncidentName
//       }
//     }
//   }
//   )
//   return f
// }