import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const getUser = createAsyncThunk("activeUserSlice/getUser", async () => {
    const response = await fetch("http://localhost:3000/api/social/profile", {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json"
                },
                credentials: "include"
        })

        if (!response) {
            throw new Error("Fecthing Error")
        }
        
        const data = await response.json()
        const user = data.userInfo
        return user
}) 


const initialState = {
    user: {},
    loading: true
}

const activeUserSlice = createSlice({
    name: 'activeUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload;
        })
        .addCase(getUser.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const { } = activeUserSlice.actions;
export default activeUserSlice.reducer; 