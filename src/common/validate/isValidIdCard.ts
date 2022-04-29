/**
 * 简单判断是不是有效的身份证号码
 * @param sId
 */
export const isValidIdCard = (sId: string): boolean => {
  if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
    return false;
  }
  // 身份证城市
  const aCity = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外',
  };
  const provinceNo = parseInt(sId.substring(0, 2), 10);
  if (!Reflect.has(aCity, provinceNo)) {
    return false;
  }

  // 出生日期验证
  const year = parseInt(sId.substring(6, 10), 10);
  if (year < 1900 || year > new Date().getFullYear()) {
    return false;
  }
  const month = parseInt(sId.substring(10, 12), 10);
  if (month < 1 || month > 12) {
    return false;
  }
  const day = parseInt(sId.substring(12, 14), 10);
  if (day < 1 || day > 31) {
    return false;
  }

  // 身份证号码校验
  let sum = 0;
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const codes = '10X98765432';
  for (let i = 0; i < sId.length - 1; i += 1) {
    sum += Number(sId[i]) * weights[i];
  }
  const last = codes[sum % 11]; // 计算出来的最后一位身份证号码
  return sId[sId.length - 1] === last;
};
