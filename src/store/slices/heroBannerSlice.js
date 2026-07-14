import { createSlice } from '@reduxjs/toolkit';
import { Api } from '@/lib/api';

const heroBannerSlice = createSlice({
  name: 'heroBanner',
  initialState: {
    slides: [],
    loading: false,
    fetched: false,
  },
  reducers: {
    setLoading(state, action) { state.loading = action.payload; },
    setFetched(state) { state.fetched = true; },
    setSlides(state, action) { state.slides = action.payload; },
  },
});

export const { setLoading, setFetched, setSlides } = heroBannerSlice.actions;

export const fetchHeroBanners = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await Api('get', 'hero-banners', '', null);
    if (res?.status) {
      const data = res.data?.data;
      dispatch(setSlides(Array.isArray(data) ? data : []));
    }
  } catch (_) {}
  finally {
    dispatch(setLoading(false));
    dispatch(setFetched());
  }
};

export default heroBannerSlice.reducer;
