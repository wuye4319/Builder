/**
 * 把对象转为search字符串
 * @author MG
 * @param obj <object>
 * @param tag <string|undefined> 标记'#'，'?'(默认)
 * @return string
 * */

import serialize from './serialize'

export default function obj2Query (obj, tag) {
  return (tag === '#' ? '#' : '?') + serialize(obj)
}
