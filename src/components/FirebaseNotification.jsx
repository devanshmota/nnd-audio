import { setFcmToken } from "@/redux/reducer/CachedataSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { generateToken, messaging } from "./Firebase";
import { onMessage } from "firebase/messaging";


const FirebaseNotification = () => {


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
            // Handle the received message as needed
        });
    
        
    }, [])

  return (
    <div>FirebaseNotification</div>
  )
}

export default FirebaseNotification