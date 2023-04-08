/**
 * Key Object nya sesuai dengan nama permission di database.
 * Huruf awal key object dibuat kapital supaya mudah diambil dari database.
 * Dikelompokkan berdasarkan module nya.
 */
const permissions = {
  // User
  AddUser: 'Add User',
  UpdateUser: 'Update User',
  UpdateUserStatus: 'Update User Status',

  // Invitation
  AddInvitation: 'Add Invitation',
  DeleteInvitation: 'Delete Invitation',
  UpdateInvitation: 'Update Invitation',
  RestoreInvitation: 'Restore Invitation',
  DeleteAllInvitation: 'Delete All Invitation',
  RestoreAllInvitation: 'Restore All Invitation',

  // Guest Book
  DeleteGuestBook: 'Delete Guest Book',
  UpdateGuestBook: 'Update Guest Book',
  RestoreGuestBook: 'Restore Guest Book',
  DeleteAllGuestBook: 'Delete All Guest Book',
  RestoreAllGuestBook: 'Restore All Guest Book',

  // Wish
  DeleteWish: 'Delete Wish',
  UpdateWish: 'Update Wish',
  RestoreWish: 'Restore Wish',
  DeleteAllWish: 'Delete All Wish',
  RestoreAllWish: 'Restore All Wish',

  // Galery
  AddGalery: 'Add Galery',
  DeleteGalery: 'Delete Galery',
  UpdateGalery: 'Update Galery',
  RestoreGalery: 'Restore Galery',
  DeleteAllGalery: 'Delete All Galery',
  RestoreAllGalery: 'Restore All Galery',
};

export default permissions;
