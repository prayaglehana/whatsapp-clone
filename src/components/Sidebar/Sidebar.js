import { React, useState } from "react";
import "./Sidebar.css";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SidebarChat from "../SidebarChat/SidebarChat";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Avatar, IconButton } from "@mui/material";
import axios from "../../axios.js";
import Modal from "@mui/material/Modal";
import CreateBox from "./CreateBox";
const Sidebar = ({ rooms, user, roomChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createRoom = async (newGroupMembers) => {
    newGroupMembers.push(user.email);

    console.log("newGroupMembers", newGroupMembers);
    axios.post("/api/v1/user/createNewRoom", {
      newGroupName: "Sample new one",
      newGroupMembers: newGroupMembers,
    });
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://mpng.subpng.com/20180630/ltq/kisspng-computer-icons-user-avatar-clip-art-skincare-cartoon-5b371025a6d8a7.5354815915303352696834.jpg" />
        <div className="sidebar__header__right">
          {/* <IconButton>
            <DonutLargeOutlinedIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton> */}
          <IconButton onClick={() => setIsModalOpen(true)}>
            <AddCircleOutlineRoundedIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__search__container">
          <SearchOutlinedIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        {rooms.map((roomId, rowIdx) => {
          return (
            <button onClick={() => roomChange(roomId, rowIdx)}>
              <SidebarChat Key={rowIdx} roomId={roomId} />
            </button>
          );
        })}
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateBox createRoom={createRoom} />
      </Modal>
    </div>
  );
};

export default Sidebar;
