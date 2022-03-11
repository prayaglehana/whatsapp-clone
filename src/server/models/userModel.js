import mongoose from "mongoose";
import users from "../schema/userSchema.js";

const dbURL =
  "mongodb+srv://mongouser:mongouser@cluster0.24xwe.mongodb.net/whatsapp-mern?retryWrites=true&w=majority";

mongoose.connect(dbURL).then((res) => {
  console.log("userModel is connected to mongoDB ...");
});

const db = mongoose.connection;

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
