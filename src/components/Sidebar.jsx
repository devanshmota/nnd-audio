'use client'
import React, { useState } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import nndLogo from '../../public/images/nnd_logo.png'
import nndWeb from '../../public/images/nnd_web.png'
import Image from 'next/image';

const Sidebar = () => {

    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

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
                        </div>
                    </div >
                </div >
            </div >
        </>
    )
}

export default Sidebar
