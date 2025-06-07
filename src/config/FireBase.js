import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_SS_APIKEY,
  authDomain: import.meta.env.VITE_SS_AUTHDOMAIN,
  projectId: import.meta.env.VITE_SS_PROJECTID,
  storageBucket: import.meta.env.VITE_SS_MESSAGINGSENDERID,
  messagingSenderId: import.meta.env.VITE_SS,
  appId: import.meta.env.VITE_SS_APPID,
  measurementId: import.meta.env.VITE_SS_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);