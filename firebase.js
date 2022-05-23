import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyArB3sHjb1bcN2UebVYZBIOUlnuXRSJ2_g",
    authDomain: "nextjsblog-6d457.firebaseapp.com",
    projectId: "nextjsblog-6d457",
    storageBucket: "nextjsblog-6d457.appspot.com",
    messagingSenderId: "969221623197",
    appId: "1:969221623197:web:77690a1234226ceaacf374"
  };
  

// if(!firebase.apps.length) firebase.initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)
// const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export {auth,db,storage,serverTimestamp}