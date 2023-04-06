import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAR0V2pltK9mhOSiLIfnbHwlcpS0oJPhHM",
  authDomain: "live-chat-c04dd.firebaseapp.com",
  projectId: "live-chat-c04dd",
  storageBucket: "live-chat-c04dd.appspot.com",
  messagingSenderId: "443134432186",
  appId: "1:443134432186:web:dcee44bd579d6bbc9a0383"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);