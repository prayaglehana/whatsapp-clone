import React from "react";
import "./Message.css";
const Message = ({ msg, isSender }) => {
  console.log("isse", isSender);
  return (
    <p className={`message${isSender ? " sender" : ""}`}>
      <span className="message__name">{msg.sender}</span>
      {msg.text}
      <span className="message__timeStamp">3:50 pm</span>
    </p>
  );
};

export default Message;
