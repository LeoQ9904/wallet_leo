import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCQggeO6Q0kkYVGQIPYCtIqXluID7pBIaw',
  authDomain: 'wallet-leo.firebaseapp.com',
  projectId: 'wallet-leo',
  storageBucket: 'wallet-leo.firebasestorage.app',
  messagingSenderId: '48551763381',
  appId: '1:48551763381:web:e8bc47cd413bc38c268dfc',
  measurementId: 'G-NCE0JCDT2Y',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
