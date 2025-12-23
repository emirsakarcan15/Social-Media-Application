import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



export const getReels = createAsyncThunk("reelsSlice/getPosts", async () => {
    const response = await fetch("http://localhost:3000/api/social/reel", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    const data = await response.json();

    if (!response) {
        throw new Error("Fecthing Error")
    }

    const videos = data.videos
    return videos
}) 


const initialState = {
    reels: [],
    loading: true
}

const reelsInFeedSlice = createSlice({
    name: 'reelsInFeed',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getReels.pending, (state) => {
            state.loading = true;
        })
        .addCase(getReels.fulfilled, (state, action) => {
            state.loading = false
            state.reels = action.payload;
        })
        .addCase(getReels.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const { } = reelsInFeedSlice.actions;
export default reelsInFeedSlice.reducer; 