import lodash from 'lodash';
import { FormattedMessage } from 'components';

/**
 * @typedef {Object} CustomValidation
 * @property {import('components').IIntlShape['formatMessage']} formatMessage
 */

export const validation = {
  required: () => ({
    required: true,
    message: <FormattedMessage id="common.Required" />,
  }),
  email: () => ({
    type: 'email',
    message: <FormattedMessage id="common.Invalid Email" />,
  }),
  url: () => ({
    type: 'url',
    message: <FormattedMessage id="common.Invalid URL" />,
  }),
  phone: () => ({
    pattern: '^[0-9]*$',
    message: <FormattedMessage id="common.Invalid phone number" />,
  }),

  /**
   *
   * @param {CustomValidation} param
   */
  percentage: ({ formatMessage }) => ({
    validator: (_, value) => {
      const rounding = parseFloat(value || 0);

      if (rounding > 100) return Promise.reject(`${formatMessage?.({ id: 'common.Max' })}: 100`);
      if (rounding < 0) return Promise.reject(`${formatMessage?.({ id: 'common.Min' })}: 0`);

      return Promise.resolve();
    },
  }),

  /**
   * @typedef {Object} Confirmation
   * @property {import('components/Intl/FormattedMessage').IFormattedMessage['id']} id
   * @property {import('antd/es/form/interface').NamePath} fieldName
   *
   * @param {CustomValidation & Confirmation & import('antd').FormInstance} param
   * @returns
   */
  confirmation: ({ id, formatMessage, fieldName, getFieldValue }) => ({
    validator: (_, value) => {
      if (!value || getFieldValue(fieldName) === value) return Promise.resolve();
      return Promise.reject(`${formatMessage?.({ id: id || 'common.Invalid' })}`);
    },
  }),
};

/**
 * @param {{error: import('axios').AxiosError, form: import('antd').FormInstance}} param
 */
export const setFieldsError = ({ error, form }) => {
  const { errors } = error?.response?.data || {};
  if (typeof errors !== 'object') return;

  let fields = [];
  const values = form?.getFieldsValue?.();

  Object.keys(errors).map((key) => {
    const _key = key?.includes?.('.')
      ? key?.split?.('.')?.map?.((key) => (isNaN(parseInt(key)) ? key : parseInt(key)))
      : key;

    return fields.push({ name: _key, value: lodash.get(values, key), errors: errors?.[key] });
  });

  form?.setFields?.(fields);
};

export const focus = ({ componentRef }) => {
  let timeout;
  if (componentRef?.current?.select) {
    timeout = setTimeout(() => componentRef?.current?.select?.(), 100);
  }

  if (componentRef?.current?.focus) {
    timeout = setTimeout(() => componentRef?.current?.focus?.(), 100);
  }

  if (!timeout) return;
  return () => clearTimeout(timeout);
};

export const open = ({ open }) => {
  if (typeof open !== 'function') return;
  const timeout = setTimeout(() => open?.(), 100);
  return () => clearTimeout(timeout);
};

export const onFocusSelect = (e) => e?.target?.select?.();

export const onFinishFailed = ({ errorFields, onFormError, form }, callback) => {
  const firstField = errorFields?.[0] || {};
  const nested = Array.isArray(firstField?.name);
  const name = nested ? firstField?.name?.at?.(-1) : firstField?.name;

  onFormError?.[name]?.({ form, name: firstField?.name });
  callback?.();
};

export const formLayout = {
  oneColumn: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
  twoColumn: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 },
  threeColumn: { xs: 24, sm: 24, md: 8, lg: 8, xl: 8, xxl: 8 },
  fourColumn: { xs: 24, sm: 24, md: 12, lg: 6, xl: 6, xxl: 6 },
};

/**
 * Untuk mendapatkan data saat transaksi diconfirm, supaya ketika master data nya diupdate data di transaksi nya tidak berubah
 *
 * @typedef {Object} GetOption
 * @property {String} value
 * @property {String} label
 * @property {Boolean} disabled
 *
 * @param {GetOption} param
 * @param {Array} defaultLabelKeys default key yang diambil dari `data` jika format `data` dari API tidak sesuai
 */
export const getOption = ({ value, label, disabled }, defaultLabelKeys) => {
  const noLabel = !label || label === '' || label === ' ';
  if (!disabled) return undefined;
  if (!label) return undefined;
  if (noLabel && !Array.isArray(defaultLabelKeys)) return undefined;
  if (noLabel) return { value, label: defaultLabelKeys?.map?.((_label) => lodash.get(label, _label))?.join?.(' ') };
  return { value, label: label };
};

export const attachmentsToBlob = ({ attachments = [], callback } = {}) => {
  const blobs = [];

  const toBlob = (files) => {
    if (!files?.length) return callback?.(blobs);

    const file = files?.[0];
    let attachment = {
      idAttachment: file.idAttachment || undefined,
      fileName: file.fileName,
      description: file.description,
      file: null,
    };

    if (!attachment.idAttachment) delete attachment.idAttachment;

    if (!file?.file?.[0]?.originFileObj && !file?.file?.originFileObj && !file?.file) {
      delete attachment.file;
      blobs.push(attachment);
      files.splice(0, 1);
      return toBlob(files);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file?.file?.[0]?.originFileObj || file?.file?.originFileObj || file?.file);
    return (reader.onload = () => {
      blobs.push({
        ...attachment,
        file: reader.result || null,
      });

      files.splice(0, 1);
      return toBlob(files);
    });
  };

  toBlob([...attachments]);
};

export const asyncToBlob = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const getFilename = ({ headers }) => {
  const contentDisposition = headers?.['content-disposition'];
  const filename = contentDisposition?.split?.('filename=')?.[1];

  let content;
  if (filename?.includes('"')) {
    content = contentDisposition?.split?.('filename=')?.[1]?.split('"')?.[1]?.split?.('.');
  } else {
    content = contentDisposition?.split?.('filename=')?.[1]?.split?.('.');
  }

  const fileName = content?.[0];
  const extension = content?.[1];

  return { fileName, extension };
};

export const downloadFile = ({ blob, headers }) => {
  const { fileName, extension } = getFilename({ headers });

  // create file link in browser's memory
  const href = URL.createObjectURL(blob);

  if (!!window?.cordove) return;

  // create "a" HTML element with href to file & click
  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('download', `${fileName}.${extension}`);
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};
