'use client'
import Image from 'next/image';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import CategoryHeader from './CategoryHeader';
import { getRadioApi } from '@/redux/actions/Campaign';
import { useSelector } from 'react-redux';
import GetLanguage from './GetLanguage';
import { ClipLoader } from 'react-spinners';
import Nodatafound from './Nodatafound';
import GetFirstWord from './GetFirstWord';


const Radio = () => {


    const users = useSelector((state) => state.users)
    const { language } = useSelector((state) => state.language)
    const radioRef = useRef();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [radio, setRadio] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getRadioApi({

            limit: 10,
            order: "asc",

            onSuccess: (res) => {
                if (res.data) {
                    setRadio(res.data)
                }
                setIsLoading(false)
            },
            onError: (e) => {
                console.log(e)
                setIsLoading(false)
            }
        })
    }, [])

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
    const token = users?.users?.token

    if(radio.length === 0 || !token){
        return null
    }
    return (
        <div className="container d-flex flex-column">
            <CategoryHeader
                title="Radio 24x7"
                onPrev={handlePrev}
                onNext={handleNext}
                isBeginning={isBeginning}
                isEnd={isEnd}
                link="/radio-all"
            />
            {isLoading &&
                <div className='d-flex align-items-center justify-content-center py-2'>
                    <ClipLoader color="#ffffff" />
                </div>
            }
            {
                radio.length > 0 && (
                    <>
                        <Swiper
                            ref={radioRef}
                            slidesPerView={7}
                            spaceBetween={30}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={false}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay, Pagination]}
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
                            className="mySwiper w-100"
                        >

                            {
                                radio.map((item, index) => (
                                    <SwiperSlide key={item.id} virtualIndex={index} className='d-flex align-items-center justify-content-sm-start justify-content-center'>
                                        <div className="d-flex flex-column gap-3 align-items-center mw-100">
                                            <Image src={item.image} className="card-img-top artist_img" alt={item.eng_title} width={150} height={150} />
                                            <h5 className="text-white text-center m-0">
                                                {GetFirstWord(GetLanguage(language, item))}
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

export default Radio