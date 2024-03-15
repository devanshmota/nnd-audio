'use client'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useRef, useState } from 'react';
import CategoryHeader from './CategoryHeader';
import { useDispatch, useSelector } from 'react-redux';
import GetLanguage from './GetLanguage';
import GetFirstWord from './GetFirstWord';
import { setCurrentTrack, setIsPlaying, setMusicPlaylist } from '@/redux/reducer/MusicPlaylistSlice';
import noImg from '../../public/noImageFound.svg'


const Radio = ({ radio }) => {
    const dispatch = useDispatch()
    const { language } = useSelector((state) => state.language)
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
    const handlePlayMusic = (musicId) => {
        const index = radio.findIndex((item) => item.id === musicId);
        console.log(radio)
        dispatch(setMusicPlaylist(radio))
        dispatch(setCurrentTrack(index))
        dispatch(setIsPlaying(true))
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
                isShow={radio.length > 6}
            />


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
                        slidesPerView: 2,
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
                    radio.slice(0, 10).map((item, index) => (
                            <SwiperSlide key={item.id} virtualIndex={index} className='d-flex align-items-center justify-content-sm-start justify-content-center'>
                                <div onClick={() => handlePlayMusic(item.id)} className="d-flex flex-column gap-3 align-items-center w-100 cursor-pointer">
                                    <Image src={item.image || noImg} className="artist_img aspctRatio_music" alt={item.eng_title} width={150} height={150} layout='intrinsic' />
                                    <h5 className="text-white text-center m-0">
                                        {GetFirstWord(GetLanguage(language, item))}
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