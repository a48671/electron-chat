import React from 'react';
import { useSelector } from "react-redux";
import { getTimeFromNowByTimestamp } from "../utils/time";

export const ChatMessagesList = ({ messages, innerRef }) => {
  const userId = useSelector(({ auth }) => auth.user?.uid);

  return (
    <div className="chat-container">
      <ul ref={innerRef} className="chat-box chatContainerScroll">
        {messages.map(m => (
          <li
            key={m.id}
            className={getClassName(userId, m)}>
            <div className="chat-avatar">
              <img
                src={m.author?.avatar}
                alt="Retail Admin" />
              <div className="chat-name">{m.author?.username}</div>
            </div>
            <div className="chat-text-wrapper">
              <span className="chat-text">{m.content}</span>
              <span className="chat-spacer"></span>
              <div className="chat-hour">{getTimeFromNowByTimestamp(m.timestamp)}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

function getClassName(userId, message) {
  return userId === message.author.uid ? 'chat-right' : 'chat-left';
}
