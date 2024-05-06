import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUVJ7ZgCvKDT1476hMuSArfjpRnfNL5l0",
  authDomain: "electron-chat-84df9.firebaseapp.com",
  projectId: "electron-chat-84df9",
  storageBucket: "electron-chat-84df9.appspot.com",
  messagingSenderId: "1005094005452",
  appId: "1:1005094005452:web:ca8c66944979cb4df0b069",
  measurementId: "G-0ZBZB56B2H"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

