'use client'
import Image from 'next/image';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRef, useState } from 'react';

const latest_rel = [
    { id: 1, title: 'naval preetam ghanshyam', time: '5 mins ago', img: '/r_music1.jpg' },
    { id: 2, title: 'naval preetam ghanshyam', time: '5 mins ago', img: '/r_music1.jpg' },
    { id: 3, title: 'naval preetam ghanshyam', time: '5 mins ago', img: '/r_music1.jpg' },
    { id: 4, title: 'naval preetam ghanshyam', time: '5 mins ago', img: '/r_music1.jpg' },
    { id: 5, title: 'naval preetam ghanshyam', time: '5 mins ago', img: '/r_music1.jpg' },
    { id: 6, title: 'naval preetam ghanshyam', time: '5 mins ago', img: '/r_music1.jpg' },
    { id: 7, title: 'naval preetam ghanshyam', time: '5 mins ago', img: '/r_music1.jpg' },
]

const LatestRelease = () => {
    const lastestReleaseRef = useRef();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

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
        <div className="div_container p-3 d-flex flex-column">
            <div className="container_arrow d-flex justify-content-between align-items-center">
                <h2 className="titles_homepage m-0">Latest Releases</h2>
                <div className="d-flex align-items-center justify-content-center">

                    <Image className={`arrow left_arrow ${isBeginning ? 'disabled' : ''}`} src='/images/svg/left_arrow.svg' alt="arrow" width={10} height={10} onClick={handlePrev} />

                    <Image className={`arrow right_arrow ${isEnd ? 'disabled' : ''}`} src='/images/svg/right_arrow.svg' alt="arrow" width={10} height={10} onClick={handleNext} />


                </div>
                <Link href='/releases' className="" >View all</Link>
            </div>
            <Swiper
                ref={lastestReleaseRef}
                slidesPerView={5}
                // loop={false}
                spaceBetween={30}
                // freeMode={true}
                modules={[Pagination, Navigation]}
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
                className='mySwiper w-100'
            >
                <div className="div_container py-3 px-5 d-flex flex-row gap-5 " >
                    {
                        latest_rel.map((item, index) => (

                            <SwiperSlide key={item} virtualIndex={index}>


                                <div className="d-flex gap-3 mt-4 justify-content-center align-items-center">
                                    <Image src={item.img} className="kirtan_img" alt={item.title} width={50} height={50} />
                                    <div className="d-flex flex-column justify-content-center">
                                        <h6>
                                            <Link href='/kirtan'>{item.title}</Link>
                                        </h6>
                                        <p className="titles_homepage m-0 small text-secondary">{item.time}</p>
                                    </div>

                                </div>
                            </SwiperSlide>
                        ))
                    }
                </div>
            </Swiper>
        </div>
    )
}

export default LatestRelease