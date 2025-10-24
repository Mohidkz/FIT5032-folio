// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Add the import for Authentication
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6X95D7DndNYHJfJkf2Fq8Wk9mnokvOac",
  authDomain: "week7-mohid.firebaseapp.com",
  projectId: "week7-mohid",
  storageBucket: "week7-mohid.appspot.com", // Corrected storage bucket domain
  messagingSenderId: "256425801066",
  appId: "1:256425801066:web:febade28b60aca20222113"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
