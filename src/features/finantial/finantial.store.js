import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiGetFinantialResume } from './finantial.api';

export const getFinantialResume = createAsyncThunk(
  'api/finantialresume',
  async () => {
    let response = await ApiGetFinantialResume();
    return response;
  },
  {
    // Evita chamadas duplicadas (ex: React.StrictMode double-invoke em dev)
    condition: (_, { getState }) => {
      const { isLoadingFinantial } = getState().finantial;
      if (isLoadingFinantial === 'loading') return false;
    }
  }
);

export const finantialSlice = createSlice({
  name: 'finantial',
  initialState: {
    finantialResume: {},
    isLoadingFinantial: false
  },
  reducers: {},
  extraReducers: {
    [getFinantialResume.pending]: (state) => {
      state.isLoadingFinantial = 'loading';
    },
    [getFinantialResume.fulfilled]: (state, action) => {
      state.isLoadingFinantial = 'success';
      state.finantialResume = action.payload;
    },
    [getFinantialResume.rejected]: (state) => {
      state.isLoadingFinantial = 'failed';
    }
  }
});

export const finantialSelector = (state) => state.finantial;
export default finantialSlice.reducer;
