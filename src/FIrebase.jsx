import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPea5VHJqonN4VIstIatzVeGiIoHtfEt8",
  authDomain: "social-nttwork-project.firebaseapp.com",
  databaseURL: "https://social-nttwork-project-default-rtdb.firebaseio.com",
  projectId: "social-nttwork-project",
  storageBucket: "social-nttwork-project.appspot.com",
  messagingSenderId: "1068031897226",
  appId: "1:1068031897226:web:7b3e204e355cba80b60773",
  measurementId: "G-LX7P39PHJC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { auth, app, firestore, storage };
