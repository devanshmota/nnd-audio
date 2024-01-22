import { createSlice } from "@reduxjs/toolkit";

const UsersSlice = createSlice({
    name: 'users',
    initialState: {
        users: []
    },

    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },

    }
})

export default UsersSlice;
export const { setUsers } = UsersSlice.actions;