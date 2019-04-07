/**
 * 请求方法
 * @author MG
 */

import getConstructorName from './getConstructorName'
import obj2Query from './obj2Query'

export default function fetch (url, options = {}) {
  options.credentials = options.credentials || 'include'
  options.headers = {
    // 'Business-Id': 'g9jP2e',
    'Origin-Host': 'www.test.com',
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
