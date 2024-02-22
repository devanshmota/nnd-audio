'use client'
import { getArtistsApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import GetLanguage from "./GetLanguage"
import { useSelector } from "react-redux"
import { ClipLoader } from "react-spinners"
import Link from "next/link"
import Nodataviewall from "./Nodataviewall"


const AllAritistsCard = () => {
    const { language } = useSelector((state) => state.language)
    const [artists, setArtists] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getArtistsApi({

            limit: null,
            order: "asc",

            onSuccess: (res) => {
                if (res.data) {
                    setArtists(res.data)
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
                {artists.length > 0 && artists.map((item) => (
                    <Link href={`/artists-all/${item.id}`} key={item.id} className="col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center mus_cat_container">
                        <div className="card-container text-white">
                            <Image src={item.image} alt={item.eng_name} className="rounded" width={200} height={200} />
                            <h6 className="m-0 align-self-baseline">{GetLanguage(language, item)}</h6>
                        </div>
                    </Link>
                ))

                }

            </div>
            {
                !isLoading && artists.length === 0 && <Nodataviewall />
            }
        </div>
    )
}

export default AllAritistsCard