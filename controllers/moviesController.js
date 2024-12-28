import path from "path";
import fs from "fs";

//@desc Read the movies.json file
let movies = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "db", "movies.json"), {
    encoding: "utf-8",
  })
);

// @desc GET all movies & add query limit
// @route GET /api/movies
const getMovies = (req, res) => {
  let limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).send(movies.slice(0, limit));
  }
  res.status(200).json(movies);
};

// @desc GET movie by id
// @route GET /api/movies/:id
const getMovie = (req, res, next) => {
  let id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    const error = new Error(`Movie with this ${id} not found`);
    return next(error);
  }
  res.json(movie);
};

// @desc POST request
// @route POST /api/movies
const postMovie = (req, res, next) => {
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
};

// @desc PUT Request ( update )
// @route PUT /api/movies/:id
const updateMovie = (req, res, next) => {
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
};

// @desc DELETE Request
// @route DELETE /api/movies/:id
const deleteMovie = (req, res, next) => {
  let id = parseInt(req.params.id);
  let movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    const error = new Error(`Movie with this ${id} not found`);
    return next(error);
  }

  movies = movies.filter((movie) => movie.id !== id);

  res.status(200).json(movies);
};

export { getMovies, getMovie, postMovie, updateMovie, deleteMovie };
