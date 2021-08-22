/* eslint-disable import/no-anonymous-default-export */
/* 
  index.ts
  TODO: Here just to hold project structure. API maybe not needed (endpoint exposure is for losers)
*/

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.send("Hello world!");
};