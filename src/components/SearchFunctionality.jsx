'use client'
import { globalSearchApi } from "@/redux/actions/Campaign";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetLanguage from "./GetLanguage";


const SearchFunctionality = () => {

    const { language } = useSelector((state) => state.language)
    const [options, setOptions] = useState([]);
    const { searchQuery } = useSelector((state) => state.cachedata)
    const dispatch = useDispatch()

    useEffect(() => {

        globalSearchApi({
            is_guest: 1,
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
                    value: `category_${item.id}`,
                    label: `${GetLanguage(language, item)}`,
                    category: 'Category',
                    img: item.image
                }))
            );
        }

        if (data.music.length > 0) {
            options.push(
                ...data.music.map((item) => ({
                    value: `music_${item.id}`,
                    label: `${GetLanguage(language, item)}`,
                    category: 'Music',
                    img: item.album.image
                }))
            );
        }
        if (data.radio.length > 0) {
            options.push(
                ...data.radio.map((item) => ({
                    value: `radio_${item.id}`,
                    label: `${GetLanguage(language, item)}`,
                    category: 'Radio',
                    img: item.image
                }))
            );
        }
        if (data.artist.length > 0) {
            options.push(
                ...data.artist.map((item) => ({
                    value: `artist_${item.id}`,
                    label: `${GetLanguage(language, item)}`,
                    category: 'Artist',
                    img: item.image
                }))
            );
        }
        if (data.utsav.length > 0) {
            options.push(
                ...data.utsav.map((item) => ({
                    value: `utsav_${item.id}`,
                    label: `${GetLanguage(language, item)}`,
                    category: 'Utsav',
                    img: item.image
                }))
            );
        }
        console.log(options)
        return options;

    };

    // if (options.length > 0) {
    //     return 
    // }

    return (
        <>
            <div className="row">
                {
                    options.length > 0 ? options.map((item, index) => (
                        <>
                            <div key={index} className="col-xxl-3 col-xl-4 col-sm-6 d-flex mus_cat_container">
                                <div className="lat-rel-card-container text-white">

                                    <Image src={item.img} alt={item.label} className="rounded" width={80} height={80} />
                                    <div className="d-flex flex-column gap-1">
                                        <h6 className="m-0">{item.label}</h6>
                                        <p className="text-cat">{item.category}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                        :
                        <h4 className="text-white text-center mt-4">No data found</h4>
                }
            </div>
        </>
    )
}

export default SearchFunctionality