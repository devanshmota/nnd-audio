'use client'
import Image from 'next/image';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import CategoryHeader from './CategoryHeader';
import { getHomeApi } from '@/redux/actions/Campaign';
import { useSelector } from 'react-redux';
import GetLanguage from './GetLanguage';
import { ClipLoader } from 'react-spinners';
import Nodatafound from './Nodatafound';


const LatestRelease = () => {

    const { language } = useSelector((state) => state.language)
    const lastestReleaseRef = useRef();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [latestRelease, setLatestReleases] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getHomeApi({
            is_guest: 1,
            onSuccess: (res) => {
                if (res.latest_releases) {
                    setLatestReleases(res.latest_releases)
                }
                setIsLoading(false)
            },
            onError: (e) => {
                console.log(e)
                setIsLoading(false)
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

    if (latestRelease.length === 0) {
        return null
    }

    return (
        <div className="container d-flex flex-column">
            <CategoryHeader
                title="Latest Albums"
                onPrev={handlePrev}
                onNext={handleNext}
                isBeginning={isBeginning}
                isEnd={isEnd}
                link="/latest-releases-all"
            />

            {isLoading &&
                <div className='d-flex align-items-center justify-content-center py-2'>
                    <ClipLoader color="#ffffff" />
                </div>
            }

            {
                latestRelease.length > 0 && (
                    <>

                        <Swiper
                            ref={lastestReleaseRef}
                            slidesPerView={4}
                            spaceBetween={30}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay, Pagination]}
                            pagination={{
                                clickable: true
                            }}
                            navigation={false}
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
                                    slidesPerView: 3,
                                },
                                1200: {
                                    slidesPerView: 4,
                                },
                            }}
                            className='mySwiper w-100'
                        >
                            <div className="container d-flex flex-column" >
                                {
                                    latestRelease.map((item, index) => (

                                        <SwiperSlide key={item.id} virtualIndex={index}>
                                            <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                                                <Image src={item.album.image} className="rounded mw-100 object-fit-cover" alt={item.eng_title} width={301.5} height={200} />

                                                <h5 className='m-0 ellipsis-container text-white'>
                                                    {GetLanguage(language, item)}
                                                </h5>

                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </div>
                        </Swiper>
                    </>
                )

            }
        </div >
    )
}

export default LatestRelease