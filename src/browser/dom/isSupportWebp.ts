import { isClient } from '../../util';

let result: boolean = true;

const kTestImages = {
  lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
  lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
  alpha:
    'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
  animation:
    'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
};

function check_webp_feature<T extends keyof typeof kTestImages>(
  feature: T,
  callback: (bool: boolean) => void,
) {
  const img = new Image();
  img.onload = () => {
    const r = img.width > 0 && img.height > 0;
    callback(r);
  };
  img.onerror = () => {
    callback(false);
  };
  img.src = `data:image/webp;base64,${kTestImages[feature]}`;
}

if (isClient) {
  check_webp_feature('alpha', (bool) => {
    result = bool;
  });
}

export const isSupportWebp = (): boolean => result;
