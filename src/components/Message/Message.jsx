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
              <img
                className="chats-img"
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="chatpic"
              />
              <p>Jarrette Iyanna</p>
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
