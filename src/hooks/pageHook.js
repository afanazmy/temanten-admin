import { useIntl } from 'react-intl';
import { getPossibleRoute } from 'helpers';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreation, useMemoizedFn, useMount, useSetState, useTitle } from 'ahooks';

import { useAppProvider } from './appHook';

/**
 * Untuk update Page data saat component mounted
 *
 * @typedef {Object} Page
 * @property {import('components/Intl/FormattedMessage').IFormattedMessage['id']} title id language nya bukan hasil akhirnya
 * @property {String} activeMenu
 * @property {Array} openKeys
 *
 * @param {Page} param
 */
export const usePage = ({ title, activeMenu, openKeys } = {}) => {
  const [_title, _setTitle] = useState(title || document.title);

  const { formatMessage } = useIntl();
  const { setApp } = useAppProvider();

  useTitle(formatMessage({ id: _title, defaultMessage: _title }));

  useMount(() => {
    if (!activeMenu) return;
    setApp({ title, activeMenu, openKeys });
  });

  /**
   * Untuk update Page data setelah component mounted
   *
   * @typedef {Object} UpdatePage
   * @property {import('components/Intl/FormattedMessage').IFormattedMessage['id']} title id language nya bukan hasil akhirnya
   * @property {String} activeMenu
   * @property {Array} openKeys
   *
   * @param {UpdatePage} param
   */
  const updatePage = useMemoizedFn(({ title, activeMenu, openKeys } = {}) => {
    _setTitle(title);
    document.title = formatMessage({ id: _title, defaultMessage: _title });
    setApp({ title, activeMenu, openKeys });
  });

  return { updatePage };
};

/**
 * @typedef {Object} Space
 * @property {import('components/Intl/FormattedMessage').IFormattedMessage['id']} title id language nya bukan hasil akhirnya
 * @property {String} activeSpaceKey key object nya
 * @property {String} activeSpaceMenu key menu yang lagi aktif
 * @property {String} setFunctionKey nama function di hook nya
 * @property {() => void} useSpaceProvider hook nya
 *
 * @param {Space} param
 */
export const useSpace = ({ title, activeSpaceKey, activeSpaceMenu, setFunctionKey, useSpaceProvider }) => {
  const [_title, _setTitle] = useState(title || document.title);
  const space = useSpaceProvider();
  const { formatMessage } = useIntl();

  useTitle(formatMessage({ id: _title, defaultMessage: _title }));

  useMount(() => {
    if (!activeSpaceMenu) return;
    space?.[setFunctionKey]?.({ [activeSpaceKey]: activeSpaceMenu });
  });

  /**
   * Untuk update Setup Page data saat component mounted
   * dibedakan dengan `usePage` karena di setup, title nya berdasarkan menu sidebar yang sedang dibuka
   *
   * @typedef {Object} UpdateSpace
   * @property {import('components/Intl/FormattedMessage').IFormattedMessage['id']} title id language nya bukan hasil akhirnya
   * @property {String} activeSpaceMenu
   *
   * @param {UpdateSpace} param
   */
  const updateSpace = useMemoizedFn(({ title, activeSpaceMenu }) => {
    _setTitle(title);
    document.title = formatMessage({ id: _title, defaultMessage: _title });
    space?.[setFunctionKey]?.({ [activeSpaceKey]: activeSpaceMenu });
  });

  return { updateSpace };
};

/**
 * @typedef {Object} SubModule
 * @property {Object} initialValues initial values dari context nya, karena untuk menggunkaan sub module dibutuhkan context untuk menghandle
 * @property {(args: {user: Object, parentPath: String}) => void} getMenus
 * @property {String} parentPath
 * @property {String} activeMenuKey
 *
 * @param {SubModule} param
 */
export const useSubModule = ({ initialValues, getMenus, parentPath, activeMenuKey } = {}) => {
  const [state, setState] = useSetState({ ...initialValues });
  const [_activeMenu, _setActiveMenu] = useState();

  const location = useLocation();
  const navigate = useNavigate();
  const { app } = useAppProvider();
  const { user } = app || {};
  const { permissions } = app?.user || {};

  const activeMenu = state?.[activeMenuKey];
  const menuItems = useCreation(() => {
    if (!user) return [];
    return getMenus?.({ user, parentPath }) || [];
  }, [user, parentPath]);

  useEffect(() => {
    const isIndex = location.pathname === parentPath;
    if (!isIndex) return;

    const possibleRoute = getPossibleRoute(permissions || [], parentPath);
    if (possibleRoute) navigate(possibleRoute);
  }, [permissions, parentPath, location, navigate]);

  /**
   * Karena ada issue ketika langsung ambil value dari context
   * parent menu nya tidak active, harus di hover dulu baru active
   */
  useEffect(() => {
    _setActiveMenu(activeMenu);
  }, [activeMenu]);

  return { state, setState, activeMenu: _activeMenu, setActiveMenu: _setActiveMenu, menuItems };
};
