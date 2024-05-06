import { db } from '../db/firebase';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  setDoc
} from 'firebase/firestore';

export const fetchChats = async () => {
  const chatCol = collection(db, 'chats');
  const chatsSnapshot = await getDocs(chatCol);

  return chatsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export const createChat = async (data) => {
  const chatRef = await addDoc(collection(db, 'chats'), data);

  return chatRef.id;
}

export const joinChat = async (chatId, userId) => {
  const chatRef = doc(db, 'chats', chatId);
  const userRef = doc(db, 'profiles', userId);

  await updateDoc(chatRef, { joinedUsers: arrayUnion(userRef) });
  await updateDoc(userRef, { joinedChats: arrayUnion(chatRef) });

  return { chatId, userId };
}

export const subscribeToChat = (chatId, callback) => {
  return onSnapshot(doc(db, 'chats', chatId), (snapshot) => {
    callback({ ...snapshot.data(), id: chatId });
  });
}

export const addMessageToChat = (message, chatId) => {
  const messageRef = doc(db, `chats/${chatId}/messages`, message.timestamp);
  return setDoc(messageRef, message);
}

export const subscribeToMessagesByChatId = (chatId, callback) => {
  const messageCollection = collection(db, 'chats', chatId, 'messages');
  return onSnapshot(messageCollection, (snapshot) => {
    return callback(snapshot.docChanges().map(mess => ({
      ...mess.doc.data(),
      id: mess.doc.id,
      type: mess.type
    })));
  });
}
