import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/register-user";

export const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const error = useSelector(({ auth }) => auth.register.error);

  const submitHandler = (data) => {
    dispatch(registerUser(data));
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="centered-container-form">
      <div className="header">Create an account</div>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            { ...register('email') }
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            { ...register('username') }
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Avatar</label>
          <input
            { ...register('avatar') }
            type="text"
            className="form-control"
            id="avatar"
            aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            { ...register('password') }
            type="password"
            className="form-control"
            id="password" />
        </div>
        { !!error && <div className="alert alert-danger small">{error.message}</div>}
        <button type="submit" className="btn btn-outline-primary">Register</button>
      </div>
    </form>
  );
};
