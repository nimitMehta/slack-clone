import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBES96JRWuufo_WPGjopMPQEXOHcuYyZH4",
  authDomain: "slack-clone-c0a78.firebaseapp.com",
  databaseURL: "https://slack-clone-c0a78.firebaseio.com",
  projectId: "slack-clone-c0a78",
  storageBucket: "slack-clone-c0a78.appspot.com",
  messagingSenderId: "408577930316",
  appId: "1:408577930316:web:7f1a9b9c62d62fc3a930e9",
  measurementId: "G-S4G0G80C19",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, storage, provider };
export default db;
