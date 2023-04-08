import { useContext } from 'react';
import { AppContext } from 'context';
import { useCreation } from 'ahooks';
import { permissions as appPermissions } from 'routes';

export const useAppProvider = () => {
  return useContext(AppContext);
};

/**
 * @typedef {Object} UsePermission
 * @property {Array.<keyof import('routes')['permissions']>} permissions
 *
 * @param {UsePermission} param
 */
export const usePermission = ({ permissions }) => {
  const { app } = useAppProvider();
  const { permissions: userPermissions } = app?.user || {};

  const _permissions = useCreation(() => {
    const _permissions = [];

    permissions?.forEach?.((permission) => {
      const find = userPermissions?.find?.((userPermission) => userPermission === appPermissions?.[permission]);
      if (find) return _permissions.push(true);
      _permissions.push(false);
    });

    return _permissions;
  }, [permissions, userPermissions]);

  return _permissions;
};
