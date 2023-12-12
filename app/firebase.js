
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCC0d76fA1Zm-f5YrVpcXddcioDSn6wbw4",
  authDomain: "auth-entitles.firebaseapp.com",
  projectId: "auth-entitles",
  storageBucket: "auth-entitles.appspot.com",
  messagingSenderId: "900035643543",
  appId: "1:900035643543:web:e8eba9f9a840a77dbcc1d2",
  measurementId: "G-1VNJM6H2MW"

};

if (firebase.apps.length==0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
