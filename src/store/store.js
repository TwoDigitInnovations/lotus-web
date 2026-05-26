import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './slices/contactSlice';
import galleryReducer from './slices/gallerySlice';
import blogReducer from './slices/blogSlice';

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    gallery: galleryReducer,
    blog: blogReducer,
  },
});
