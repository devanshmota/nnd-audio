'use client'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge } from '@mui/material';
import NotificationCanvas from './NotificationCanvas';
import { useEffect, useState } from 'react';
import { getNotificationApi } from '@/redux/actions/Campaign';
import { generateToken, messaging } from './Firebase';
import { onMessage } from 'firebase/messaging';

const NotificationBell = () => {

    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
    const [notifications, setNotifications] = useState([])


    useEffect(() => {
        generateToken()
        onMessage(messaging, (payload) => {
            console.log('Message received:', payload);
            // Handle the received message as needed
        });
    
        
    }, [])
 
    useEffect(() => {
        
        getNotificationApi({
            onSuccess: (res) => {
                if (res.data) {
                    setNotifications(res.data)
                }
            },
            onError: (e) => {
                console.log(e)
            }
        })
    }, [])

    const handleOpen = () => {
        setIsOffCanvasOpen(true)
    }


    return (
        <>
            <Badge badgeContent={notifications.length} color="primary" className='ntfc_badge' onClick={handleOpen} >
                <NotificationsIcon />
            </Badge>
            <NotificationCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} notifications={notifications} />
        </>
    )
}

export default NotificationBell 