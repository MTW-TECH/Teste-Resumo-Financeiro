import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiGetUserData, ApiGetUserAuthorized } from './userdata.api';
import { createAction } from '@reduxjs/toolkit';

export const recordCompanySelected = createAction(
  'user/recordcompanysel',
  (data) => ({
    payload: data
  })
);

export const recordETZSession = createAction(
  'user/recordetzsession',
  (data) => ({
    payload: data
  })
);

export const recordLEVDATASession = createAction(
  'user/recordlevdatasession',
  (data) => ({
    payload: data
  })
);

export const recordExternalUser = createAction(
  'user/recordexternaluser',
  (data) => ({
    payload: data
  })
);

export const recordUserCurrentLanguage = createAction(
  'user/currentlanguage',
  (data) => ({
    payload: data
  })
);

export const recordUserAuthSession = createAction(
  'api/userauthsession',
  (data) => ({
    payload: data
  })
);

export const getUserData = createAsyncThunk('api/userdata', async () => {
  let response = await ApiGetUserData();
  return response;
});

export const getUserAuthorized = createAsyncThunk(
  'api/userauth',
  async (id) => {
    let response = await ApiGetUserAuthorized(id);
    return response;
  }
);

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    userdata: {},
    isLoadingUser: false,
    userauth: {},
    isLoadingAuth: false,
    userAuthSession: {},
    userCurrentLanguage: 'PT',
    currentExternalUser: {},
    isETZSession: false,
    isLEVDATASession: false,
    isNAVTAXSession: false,
    companySelected: {}
  },
  reducers: {},
  extraReducers: {
    [recordCompanySelected]: (state, action) => {
      state.companySelected = action.payload;
    },
    [recordETZSession]: (state, action) => {
      state.isETZSession = action.payload;
    },
    [recordLEVDATASession]: (state, action) => {
      state.isLEVDATASession = action.payload;
    },
    [recordExternalUser]: (state, action) => {
      state.currentExternalUser = action.payload;
    },
    [recordUserCurrentLanguage]: (state, action) => {
      state.userCurrentLanguage = action.payload;
    },
    [recordUserAuthSession]: (state, action) => {
      state.userAuthSession = action.payload;
    },
    [getUserData.pending]: (state) => {
      state.isLoadingUser = 'loading';
    },
    [getUserData.fulfilled]: (state, action) => {
      state.isLoadingUser = 'success';
      state.userdata = action.payload;
    },
    [getUserData.rejected]: (state) => {
      state.isLoadingUser = 'failed';
    },
    [getUserAuthorized.pending]: (state) => {
      state.isLoadingAuth = 'loading';
    },
    [getUserAuthorized.fulfilled]: (state, action) => {
      state.isLoadingAuth = 'success';
      state.userauth = action.payload;
    },
    [getUserAuthorized.rejected]: (state) => {
      state.isLoadingAuth = 'failed';
    }
  }
});

export const userdataSelector = (state) => state.userData;
export default userDataSlice.reducer;
