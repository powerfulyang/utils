export const copyToClipBoard = (state: string | Blob) => {
  const isString = typeof state === 'string';
  const item = new ClipboardItem({
    [isString ? 'text/plain' : (state as Blob).type]: Promise.resolve(state),
  });
  return navigator.clipboard.write([item]);
};
