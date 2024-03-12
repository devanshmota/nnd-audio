import { createSlice } from "@reduxjs/toolkit";



const CachedataSlice = createSlice({
    name: 'cachedata',
    initialState: {
        searchQuery: '',
        fcmToken: '',
        CurrentAlbum: {},
        BreadcrumbCategory: {}
    },

    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setFcmToken: (state, action) => {
            state.fcmToken = action.payload;
        },
        setCurrentAlbum: (state, action) => {
            state.CurrentAlbum = action.payload;
        },
        setBreadcrumbCategory: (state, action) => {
            state.BreadcrumbCategory = action.payload;
        },
    }
})

export default CachedataSlice;
export const { setSearchQuery, setFcmToken, setCurrentAlbum, setBreadcrumbCategory } = CachedataSlice.actions;