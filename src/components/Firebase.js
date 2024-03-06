'use client'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getMessaging} from 'firebase/messaging'

const firebaseConfig = {
    apiKey: "AIzaSyCo7g1Tq-mYRhHH4wghCqtg4jbxFOJ9wlQ",
    authDomain: "nnd-audio-c22d1.firebaseapp.com",
    projectId: "nnd-audio-c22d1",
    storageBucket: "nnd-audio-c22d1.appspot.com",
    messagingSenderId: "184726855273",
    appId: "1:184726855273:web:ba039c15035428f5550cf8",
    measurementId: "G-S99LQFYYH3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();   

export const messaging = getMessaging(firebaseApp)

export { db, auth };