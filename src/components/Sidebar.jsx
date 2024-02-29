'use client'
import React, { useState } from 'react'
import nndLogo from '../../public/images/nnd_logo.png'
import nndWeb from '../../public/images/nnd_web.png'
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { MdHome, MdPrivacyTip } from "react-icons/md";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { FaHeart } from 'react-icons/fa';


const Sidebar = ({ open }) => {

    const users = useSelector((state) => state.users)
    const token = users?.users?.token

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

                        <div className="ms_nav_wrapper">
                            <ul>
                                <li >
                                    <Link href='/'>

                                        <span className="nav_icon">
                                            <MdHome className='home_icon_sidebar' />
                                        </span>
                                        <span className="nav_text">
                                            Home
                                        </span>
                                    </Link>
                                </li>

                                {
                                    token && <li >
                                        <Link href='/recently-played-all'>

                                            <span className="nav_icon">
                                                <Image src='/Recent_Played.svg' alt='' width={25} height={25} />
                                            </span>
                                            <span className="nav_text">
                                                Recently Played
                                            </span>
                                        </Link>
                                    </li>
                                }


                                <li>
                                    <Link href='/about-us'>
                                        <span className="nav_icon">
                                            <Image src='/About_us.svg' alt='' width={25} height={25} />
                                        </span>
                                        <span className="nav_text">
                                            about us
                                        </span>
                                    </Link>

                                </li>

                                {
                                    token && <li>
                                        <Link href='/downloads'>
                                            <span className="nav_icon">
                                                <PiDownloadSimpleBold className='icon_sidebar' />
                                            </span>
                                            <span className="nav_text">
                                                downloads
                                            </span>
                                        </Link>
                                    </li>
                                }


                                <li><a href="" title="Purchased">
                                    <span className="nav_icon">
                                        <MdPrivacyTip className='icon_sidebar' />
                                    </span>
                                    <span className="nav_text">
                                        privacy policy
                                    </span>
                                </a>
                                </li>

                                {
                                    token && <li><a href="" title="Favourites">
                                        <span className="nav_icon">
                                            <FaHeart className='icon_sidebar' />
                                        </span>
                                        <span className="nav_text">
                                            favourites
                                        </span>
                                    </a>
                                    </li>
                                }
                                <li>
                                    <Link href='/youtube-live-videos'>

                                        <span className="nav_icon">
                                            <Image src='/Youtube_live_videos.svg' alt='' width={25} height={25} />
                                        </span>
                                        <span className="nav_text">
                                            {/* history */}
                                            youtube live videos
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/playlist'>
                                        <span className="nav_icon">
                                            <Image src='/Youtube_Playlist.svg' alt='' width={25} height={25} />
                                        </span>
                                        <span className="nav_text">
                                            featured playlist
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/youtube-playlist'>
                                        <span className="nav_icon">
                                            <Image src='/Youtube_Playlist.svg' alt='' width={25} height={25} />
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
