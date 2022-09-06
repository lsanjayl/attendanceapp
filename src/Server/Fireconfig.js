// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBn8gFjB3pX0BVeuSXurCby3reHWYkyKFM",
  authDomain: "attendance-app-bf8e5.firebaseapp.com",
  projectId: "attendance-app-bf8e5",
  storageBucket: "attendance-app-bf8e5.appspot.com",
  messagingSenderId: "113106384741",
  appId: "1:113106384741:web:a91aaaa5a4f5fe3b4cd38c",
  measurementId: "G-PQRR7HTXZR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
