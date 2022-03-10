import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  rooms: { type: [Number], required: true },
});

export default mongoose.model("users", userSchema);
