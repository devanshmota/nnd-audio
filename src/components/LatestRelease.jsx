'use client'
import Image from 'next/image';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import CategoryHeader from './CategoryHeader';
import { getHomeApi } from '@/redux/actions/Campaign';

// const latest_rel = [
//     { id: 1, title: 'naval preetam ghanshyam', time: '5 mins ago', img: '/r_music1.jpg' },
//     { id: 2, title: 'naval preetam ghanshyam', time: '5 mins ago', img: '/r_music1.jpg' },
//     { id: 3, title: 'naval preetam ghanshyam', time: '5 mins ago', img: '/r_music1.jpg' },
//     { id: 4, title: 'naval preetam ghanshyam', time: '5 mins ago', img: '/r_music1.jpg' },
//     { id: 5, title: 'naval preetam ghanshyam', time: '5 mins ago', img: '/r_music1.jpg' },
//     { id: 6, title: 'naval preetam ghanshyam', time: '5 mins ago', img: '/r_music1.jpg' },
//     { id: 7, title: 'naval preetam ghanshyam', time: '5 mins ago', img: '/r_music1.jpg' },
// ]

const LatestRelease = () => {
    const lastestReleaseRef = useRef();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [latestRelease, setLatestReleases] = useState([])


    useEffect(() => {

        getHomeApi({
            is_guest: 1,
            onSuccess: (res) => {
                if (res.latest_releases) {
                    setLatestReleases(res.latest_releases)
                }
            },
            onError: (e) => {
                console.log(e)
            }
        })
    }, [])





    const handlePrev = () => {
        if (lastestReleaseRef.current && !isBeginning) {
            lastestReleaseRef.current.swiper.slidePrev();
        }
        console.log(isBeginning)
    };

    const handleNext = () => {
        if (lastestReleaseRef.current && !isEnd) {
            lastestReleaseRef.current.swiper.slideNext();
        }
        console.log(isBeginning)
    };


    return (
        <div className="div_container d-flex flex-column">

            {
                latestRelease.length > 0 && (
                    <>
                        <CategoryHeader
                            title="Latest Releases"
                            onPrev={handlePrev}
                            onNext={handleNext}
                            isBeginning={isBeginning}
                            isEnd={isEnd}
                            link="/latest-releases-all"
                        />

                        <Swiper
                            ref={lastestReleaseRef}
                            slidesPerView={5}
                            spaceBetween={30}
                            modules={[Pagination, Navigation]}
                            pagination={{
                                clickable: true
                            }}
                            navigation={false}
                            autoplay={{
                                delay: 3000, 
                                disableOnInteraction: true  , 
                            }}
                            onSlideChange={(swiper) => {
                                setIsBeginning(swiper.isBeginning);
                                setIsEnd(swiper.isEnd);
                            }}
                            onReachBeginning={() => {
                                setIsBeginning(true);
                            }}
                            onReachEnd={() => {
                                setIsEnd(true);
                            }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                },
                                576: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                992: {
                                    slidesPerView: 4,
                                },
                                1200: {
                                    slidesPerView: 5,
                                },
                            }}
                            className='mySwiper w-100'
                        >
                            <div className="div_container py-3 px-5 d-flex flex-row gap-5 " >
                                {
                                    latestRelease.map((item, index) => (

                                        <SwiperSlide key={item.id} virtualIndex={index}>
                                            <div className="d-flex gap-2 justify-content-center align-items-center">
                                                <Image src={item.album.image} className="release_img" alt={item.eng_title} width={100} height={100} />
                                                <div className="d-flex flex-column justify-content-center">
                                                    <h6>
                                                        <Link href='/kirtan'>{item.eng_title}</Link>
                                                    </h6>
                                                    <p className="titles_homepage m-0 small text-secondary">{item.title}</p>
                                                </div>

                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </div>
                        </Swiper>
                    </>
                )
            }


        </div>
    )
}

export default LatestRelease