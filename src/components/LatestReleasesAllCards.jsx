'use client'
import { getHomeApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"


const LatestReleasesAllCards = () => {
    const [latestRelease, setLatestReleases] = useState([])

    useEffect(() => {

        getHomeApi({
            is_guest: 1,
            onSuccess: (res) => {
                if (res.latest_releases) {
                    setLatestReleases(res.latest_releases)
                }
            },
            onError: (e) => {
                console.log(e)
            }
        })
    }, [])

    return (
        <div className="row">

            {
                latestRelease.length > 0 && latestRelease.map((item, index) => (
                    <>
                        <div className="col-xxl-3 col-xl-4 col-sm-6 d-flex justify-content-center mus_cat_container">
                            <div className="lat-rel-card-container text-white">
                                <h1 className="m-0">{`${(index + 1).toString().padStart(2, '0')}`}</h1>
                                <Image src={item.album.image} alt={item.eng_title} width={80} height={80} />
                                <h6 className="m-0">{item.eng_title}</h6>
                            </div>
                        </div>
                    </>
                ))
            }


        </div>
    )
}

export default LatestReleasesAllCards