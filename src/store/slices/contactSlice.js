import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const submitContact = createAsyncThunk(
  'contact/submit',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || 'Submission failed. Please try again.');
      return data;
    } catch {
      return rejectWithValue('Network error. Please check your connection and try again.');
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    status: 'idle', // idle | loading | success | error
    error: null,
  },
  reducers: {
    resetContact(state) {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitContact.fulfilled, (state) => {
        state.status = 'success';
        state.error = null;
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export const { resetContact } = contactSlice.actions;
export default contactSlice.reducer;
