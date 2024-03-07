'use client'
import { setSearchQuery } from '@/redux/reducer/CachedataSlice';
import Search from 'antd/es/input/Search';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';
import { withTranslation } from "react-i18next";

const GlobalSearch = () => {

    const { searchQuery } = useSelector((state) => state.cachedata)
    const dispatch = useDispatch()
    const router = useRouter()

    const onChange = (value) => {

        dispatch(setSearchQuery(value))
    };
    const onSearch = () => {
        router.push('/search')
    }

    return (
        <>
            <div className='position-relative'>
                <SearchIcon className='search-icon' />
                <Search
                    placeholder={t('Search')}
                    onSearch={onSearch}
                    onChange={(e) => (onChange(e.target.value))}
                    style={{
                        width: 300,
                    }}
                    value={searchQuery}
                    className='globalSearch'
                />
            </div>
        </>
    );
};

export default withTranslation()(GlobalSearch);