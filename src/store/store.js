import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './slices/contactSlice';
import galleryReducer from './slices/gallerySlice';
import blogReducer from './slices/blogSlice';
import projectReducer from './slices/projectSlice';
import siteSettingsReducer from './slices/siteSettingsSlice';
import heroBannerReducer from './slices/heroBannerSlice';
import aboutReducer from './slices/aboutSlice';
import propertyTypeReducer from './slices/propertyTypeSlice';

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    gallery: galleryReducer,
    blog: blogReducer,
    project: projectReducer,
    siteSettings: siteSettingsReducer,
    heroBanner: heroBannerReducer,
    about: aboutReducer,
    propertyType: propertyTypeReducer,
  },
});
