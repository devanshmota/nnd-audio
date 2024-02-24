import { createSlice } from "@reduxjs/toolkit";



const CachedataSlice = createSlice({
    name: 'cachedata',
    initialState: {
        searchQuery: '',
        fcmToken: ''
    },

    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setFcmToken: (state, action) => {
            state.fcmToken = action.payload;
        }
    }
})

export default CachedataSlice;
export const { setSearchQuery, setFcmToken } = CachedataSlice.actions;