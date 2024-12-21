import express from "express";
import path, { parse } from "path";
import { fileURLToPath } from "url"; // require for __dirname
import fs from "fs";
import movies from "./routes/movies.js";

const __dirname = import.meta.dirname;
const app = express();
const PORT = process.env.PORT || 5000;

// for parsing post request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.use("/api/movies", movies);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
