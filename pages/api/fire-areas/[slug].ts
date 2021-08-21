/*
  [slug.ts]
  API Endpoint providing information on each fire perimeter, due to Vercel serverless
  function restrictions.
*/

/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next"
import { FeaturesEntity, FireArea, FireAreasJSON } from "../../../types/fire-areas"

export default async (req: NextApiRequest, res: NextApiResponse) => {

  //const f = fs.readFileSync("/firelocations.json")
  // console.log("running...")
  const { slug } = req.query
  // console.log("Recieved slug ", slug)
  // is this safe? i don't know, but I'm pretty sure it is
  const faj: FeaturesEntity[] = (await import("../../../public/fireperimeters.json") as unknown as FireAreasJSON).features
  if (Array.isArray(slug)){
    res.status(400)
    res.json({response: "Invalid request."})
    return
  }
  // console.log("Not array")
  const index = parseInt(slug)
  if (isNaN(index)) {
    res.status(400)
    res.json({response: "Invalid request."})
    return
  }
  // console.log(index, "is an int")
  if (index >= faj.length || (index < 0)){
    res.status(400)
    res.json({response: "Invalid request."})
    return
  }
  // console.log("Safe.")
  res.status(200)
  res.json(filterJSON(faj[index]))
}

const filterJSON = (fa: FeaturesEntity): FireArea =>  {
  return {
    geometry: fa.geometry,
    attributes: {}
  }
}