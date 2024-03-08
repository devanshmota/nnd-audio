import { createSlice } from "@reduxjs/toolkit";

const initialUsersState = {}
const UsersSlice = createSlice({
    name: 'users',
    initialState: initialUsersState,

    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        resetUsers: (state) => {
            return initialUsersState;
        },
    }
})

export default UsersSlice;
export const { setUsers, resetUsers } = UsersSlice.actions;