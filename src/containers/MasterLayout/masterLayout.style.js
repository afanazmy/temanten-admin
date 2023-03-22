import { theme } from 'antd';
import { useCreation } from 'ahooks';

export const useMasterLayoutStyle = () => {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const classes = useCreation(
    () => ({
      /** @type {import('react').CSSProperties} */
      header: { backgroundColor: colorBgLayout },

      /** @type {import('react').CSSProperties} */
      logo: { height: 24 },
    }),
    [colorBgLayout],
  );

  return classes;
};
