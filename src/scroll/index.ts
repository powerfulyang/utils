import { debounceTime, fromEvent, startWith } from 'rxjs';

export const scrollIntoView = (
  element: HTMLElement | null,
  options?: boolean | ScrollIntoViewOptions,
  callback?: VoidFunction | undefined,
) => {
  element?.scrollIntoView(options);
  if (callback) {
    const subscription = fromEvent(window, 'scroll')
      .pipe(startWith(0), debounceTime(100))
      .subscribe(() => {
        subscription.unsubscribe();
        callback();
      });
  }
};
