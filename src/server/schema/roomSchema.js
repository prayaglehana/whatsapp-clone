import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
  roomId: { type: Number, required: true },
  messages: [
    {
      sender: { type: String, required: true },
      text: { type: String, required: true },
      timeStamp: { type: String, required: true },
    },
  ],
});

export default mongoose.model("rooms", roomSchema);
