let id = 1;

export const uniqueId = (prefix = '') => {
  // eslint-disable-next-line no-plusplus
  return `${prefix}${++id}`;
};
