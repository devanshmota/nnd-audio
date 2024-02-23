'use client'
import addNotification from 'react-push-notification';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge } from '@mui/material';
import NotificationCanvas from './NotificationCanvas';
import { useEffect, useState } from 'react';
import { getNotificationApi } from '@/redux/actions/Campaign';

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

    // const addNotifications = () => {
    //     addNotification({
    //         title: 'dddddddddd',
    //         message: 'aaa',
    //         duration: 4000,
    //         icon: '/images/nnd_logo.png',
    //         native: true
    //     })
    // }

    return (
        <>
            {/* <button onClick={addNotifications}>click</button> */}
            <Badge badgeContent={notifications.length} color="primary" className='ntfc_badge' onClick={handleOpen} >
                <NotificationsIcon />
            </Badge>
            <NotificationCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} notifications={notifications} />
        </>
    )
}

export default NotificationBell 