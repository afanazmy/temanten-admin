import { paths } from 'routes';

const appConfig = {
  fallbackUrl: paths.home, // used in error page to go back
  restrictFallbackUrl: paths.home,
  defaultLanguage: 'en-US',
  footer: 'Temanted Admin',
};

export default appConfig;
