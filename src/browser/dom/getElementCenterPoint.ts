export const getElementCenterPoint = (el: HTMLElement) => {
  const { left, right, top, bottom } = el.getBoundingClientRect();
  const x = (left + right) / 2;
  const y = (top + bottom) / 2;
  return { x, y, top, bottom, left, right };
};
