import React from 'react';
import { BaseLayout } from "../components/layouts/base-layout";
import { useForm } from "react-hook-form";
import { createChat } from "../actions/chats";
import { useDispatch, useSelector } from "react-redux";

export const CreateChatView = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const onSubmit = (data) => {
    dispatch(createChat(data, user.uid));
  };

  return (
    <BaseLayout>
      <div className="centered-view">
        <div className="centered-container">
          <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
            <div className="header">Create chat now!</div>
            <div className="subheader">Chat with people you know</div>
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  {...register('name')}
                  type="text"
                  className="form-control"
                  id="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  {...register('description')}
                  className="form-control"
                  id="description">
              </textarea>
              </div>
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  {...register('image')}
                  type="text"
                  className="form-control"
                  id="image"
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </BaseLayout>
  );
};
