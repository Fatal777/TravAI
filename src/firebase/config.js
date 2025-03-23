import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9TsUHaGGJI4b-c8Pq1sJcT9-12oF4Mk0",
  authDomain: "travel-companion-d15dd.firebaseapp.com",
  projectId: "travel-companion-d15dd",
  storageBucket: "travel-companion-d15dd.appspot.com",
  messagingSenderId: "357997858449",
  appId: "1:357997858449:web:22f8ae1dd7bb75938cb930",
  measurementId: "G-QER51QG85W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics only if supported
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { app, auth, db, analytics };