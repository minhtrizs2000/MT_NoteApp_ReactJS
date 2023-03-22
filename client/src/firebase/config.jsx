// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqkmhMMXXuVBF00m7tJxIZpEfo2Z1HV_s",
  authDomain: "note-app-3d9d2.firebaseapp.com",
  projectId: "note-app-3d9d2",
  storageBucket: "note-app-3d9d2.appspot.com",
  messagingSenderId: "490891993502",
  appId: "1:490891993502:web:c33a6465d9f59ff30eb68f",
  measurementId: "G-Q8TXVGLLF6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);