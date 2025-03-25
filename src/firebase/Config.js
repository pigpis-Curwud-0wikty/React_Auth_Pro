import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmqqlooPt8yFYdz8k_76ARjk8wAkCCc_w",
  authDomain: "auth-4react.firebaseapp.com",
  projectId: "auth-4react",
  storageBucket: "auth-4react.firebasestorage.app",
  messagingSenderId: "406001412127",
  appId: "1:406001412127:web:bc9f0bffa7cb8a08170d2a",
  measurementId: "G-GB4071BK6R",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
