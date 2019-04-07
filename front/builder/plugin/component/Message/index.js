/**
 * @author MG Ding (丁文强)
 * @desc Message (全局提示)
 */
import Message from './src/Message'
import ReactDOM from 'react-dom'

const container = document.createElement('div')
let instant = null
const initMessage = () => {
  document.body.appendChild(container)
  instant = ReactDOM.render(<Message />, container)
}
const add = (type, content, duration) => {
  !instant && initMessage()
  return instant.add(type, content, duration)
}

const message = {
  info: (...rest) => {
    return add('info', ...rest)
  },
  success: (...rest) => {
    return add('success', ...rest)
  },
  error: (...rest) => {
    return add('error', ...rest)
  },
  warning: (...rest) => {
    return add('warning', ...rest)
  },
  loading: (...rest) => {
    return add('loading', ...rest)
  },
  hide: (id) => {
    instant && instant.hide(id)
  }

}

export default message
