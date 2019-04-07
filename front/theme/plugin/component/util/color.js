/**
 * 颜色类名
 * @author MG
 * @param key <string>
 * @return String
 * */

function color (key) {
  return `c-${key}`
}

color.border = function (key) {
  return `c-${key}-border`
}

color.bg = function (key) {
  return `c-${key}-bg`
}

export default color
