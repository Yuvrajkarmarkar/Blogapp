// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// console.log(import.meta.env.VITE_FIREBASE_API_KEY)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-fd388.firebaseapp.com",
  projectId: "mern-blog-fd388",
  storageBucket: "mern-blog-fd388.appspot.com",
  messagingSenderId: "205560602405",
  appId: "1:205560602405:web:11b53da1156993b26704cc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);