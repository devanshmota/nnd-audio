'use client'
import { getRadioApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"
import { ClipLoader } from "react-spinners"
import Nodataviewall from "./Nodataviewall"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";

const AllRadioCard = () => {
    const { language } = useSelector((state) => state.language)
    const [radio, setRadio] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getRadioApi({
            limit: null,
            order: "asc",

            onSuccess: (res) => {
                if (res.data) {
                    setRadio(res.data)
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
                {radio.length > 0 && radio.map((item) => (
                    <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center mus_cat_container">
                        <div className="card-container text-white">
                            <Image src={item.image} alt={item.eng_name} className="rounded" width={200} height={200} />
                            <h6 className="m-0 align-self-baseline">{GetLanguage(language, item)}</h6>
                        </div>
                    </div>
                ))

                }
                
            </div>
            {
                !isLoading && radio.length === 0 && <Nodataviewall />
            }
        </div>
    )
}

export default withTranslation()(AllRadioCard)