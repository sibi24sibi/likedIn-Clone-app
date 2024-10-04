import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALwXaBU2kIH9QR09lnvYh9AR05HtHIAOg",
  authDomain: "app-1083c.firebaseapp.com",
  projectId: "app-1083c",
  storageBucket: "app-1083c.appspot.com",
  messagingSenderId: "799920870606",
  appId: "1:799920870606:web:82abd443a5a0fc4af92c9f",
  databaseURL: "https://app-1083c-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { auth, app, firestore, storage };
