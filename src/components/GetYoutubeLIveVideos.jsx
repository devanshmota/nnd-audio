'use client'
import { getYoutubeLiveVideosApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getDecryptedText } from "@/decryption/decryption"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import BreadCrumb from "./BreadCrumb"

const GetYoutubeLiveVideos = () => {

    const [playlistData, setPlaylistData] = useState([])
    const [InitialTrack, setInitialTrack] = useState(null)

    useEffect(() => {
        getYoutubeLiveVideosApi({
            onSuccess: (res) => {
                if (res.data) {
                    setPlaylistData(res?.data)
                    setInitialTrack(res?.data[0])
                }
            },
            onError: (e) => {
                console.log(e)
            }
        })
    }, [])

    const handlePlay = (item) => {
        setInitialTrack(item)
    }

    return (
        <>
            <div className="container text-white mt-4">
                <div className="row gy-3 yt-heigth">
                    <BreadCrumb title={t('Youtube Live Videos')} />
                    <div className="col-lg-8 d-flex flex-column gap-3">
                        <iframe
                            className="youtube_video"
                            src={`https://www.youtube.com/embed/${InitialTrack?.video_id}`}
                            title={InitialTrack?.title}
                            allowFullScreen
                        ></iframe>
                        <h5 className="m-0">{InitialTrack?.title}</h5>
                    </div>
                    <div className="col-lg-4 h-100 overflow-y-scroll">
                        <div className="d-flex flex-column justify-content-center gap-2">
                            {
                                playlistData.map((item, index) => (
                                    <div key={index} className={`d-flex align-items-center gap-3 p-3 rounded yt_playlist_item ${InitialTrack === item ? 'yt_playlist_item_active' : ''}`} onClick={() => handlePlay(item)}>
                                        <Image src={`https://img.youtube.com/vi/${getDecryptedText(item.video_id)}/mqdefault.jpg`} className="rounded mw-100 object-fit-cover" alt={item.title} width={100} height={60} onError={(e) => {
                                            e.target.src = '/Audio_hedphone.svg'
                                        }} />
                                        <p className="ply-item-title">{item.title}</p>
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

export default withTranslation()(GetYoutubeLiveVideos)