import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDA3MJTjewC9GaCaudcu4Xp7xx9NjROcFI",
    authDomain: "my-blogsite-6f93b.firebaseapp.com",
    projectId: "my-blogsite-6f93b",
    storageBucket: "my-blogsite-6f93b.firebasestorage.app",
    messagingSenderId: "572910627469",
    appId: "1:572910627469:web:1266e8a5f03c92587290c4",
    measurementId: "G-B7LSK3QDBV"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };