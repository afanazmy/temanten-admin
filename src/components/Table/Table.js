import classNames from 'classnames';
import { useCreation } from 'ahooks';
import { Table as AntTable, Grid } from 'antd';

import ExpandedRowRender from './ExpandedRowRender';

/**
 *
 * @param {import('antd').TableProps} props
 * @returns
 */
const Table = (props) => {
  const { lg } = Grid.useBreakpoint();

  const mobile = !lg;

  const expandable = useCreation(
    /** @returns {import('antd').TableProps['expandable']} */
    () => {
      const selectedKeys = props?.rowSelection?.selectedRowKeys || [];
      if (!mobile || selectedKeys?.length) return undefined;

      return {
        expandRowByClick: true,
        showExpandColumn: false,
        expandedRowRender: (record, index) => (
          <ExpandedRowRender columns={props?.columns} index={index} record={record} />
        ),
      };
    },
    [props?.columns, props?.rowSelection?.selectedRowKeys, mobile],
  );

  return (
    <AntTable
      {...props}
      expandable={expandable}
      scroll={{ ...props.scroll, x: 'max-content' }}
      className={classNames('default-table', { mobile }, props.className)}
    />
  );
};

export default Table;
