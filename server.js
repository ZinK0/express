import express from "express";
import path, { parse } from "path";
import { fileURLToPath } from "url"; // require for __dirname
import fs from "fs";
import movies from "./routes/movies.js";

// __dirname is not available in ES6 module, so we have to use fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public"))); // this will serve the static files from the public folder

// this will serve route auto from the public folder
app.use((req, res, next) => {
  const sanitizedPath = req.path.endsWith("/")
    ? req.path.slice(0, -1)
    : req.path;
  const filePath = path.join(__dirname, "public", sanitizedPath + ".html");

  if (req.path !== "/" && fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    next();
  }
});

// app.get("/api/movies", (req, res) => {
//   // res.json(path.join(__dirname, "db", "movies.json")); // this code not working because it's not a json object
//   // so we have to read the file and parse it to json because you can't import json file in nodejs
//   // this way will get the json dynamically. older way is to import the json file and send it
//   const movies = JSON.parse(
//     fs.readFileSync(path.join(__dirname, "db", "movies.json"))
//   );
//   res.json(movies);
// });
// console.log(movies);

app.use("/api/movies", movies);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
