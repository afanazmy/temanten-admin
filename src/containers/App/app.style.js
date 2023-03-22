import { useCreation } from 'ahooks';

export const useAppStyle = ({ app }) => {
  /** @type {import('antd/es/config-provider/context').ThemeConfig['token']} */
  const token = useCreation(() => ({ colorPrimary: '#1C1C1C', fontFamily: "'Inter', sans-serif" }), [app.theme]);

  return { token };
};
