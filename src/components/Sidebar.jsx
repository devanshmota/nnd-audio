'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { MdHome, MdPrivacyTip } from "react-icons/md";
import { FaHeart } from 'react-icons/fa';
import { t } from 'i18next';
import { withTranslation } from "react-i18next";


const Sidebar = ({ open }) => {

    const users = useSelector((state) => state.users)
    const token = users?.users?.token

    return (
        <>
            {/* <!---Side Menu Start---> */}
            <div className="ms_main_wrapper">
                <div className={`ms_sidemenu_wrapper ${open ? 'open_menu' : ''}`}>
                   
                    <div className="ms_sidemenu_inner">

                        <div className="ms_nav_wrapper">
                            <ul>
                                <li >
                                    <Link href='/'>

                                        <span className="nav_icon">
                                            <MdHome className='home_icon_sidebar' />
                                        </span>
                                        <span className="nav_text">
                                            {t('Home')}
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
                                                {t('Recently Played')}
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
                                            {t('About Us')}
                                        </span>
                                    </Link>

                                </li>




                                <li><a href="" title="Purchased">
                                    <span className="nav_icon">
                                        <MdPrivacyTip className='icon_sidebar' />
                                    </span>
                                    <span className="nav_text">
                                        {t('Privacy Policy')}
                                    </span>
                                </a>
                                </li>

                                {
                                    token && <li><a href="" title="Favourites">
                                        <span className="nav_icon">
                                            <FaHeart className='icon_sidebar' />
                                        </span>
                                        <span className="nav_text">
                                            {t('Favourites')}
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
                                            {t('Youtube Live Videos')}
                                        </span>
                                    </Link>
                                </li>
                                {
                                    token && <li>
                                        <Link href='/playlist'>
                                            <span className="nav_icon">
                                                <Image src='/Youtube_Playlist.svg' alt='' width={25} height={25} />
                                            </span>
                                            <span className="nav_text">
                                                {t('Featured Playlist')}
                                            </span>
                                        </Link>
                                    </li>
                                }

                                <li>
                                    <Link href='/youtube-playlist'>
                                        <span className="nav_icon">
                                            <Image src='/Youtube_Playlist.svg' alt='' width={25} height={25} />
                                        </span>
                                        <span className="nav_text">
                                            {/* create playlist */}
                                            {t('Youtube Playlist')}
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

export default withTranslation()(Sidebar)
