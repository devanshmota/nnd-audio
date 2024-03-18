import { createSlice } from "@reduxjs/toolkit";




const CachedataSlice = createSlice({
    name: 'cachedata',
    initialState: {
        searchQuery: '',
        fcmToken: '',
        LyricsLanguage: 'English'
    },

    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setFcmToken: (state, action) => {
            state.fcmToken = action.payload;
        },
        setLyricsLanguage: (state, action) => {
            state.LyricsLanguage = action.payload;
        }
    }
})

export default CachedataSlice;
export const { setSearchQuery, setFcmToken, setLyricsLanguage } = CachedataSlice.actions;