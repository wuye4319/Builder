/**
 * @author MG Ding (丁文强)
 * @desc Popover DEMO
 */
import '../../builder/src/builder.less'
import './popover.less'
import React from 'react'
import ReactDOM from 'react-dom'
import Popover from '../../../../plugin/component/Popover'
import Button from '../../../../plugin/component/Button'

class Content extends React.Component {
  state = {
    h: 0,
    visible: true
  }
  render () {
    const {h, visible} = this.state
    return (
      <div className='bc-demo'>
        <h1>Popover 气泡卡片</h1>

        {/* <Button onClick={() => {
          this.setState({h: h + 100})
        }}>撑高页面</Button>
        <div style={{width: '100%', height: this.state.h, background: '#e3e3e3'}} /> */}

        <h2>placement 弹出位置</h2>
        <Popover content='topLeft' placement='topLeft'>
          <Button>topLeft</Button>
        </Popover>
        <Popover content='top' placement='top'>
          <Button>top</Button>
        </Popover>
        <Popover content='topRight' placement='topRight'>
          <Button>topRight</Button>
        </Popover>
        <Popover content='rightTop' placement='rightTop'>
          <Button>rightTop</Button>
        </Popover>
        <Popover content='right' placement='right'>
          <Button>right</Button>
        </Popover>
        <Popover content='rightBottom' placement='rightBottom'>
          <Button>rightBottom</Button>
        </Popover>
        <Popover content='bottomRight' placement='bottomRight'>
          <Button>bottomRight</Button>
        </Popover>
        <Popover content='bottom' placement='bottom'>
          <Button>bottom</Button>
        </Popover>
        <Popover content='bottomLeft' placement='bottomLeft'>
          <Button>bottomLeft</Button>
        </Popover>
        <Popover content='leftBottom' placement='leftBottom'>
          <Button>leftBottom</Button>
        </Popover>
        <Popover content='left' placement='left'>
          <Button>left</Button>
        </Popover>
        <Popover content='leftTop' placement='leftTop'>
          <Button>leftTop</Button>
        </Popover>

        <h2>trigger 触发方式</h2>
        <Popover content='hover' trigger='hover'>
          <Button onClick={() => { console.log('button hover') }}>trigger='hover' 默认值</Button>
        </Popover>
        <Popover content='click' trigger='click'>
          <Button onClick={() => { console.log('button click') }}>trigger='click'</Button>
        </Popover>
        <Popover content='focus' trigger='focus'>
          <input onFocus={() => { console.log('input focus') }} defaultValue={`trigger='focus'`} style={{height: 30, verticalAlign: 'bottom'}} />
        </Popover>

        <h2>defaultVisible 默认显示气泡</h2>
        <Popover content='默认显示' trigger='click' placement='right' defaultVisible>
          <Button>默认显示</Button>
        </Popover>

        <h2>visible 气泡显示受外部控制</h2>
        <Button onClick={() => { this.setState({visible: !visible}) }} type='sub'>点击{visible ? '隐藏' : '显示'}</Button>
        <Popover content='visible' placement='right' visible={visible}>
          <Button>这里不能控制气泡显示</Button>
        </Popover>

        <h2>onVisibleChange 回调</h2>
        <Popover content='onVisibleChange' placement='right' onVisibleChange={(v) => { console.log(v) }}>
          <Button>onVisibleChange</Button>
        </Popover>

        <h2>toggle 方法</h2>
        <Button type='sub' onClick={() => { this.pop.toggle(true) }}>toggle(true)</Button>
        <Popover
          content={(
            <div>
              <p>点击按钮关闭</p>
              <Button size='small' onClick={() => { this.pop.toggle(false) }}>toggle(false)</Button>
            </div>
          )}
          placement='right'
          ref={(pop) => (this.pop = pop)}
        >
          <Button>toggle</Button>
        </Popover>

      </div>

    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
