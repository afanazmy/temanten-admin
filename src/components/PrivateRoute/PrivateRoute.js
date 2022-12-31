import { paths } from 'routes';
import { isLogin } from 'utils';
import { useEffect } from 'react';
import { useAppProvider } from 'hooks';
import { hasPermission } from 'helpers';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

/**
 * Route that can be accessed after login
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @returns
 */
const PrivateRoute = ({ children, permission, permissions }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { app } = useAppProvider();
  const { user, loadingUserData } = app;

  useEffect(() => {
    if ((permission || permissions) && loadingUserData === false && !hasPermission(user, { permission, permissions })) {
      navigate(paths.unathorized);
    }
  }, [user, loadingUserData, permission, permissions, navigate]);

  if (!isLogin()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={paths.signIn} state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
