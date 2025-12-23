import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getUsers = createAsyncThunk("getAllUsersSlice/getUsers", async () => {
    const response = await fetch("http://localhost:3000/api/social/search/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
        });

        if (!response) {
            throw new Error("Fecthing Error")
        }
        
        const data = await response.json()
        const users = data.userInfo
        const activeUserId = data.activeUserId
        const payload = {users, activeUserId}
        return payload
}) 


const initialState = {
    users: [],
    loading: true
}

const getAllUsersSlice = createSlice({
    name: 'getAllUsersSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false
            let processUsers = action.payload.users;
            processUsers = processUsers.filter( (user) => user.id !== action.payload.activeUserId )
            state.users = processUsers
        })
        .addCase(getUsers.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const { } = getAllUsersSlice.actions;
export default getAllUsersSlice.reducer; 