import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/auth";

export const Navbar = ({ hideHomeButton }) => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user)

  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          {!hideHomeButton && <Link to={"/home"} className="btn btn-outline-primary">Home</Link>}
          <Link to="/settings" className="btn btn-outline-success ml-2">Settings</Link>
        </div>
        <div className="chat-navbar-inner-right">
          {!user && <Link
            to="/"
            className="btn btn-outline-success ml-2">Login</Link>}
          {user && <>
            <img src={user.avatar} className="avatar" alt={user.username} />
            <span className="logged-in-user ml-2 mr-4">Hi, {user.username}</span>
            <button
            onClick={() => dispatch(logout())}
            className="btn btn-outline-danger ml-2">Logout</button>
          </>}
        </div>
      </nav>
    </div>
  );
};
