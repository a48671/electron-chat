import * as api from '../api/chats';
import {
  CREATE_CHAT_ERROR,
  CREATE_CHAT_INIT,
  CREATE_CHAT_SUCCESS,
  JOIN_CHAT_SUCCESS,
  SET_ACTIVE_CHAT,
  SET_CHATS,
  SET_MESSAGES_CHAT
} from "./action-types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../db/firebase";

export const fetchChats = () => async (dispatch, getState) => {
  try {
    const userId = getState().auth.user?.uid
    const chats = await api.fetchChats();

    chats.forEach(chat => chat.joinedUsers = chat.joinedUsers.map(u => u.id));

    const sortedChats = chats.reduce((acc, chat) => {
      acc[chat.joinedUsers.includes(userId) ? 'joined' : 'available'].push(chat);
      return acc;
    }, { joined: [], available: [] });

    dispatch({ type: SET_CHATS, ...sortedChats });
  } catch(e) {
    console.error(e);
  }
};

export const joinChat = (chatId) => async (dispatch, getState) => {
  try {
    const userId = getState().auth.user.uid;
    await api.joinChat(chatId, userId);

    dispatch({ type: JOIN_CHAT_SUCCESS });

    dispatch(fetchChats());
  } catch (e) {
    console.log(e);
  }
}

export const createChat = (data, userId) => async dispatch => {
  dispatch({ type: CREATE_CHAT_INIT });

  try {
    const userRef = doc(db, 'profiles', userId);

    const chatId = await api.createChat({ ...data, admin: userRef });
    dispatch({ type: CREATE_CHAT_SUCCESS });

    await api.joinChat(chatId, userId);
    dispatch({ type: JOIN_CHAT_SUCCESS });
  } catch (e) {
    console.error(e);
    dispatch({ type: CREATE_CHAT_ERROR });
  }
}

export const subscribeChat = (chatId) => dispatch => {
  return api.subscribeToChat(chatId, async (chat) => {
    chat.joinedUsers = await Promise.all(chat.joinedUsers.map(async userRef => {
      const userSnapshot = await getDoc(userRef);

      return { ...userSnapshot.data(), uid: userRef.id };
    }));

    dispatch({ type: SET_ACTIVE_CHAT, chat });
  });
}

export const sendMessage = (message, chatId) => (dispatch, getState) => {
  const newMessage = { ...message };
  const userId = getState().auth.user.uid;

  newMessage.author = doc(db, 'profiles', userId);

  return api.addMessageToChat(newMessage, chatId)
    .then((response) => {
      console.log(response);
    })
    .catch(console.error);
}

export const subscribeToMessagesByChatId = (chatId) => dispatch => {
  return api.subscribeToMessagesByChatId(chatId, async (messages) => {
    const cash = new Map();

    for await (const message of messages) {
      const authorId = message.author.id;

      if (!cash.has(authorId)) {
        const userSnapshot = await getDoc(doc(db, 'profiles', authorId));
        cash.set(authorId, { ...userSnapshot.data(), uid: authorId });
      }

      message.author = cash.get(authorId);
    }

    dispatch({ type: SET_MESSAGES_CHAT, messages, chatId });
  })
}
