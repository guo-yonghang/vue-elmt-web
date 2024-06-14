/**
 * @description 是否为hex颜色
 * @param {*} value 颜色值字符串
 * @returns {Boolean}
 */
export const isHex = (value) => {
  return /^\#?[0-9A-Fa-f]{6}$/.test(value);
};

/**
 * @description 是否为rgb颜色
 * @param {*} r 代表红色
 * @param {*} g 代表绿色
 * @param {*} b 代表蓝色
 * @returns {Boolean}
 */
export const isRgb = (r, g, b) => {
  const reg = /^\d{1,3}$/;
  return reg.test(r) && reg.test(g) && reg.test(b);
};
