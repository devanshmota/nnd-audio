'use client'
import { getMusicCategoryApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"
import { ClipLoader } from "react-spinners"
import Nodataviewall from "./Nodataviewall"
import Link from "next/link"


const MusicCategoryallCard = () => {

    const { language } = useSelector((state) => state.language)
    const [musicCategory, setMusicCategory] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getMusicCategoryApi({
            limit: null,
            order: "asc",
            onSuccess: (res) => {
                if (res.data) {
                    setMusicCategory(res.data)
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
        <>
            <div className="container">
                <div className="row">
                    {isLoading &&
                        <div className='d-flex align-items-center justify-content-center py-2'>
                            <ClipLoader color="#ffffff" />
                        </div>
                    }
                    {
                        musicCategory.length > 0 && musicCategory.map((item) => (
                            <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center mus_cat_container">
                                <Link href={`/music-categories-all/${item.id}`} className="card-container text-white">
                                    <Image src={item.image} alt={item.eng_name} className="rounded" width={200} height={200} />
                                    <h6 className="m-0 align-self-baseline">{GetLanguage(language, item)}</h6>
                                </Link>
                            </div>
                        ))
                    }

                </div>
                {
                    !isLoading && musicCategory.length === 0 && <Nodataviewall />
                }
            </div>
        </>
    );
}

export default MusicCategoryallCard