'use client'
import Image from 'next/image';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import CategoryHeader from './CategoryHeader';
import { getArtistsApi } from '@/redux/actions/Campaign';
import { useSelector } from 'react-redux';
import GetLanguage from './GetLanguage';
import GetFirstWord from './GetFirstWord';

// const artists = [
//     { id: 1, title: 'Aditya', img: '/r_music1.jpg' },
//     { id: 2, title: 'Aditya', img: '/r_music1.jpg' },
//     { id: 3, title: 'Aditya', img: '/r_music1.jpg' },
//     { id: 4, title: 'Aditya', img: '/r_music1.jpg' },
//     { id: 5, title: 'Aditya', img: '/r_music1.jpg' },
//     { id: 6, title: 'Aditya', img: '/r_music1.jpg' },
//     { id: 7, title: 'Aditya', img: '/r_music1.jpg' },
// ]

const Artists = () => {
    const { language } = useSelector((state) => state.language)
    const artistRef = useRef();
    const [artists, setArtists] = useState([])
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {

        getArtistsApi({

            limit: 10,
            order: "asc",

            onSuccess: (res) => {
                if (res.data) {
                    setArtists(res.data)
                }

            },
            onError: (e) => {
                console.log(e)
            }
        })
    }, [])


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

            {
                artists.length > 0 && (
                    <>
                        <CategoryHeader
                            title="Artists"
                            onPrev={handlePrev}
                            onNext={handleNext}
                            isBeginning={isBeginning}
                            isEnd={isEnd}
                            link="/artists-all"
                        />


                        <Swiper
                            ref={artistRef}
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
                                artists.map((item, index) => (
                                    <SwiperSlide key={item.id} virtualIndex={index}>
                                        <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
                                            <Image src={item.image} className="kirtan_img" alt={item.eng_name} width={252} height={252} />
                                            <h5 className='m-0 text-center'>
                                                <Link href='/kirtan'>{GetFirstWord(GetLanguage(language, item))}</Link>
                                            </h5>
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

export default Artists