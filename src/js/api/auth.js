import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from "firebase/auth";
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from "../db/firebase";

function createProfile({ email, username, avatar, joinedChats, uid }) {
  return setDoc(doc(db, "profiles", uid), {
    email,
    username,
    avatar,
    joinedChats
  });
}

export async function registerUser({ email, password, username, avatar, joinedChats }) {
  try {
    const auth = getAuth();

    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const userProfile = { uid: user.uid, email, username, avatar, joinedChats };

    await createProfile(userProfile);

    const profile = await getUserById(user.uid);

    return { ...profile, uid: user.uid };
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function login({ email, password }) {
  const auth = getAuth();

  const { user } = await signInWithEmailAndPassword(auth, email, password);
  const profile = await getUserById(user.uid);

  return { ...profile, uid: user.uid };
}

export function listenToAuthStateChanged(callback) {
  const auth = getAuth();

  return onAuthStateChanged(auth, callback);
}

export function logout() {
  const auth = getAuth();

  return signOut(auth);
}

export async function getUserById(uid) {
  const docRef = doc(db, "profiles", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return null;
}

export const subscribeToUserChanges = (userId, callback) => {
  return onSnapshot(doc(db, 'profiles', userId), (snapshot) => {
    callback(snapshot.data());
  })
}
