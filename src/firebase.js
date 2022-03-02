import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore, collection, getDocs } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDrlbnoN-wRc3PeyT-JFpxjvFaSOzzh2Ls",
  authDomain: "abhiramstudentattendance.firebaseapp.com",
  projectId: "abhiramstudentattendance",
  storageBucket: "abhiramstudentattendance.appspot.com",
  messagingSenderId: "56665601413",
  appId: "1:56665601413:web:b8cabca7bdd01dcafd80ec",
  measurementId: "G-5SG2LK085P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, 'teachers')

getDocs(colRef)
  .then((snapshot) => {
    console.log(snapshot.docs);
  })
export { app, db, colRef };
