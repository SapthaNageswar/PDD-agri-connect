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

// Initialize Firebase app (singleton)
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Auth — use initializeAuth only in Android WebView (Capacitor),
// otherwise fall back to standard getAuth so that browser Auth works correctly.
// Calling BOTH initializeAuth and getAuth on the same app throws an error,
// so we detect the environment and pick one path.
let _auth;
try {
  // In a real browser environment indexedDBLocalPersistence still works,
  // but if Auth was already initialised (e.g. HMR), getAuth is safer.
  _auth = initializeAuth(firebaseApp, {
    persistence: indexedDBLocalPersistence,
  });
} catch {
  // Auth already initialised — just reuse the existing instance
  _auth = getAuth(firebaseApp);
}
export const auth = _auth;

// Firestore instance
export const db = getFirestore(firebaseApp);
