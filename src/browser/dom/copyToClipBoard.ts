export const copyToClipBoard = (state: string | Blob) => {
  if (state instanceof Blob) {
    const item = new ClipboardItem({
      blob: Promise.resolve(state),
    });
    return navigator.clipboard.write([item]);
  }
  const item = new ClipboardItem({
    text: Promise.resolve(state),
  });
  return navigator.clipboard.write([item]);
};
