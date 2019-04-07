/**
 * 对象序列化函数 {a:b,c:d} => 'a=b&c=d'
 * @author Code Lai
 * @param obj {object} 需要被序列化的对象
 * @param encode {boolean|undefined}
 * @return {string} 序列化结果
 */
export default function serialize (obj, encode = false) {
  if (obj.constructor !== Object) {
    console.error('传入的值必须是对象');//eslint-disable-line
    return ''
  }
  const serializeArr = [];
  (function iteration(obj, key) {//eslint-disable-line
    for (const ele in obj) {
      if (!obj.hasOwnProperty(ele)) continue;
      (() => {
        const itemKey = key ? key + '[' + ele + ']' : ele
        if (obj[ele].constructor === Object) {
          iteration(obj[ele], key)
        } else if (obj[ele].constructor === Array) {
          for (let i = obj[ele]; i--;) {
            serializeArr.push(itemKey + '[]=' + obj[ele][i])
          }
        } else {
          serializeArr.push(itemKey + '=' + obj[ele])
        }
      })(obj, key)
    }
  })(obj)
  return encode ? encodeURIComponent(serializeArr.join('&')) : serializeArr.join('&')
}
