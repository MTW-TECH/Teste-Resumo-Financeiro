import { configureStore } from '@reduxjs/toolkit';
import companyReducer from '../features/cadastroFeatures/Company/company.store';
import userDataReducer from '../features/userFeatures/userdata.store';
//Um reducer da (arquitetura da) "Root Store" representa todos os reducers e slices de uma dada store
//O redux toolkit é uma das arquiteturas possíveis para o redux no react

export const RootStore = configureStore({
  reducer: {
    company: companyReducer,
    userData: userDataReducer
  }
});
