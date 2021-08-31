import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyATLDpQO1b6RN3D_6aLNlNNoQVtwxvPXEU",
  authDomain: "todo-router.firebaseapp.com",
  projectId: "todo-router",
  storageBucket: "todo-router.appspot.com",
  messagingSenderId: "736461808961",
  appId: "1:736461808961:web:80c62b5575141c6f406dc0",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const storage = app.storage();

export { db, auth, storage };
