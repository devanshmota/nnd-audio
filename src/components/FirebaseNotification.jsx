'use client'
import { setFcmToken } from "@/redux/reducer/CachedataSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { generateToken, messaging } from "./Firebase";
import { onMessage } from "firebase/messaging";

const FirebaseNotification = ({children}) => {

    const dispatch = useDispatch()
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await generateToken();
                dispatch(setFcmToken(token))
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };
        fetchToken();
        onMessage(messaging, (payload) => {
            console.log('Message received:', payload);
        });
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