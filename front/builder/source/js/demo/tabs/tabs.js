/**
 * @author MG Ding (丁文强)
 * @desc Tabs DEMO
 */
import '../../builder/src/builder.less'
import './tabs.less'
import React from 'react'
import ReactDOM from 'react-dom'
import Tabs from '../../../../plugin/component/Tabs'
const Pane = Tabs.Pane

class Content extends React.Component {
  state = {
    activeKey: '1'
  }
  render () {
    return (
      <div className='bc-demo'>
        <h1>Tabs 标签页</h1>
        <h2>基本Tabs: Pane为Tabs子元素 key,tab属性必须</h2>
        <Tabs>
          <Pane key='1' tab='Tab1'>Tab1</Pane>
          <Pane key='2' tab='Tab2'>Tab2</Pane>
          <Pane key='3' tab='Tab3'>Tab3</Pane>
          <Pane key='4' tab='Tab4'>Tab4</Pane>
        </Tabs>

        <h2>defaultActiveKey默认激活tab</h2>
        <Tabs defaultActiveKey='2'>
          <Pane key='1' tab='Tab1'>Tab1</Pane>
          <Pane key='2' tab='Tab2'>Tab2</Pane>
        </Tabs>

        <h2>forceRender: 被隐藏时也渲染DOM</h2>
        <Tabs>
          <Pane key='1' tab='Tab1' forceRender>Tab1</Pane>
          <Pane key='2' tab='Tab2' forceRender>Tab2</Pane>
          <Pane key='3' tab='Tab3' forceRender>Tab3</Pane>
        </Tabs>

        <h2>onChange回调，return false 取消切换</h2>
        <Tabs
          onChange={(key) => {
            window.alert(`回调，key=${key}${key === '2' ? '，return false 取消切换' : ''}`)
            return !(key === '2')
          }}
        >
          <Pane key='1' tab='Tab1'>Tab1</Pane>
          <Pane key='2' tab='Tab2'>Tab2</Pane>
          <Pane key='3' tab='Tab3'>Tab3</Pane>
        </Tabs>

        <h2>受控的activityKey</h2>
        <Tabs
          activeKey={this.state.activeKey}
          onChange={(key) => {
            this.setState({activeKey: key})
          }}
        >
          <Pane key='1' tab='Tab1'>Tab1</Pane>
          <Pane key='2' tab='Tab2'>Tab2</Pane>
        </Tabs>
      </div>

    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
