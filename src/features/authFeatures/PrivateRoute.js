import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// AUTH
import { useAuth } from 'features/authFeatures/AuthContext';
// COMPONENTS
import LoadingAnimation from 'components/MTWFeedback/Loading';
import { IconContainer } from 'styledComponentsStyles';
// ROUTES
import { LOGIN } from 'Routes';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <IconContainer>
        <LoadingAnimation />
      </IconContainer>
    );
  }

  if (!user) {
    return <Navigate to={LOGIN} replace state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
