'use client'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const Header = dynamic(() => import('./Header.jsx'), {
    ssr: false
})
const Sidebar = dynamic(() => import('./Sidebar.jsx'), {
    ssr: false
})
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import { I18nextProvider } from 'react-i18next';
const FirebaseNotification = dynamic(() => import('./FirebaseNotification.jsx'), {
    ssr: false
})
const Player = dynamic(() => import('./Player.jsx'), {
    ssr: false
})
import language from '../utils/language.jsx'
import { useEffect } from 'react';
import { getSystemSettingsApi } from '@/redux/actions/Campaign.js';
import { useDispatch } from 'react-redux';
import { setSystemSettings } from '@/redux/reducer/SystemSettingsSlice.js';
import Loader from './Loader.jsx';
import { useState } from 'react';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    backgroundColor: "#131825",
    color: "white",
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    backgroundColor: "#131825",
    color: "white",
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function PersistentDrawerLeft({ children }) {
    const dispatch = useDispatch()
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getSystemSettingsApi({
            type: 'all',
            onSuccess: (res) => {
                if (res.data) {
                    dispatch(setSystemSettings(res.data))
                }
                setIsLoading(false)
            },
            onError: (e) => {
                console.log(e)
                setIsLoading(false)
            }
        })
    }, [])

    if (isLoading) {
        return <Loader />
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                open={open}
                sx={{
                    background: "#131825",
                    height: "84px",
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "84px",
                    }}
                >

                    <div className='d-flex align-items-center gap-2'>
                        <IconButton
                            color="inherit"
                            className="open_drawer logo_icon_container"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: "none" }),
                            }}
                        >
                            <MenuIcon className='menuIcon' />
                        </IconButton>
                        <img src='/images/nnd_web.png' alt='nnd_logo' className='nnd_web' />
                        <img src='/images/nnd_logo.png' alt='nnd_logo' className='nnd_logo' />
                    </div>
                    <Header />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <Sidebar open={open} />
            </Drawer>
            <Main open={open} className='drawerMain' >
                <I18nextProvider i18n={language}>
                    <DrawerHeader />
                    <FirebaseNotification />
                    <div className='main nnd_scrollbar'>
                        {children}
                    </div>
                </I18nextProvider>
            </Main>
            <Player />
            <Toaster position="top-center" reverseOrder={false} />
        </Box>
    );
}



