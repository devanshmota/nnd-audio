'use client'
import React from 'react'
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import homeIcon from '../../public/homeIcon.svg'
import recentPlayed from '../../public/Recent_Played_icon.svg'
import youtubePlaylist from '../../public/Youtube Playlist_icon.svg'
import termCondition from '../../public/term_and_condition.svg'
import youtubeLiveVideos from '../../public/Youtube Live_videos.svg'
import privacyPolicy from '../../public/privacy_policy_icon.svg'
import aboutUs from '../../public/about_us.svg'
import playlist from '../../public/mainPlaylist_icon_.svg'



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
                                            <Image src={homeIcon} alt='home' width={25} height={22} />
                                        </span>
                                        <span className="nav_text">
                                            {t('Home')}
                                        </span>
                                    </Link>
                                </li>

                                {
                                    token && <li >
                                        <Link href='/recently-played'>

                                            <span className="nav_icon">
                                                <Image src={recentPlayed} alt='recently played' width={25} height={25} />
                                            </span>
                                            <span className="nav_text">
                                                {t('Recently Played')}
                                            </span>
                                        </Link>
                                    </li>
                                }
                                {
                                    token && <li>
                                        <Link href='/playlist'>
                                            <span className="nav_icon">
                                                <Image src={playlist} alt='' width={25} height={25} />
                                            </span>
                                            <span className="nav_text">
                                                {t('Playlist')}
                                            </span>
                                        </Link>
                                    </li>
                                }

                                <hr className='sidebar_border' />

                                <li>
                                    <Link href='/youtube-live-videos/0'>

                                        <span className="nav_icon">
                                            <Image src={youtubeLiveVideos} alt='' width={25} height={25} />
                                        </span>
                                        <span className="nav_text">
                                            {/* history */}
                                            {t('Youtube Live Videos')}
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/youtube-playlist'>
                                        <span className="nav_icon">
                                            <Image src={youtubePlaylist} alt='' width={25} height={25} />
                                        </span>
                                        <span className="nav_text">

                                            {t('Youtube Playlist')}
                                        </span>
                                    </Link>
                                </li>
                                <hr className='sidebar_border'/>
                                <li>
                                    <Link href='/term-conditions'>
                                        <span className="nav_icon">
                                            <Image src={termCondition} alt='' width={25} height={25} />
                                        </span>
                                        <span className="nav_text">

                                            {t('Term & Conditions')}
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy-policy" title="Purchased">
                                        <span className="nav_icon">
                                            <Image src={privacyPolicy} alt='' width={25} height={25} />
                                        </span>
                                        <span className="nav_text">
                                            {t('Privacy Policy')}
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/about-us'>
                                        <span className="nav_icon">
                                            <Image src={aboutUs} alt='' width={25} height={25} />
                                        </span>
                                        <span className="nav_text">
                                            {t('About Us')}
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
