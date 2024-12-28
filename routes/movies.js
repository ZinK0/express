import express from "express";
const router = express.Router();
import path from "path";
import fs from "fs";
// import { fileURLToPath } from "url";

// From Node 21.5.0, you can use the following code to get the current directory name
const __dirname = import.meta.dirname;
let movies = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "db", "movies.json"), {
    encoding: "utf-8",
  })
);

// filter with the id
router.get("/:id", (req, res, next) => {
  let id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    const error = new Error(`Movie with this ${id} not found`);
    return next(error);
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
router.post("/", (req, res, next) => {
  let newMovie = {
    id: movies.length + 1,
    name: req.body.name,
    director: req.body.director,
    actors: req.body.actors,
  };

  if (!newMovie.name || !newMovie.director || !newMovie.actors) {
    const error = new Error("Please include all fields");
    return next(error);
  }

  movies.push(newMovie);
  res.status(201).json(movies);
});

// PUT Request ( update )
router.put("/:id", (req, res, next) => {
  let id = parseInt(req.params.id);
  let movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    const error = new Error(`Movie with this ${id} not found`);
    return next(error);
  }

  movie.name = req.body.name;
  movie.director = req.body.director;
  movie.actors = req.body.actors;
  res.status(200).json(movie);
});

// DELETE Request
router.delete("/:id", (req, res, next) => {
  let id = parseInt(req.params.id);
  console.log(id);

  let movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    const error = new Error(`Movie with this ${id} not found`);
    return next(error);
  }

  movies = movies.filter((movie) => movie.id !== id);

  res.status(200).json(movies);
});

export default router;
