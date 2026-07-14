import { createSlice } from '@reduxjs/toolkit';
import { Api } from '@/lib/api';

const propertyTypeSlice = createSlice({
  name: 'propertyType',
  initialState: {
    types: [],
    loading: false,
    fetched: false,
  },
  reducers: {
    setLoading(state, action) { state.loading = action.payload; },
    setFetched(state) { state.fetched = true; },
    setTypes(state, action) { state.types = action.payload; },
  },
});

export const { setLoading, setFetched, setTypes } = propertyTypeSlice.actions;

export const fetchPropertyTypes = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await Api('get', 'property-types', '', null);
    if (res?.status) {
      const data = res.data?.data;
      dispatch(setTypes(Array.isArray(data) ? data.map((t) => ({ id: t._id, label: t.label, image: t.image })) : []));
    }
  } catch (_) {}
  finally {
    dispatch(setLoading(false));
    dispatch(setFetched());
  }
};

export default propertyTypeSlice.reducer;
