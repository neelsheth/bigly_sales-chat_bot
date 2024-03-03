import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCSKff7mnQx0Jj6D0Oc8T6NrQFrWy1Zj6I",
    authDomain: "chatbot-bd972.firebaseapp.com",
    projectId: "chatbot-bd972",
    storageBucket: "chatbot-bd972.appspot.com",
    messagingSenderId: "1082709624597",
    appId: "1:1082709624597:web:a4b329cfb7668420aa0b1c",
    measurementId: "G-KDQ4Z2KVB0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);