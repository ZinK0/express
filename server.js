import express from "express";
import path from "path";
import { fileURLToPath } from "url"; // require for __dirname

// __dirname is not available in ES6 module, so we have to use fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  // you can send with the HTML tags also ans send method is generally use, there are other methods also
  // res.send("<h1>Hello World!</h1>");
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/about.html");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
