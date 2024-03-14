'use client'
import Image from 'next/image';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useRef, useState } from 'react';
import CategoryHeader from './CategoryHeader';
import { useDispatch, useSelector } from 'react-redux';
import GetLanguage from './GetLanguage';
import { setBreadcrumbCategory } from '@/redux/reducer/CachedataSlice';




const Music_categories = ({musicCategory}) => {

    const dispatch = useDispatch()
    const { language } = useSelector((state) => state.language)
    const musicRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
   

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
    const handleBreadcrumbCategory = (id) => {
        const currentCategory = musicCategory.find((item) => item.id === id)
        dispatch(setBreadcrumbCategory(currentCategory))
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
                isShow={musicCategory.length > 6}
            />

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
                                    slidesPerView: 2
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
                                musicCategory.slice(0, 10).map((item, index) => (
                                    <SwiperSlide key={item.id} virtualIndex={index} className='d-flex align-items-center justify-content-sm-start justify-content-center'>
                                        <Link href={`/music-categories-all/${item.id}`} onClick={() => handleBreadcrumbCategory(item.id)} className="w-100 d-flex flex-column gap-2 align-items-center justify-content-between">
                                            <Image src={item.image} className='rounded-4 w-100 object-fit-cover aspctRatio_music' alt={item.eng_name} layout='intrinsic' width={159.429} height={159.429} />
                                            <h5 className='m-0 text-center text-white title_rcnt_plyd'>
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