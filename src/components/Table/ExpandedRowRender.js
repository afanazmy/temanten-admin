import { Typography } from 'antd';
import _ from 'lodash';

const { Text } = Typography;

const ExpandedRowRender = ({ record, columns, index }) => {
  return (
    <table className="expanded-table">
      <tbody>
        {columns
          ?.filter?.((column) => !column.actionColumn)
          ?.map?.((column, key) => {
            const { title, dataIndex, render } = column || {};
            const text = _.get(record, dataIndex);
            const value = typeof render === 'function' ? render?.(text, record, index) : text;

            return (
              <tr key={`expanded-table-row-${key}`}>
                <td>
                  <Text type="secondary" strong>
                    {title}
                  </Text>
                </td>

                <td>{value}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default ExpandedRowRender;
