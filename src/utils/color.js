import { isHex, isRgb } from './test'

/**
 * @description hex颜色转rgb颜色
 * @param {String} str 颜色值字符串
 * @returns {String} 返回处理后的颜色值
 */
export const hexToRgb = (color) => {
  if (!isHex(color)) return
  let hexs = ''
  color = color.replace('#', '')
  hexs = color.match(/../g)
  for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16)
  return hexs
}

/**
 * @description rgb颜色转Hex颜色
 * @param {*} r 代表红色
 * @param {*} g 代表绿色
 * @param {*} b 代表蓝色
 * @returns {String} 返回处理后的颜色值
 */
export const rgbToHex = (r, g, b) => {
  if (!isRgb(r, g, b)) return
  let hexs = [r.toString(16), g.toString(16), b.toString(16)]
  for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`
  return `#${hexs.join('')}`
}

/**
 * @description 加深颜色值
 * @param {String} color 颜色值字符串
 * @param {Number} level 加深的程度，限0-1之间
 * @returns {String} 返回处理后的颜色值
 */
export const getDarkColor = (color, level) => {
  if (!isHex(color)) return
  let rgb = hexToRgb(color)
  for (let i = 0; i < 3; i++) rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level))
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}

/**
 * @description 变浅颜色值
 * @param {String} color 颜色值字符串
 * @param {Number} level 加深的程度，限0-1之间
 * @returns {String} 返回处理后的颜色值
 */
export const getLightColor = (color, level) => {
  if (!isHex(color)) return
  let rgb = hexToRgb(color)
  for (let i = 0; i < 3; i++) rgb[i] = Math.round(255 * level + rgb[i] * (1 - level))
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}
