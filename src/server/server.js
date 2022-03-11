import express from "express";
import mongoose from "mongoose";
import Messages from "./schema.js";
import cors from "cors";
import apiRouter from "./routes/api.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", apiRouter);

//heroku process enve
const port = process.env.PORT || 9000;

const databaseURL =
  "mongodb+srv://mongouser:mongouser@cluster0.24xwe.mongodb.net/whatsapp-mern?retryWrites=true&w=majority";

mongoose.connect(databaseURL).then((res) => {
  console.log("connected to mongoDB ");
  app.listen(port, () => {
    console.log("server is listening on : ", port);
  });
});

const db = mongoose.connection;

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

//http://localhost:9000/api/v1/messages/get
// app.get("/api/v1/messages/get", (req, res) => {
//   const query = req.query;

//   Messages.find().then((result) => {
//     res.status(200).send(result);
//   });
// });

// app.post("/api/v1/messages/new", (req, res) => {
//   const _msg = req.body;
//   console.log("msg", _msg);

//   Messages.create(_msg, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).send(data);
//     }
//   });

//   const msg = new Message({
//     sender: _msg.name,
//     message: _msg.message,
//     timeStamp: _msg.timeStamp,
//   });

//   msg.save();
//   res.status(200).send("done");
// });
