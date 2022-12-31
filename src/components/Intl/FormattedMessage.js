import { FormattedMessage as ReactIntlFormattedMessage } from 'react-intl';

/**
 * @typedef {Object} IFormattedMessage
 * @property {keyof import('languages')['appLocales']['en-US']['messages'] & keyof import('languages')['appLocales']['id-ID']['messages']} id
 *
 * @typedef {import("react-intl/src/components/message").Props & IFormattedMessage} FormattedMessageProps
 *
 * @param {FormattedMessageProps} props
 */
const FormattedMessage = (props) => {
  return <ReactIntlFormattedMessage {...props} />;
};

export default FormattedMessage;
