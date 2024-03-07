import { createSlice } from "@reduxjs/toolkit";

const LanguageSlice = createSlice({
    name: 'language',
    initialState: {
        language: 'English',
        languageCode: 'en'
    },

    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setLanguageCode: (state, action) => {
            state.languageCode = action.payload;
        },

    }
})

export default LanguageSlice;
export const { setLanguage, setLanguageCode } = LanguageSlice.actions;