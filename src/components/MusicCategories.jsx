'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useRef, useState } from 'react';
import CategoryHeader from './CategoryHeader';
import { useDispatch, useSelector } from 'react-redux';
import GetLanguage from './GetLanguage';
import MusicCatAndArtists from './MusicCatAndArtists';


const Music_categories = ({ musicCategory }) => {

    const dispatch = useDispatch()
    const { language } = useSelector((state) => state.language)
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
        <div className="container d-flex flex-column">
            <CategoryHeader
                title="Music Categories"
                onPrev={handlePrev}
                onNext={handleNext}
                isBeginning={isBeginning}
                isEnd={isEnd}
                link="/music-categories"
                isShow={musicCategory.length > 6}
            />

            {
                musicCategory.length > 0 && (
                    <>

                        <Swiper
                            ref={musicRef}
                            slidesPerView={7}
                            spaceBetween={30}
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
                                    slidesPerView: 2
                                },
                                576: {
                                    slidesPerView: 3
                                },
                                768: {
                                    slidesPerView: 4
                                },
                                992: {
                                    slidesPerView: 6
                                },
                                1200: {
                                    slidesPerView: 7
                                },
                            }}
                            className='mySwiper w-100'
                        >
                            {
                                musicCategory.slice(0, 10).map((item, index) => (
                                    <SwiperSlide key={item.id} virtualIndex={index} className='d-flex align-items-center justify-content-sm-start justify-content-center'>
                                        <MusicCatAndArtists href={`/music-categories/${item.id}`} src={item.image} alt={item.eng_name} title={GetLanguage(language, item)} />
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

export default Music_categories