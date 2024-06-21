import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("<h4>Hello world</h4>");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
