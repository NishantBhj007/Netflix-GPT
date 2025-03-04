// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4xd02gEql9B0E0kUWVb3xlAUy9fNQ3o8",
  authDomain: "netflixgpt-65e89.firebaseapp.com",
  projectId: "netflixgpt-65e89",
  storageBucket: "netflixgpt-65e89.firebasestorage.app",
  messagingSenderId: "1098770344164",
  appId: "1:1098770344164:web:72d399570d0eaf0c08a4f1",
  measurementId: "G-GBZNGT33PT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
