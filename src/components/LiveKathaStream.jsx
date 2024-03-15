'use client'
import { useState, useRef } from "react";
import { getDecryptedText } from "@/decryption/decryption";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import CategoryHeader from "./CategoryHeader";
import Image from "next/image";
import Link from "next/link";
import noImg from '../../public/noImageFound.svg'


const LiveKathaStream = ({ liveKathaStream }) => {

    const liveKathaStreamRef = useRef();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);


    const handlePrev = () => {
        if (liveKathaStreamRef.current && !isBeginning) {
            liveKathaStreamRef.current.swiper.slidePrev();
        }
        console.log(isBeginning)
    };

    const handleNext = () => {
        if (liveKathaStreamRef.current && !isEnd) {
            liveKathaStreamRef.current.swiper.slideNext();
        }
        console.log(isBeginning)
    };


    return (
        <>
            <div className="container d-flex flex-column">
                <CategoryHeader
                    title="Live Katha Stream"
                    onPrev={handlePrev}
                    onNext={handleNext}
                    isBeginning={isBeginning}
                    isEnd={isEnd}
                    link="/"
                    isShow={false}
                />

                <Swiper
                    ref={liveKathaStreamRef}
                    slidesPerView={3}
                    spaceBetween={30}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination]}
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
                            slidesPerView: 3,
                        },
                        1200: {
                            slidesPerView: 4,
                        },
                    }}
                    className='mySwiper w-100'
                >
                    <div className="container d-flex flex-column">
                        {liveKathaStream.slice(0, 10).map((item, index) => (
                            <SwiperSlide key={item.id} virtualIndex={index}>
                                <Link href={`/youtube-live-videos/${item.id}`}>
                                    <Image
                                        src={`https://img.youtube.com/vi/${getDecryptedText(item.video_id)}/mqdefault.jpg` || noImg}
                                        alt={`utsav_img`}
                                        className="rounded-4 w-100 object-fit-cover aspectRatio_katha"
                                        layout="intrinsic"
                                        width={412}
                                        height={206}
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper>

            </div>

        </>
    );
};

export default LiveKathaStream;