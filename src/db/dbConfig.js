import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import access from "./access-right";

const firebaseConfig = {
  apiKey: access.key,
  authDomain: access.domain,
  databaseURL: access.url,
  projectId: "chatterbox-212dc",
  storageBucket: "chatterbox-212dc.appspot.com",
  messagingSenderId: "132087224498",
  appId: "1:132087224498:web:b5dd65ce16f14d940b11ab",
  measurementId: "G-ED1Z7XESRW",
};

firebase.initializeApp(firebaseConfig);

export default {
  auth: firebase.auth(),
  firestore: firebase.firestore(),
};
