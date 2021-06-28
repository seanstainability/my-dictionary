import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUwgR6Rdrd2PAz3CtcPRE_Z4-4AeZXFJ4",
  authDomain: "my-dictionary-2e2f5.firebaseapp.com",
  projectId: "my-dictionary-2e2f5",
  storageBucket: "my-dictionary-2e2f5.appspot.com",
  messagingSenderId: "393836401584",
  appId: "1:393836401584:web:bf7f79b7f0d76dae28bc75",
  measurementId: "G-HYHQJ3MEGL",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };
