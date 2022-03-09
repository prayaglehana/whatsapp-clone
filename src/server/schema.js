import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  sender: String,
  message: String,
  timeStamp: String,
});

export default mongoose.model("messages", messageSchema);
