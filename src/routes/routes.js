import React from 'react';
import { Loadable, PrivateRoute, PublicRoute } from 'components';

import paths from './paths';

const NotFound = React.lazy(() => import('components/NotFound/NotFound'));
const Unauthorized = React.lazy(() => import('components/Unauthorized/Unauthorized'));
const SignIn = React.lazy(() => import('containers/SignIn/SignInPage'));
const MasterLayout = React.lazy(() => import('containers/MasterLayout/MasterLayoutPage'));
const LoadUserData = React.lazy(() => import('containers/LoadUserData/LoadUserDataPage'));
const Dashboard = React.lazy(() => import('containers/Dashboard/DashboardPage'));
const User = React.lazy(() => import('containers/User/UserPage'));

/**
 * @type {Array.<import('react-router-dom').RouteObject>}
 *
 * URUTAN ROUTES HARUS SESUAI DENGAN URUTAN MENU DI SIDEBAR,
 * MENU DI REPORT DAN MENU DI SETUP
 * karena ini akan menentukan halaman pertama yang dapat diakses oleh user
 *
 * @example Using lazy load
 * const Dashboard = React.lazy(() => import("./pages/Dashboard"));
 * const element = (
 * <React.Suspense fallback={<>...</>}>
 *  <Dashboard />
 * </React.Suspense>
 * );
 */
const routes = [
  {
    path: paths.signIn,
    element: (
      <PublicRoute restricted={true}>
        <Loadable>
          <SignIn />
        </Loadable>
      </PublicRoute>
    ),
  },
  {
    path: paths.home,
    element: (
      <PrivateRoute>
        <Loadable>
          <MasterLayout />
        </Loadable>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Loadable>
              <LoadUserData />
            </Loadable>
          </PrivateRoute>
        ),
      },

      {
        path: paths.dashboard,
        element: (
          <PrivateRoute>
            <Loadable>
              <Dashboard />
            </Loadable>
          </PrivateRoute>
        ),
      },

      {
        path: paths.user,
        element: (
          <PrivateRoute>
            <Loadable>
              <User />
            </Loadable>
          </PrivateRoute>
        ),
      },

      {
        path: paths.unathorized,
        element: (
          <PrivateRoute>
            <Loadable>
              <Unauthorized />
            </Loadable>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: paths.nomatch,
    element: (
      <PublicRoute>
        <Loadable>
          <NotFound />
        </Loadable>
      </PublicRoute>
    ),
  },
];

export default routes;
