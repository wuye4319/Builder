/**
 * @author Alan (曹昌盛)
 * @desc Text DEMO
 */
import './text.less'
import React from 'react'
import ReactDOM from 'react-dom'
import Text from '../../../../plugin/component/Text'

class Content extends React.Component {
  state = {
    value: '受控组件数据'
  }
  handleChange = (value) => {
    this.setState({
      value: value
    })
  }

  componentDidMount () {

  }

  render () {
    const {value} = this.state
    return (
      <div className='bc-text-demo'>
        <h3>非受控组件</h3>
        <Text ref={(e) => { this.e = e }} placeholder='测试文本域' />
        <button style={{margin: '0 0 50px 50px'}} onClick={() => { window.alert(this.e.value) }}>取值</button>
        <h3>受控组件</h3>
        <Text value={value} placeholder='测试文本域' onChange={this.handleChange} />
      </div>

    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
