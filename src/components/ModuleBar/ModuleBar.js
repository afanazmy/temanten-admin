import { useRef } from 'react';
import Icon from '@ant-design/icons';
import { CircleNotch, Plus } from 'assets';
import { Button, Form, Space, theme } from 'antd';

import Search from './Search';
import Filter from './Filter';
import Selection from './Selection';
import FilterValue from './FilterValue';

/**
 * @typedef {Object} Filter
 * @property {string} name
 * @property {import('components/Intl/FormattedMessage').IFormattedMessage['id']} label
 * @property {"string" | "status"} type
 *
 * @typedef {Object} ModuleBarProps
 * @property {import('antd').FormInstance} form
 * @property {boolean} canAdd
 * @property {boolean} canDelete
 * @property {boolean} canUpdateStatus
 * @property {import('react').RefObject} drawerAdd
 * @property {() => void} onAdd
 * @property {() => void} onFinishFilter
 * @property {boolean} loading
 * @property {Filter[]} filters
 * @property {String[]} selectedRows
 * @property {(params: {records: Object[]}) => void} updateStatus
 * @property {import('antd').MenuProps['items']} selectionMenu
 *
 * @param {ModuleBarProps} props
 * @returns
 */
const ModuleBar = ({
  form,
  canAdd,
  drawerAdd,
  onAdd,
  loading,
  onFinishFilter,
  filters,
  canDelete,
  canUpdateStatus,
  selectedRows,
  updateStatus,
  selectionMenu,
}) => {
  const { token } = theme.useToken();
  const { ModuleBar } = token || {};

  const container = useRef();

  const _onAdd = () => {
    if (typeof onAdd === 'function') return onAdd();
    drawerAdd?.current?.onOpen?.();
  };

  const _onFinishFilter = (values) => {
    let _values = { ...values, showDeleted: null, onlyDeleted: null };

    if (_values.deleted) {
      _values = { ...values, showDeleted: null, onlyDeleted: null, [_values.deleted]: 1 };
    }

    delete _values.deleted;
    onFinishFilter?.(_values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={_onFinishFilter}>
      <div ref={container} className="module-bar" style={{ backgroundColor: ModuleBar?.colorBgContainer }}>
        <Space size={8}>
          {canAdd ? (
            <Button className="btn-snow-ui" type="text" icon={<Icon component={Plus} />} onClick={_onAdd} />
          ) : null}

          <Filter form={form} container={container} filters={filters} />

          {loading ? <Icon component={CircleNotch} className="anticon-spin" /> : null}

          <Selection
            canDelete={canDelete}
            selectedRows={selectedRows}
            updateStatus={updateStatus}
            selectionMenu={selectionMenu}
            canUpdateStatus={canUpdateStatus}
          />
        </Space>

        <Search form={form} />
      </div>

      <FilterValue form={form} filters={filters} />
    </Form>
  );
};

export default ModuleBar;
