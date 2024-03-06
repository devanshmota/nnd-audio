'use client'
import { setFcmToken } from "@/redux/reducer/CachedataSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { messaging } from "./Firebase";

const FirebaseNotification = ({ children }) => {

  const dispatch = useDispatch()
  useEffect(() => {

    const fetchToken = async () => {
      try {
        if (typeof window !== 'undefined') {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            const token = await getToken(messaging, {
              vapidKey: 'BAx3KxWNJuYL6F-GvraQQVZyHtofeTidX0soV3b4hre4Hsu6PedgWop64--740WUu3psNMKB-2v8UAs_K3aqoqM',
            });
            dispatch(setFcmToken(token))
          }
        }

      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    fetchToken();
    // onMessage(messaging, (payload) => {
    //   console.log('Message received:', payload);
    // });
  }, [])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/firebase-messaging-sw.js').then(
          function (registration) {
            console.log('Service Worker registration successful with scope: ', registration.scope)
          },
          function (err) {
            console.log('Service Worker registration failed: ', err)
          }
        )
      })
    }
  }, [])

  return <div>{children && React.cloneElement(children)}</div>
}

export default FirebaseNotification