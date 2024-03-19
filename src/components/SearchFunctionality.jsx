'use client'
import { globalSearchApi } from "@/redux/actions/Campaign";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetLanguage from "./GetLanguage";
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import noImg from '../../public/noImageFound.svg'
import BreadCrumb from "./BreadCrumb";
import Link from "next/link";
import { setCurrentTrack, setIsPlaying, setMusicPlaylist } from "@/redux/reducer/MusicPlaylistSlice";
import Nodataviewall from "./Nodataviewall";


const SearchFunctionality = () => {

    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)
    const token = users?.users?.token
    const { language } = useSelector((state) => state.language)
    const [options, setOptions] = useState([]);
    const { searchQuery } = useSelector((state) => state.cachedata)

    useEffect(() => {

        globalSearchApi({
            is_guest: token ? 0 : 1,
            search: searchQuery,
            onSuccess: (res) => {
                setOptions(generateOptions(res));
            },
            onError: (e) => {
                console.error(e);
            },
        });

    }, [searchQuery, language])

    const generateOptions = (data) => {
        const options = [];

        if (data.category.length > 0) {
            options.push(
                ...data.category.map((item) => ({
                    id: item.id,
                    label: `${GetLanguage(language, item)}`,
                    category: 'Category',
                    img: item.image
                }))
            );
        }

        if (data.music.length > 0) {
            options.push(
                ...data.music.map((item) => ({
                    id: item.id,
                    label: `${GetLanguage(language, item)}`,
                    category: 'Music',
                    img: item.album.image,
                    audio_url: item.audio_url,
                    eng_lyrics: item.eng_lyrics,
                    guj_lyrics: item.guj_lyrics,
                    eng_title: item.eng_title,
                    guj_title: item.guj_title,
                    tags: item.tags
                }))
            );
        }
        if (data.radio.length > 0) {
            options.push(
                ...data.radio.map((item) => ({
                    id: item.id,
                    label: `${GetLanguage(language, item)}`,
                    category: 'Radio',
                    img: item.image,
                    audio_url: item.url,
                    eng_title: item.eng_title,
                    guj_title: item.guj_title
                }))
            );
        }
        if (data.artist.length > 0) {
            options.push(
                ...data.artist.map((item) => ({
                    id: item.id,
                    label: `${GetLanguage(language, item)}`,
                    category: 'Artist',
                    img: item.image
                }))
            );
        }
        if (data.utsav.length > 0) {
            options.push(
                ...data.utsav.map((item) => ({
                    id: item.id,
                    label: `${GetLanguage(language, item)}`,
                    category: 'Utsav',
                    img: item.image
                }))
            );
        }
        return options;
    };

    console.log(options)

    const handlePlayMusic = (item) => {
        dispatch(setMusicPlaylist([item]))
        dispatch(setCurrentTrack(0))
        dispatch(setIsPlaying(true))
    };



    return (
        <>
            <div className="row my-5">
                <BreadCrumb title={t('Search')} />
            </div>
            <div className="row row_gap">
                {
                    options.length > 0 && options.map((item, index) => (
                        <>
                            {
                                item.category === 'Music' || item.category === 'Radio' ? (
                                    <div key={index} className="col-xxl-3 col-xl-4 col-sm-6 d-flex">
                                        <div className="lat-rel-card-container text-white cursor-pointer" onClick={() => handlePlayMusic(item)}>
                                            <Image src={item.img || noImg} alt={item.label} className="rounded" width={80} height={80} />
                                            <div className="d-flex flex-column gap-1">
                                                <h6 className="m-0">{item.label}</h6>
                                                <p className="text-cat">{t(item.category)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : item.category === 'Artist' ? (
                                    <Link href={`/artists/${item.id}`} key={index} className="col-xxl-3 col-xl-4 col-sm-6 d-flex">
                                        <div className="lat-rel-card-container text-white">
                                            <Image src={item.img || noImg} alt={item.label} className="rounded" width={80} height={80} />
                                            <div className="d-flex flex-column gap-1">
                                                <h6 className="m-0">{item.label}</h6>
                                                <p className="text-cat">{t(item.category)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ) : item.category === 'Utsav' ? (
                                    <Link href={`/utsav/${item.id}`} key={index} className="col-xxl-3 col-xl-4 col-sm-6 d-flex">
                                        <div className="lat-rel-card-container text-white">
                                            <Image src={item.img || noImg} alt={item.label} className="rounded" width={80} height={80} />
                                            <div className="d-flex flex-column gap-1">
                                                <h6 className="m-0">{item.label}</h6>
                                                <p className="text-cat">{t(item.category)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ) : item.category === 'Category' ? (
                                    <Link href={`/music-categories/${item.id}`} key={index} className="col-xxl-3 col-xl-4 col-sm-6 d-flex">
                                        <div className="lat-rel-card-container text-white">
                                            <Image src={item.img || noImg} alt={item.label} className="rounded" width={80} height={80} />
                                            <div className="d-flex flex-column gap-1">
                                                <h6 className="m-0">{item.label}</h6>
                                                <p className="text-cat">{t(item.category)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ) : null
                            }
                        </>
                    ))
                }
            </div>
            {
                options.length === 0 && <Nodataviewall />
            }
        </>
    )
}

export default withTranslation()(SearchFunctionality)