import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVnM8otBAEGJSOoqriEMQU2mrVsoJjAaM",
  authDomain: "roch-luxury.firebaseapp.com",
  projectId: "roch-luxury",
  storageBucket: "roch-luxury.appspot.com",
  messagingSenderId: "827638222548",
  appId: "1:827638222548:web:4ca71045a6c1c8edb83541"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
