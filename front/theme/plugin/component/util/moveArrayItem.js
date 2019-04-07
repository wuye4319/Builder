/**
 * 在数组内移动数组元素
 * @author MG
 * @param arr <array> 原数组
 * @param fromIndex <number> 起始位置
 * @param toIndex <number> 到达位置
 * @return arr <array> 排序后的数组
 * */

export default function moveArrayItem (arr, fromIndex, toIndex) {
  let target = arr.splice(fromIndex, 1)[0]
  arr.splice(toIndex, 0, target)
  return arr
}
