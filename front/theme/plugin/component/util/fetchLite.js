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

import Link from '../Link'
import Message from '../Message'

export default function fetchLite (fetch, options = {}) {
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
