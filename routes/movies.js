import express from "express";
const router = express.Router();
import path from "path";
import fs from "fs";
// import { fileURLToPath } from "url";

// From Node 21.5.0, you can use the following code to get the current directory name
const __dirname = import.meta.dirname;
const movies = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "db", "movies.json"), {
    encoding: "utf-8",
  })
);

// filter with the id
router.get("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    return res.status(404).json({ message: `Movie with this ${id} not found` });
  }
  res.json(movie);
});

// add query limit
router.get("/", (req, res) => {
  let limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).send(movies.slice(0, limit));
  }
  res.status(200).json(movies);
});

// for post request
router.post("/", (req, res) => {
  let newMovie = {
    id: movies.length + 1,
    name: req.body.name,
    director: req.body.director,
    actors: req.body.actors,
  };

  if (!newMovie.name || !newMovie.director || !newMovie.actors) {
    return res.status(400).json({ message: "Please include all fields" });
  }

  movies.push(newMovie);
  res.status(201).json(movies);
});

export default router;
