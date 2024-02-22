import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { getDecryptedText } from '@/decryption/decryption';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { auth } from './Firebase';
import { deleteAccountApi, logoutApi } from '@/redux/actions/Campaign';
import { setUsers } from '@/redux/reducer/UsersSlice';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export default function BasicMenu() {

    const dispatch = useDispatch()
    const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { users } = useSelector((state) => state.users)
    const [isLoading, setIsLoading] = React.useState(false)


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        router.push('/profile')
    }

    if (isLoading) {
        return <ClipLoader color="#36d7b7" />
    }

    const handleLogout = async () => {
        handleClose()
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                auth.signOut();
               await logoutApi({
                    onSuccess: (res) => {
                        if (res.error === false) {
                            dispatch(setUsers({}));
                            Swal.fire({
                                title: "Logout!",
                                text: "Logged out successfully",
                                icon: "success"
                            });
                            router.push('/')
                        }
                    },
                    onError: (e) => {
                        console.log(e)
                        toast.error(e)
                    }
                })

            }
        });

    };

    const handleDeleteAccount = () => {
        handleClose()

        Swal.fire({
            title: "Delete Account?",
            text: "You will permanently lose your Notification, Profile, & Favorite",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    setIsLoading(true)

                    setTimeout(() => {
                        try {
                            const user = auth.currentUser;
                            if (user) {
                                user.delete().then(() => {
                                    console.log('Account deleted successfully');
                                });
                            } else {
                                toast.error('No user found');
                            }
                        } catch (error) {
                            toast.error(error.message);
                        }

                        deleteAccountApi({
                            onSuccess: (res) => {
                                if (res.error === false) {
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: res.message,
                                        icon: "success"
                                    });
                                    dispatch(setUsers({}));
                                    setIsLoading(false);
                                    router.push('/');
                                }
                            },
                            onError: (e) => {
                                console.log(e);
                                toast.error(res.error);
                            }
                        });
                    }, 5000);


                }
            })
    }

    return (
        <div className='basic_menu'>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                startIcon={<PersonIcon />}
            >
                {getDecryptedText(users.data.first_name)}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}

                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleProfile} className='basic_menu_item'>Profile</MenuItem>
                <MenuItem onClick={handleLogout} className='basic_menu_item' >Logout</MenuItem>
                <MenuItem onClick={handleDeleteAccount} className='basic_menu_item'>Delete account</MenuItem>
            </Menu>
        </div>
    );
}