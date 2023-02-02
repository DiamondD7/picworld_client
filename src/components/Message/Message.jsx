import React from "react";
import AJS from "../../images/AJS.jpg";

import "../../styles/messagestyles.css";
const Message = () => {
  return (
    <div>
      <div className="message-container">
        <div className="chatboxes-div">
          <button className="btn-chats">
            <div className="btn-within">
              <img className="chats-img" src={AJS} alt="chatpic" />
              <p>Aaron Sierra</p>
            </div>
          </button>
          <button className="btn-chats">
            <div className="btn-within">
              <img className="chats-img" src={AJS} alt="chatpic" />
              <p>Aaron Sierra</p>
            </div>
          </button>
        </div>

        <div className="chat-container"></div>
      </div>
      <div className="message-functions">
        <textarea className="textarea-message"></textarea>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Message;
