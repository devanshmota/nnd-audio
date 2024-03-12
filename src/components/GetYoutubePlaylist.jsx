'use client'
import { getDecryptedText } from "@/decryption/decryption"
import { getYoutubePlaylistApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import BreadCrumb from "./BreadCrumb"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";


const GetYoutubePlaylist = () => {

    const [youtubePlaylist, setYoutubePlaylist] = useState([])
    useEffect(() => {
        getYoutubePlaylistApi({
            onSuccess: (res) => {
                if (res.data) {
                    setYoutubePlaylist(res.data)
                }
            },
            onError: (e) => {
                console.log(e)
            }
        })
    }, [])

    return (
        <div className="container text-white">
            <div className="row mt-4">
            <BreadCrumb title={t('Youtube Playlist')}/>
                {
                    youtubePlaylist.length > 0 && youtubePlaylist.map((item, index) => (
                        <div key={index} className="col-12 col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center mt-4">
                            <Link href={`/youtube-playlist/${item.playlist_id}`} className="card-container_youtube text-white">
                                <Image src='/nnd_cd.png' alt='playlist' className="rounded spin-on-hover" width={200} height={200} />
                                <h6 className="m-0">{item.title}</h6>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default withTranslation()(GetYoutubePlaylist)