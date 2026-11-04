import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC19VMPmrztPgLkPk1A7z9UX6LlpOfg3uw",
  authDomain: "yeison-barber-style.firebaseapp.com",
  databaseURL: "https://yeison-barber-style-default-rtdb.firebaseio.com",
  projectId: "yeison-barber-style",
  storageBucket: "yeison-barber-style.firebasestorage.app",
  messagingSenderId: "751165070257",
  appId: "1:751165070257:web:ad8fc63bf23fe947987b90",
  measurementId: "G-5BLMG28HDG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);