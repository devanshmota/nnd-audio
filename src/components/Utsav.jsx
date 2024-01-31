'use client'
import Image from 'next/image';
import Link from 'next/link'
import img1 from '../../public/utshav_img_1.jpeg'
import { useEffect, useState } from 'react';
import { getUtsavApi } from '@/redux/actions/Campaign';

// const utshav = [
//     { id: 1, img: '/jula_shree_ghanshyam.jpeg', title: 'Hindola Kirtan' },
//     { id: 2, img: '/r_music1.jpg', title: 'Hindola Kirtan' },
//     { id: 3, img: '/r_music1.jpg', title: 'Hindola Kirtan' },
//     { id: 4, img: '/r_music1.jpg', title: 'Hindola Kirtan' },
//     { id: 5, img: '/r_music1.jpg', title: 'Hindola Kirtan' },
//     { id: 6, img: '/r_music1.jpg', title: 'Hindola Kirtan' },
//     { id: 7, img: '/r_music1.jpg', title: 'Hindola Kirtan' },
// ]

const Utsav = () => {

    const [utsav, setUtsav] = useState([])

    useEffect(() => {

        getUtsavApi({

            limit: 6,
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
        <div className="container">
            <div className="container_arrow container-fluid p-0">
                <div className="row my-4">
                    <div className="col-sm-12 d-flex justify-content-between align-items-center">
                        <h2 className="titles_homepage m-0">Utsav</h2>
                        <Link href="/utsav-all" className='view_all'>View all</Link>
                    </div>
                </div>
                <div className="row" id='utsav_images' >

                    {
                        utsav.length > 0 && (
                            <>
                                <div className="col-12 col-12 col-lg-3">
                                    <img src={utsav[0].image} className="utshv_img" alt='utsav_img' />
                                </div>
                                <div className="col-12 col-lg-6">
                                    <div className="row mb-3" id='utsav_images'>
                                        <div className="col-lg-4 col-md-6">
                                            <img src={utsav[1].image} className="utshv_img" alt='utsav_img' />
                                        </div>
                                        <div className="col-lg-8 col-md-6">
                                            <img src={utsav[2].image} className="utshv_img" alt='utsav_img' />
                                        </div>
                                    </div>
                                    <div className="row" id='utsav_images'>
                                        <div className="col-lg-8 col-md-6">
                                            <img src={utsav[3].image} className="utshv_img" alt='utsav_img' />
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <img src={utsav[4].image} className="utshv_img" alt='utsav_img' />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-3">
                                    <img src={utsav[5].image} className="utshv_img" alt='utsav_img' />
                                </div>
                            </>
                        )
                    }


                </div>
            </div>
        </div>
    )
}

export default Utsav