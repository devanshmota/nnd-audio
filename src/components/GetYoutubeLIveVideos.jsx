'use client'
import { getYoutubeLiveVideosApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getDecryptedText } from "@/decryption/decryption"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import BreadCrumb from "./BreadCrumb"
import noImg from '../../public/noImageFound.svg'

const GetYoutubeLiveVideos = ({ youtubeLiveid }) => {

    const [playlistData, setPlaylistData] = useState([])
    const [InitialTrack, setInitialTrack] = useState(null)

    useEffect(() => {

        getYoutubeLiveVideosApi({
            onSuccess: (res) => {
                if (res.data) {
                    setPlaylistData(res?.data)
                    const foundTrack = res.data.find((item) => item.id === Number(youtubeLiveid.slug));
                    setInitialTrack(foundTrack);
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
            <div className="container text-white mt-5">
                <div className="row mb-5">
                    <BreadCrumb title={t('Youtube Live Videos')} />
                </div>
                <div className="row gy-3 yt-heigth">

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
                        <div className="d-flex flex-column justify-content-center gap-1">
                            {
                                playlistData.map((item, index) => (
                                    <div key={index} className={`d-flex align-items-center gap-2 p-2 rounded yt_playlist_item ${InitialTrack === item ? 'yt_playlist_item_active' : ''}`} onClick={() => handlePlay(item)}>
                                        <Image src={`https://img.youtube.com/vi/${getDecryptedText(item.video_id)}/mqdefault.jpg` || noImg} className="rounded mw-100 object-fit-cover yt_live_aspect" alt={item.title} width={100} height={60} />
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