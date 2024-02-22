'use client'
import { getHomeApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"
import { ClipLoader } from "react-spinners"
import Nodataviewall from "./Nodataviewall"


const LatestReleasesAllCards = () => {

    const { language } = useSelector((state) => state.language)
    const [latestRelease, setLatestReleases] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getHomeApi({
            is_guest: 1,
            onSuccess: (res) => {
                if (res.latest_releases) {
                    setLatestReleases(res.latest_releases)

                }
                setIsLoading(false)
            },
            onError: (e) => {
                console.log(e)
                setIsLoading(false)
            }
        })
    }, [])

    return (
        <div className="container">
            <div className="row">
                {isLoading &&
                    <div className='d-flex align-items-center justify-content-center py-2'>
                        <ClipLoader color="#ffffff" />
                    </div>
                }
                {
                    latestRelease.length > 0 && latestRelease.map((item, index) => (
                        <>
                            <div className="col-xxl-3 col-xl-4 col-sm-6 d-flex mus_cat_container">
                                <div className="lat-rel-card-container text-white">
                                    <h1 className="m-0">{`${(index + 1).toString().padStart(2, '0')}`}</h1>
                                    <Image src={item.album.image} alt={item.eng_title} className="rounded" width={80} height={80} />
                                    <h6 className="m-0">{GetLanguage(language, item)}</h6>
                                </div>
                            </div>
                        </>
                    ))
                }

            </div>
            {
                !isLoading && latestRelease.length === 0 && <Nodataviewall />
            }
        </div>
    )
}

export default LatestReleasesAllCards