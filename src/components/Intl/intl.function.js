import { useIntl as useReactIntl } from 'react-intl';

/**
 * @typedef {Object} MessageDescriptor
 * @property {import('./FormattedMessage').IFormattedMessage['id']} id
 * @property {String | Object} description
 * @property {String | import('react-intl').MessageFormatElement[]} defaultMessage
 *
 *
 * @typedef {Object} IIntlShape
 * @property {import('react-intl').IntlShape['formatDateTimeRange']} formatDateTimeRange
 * @property {import('react-intl').IntlShape['formatDate']} formatDate
 * @property {import('react-intl').IntlShape['formatTime']} formatTime
 * @property {import('react-intl').IntlShape['formatDateToParts']} formatDateToParts
 * @property {import('react-intl').IntlShape['formatTimeToParts']} formatTimeToParts
 * @property {import('react-intl').IntlShape['formatRelativeTime']} formatRelativeTime
 * @property {import('react-intl').IntlShape['formatNumber']} formatNumber
 * @property {import('react-intl').IntlShape['formatNumberToParts']} formatNumberToParts
 * @property {import('react-intl').IntlShape['formatPlural']} formatPlural
 * @property {import('react-intl').IntlShape['$t']} $t
 * @property {import('react-intl').IntlShape['$t']} $t
 * @property {import('react-intl').IntlShape['formatList']} formatList
 * @property {import('react-intl').IntlShape['formatList']} formatList
 * @property {import('react-intl').IntlShape['formatListToParts']} formatListToParts
 * @property {import('react-intl').IntlShape['formatDisplayName']} formatDisplayName
 * @property {(descriptor: MessageDescriptor, values?: Record<string, import('react-intl').PrimitiveType | import('intl-messageformat').FormatXMLElementFn<string, string>>, opts?: import('intl-messageformat').Options) => String} formatMessage
 *
 * @returns {IIntlShape}
 */
export const useIntl = () => {
  return useReactIntl();
};
