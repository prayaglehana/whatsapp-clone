import mongoose from "mongoose";
import rooms from "../schema/roomSchema.js";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1359459",
  key: "9b476ce4b1727bdc687d",
  secret: "512fbfe6638f91d9b4e0",
  cluster: "ap2",
  useTLS: true,
});

const dbURL =
  "mongodb+srv://mongouser:mongouser@cluster0.24xwe.mongodb.net/whatsapp-mern?retryWrites=true&w=majority";

mongoose.connect(dbURL).then((res) => {
  console.log("roomModel is connected to mongoDB ...");
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("connected");

  const msgCollection = db.collection("rooms");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("changes", change);

    if (change.operationType === "update") {
      let obj = change.updateDescription.updatedFields;
      let msg = obj[Object.keys(obj)[0]];
      pusher.trigger("rooms", "inserted", {
        sender: msg.sender,
        text: msg.text,
        timeStamp: msg.timeStamp,
      });
    }
  });
});

export const postMessageInRoom = async (roomId, msg) => {
  return db
    .collection("rooms")
    .updateOne(
      { roomId: roomId },
      {
        $push: {
          messages: {
            sender: msg.sender,
            text: msg.text,
            timeStamp: msg.timeStamp,
          },
        },
      }
    )
    .then((res) => res);
};

export const getMessagesInRoom = (roomId, top = 10) => {
  console.log("getMessagesInRoom");
  return rooms
    .findOne({ roomId: roomId }, { _id: 0, messages: 1 })
    .then((obj) => {
      if (obj != null) {
        return obj.messages;
      }
      return [];
    });
};
