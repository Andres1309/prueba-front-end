import { initializeApp } from "firebase/app";
import { getFirestore, snapshot } from "firebase/firestore";
import {
  getStorage,
} from "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  // Paste Your keys here
  apiKey: "AIzaSyDi0DxAql1_TdIeAqlxgC2tSmonL5P-Pb8",
  authDomain: "prueba-front-ec30e.firebaseapp.com",
  projectId: "prueba-front-ec30e",
  storageBucket: "prueba-front-ec30e.appspot.com",
  messagingSenderId: "146764695729",
  appId: "1:146764695729:web:0a8b755bc89e47e2123a90"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const storage = getStorage(app);