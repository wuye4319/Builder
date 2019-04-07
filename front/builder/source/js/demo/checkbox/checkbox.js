/**
 * @author MG Ding (丁文强)
 * @desc Button DEMO
 */
import '../../builder/src/builder.less'
import './checkbox.less'
import React from 'react'
import ReactDOM from 'react-dom'
// import Button from '../../../../plugin/component/Button'
import Checkbox from '../../../../plugin/component/Checkbox'

class Content extends React.Component {
  state = {
    checked: true
  }

  handleChange = (e) => {
    this.setState({checked: e.target.checked})
  }

  render () {
    const {checked} = this.state
    return (
      <div className='bc-demo'>
        <h1>Checkbox 多选框</h1>

        <h2>基本用法</h2>
        <Checkbox onChange={(e) => {
          console.log(`checked = ${e.target.checked}`)
        }}>checkbox</Checkbox>

        <h2>disabled</h2>
        <Checkbox disabled defaultChecked>checkbox</Checkbox>
        <Checkbox disabled>checkbox</Checkbox>

        <h2>受控的checkbox</h2>
        <Checkbox checked={checked} onChange={this.handleChange}>checkbox</Checkbox>
      </div>

    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
