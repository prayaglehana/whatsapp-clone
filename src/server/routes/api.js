import express from "express";
const router = express.Router();

import { postMessageInRoom, getMessagesInRoom } from "../models/roomModel.js";
import { fetchRoomsForUser } from "../models/userModel.js";

router.get("/user/fetchRooms", async (req, res) => {
  const query = req.query;
  console.log("query", query);

  const rooms = await fetchRoomsForUser(query.email);
  console.log("rooms", rooms);
  res.status(201).send(rooms);
});

router.post("/messages/post", async (req, res) => {
  const reqObj = req.body;
  console.log("reqObj", reqObj);

  await postMessageInRoom(reqObj.roomId, reqObj.message);
  res.status(201).send("message sent");
});

router.get("/messages/get", async (req, res) => {
  const query = req.query;
  console.log("query", query);

  const msgs = await getMessagesInRoom(query.roomId);
  console.log("msgs", msgs);
  res.status(201).send(msgs);
});

export default router;
