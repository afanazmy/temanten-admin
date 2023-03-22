import { routes } from 'routes';
import { appLocales } from 'languages';
import { IntlProvider } from 'react-intl';
import { ErrorBoundary } from 'components';
import { useRoutes } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { useCreation, useSetState } from 'ahooks';
import { AppProvider, initialContextValues } from 'context';

import { useAppStyle } from './app.style';

const App = () => {
  const [app, setApp] = useSetState(initialContextValues.app);

  const element = useRoutes(routes);
  const appLocale = appLocales?.[app.language];
  const algorithms = useCreation(() => ({ light: 'defaultAlgorithm', dark: 'darkAlgorithm' }), []);
  const algorithm = useCreation(() => theme[algorithms[app.theme]], [app.theme]);

  const { token } = useAppStyle({ app });

  return (
    <IntlProvider locale={appLocale?.locale} key={appLocale?.locale} messages={appLocale?.messages}>
      <ConfigProvider locale={appLocale?.antd} theme={{ algorithm, token }}>
        <AppProvider value={{ app, setApp }}>
          <ErrorBoundary>{element}</ErrorBoundary>
        </AppProvider>
      </ConfigProvider>
    </IntlProvider>
  );
};

export default App;
