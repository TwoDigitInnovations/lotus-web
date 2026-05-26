import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { galleryPhotos, galleryVideos } from '@/data/siteData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

function normalize(items) {
  const photos = [];
  const videos = [];
  items.forEach((item) => {
    const base = {
      id: item._id || item.id,
      name: item.name,
      location: item.location,
    };
    if (item.videoUrl) {
      videos.push({ ...base, thumbnail: item.image || item.thumbnail, videoUrl: item.videoUrl });
    } else {
      photos.push({ ...base, image: item.image });
    }
  });
  return { photos, videos };
}

export const fetchGallery = createAsyncThunk(
  'gallery/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/gallery`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue('Failed to load gallery');
      const items = Array.isArray(data) ? data : data.data || [];
      if (!items.length) return rejectWithValue('empty');
      return normalize(items);
    } catch {
      return rejectWithValue('network');
    }
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    photos: galleryPhotos,
    videos: galleryVideos,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        state.status = 'success';
        if (action.payload.photos.length) state.photos = action.payload.photos;
        if (action.payload.videos.length) state.videos = action.payload.videos;
      })
      .addCase(fetchGallery.rejected, (state) => {
        state.status = 'error';
        // Keep dummy fallback data — no overwrite on failure
      });
  },
});

export default gallerySlice.reducer;
