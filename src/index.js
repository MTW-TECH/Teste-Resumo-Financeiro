import React from 'react';
import './styles/index.css';
import App from './App';
import { RootStore } from './AppRoot/RootStore';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);

import 'react-toastify/dist/ReactToastify.css';
import './styles/toastify-fix.css';

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={RootStore}>
        <App tab="home" />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
