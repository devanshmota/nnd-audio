'use client'
import { setSearchQuery } from '@/redux/reducer/CachedataSlice';
import Search from 'antd/es/input/Search';
import { useRouter } from 'next/navigation';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const GlobalSearch = () => {

    const { searchQuery } = useSelector((state) => state.cachedata)
    const dispatch = useDispatch()
    const router = useRouter()

    const onChange = (value) => {
        // console.log('Selected:', value);
        // console.log(value)
        dispatch(setSearchQuery(value))
        // router.push('/search')
    };
    const onSearch = () => {
        router.push('/search')
    }

    return (
        <>
            <Search
                placeholder="Search"
                onSearch={onSearch}
                onChange={(e)=>(onChange(e.target.value))}
                style={{
                    width: 300,
                }}
                value={searchQuery}
                className='globalSearch'
            />
        </>
    );
};

export default GlobalSearch;