import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import App from '../../App';


const API_KEY = "YTZ8gPY5YH5y0qu7ItXz0Li3ktiT30BknJfOHimBiM5XkLYXEsv1eqMZ"
const API_PHOTO_URL = "https://api.pexels.com/v1/search?query=nature&per_page=200"

export const getPosts = createAsyncThunk("postsSlice/getPosts", async () => {
    const response = await axios.get(API_PHOTO_URL, {
                headers: {
                    Authorization: API_KEY,
                }
        })

        if (!response) {
            throw new Error("Fecthing Error")
        }
        
        const photos = response.data.photos
        return photos
}) 


const initialState = {
    photos: [],
    loading: true
}

const photosInFeedSlice = createSlice({
    name: 'photosInFeed',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state) => {
            state.loading = true;
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.loading = false
            state.photos = action.payload;
        })
        .addCase(getPosts.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const { } = photosInFeedSlice.actions;
export default photosInFeedSlice.reducer;   