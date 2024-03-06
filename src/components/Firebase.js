import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getMessaging, getToken} from 'firebase/messaging'

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

export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'BAx3KxWNJuYL6F-GvraQQVZyHtofeTidX0soV3b4hre4Hsu6PedgWop64--740WUu3psNMKB-2v8UAs_K3aqoqM',
      });
      return token;
    }
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
};


export { db, auth };