import { createSlice } from "@reduxjs/toolkit";

const UsersSlice = createSlice({
    name: 'users',
    initialState: {},

    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    }
})

export default UsersSlice;
export const { setUsers } = UsersSlice.actions;