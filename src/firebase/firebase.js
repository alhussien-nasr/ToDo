import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrFE_LzsdpErLGes8yNn3Wcgo2Y9XI22g",
  authDomain: "to-do-5c077.firebaseapp.com",
  projectId: "to-do-5c077",
  storageBucket: "to-do-5c077.appspot.com",
  messagingSenderId: "81624448863",
  appId: "1:81624448863:web:2773c4ab1cf2ad986b00ea",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authantication = getAuth(app);
export const db = getFirestore(app);
