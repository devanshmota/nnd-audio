'use client'
import { getYoutubeLiveVideosApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"

const GetYoutubeLiveVideos = () => {

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

    return (
        <div className="container text-white">
            <div className="row">
                {
                    youtubeLiveVidoes.length > 0 && youtubeLiveVidoes.map((item, index) => (
                        <div key={index} className="col-12 col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center mus_cat_container">
                            <div className="card-container_youtube text-white">
                                <Image src='/nnd_cd.png' alt='playlist' className="rounded" width={200} height={200} />
                                <h6 className="m-0">{item.title}</h6>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default GetYoutubeLiveVideos