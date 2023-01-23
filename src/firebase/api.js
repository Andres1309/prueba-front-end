import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./config";
import { storage } from "./config";

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";

const collectionName = "product";

export const saveProduct = (newProduct) =>
  addDoc(collection(db, collectionName), newProduct);

export const updateProduct = (id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields);

export const onProducts = (callback) => {
  const unsub = onSnapshot(collection(db, collectionName), callback);
  return unsub;
};

export const getProducts = () => getDocs(collection(db, collectionName));

export const deleteProduct = (id) => deleteDoc(doc(db, collectionName, id));

export const getProduct = (id) => getDoc(doc(db, collectionName, id));

export async function uploadFile(file) {
  const name = v4();
  const storageRef = ref(storage, name);
  await uploadBytes(storageRef, file);
  return name;
}

export async function getUrl(file) {
  const storage = getStorage();
  const url = await getDownloadURL(ref(storage, file));
  return url;
}

export async function deleteFile(file) {
  const storage = getStorage();
  await deleteObject(ref(storage, file));
}
