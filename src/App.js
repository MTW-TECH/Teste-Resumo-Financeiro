import { lazy, Suspense, useEffect, useState } from 'react';
// COMPONENTS
import LoadingAnimation from 'components/MTWFeedback/Loading';
import ErrorBoundary from 'components/ErrorBoundary';

// REACT ROUTER
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

// REACT LAZY
const FinancialSummary = lazy(() =>
  import('./project/dashboards-levdata/FinancialSummary')
);
const Login = lazy(() => import('features/authFeatures/Login'));

// AUTH
import PrivateRoute from 'features/authFeatures/PrivateRoute';
// ROUTES
import { LOGIN } from 'Routes';
// REDUX
import { recordUserCurrentLanguage } from 'features/userFeatures/userdata.store';
import { useDispatch } from 'react-redux';
// SERVICES
import { ToastContainer } from 'react-toastify';
// STYLE
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { IconContainer } from './styledComponentsStyles';
import theme from './theme';
import styledtheme from './styledThemeOn';

function App() {
  const [locationChecked, setLocationChecked] = useState(false);

  let fullUrl;

  try {
    fullUrl = useLocation();
  } catch {
    if (window.location.pathname) {
      fullUrl = { pathname: window.location.pathname };
      fullUrl = '';
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fullUrl?.pathname) return;

    dispatch(recordUserCurrentLanguage('PT'));
    localStorage.setItem('isMTWFromLevdata', true);

    setLocationChecked(true);
  }, [fullUrl]);

  return (
    <>
      {locationChecked ? (
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={styledtheme}>
            <ErrorBoundary>
              <Suspense
                fallback={
                  <IconContainer>
                    <LoadingAnimation />
                  </IconContainer>
                }
              >
                <Routes>
                  <Route path={LOGIN} element={<Login />} />
                  <Route
                    path="/levdata/financial-summary/*"
                    element={
                      <PrivateRoute>
                        <FinancialSummary />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <Navigate to="/levdata/financial-summary" replace />
                    }
                  />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </ThemeProvider>
        </MuiThemeProvider>
      ) : null}
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
