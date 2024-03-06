importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


firebase.initializeApp({
    apiKey: "AIzaSyCo7g1Tq-mYRhHH4wghCqtg4jbxFOJ9wlQ",
    authDomain: "nnd-audio-c22d1.firebaseapp.com",
    projectId: "nnd-audio-c22d1",
    storageBucket: "nnd-audio-c22d1.appspot.com",
    messagingSenderId: "184726855273",
    appId: "1:184726855273:web:ba039c15035428f5550cf8",
    measurementId: "G-S99LQFYYH3"
});

const messaging = firebase.messaging();


self.addEventListener('push', (event) => {
  const payload = event.data.json() 
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image
  };
  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});