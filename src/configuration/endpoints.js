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

  // Invitation
  getInvitations: 'invitations',
  getInvitation: 'invitations/:id',
  postInvitation: 'invitations',
  putInvitation: 'invitations/:id',
  restoreInvitation: 'invitations/restore',
  deleteInvitation: 'invitations/delete',
  restoreInvitations: 'invitations/restore',
  deleteInvitations: 'invitations/delete',
  restoreAllInvitations: 'invitations/restore-all',
  clearInvitations: 'invitations/clear',
  downloadTemplateInvitation: 'invitations/download-template',
  importInvitation: 'invitations/import-template',
};

export default endpoints;
