import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQs12c2ll7AWJe4r7RTyCD-3QVnYP4j1c",
  authDomain: "digitalplayer-9ad13.firebaseapp.com",
  projectId: "digitalplayer-9ad13",
  storageBucket: "digitalplayer-9ad13.appspot.com",
  messagingSenderId: "256067459702",
  appId: "1:256067459702:web:c7478b0d6456e9d56cdd57",
  measurementId: "G-7Z2BHY8FET"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);