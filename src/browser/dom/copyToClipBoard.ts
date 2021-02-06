export const copyToClipBoard = (state: string | Blob) => {
  const isString = typeof state === 'string';
  const item = new ClipboardItem({
    [isString ? 'text/plain' : (state as Blob).type]: state,
  });
  return navigator.clipboard.write([item]);
};
