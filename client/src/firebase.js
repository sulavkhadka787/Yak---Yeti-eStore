import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDSv94EwdN_9VA-O9A3sAYfxC7xJ5iYlrU",
    authDomain: "yakandyeti-12864.firebaseapp.com",
    projectId: "yakandyeti-12864",
    storageBucket: "yakandyeti-12864.appspot.com",
    messagingSenderId: "948057547928",
    appId: "1:948057547928:web:a07bf15edb7e241ebc5ced"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //export
  export const auth=firebase.auth();
  export const googleAuthProvider=new firebase.auth.GoogleAuthProvider();