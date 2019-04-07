/**
 * @author MG Ding (丁文强)
 * @desc Button DEMO
 */
import '../../builder/src/builder.less'
import './spin.less'
import React from 'react'
import ReactDOM from 'react-dom'
// import Button from '../../../../plugin/component/Button'
import Spin from '../../../../plugin/component/Spin'

class Content extends React.Component {

  render () {
    return (
      <div className='bc-demo'>
        <h1>Spin 加载</h1>

        <h2>size: large, default(默认), small</h2>
        <div className='block'>
          <Spin size='large' />
          <Spin />
          <Spin size='small' />
        </div>

        <h2>type: dark(默认), light</h2>
        <div className='block' style={{background: '#333'}}>
          <Spin type='light' size='large' />
          <Spin type='light' />
          <Spin type='light' size='small' />
        </div>
      </div>

    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
