/* eslint-disable no-param-reassign,prefer-destructuring */

import Message from '../plugin/component/Message/index'
import Link from '../plugin/component/Link/index'

/**
 * @author MG Ding (丁文强)
 * @desc 工具方法
 */
export function fixedZero (val) {
  return val * 1 < 10 ? `0${val}` : val
}

/**
 * 获取元素相对于页面的位置
 * @author MG
 * @param ele <DOM object>
 * @return object {top:*,left:*}
 * */
export function getDomPosition (ele) {
  let left = 0
  let top = 0
  while (ele) {
    left += ele.offsetLeft
    top += ele.offsetTop
    ele = ele.offsetParent
  }
  return {left, top}
}

/**
 * 获取任意值的构造函数名
 * @author MG
 * @param obj <任意值>
 * @return string 除[undefined]和[null]返回他本身外,其他值都返回其构造函数名(字符串)
 *
 * @example getConstructorName(null)  >>>  null
 * @example getConstructorName({})  >>>  'Object'
 * @example getConstructorName([])  >>>  'Array'
 * @example getConstructorName(new FormData)  >>>  'FormData'
 * */
export function getConstructorName (obj) {
  if (obj === 0) return 'Number'
  return obj && obj.constructor && obj.constructor.toString().match(/function\s*([^(]*)/)[1]
}

/**
 * 取n到m的随机数 [n,m]
 * @author MG
 * @param n <number> 整数, m > n
 * @param m <number> 整数, m > n
 * @return number n到m之间的任意整数,包含n和m
 * */
export function random (n, m) {
// eslint-disable-next-line no-mixed-operators
  return window.parseInt(Math.random() * (m - n + 1) + n)
}

/**
 * 拷贝json数据
 * @author MG
 * @param obj <object|array>
 * @return obj <object|array>
 * */
export function copyJson (obj) {
  const name = getConstructorName(obj)
  if (name === 'Object' || name === 'Array') {
    return JSON.parse(JSON.stringify(obj))
  } else {
    console.warn('copyJson函数的参数不是对象或数组')
    return null
  }
}

/**
 * 把时间戳转换为时间对象
 * @author MG
 * @param t <number> 时间戳，精确到毫秒的时间数字
 * @return obj <object>
 * */
export function formatTime (t) {
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

/**
 * 类名格式化
 * @author MG
 * @param data Object
 * @return String
 * */
export function setClass (data) {
  try {
    return Object.keys(data).filter(item => data[item]).join(' ')
  } catch (e) {
    console.error(e)
    return ''
  }
}

/**
 * 文案格式化
 * @author MG
 * @param data Object
 * @return String
 * */
export function setText (data) {
  try {
    return Object.keys(data).filter(item => data[item]).join(' ')
  } catch (e) {
    console.error(e)
    return ''
  }
}

export function color (key) {
  return `c-${key}`
}

color.border = function (key) {
  return `c-${key}-border`
}

color.bg = function (key) {
  return `c-${key}-bg`
}

export function font (key) {
  return `f-${key}`
}

/**
 * 格式化价格：把字符串(或数字)转化成最多包含两位小数的数
 * @author MG
 * @param price <string|number> 要被格式化的数
 * @param zeroPadding <boolean> 小数部分是否补零，补零后返回的是字符串
 * @param min <number> 最小数
 * @param max <number> 最大数
 * @return NaN|number|string
 * **/
export function formatPrice (price, zeroPadding, min, max) {
  let src = parseFloat(price)
  if (isNaN(src)) return src
  if ((min || min === 0) && src < min) src = min
  if ((max || max === 0) && src > max) src = max
  src = Math.round(src * 100) / 100
  if (zeroPadding) {
    src = parseInt(src) === src ? src + '.00' : (src + '00').match(/^\d*\.\d{2}/)[0]
  }
  return src
}

/**
 * 对象序列化函数 {a:b,c:d} => 'a=b&c=d'
 * @author Code Lai
 * @param obj {object} 需要被序列化的对象
 * @param encode {boolean|undefined}
 * @return {string} 序列化结果
 */
export function serialize (obj, encode = false) {
  if (obj.constructor !== Object) {
    console.error('传入的值必须是对象')//eslint-disable-line
    return ''
  }
  const serializeArr = [];
  (function iteration (obj, key) {//eslint-disable-line
    for (const ele in obj) {
      if (!obj.hasOwnProperty(ele)) continue
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

/**
 * 把search字符串转为对象
 * @author MG
 * @param search <string|undefined> search字符串
 * @param tag <string|undefined> 标记'#'，'?'(默认)
 * @return object search字符串转换成的对象,没有传参时返回本页面url的search的对象
 * */
export function query2Obj (search, tag) {
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

/**
 * 把对象转为search字符串
 * @author MG
 * @param obj <object>
 * @param tag <string|undefined> 标记'#'，'?'(默认)
 * @return string
 * */
export function obj2Query (obj, tag) {
  return (tag === '#' ? '#' : '?') + serialize(obj)
}

/**
 * 通过style写入颜色
 * @author MG
 * @param obj <object>
 * @param id <string|undefined> style标签的id
 * */
export function updateColor (obj, id = 'theme-style') {
  let style = document.getElementById(id)
  const formatColor = () =>
    Object.keys(obj).map(item => {
      const {value} = obj[item]
      return `.c-${item}{color:${value}}.c-${item}-border{border-color:${value}}.c-${item}-bg{background-color:${value}}`
    }).join('')

  if (style) {
    style.innerHTML = formatColor()
  } else {
    style = document.createElement('style')
    style.id = id
    style.innerHTML = formatColor()
    document.head.appendChild(style)
  }
}

/**
 * 在数组内移动数组元素
 * @author MG
 * @param arr <array> 原数组
 * @param fromIndex <number> 起始位置
 * @param toIndex <number> 到达位置
 * @return arr <array> 排序后的数组
 * */

export function moveArrayItem (arr, fromIndex, toIndex) {
  let target = arr.splice(fromIndex, 1)[0]
  arr.splice(toIndex, 0, target)
  return arr
}

/**
 * 请求方法
 * @author MG
 */

export function _fetch (url, options = {}) {
  // options.credentials = options.credentials === undefined ? 'include' : options.credentials;
  options.headers = options.headers || {}

  if (getConstructorName(options.body) === 'Object') {
    /** POST请求,把参数转化为JSON字符串,并设置Content-Type **/
    if (options.method === 'POST' || options.method === 'post') {
      options.headers['Content-type'] = options.headers['Content-type'] || 'application/json; charset=UTF-8'
      options.body = JSON.stringify(options.body)
    } else {
      /** GET请求,把参数转化为查询字符串,并拼接到url后面 **/
      url = url + obj2Query(options.body || {})
      delete options.body
    }
  }

  options.headers['Origin-Host'] = 'www.test.com'

  return window.fetch('http://192.168.0.38/web/v1' + url, options).then(response => response.json())
}

/**
 * 请求方法
 * @author MG
 */

export function fetch (url, options = {}) {
  options.credentials = options.credentials || 'include'
  options.headers = {
    // 'Business-Id': 'g9jP2e',
    // 'Origin-Host': 'test.kenbuckyshop2.com',
    // 'Timestamp': parseInt(Date.now() / 1000),
    // 'Account-Id': 'g9jP2e',
    ...(options.headers || {})
  }

  options.method = (options.method || 'GET').toUpperCase()

  if (getConstructorName(options.query) === 'Object') {
    url += obj2Query(options.query)
  }

  if (getConstructorName(options.body) === 'Object') {
    options.headers['Content-type'] = options.headers['Content-type'] || 'application/json; charset=UTF-8'
    options.body = JSON.stringify(options.body)
  }

  let {query, ...rest} = options

  return window.fetch(url, rest).then(response => {
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error('Failed to fetch')
    }
  })
}

/**
 * 可处理错误的请求方法
 * @author MG
 * @params
 *  fetch <function> 返回一个promise对象的函数，一般是一个fetch函数
 *  options.done <function> data.state === 0 成功时的回调
 *  options.fail <function|string|false|其他> data.state !== 0 失败时的回调 | 失败时的提示文案 | 失败时什么也不做 | 失败时弹出接口返回的错误文案
 *  options.error <function|string|false|其他> 请求非200，失败时的回调 | 失败时的提示文案 | 失败时什么也不做 | 失败时弹出默认文案
 *  options.complete <function> promise finally 时的回调
 *  options.authority <boolean> 默认false 是否需要登录，传true时，未登录跳转到登录页
 */
export function fetchLite (fetch, options = {}) {
  const {
    done,
    fail,
    error,
    complete,
    authority = false
  } = options

  fetch().then((data) => {
    if (data.state === 0) {
      done && done(data)
    } else {
      let failType = typeof fail
      if (failType === 'function') {
        fail(data)
      } else if (failType === 'string') {
        Message.error(fail)
      } else if (fail !== false) {
        Message.error(data.msg)
      }

      if (authority && data.state === 10008) {
        Link.goTo(`/login/?ref=${encodeURIComponent(window.location.href)}`)
      }
    }
  }).catch((err) => {
    let errorType = typeof error
    console.error(err)
    if (errorType === 'function') {
      error(err)
    } else if (errorType === 'string') {
      Message.error(error)
    } else if (error !== false) {
      (err.message === 'Failed to fetch') && Message.error('Network is busy')
    }
  }).finally(complete)
}
