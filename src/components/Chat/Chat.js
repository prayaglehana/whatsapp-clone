import { Avatar, IconButton } from "@mui/material";
import React from "react";
import "./Chat.css";
import Message from "./Message";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
const Chat = () => {
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
        <Message />
        <Message isSender={true} />
        <Message />
        <Message />
        <Message isSender={true} />
        <Message />
        <Message />
      </div>

      <div className="chat__footer">
        <IconButton>
          <TagFacesOutlinedIcon />
        </IconButton>
        <form>
          <input placeholder="type a message" type="text" />
          <button type="submit">Send a message</button>
        </form>
        <IconButton>
          <MicOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
