/**
 * @author MG Ding (丁文强)
 * @desc SlideShow编辑器
 */
import './SlideShow.less'
import React from 'react'
import PropTypes from 'prop-types'
// const {util} = window.supervar
import Input from '../../../../builder/plugin/component/Input'
// import Radio from '../../../../builder/plugin/component/Radio'
import Checkbox from '../../../../builder/plugin/component/Checkbox'
// import ColorPicker from '../../../../builder/plugin/component/ColorPicker'
// import Message from '../../../../builder/plugin/component/Message'
import Selection from '../../../../builder/plugin/component/Selection'
import ActionList from '../../../../builder/plugin/component/ActionList'
import ImagePanel from '../../../../builder/plugin/component/ImagePanel'
import { copyJson, moveArrayItem } from '../../../../builder/source/util'

class SlideShowCtrl extends React.Component {
  static propTypes = {
    config: PropTypes.object, // 配置信息
    changeConfig: PropTypes.func, // 更新配置 (param1: 配置，param2: 缓存配置，默认不缓存)
    cacheConfig: PropTypes.func  // 缓存配置
  }
  static classPrefix = 'ctrl-sliderShow'
  static heightMap = [
    {name: 'Low', value: 'low'},
    {name: 'Medium', value: 'medium'},
    {name: 'High', value: 'high'}
  ]
  static intervalMap = [
    {name: '3', value: 3},
    {name: '4', value: 4},
    {name: '5', value: 5},
    {name: '6', value: 6},
    {name: '7', value: 7},
    {name: '8', value: 8},
    {name: '9', value: 9},
    {name: '10', value: 10},
    {name: 'None', value: 0}
  ]
  static slideTypeMap = [
    {name: 'Fade in and fade out', value: 0},
    {name: 'Horizontal slide', value: 1}
  ]
  static arrowStyleMap = [
    {name: 'Square', value: 0},
    {name: 'Round', value: 1}
  ]
  static navStyleMap = [
    {name: 'Square', value: 0},
    {name: 'Round', value: 1},
    {name: 'Invisible', value: 2}
  ]
  static fontSizeMap = [
    {name: 'Small', value: 'small'},
    {name: 'Medium', value: 'medium'},
    {name: 'Large', value: 'large'}
  ]
  static maskOpacityMap = [
    {name: '0', value: 0},
    {name: '5%', value: 0.05},
    {name: '10%', value: 0.1},
    {name: '15%', value: 0.15},
    {name: '20%', value: 0.20},
    {name: '25%', value: 0.25},
    {name: '30%', value: 0.30},
    {name: '35%', value: 0.35},
    {name: '40%', value: 0.4},
    {name: '45%', value: 0.45},
    {name: '50%', value: 0.5},
    {name: '55%', value: 0.55},
    {name: '60%', value: 0.6},
    {name: '65%', value: 0.65},
    {name: '70%', value: 0.7},
    {name: '75%', value: 0.75},
    {name: '80%', value: 0.8},
    {name: '85%', value: 0.85},
    {name: '90%', value: 0.9}
  ]
  updateConfig = (key, value, cache) => {
    let {config} = this.props
    config[key] = value
    this.props.changeConfig(config, cache)
  }
  handleChangeSelect = (key, isNumber, e) => {
    let {value} = e.target
    this.updateConfig(key, isNumber ? value - 0 : value, true)
  }
  handleChangeChecked = (key, e) => {
    this.updateConfig(key, e.target.checked, true)
  }
  sortContent = (from, to) => {
    const data = moveArrayItem(copyJson(this.props.config.data), from, to)
    this.updateConfig('data', data, false)
  }
  changeInput = (index, type, e) => {
    let data = copyJson(this.props.config.data)
    data[index][type] = e.target.value
    this.updateConfig('data', data, false)
  }
  selectImage = (index, image) => {
    let data = copyJson(this.props.config.data)
    data[index].img = image
    this.updateConfig('data', data, false)
  }

  render () {
    const {classPrefix, heightMap, intervalMap, slideTypeMap, arrowStyleMap, navStyleMap, fontSizeMap, maskOpacityMap} = SlideShowCtrl
    const {config} = this.props
    const {height, interval, slideType, arrowStyle, navStyle, fontSize, maskOpacity, padding, data} = config

    return (
      <div className={classPrefix} id='sliderShow-ctrl-container'>
        <h2 className='ctrl-card-header'>SETTINGS BAR</h2>
        <div className='ctrl-card'>
          <p>Section height</p>
          <Selection value={height} onChange={this.handleChangeSelect.bind(this, 'height', false)}>
            {heightMap.map(({name, value}) => <option value={value} key={value}>{name}</option>)}
          </Selection>

          <p>Sliding interval</p>
          <Selection value={interval + ''} onChange={this.handleChangeSelect.bind(this, 'interval', true)}>
            {intervalMap.map(({name, value}) => <option value={value} key={value}>{name}</option>)}
          </Selection>

          <p>Slide type</p>
          <Selection value={slideType + ''} onChange={this.handleChangeSelect.bind(this, 'slideType', true)}>
            {slideTypeMap.map(({name, value}) => <option value={value} key={value}>{name}</option>)}
          </Selection>

          <p>Arrow style</p>
          <Selection value={arrowStyle + ''} onChange={this.handleChangeSelect.bind(this, 'arrowStyle', true)}>
            {arrowStyleMap.map(({name, value}) => <option value={value} key={value}>{name}</option>)}
          </Selection>

          <p>Navigation style</p>
          <Selection value={navStyle + ''} onChange={this.handleChangeSelect.bind(this, 'navStyle', true)}>
            {navStyleMap.map(({name, value}) => <option value={value} key={value}>{name}</option>)}
          </Selection>
        </div>
        <div className='ctrl-card'>
          <p>Overlay font size</p>
          <Selection value={fontSize} onChange={this.handleChangeSelect.bind(this, 'fontSize', false)}>
            {fontSizeMap.map(({name, value}) => <option value={value} key={value}>{name}</option>)}
          </Selection>

          <p>Mask opacity</p>
          <Selection value={maskOpacity + ''} onChange={this.handleChangeSelect.bind(this, 'maskOpacity', true)}>
            {maskOpacityMap.map(({name, value}) => <option value={value} key={value}>{name}</option>)}
          </Selection>

          <Checkbox checked={padding} onChange={this.handleChangeChecked.bind(this, 'padding')} style={{marginTop: 15}}>Blank on both sides</Checkbox>
        </div>
        <h2 className='ctrl-card-header'>Content</h2>
        <ActionList
          // draggable
          onChange={this.sortContent}
          offset={69}
        >
          {data.map(({title, content, link, img}, index) => {
            return (
              <ActionList.Item
                key={index}
                title={`Slider ${index + 1}`}
                collapse
              >
                <p>title</p>
                <Input value={title} onChange={this.changeInput.bind(this, index, 'title')}/>
                <p style={{marginTop: 10}}>content</p>
                <Input value={content} onChange={this.changeInput.bind(this, index, 'content')}/>
                <p style={{marginTop: 10}}>link</p>
                <Input value={link} onChange={this.changeInput.bind(this, index, 'link')}/>
                <p style={{marginTop: 10}}>image</p>
                <Input value={img} onChange={this.changeInput.bind(this, index, 'img')}/>
                {/*<ImagePanel*/}
                {/*bgImg={img}*/}
                {/*selectImage={this.selectImage.bind(this, index)}*/}
                {/*/>*/}
              </ActionList.Item>
            )
          })}
        </ActionList>
      </div>
    )
  }
}

export default SlideShowCtrl
