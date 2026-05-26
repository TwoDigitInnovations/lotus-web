import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { blogs as dummyBlogs } from '@/data/siteData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

function normalize(item) {
  return {
    id: item._id || item.id,
    slug: item.slug,
    title: item.title,
    date: item.date || item.createdAt?.slice(0, 10) || '',
    description: item.description || item.excerpt || '',
    image: item.image || '',
    content: Array.isArray(item.content) ? item.content : [item.content || item.description || ''],
  };
}

export const fetchBlogs = createAsyncThunk(
  'blog/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/blog`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue('Failed to load blogs');
      const items = Array.isArray(data) ? data : data.data || [];
      if (!items.length) return rejectWithValue('empty');
      return items.map(normalize);
    } catch {
      return rejectWithValue('network');
    }
  }
);

export const fetchBlogBySlug = createAsyncThunk(
  'blog/fetchBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/blog/${slug}`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue('Not found');
      return normalize(data.data || data);
    } catch {
      return rejectWithValue('network');
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    list: dummyBlogs,
    status: 'idle',
    bySlug: {},
    slugStatus: 'idle',
  },
  reducers: {
    clearSingle(state) {
      state.slugStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'success';
        if (action.payload.length) state.list = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state) => {
        state.status = 'error';
        // Keep dummy fallback — no overwrite on failure
      })
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.slugStatus = 'loading';
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.slugStatus = 'success';
        state.bySlug[action.payload.slug] = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, (state) => {
        state.slugStatus = 'error';
      });
  },
});

export const { clearSingle } = blogSlice.actions;
export default blogSlice.reducer;
