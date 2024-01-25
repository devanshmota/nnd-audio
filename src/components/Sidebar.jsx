'use client'
import React, { useState } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import nndLogo from '../../public/images/nnd_logo.png'
import nndWeb from '../../public/images/nnd_web.png'
import Image from 'next/image';
import LoginModel from './LoginModel';
import RegisterModal from './RegisterModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './Firebase';
import Swal from 'sweetalert2';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';
import { setLanguage } from '@/redux/reducer/LanguageSlice';

const Sidebar = () => {

    const { language } = useSelector((state) => state.language)
    const users = useSelector((state) => state.users)
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
    const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false)

    const dispatch = useDispatch()

    const handleLoginClick = () => {
        setIsLoginModalVisible(true);
        setMenuOpen(false)
        setIsRegisterModalVisible(false);
    };

    const handleRegisterClick = () => {
        setIsRegisterModalVisible(true);
        setIsLoginModalVisible(false);
    };

    const handleLoginSignup = (e) => {
        e.preventDefault();
        handleLoginClick();
    };

    const handleForgotPasswordClick = () => {
        setIsForgotPasswordVisible(true)
        setIsLoginModalVisible(false);
    }

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        setMenuOpen(false)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then((result) => {
            if (result.isConfirmed) {
                auth.signOut();
                setIsLoggedIn(false);
                Swal.fire({
                    title: "Logout!",
                    text: "Logged out successfully",
                    icon: "success"
                });
            }
        });

    };

    const token = users?.users?.token

    const handleLanguageChange = (eventKey) => {
        dispatch(setLanguage(eventKey))
    }

    return (
        <>
            {/* <!---Side Menu Start---> */}
            <div className="ms_main_wrapper">
                <div className={`ms_sidemenu_wrapper ${isMenuOpen ? 'open_menu' : ''}`}>
                    <div className={isMenuOpen ? 'ms_nav_close02' : 'ms_nav_close'} onClick={toggleMenu}>
                        <div>
                            {isMenuOpen ? (

                                <FaAngleLeft size={20} className='custom_close_icon' />
                            ) : (

                                <FaAngleRight size={20} className='custom_close_icon' />
                            )}
                        </div>
                    </div>
                    <div className="ms_sidemenu_inner">
                        <div className="ms_logo_inner">
                            <div className="ms_logo">
                                <Image width={100} height={100} src={nndLogo} alt="" className="img-fluid" />
                            </div>
                            <div className="ms_logo_open">
                                <Image width={100} height={100} src={nndWeb} alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className="ms_nav_wrapper">
                            <ul>
                                <li >
                                    <a href="/" title="Discover">
                                        <span className="nav_icon">
                                            <span className="icon icon_discover"></span>
                                        </span>
                                        <span className="nav_text">
                                            discover
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/" title="Albums">
                                        <span className="nav_icon">
                                            <span className="icon icon_albums"></span>
                                        </span>
                                        <span className="nav_text">
                                            albums
                                        </span>
                                    </a>
                                </li>

                            </ul>
                            <ul className="nav_downloads">
                                <li><a href="" title="Downloads">
                                    <span className="nav_icon">
                                        <span className="icon icon_download"></span>
                                    </span>
                                    <span className="nav_text">
                                        downloads
                                    </span>
                                </a>
                                </li>
                                <li><a href="" title="Purchased">
                                    <span className="nav_icon">
                                        <span className="icon icon_purchased"></span>
                                    </span>
                                    <span className="nav_text">
                                        purchased
                                    </span>
                                </a>
                                </li>
                                <li><a href="" title="Favourites">
                                    <span className="nav_icon">
                                        <span className="icon icon_favourite"></span>
                                    </span>
                                    <span className="nav_text">
                                        favourites
                                    </span>
                                </a>
                                </li>
                                <li><a href="" title="History">
                                    <span className="nav_icon">
                                        <span className="icon icon_history"></span>
                                    </span>
                                    <span className="nav_text">
                                        history
                                    </span>
                                </a>
                                </li>
                            </ul>
                            <ul className="nav_playlist">
                                <li><a href="" title="Featured Playlist">
                                    <span className="nav_icon">
                                        <span className="icon icon_fe_playlist"></span>
                                    </span>
                                    <span className="nav_text">
                                        featured playlist
                                    </span>
                                </a>
                                </li>
                                <li><a href="" title="Create Playlist">
                                    <span className="nav_icon">
                                        <span className="icon icon_c_playlist"></span>
                                    </span>
                                    <span className="nav_text">
                                        create playlist
                                    </span>
                                </a>
                                </li>
                            </ul>
                            <ul className='btn_ul'>
                                <li>
                                    {
                                        token ?
                                            (
                                                <Dropdown onSelect={handleLogout}>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic-button" className="dropdown_toggle">
                                                        Hello {users?.firstName}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item eventKey="logout">Logout</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            ) :
                                            (
                                                <button className="header_login_btn" onClick={handleLoginSignup}>Login/Sign Up</button>
                                            )
                                    }


                                </li>



                            </ul>
                            <ul className='btn_ul'>
                                <li>
                                    <DropdownButton id="dropdown-basic-button" title={language} onSelect={handleLanguageChange} >
                                        <Dropdown.Item eventKey="English" >English</Dropdown.Item>
                                        <Dropdown.Item eventKey="Gujarati">Gujarati</Dropdown.Item>
                                    </DropdownButton>
                                </li>
                            </ul>
                        </div>
                    </div >
                </div >
            </div >

            <LoginModel show={isLoginModalVisible} onHide={() => setIsLoginModalVisible(false)} onRegisterClick={handleRegisterClick} onForgotPasswordClick={handleForgotPasswordClick} />

            <RegisterModal show={isRegisterModalVisible} onHide={() => setIsRegisterModalVisible(false)} onLoginClick={handleLoginClick} />

            <ForgotPasswordModal show={isForgotPasswordVisible} onHide={() => setIsForgotPasswordVisible(false)} />

        </>
    )
}

export default Sidebar
