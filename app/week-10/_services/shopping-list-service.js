import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";


export const getItems = async (userId) => {
    try {
      const itemsCollection = collection(db, "users", userId, "items");
      const itemsSnapshot = await getDocs(itemsCollection);
  
      const items = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      return items;
    } catch (error) {
      console.error("Error getting items:", error);
      return [];
    }
  };
  
  export const addItem = async (userId, item) => {
    try {
      const itemsCollection = collection(db, "users", userId, "items");
  
      const docRef = await addDoc(itemsCollection, item);
  
      return docRef.id;
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };