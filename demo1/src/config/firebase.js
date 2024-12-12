// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAdmccBWuRjyMNrNVDIhC2gvsPGjrZADaE",
    authDomain: "saksfifth-da8ad.firebaseapp.com",
    projectId: "saksfifth-da8ad",
    storageBucket: "saksfifth-da8ad.appspot.com",
    messagingSenderId: "719196595064",
    appId: "1:719196595064:web:671d9616d96a1087415e8d",
    measurementId: "G-N7TB69H07T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore instance
const auth = getAuth(app); // Authentication instance
const analytics = getAnalytics(app); // Analytics instance

// Export the Firebase services you need
export { db, auth, analytics };
