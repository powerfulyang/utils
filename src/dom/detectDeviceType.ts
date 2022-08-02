/**
 * 判断是不是移动端
 */
export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * 判断是不是微信环境
 */
export function isWechat(): boolean {
  return /MicroMessenger/i.test(navigator.userAgent);
}

/**
 * 判断是不是企业微信
 */
export function isWxWork(): boolean {
  return isWechat() && /wxwork/i.test(navigator.userAgent);
}

/**
 * 判断是不是小程序
 */
export function isMiniProgram(): boolean {
  return /miniProgram/i.test(navigator.userAgent);
}

/**
 * 判断是不是微信小程序
 */
export function isWxMiniProgram(): boolean {
  return isMiniProgram() && isWechat() && !isWxWork();
}

/**
 * 判断是不是企微小程序
 */
export function isWxWorkMiniProgram(): boolean {
  return isWxWork() && isMiniProgram();
}

/**
 * 判断是不是微信浏览器
 */
export function isWechatBrowser(): boolean {
  return isWechat() && !isWxWork() && !isMiniProgram();
}

/**
 * 判断是不是企业微信浏览器
 */
export function isWxWorkBrowser(): boolean {
  return isWxWork() && !isMiniProgram();
}

/**
 * 判断是不是平板
 */
export function isTablet(): boolean {
  return /iPad|PlayBook|Silk/i.test(navigator.userAgent);
}

/**
 * 判断是不是手机
 */
export function isPhone(): boolean {
  return (
    !isTablet() &&
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
}

/**
 * 判断是不是PC
 */
export function isPC(): boolean {
  return !isMobile() && !isTablet();
}

/**
 * 判断是不是Mac
 */
export function isMac(): boolean {
  return /Mac/i.test(navigator.userAgent);
}

/**
 * 判断是不是Windows
 */
export function isWindows(): boolean {
  return /Windows/i.test(navigator.userAgent);
}

/**
 * 判断是不是Linux
 */
export function isLinux(): boolean {
  return /Linux/i.test(navigator.userAgent);
}

/**
 * 判断是不是Android
 */
export function isAndroid(): boolean {
  return /Android/i.test(navigator.userAgent);
}

/**
 * 判断是不是iOS
 */
export function isIOS(): boolean {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}
