'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { getUtsavApi } from '@/redux/actions/Campaign';
import { ClipLoader } from 'react-spinners';
import Nodatafound from './Nodatafound';


const Utsav = () => {

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

    return (
        <div className="container">

            <div className="container_arrow container-fluid p-0">
                <div className="row my-4">
                    <div className="col-sm-12 d-flex justify-content-between align-items-center">
                        <h2 className="titles_homepage m-0">Utsav</h2>
                        <Link href="/utsav-all" className='view_all'>View all</Link>
                    </div>
                </div>
                <div className="row" id='utsav_images' >

                    {isLoading &&
                        <div className='d-flex align-items-center justify-content-center py-2'>
                            <ClipLoader color="#ffffff" />
                        </div>
                    }

                    {
                        utsav.length > 0 && (
                            utsav.map((item, index) => (
                                <Link href={`/utsav-all/${item.id}`} key={index} className="col-12 col-md-4">
                                    <img src={item.image} className="utshv_img" alt={`utsav_img_${index}`} />
                                </Link>
                            ))
                        )
                    }
                    {
                        !isLoading && utsav.length === 0 && <Nodatafound />
                    }
                </div>
            </div>
        </div>
    )
}

export default Utsav