import React from 'react';
import { isLogin } from 'utils';
import { appConfig } from 'configuration';
import { Navigate } from 'react-router-dom';

/**
 * Route that can be accessed without login
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {Boolean} props.restricted if `true` restrict user to visit this route after logged in
 * @returns
 */
const PublicRoute = ({ children, restricted }) => {
  if (isLogin() && restricted) {
    return <Navigate to={appConfig.restrictFallbackUrl} replace />;
  }

  return children;
};

export default PublicRoute;
