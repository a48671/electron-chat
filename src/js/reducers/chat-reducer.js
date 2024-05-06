import {
  REGISTER_UNSUB_OF_CHAT_MESSAGES,
  SET_ACTIVE_CHAT,
  SET_CHATS,
  SET_CHATS_INIT,
  SET_MESSAGES_CHAT
} from "../actions/action-types";
import { createReducer, createAction } from '@reduxjs/toolkit';

export const chatReducer = createReducer({
  joined: [],
  available: [],
  activeChats: {},
  messages: {},
  registeredSubs: {}
}, (builder) => {
  builder
    .addCase(createAction(SET_CHATS_INIT), (state, action) => {
      state.joined = [];
      state.available = [];
    })
    .addCase(createAction(SET_CHATS), (state, action) => {
      state.joined = action.joined;
      state.available = action.available;
    })
    .addCase(createAction(SET_ACTIVE_CHAT), (state, action) => {
      state.activeChats[action.chat.id] = action.chat;
    })
    .addCase(createAction(SET_MESSAGES_CHAT), (state, { messages, chatId }) => {
      const existed = state.messages[chatId] || [];
      state.messages[chatId] = [...existed, ...messages.filter(({ type }) => type === 'added')];
    })
    .addCase(createAction(REGISTER_UNSUB_OF_CHAT_MESSAGES), (state, { unsub, chatId }) => {
      state.registeredSubs[chatId] = unsub;
    })
})
