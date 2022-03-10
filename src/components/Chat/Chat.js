import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import "./Chat.css";
import Message from "./Message";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import axios from "../../axios";
const Chat = ({ roomId, user, messages }) => {
  const checkIfSender = (msg, userName) => {
    return msg.sender == userName;
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const txt = document.getElementById("inputTextBox").value;
    console.log("send message", txt);
    document.getElementById("inputTextBox").value = "";

    await axios.post("/api/v1/messages/post", {
      roomId: roomId,
      message: {
        sender: user.name,
        text: txt,
        timeStamp: "2021-10-19",
      },
    });
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__header__info">
          <h3>Prayag</h3>
          <p>Last seen at 2:30</p>
        </div>
        <div className="chat__header__right">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVertOutlinedIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((msg, idx) => {
          console.log("msg", msg, "idx", idx);
          return (
            <Message
              key={idx}
              msg={msg}
              isSender={checkIfSender(msg, user.name)}
            />
          );
        })}
      </div>

      <div className="chat__footer">
        <IconButton>
          <TagFacesOutlinedIcon />
        </IconButton>
        <form>
          <input id="inputTextBox" placeholder="type a message" type="text" />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <IconButton>
          <MicOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
