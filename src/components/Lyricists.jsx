'use client'
import Image from 'next/image';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useRef, useState } from 'react';

const lyricists = [
    { id: 1, title: 'Devanand', img: '/r_music1.jpg' },
    { id: 2, title: 'Devanand', img: '/r_music1.jpg' },
    { id: 3, title: 'Devanand', img: '/r_music1.jpg' },
    { id: 4, title: 'Devanand', img: '/r_music1.jpg' },
    { id: 5, title: 'Devanand', img: '/r_music1.jpg' },
    { id: 6, title: 'Devanand', img: '/r_music1.jpg' },
    { id: 7, title: 'Devanand', img: '/r_music1.jpg' },
]

const Lyricists = () => {

    const lyricistsRef = useRef();

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

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


    return (
        <div className="div_container p-3 d-flex flex-column">
            <div className="container_arrow d-flex justify-content-between align-items-center">
                <h2 className="titles_homepage m-0">Lyricists</h2>
                <div className="d-flex align-items-center justify-content-center">
                    <Image src='/images/svg/left_arrow.svg' alt="arrow" className={`arrow left_arrow ${isBeginning ? 'disabled' : ''}`} width={10} height={10} onClick={handlePrev} />
                    <Image src='/images/svg/right_arrow.svg' alt="arrow" className={`arrow right_arrow ${isEnd ? 'disabled' : ''}`} width={10} height={10} onClick={handleNext} />
                </div>

                <Link href='/music-categories'>View all</Link>
            </div>

            <Swiper
                ref={lyricistsRef}
                slidesPerView={5}
                loop={false}
                spaceBetween={30}
                freeMode={true}
                modules={[Pagination]}
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
                className='mySwiper w-100'
            >

                {
                    lyricists.map((item, index) => (
                        <SwiperSlide key={item.id} virtualIndex={index}>
                            <div className="mt-4 d-flex flex-column  gap-3 ">
                                <Image src={item.img} width={100} height={300} className="card-img-top artist_img" alt={item.title} />
                                <h5 className="titles_homepage text-center ">{item.title}</h5>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default Lyricists