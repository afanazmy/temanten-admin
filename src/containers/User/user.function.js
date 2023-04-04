import { FormattedMessage, IsActive } from 'components';

/**
 * @returns {import('antd').TableProps['columns']}
 */
export const columns = () => {
  return [
    {
      title: <FormattedMessage id="user.Username" />,
      dataIndex: 'username',
    },
    {
      title: <FormattedMessage id="common.Status" />,
      dataIndex: 'isActive',
      align: 'center',
      width: 150,
      render: (text) => <IsActive isActive={text} />,
    },
  ];
};
