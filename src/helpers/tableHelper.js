/**
 * untuk memformat dari column sort order nya antd menjadi request API
 * @param {"ascend" | "descend"} order
 * @returns {"asc" | "desc"}
 */
export const getParamsOrder = (order) => {
  if (!order) return undefined;
  if (order?.includes?.('asc')) return 'asc';
  return 'desc';
};

/**
 * untuk memformat dari response API menjadi column sort order nya antd
 * @param {"asc" | "desc"} order
 * @returns {"ascend" | "descend"}
 */
export const getColumnOrder = (column, sorts) => {
  const sort = sorts?.find?.((sort) => sort?.sortBy === column);
  if (!sort?.sortType) return undefined;
  if (sort?.sortType?.includes('asc')) return 'ascend';
  return 'descend';
};

export const deleteEmpty = (data) => {
  for (let index = 0; index < data?.length; index++) {
    if (data?.[index]?.children?.length !== 0) {
      deleteEmpty(data[index].children);
    } else {
      delete data[index]['children'];
    }
  }

  return data;
};
