/**
 * @author MG Ding (丁文强)
 * @desc Select DEMO
 */
import '../../../theme.less'
import './input.less'
import React from 'react'
import ReactDOM from 'react-dom'
import Input from '../../../../plugin/component/Input'
import Button from '../../../../plugin/component/Button'

class Content extends React.Component {
  state = {
    value1: '',
    value2: '有默认值',
    value3: 'disabled'
  }
  render () {
    return (
      <div className='bc-demo'>
        <h1>Input 文本输入框</h1>
        <h2>用法与原生input一样</h2>
        <Input type='text' placeholder='PLACE HOLDER' getInput={(ref) => { this.input = ref }} />
        <Button onClick={() => {
          window.alert('input的值是：' + this.input.value)
        }}>获取非受控组件的值</Button>

        <h2>disabled</h2>
        <Input type='text' placeholder='PLACE HOLDER' disabled />

        <h2>删除图标（非受控组件）</h2>
        <Input type='text' placeholder='PLACE HOLDER' clearIcon />
        <Input type='text' placeholder='PLACE HOLDER' clearIcon defaultValue='有默认值' style={{marginLeft: 20}} />
        <Input type='text' placeholder='PLACE HOLDER' clearIcon defaultValue='disabled' style={{marginLeft: 20}} disabled />

        <h2>删除图标（受控组件）</h2>
        <Input
          type='text'
          placeholder='PLACE HOLDER'
          clearIcon
          value={this.state.value1}
          onClear={() => {
            this.setState({value1: ''})
          }}
          onChange={(e) => {
            this.setState({value1: e.target.value})
          }}
        />
        <Input
          type='text'
          placeholder='PLACE HOLDER'
          clearIcon
          value={this.state.value2}
          onClear={() => {
            this.setState({value2: ''})
          }}
          onChange={(e) => {
            this.setState({value2: e.target.value})
          }}
          style={{marginLeft: 20}}
        />
        <Input
          type='text'
          placeholder='PLACE HOLDER'
          clearIcon
          value={this.state.value3}
          style={{marginLeft: 20}}
          disabled
        />
        <Button onClick={() => {
          this.setState({value1: '123', value2: '123', value3: '123'})
        }}>给固定值123</Button>
      </div>

    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
