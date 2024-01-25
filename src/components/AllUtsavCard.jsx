'use client'
import { getUtsavApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const AllUtsavCard = () => {

    const { language } = useSelector((state) => state.language)
    const [utsav, setUtsav] = useState([])

    useEffect(() => {

        getUtsavApi({

            limit: null,
            order: "asc",

            onSuccess: (res) => {
                setUtsav(res.data)
            },
            onError: (e) => {
                console.log(e)
            }
        })


    }, [])

  return (
      <div className="row">
          {utsav.length > 0 && utsav.map((item) => (
              <div key={item.id} className="col-xl-3 col-xxl-2 col-lg-4 col-sm-6 d-flex justify-content-center mus_cat_container">
                  <div className="card-container text-white">
                      <Image src={item.image} alt={item.eng_name} width={200} height={200} />
                      <h6 className="m-0 align-self-baseline">{language === 'Gujarati' ? item.guj_name : item.eng_name}</h6>
                  </div>
              </div>
          ))}
      </div>
  )
}

export default AllUtsavCard