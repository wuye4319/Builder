/**
 * 格式化价格：把字符串(或数字)转化成最多包含两位小数的数
 * @author MG
 * @param price <string|number> 要被格式化的数
 * @param zeroPadding <boolean> 小数部分是否补零，补零后返回的是字符串
 * @param min <number> 最小数
 * @param max <number> 最大数
 * @return NaN|number|string
 * **/
export default function formatPrice (price, zeroPadding, min, max) {
  let src = parseFloat(price)
  if (isNaN(src)) return src
  if ((min || min === 0) && src < min) src = min
  if ((max || max === 0) && src > max) src = max
  src = Math.round(src * 100) / 100
  if (zeroPadding) {
    src = parseInt(src) === src ? src + '.00' : (src + '00').match(/^\d*\.\d{2}/)[0]
  }
  return src
}
