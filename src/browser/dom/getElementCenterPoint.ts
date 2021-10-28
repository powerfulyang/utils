export const getElementCenterPoint = (el: HTMLElement) => {
  const { left, right, top, bottom } = el.getBoundingClientRect();
  const x = (left + right) / 2;
  const y = (top + bottom) / 2;
  const width = right - left;
  const height = top - bottom;
  return { x, y, top, bottom, left, right, width, height } as const;
};
