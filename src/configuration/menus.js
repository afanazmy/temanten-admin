import Icon from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { paths, permissions } from 'routes';
import { FormattedMessage } from 'components';
import { Gauge } from 'assets';

/**
 * @typedef {{
 *  key: String,
 *  label: String | import('react').ReactNode,
 *  icon: import('react').ReactNode,
 *  permission?: String,
 *  permissions?: Array.<String>,
 *  children?: Array.<MenuItem>
 * }} MenuItem
 */

export const shouldAppear = undefined;
export const shouldNotAppear = 'should not appear';

export const sidebarMenus = ({ user } = {}) => {
  /**
   * Urutan menu berdasarkan urutan pada sidebar nya.
   * Menu ini tidak sama dengan route,
   * menu hanya digunakan di sidebar,
   * jadi cukup masukkan modul-modul yang tampil di sidebar saja.
   *
   * Permission dengan rules khusus bisa diakali menggunakan variabel:
   * shouldAppear: berisi undefined, supaya tidak dicek oleh helper hasPermission
   * shouldNotApper: berisi string yang tidak termasuk dalam list permissions di database.
   *
   * @type {Array.<MenuItem>}
   */
  const menus = [
    {
      key: paths.dashboard,
      label: (
        <Link to={paths.dashboard}>
          <FormattedMessage id="common.Dashboard" />
        </Link>
      ),
      icon: <Icon component={Gauge} />,
    },
  ];

  return menus;
};
