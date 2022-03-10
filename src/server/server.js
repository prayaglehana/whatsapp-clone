import express from "express";
import mongoose from "mongoose";
import Messages from "./schema.js";
import Pusher from "pusher";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1359459",
  key: "9b476ce4b1727bdc687d",
  secret: "512fbfe6638f91d9b4e0",
  cluster: "ap2",
  useTLS: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});

const databaseURL =
  "mongodb+srv://mongouser:mongouser@cluster0.24xwe.mongodb.net/whatsapp-mern?retryWrites=true&w=majority";

mongoose.connect(databaseURL).then((res) => {
  console.log("connected to mongoDB ");
  app.listen(port, () => {
    console.log("server is listening on : ", port);
  });
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("connected");

  const msgCollection = db.collection("messages");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("changes", change);

    if (change.operationType === "insert") {
      const _msg = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        sender: _msg.sender,
        text: _msg.text,
        timeStamp: _msg.timeStamp,
      });
    }
  });
});

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});
app.post("/basic", (req, res) => {
  console.log("req", req.body);
  res.send("done");
});

//http://localhost:9000/api/v1/messages/get
app.get("/api/v1/messages/get", (req, res) => {
  const query = req.query;

  Messages.find().then((result) => {
    res.status(200).send(result);
  });
});

app.post("/api/v1/messages/new", (req, res) => {
  const _msg = req.body;
  console.log("msg", _msg);

  Messages.create(_msg, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });

  //   const msg = new Message({
  //     sender: _msg.name,
  //     message: _msg.message,
  //     timeStamp: _msg.timeStamp,
  //   });

  //   msg.save();
  //   res.status(200).send("done");
});
