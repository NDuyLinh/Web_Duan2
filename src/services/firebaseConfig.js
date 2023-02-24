
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth,
} from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9Zviut5wazIMEs3E_5AThZZvavntDrlU",
  authDomain: "du-an-2-ad628.firebaseapp.com",
  projectId: "du-an-2-ad628",
  storageBucket: "du-an-2-ad628.appspot.com",
  messagingSenderId: "743782284524",
  appId: "1:743782284524:web:1ef0f998d538ccd4abf9c9",
  measurementId: "G-2M3R2DDMDR"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//init services
export const db = getDatabase(app);

export const fireStore = getFirestore(app);

export const fireStoreRef = collection(fireStore, "members");

export const dbRef = ref(db, 'Data');

export const auth = getAuth(app);
