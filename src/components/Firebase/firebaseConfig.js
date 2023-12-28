import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyADLU1fp7rVzAq5wi4HZ3NMS5kkviAuXqc",
  authDomain: "quizculture-5362f.firebaseapp.com",
  projectId: "quizculture-5362f",
  storageBucket: "quizculture-5362f.appspot.com",
  messagingSenderId: "922782258359",
  appId: "1:922782258359:web:5d70e087b35867ea1a2932",
};

const app = initializeApp(config);
export const auth = getAuth(app);

export const firestore = getFirestore();

export const user = (uid) => doc(firestore, `users/${uid}`);
