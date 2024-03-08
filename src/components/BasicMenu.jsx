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
import toast from 'react-hot-toast';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { t } from 'i18next';
import { withTranslation } from "react-i18next";


export function BasicMenu() {

    const dispatch = useDispatch()
    const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { users } = useSelector((state) => state.users)


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        router.push('/profile')
    }


    const handleLogout = async () => {
        handleClose()
        Swal.fire({
            title: t("Are you sure?"),
            text: t("You won't be able to revert this!"),
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
                                title: t("Logout!"),
                                text: t("Logged out successfully"),
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
            title: t("Delete Account?"),
            text: t("You will permanently lose your Notification, Profile, & Favorite"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        })
            .then((result) => {
                if (result.isConfirmed) {


                    try {
                        const user = auth.currentUser;
                        if (user) {
                            user.delete().then(() => {
                                console.log('Account deleted successfully');
                            });
                        } else {
                            toast.error(t('No user found'));
                        }
                    } catch (error) {
                        toast.error(error.message);
                    }
                    deleteAccountApi({
                        onSuccess: (res) => {
                            if (res.error === false) {
                                Swal.fire({
                                    title: t("Deleted!"),
                                    text: t(res.message),
                                    icon: "success"
                                });
                                dispatch(setUsers({}));
                                router.push('/');
                            }
                        },
                        onError: (e) => {
                            console.log(e);
                            toast.error(res.error);
                        }
                    });
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
                endIcon={<ExpandMoreIcon />}
                className='usersName'
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
                className='child_menu'
            >
                <MenuItem onClick={handleProfile} className='basic_menu_item'>{t('Profile')}</MenuItem>
                <MenuItem onClick={handleLogout} className='basic_menu_item' >{t('Logout')}</MenuItem>
                <MenuItem onClick={handleDeleteAccount} className='basic_menu_item'>{t('Delete account')}</MenuItem>
            </Menu>
        </div>
    );
}
export default withTranslation()(BasicMenu)