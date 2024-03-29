'use client'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useRef, useState } from 'react';
import CategoryHeader from './CategoryHeader';
import { useDispatch, useSelector } from 'react-redux';
import GetLanguage from './GetLanguage';
import Link from 'next/link';
import noImg from '../../public/noImageFound.svg'


const LatestAlbums = ({ LatestAlbums }) => {

    const dispatch = useDispatch()
    const { language } = useSelector((state) => state.language)
    const lastestAlbumsRef = useRef();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const handlePrev = () => {
        if (lastestAlbumsRef.current && !isBeginning) {
            lastestAlbumsRef.current.swiper.slidePrev();
        }

    };

    const handleNext = () => {
        if (lastestAlbumsRef.current && !isEnd) {
            lastestAlbumsRef.current.swiper.slideNext();
        }
    };



    return (
        <div className="container d-flex flex-column">
            <CategoryHeader
                title="Latest Albums"
                onPrev={handlePrev}
                onNext={handleNext}
                isBeginning={isBeginning}
                isEnd={isEnd}
                link="/"
                isShow={false}
            />


            <Swiper
                ref={lastestAlbumsRef}
                slidesPerView={4}
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
                        slidesPerView: 2,
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
                <div className="container d-flex flex-column" >
                    {
                        LatestAlbums.slice(0, 10).map((item, index) => (

                            <SwiperSlide key={item.id} virtualIndex={index}>
                                <Link href={`/latest-albums/${item.id}`} className="d-flex flex-column gap-2 justify-content-center align-items-center">
                                    <Image src={item.image || noImg} className="rounded-4 w-100 object-fit-cover album_height" layout='intrinsic' alt={item.eng_title} width={412} height={206} />
                                    <h5 className='m-0 ellipsis-container text-white'>
                                        {GetLanguage(language, item)}
                                    </h5>
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </div>
            </Swiper>

        </div >
    )
}

export default LatestAlbums