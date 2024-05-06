import React from 'react';

export const ViewTitle = ({ text, children }) => {
  return (
    <div className="chat-name-container">
      <span className="name">{text}</span>
      <div>{children}</div>
    </div>
  );
};
