import { createSlice } from '@reduxjs/toolkit';
import { Api } from '@/lib/api';

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    status: 'idle', // idle | loading | success | error
    error: null,
  },
  reducers: {
    setStatus(state, action) { state.status = action.payload; },
    setError(state, action) { state.error = action.payload; },
    resetContact(state) {
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const { setStatus, setError, resetContact } = contactSlice.actions;

export const submitContact = (formData, router) => async (dispatch) => {
  try {
    dispatch(setStatus('loading'));
    dispatch(setError(null));

    const res = await Api('post', 'contact', formData, router);

    if (res?.status) {
      dispatch(setStatus('success'));
    } else {
      dispatch(setStatus('error'));
      dispatch(setError(res?.message || 'Submission failed. Please try again.'));
    }

    return { success: res?.status, data: res?.data };
  } catch (err) {
    dispatch(setStatus('error'));
    dispatch(setError('Network error. Please check your connection and try again.'));
    throw err;
  }
};

export default contactSlice.reducer;
