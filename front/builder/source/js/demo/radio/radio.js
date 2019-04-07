/**
 * @author Alan (曹昌盛)
 * @desc Radio DEMO
 */
import './radio.less'
import React from 'react'
import ReactDOM from 'react-dom'

import Radio from '../../../../plugin/component/Radio'

const RadioGroup = Radio.Group

class Content extends React.Component {
  state = {
    value: 'GG'
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    }, () => {
      console.log(this.state.value)
    })
  }

  render() {
    return (

      <div className='bc-radio-demo'>
        <h1>Radio 单选框</h1>
        <h2>基础用法:</h2>
        <h3>Normal</h3>
        <Radio
          onChange={(e) => {
          }}
          name="sex"
          value="Male"
        >Male</Radio>
        <h3>Checked</h3>
        <Radio
          onChange={(e) => {
          }}
          name="age"
          value="24"
          defaultValue='24'
        >Alan</Radio>
        <h3>Disabled</h3>
        <Radio
          onChange={(e) => {
          }}
          name="province"
          value="GD"
          disabled={true}
        >广东</Radio>
        <h2>組合用法</h2>
        <h3>情形一</h3>
        <RadioGroup name='city'
                    value={this.state.value}
                    onChange={this.handleChange}>
          <Radio value="SZ">深圳</Radio>
          <Radio value="GG">广州</Radio>
          <Radio value="FS">佛山</Radio>
          <Radio value="DG">东莞</Radio>
        </RadioGroup>
        <h3>情形二</h3>
        <RadioGroup name='subway'
                    ref={(e) => {
                      this.e = e
                    }}>
          <Radio value="1">罗宝线</Radio>
          <Radio value="2">蛇口线</Radio>
          <Radio value="3">龙岗线</Radio>
          <Radio value="4">龙华线</Radio>
          <Radio value="5">环中线</Radio>
        </RadioGroup>
        <button onClick={() => {
          console.log(this.e.value);
        }}>提交</button>
      </div>
    )
  }
}

ReactDOM.render(<Content/>, document.getElementById('container'))
