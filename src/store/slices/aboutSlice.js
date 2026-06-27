import { createSlice } from '@reduxjs/toolkit';
import { Api } from '@/lib/api';

const aboutSlice = createSlice({
  name: 'about',
  initialState: {
    data: null,
    loading: false,
    fetched: false,
  },
  reducers: {
    setLoading(state, action) { state.loading = action.payload; },
    setFetched(state) { state.fetched = true; },
    setData(state, action) { state.data = action.payload; },
  },
});

export const { setLoading, setFetched, setData } = aboutSlice.actions;

export const fetchAboutPage = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await Api('get', 'about-page', '', null);
    if (res?.status && res.data?.data) dispatch(setData(res.data.data));
  } catch (_) {}
  finally {
    dispatch(setLoading(false));
    dispatch(setFetched());
  }
};

export default aboutSlice.reducer;
