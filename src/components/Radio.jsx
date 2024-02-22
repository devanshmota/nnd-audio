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


const Radio = () => {

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
                            slidesPerView={5}
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
                                radio.map((item, index) => (
                                    <SwiperSlide key={item.id} virtualIndex={index}>
                                        <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
                                            <Image src={item.image} className="kirtan_img" alt={item.eng_title} width={252} height={252} />
                                            <h5>
                                                <Link href='/kirtan'>{GetLanguage(language, item)}</Link>
                                            </h5>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }

                        </Swiper>
                    </>
                )
            }

            {
                !isLoading && radio.length === 0 && <Nodatafound />
            }

        </div>
    )
}

export default Radio