'use client'
import Image from 'next/image';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRef, useState } from 'react';



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
        <div className="div_container p-3 d-flex flex-column">
            <div className="container_arrow d-flex justify-content-between align-items-center">
                <h2 className="titles_homepage m-0 ">Radio 24 X 7</h2>
                <div className="d-flex align-items-center justify-content-center">
                    <Image src='/images/svg/left_arrow.svg' alt="arrow" className={`arrow left_arrow ${isBeginning ? 'disabled' : ''}`} width={10} height={10} onClick={handlePrev} />
                    <Image src='/images/svg/right_arrow.svg' alt="arrow" className={`arrow right_arrow ${isEnd ? 'disabled' : ''}`} width={10} height={10} onClick={handleNext} />
                </div>
                <Link href='/music-categories'>View all</Link>
            </div>

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
                className="mySwiper w-100"
            >

                {
                    radio24x7.map((item, index) => (
                        <SwiperSlide key={item} virtualIndex={index}>
                            <div className="d-flex flex-column gap-2 mt-4 align-items-center justify-content-between">
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