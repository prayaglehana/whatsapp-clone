import express from "express";
import mongoose from "mongoose";

const app = express();

const port = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.listen(port, () => {
  console.log("listening on host " + port);
});
