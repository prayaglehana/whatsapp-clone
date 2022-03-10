import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  sender: String,
  text: String,
  timeStamp: String,
});

export default mongoose.model("messages", messageSchema);
