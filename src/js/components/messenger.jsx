import React, { useState } from 'react';
import { createTimestamp } from "../utils/time";

export const Messenger = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const sendMessage = () => {
    if (value.trim() === '') { return; }

    const message = {
      content: value.trim(),
      timestamp: createTimestamp()
    }

    onSubmit(message);
  }

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage(value);
      setValue('');
    }
  }

  return (
    <div className="chat-input form-group mt-3 mb-0">
      <textarea
        onChange={e => setValue(e.target.value)}
        onKeyPress={onKeyPress}
        value={value}
        className="form-control"
        row="3"
        placeholder="Type your message here..">
      </textarea>
    </div>
  )
};
