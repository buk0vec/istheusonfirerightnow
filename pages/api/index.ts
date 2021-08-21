/* eslint-disable import/no-anonymous-default-export */
/* 
  index.ts
  TODO: Make the actual api lol
*/

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.send("Hello world!");
};