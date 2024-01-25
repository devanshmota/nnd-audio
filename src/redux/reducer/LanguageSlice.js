import { createSlice } from "@reduxjs/toolkit";

const LanguageSlice = createSlice({
    name: 'language',
    initialState: {
        language: 'English'
    },

    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        },

    }
})

export default LanguageSlice;
export const { setLanguage } = LanguageSlice.actions;