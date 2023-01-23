import { initializeApp } from "firebase/app";
import { getFirestore, snapshot } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {v4} from "uuid"

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

export const storage = getStorage(app)

export async function uploadFile(file) {
  const name = v4()
  const storageRef = ref(storage, name)
   await uploadBytes(storageRef, file)
  return(name)
}

export async function getUrl(file) {
  const storage = getStorage()
  const url = await getDownloadURL(ref(storage, file))
  return url
}

export async function deleteFile(file) {
  const storage = getStorage()
  await deleteObject(ref(storage, file))
}