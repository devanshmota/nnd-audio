'use client'
import React, { useState } from 'react'
import nndLogo from '../../public/images/nnd_logo.png'
import nndWeb from '../../public/images/nnd_web.png'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

const Sidebar = ({ open }) => {
    const dispatch = useDispatch()
    return (
        <>
            {/* <!---Side Menu Start---> */}
            <div className="ms_main_wrapper">
                <div className={`ms_sidemenu_wrapper ${open ? 'open_menu' : ''}`}>
                    {/* <div className={isMenuOpen ? 'ms_nav_close02' : 'ms_nav_close'} onClick={toggleMenu}>
                        <div>
                            {isMenuOpen ? (

                                <FaAngleLeft size={20} className='custom_close_icon' />
                            ) : (

                                <FaAngleRight size={20} className='custom_close_icon' />
                            )}
                        </div>
                    </div> */}
                    <div className="ms_sidemenu_inner">
                        <div className="ms_logo_inner">
                            {
                                open ?
                                    (
                                        <div className="ms_logo_open">
                                            <Image width={100} height={100} src={nndWeb} alt="" className="img-fluid" />
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="ms_logo">
                                            <Image width={0} height={0} src={nndLogo} alt="" className="img-fluid" />
                                        </div>
                                    )
                            }
                        </div>
                        <div className="ms_nav_wrapper">
                            <ul>
                                <li >
                                    <Link href='/'>

                                        <span className="nav_icon">
                                            <span className="icon icon_discover"></span>
                                        </span>
                                        <span className="nav_text">
                                            discover
                                        </span>

                                    </Link>
                                </li>
                                <li>
                                    <Link href='/about-us'>
                                        <span className="nav_icon">
                                            <span className="icon icon_albums"></span>
                                            {/* <BiCommentDetail className='about_us_icon' /> */}
                                        </span>
                                        <span className="nav_text">
                                            about us
                                        </span>
                                    </Link>

                                </li>

                            </ul>
                            <ul className="nav_downloads">
                                <li>
                                    <Link href='/downloads'>
                                        <span className="nav_icon">
                                            <span className="icon icon_download"></span>
                                        </span>
                                        <span className="nav_text">
                                            downloads
                                        </span>
                                    </Link>
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
                                <li>
                                    <Link href='/youtube-live-videos'>

                                        <span className="nav_icon">
                                            <span className="icon icon_history"></span>
                                        </span>
                                        <span className="nav_text">
                                            {/* history */}
                                            youtube live videos
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                            <ul className="nav_playlist">
                                <li>
                                    <Link href='/playlist'>
                                        <span className="nav_icon">
                                            <span className="icon icon_fe_playlist"></span>
                                        </span>
                                        <span className="nav_text">
                                            featured playlist
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/youtube-playlist'>
                                        <span className="nav_icon">
                                            <span className="icon icon_c_playlist"></span>
                                        </span>
                                        <span className="nav_text">
                                            {/* create playlist */}
                                            youtube playlist
                                        </span>
                                    </Link>
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
