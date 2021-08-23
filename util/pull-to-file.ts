/*
  pull-to-file.ts
  Function that takes data from a url and writes it to a file
*/

import fs from "fs";

// pullToFile()
// Given a url and a filepath, fetch the url and write the contents of the response to the file.
export const pullToFile = async (url: string, filepath: string) => {
  const res = await fetch(url);
  const data = await res.text();
  fs.writeFile(filepath, data, (err) => console.error(err));
};
