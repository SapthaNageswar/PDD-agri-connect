import { initializeApp } from "firebase/app";
import { getAuth, indexedDBLocalPersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANOJnZAzoRFFdgdHsNLKGcHLINQKLXSUo",
  authDomain: "agriconnect-33.firebaseapp.com",
  projectId: "agriconnect-33",
  storageBucket: "agriconnect-33.firebasestorage.app",
  messagingSenderId: "475911021221",
  appId: "1:475911021221:web:6079644fb22af4c2fbe34c"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Use indexedDBLocalPersistence so Firebase Auth works under file:// (Android WebView)
// Falls back to normal getAuth() behaviour on web browsers
export const auth = initializeAuth(firebaseApp, {
  persistence: indexedDBLocalPersistence
});

export const db = getFirestore(firebaseApp);
console.log('Firestore initialized', db);
