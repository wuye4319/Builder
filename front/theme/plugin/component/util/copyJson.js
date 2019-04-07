/**
 * 拷贝json数据
 * @author MG
 * @param obj <object|array>
 * @return obj <object|array>
 * */

import getConstructorName from './getConstructorName'

export default function copyJson (obj) {
  const name = getConstructorName(obj)
  if (name === 'Object' || name === 'Array') {
    return JSON.parse(JSON.stringify(obj))
  } else {
    console.warn('copyJson函数的参数不是对象或数组')
    return null
  }
}
