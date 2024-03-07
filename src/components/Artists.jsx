'use client'
import Image from 'next/image';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useRef, useState } from 'react';
import CategoryHeader from './CategoryHeader';

import { useSelector } from 'react-redux';
import GetLanguage from './GetLanguage';
import GetFirstWord from './GetFirstWord';

const Artists = ({ artists }) => {
    const { language } = useSelector((state) => state.language)
    const artistRef = useRef();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);


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
                isShow={true}
            />
            <Swiper
                ref={artistRef}
                slidesPerView={7}
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
                    artists.slice(0, 10).map((item, index) => (
                        <SwiperSlide key={item.id} virtualIndex={index} className='d-flex align-items-center justify-content-sm-start justify-content-center'>
                            <Link href={`/artists-all/${item.id}`} className="d-flex flex-column gap-2 align-items-center justify-content-between">
                                <Image src={item.image} objectFit='cover' className='rounded mw-100' alt={item.eng_name} width={159.429} height={159.429} />
                                <h5 className='m-0 text-center'>
                                    {GetFirstWord(GetLanguage(language, item))}
                                </h5>
                            </Link>
                        </SwiperSlide>
                    ))
                }

            </Swiper>


        </div>
    )
}

export default Artists