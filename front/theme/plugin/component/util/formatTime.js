/**
 * 把时间戳转换为时间对象
 * @author MG
 * @param t <number> 时间戳，精确到毫秒的时间数字
 * @return obj <object>
 * */
export default function formatTime (t) {
  let obj = {
    date: '',
    time: '',
    dateTime: ''
  }

  const zeroPadding = n => (n - 0 >= 10 ? n : `0${n}`)

  try {
    const D = new Date(t)

    const hours = zeroPadding(D.getHours())
    const minutes = zeroPadding(D.getMinutes())
    const seconds = zeroPadding(D.getSeconds())
    const year = D.getFullYear()
    const month = zeroPadding(D.getMonth() + 1)
    const day = zeroPadding(D.getDate())
    const time = `${hours}:${minutes}:${seconds}`
    const date = `${year}-${month}-${day}`

    obj = {
      date,
      time,
      dateTime: `${date} ${time}`
    }
  } catch (err) {
    //
  }

  return obj
}
