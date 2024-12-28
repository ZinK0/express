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

export default router;
