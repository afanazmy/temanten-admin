import { paths, routes } from 'routes';
import { sidebarMenus } from 'configuration';
import { LocalStorage, storageKey, get as getIdbKeyval, set as setIdbKeyval } from 'utils';

export const saveToken = (accessToken) => {
  LocalStorage.setItem(storageKey.accessToken, accessToken);
};

export const removeToken = () => {
  LocalStorage.removeItem(storageKey.accessToken);
};

export const removeSelectedDatabase = () => LocalStorage.removeItem(storageKey.selectedDatabase);

export const removeDataForLogout = () => {
  removeToken();
};

export const hasPermission = (user, { permission, permissions } = {}, { onTrue, onFalse } = {}) => {
  const userPermissions = getUserPermissions({ user });
  const isArrUserPermissions = Array.isArray(userPermissions);
  const isArrPermissions = Array.isArray(permissions);

  if (!permission && !permissions) return onTrue?.() || true;
  if (!isArrUserPermissions) return onFalse?.() || false;
  if (!permission && !isArrPermissions) return onFalse?.() || false;
  if (permission && !userPermissions?.includes?.(permission)) return onFalse?.() || false;
  if (isArrPermissions && !permissions?.some?.((permission) => userPermissions?.includes?.(permission))) {
    return onFalse?.() || false;
  }

  return onTrue?.() || true;
};

export const getPossibleRoute = (userPermissions, rootPath = paths.home) => {
  let redirectPath = false;
  if (!Array.isArray(userPermissions)) return redirectPath;

  const getRootPath = () => {
    if (rootPath === paths.home) {
      return routes.find(({ path }) => path === rootPath);
    }
    return routes.find(({ path }) => path === paths.home).children.find(({ path }) => path === rootPath);
  };

  let rootRoute = getRootPath();

  for (const route of rootRoute.children) {
    const { permission, permissions, path } = route;
    let usingChildPermission = false;

    // jika route memiliki multiple permission dan user memimiliki salah satu permission yang ada di route tersebut
    if (Array.isArray(permissions)) {
      for (const childPermission of permissions) {
        if (!userPermissions.includes(childPermission)) continue;
        usingChildPermission = true;
        redirectPath = path;
        break;
      }
    }

    if (usingChildPermission) break;
    if (!userPermissions.includes(permission)) continue;

    redirectPath = path;
    break;
  }

  return redirectPath;
};

export const getSidebarMenus = ({ user }) => {
  const defaultMenus = sidebarMenus({ user });
  const userMenus = [];

  defaultMenus.map(({ permission, permissions, children, ...defaultMenu }) => {
    if (!hasPermission(user, { permission, permissions })) return false;
    if (!children) return userMenus.push(defaultMenu);

    const child = [];
    children.map(({ permission, permissions, ...menu }) => {
      if (!hasPermission(user, { permission, permissions })) return false;
      return child.push(menu);
    });

    return userMenus.push({ ...defaultMenu, children: child });
  });

  return userMenus;
};

export const getUserPermissions = ({ user }) => user?.permissions || [];

/**
 * @typedef {Object} SetSaveData
 * @property {Object} user data dari auth user
 * @property {String} modul untuk menyimpan data sesuai nama modul
 * @property {Object} data data dalam bentuk object yang akan disimpan
 * @property {String} id (Optional) id dari database
 *
 * @param {SetSaveData} param
 */
export const setSaveData = async ({ user, modul, data, id }) => {
  if (!user?.username) return;

  const str = `${modul}-${user.username}${id ? `-${id}` : ''}`;

  await getIdbKeyval('autosave').then((obj) => {
    setIdbKeyval('autosave', Object.assign({}, obj, { [str]: data }));
  });
};

/**
 * @typedef {Object} GetSaveData
 * @property {Object} user data dari auth user
 * @property {String} modul untuk menyimpan data sesuai nama modul
 * @property {String} id (Optional) id dari database
 *
 * @param {GetSaveData} param
 */
export const getSaveData = async ({ user, modul, id }) => {
  if (!user?.username) return false;

  const str = `${modul}-${user.username}${id ? `-${id}` : ''}`;

  return await getIdbKeyval('autosave').then((obj) => {
    if (!obj) return false;
    return obj[str];
  });
};

/**
 * @typedef {Object} RemoveSaveData
 * @property {Object} user data dari auth user
 * @property {String} modul untuk menyimpan data sesuai nama modul
 * @property {String} id (Optional) id dari database
 *
 * @param {RemoveSaveData} param
 */
export const removeSaveData = async ({ user, modul, id }) => {
  if (!user?.username) return false;

  const str = `${modul}-${user.username}${id ? `-${id}` : ''}`;

  await getIdbKeyval('autosave').then((obj) => {
    if (!obj) return false;

    delete obj[str];
    setIdbKeyval('autosave', obj);
  });
};

export const clearSaveData = async () => {
  await setIdbKeyval('autosave', {});
};
