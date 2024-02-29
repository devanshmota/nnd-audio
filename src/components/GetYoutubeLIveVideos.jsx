'use client'
import { getYoutubeLiveVideosApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaPlay } from "react-icons/fa"
import PlayLiveVideoModal from "./PlayLiveVideoModal"
import { getDecryptedText } from "@/decryption/decryption"

const GetYoutubeLiveVideos = () => {

    const [videoDetails, setVideoDetails] = useState({
        videoid: '',
        title: ''
    })
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
    const [youtubeLiveVidoes, setYoutubeLiveVidoes] = useState([])
    useEffect(() => {
        getYoutubeLiveVideosApi({
            onSuccess: (res) => {
                if (res.data) {
                    setYoutubeLiveVidoes(res.data)
                }
            },
            onError: (e) => {
                console.log(e)
            }
        })
    }, [])

    const handlePlay = (item) => {
        setVideoDetails({
            videoid: item.video_id,
            title: item.title
        })
        setIsVideoModalOpen(true)
    }

    return (
        <>
            <div className="container text-white">
                <div className="row">
                    {
                        youtubeLiveVidoes.length > 0 && youtubeLiveVidoes.map((item, index) => (
                            <div key={index} className="col-12 col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center mus_cat_container">
                                <div className="card-container_youtube text-white">

                                    <div className="image-container">
                                        <Image src={`https://img.youtube.com/vi/${getDecryptedText(item.video_id)}/mqdefault.jpg`} alt='playlist' className="rounded opacity-50" width={200} height={200} />
                                        <div className="overlay" onClick={() => handlePlay(item)} >
                                            <FaPlay className="play-button" />
                                        </div>
                                    </div>

                                    <h6 className="m-0">{item.title}</h6>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <PlayLiveVideoModal show={isVideoModalOpen} onHide={() => setIsVideoModalOpen(false)} videoDetails={videoDetails} />
        </>
    )
}

export default GetYoutubeLiveVideos