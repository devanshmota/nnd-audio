import { createSlice } from "@reduxjs/toolkit";



const CachedataSlice = createSlice({
    name: 'cachedata',
    initialState: {
        searchQuery: ''
    },

    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    }
})

export default CachedataSlice;
export const { setSearchQuery } = CachedataSlice.actions;