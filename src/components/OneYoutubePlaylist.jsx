'use client'
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react"
import BreadCrumb from "./BreadCrumb";
import { t } from 'i18next';
import { withTranslation } from "react-i18next";


const OneYoutubePlaylist = ({ playlistid }) => {

    const [playlistData, setPlaylistData] = useState([])
    const [InitialTrack, setInitialTrack] = useState(null)

    useEffect(() => {
        const fetchPlaylistData = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistid.slug}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
                );

                setPlaylistData(response?.data?.items)
                setInitialTrack(response?.data?.items[0])

            } catch (error) {
                console.error('Error fetching playlist data:', error);
            }
        };
        fetchPlaylistData();
    }, [])

    const handlePlay = (item) => {
        setInitialTrack(item)
    }

    return (
        <>
            <div className="container text-white mt-4">
                <div className="row gy-3 yt-heigth">
                    <BreadCrumb title={t('Youtube Playlist')} category={t('Videos')} />
                    <div className="col-lg-8 d-flex flex-column gap-3">
                        <iframe
                            className="youtube_video"
                            src={`https://www.youtube.com/embed/${InitialTrack?.snippet?.resourceId?.videoId}`}
                            title={InitialTrack?.snippet?.title}
                            allowFullScreen
                        ></iframe>
                        <h5 className="m-0">{InitialTrack?.snippet?.title}</h5>
                    </div>
                    <div className="col-lg-4 h-100 overflow-y-scroll">
                        <div className="d-flex flex-column justify-content-center gap-1">
                            {
                                playlistData.map((item, index) => (
                                    <div key={index} className={`d-flex align-items-center gap-2 p-2 rounded yt_playlist_item ${InitialTrack === item ? 'yt_playlist_item_active' : ''}`} onClick={() => handlePlay(item)}>
                                        <Image src={item?.snippet?.thumbnails?.medium?.url} className="rounded mw-100 object-fit-cover" alt={item.snippet.title} width={100} height={60} onError={(e) => {
                                            e.target.src = '/Audio_hedphone.svg'
                                        }} />
                                        <p className="ply-item-title">{item.snippet.title}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withTranslation()(OneYoutubePlaylist)