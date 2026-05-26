import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './slices/contactSlice';
import galleryReducer from './slices/gallerySlice';
import blogReducer from './slices/blogSlice';
import projectReducer from './slices/projectSlice';

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    gallery: galleryReducer,
    blog: blogReducer,
    project: projectReducer,
  },
});
