export function convertURLToAbsoluteURL(
  url: string,
  absoluteBaseURL: string = window.location.href,
): string {
  return new URL(url, absoluteBaseURL).href;
}
