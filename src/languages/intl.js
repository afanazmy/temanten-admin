import { LocalStorage, storageKey } from 'utils';

import appLocales from 'languages/locales';

/**
 * Untuk component yang berada diluar context IntlProvider
 * ex: notification, message dll
 *
 * @typedef {Object} Intl
 * @property {import('components/Intl/FormattedMessage').IFormattedMessage['id']} id
 * @property {Object} values
 * @property {String} defaultMessage
 *
 * @param {Intl}
 */
const intl = ({ id, values, defaultMessage }) => {
  const language = LocalStorage.getItem(storageKey.language, 'EN');
  const { messages, locale } = appLocales?.[language];

  if (!messages?.[id]) {
    console.error(`Key ${id} in language ${locale} not found`);
  }

  if (!values) return messages?.[id] || defaultMessage || id;

  let str = messages?.[id] || defaultMessage || id;
  Object.keys(values).map((key) => (str = str.replace(`{${key}}`, values[key])));
  return str;
};

export default intl;
