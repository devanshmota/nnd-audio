'use client'
import Image from 'next/image';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRef, useState } from 'react';
import CategoryHeader from './CategoryHeader';

const music_cat = [
    {
        id: 1,
        title: 'Kirtan',
        img: '/kirtan.jpeg'
    },
    {
        id: 2,
        title: 'Katha',
        img: '/katha.jpeg'
    },
    {
        id: 3,
        title: 'Audiobook',
        img: '/audiobook.jpeg'
    },
    {
        id: 4,
        title: 'Kirtan',
        img: '/kirtan.jpeg'
    },
    {
        id: 5,
        title: 'Kirtan',
        img: '/kirtan.jpeg'
    },
    {
        id: 6,
        title: 'Kirtan',
        img: '/kirtan.jpeg'
    },
    {
        id: 7,
        title: 'Kirtan',
        img: '/kirtan.jpeg'
    },

]

const Music_categories = () => {
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


    return (

        <div className="home_container d-flex flex-column">

            <CategoryHeader
                title="Music Categories"
                onPrev={handlePrev}
                onNext={handleNext}
                isBeginning={isBeginning}
                isEnd={isEnd}
                link="/music-categories"
            />

            <Swiper
                ref={musicRef}
                slidesPerView={5}
                spaceBetween={30}
                modules={[Pagination, Navigation]}
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
                        slidesPerView: 2
                    },
                    768: {
                        slidesPerView: 3
                    },
                    992: {
                        slidesPerView: 4
                    },
                    1200: {
                        slidesPerView: 5
                    },
                }}
                className='mySwiper w-100'
            >

                {
                    music_cat.map((item, index) => (
                        <SwiperSlide key={item.id} virtualIndex={index}>
                            <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
                                <Image src={item.img} className="kirtan_img" alt={item.title} width={252} height={252} />
                                <h5 className='m-0' >
                                    <Link href='/kirtan'>{item.title}</Link>
                                </h5>
                            </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    )
}

export default Music_categories