'use client'
import { getLyricistsApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"
import { ClipLoader } from "react-spinners"
import Link from "next/link"
import Nodataviewall from "./Nodataviewall"


const AllLyricistsCard = () => {

    const { language } = useSelector((state) => state.language)
    const [lyricists, setLyricists] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getLyricistsApi({
            limit: null,
            order: "asc",
            onSuccess: (res) => {
                if (res.data) {
                    setLyricists(res.data)
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
                {lyricists.length > 0 && lyricists.map((item) => (
                    <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center mus_cat_container">
                        <Link href={`/lyricists-all/${item.id}`} className="lyricits-container text-white">
                            <Image src={item.image} alt={item.eng_name} width={200} height={200} />
                            <h6 className="m-0">{GetLanguage(language, item)}</h6>
                        </Link>
                    </div>
                ))
                }

            </div>
            {
                !isLoading && lyricists.length === 0 && <Nodataviewall />
            }
        </div>
    )
}

export default AllLyricistsCard