/**
 * @author Alan (曹昌盛)
 * @desc ImageWithText编辑器
 */
import React from 'react'
import PropTypes from 'prop-types'
import Select from '../../../../builder/plugin/component/Selection'
import ColorPicker from '../../../../builder/plugin/component/ColorPicker'
import Input from '../../../../builder/plugin/component/Input'
import Text from '../../../../builder/plugin/component/Text'
import ImagePanel from '../../../../builder/plugin/component/ImagePanel'

import './ImageWithText.less'

class ImageWithTextCtrl extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    changeConfig: PropTypes.func.isRequired
  }
  static defaultProps = {
    changeConfig: () => {
    }
  }
  handleChangeValue = (key, e) => {
    const value = e.target.value
    let {config} = this.props
    config[key] = value
    this.props.changeConfig(config)
  }
  handleChangeText = (value) => {
    let {config} = this.props
    config['content'] = value
    this.props.changeConfig(config)
  }
  handleChangeComplete = (color) => {
    let {config} = this.props
    config.bgColor = color.hex
    this.props.changeConfig(config)
  }
  // 编辑图片alt
  openEditImgAlt = () => {
    this.setState(() => ({
      showEdit: true
    }))
  }
  // 关闭图片编辑模态框
  closeEditImgAlt = () => {
    this.setState(() => ({
      showEdit: false
    }))
  }
  // 图片alt值
  changeImageAltValue = (e) => {
    const value = e.target.value
    this.setState(() => ({
      imgAltValue: value
    }))
  }
  toggleImageAssembleList = () => {
    this.setState(pre => (
      {showImageAssembleList: !pre.showImageAssembleList}
    ))
  }
  handleChangeImage = () => {
    this.toggleImageAssembleList()
  }
  selectImage = (image) => {
    let {config} = this.props
    config.image = image
    this.props.changeConfig(config, true)
  }

  render () {
    const {config} = this.props
    const {name, key, sectionHeight, bgColor, desktopAlign, imagePosition, mobileAlign, title, content, buttonLabel, buttonLink, imageStyle, image} = config
    return (
      <div
        id={`${name}Ctrl-${key}`}
        className='m-imageTextCtrl-wrap'
      >
        <h3 className='setting'>SETTING BAR</h3>
        <div className='imageTextCtrl-top'>
          <h3>Section height</h3>
          <Select style={{width: '100%'}} value={sectionHeight}
                  onChange={this.handleChangeValue.bind(this, 'sectionHeight')}>
            <option value='Large'>Large</option>
            <option value='Medium'>Medium</option>
            <option value='Small'>Small</option>
          </Select>
          <ColorPicker
            color={bgColor}
            onChangeComplete={this.handleChangeComplete}
            label='Background color'
            style={{marginTop: 20}}
          />
        </div>
        <div className='imageTextCtrl-center'>
          <h2>IMAGE</h2>
          <div className='img-show-wrap'>
            <Input value={image} onChange={this.handleChangeValue.bind(this, 'image')}/>
            {/*<ImagePanel*/}
            {/*bgImg={image}*/}
            {/*selectImage={this.selectImage}*/}
            {/*/>*/}
          </div>
          <div className='imgStyle'>
            <h3>Image style</h3>
            <Select style={{width: '100%'}} value={imageStyle}
                    onChange={this.handleChangeValue.bind(this, 'imageStyle')}>
              <option value='None'>None</option>
              <option value='Circle'>Circle</option>
              <option value='Square'>Square</option>
            </Select>
          </div>
          <div className='imgPosition'>
            <h3>Image Position</h3>
            <Select style={{width: '100%'}} value={imagePosition}
                    onChange={this.handleChangeValue.bind(this, 'imagePosition')}>
              <option value='left top'>Top Left</option>
              <option value='center top'>Top Center</option>
              <option value='right top'>Top Right</option>
              <option value='left center'>Middle Left</option>
              <option value='center center'>Middle Center</option>
              <option value='right center'>Middle Right</option>
              <option value='left bottom'>Bottom Left</option>
              <option value='center bottom'>Bottom Center</option>
              <option value='right bottom'>Bottom Right</option>
            </Select>
          </div>
        </div>
        <div className='imageTextCtrl-bottom'>
          <h2>Text</h2>
          <h3>Heading</h3>
          <Input
            value={title}
            onChange={this.handleChangeValue.bind(this, 'title')}
          />
          <h3>Text</h3>
          <Text
            value={content}
            onChange={this.handleChangeText}
          />
          <h3>Button label</h3>
          <Input
            value={buttonLabel}
            onChange={this.handleChangeValue.bind(this, 'buttonLabel')}
          />
          <h3>Button Link</h3>
          <Input
            value={buttonLink}
            onChange={this.handleChangeValue.bind(this, 'buttonLink')}
          />
        </div>
        <div className='imageTextCtrl-last'>
          <h2>IMAGE ALIGNMENT</h2>
          <h3>Desktop</h3>
          <Select style={{width: '100%'}} value={desktopAlign}
                  onChange={this.handleChangeValue.bind(this, 'desktopAlign')}>
            <option value='Left'>Left</option>
            <option value='Right'>Right</option>
          </Select>
          <h3>Mobile</h3>
          <Select style={{width: '100%'}} value={mobileAlign}
                  onChange={this.handleChangeValue.bind(this, 'mobileAlign')}>
            <option value='Top'>Top</option>
            <option value='Bottom'>Bottom</option>
          </Select>
        </div>
      </div>
    )
  }
}

export default ImageWithTextCtrl
