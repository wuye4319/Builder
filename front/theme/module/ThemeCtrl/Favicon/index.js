import './index.less'
import React from 'react'
import ImagePanel from '../../../../builder/plugin/component/ImagePanel'

class FaviconCtrl extends React.Component {
  render () {
    console.log(this.props)
    const { config } = this.props

    return (
      <div className='bc-favicon'>
        <p className='favicon-title'>
          <span>Favicon image</span>
          <span>Please convert the picture to icon (32 pixels) first.</span>
          <a href='https://www.icoconverter.com' target='_blank'>convert</a>
        </p>
        <ImagePanel
          bgImg = {config.data.icon}

        />
      </div>
    )
  }
}
export default FaviconCtrl
