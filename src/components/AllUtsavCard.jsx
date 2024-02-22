'use client'
import { getUtsavApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"
import { ClipLoader } from "react-spinners"
import Link from "next/link"
import Nodataviewall from "./Nodataviewall"


const AllUtsavCard = () => {

    const { language } = useSelector((state) => state.language)
    const [utsav, setUtsav] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUtsavApi({

            limit: null,
            order: "asc",

            onSuccess: (res) => {
                setUtsav(res.data)
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
                {utsav.length > 0 && utsav.map((item) => (
                    <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center mus_cat_container">
                        <Link href={`/utsav-all/${item.id}`} className="card-container text-white">
                            <Image src={item.image} alt={item.eng_name} className="rounded" width={200} height={200} />
                            <h6 className="m-0 align-self-baseline">{GetLanguage(language, item)}</h6>
                        </Link>
                    </div>
                ))
                }

            </div>
            {
                !isLoading && utsav.length === 0 && <Nodataviewall />
            }
        </div>
    )
}

export default AllUtsavCard