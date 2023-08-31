// src.firebase.js
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAWx0oxGJZiepLupqsFNfB82EyeZAu0_II",
    authDomain: "electron-v-b28cb.firebaseapp.com",
    projectId: "electron-v-b28cb",
    storageBucket: "electron-v-b28cb.appspot.com",
    messagingSenderId: "964387987438",
    appId: "1:964387987438:web:085a0592eaecb7985738ff",
    measurementId: "G-R0NSMTQCSX"
  };

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export {auth}