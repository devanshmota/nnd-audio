'use client'
import Image from 'next/image';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import CategoryHeader from './CategoryHeader';
import { getLyricistsApi } from '@/redux/actions/Campaign';
import { useSelector } from 'react-redux';
import GetLanguage from './GetLanguage';
import GetFirstWord from './GetFirstWord';

// const lyricists = [
//     { id: 1, title: 'Devanand', img: '/r_music1.jpg' },
//     { id: 2, title: 'Devanand', img: '/r_music1.jpg' },
//     { id: 3, title: 'Devanand', img: '/r_music1.jpg' },
//     { id: 4, title: 'Devanand', img: '/r_music1.jpg' },
//     { id: 5, title: 'Devanand', img: '/r_music1.jpg' },
//     { id: 6, title: 'Devanand', img: '/r_music1.jpg' },
//     { id: 7, title: 'Devanand', img: '/r_music1.jpg' },
// ]

const Lyricists = () => {

    const { language } = useSelector((state) => state.language)
    const lyricistsRef = useRef();
    const [lyricists, setLyricists] = useState([])
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        getLyricistsApi({
            limit: 10,
            order: "asc",
            onSuccess: (res) => {
                if (res.data) {
                    setLyricists(res.data)
                }
            },
            onError: (e) => {
                console.log(e)
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


    return (
        <div className="container d-flex flex-column">

            {
                lyricists.length > 0 && (
                    <>
                        <CategoryHeader
                            title="Lyricists"
                            onPrev={handlePrev}
                            onNext={handleNext}
                            isBeginning={isBeginning}
                            isEnd={isEnd}
                            link="/lyricists-all"
                        />

                        <Swiper
                            ref={lyricistsRef}
                            slidesPerView={5}
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
                            className='mySwiper w-100'
                        >

                            {
                                lyricists.map((item, index) => (
                                    <SwiperSlide key={item.id} virtualIndex={index}>
                                        <div className="d-flex flex-column gap-3 align-items-center">
                                            <img src={item.image} width={0} height={0} className="card-img-top artist_img" alt={item.eng_name} />
                                            <h5 className="titles_homepage text-center m-0">{GetFirstWord(GetLanguage(language, item))}</h5>
                                        </div>
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