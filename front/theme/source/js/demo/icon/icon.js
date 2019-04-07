/**
 * @author MG Ding (丁文强)
 * @desc Icon DEMO
 */
import '../../../theme.less'
import './icon.less'
import React from 'react'
import ReactDOM from 'react-dom'
import Icon from '../../../../plugin/component/Icon'

class Content extends React.Component {
  render () {
    return (
      <div className='bc-demo'>
        <h1>Icon 图标</h1>
        <Icon type='user' />
        <Icon type='close' />
        <Icon type='edit' />
        <Icon type='search' />
      </div>

    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
