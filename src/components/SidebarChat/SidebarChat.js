import { Avatar } from "@mui/material";
import "./SidebarChat.css";
import React from "react";

const SidebarChat = ({ roomId }) => {
  return (
    <div className="sidebarChat">
      <Avatar src="https://mpng.subpng.com/20180630/ltq/kisspng-computer-icons-user-avatar-clip-art-skincare-cartoon-5b371025a6d8a7.5354815915303352696834.jpg" />
      <div className="sidebarChat__info">
        <h2> Room Id # {roomId} </h2>
        <p>last meessage ...</p>
      </div>
    </div>
  );
};

export default SidebarChat;
