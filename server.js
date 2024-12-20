import express from "express";
import path from "path";
import { fileURLToPath } from "url"; // require for __dirname
import fs from "fs";

// __dirname is not available in ES6 module, so we have to use fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
