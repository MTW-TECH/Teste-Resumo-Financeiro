import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiGetCompany } from './company.api';

export const getPageFrame = createAsyncThunk('pageframe', async ({ bool }) => {
  if (bool) {
    return true;
  } else if (!bool) {
    return false;
  }
});

export const getCompanyList = createAsyncThunk(
  'api/companies',
  async () => {
    let response = await ApiGetCompany();
    return response;
  },
  {
    // Evita chamadas duplicadas quando vários componentes (ex: UserMenu e
    // FinancialSummary) montam ao mesmo tempo e disparam a mesma requisição.
    condition: (_, { getState }) => {
      const { isGettingCompanies, companies } = getState().company;
      if (isGettingCompanies === 'loading') return false;
      if (companies?.items?.length) return false;
    }
  }
);

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    companies: { items: [] },
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
      // Normaliza a resposta para `{ items: [...] }`, aceitando tanto array puro quanto `{ items }`
      state.companies = Array.isArray(action.payload)
        ? { items: action.payload }
        : action.payload;
    },
    [getCompanyList.rejected]: (state) => {
      state.isGettingCompanies = 'failed';
    }
  }
});

export const companySelector = (state) => state.company;
export default companySlice.reducer;
