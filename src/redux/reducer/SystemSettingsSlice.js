import { createSlice } from "@reduxjs/toolkit";

const SystemSettingsSlice = createSlice({
    name: 'SystemSettings',
    initialState: {
        SystemSettings: []
    },

    reducers: {
        setSystemSettings: (state, action) => {
            state.SystemSettings = action.payload;
        },
    }
})

export default SystemSettingsSlice;
export const { setSystemSettings } = SystemSettingsSlice.actions;
