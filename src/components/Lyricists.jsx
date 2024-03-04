'use client'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import CategoryHeader from './CategoryHeader';
import { getLyricistsApi } from '@/redux/actions/Campaign';
import { useSelector } from 'react-redux';
import GetLanguage from './GetLanguage';
import GetFirstWord from './GetFirstWord';
import { ClipLoader } from 'react-spinners';
import Nodatafound from './Nodatafound';
import Image from 'next/image';

const Lyricists = () => {

    const { language } = useSelector((state) => state.language)
    const lyricistsRef = useRef();
    const [lyricists, setLyricists] = useState([])
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getLyricistsApi({
            limit: 10,
            order: "asc",
            onSuccess: (res) => {
                if (res.data) {
                    setLyricists(res.data)
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
        if (lyricistsRef.current && !isBeginning) {
            lyricistsRef.current.swiper.slidePrev();
        }

    };

    const handleNext = () => {
        if (lyricistsRef.current && !isEnd) {
            lyricistsRef.current.swiper.slideNext();
        }
    };
    if (lyricists.length === 0) {
        return null
    }

    return (
        <div className="container d-flex flex-column">
            <CategoryHeader
                title="Lyricists"
                onPrev={handlePrev}
                onNext={handleNext}
                isBeginning={isBeginning}
                isEnd={isEnd}
                link="/lyricists-all"
            />
            {isLoading &&
                <div className='d-flex align-items-center justify-content-center py-2'>
                    <ClipLoader color="#ffffff" />
                </div>
            }
            {
                lyricists.length > 0 && (
                    <>
                        <Swiper
                            ref={lyricistsRef}
                            slidesPerView={7}
                            loop={false}
                            spaceBetween={30}
                            freeMode={true}
                            // autoplay={{
                            //     delay: 2500,
                            //     disableOnInteraction: false,
                            // }}
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
                                    slidesPerView: 3,
                                },
                                768: {
                                    slidesPerView: 4,
                                },
                                992: {
                                    slidesPerView: 6,
                                },
                                1200: {
                                    slidesPerView: 7,
                                },
                            }}
                            className='mySwiper w-100'
                        >

                            {
                                lyricists.map((item, index) => (
                                    <SwiperSlide key={item.id} virtualIndex={index} className='d-flex align-items-center justify-content-sm-start justify-content-center'>
                                        <Link href={`/lyricists-all/${item.id}`} className="d-flex flex-column gap-3 align-items-center mw-100">
                                            <Image src={item.image} width={150} height={150} className="card-img-top artist_img" alt={item.eng_name} />
                                            <h5 className="text-white text-center m-0">{GetFirstWord(GetLanguage(language, item))}</h5>
                                        </Link>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </>
                )
            }
        </div>
    )
}

export default Lyricists