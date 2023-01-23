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
  import { storage } from "./config"
  
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
  