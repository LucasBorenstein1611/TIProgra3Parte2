import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDldGqnjtYtNj0DYcTmMqhUZdLA82_k-aE",
    authDomain: "tigrupo8.firebaseapp.com",
    projectId: "tigrupo8",
    storageBucket: "tigrupo8.firebasestorage.app",
    messagingSenderId: "1084597385703",
    appId: "1:1084597385703:web:29f0830416cdedef0ea542"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();


