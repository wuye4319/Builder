/**
 * @author MG Ding (丁文强)
 * @desc colorPicker DEMO
 */
import '../../builder/src/builder.less'
import './colorpicker.less'
import React from 'react'
import ReactDOM from 'react-dom'
import ColorPicker from '../../../../plugin/component/ColorPicker'

class Content extends React.Component {
  state = {
    color: '#6CB9DA'
  }
  handleChangeComplete = (color) => {
    this.setState({ color: color.hex })
  }
  render () {
    return (
      <div className='bc-demo'>
        <h1>ColorPicker 颜色选择器</h1>
        <ColorPicker
          color={this.state.color}
          onChangeComplete={this.handleChangeComplete}
          label='my label'
          style={{marginTop: 30}}
        />
      </div>

    )
  }
}

ReactDOM.render(<Content />, document.getElementById('container'))
