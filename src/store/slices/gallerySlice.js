import { createSlice } from '@reduxjs/toolkit';
import { galleryPhotos, galleryVideos } from '@/data/siteData';
import { Api } from '@/lib/api';

function normalize(item) {
  const base = {
    id: item._id || item.id,
    name: item.name,
    location: item.location,
  };
  if (item.videoUrl) {
    return { type: 'video', ...base, thumbnail: item.image || item.thumbnail, videoUrl: item.videoUrl };
  }
  return { type: 'photo', ...base, image: item.image };
}

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    photos: galleryPhotos,
    videos: galleryVideos,
    loading: false,
    error: null,
    fetched: false,
  },
  reducers: {
    setLoading(state, action) { state.loading = action.payload; },
    setPhotos(state, action) { state.photos = action.payload; },
    setVideos(state, action) { state.videos = action.payload; },
    setError(state, action) { state.error = action.payload; },
    setFetched(state) { state.fetched = true; },
  },
});

export const { setLoading, setPhotos, setVideos, setError, setFetched } = gallerySlice.actions;

export const fetchGallery = (router) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const res = await Api('get', 'gallery', '', router);

    if (res?.status) {
      const items = Array.isArray(res.data) ? res.data : res.data?.data || [];
      if (items.length) {
        const normalized = items.map(normalize);
        const photos = normalized.filter((i) => i.type === 'photo');
        const videos = normalized.filter((i) => i.type === 'video');
        if (photos.length) dispatch(setPhotos(photos));
        if (videos.length) dispatch(setVideos(videos));
      }
    } else {
      dispatch(setError('Failed to load gallery. Showing cached data.'));
    }

    dispatch(setLoading(false));
    dispatch(setFetched());
    return { success: true, data: res?.data };
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(setFetched());
    dispatch(setError('Network error. Please check your connection.'));
    throw err;
  }
};

export default gallerySlice.reducer;
