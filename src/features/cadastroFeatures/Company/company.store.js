import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiGetCompany } from './company.api';

export const getPageFrame = createAsyncThunk('pageframe', async ({ bool }) => {
  if (bool) {
    return true;
  } else if (!bool) {
    return false;
  }
});

export const getCompanyList = createAsyncThunk('api/companies', async () => {
  let response = await ApiGetCompany();
  return response;
});

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    companies: [],
    isGettingCompanies: false,
    //Page's frame (navbar and first row):
    pageFrame: true
  },
  reducers: {},
  extraReducers: {
    [getPageFrame.fulfilled]: (state, action) => {
      state.pageFrame = action.payload;
    },
    [getCompanyList.pending]: (state) => {
      state.isGettingCompanies = 'loading';
    },
    [getCompanyList.fulfilled]: (state, action) => {
      state.isGettingCompanies = 'success';
      state.companies = action.payload;
    },
    [getCompanyList.rejected]: (state) => {
      state.isGettingCompanies = 'failed';
    }
  }
});

export const companySelector = (state) => state.company;
export default companySlice.reducer;
