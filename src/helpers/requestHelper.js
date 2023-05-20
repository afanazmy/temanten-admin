import { SessionStorage, storageKey } from 'utils';

/**
 * @typedef {Object} SetFilter
 * @property {String} modul untuk menyimpan data sesuai nama modul
 * @property {int} page data dalam bentuk string yang akan disimpan
 * @property {String} search data dalam bentuk string yang akan disimpan
 * @property {Object} filter data dalam bentuk object yang akan disimpan
 * @property {String} id (Optional) id dari database
 *
 * @param {SetFilter} param
 */
export const setFilter = ({ modul, page, search, filter, id }) => {
  const key = id ? modul + '-' + id : modul;
  let obj = SessionStorage.getItem(storageKey.filter, {});
  obj = Object.assign({}, obj, { [key]: { page, search, filter } });
  SessionStorage.setItem(storageKey.filter, obj);
};

/**
 * @typedef {Object} GetFilter
 * @property {String} modul untuk menyimpan data sesuai nama modul
 * @property {String} id (Optional) id dari database
 *
 * @param {GetFilter} param
 */
export const getFilter = ({ modul, id }) => {
  const key = id ? modul + '-' + id : modul;
  let obj = SessionStorage.getItem(storageKey.filter, {});
  return obj?.[key];
};

/**
 * @typedef {Object} RemoveFilter
 * @property {String} modul untuk menyimpan data sesuai nama modul
 * @property {String} id (Optional) id dari database
 *
 * @param {RemoveFilter} param
 */
export const removeFilter = ({ modul, id }) => {
  const key = id ? modul + '-' + id : modul;

  let obj = SessionStorage.getItem(storageKey.filter, {});
  delete obj[key];
  SessionStorage.setItem(storageKey.filter, obj);
};

export const clearFilter = () => {
  SessionStorage.removeItem(storageKey.filter);
};

export const isSelectOrEmptyField = ({ changed, selectFields } = {}) => {
  const [changedField] = Object.keys(changed) || [];
  const value = changed?.[changedField];
  const isSelect = selectFields?.includes?.(changedField);
  const isEmpty = value === '' || value === null || value === undefined;
  return isSelect || isEmpty ? true : false;
};

export const updatePagination = ({ form, pagination, fieldName }) => {
  const _fieldName = fieldName || 'pagination';
  const currentPagination = form?.getFieldValue?.(_fieldName);
  if (pagination === currentPagination) return;
  form?.setFieldValue?.(_fieldName, pagination);
};

export const deleteEmptyRequest = (request) => {
  const nullArray = JSON.stringify([null]);
  for (const key of Object.keys(request)) {
    if (request?.[key] === '' || !request?.[key]) {
      delete request?.[key];
    }

    if (JSON.stringify(request?.[key]) === nullArray) {
      delete request?.[key];
    }
  }
};

export const trimAll = (string) => string?.replace?.(/\s+/g, ' ')?.trim?.();

export const getQuery = (search = '') => {
  const splitted = trimAll(search)
    ?.split?.(' ')
    ?.filter?.((str) => str?.includes?.(':'));
  return splitted?.join?.(' ') || null;
};

export const getAllQuery = (data = {}) => {
  const { search, ...rest } = data || {};
  let query = Object.keys(rest)?.map?.((key) => (data?.[key] ? `${key}:${data?.[key]}` : ''));
  query = query?.join?.(' ');

  if (search) query = `${query} ${search}`;
  return query;
};

export const downloadBlob = (response, { fileName }) => {
  const url = URL.createObjectURL(response);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export const dateFormat = {
  API: 'YYYY-MM-DD',
  display: 'DD MMM YYYY',
};

export const dateTimeFormat = {
  API: 'YYYY-MM-DD HH:mm:ss',
  display: 'DD MMM YYYY HH:mm:ss',
};
