'use client'
import Image from 'next/image';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import CategoryHeader from './CategoryHeader';
import { getArtistsApi } from '@/redux/actions/Campaign';
import { useSelector } from 'react-redux';
import GetLanguage from './GetLanguage';
import GetFirstWord from './GetFirstWord';
import { ClipLoader } from 'react-spinners';
import Nodatafound from './Nodatafound';

const Artists = () => {
    const { language } = useSelector((state) => state.language)
    const artistRef = useRef();
    const [artists, setArtists] = useState([])
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getArtistsApi({
            limit: 10,
            order: "asc",
            onSuccess: (res) => {
                if (res.data) {
                    setArtists(res.data)
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
        if (artistRef.current && !isBeginning) {
            artistRef.current.swiper.slidePrev();
        }

    };

    const handleNext = () => {
        if (artistRef.current && !isEnd) {
            artistRef.current.swiper.slideNext();
        }
    };

    return (
        <div className="container d-flex flex-column">
            <CategoryHeader
                title="Artists"
                onPrev={handlePrev}
                onNext={handleNext}
                isBeginning={isBeginning}
                isEnd={isEnd}
                link="/artists-all"
            />
            {isLoading &&
                <div className='d-flex align-items-center justify-content-center py-2'>
                    <ClipLoader color="#ffffff" />
                </div>
            }
            {
                artists.length > 0 && (
                    <>
                        <Swiper
                            ref={artistRef}
                            slidesPerView={5}
                            loop={false}
                            spaceBetween={30}
                            freeMode={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay, Pagination]}
                            pagination={{
                                clickable: true
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
                            {
                                artists.map((item, index) => (
                                    <SwiperSlide key={item.id} virtualIndex={index}>
                                        <Link href={`/artists-all/${item.id}`} className="d-flex flex-column gap-2 align-items-center justify-content-between">
                                            <Image src={item.image} className="kirtan_img" alt={item.eng_name} width={252} height={252} />
                                            <h5 className='m-0 text-center'>
                                                {GetFirstWord(GetLanguage(language, item))}
                                            </h5>
                                        </Link>
                                    </SwiperSlide>
                                ))
                            }

                        </Swiper>
                    </>
                )
            }
            {
                !isLoading && artists.length === 0 && <Nodatafound />
            }
        </div>
    )
}

export default Artists