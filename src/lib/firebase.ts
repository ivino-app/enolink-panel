import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtYR9RCS8kiUp1pUOWMuxHKGBF701Yriw",
    authDomain: "ivino-app.firebaseapp.com",
    projectId: "ivino-app",
    storageBucket: "ivino-app.firebasestorage.app",
    messagingSenderId: "27430021409",
    appId: "1:27430021409:web:5dd494dff3faa3cce87660",
    measurementId: "G-14N8SXXVMC",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
