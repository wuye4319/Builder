/**
 * @author MG Ding (丁文强)
 * @desc Select DEMO
 */
import '../../../theme.less'
import './select.less'
import React from 'react'
import ReactDOM from 'react-dom'
import Select from '../../../../plugin/component/Select'

class Content extends React.Component {
  render () {

    return (
      <div className='bc-demo'>
        <h1>Select 下拉选择器</h1>
        <h2>用法与原生select一样</h2>
        <Select>
          <option value='1'>option</option>
          <option value='1'>option</option>
          <option value='1'>option</option>
          <option value='1'>option</option>
        </Select>

        <h2>disabled</h2>
        <Select disabled>
          <option value='1'>option</option>
          <option value='1'>option</option>
          <option value='1'>option</option>
          <option value='1'>option</option>
        </Select>
      </div>

    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
