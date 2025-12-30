// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyNo31OmjJcd75FTZf8V5bTFLeGmXO__0",
  authDomain: "isha-glow-makeover.firebaseapp.com",
  projectId: "isha-glow-makeover",
  storageBucket: "isha-glow-makeover.firebasestorage.app",
  messagingSenderId: "1045041621788",
  appId: "1:1045041621788:web:bb5bc135fc1df1f95ba8d9",
  measurementId: "G-3DLVBXPCKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = firebaseConfig.appId;

// FIX: Initialize Analytics only on the client side
let analytics;
if (typeof window !== 'undefined') {
  // Optional: Check if analytics is supported (e.g., not supported in some brave browser settings)
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, analytics, appId };