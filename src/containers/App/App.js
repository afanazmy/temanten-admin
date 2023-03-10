import { routes } from 'routes';
import { useSetState } from 'ahooks';
import { ConfigProvider } from 'antd';
import { appLocales } from 'languages';
import { IntlProvider } from 'react-intl';
import { ErrorBoundary } from 'components';
import { useRoutes } from 'react-router-dom';
import { AppProvider, initialContextValues } from 'context';

const App = () => {
  const [app, setApp] = useSetState(initialContextValues.app);

  const element = useRoutes(routes);
  const appLocale = appLocales?.[app.language];

  return (
    <IntlProvider locale={appLocale?.locale} key={appLocale?.locale} messages={appLocale?.messages}>
      <ConfigProvider locale={appLocale?.antd}>
        <AppProvider value={{ app, setApp }}>
          <ErrorBoundary>{element}</ErrorBoundary>
        </AppProvider>
      </ConfigProvider>
    </IntlProvider>
  );
};

export default App;
