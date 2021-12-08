export const copyToClipBoard = (state: string | Blob) => {
  if (state instanceof Blob) {
    const item = new ClipboardItem({
      [state.type]: state,
    });
    return navigator.clipboard.write([item]);
  }
  const item = new ClipboardItem({
    'text/plain': new Blob([state], { type: 'text/plain' }),
  });
  return navigator.clipboard.write([item]);
};
