'use client'
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react"
import { FaPlay } from "react-icons/fa";
import PlayVideoModal from "./PlayVideoModal";

const OneYoutubePlaylist = ({ playlistid }) => {

    const [playlistData, setPlaylistData] = useState([])
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
    const [videoDetails, setVideoDetails] = useState(null)

    useEffect(() => {

        const fetchPlaylistData = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistid.slug}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
                );

                setPlaylistData(response.data.items)

            } catch (error) {
                console.error('Error fetching playlist data:', error);
            }
        };

        fetchPlaylistData();

    }, [])

    const handlePlay = (videodetails) => {
        setVideoDetails(videodetails)
        setIsVideoModalOpen(true)
    }

    return (
        <>
            <div className="container text-white">
                <div className="row">
                    {
                        playlistData.map((item, index) => (
                            <div key={index} className="col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center mus_cat_container">
                                <div className="card-container text-white">

                                    <div className="image-container">
                                        <Image src={item?.snippet?.thumbnails?.medium?.url} alt={item.snippet.title} className="rounded opacity-50" width={200} height={200} />
                                        <div className="overlay" onClick={() => handlePlay(item)}>
                                            <FaPlay className="play-button" />
                                        </div>
                                    </div>
                                    <h6 className="m-0 align-self-baseline ply-item-title">{item.snippet.title}</h6>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <PlayVideoModal show={isVideoModalOpen} onHide={() => setIsVideoModalOpen(false)} videoDetails={videoDetails} />
        </>
    )
}

export default OneYoutubePlaylist