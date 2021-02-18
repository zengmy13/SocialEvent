import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";
import 'firebase/storage';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyCzK6dPpyhGV2wMJEWZaeKFCrP4hiNd4S4",
    authDomain: "the-project-2d6a9.firebaseapp.com",
    projectId: "the-project-2d6a9",
    storageBucket: "the-project-2d6a9.appspot.com",
    messagingSenderId: "913350243620",
    appId: "1:913350243620:web:b61196585cd05e26feefb1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;