import express from "express";
const router = express.Router();

import {
  postMessageInRoom,
  getMessagesInRoom,
  createNewRoom,
} from "../models/roomModel.js";
import {
  fetchRoomsForUser,
  getRoomMembers,
  assignNewRoomToUser,
} from "../models/userModel.js";

router.get("/user/fetchRooms", async (req, res) => {
  const query = req.query;
  console.log("query", query);

  const rooms = await fetchRoomsForUser(query.email);
  console.log("rooms", rooms);
  res.status(201).send(rooms);
});

router.get("/user/getRoomMembers", async (req, res) => {
  const query = req.query;
  console.log("query", query);

  const members = await getRoomMembers(query.roomId);
  console.log("memebers", members);
  res.status(201).send(members);
});

router.post("/user/createNewRoom", async (req, res) => {
  const reqObj = req.body;
  const newGroupMembers = reqObj.newGroupMembers;

  const newRoomId = await createNewRoom();
  console.log("newRoomId:: ", newRoomId);
  console.log("newGroupMembers:: ", newGroupMembers);

  for (let mailId of newGroupMembers) {
    console.log("mailId", mailId);
    await assignNewRoomToUser(newRoomId, mailId);
  }

  res.status(201).send(JSON.stringify(newGroupMembers));
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
