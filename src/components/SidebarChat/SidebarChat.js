import { Avatar } from "@mui/material";
import "./SidebarChat.css";
import React from "react";

const SidebarChat = () => {
  return (
    <div className="sidebarChat">
      <Avatar src="https://mpng.subpng.com/20180630/ltq/kisspng-computer-icons-user-avatar-clip-art-skincare-cartoon-5b371025a6d8a7.5354815915303352696834.jpg" />
      <div className="sidebarChat__info">
        <h2>Prayag</h2>
        <p>kya haaal hai bhai</p>
      </div>
    </div>
  );
};

export default SidebarChat;
