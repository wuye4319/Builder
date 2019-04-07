/**
 * @author Alan (曹昌盛)
 * @desc image with text模块
 */
import './ImageWithText.less'
import React from 'react'
import PropTypes from 'prop-types'
import Button from './../../plugin/component/Button'
import Link from './../../plugin/component/Link'
const { setClass, color, font } = window.supervar.util

class ImageWithText extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  goToLink = () => {
    const {config} = this.props
    const {buttonLink} = config
    Link.goTo(buttonLink, 'blank')
  }

  render () {
    const {config, pageMode} = this.props
    const {sectionHeight, imageStyle, imagePosition, bgColor, desktopAlign, mobileAlign, title, content, buttonLabel, image} = config
    return (
      <div
        className={`m-imageText-wrap mobile-imageText-wrap ${!pageMode ? sectionHeight : ''} ${!pageMode ? desktopAlign : ''} ${mobileAlign}`}
        style={{backgroundColor: bgColor}}
      >
        <div className={`image-wrap `}>
          <div className={`image-box ${imageStyle}`} style={{backgroundPosition: imagePosition, backgroundImage: `url("${image}")`}} />
        </div>
        <div className='text-wrap'>
          <div className='text-box'>
            <h2 className={`text-title ${color('title')} ${font('title')}`}>{title}</h2>
            <p className={` ${color('subText')} ${font('text')}`}>{content}</p>
            <Button onClick={this.goToLink} type='ghost'>{buttonLabel}</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageWithText
