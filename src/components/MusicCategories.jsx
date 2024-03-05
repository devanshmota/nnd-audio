'use client'
import Image from 'next/image';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import CategoryHeader from './CategoryHeader';
import { getMusicCategoryApi } from '@/redux/actions/Campaign';
import { useSelector } from 'react-redux';
import GetLanguage from './GetLanguage';
import { ClipLoader } from 'react-spinners';


const Music_categories = () => {
    const { language } = useSelector((state) => state.language)
    const musicRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [musicCategory, setMusicCategory] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getMusicCategoryApi({
            limit: 10,
            order: "asc",
            onSuccess: (res) => {
                if (res.data) {
                    setMusicCategory(res.data)
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
        if (musicRef.current && !isBeginning) {
            musicRef.current.swiper.slidePrev();
        }

    };

    const handleNext = () => {
        if (musicRef.current && !isEnd) {
            musicRef.current.swiper.slideNext();
        }
    };

    if (musicCategory.length === 0) {
        return null
    }

    return (
        <div className="container d-flex flex-column">
            <CategoryHeader
                title="Music Categories"
                onPrev={handlePrev}
                onNext={handleNext}
                isBeginning={isBeginning}
                isEnd={isEnd}
                link="/music-categories-all"
                isShow={false}
            />
            {isLoading &&
                <div className='d-flex align-items-center justify-content-center py-2'>
                    <ClipLoader color="#ffffff" />
                </div>
            }
            {
                musicCategory.length > 0 && (
                    <>

                        <Swiper
                            ref={musicRef}
                            slidesPerView={7}
                            spaceBetween={30}
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
                                    slidesPerView: 1
                                },
                                576: {
                                    slidesPerView: 3
                                },
                                768: {
                                    slidesPerView: 4
                                },
                                992: {
                                    slidesPerView: 6
                                },
                                1200: {
                                    slidesPerView: 7
                                },
                            }}
                            className='mySwiper w-100'
                        >

                            {
                                musicCategory.map((item, index) => (
                                    <SwiperSlide key={item.id} virtualIndex={index} className='d-flex align-items-center justify-content-sm-start justify-content-center'>
                                        <Link href={`/music-categories-all/${item.id}`} className="w-100 d-flex flex-column gap-2 align-items-center justify-content-between">
                                            <Image src={item.image} className='rounded mw-100 object-fit-cover' alt={item.eng_name} width={159.429} height={159.429} />
                                            <h5 className='m-0 text-center text-white'>
                                                {GetLanguage(language, item)}
                                            </h5>
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

export default Music_categories