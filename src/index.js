import React from 'react';
import './styles/index.css';
import App from './App';
import { RootStore } from './AppRoot/RootStore';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './features/authFeatures/AuthContext';
const container = document.getElementById('root');
const root = createRoot(container);

import 'react-toastify/dist/ReactToastify.css';
import './styles/toastify-fix.css';

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={RootStore}>
        <AuthProvider>
          <App tab="home" />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
