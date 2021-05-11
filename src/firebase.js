import firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyB96g-glcrm9BLPVAtEy_QiLDmmd5sgb98",
  authDomain: "fb-messenger-clone-15aa2.firebaseapp.com",
  projectId: "fb-messenger-clone-15aa2",
  storageBucket: "fb-messenger-clone-15aa2.appspot.com",
  messagingSenderId: "332353297865",
  appId: "1:332353297865:web:feeb54b242db0d0ca8dc18",
  measurementId: "G-1QM0KNT8LS",
});

const db = firebaseConfig.firestore();

export default db;
