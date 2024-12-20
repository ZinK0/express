import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  // you can send with the HTML tags also ans send method is generally use, there are other methods also
  // res.send("<h1>Hello World!</h1>");
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
