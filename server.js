import express from "express";
import path, { parse } from "path";
import { fileURLToPath } from "url"; // require for __dirname
import fs from "fs";

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

// filter with the id
app.get("/api/movies/:id", (req, res) => {
  const movies = JSON.parse(
    fs.readFileSync(path.join(__dirname, "db", "movies.json"))
  );
  let id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    return res.status(404).json({ message: `Movie with this ${id} not found` });
  }
  res.json(movie);
});

// add query limit
app.get("/api/movies", (req, res) => {
  const movies = JSON.parse(
    fs.readFileSync(path.join(__dirname, "db", "movies.json"))
  );
  let limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).send(movies.slice(0, limit));
  }
  res.status(200).json(movies);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
