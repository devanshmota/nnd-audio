import { createSlice } from "@reduxjs/toolkit";



const CachedataSlice = createSlice({
    name: 'cachedata',
    initialState: {
        searchQuery: '',
        fcmToken: '',
        CurrentAlbum: {}
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
    }
})

export default CachedataSlice;
export const { setSearchQuery, setFcmToken, setCurrentAlbum } = CachedataSlice.actions;