'use client'

import { getRadioApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"

const AllRadioCard = () => {
    const { language } = useSelector((state) => state.language)
    const [radio, setRadio] = useState([])
    useEffect(() => {

        getRadioApi({

            limit: null,
            order: "asc",

            onSuccess: (res) => {
                if (res.data) {
                    setRadio(res.data)
                }

            },
            onError: (e) => {
                console.log(e)
            }
        })
    }, [])
  return (
      <div className="row">
          {radio.length > 0 && radio.map((item) => (
              <div key={item.id} className="col-xl-3 col-xxl-2 col-lg-4 col-sm-6 d-flex justify-content-center mus_cat_container">
                  <div className="card-container text-white">
                      <Image src={item.image} alt={item.eng_name} width={200} height={200} />
                      <h6 className="m-0 align-self-baseline">{GetLanguage(language, item)}</h6>
                  </div>
              </div>
          ))}
      </div>
  )
}

export default AllRadioCard