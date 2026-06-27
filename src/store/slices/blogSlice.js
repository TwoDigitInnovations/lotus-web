import { createSlice } from '@reduxjs/toolkit';
import { BLOGS as dummyBlogs } from '@/data/fallback';
import { Api } from '@/lib/api';

function normalize(item) {
  return {
    id: item._id || item.id,
    slug: item.slug,
    title: item.title,
    date: item.date || item.createdAt?.slice(0, 10) || '',
    description: item.description || item.excerpt || '',
    image: item.image || '',
    content: Array.isArray(item.content)
      ? item.content
      : [item.content || item.description || ''],
  };
}

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    list: dummyBlogs,
    bySlug: {},
    loading: false,
    error: null,
    fetched: false,
  },
  reducers: {
    setLoading(state, action) { state.loading = action.payload; },
    setList(state, action) { state.list = action.payload; },
    setSingle(state, action) { state.bySlug[action.payload.slug] = action.payload; },
    setError(state, action) { state.error = action.payload; },
    setFetched(state) { state.fetched = true; },
    clearSingle(state, action) { delete state.bySlug[action.payload]; },
  },
});

export const { setLoading, setList, setSingle, setError, setFetched, clearSingle } = blogSlice.actions;

export const fetchBlogs = (router) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const res = await Api('get', 'blogs', '', router);

    if (res?.status) {
      const items = Array.isArray(res.data) ? res.data : res.data?.data || [];
      if (items.length) dispatch(setList(items.map(normalize)));
    } else {
      dispatch(setError('Failed to load blogs. Showing cached data.'));
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

export const fetchBlogBySlug = (slug, router) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const res = await Api('get', `blogs/${slug}`, '', router);

    if (res?.status) {
      const blog = normalize(res.data?.data || res.data);
      dispatch(setSingle(blog));
    } else {
      dispatch(setError('Blog not found.'));
    }

    dispatch(setLoading(false));
    return { success: res?.status, data: res?.data };
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(setError('Network error. Please check your connection.'));
    throw err;
  }
};

export default blogSlice.reducer;
