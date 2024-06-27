// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR2_gX5xyLmNN6R5o7ucFYIyUWd4nL914",
  authDomain: "it-service-ram.firebaseapp.com",
  projectId: "it-service-ram",
  storageBucket: "it-service-ram.appspot.com",
  messagingSenderId: "56075191295",
  appId: "1:56075191295:web:4f25970f13be34b39d9dca",
  measurementId: "G-7FEXJD3D6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;