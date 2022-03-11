import mongoose from "mongoose";
import users from "../schema/userSchema.js";

const dbURL =
  "mongodb+srv://mongouser:mongouser@cluster0.24xwe.mongodb.net/whatsapp-mern?retryWrites=true&w=majority";

mongoose.connect(dbURL).then((res) => {
  console.log("userModel is connected to mongoDB ...");
});

const db = mongoose.connection;

export const assignNewRoomToUser = async (_newRoomId, _email) => {
  return db
    .collection("users")
    .updateOne(
      { email: _email.trim() },
      {
        $push: {
          rooms: _newRoomId,
        },
      }
    )
    .then((res) => res);
};

export const fetchRoomsForUser = async (_email) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .find({ email: _email.trim() })
      .toArray(function (err, result) {
        if (result.length == 0) {
          resolve([]);
        }
        resolve(result[0].rooms);
      });
  });
};

// db.users
// .find({ rooms: { $all: [0] } })
export const getRoomMembers = async (roomId) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .find(
        { rooms: { $all: [Math.floor(roomId)] } },
        { projection: { _id: 0, name: 1 } }
      )
      .toArray(function (err, result) {
        if (result.length == 0) {
          resolve([]);
        }
        resolve(result);
      });
  });
};
