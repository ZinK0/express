import express from "express";
import {
  getMovies,
  getMovie,
  postMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/moviesController.js";
const router = express.Router();

// import { fileURLToPath } from "url";

// From Node 21.5.0, you can use the following code to get the current directory name
// const __dirname = import.meta.dirname;

// filter with the id
router.get("/:id", getMovie);

// add query limit
router.get("/", getMovies);

// POST request
router.post("/", postMovie);

// PUT Request ( update )
router.put("/:id", updateMovie);

// DELETE Request
router.delete("/:id", deleteMovie);

// Put request for update
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  console.log(movie.name, movie.director, movie.actors);

  if (!movie) {
    return res.status(404).json({ message: `Movie with this ${id} not found` });
  }
  movie.name = req.body.name;
  movie.director = req.body.director;
  movie.actors = req.body.actors;
  console.log(movie.name, movie.director, movie.actors);

  res.json(movies);
});

// Delete request
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    return res.status(404).json({ message: `Movie with this ${id} not found` });
  }

  movies = movies.filter((movie) => movie.id !== id);
  res.json(movies);
});

export default router;
