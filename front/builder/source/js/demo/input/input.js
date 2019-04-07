/**
 * @author Alan (曹昌盛)
 * @desc Input DEMO
 */
import './input.less'
import React from 'react'
import ReactDOM from 'react-dom'
import Input from '../../../../plugin/component/Input'

class Content extends React.Component {
  handleChange = (e) => {
    console.log(e.target.value)
  }

  render () {
    return (
      <div className='bc-input-demo'>
        <h1>Input 文本框</h1>

        <h2>基本用法</h2>
        <h3>Normal</h3>
        <Input
          placeholder='Normal'
          ref={(e) => {
            this.e = e
          }}
          onChange={this.handleChange} />
        <br />
        <Input
          placeholder='Normal'
          value='Operating Normal'
          onChange={this.handleChange} />
        <h3>Selected</h3>
        <Input autoFocus placeholder='Selected' value='' />
        <br />
        <Input autoFocus placeholder='Selected' value='Operating Selected' />
        <h3>Search</h3>
        <Input search placeholder='search' value='' />
      </div>

    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
