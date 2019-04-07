/**
 * 把search字符串转为对象
 * @author MG
 * @param search <string|undefined> search字符串
 * @param tag <string|undefined> 标记'#'，'?'(默认)
 * @return object search字符串转换成的对象,没有传参时返回本页面url的search的对象
 * */
export default function query2Obj (search, tag) {
  search = search || window.location[tag === '#' ? 'hash' : 'search']
  if (typeof search !== 'string' || !search) {
    return {}
  }
  let obj = {}
  let arr = search.slice(1).split('&')

  arr.forEach(function (item) {
    let a = item.split('=')
    obj[a[0]] = a[1]
  })

  return obj
}
