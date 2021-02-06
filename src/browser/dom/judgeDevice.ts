const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
let flag = true;

/**
 * 判断是不是移动端
 * @returns {boolean}
 */
export function isMobile() {
  const userAgentInfo = navigator.userAgent;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return !flag;
}

/**
 * 判断是不是微信浏览器
 * @returns {boolean}
 */
export function isWechat() {
  const ua = navigator.userAgent.toLowerCase();
  return !!ua.match(/micromessenger/i);
}

/**
 * 判断浏览器所在机器操作系统版本
 */
export function getOsVersion() {
  const u = navigator.userAgent;
  let version = '';
  if (u.indexOf('Mac OS X') > -1) {
    // ios
    const regStrSaf = /OS [\d._]*/gi;
    const versionInfo = u.match(regStrSaf);
    version = `ios${`${versionInfo}`.replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.')}`;
  } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    // android
    version = `android${u.substr(
      u.indexOf('Android') + 8,
      u.indexOf(';', u.indexOf('Android')) - u.indexOf('Android') - 8,
    )}`;
  } else if (u.indexOf('BB10') > -1) {
    // 黑莓bb10系统
    version = `黑莓bb10系统${u.substr(
      u.indexOf('BB10') + 5,
      u.indexOf(';', u.indexOf('BB10')) - u.indexOf('BB10') - 5,
    )}`;
  } else if (u.indexOf('IEMobile')) {
    // windows phone
    version = 'windows phone';
  }
  return version;
}
