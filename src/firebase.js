// import firebase from 'firebase'
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAwWNvy32h4kDe7tfCTwzEt3Hssy7e8oQo",
    authDomain: "clone-8a813.firebaseapp.com",
    projectId: "clone-8a813",
    storageBucket: "clone-8a813.appspot.com",
    messagingSenderId: "720692920162",
    appId: "1:720692920162:web:22e20c460bbbef0621f63b",
    measurementId: "G-Y179GDH1YJ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  console.log('imported db', db);
  const auth = firebase.auth();
  
  export { db, auth };
