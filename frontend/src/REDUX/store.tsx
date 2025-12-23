import { configureStore } from '@reduxjs/toolkit'
import photosInFeedReducer from './slices/photosInFeedSlice';
import reelsInFeedReducer from "./slices/reelsSlice"
import activeUserReducer from "./slices/activeUserSlice"
import getAllUsersReducer from "./slices/getAllUsersSlice"

export const store = configureStore({
  reducer: {
    photosInFeedSlice: photosInFeedReducer,
    reelsInFeedSlice: reelsInFeedReducer,
    activeUserSlice: activeUserReducer,
    getAllUsersSlice: getAllUsersReducer
  },
});