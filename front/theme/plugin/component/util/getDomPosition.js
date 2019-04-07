/**
 * 获取元素相对于页面的位置
 * @author MG
 * @param ele <DOM object>
 * @return object {top:*,left:*}
 * */
export default function getDomPosition (ele) {
  let left = 0
  let top = 0
  while (ele) {
    left += ele.offsetLeft
    top += ele.offsetTop
    ele = ele.offsetParent
  }
  return { left, top }
}
