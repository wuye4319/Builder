/**
 * @author MG Ding (丁文强)
 * @desc Message DEMO
 */
import '../../builder/src/builder.less'
import './message.less'
import React from 'react'
import ReactDOM from 'react-dom'
import message from '../../../../plugin/component/Message'
import Button from '../../../../plugin/component/Button'

let id = 0
let timer = null

class Content extends React.Component {
  state = {
    cd: 10
  }
  render () {
    const {cd} = this.state

    return (
      <div className='bc-demo'>
        <h1>Message 全局提示</h1>
        <Button onClick={() => {
          message.info('message.info')
        }}>info</Button>
        <Button onClick={() => {
          message.success('message.success')
        }}>success</Button>
        <Button onClick={() => {
          message.error('message.error')
        }}>error</Button>
        <Button onClick={() => {
          message.warning('message.warning')
        }}>warning</Button>
        <Button onClick={() => {
          message.loading('message.loading')
        }}>loading</Button>
        <br />
        <Button onClick={() => {
          id = message.info('延迟关闭', 10)
          clearInterval(timer)
          timer = setInterval(() => {
            this.setState(({cd}) => ({cd: cd - 1}), () => {
              if (this.state.cd <= 0) {
                clearInterval(timer)
              }
            })
          }, 1000)
        }}>{cd}秒之后关闭</Button>
        <Button onClick={() => {
          message.hide(id)
          clearInterval(timer)
          this.setState({cd: 10})
        }}>马上关闭message.hide</Button>

      </div>

    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
