export function scrollToTop(duration = 750) {
  const easingFunction = (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  const originScrollY = window.pageYOffset;
  const originScrollX = window.pageXOffset; // Keep abscissa
  const originTime = Date.now();
  let passedTime = 0;
  const _scrollToTop = () => {
    if (passedTime < duration) {
      passedTime = Date.now() - originTime;
      requestAnimationFrame(_scrollToTop);
      window.scrollTo(originScrollX, originScrollY * (1 - easingFunction(passedTime / duration)));
    }
  };
  _scrollToTop();
}
