'use client'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge } from '@mui/material';
import NotificationCanvas from './NotificationCanvas';
import { useEffect, useState } from 'react';
import { getNotificationApi } from '@/redux/actions/Campaign';
import Image from 'next/image';


const NotificationBell = () => {


    
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
    const [notifications, setNotifications] = useState([])


    
 
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
            <Image src='/Notification.svg' alt='notifications' width={40} height={40} onClick={handleOpen} className='ntfc_icon' />
            <NotificationCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} notifications={notifications} />
        </>
    )
}

export default NotificationBell 