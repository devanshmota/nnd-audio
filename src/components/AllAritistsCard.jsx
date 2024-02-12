'use client'
import { getArtistsApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import GetLanguage from "./GetLanguage"
import { useSelector } from "react-redux"


const AllAritistsCard = () => {
    const { language } = useSelector((state) => state.language)
    const [artists, setArtists] = useState([])
    useEffect(() => {

        getArtistsApi({

            limit: null,
            order: "asc",

            onSuccess: (res) => {
                if (res.data) {
                    setArtists(res.data)
                }

            },
            onError: (e) => {
                console.log(e)
            }
        })
    }, [])


    return (
        <div className="row">
            {artists.length > 0 && artists.map((item) => (
                <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center mus_cat_container">
                    <div className="card-container text-white">
                        <Image src={item.image} alt={item.eng_name} className="rounded" width={200} height={200} />
                        <h6 className="m-0 align-self-baseline">{GetLanguage(language,item)}</h6>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllAritistsCard