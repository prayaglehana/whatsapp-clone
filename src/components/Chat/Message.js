import React from "react";
import "./Message.css";
const Message = ({ isSender }) => {
  return (
    <p className={`message${isSender ? " sender" : ""}`}>
      <span className="message__name">Sonny</span>
      This is a message
      <span className="message__timeStamp">{new Date().toUTCString()}</span>
    </p>
  );
};

export default Message;
