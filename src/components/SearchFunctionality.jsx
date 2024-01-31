'use client'

import { globalSearchApi } from "@/redux/actions/Campaign";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const SearchFunctionality = () => {

    const [options, setOptions] = useState([]);
    const  {searchQuery}  = useSelector((state) => state.cachedata)

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
    }, [])

    const generateOptions = (data) => {
        const options = [];

        if (data.category.length > 0) {
            options.push(
                ...data.category.map((item) => ({
                    value: `category_${item.id}`,
                    label: `${item.eng_name} (Category)`,
                }))
            );
        }

        if (data.music.length > 0) {
            options.push(
                ...data.music.map((item) => ({
                    value: `music_${item.id}`,
                    label: `${item.eng_title} (Music)`,
                }))
            );
        }
        if (data.radio.length > 0) {
            options.push(
                ...data.radio.map((item) => ({
                    value: `radio_${item.id}`,
                    label: `${item.eng_title} (Radio)`,
                }))
            );
        }
        if (data.artist.length > 0) {
            options.push(
                ...data.artist.map((item) => ({
                    value: `artist_${item.id}`,
                    label: `${item.eng_name} (Artist)`,
                }))
            );
        }
        if (data.utsav.length > 0) {
            options.push(
                ...data.utsav.map((item) => ({
                    value: `utsav_${item.id}`,
                    label: `${item.eng_name} (Utsav)`,
                }))
            );
        }

        return options;

    };

    console.log(options)

    return (
        <div>SearchFunctionality</div>
    )
}

export default SearchFunctionality