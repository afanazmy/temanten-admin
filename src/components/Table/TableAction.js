import classNames from 'classnames';
import Icon from '@ant-design/icons';
import { useCreation } from 'ahooks';
import { Dropdown, theme as _theme } from 'antd';
import { FormattedMessage } from 'components/Intl';
import { useStyleRegister } from '@ant-design/cssinjs';
import { DotsThree, Pencil, Restore, Trash } from 'assets';

import { genTableActionStyle } from './table.style';

const TableAction = ({
  record,
  canUpdate,
  onUpdate,
  onUpdateStatus,
  canUpdateStatus,
  canDelete,
  isActive,
  deletedAt,
}) => {
  const prefixCls = 'table-action';

  const { theme, token, hashId } = _theme.useToken();

  const wrapSSR = useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
    genTableActionStyle(prefixCls, token),
  ]);

  const items = useCreation(() => {
    if (!canUpdate && !canUpdateStatus && !canDelete) return [];

    /** @type {import('antd').MenuProps['items']} */
    const items = [
      {
        key: 'update',
        icon: <Icon component={Pencil} />,
        onClick: () => onUpdate?.(record),
        label: <FormattedMessage id="common.Update" />,
      },
    ];

    if (canUpdateStatus) {
      items.push({
        key: 'updateStatus',
        onClick: () => onUpdateStatus?.(record),
        icon: <Icon component={isActive === 1 ? Trash : Restore} />,
        label: <FormattedMessage id={isActive === 1 ? 'common.Deactivate' : 'common.Activate'} />,
      });
    }

    if (canDelete) {
      items.push({
        key: 'delete',
        icon: <Icon component={deletedAt ? Restore : Trash} />,
        label: <FormattedMessage id={deletedAt ? 'common.Restore' : 'common.Delete'} />,
      });
    }

    return items;
  }, [canUpdate, canUpdateStatus, isActive]);

  if (items?.length === 0) return null;

  return wrapSSR(
    <div className={classNames(prefixCls, hashId)} onClick={(e) => e.stopPropagation()}>
      <Dropdown menu={{ items }} overlayClassName="table-action-overlay" trigger={['click']}>
        <div className="btn-table-action">
          <Icon component={DotsThree} />
        </div>
      </Dropdown>
    </div>,
  );
};

export default TableAction;
