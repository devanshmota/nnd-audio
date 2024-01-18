'use client'
import Image from 'next/image';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRef, useState } from 'react';
import CategoryHeader from './CategoryHeader';



const radio24x7 = [
    { id: 1, title: 'test', img: '/r_music1.jpg' },
    { id: 2, title: 'test', img: '/r_music1.jpg' },
    { id: 3, title: 'test', img: '/r_music1.jpg' },
    { id: 4, title: 'test', img: '/r_music1.jpg' },
    { id: 5, title: 'test', img: '/r_music1.jpg' },
    { id: 6, title: 'test', img: '/r_music1.jpg' },
    { id: 7, title: 'test', img: '/r_music1.jpg' }
]

const Radio = () => {

    const radioRef = useRef();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const handlePrev = () => {
        if (radioRef.current && !isBeginning) {
            radioRef.current.swiper.slidePrev();
        }

    };

    const handleNext = () => {
        if (radioRef.current && !isEnd) {
            radioRef.current.swiper.slideNext();
        }

    };



    return (
        <div className="div_container d-flex flex-column">
            <CategoryHeader
                title="Radio 24x7"
                onPrev={handlePrev}
                onNext={handleNext}
                isBeginning={isBeginning}
                isEnd={isEnd}
                link="/radio"
            />

            <Swiper
                ref={radioRef}
                slidesPerView={5}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                modules={[Navigation]}
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
                className="mySwiper w-100"
            >

                {
                    radio24x7.map((item, index) => (
                        <SwiperSlide key={item.id} virtualIndex={index}>
                            <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
                                <Image src={item.img} className="kirtan_img" alt={item.title} width={252} height={252} />
                                <h5>
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

export default Radio