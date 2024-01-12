'use client'
import Image from 'next/image';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRef, useState } from 'react';

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
        <div className="home_container py-3 px-5 d-flex flex-column">
            <div className="container_arrow d-flex justify-content-between align-items-center">
                <h2 className="titles_homepage m-0">Music Categories</h2>

                <div className="d-flex align-items-center justify-content-center">
                    <Image src='/images/svg/left_arrow.svg' alt="arrow" className={`arrow left_arrow ${isBeginning ? 'disabled' : ''}`} width={10} height={10} onClick={handlePrev} />
                    <Image src='/images/svg/right_arrow.svg' alt="arrow" className={`arrow right_arrow ${isEnd ? 'disabled' : ''}`} width={10} height={10} onClick={handleNext} style={{ opacity: isEnd ? 0.5 : 1 }} />
                </div>


                {/* <div className="d-flex align-items-center justify-content-center">

            <button className='left_arrow arrow_btn' onClick={handlePrev} >
              <FcPrevious />
            </button>

            <button className='right_arrow arrow_btn' onClick={handleNext}>
              <FcNext />
            </button>

          </div> */}

                <Link href='/music-categories'>View all</Link>
            </div>

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
                className='mySwiper w-100 swiper-container-1'
            >

                {
                    music_cat.map((item, index) => (
                        <SwiperSlide key={item.id} virtualIndex={index}>
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

export default Music_categories