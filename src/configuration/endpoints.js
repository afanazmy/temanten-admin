const endpoints = {
  // Sign In
  getSetupWizards: 'setup-wizard',
  postSetupWizard: 'setup-wizard',
  signIn: 'sign-in',
  signOut: 'sign-out',

  // Master Layout
  getAuthUser: 'users/auth',

  // User
  getUsers: 'users',
  getUser: 'users/:id',
  postUser: 'users',
  putUser: 'users/:id',
  activateUser: 'users/activate',
  deactivateUser: 'users/deactivate',
  activateUsers: 'users/activate',
  deactivateUsers: 'users/deactivate',
  getPermissions: 'users/permissions',
};

export default endpoints;
