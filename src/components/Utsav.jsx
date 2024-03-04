'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { getUtsavApi } from '@/redux/actions/Campaign';
import { ClipLoader } from 'react-spinners';
import GetFirstWord from './GetFirstWord';
import GetLanguage from './GetLanguage';
import { useSelector } from 'react-redux';


const Utsav = () => {

    const { language } = useSelector((state) => state.language)
    const [utsav, setUtsav] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        getUtsavApi({

            limit: 6,
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

    if (utsav.length === 0) {
        return null
    }

    return (
        <div className="container">

            <div className="container_arrow container-fluid p-0">
                <div className="row my-4">
                    <div className="col-sm-12 d-flex justify-content-between align-items-center">
                        <h2 className="titles_homepage m-0">Utsav</h2>
                        <Link href="/utsav-all" className='view_all'>View all</Link>
                    </div>
                </div>
                <div className="row utsav_gap" id='utsav_images' >

                    {isLoading &&
                        <div className='d-flex align-items-center justify-content-center py-2'>
                            <ClipLoader color="#ffffff" />
                        </div>
                    }

                    {
                        utsav.length > 0 && (
                            utsav.map((item, index) => (
                                <Link href={`/utsav-all/${item.id}`} key={index} className="col-12 col-md-4">
                                    <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
                                        <img src={item.image} className="utshv_img" alt={`utsav_img_${index}`} />
                                        <h5 className='m-0 text-center'>
                                            {GetFirstWord(GetLanguage(language, item))}
                                        </h5>
                                    </div>
                                </Link>
                            ))
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Utsav