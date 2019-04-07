/**
 * 通过style写入颜色
 * @author MG
 * @param obj <object>
 * @param id <string|undefined> style标签的id
 * */

export default function updateColor (obj, id = 'theme-style') {
  let style = document.getElementById(id)
  const formatColor = () =>
    Object.keys(obj)
      .map(item => {
        const {value} = obj[item]
        return `.c-${item}{color:${value}}.c-${item}-border{border-color:${value}}.c-${item}-bg{background-color:${value}}`
      })
      .join('')

  if (style) {
    style.innerHTML = formatColor()
  } else {
    style = document.createElement('style')
    style.id = id
    style.innerHTML = formatColor()
    document.head.appendChild(style)
  }
}
