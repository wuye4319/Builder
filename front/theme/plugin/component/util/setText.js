/**
 * 文案格式化
 * @author MG
 * @param data Object
 * @return String
 * */
export default function setText (data) {
  try {
    return Object.keys(data).filter(item => data[item]).join(' ')
  } catch (e) {
    console.error(e)
    return ''
  }
}
