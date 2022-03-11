import React from "react";
import Box from "@mui/material/Box";
import "./CreateBox.css";

const CreateBox = ({ createRoom }) => {
  const onCreate = () => {
    let txt = document.getElementById("membersInputTextBox").value;
    let _members = txt.split(" ");
    console.log(_members);
    let members = _members.filter((m) => m.trim().length > 0);
    //  document.getElementById("membersInputTextBox").value = "";

    createRoom(members);
  };
  return (
    <Box sx={style}>
      <div className="createBox">
        <h3>Create New Group</h3>
        <div className="createBox__members">
          <h3>Memebers :</h3>
          <input
            id="membersInputTextBox"
            className="input_text_style"
            type="text"
            onChange={(evt) => {
              // setTopic(evt.target.value);
            }}
          />
        </div>
        <button onClick={() => onCreate()}>create</button>
      </div>
    </Box>
  );
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "160px",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  display: "flex",
  displayDirection: "Column",
  paddingTop: 0,
  padding: 1.5,
  //   backgroundColor: "green",
};

export default CreateBox;
