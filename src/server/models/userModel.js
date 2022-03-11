import mongoose from "mongoose";
import users from "../schema/userSchema.js";

const dbURL =
  "mongodb+srv://mongouser:mongouser@cluster0.24xwe.mongodb.net/whatsapp-mern?retryWrites=true&w=majority";

mongoose.connect(dbURL).then((res) => {
  console.log("userModel is connected to mongoDB ...");
});

const db = mongoose.connection;

export const fetchRoomsForUserName = async (email) => {
  return users
    .findOne({ email: email }, { _id: 0, rooms: 1 })
    .then(({ rooms }) => {
      return rooms;
    });
};
