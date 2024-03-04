'use client'
import { useState, useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { getHomeApi } from "@/redux/actions/Campaign";
import PlayLiveVideoModal from "./PlayLiveVideoModal";
import { getDecryptedText } from "@/decryption/decryption";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import CategoryHeader from "./CategoryHeader";
import Image from "next/image";


const LiveKathaStream = () => {


    const liveKathaStreamRef = useRef();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [videoDetails, setVideoDetails] = useState({
        videoid: '',
        title: ''
    });
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [liveKathaStream, setLiveKathaStream] = useState([]);

    useEffect(() => {

        getHomeApi({
            is_guest: 1,
            onSuccess: (res) => {
                if (res.youtube_live) {
                    setLiveKathaStream(res.youtube_live);
                }
            },
            onError: (e) => {
                console.log(e);
            }
        });
    }, []);

    const handlePlay = (item) => {
        setVideoDetails({
            videoid: item.video_id,
            title: item.title
        });
        setIsVideoModalOpen(true);
    };

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

    if (liveKathaStream.length === 0) {
        return null
    }

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
                            slidesPerView: 3,
                        },
                    }}
                    className='mySwiper w-100'
                >
                    <div className="container d-flex flex-column">
                        {liveKathaStream.length > 0 && liveKathaStream.map((item, index) => (
                            <SwiperSlide key={item.id} virtualIndex={index}>
                                <div className="image-container">

                                    <Image src={`https://img.youtube.com/vi/${getDecryptedText(item.video_id)}/mqdefault.jpg`} alt={`utsav_img`} className="rounded opacity-50 mw-100 object-fit-cover" width={412} height={206} />

                                    <div className="overlay" onClick={() => handlePlay(item)}>
                                        <FaPlay className="play-button" />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper>

            </div>
            <PlayLiveVideoModal show={isVideoModalOpen} onHide={() => setIsVideoModalOpen(false)} videoDetails={videoDetails} />
        </>
    );
};

export default LiveKathaStream;