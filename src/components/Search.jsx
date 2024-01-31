'use client'
import { setSearchQuery } from '@/redux/reducer/CachedataSlice';
import Search from 'antd/es/input/Search';
import { useRouter } from 'next/navigation';

import React from 'react';
import { useDispatch } from 'react-redux';

const GlobalSearch = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const onSearch = (value) => {
        console.log('Selected:', value);
        dispatch(setSearchQuery(value))
        router.push('/search')
    };

    return (
        <>
            <Search
                placeholder="Search"
                onSearch={onSearch}
                style={{
                    width: 300,
                }}
            />
        </>
    );
};

export default GlobalSearch;