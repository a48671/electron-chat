import React from 'react';
import { joinChat } from "../actions/chats";
import { useDispatch } from "react-redux";

export const AvailableChatsList = ({ chats }) => {
  const dispatch = useDispatch();

  const handleJoinChat = (chat) => {
    const isConfirmed = confirm(`Do you really want to join chat ${chat.name}?`);

    if (isConfirmed) {
      dispatch(joinChat(chat.id));
    }
  }

  return (
    <div className="row mt-3">
      {!chats.length &&
        <div className="container-fluid">
          <div className="alert alert-warning">No chats to join :(</div>
        </div>}
      {chats.map(chat => (
        <div key={chat.id} className="col-lg-3 col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{chat.name}</h5>
              <p className="card-text">{chat.description}</p>
              <button
                onClick={() => handleJoinChat(chat)}
                className="btn btn-outline-primary">Join Chat</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
