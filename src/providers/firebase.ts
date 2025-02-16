import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQggeO6Q0kkYVGQIPYCtIqXluID7pBIaw",
  authDomain: "wallet-leo.firebaseapp.com",
  databaseURL: "https://wallet-leo-default-rtdb.firebaseio.com",
  projectId: "wallet-leo",
  storageBucket: "wallet-leo.firebasestorage.app",
  messagingSenderId: "48551763381",
  appId: "1:48551763381:web:e8bc47cd413bc38c268dfc",
  measurementId: "G-NCE0JCDT2Y"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
