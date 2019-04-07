/**
 * @author MG Ding (丁文强)
 * @desc Message (全局提示)
 */
import './Message.less'
import React from 'react'
import Item from './Item'

export default class Message extends React.Component {
  static classPrefix = 'bc-message'
  static container = window.document.body // 默认挂载点
  static message2List = (message) => {
    return Object.keys(message).map(key => {
      let msg = message[key]
      msg.key = key
      return msg
    })
  }
  static n = 0
  static items = {}
  static storeItems = (ref, key) => {
    if (ref) Message.items[key] = ref
  }
  state = {
    message: {}
  }
  add = (type, content, duration) => {
    Message.n += 1
    const id = Message.n
    this.setState(({message}) => {
      message[id] = { type, content, duration, key: id, id: id }
      return {message}
    })

    return id
  }
  remove = (id) => {
    delete Message.items[id]
    this.setState(({message}) => {
      delete message[id]
      return {message}
    })
  }
  hide = (id) => {
    if (Message.items[id]) {
      Message.items[id].fadeOut()
    }
  }

  render () {
    const {classPrefix, message2List} = Message
    const list = message2List(this.state.message)

    return (
      <ol className={classPrefix}>
        {list && list.map(({key, ...rest}) => <Item {...rest} ref={(ref) => { Message.storeItems(ref, key) }} key={key} remove={this.remove} />)}
      </ol>
    )
  }
}
