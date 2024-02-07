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


const LatestRelease = () => {

    const { language } = useSelector((state) => state.language)
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
        <div className="container d-flex flex-column">

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
                                    slidesPerView: 4,
                                },
                                1200: {
                                    slidesPerView: 5,
                                },
                            }}
                            className='mySwiper w-100'
                        >
                            <div className="container d-flex flex-column" >
                                {
                                    latestRelease.map((item, index) => (

                                        <SwiperSlide key={item.id} virtualIndex={index}>
                                            <div className="d-flex flex-column flex-lg-row gap-2 justify-content-center align-items-center">
                                                <Image src={item.album.image} className="release_img" alt={item.eng_title} width={100} height={100} />

                                                <h6 className='m-0 ellipsis-container text-white'>
                                                        {GetLanguage(language, item)}
                                                </h6>

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